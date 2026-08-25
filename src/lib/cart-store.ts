import { findProduct, isSize, type Size } from "@/lib/products";

export type CartLine = {
  slug: string;
  size: Size;
  quantity: number;
};

const STORAGE_KEY = "fl390.cart.v1";

/**
 * Le panier vit dans un petit store externe plutôt que dans un état React.
 *
 * C'est ce qui permet de le relire depuis `localStorage` sans divergence
 * d'hydratation : `useSyncExternalStore` rend d'abord l'instantané vide — celui
 * du serveur — puis notifie une fois le stockage lu, au premier abonnement.
 */

/** Référence stable : `getSnapshot` doit rendre la même tant que rien ne change. */
const EMPTY: CartLine[] = [];

let lines: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function read(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;

    const restored = parsed.flatMap<CartLine>((entry) => {
      if (typeof entry !== "object" || entry === null) return [];
      const { slug, size, quantity } = entry as Record<string, unknown>;
      if (typeof slug !== "string" || !findProduct(slug)) return [];
      if (typeof size !== "string" || !isSize(size)) return [];
      if (typeof quantity !== "number" || !Number.isFinite(quantity)) return [];
      return [{ slug, size, quantity: clampQuantity(quantity) }];
    });

    return restored.length > 0 ? restored : EMPTY;
  } catch {
    // Stockage indisponible (navigation privée, quota) ou JSON corrompu :
    // on repart d'un panier vide plutôt que de casser le rendu.
    return EMPTY;
  }
}

function persist(next: CartLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Le panier reste fonctionnel en mémoire même sans persistance.
  }
}

function clampQuantity(quantity: number): number {
  return Math.min(Math.max(Math.round(quantity), 1), 99);
}

export function subscribe(listener: () => void): () => void {
  if (!loaded) {
    loaded = true;
    lines = read();
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): CartLine[] {
  return lines;
}

export function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

function commit(next: CartLine[]) {
  lines = next.length > 0 ? next : EMPTY;
  persist(lines);
  for (const listener of listeners) listener();
}

export function addLine(slug: string, size: Size, quantity = 1) {
  const index = lines.findIndex(
    (line) => line.slug === slug && line.size === size,
  );
  commit(
    index === -1
      ? [...lines, { slug, size, quantity: clampQuantity(quantity) }]
      : lines.map((line, i) =>
          i === index
            ? { ...line, quantity: clampQuantity(line.quantity + quantity) }
            : line,
        ),
  );
}

export function setLineQuantity(slug: string, size: Size, quantity: number) {
  commit(
    quantity <= 0
      ? lines.filter((line) => !(line.slug === slug && line.size === size))
      : lines.map((line) =>
          line.slug === slug && line.size === size
            ? { ...line, quantity: clampQuantity(quantity) }
            : line,
        ),
  );
}

export function removeLine(slug: string, size: Size) {
  commit(lines.filter((line) => !(line.slug === slug && line.size === size)));
}

export function clearLines() {
  commit(EMPTY);
}
