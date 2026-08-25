"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { MENU_LINKS, SITE } from "@/lib/site";

/**
 * Panneau déployé par le bouton de l'en-tête. Il porte la navigation complète,
 * y compris les entrées que la barre ne peut pas afficher sur petit écran.
 */
export function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Fermer le menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/45"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="animate-fl-fade-fast absolute inset-x-0 top-0 bg-paper px-[22px] pb-[clamp(34px,6vw,60px)]"
      >
        <div className="flex h-(--header-height) items-center justify-end">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="font-label text-[12px] font-semibold tracking-[0.04em] text-black/55 transition-colors duration-300 hover:text-ink"
          >
            Fermer
          </button>
        </div>

        <nav aria-label="Menu principal">
          <ul className="m-0 flex list-none flex-col p-0">
            {MENU_LINKS.map((link) => (
              <li key={link.href} className="border-t border-black/12">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-display block py-[clamp(14px,2.4vw,22px)] text-[clamp(1.6rem,5vw,3rem)] leading-[1.1] tracking-[-0.02em] transition-colors duration-300 hover:text-burgundy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="font-label mt-[clamp(24px,4vw,40px)] mb-0 text-[10px] font-bold tracking-[0.24em] text-black/42 uppercase">
          {SITE.tagline}
        </p>
      </div>
    </div>
  );
}
