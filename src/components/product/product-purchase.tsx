"use client";

import { useEffect, useState } from "react";

import { useCart } from "@/components/cart/cart-provider";
import { SizeGuideDialog } from "@/components/product/size-guide-dialog";
import { formatPrice } from "@/lib/format";
import { defaultSize, SIZES, type Product, type Size } from "@/lib/products";

const LABEL = "font-label text-[9px] font-bold tracking-[0.28em] uppercase";

export function ProductPurchase({
  product,
  /**
   * Tailles proposées mais en rupture. Distinctes des tailles non déclinées :
   * à alimenter le jour où un stock réel est branché.
   */
  soldOut = [],
}: {
  product: Product;
  soldOut?: Size[];
}) {
  const { add } = useCart();
  const [size, setSize] = useState<Size>(() => defaultSize(product));
  const [guideOpen, setGuideOpen] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 2400);
    return () => clearTimeout(timer);
  }, [added]);

  const unavailable = soldOut.includes(size);

  return (
    <>
      <div className={`${LABEL} mt-[36px] flex items-baseline justify-between gap-[16px]`}>
        <span>Taille</span>
        <button
          type="button"
          onClick={() => setGuideOpen(true)}
          className="text-black/42 transition-colors duration-300 hover:text-ink"
        >
          Guide des tailles
        </button>
      </div>

      <div
        role="radiogroup"
        aria-label="Taille"
        className="mt-[14px] flex overflow-hidden rounded-field border border-black/18"
      >
        {SIZES.map((option) => {
          const offered = product.sizes.includes(option);
          const isSoldOut = soldOut.includes(option);
          const selected = option === size;

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={
                isSoldOut
                  ? `Taille ${option} — épuisée`
                  : offered
                    ? `Taille ${option}`
                    : `Taille ${option} — non disponible`
              }
              disabled={!offered}
              onClick={() => setSize(option)}
              className={`font-label flex-1 border-r border-black/16 py-[15px] text-[12px] font-bold tracking-[0.1em] last:border-r-0 ${
                selected
                  ? "bg-ink text-paper"
                  : offered
                    ? `text-ink hover:bg-ink hover:text-paper ${isSoldOut ? "line-through decoration-black/40" : ""}`
                    : "cursor-not-allowed text-black/24"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={unavailable}
        onClick={() => {
          add(product.slug, size);
          setAdded(true);
        }}
        className="font-label mt-[12px] w-full rounded-[999px] border border-paper/14 bg-black/90 py-[20px] text-[12px] font-bold tracking-[0.28em] text-paper uppercase backdrop-blur-[16px] transition-colors duration-300 hover:bg-burgundy disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-black/90"
      >
        {unavailable
          ? `Taille ${size} épuisée`
          : `Ajouter — ${formatPrice(product.price)}`}
      </button>

      <p role="status" className={`${LABEL} mt-[12px] mb-0 h-[12px] text-black/42`}>
        {added ? "Ajouté au panier" : ""}
      </p>

      <SizeGuideDialog open={guideOpen} onClose={() => setGuideOpen(false)} />
    </>
  );
}
