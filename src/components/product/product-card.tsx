"use client";

import Link from "next/link";

import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import { ProductVisual } from "@/components/product/product-visual";
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
  const href = `/shop/${product.slug}` as const;
  const front = primaryImage(product);
  const back = hoverImage(product);

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
          onClick={() => add(product.slug, defaultSize(product))}
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

      <div className="flex gap-[7px] px-[4px] pt-[10px]">
        {product.dots.map((dot) => (
          <span
            key={dot}
            aria-hidden
            className="h-[11px] w-[11px] rounded-[999px] border border-black/30"
            style={{ background: dot }}
          />
        ))}
      </div>
    </article>
  );
}
