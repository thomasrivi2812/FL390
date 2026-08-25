"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { useCart } from "@/components/cart/cart-provider";
import { LookbookFlyout } from "@/components/layout/lookbook-flyout";
import { MenuOverlay } from "@/components/layout/menu-overlay";
import { SearchPanel } from "@/components/layout/search-panel";
import { ShopFlyout } from "@/components/layout/shop-flyout";
import { Wordmark } from "@/components/layout/wordmark";
import { padCount } from "@/lib/format";
import { DROP_BADGE, SITE } from "@/lib/site";

/** Seuil de bascule de l'en-tête, en pixels de défilement. */
const SCROLL_THRESHOLD = 60;

type Panel = "shop" | "lookbook" | "search" | null;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * En-tête fixe, 62 px, en deux états.
 *
 * Sur l'accueil et tant que la page n'a pas défilé, il est transparent en blanc
 * par-dessus le hero ; partout ailleurs — et dès 60 px de défilement — il passe
 * en glass avec du texte noir. Un volet ouvert force l'état opaque : du texte
 * blanc sur la bande blanche serait invisible.
 *
 * L'état de défilement passe par `useSyncExternalStore` plutôt qu'un effet :
 * une page rouverte à une position déjà défilée rend ainsi le bon état dès
 * l'hydratation, sans clignotement.
 */
export function SiteHeader() {
  const { count, open: openCart } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  /**
   * Le volet ouvert est mémorisé avec la page sur laquelle il l'a été : au
   * changement de page il est simplement considéré comme fermé. Dériver l'état
   * au rendu évite un effet qui n'aurait servi qu'à remettre une valeur à zéro.
   */
  const [panelState, setPanelState] = useState<{ panel: Panel; path: string }>({
    panel: null,
    path: pathname,
  });
  const panel = panelState.path === pathname ? panelState.panel : null;

  const setPanel = useCallback(
    (next: Panel) => setPanelState({ panel: next, path: pathname }),
    [pathname],
  );

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SCROLL_THRESHOLD,
    () => false,
  );

  const closePanel = useCallback(() => setPanel(null), [setPanel]);

  useEffect(() => {
    if (!panel) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [panel, closePanel]);

  const transparent = pathname === "/" && !scrolled && !panel;

  /** Le survol n'ouvre un volet qu'au pointeur fin : au doigt, le lien navigue. */
  const hover = (next: Panel) => (event: React.PointerEvent) => {
    if (event.pointerType === "mouse") setPanel(next);
  };

  const link = "transition-opacity duration-300 hover:opacity-60";
  const side =
    "font-label flex items-center text-[12px] font-semibold tracking-[0.04em]";

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-60"
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse" && panel !== "search") closePanel();
        }}
      >
        <div
          className={`grid h-(--header-height) grid-cols-[1fr_auto_1fr] items-center gap-[8px] border-b px-[14px] transition-[background-color,color,border-color] duration-[400ms] ease-out min-[560px]:gap-[14px] min-[560px]:px-[20px] ${
            transparent
              ? "border-transparent bg-transparent text-paper"
              : "glass-nav border-black/8 text-ink shadow-[0_8px_34px_rgba(0,0,0,0.06)]"
          }`}
        >
          <nav
            aria-label="Navigation principale"
            className={`${side} gap-[10px] whitespace-nowrap min-[560px]:gap-[16px] min-[760px]:gap-[24px]`}
          >
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

            <Link
              href="/shop"
              onPointerEnter={hover("shop")}
              onFocus={() => setPanel("shop")}
              aria-expanded={panel === "shop"}
              className={`${link} hidden min-[720px]:inline`}
            >
              Shop all
            </Link>

            <Link
              href="/lookbook"
              onPointerEnter={hover("lookbook")}
              onFocus={() => setPanel("lookbook")}
              aria-expanded={panel === "lookbook"}
              className={`${link} hidden min-[720px]:inline`}
            >
              Lookbook
            </Link>

            {/* La pastille n'ouvre aucun volet : la survoler referme celui qui
                serait resté ouvert en venant d'un lien voisin. */}
            <Link
              href={DROP_BADGE.href}
              onPointerEnter={hover(null)}
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

          <div className={`${side} justify-end gap-[14px] min-[760px]:gap-[20px]`}>
            <button
              type="button"
              onPointerEnter={hover("search")}
              onClick={() => {
                setPanel(panel === "search" ? null : "search");
                requestAnimationFrame(() => searchInputRef.current?.focus());
              }}
              aria-expanded={panel === "search"}
              className={link}
            >
              Search
            </button>

            <Link
              href="/contact"
              className={`${link} hidden min-[560px]:inline`}
            >
              Contact
            </Link>

            <span className="hidden opacity-55 min-[900px]:inline">
              {SITE.locale}
            </span>

            <button
              type="button"
              onClick={openCart}
              onPointerEnter={hover(null)}
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
        </div>

        {panel === "shop" && <ShopFlyout onNavigate={closePanel} />}
        {panel === "lookbook" && <LookbookFlyout onNavigate={closePanel} />}
        {panel === "search" && (
          <SearchPanel inputRef={searchInputRef} onNavigate={closePanel} />
        )}
      </header>

      {panel === "search" && (
        <button
          type="button"
          aria-label="Fermer la recherche"
          onClick={closePanel}
          className="fixed inset-0 z-50 h-full w-full cursor-default bg-black/25"
        />
      )}

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
