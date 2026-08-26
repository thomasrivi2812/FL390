"use client";

import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/components/cart/cart-provider";
import { ProductVisual } from "@/components/product/product-visual";
import { formatPrice } from "@/lib/format";
import {
  defaultSize,
  hoverImage,
  primaryImage,
  type Product,
} from "@/lib/products";

const CARD_SIZES =
  "(min-width: 760px) 25vw, (min-width: 460px) 50vw, 100vw";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { add } = useCart();
  /** Les pastilles changent l'aperçu de la carte ; le lien mène à la fiche. */
  const [colorwayId, setColorwayId] = useState(product.colorways[0].id);
  const colorway =
    product.colorways.find((item) => item.id === colorwayId) ??
    product.colorways[0];

  const href = `/shop/${product.slug}` as const;
  const front = primaryImage(colorway);
  const back = hoverImage(colorway);

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-3/4 overflow-hidden rounded-card bg-stone">
        <Link href={href} aria-label={product.name} className="absolute inset-0">
          <ProductVisual
            src={back?.src ?? null}
            alt={`${product.name} — ${back?.caption ?? "visuel"}`}
            priority={priority}
            sizes={CARD_SIZES}
            className="absolute inset-0"
          />
          <ProductVisual
            src={front?.src ?? null}
            alt={`${product.name} — ${front?.caption ?? "visuel"}`}
            priority={priority}
            sizes={CARD_SIZES}
            className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0"
          />
        </Link>

        <span className="glass-control pointer-events-none absolute top-[12px] left-[12px] rounded-control px-[11px] py-[7px] text-[12px] tracking-[0.06em] text-ink uppercase">
          {product.tag}
        </span>

        {/* Cible tactile de 44 px, pour un carré visuel de 32 px calé à 12 px des bords. */}
        <button
          type="button"
          aria-label={`Ajouter ${product.name} au panier`}
          onClick={() => add(product.slug, colorway.id, defaultSize(colorway))}
          className="group/add absolute top-[6px] right-[6px] flex h-[44px] w-[44px] items-center justify-center"
        >
          <span className="glass-control flex h-[32px] w-[32px] items-center justify-center rounded-control text-[19px] leading-none font-light text-ink transition-transform duration-300 ease-out group-hover/add:rotate-90">
            +
          </span>
        </button>
      </div>

      <div className="flex items-baseline justify-between gap-[8px] px-[4px] pt-[13px] min-[760px]:gap-[12px]">
        <Link
          href={href}
          className="min-w-0 truncate text-[14px] transition-opacity duration-300 hover:opacity-60"
        >
          {product.name}
        </Link>
        <span className="shrink-0 text-[14px] whitespace-nowrap">
          {formatPrice(product.price)}
        </span>
      </div>

      {product.colorways.length > 1 ? (
        <div
          role="radiogroup"
          aria-label={`Coloris de ${product.name}`}
          className="-my-[16px] flex px-[4px] pt-[10px]"
        >
          {/* Le point garde ses 11 px ; c'est le bouton qui porte la cible
              tactile de 44 px de haut, sans décaler la mise en page. */}
          {product.colorways.map((item) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={item.id === colorway.id}
              aria-label={item.label}
              onClick={() => setColorwayId(item.id)}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setColorwayId(item.id);
              }}
              className="flex h-[44px] w-[18px] items-center justify-center"
            >
              <span
                className={`h-[11px] w-[11px] rounded-[999px] border border-black/30 outline outline-1 outline-offset-[3px] transition-[outline-color] duration-[220ms] ${
                  item.id === colorway.id ? "outline-ink" : "outline-transparent"
                }`}
                style={{ background: item.hex }}
              />
            </button>
          ))}
        </div>
      ) : (
        <div className="flex gap-[7px] px-[4px] pt-[10px]">
          {product.colorways.map((item) => (
            <span
              key={item.id}
              aria-hidden
              className="h-[11px] w-[11px] rounded-[999px] border border-black/30"
              style={{ background: item.hex }}
            />
          ))}
        </div>
      )}
    </article>
  );
}
