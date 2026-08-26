import Link from "next/link";

import { CATEGORIES, SIZES, type CategorySlug, type Size } from "@/lib/products";

/**
 * Barre de filtres collée sous l'en-tête fixe.
 *
 * Les deux filtres vivent dans l'URL (`?categorie=sweats&taille=M`) : liens
 * partageables, retour arrière fonctionnel, rendu côté serveur. Chaque pastille
 * active se désactive en la recliquant.
 *
 * Sur téléphone, rayons et tailles tiennent sur une seule ligne que l'on fait
 * glisser : sur deux lignes, la barre mangeait 109 px, soit 13 % de l'écran, en
 * plus des 62 px d'en-tête. Le compte de pièces passe alors dans le bloc de
 * titre, qui lui n'est pas collé.
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
    <div className="glass-bar sticky top-(--header-offset) z-30 border-b border-black/12">
      <div className="no-scrollbar flex items-center gap-[8px] overflow-x-auto px-[22px] py-[13px] min-[760px]:flex-wrap min-[760px]:justify-between min-[760px]:gap-x-[18px] min-[760px]:gap-y-[12px] min-[760px]:overflow-x-visible">
        <div className="flex shrink-0 items-center gap-[8px]">
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
          <>
            <span
              aria-hidden
              className="h-[22px] w-px shrink-0 bg-black/14 min-[760px]:hidden"
            />
            <div className="flex shrink-0 items-center gap-[8px]">
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
          </>
        )}

        <p
          aria-live="polite"
          className="font-label m-0 ml-auto hidden text-[10px] font-bold tracking-[0.22em] text-black/42 uppercase min-[760px]:block"
        >
          {count === 1 ? "1 pièce" : `${count} pièces`}
        </p>
      </div>
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
      className={`font-label inline-flex min-h-[44px] items-center justify-center rounded-[999px] px-[14px] text-center text-[10px] font-bold tracking-[0.14em] whitespace-nowrap backdrop-blur-[12px] transition-colors duration-[220ms] ${
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
