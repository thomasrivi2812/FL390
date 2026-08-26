import {
  findColorway,
  findProduct,
  isSize,
  ONE_SIZE,
  type SelectableSize,
} from "@/lib/products";

export type CartLine = {
  slug: string;
  /** Deux coloris d'une même pièce sont deux lignes distinctes. */
  colorway: string;
  size: SelectableSize;
  quantity: number;
};

/** v2 : la ligne porte désormais le coloris. */
const STORAGE_KEY = "fl390.cart.v2";

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
      const { slug, colorway, size, quantity } = entry as Record<
        string,
        unknown
      >;
      if (typeof slug !== "string") return [];
      const product = findProduct(slug);
      if (!product) return [];
      if (typeof colorway !== "string") return [];
      if (findColorway(product, colorway).id !== colorway) return [];
      if (typeof size !== "string") return [];
      if (!isSize(size) && size !== ONE_SIZE) return [];
      if (typeof quantity !== "number" || !Number.isFinite(quantity)) return [];
      return [{ slug, colorway, size, quantity: clampQuantity(quantity) }];
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

export function addLine(
  slug: string,
  colorway: string,
  size: SelectableSize,
  quantity = 1,
) {
  const index = lines.findIndex(
    (line) =>
      line.slug === slug && line.colorway === colorway && line.size === size,
  );
  commit(
    index === -1
      ? [...lines, { slug, colorway, size, quantity: clampQuantity(quantity) }]
      : lines.map((line, i) =>
          i === index
            ? { ...line, quantity: clampQuantity(line.quantity + quantity) }
            : line,
        ),
  );
}

function isSame(line: CartLine, slug: string, colorway: string, size: SelectableSize) {
  return (
    line.slug === slug && line.colorway === colorway && line.size === size
  );
}

export function setLineQuantity(
  slug: string,
  colorway: string,
  size: SelectableSize,
  quantity: number,
) {
  commit(
    quantity <= 0
      ? lines.filter((line) => !isSame(line, slug, colorway, size))
      : lines.map((line) =>
          isSame(line, slug, colorway, size)
            ? { ...line, quantity: clampQuantity(quantity) }
            : line,
        ),
  );
}

export function removeLine(
  slug: string,
  colorway: string,
  size: SelectableSize,
) {
  commit(lines.filter((line) => !isSame(line, slug, colorway, size)));
}

export function clearLines() {
  commit(EMPTY);
}
