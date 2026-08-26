"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useCart } from "@/components/cart/cart-provider";
import { ProductVisual } from "@/components/product/product-visual";
import { SizeGuideDialog } from "@/components/product/size-guide-dialog";
import { CaptionPill } from "@/components/ui/caption-pill";
import { formatPrice } from "@/lib/format";
import {
  defaultSize,
  findColorway,
  isOneSize,
  ONE_SIZE,
  productMeta,
  SIZES,
  type Product,
  type SelectableSize,
  type Size,
} from "@/lib/products";

const KEY = "font-label text-[9px] font-bold tracking-[0.26em] uppercase";

/**
 * Corps de la fiche produit.
 *
 * Galerie et bloc d'achat partagent l'état de coloris : changer de couleur
 * change les visuels, les tailles proposées et la ligne ajoutée au panier. Les
 * deux vivent donc dans le même composant client, la page restant chargée du
 * pré-rendu et des métadonnées.
 */
export function ProductDetail({
  product,
  /**
   * Tailles proposées mais en rupture, par coloris. Distinctes des tailles non
   * déclinées : à alimenter le jour où un stock réel est branché.
   */
  soldOut = {},
}: {
  product: Product;
  soldOut?: Record<string, Size[]>;
}) {
  const { add } = useCart();
  const [colorwayId, setColorwayId] = useState(product.colorways[0].id);
  const colorway = findColorway(product, colorwayId);

  const [size, setSize] = useState<SelectableSize>(() =>
    defaultSize(product.colorways[0]),
  );
  const [guideOpen, setGuideOpen] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 2400);
    return () => clearTimeout(timer);
  }, [added]);

  const oneSize = isOneSize(colorway);
  const unavailable =
    size !== ONE_SIZE && (soldOut[colorway.id] ?? []).includes(size as Size);
  const manyColors = product.colorways.length > 1;

  /** Changer de coloris peut retirer la taille choisie : on retombe alors sur
   *  celle par défaut du nouveau coloris. */
  function pickColorway(id: string) {
    const next = findColorway(product, id);
    setColorwayId(id);
    if (size !== ONE_SIZE && !next.sizes.includes(size as Size)) {
      setSize(defaultSize(next));
    } else if (size === ONE_SIZE && !isOneSize(next)) {
      setSize(defaultSize(next));
    }
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start">
      <div className="flex flex-col gap-[14px] px-[22px] py-[18px] min-[760px]:pr-0">
        {colorway.images.map((image, index) => (
          <figure
            key={image.src}
            className="relative m-0 aspect-3/4 overflow-hidden rounded-frame bg-stone"
          >
            <ProductVisual
              src={image.src}
              alt={`${product.name} — ${colorway.label} — ${image.caption}`}
              priority={index === 0}
              sizes="(min-width: 760px) 50vw, 100vw"
              className="absolute inset-0"
            />
            <CaptionPill className="bottom-[14px] left-[14px]">
              {image.caption}
            </CaptionPill>
          </figure>
        ))}
      </div>

      <div className="border-t border-black/10 px-[clamp(22px,4vw,60px)] py-[clamp(28px,4vw,64px)] min-[760px]:sticky min-[760px]:top-(--header-height) min-[760px]:border-t-0 min-[760px]:border-l">
        <Link
          href="/shop"
          className={`${KEY} tracking-[0.28em] text-black/42 transition-colors duration-300 hover:text-ink`}
        >
          ← Shop all
        </Link>

        <h1 className="font-display mt-[22px] mb-0 text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.08]">
          {product.name}
        </h1>

        <div className="mt-[14px] flex flex-wrap items-baseline gap-[16px]">
          <span className="font-label text-[19px] font-bold">
            {formatPrice(product.price)}
          </span>
          <span className={`${KEY} text-black/42`}>
            {productMeta(product, colorway)}
          </span>
        </div>

        <p className="mt-[24px] mb-0 max-w-[44ch] text-[15px]/[1.75] text-black/68">
          {product.description}
        </p>

        {manyColors && (
          <>
            <div
              className={`${KEY} mt-[32px] flex items-baseline justify-between gap-[16px] tracking-[0.28em]`}
            >
              <span>Couleur</span>
              <span className="text-black/42">{colorway.label}</span>
            </div>
            <div
              role="radiogroup"
              aria-label="Couleur"
              className="mt-[14px] flex gap-[12px]"
            >
              {product.colorways.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={item.id === colorway.id}
                  aria-label={item.label}
                  onClick={() => pickColorway(item.id)}
                  className={`h-[22px] w-[22px] rounded-[999px] border border-black/30 transition-[outline-color] duration-[220ms] outline outline-1 outline-offset-[3px] ${
                    item.id === colorway.id
                      ? "outline-ink"
                      : "outline-transparent hover:outline-black/30"
                  }`}
                  style={{ background: item.hex }}
                />
              ))}
            </div>
          </>
        )}

        {oneSize ? (
          <p className={`${KEY} mt-[36px] mb-0 tracking-[0.28em] text-black/42`}>
            Taille unique
          </p>
        ) : (
          <div
            className={`${KEY} mt-[36px] flex items-baseline justify-between gap-[16px] tracking-[0.28em]`}
          >
            <span>Taille</span>
            <button
              type="button"
              onClick={() => setGuideOpen(true)}
              className="text-black/42 transition-colors duration-300 hover:text-ink"
            >
              Guide des tailles
            </button>
          </div>
        )}

        <div
          role="radiogroup"
          aria-label="Taille"
          hidden={oneSize}
          className="mt-[14px] flex overflow-hidden rounded-field border border-black/18"
        >
          {SIZES.map((option) => {
            const offered = colorway.sizes.includes(option);
            const isSoldOut = (soldOut[colorway.id] ?? []).includes(option);
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
            add(product.slug, colorway.id, size);
            setAdded(true);
          }}
          className="font-label mt-[12px] w-full rounded-[999px] border border-paper/14 bg-black/90 py-[20px] text-[12px] font-bold tracking-[0.28em] text-paper uppercase backdrop-blur-[16px] transition-colors duration-300 hover:bg-burgundy disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-black/90"
        >
          {unavailable
            ? `Taille ${size} épuisée`
            : `Ajouter — ${formatPrice(product.price)}`}
        </button>

        <p
          role="status"
          className={`${KEY} mt-[12px] mb-0 h-[12px] tracking-[0.28em] text-black/42`}
        >
          {added ? "Ajouté au panier" : ""}
        </p>

        <dl className="mt-[40px] mb-0 border-t border-ink">
          {product.specs.map((row) => (
            <div
              key={row.key}
              className="grid grid-cols-[minmax(100px,0.7fr)_1fr] gap-[16px] border-b border-black/14 py-[13px]"
            >
              <dt className={`${KEY} text-black/42`}>{row.key}</dt>
              <dd className="m-0 text-[14px] font-semibold">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-[26px] flex flex-wrap gap-x-[28px] gap-y-[12px]">
          <Link
            href="/livraison"
            className={`${KEY} border-b border-black/30 tracking-[0.24em] transition-colors duration-300 hover:text-burgundy`}
          >
            Expédié 24–48h
          </Link>
          <Link
            href="/retours"
            className={`${KEY} border-b border-black/30 tracking-[0.24em] transition-colors duration-300 hover:text-burgundy`}
          >
            Retours 15 jours
          </Link>
        </div>

        <SizeGuideDialog open={guideOpen} onClose={() => setGuideOpen(false)} />
      </div>
    </div>
  );
}
