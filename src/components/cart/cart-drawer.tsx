"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import { ProductVisual } from "@/components/product/product-visual";
import { findProduct, ONE_SIZE, primaryImage } from "@/lib/products";

const LABEL =
  "font-label font-bold text-[9px] tracking-[0.28em] uppercase";

export function CartDrawer() {
  const { lines, subtotal, isOpen, close, setQuantity, remove } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);

  const handleClose = useCallback(() => {
    setCheckoutError(null);
    close();
  }, [close]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
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
  }, [isOpen, handleClose]);

  async function handleCheckout() {
    setCheckingOut(true);
    setCheckoutError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const payload: unknown = await response.json().catch(() => null);
      if (response.ok && payload && typeof payload === "object") {
        const url = (payload as { url?: unknown }).url;
        if (typeof url === "string") {
          window.location.assign(url);
          return;
        }
      }
      const message =
        payload && typeof payload === "object"
          ? (payload as { message?: unknown }).message
          : null;
      setCheckoutError(
        typeof message === "string"
          ? message
          : "Le paiement est momentanément indisponible. Réessayez plus tard.",
      );
    } catch {
      setCheckoutError("Connexion impossible. Vérifiez votre réseau.");
    } finally {
      setCheckingOut(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        aria-label="Fermer le panier"
        onClick={handleClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/45"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        className="animate-fl-fade-fast absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-paper"
      >
        <div className="flex items-center justify-between border-b border-black/12 px-[22px] py-[18px]">
          <h2 className={`${LABEL} m-0`}>Panier</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className={`${LABEL} text-black/42 transition-colors duration-300 hover:text-ink`}
          >
            Fermer
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-[22px] text-center">
            <p className="m-0 max-w-[28ch] text-[15px]/[1.75] text-black/60">
              Votre panier est vide. Le Drop 01 tient en cinq pièces.
            </p>
            <Link
              href="/shop"
              onClick={handleClose}
              className={`${LABEL} border-b border-black/30 pb-[2px] transition-colors duration-300 hover:text-burgundy`}
            >
              Voir la collection
            </Link>
          </div>
        ) : (
          <ul className="m-0 flex-1 list-none overflow-y-auto px-[22px] py-[18px]">
            {lines.map((line) => {
              const product = findProduct(line.slug);
              if (!product) return null;
              return (
                <li
                  key={`${line.slug}-${line.size}`}
                  className="flex gap-[14px] border-b border-black/12 py-[16px] first:pt-0"
                >
                  <Link
                    href={`/shop/${product.slug}`}
                    onClick={handleClose}
                    className="relative aspect-3/4 w-[84px] shrink-0 overflow-hidden rounded-card bg-stone"
                  >
                    <ProductVisual
                      src={primaryImage(product)?.src ?? null}
                      alt={product.name}
                      sizes="84px"
                      className="absolute inset-0"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-baseline justify-between gap-3">
                      <Link
                        href={`/shop/${product.slug}`}
                        onClick={handleClose}
                        className="text-[14px] transition-opacity duration-300 hover:opacity-60"
                      >
                        {product.name}
                      </Link>
                      <span className="text-[14px] whitespace-nowrap">
                        {formatPrice(product.price * line.quantity)}
                      </span>
                    </div>
                    <span
                      className={`${LABEL} mt-[8px] text-black/42`}
                    >
                      {line.size === ONE_SIZE ? "Taille unique" : `Taille ${line.size}`}
                    </span>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-[12px]">
                      <div className="flex items-center rounded-[999px] border border-black/18">
                        <button
                          type="button"
                          aria-label={`Retirer un exemplaire de ${product.name}, taille ${line.size}`}
                          onClick={() =>
                            setQuantity(line.slug, line.size, line.quantity - 1)
                          }
                          className="flex h-[34px] w-[38px] items-center justify-center text-[16px] leading-none"
                        >
                          −
                        </button>
                        <span className="font-label min-w-[22px] text-center text-[12px] font-bold tracking-[0.1em]">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Ajouter un exemplaire de ${product.name}, taille ${line.size}`}
                          onClick={() =>
                            setQuantity(line.slug, line.size, line.quantity + 1)
                          }
                          className="flex h-[34px] w-[38px] items-center justify-center text-[16px] leading-none"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.slug, line.size)}
                        className={`${LABEL} text-black/42 transition-colors duration-300 hover:text-burgundy`}
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {lines.length > 0 && (
          <div className="border-t border-ink px-[22px] py-[18px]">
            <div className="flex items-baseline justify-between">
              <span className={`${LABEL} text-black/42`}>Sous-total</span>
              <span className="font-label text-[19px] font-bold">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mt-[10px] mb-0 text-[13px]/[1.6] text-black/60">
              Frais de livraison calculés au paiement. Offerts dès 120 €.
            </p>
            {checkoutError && (
              <p
                role="alert"
                className="mt-[14px] mb-0 text-[13px]/[1.6] text-burgundy"
              >
                {checkoutError}
              </p>
            )}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkingOut}
              className="font-label mt-[14px] w-full rounded-[999px] border border-paper/14 bg-black/90 py-[20px] text-[12px] font-bold tracking-[0.28em] text-paper uppercase transition-colors duration-300 hover:bg-burgundy disabled:opacity-60"
            >
              {checkingOut ? "Redirection…" : "Passer commande"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
