import Link from "next/link";

import { SIZES, type Size } from "@/lib/products";

/**
 * Barre de filtres sticky, calée sous l'en-tête fixe.
 * Le filtre vit dans l'URL (`?taille=M`) : lien partageable, retour arrière
 * fonctionnel, rendu serveur.
 */
export function SizeFilterBar({
  active,
  count,
}: {
  active: Size | null;
  count: number;
}) {
  return (
    <div className="glass-bar sticky top-(--header-height) z-30 flex flex-wrap items-center justify-between gap-[18px] border-b border-black/12 px-[22px] py-[13px]">
      <div className="flex flex-wrap gap-[8px]">
        {SIZES.map((size) => {
          const isActive = active === size;
          return (
            <Link
              key={size}
              href={isActive ? "/shop" : `/shop?taille=${size}`}
              scroll={false}
              aria-pressed={isActive}
              className={`font-label min-w-[44px] rounded-[999px] px-[12px] py-[9px] text-center text-[10px] font-bold tracking-[0.14em] backdrop-blur-[12px] transition-colors duration-[220ms] ${
                isActive
                  ? "border border-ink bg-ink text-paper"
                  : "border border-black/18 bg-paper/50 text-ink hover:border-ink"
              }`}
            >
              {size}
            </Link>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className="font-label m-0 ml-auto text-[10px] font-bold tracking-[0.22em] text-black/42 uppercase"
      >
        {count === 1 ? "1 pièce" : `${count} pièces`}
      </p>
    </div>
  );
}
