import Link from "next/link";

import { CATEGORIES, SIZES, type CategorySlug, type Size } from "@/lib/products";

/**
 * Barre de filtres sticky, calée sous l'en-tête fixe.
 *
 * Les deux filtres vivent dans l'URL (`?categorie=sweats&taille=M`) : liens
 * partageables, retour arrière fonctionnel, rendu côté serveur. Chaque pastille
 * active se désactive en la recliquant.
 */
export function ShopFilters({
  category,
  size,
  count,
  showSizes,
}: {
  category: CategorySlug | null;
  size: Size | null;
  count: number;
  /** Masqué quand aucune pièce du rayon courant ne se décline en tailles. */
  showSizes: boolean;
}) {
  /** Changer de rayon repart sans filtre de taille : il n'y survit pas. */
  const categoryHref = (slug: CategorySlug | null) =>
    slug ? (`/shop?categorie=${slug}` as const) : ("/shop" as const);

  const sizeHref = (value: Size | null) => {
    const params = new URLSearchParams();
    if (category) params.set("categorie", category);
    if (value) params.set("taille", value);
    const query = params.toString();
    return (query ? `/shop?${query}` : "/shop") as `/shop`;
  };

  return (
    <div className="glass-bar sticky top-(--header-height) z-30 flex flex-wrap items-center justify-between gap-x-[18px] gap-y-[12px] border-b border-black/12 px-[22px] py-[13px]">
      <div className="flex flex-wrap items-center gap-[8px]">
        <Pill href={categoryHref(null)} active={category === null}>
          Tout
        </Pill>
        {CATEGORIES.map((item) => (
          <Pill
            key={item.slug}
            href={categoryHref(category === item.slug ? null : item.slug)}
            active={category === item.slug}
          >
            {item.label}
          </Pill>
        ))}
      </div>

      {showSizes && (
        <div className="flex flex-wrap items-center gap-[8px]">
          {SIZES.map((value) => (
            <Pill
              key={value}
              href={sizeHref(size === value ? null : value)}
              active={size === value}
              minWidth
            >
              {value}
            </Pill>
          ))}
        </div>
      )}

      <p
        aria-live="polite"
        className="font-label m-0 ml-auto text-[10px] font-bold tracking-[0.22em] text-black/42 uppercase"
      >
        {count === 1 ? "1 pièce" : `${count} pièces`}
      </p>
    </div>
  );
}

function Pill({
  href,
  active,
  minWidth = false,
  children,
}: {
  href: `/shop` | `/shop?${string}`;
  active: boolean;
  minWidth?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-pressed={active}
      className={`font-label rounded-[999px] px-[12px] py-[9px] text-center text-[10px] font-bold tracking-[0.14em] backdrop-blur-[12px] transition-colors duration-[220ms] ${
        minWidth ? "min-w-[44px]" : ""
      } ${
        active
          ? "border border-ink bg-ink text-paper"
          : "border border-black/18 bg-paper/50 text-ink hover:border-ink"
      }`}
    >
      {children}
    </Link>
  );
}
