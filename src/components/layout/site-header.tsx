"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

import { useCart } from "@/components/cart/cart-provider";
import { MenuOverlay } from "@/components/layout/menu-overlay";
import { Wordmark } from "@/components/layout/wordmark";
import { padCount } from "@/lib/format";
import { DROP_BADGE, NAV_LINKS, SITE } from "@/lib/site";

/** Seuil de bascule de l'en-tête, en pixels de défilement. */
const SCROLL_THRESHOLD = 60;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * En-tête fixe, 62 px, en deux états.
 *
 * Sur l'accueil et tant que la page n'a pas défilé, il est transparent en
 * blanc par-dessus le hero ; partout ailleurs — et dès 60 px de défilement —
 * il passe en glass avec du texte noir. La transition dure 400 ms.
 *
 * L'état de défilement passe par `useSyncExternalStore` plutôt qu'un effet :
 * une page rouverte à une position déjà défilée rend ainsi le bon état dès
 * l'hydratation, sans clignotement.
 */
export function SiteHeader() {
  const { count, open: openCart } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SCROLL_THRESHOLD,
    () => false,
  );

  const transparent = pathname === "/" && !scrolled;

  const link = "transition-opacity duration-300 hover:opacity-60";
  const side =
    "font-label flex items-center text-[12px] font-semibold tracking-[0.04em]";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-60 grid h-(--header-height) grid-cols-[1fr_auto_1fr] items-center gap-[14px] border-b px-[22px] transition-[background-color,color,border-color] duration-[400ms] ease-out ${
          transparent
            ? "border-transparent bg-transparent text-paper"
            : "glass-nav border-black/8 text-ink"
        }`}
      >
        <nav aria-label="Navigation principale" className={`${side} gap-[24px]`}>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            className="-my-[10px] flex w-[22px] shrink-0 flex-col gap-[5px] py-[10px]"
          >
            <span className="block h-[1.5px] bg-current" />
            <span className="block h-[1.5px] bg-current" />
          </button>

          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${link} hidden min-[720px]:inline`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href={DROP_BADGE.href}
            className="hidden rounded-badge bg-burgundy px-[8px] py-[3px] text-paper transition-colors duration-300 hover:bg-ink min-[720px]:inline-block"
          >
            {DROP_BADGE.label}
          </Link>
        </nav>

        <Link href="/" aria-label={`${SITE.fullName} — accueil`}>
          <Wordmark
            markClassName="text-[19px]"
            cityClassName="text-[7px] tracking-[0.62em] indent-[0.62em]"
          />
        </Link>

        <div className={`${side} justify-end gap-[20px]`}>
          <Link href="/contact" className={`${link} hidden min-[560px]:inline`}>
            Contact
          </Link>
          <span className="hidden opacity-55 min-[900px]:inline">
            {SITE.locale}
          </span>
          <button
            type="button"
            onClick={openCart}
            className={`${link} flex items-center gap-[7px] whitespace-nowrap`}
          >
            Panier
            <span className="inline-flex h-[19px] min-w-[19px] items-center justify-center rounded-[999px] bg-current px-[5px] text-[10px] font-bold">
              <span className={transparent ? "text-ink" : "text-paper"}>
                {padCount(count)}
              </span>
            </span>
          </button>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
