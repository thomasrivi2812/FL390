import Link from "next/link";

/**
 * Bande blanche déployée sous la barre de navigation.
 *
 * Coquille commune aux volets « Shop all », « Lookbook » et à la recherche :
 * même fond papier, même filet, même ombre que l'en-tête.
 */
export function NavFlyout({
  children,
  more,
}: {
  children: React.ReactNode;
  /** Lien « Découvrir plus » cadré en bas à droite. */
  more?: { href: "/shop" | "/lookbook"; label: string };
}) {
  return (
    <div className="animate-fl-fade-fast border-b border-black/12 bg-paper shadow-[0_8px_34px_rgba(0,0,0,0.06)]">
      <div className="px-[22px] pt-[clamp(24px,3vw,38px)] pb-[clamp(20px,2.4vw,30px)]">
        {children}

        {more && (
          <div className="mt-[clamp(20px,2.4vw,30px)] flex justify-end border-t border-black/12 pt-[16px]">
            <Link
              href={more.href}
              className="font-label text-[10px] font-bold tracking-[0.24em] uppercase transition-colors duration-300 hover:text-burgundy"
            >
              {more.label} →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
