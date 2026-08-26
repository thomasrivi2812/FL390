import type { Metadata } from "next";
import Link from "next/link";

import { ProductGrid } from "@/components/product/product-grid";
import { ShopFilters } from "@/components/product/shop-filters";
import {
  findCategory,
  getProducts,
  isCategorySlug,
  isSize,
  offeredSizes,
  type CategorySlug,
  type Size,
} from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop all",
  description:
    "T-shirts, sweats et accessoires du Drop 01 — coton peigné 270 g, séries courtes, fabrication française.",
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ShopPage(props: PageProps<"/shop">) {
  const params = await props.searchParams;

  const rawCategory = first(params.categorie);
  const category: CategorySlug | null =
    rawCategory && isCategorySlug(rawCategory) ? rawCategory : null;

  const rawSize = first(params.taille);
  const size: Size | null = rawSize && isSize(rawSize) ? rawSize : null;

  const products = await getProducts();
  const inCategory = category
    ? products.filter((product) => product.category === category)
    : products;
  const filtered = size
    ? inCategory.filter((product) => offeredSizes(product).includes(size))
    : inCategory;

  /** Inutile de proposer des tailles à un rayon qui n'en décline aucune. */
  const showSizes = inCategory.some(
    (product) => offeredSizes(product).length > 0,
  );

  return (
    <>
      <div className="border-b border-ink px-[22px] py-[clamp(26px,4vw,52px)]">
        <h1 className="font-display m-0 text-[clamp(2rem,9vw,7rem)] leading-[0.9] tracking-[-0.02em]">
          {category ? findCategory(category).label : "Shop all"}
        </h1>
        {category && (
          <p className="mt-[14px] mb-0 max-w-[52ch] text-[15px]/[1.75] text-black/60">
            {findCategory(category).blurb}
          </p>
        )}
        {/* Le compte quitte la barre collée sur téléphone, où chaque pixel de
            hauteur est pris sur les produits. */}
        <p
          aria-live="polite"
          className="font-label mt-[14px] mb-0 text-[10px] font-bold tracking-[0.22em] text-black/42 uppercase min-[760px]:hidden"
        >
          {filtered.length === 1 ? "1 pièce" : `${filtered.length} pièces`}
        </p>
      </div>

      <ShopFilters
        category={category}
        size={size}
        count={filtered.length}
        showSizes={showSizes}
      />

      {filtered.length > 0 ? (
        <ProductGrid
          products={filtered}
          priorityCount={4}
          className="px-[22px] pt-[18px] pb-[46px]"
        />
      ) : (
        <EmptyState category={category} size={size} />
      )}
    </>
  );
}

function EmptyState({
  category,
  size,
}: {
  category: CategorySlug | null;
  size: Size | null;
}) {
  const label = category ? findCategory(category).label.toLowerCase() : null;

  return (
    <div className="flex flex-col items-start gap-[18px] px-[22px] pt-[clamp(40px,7vw,80px)] pb-[clamp(60px,9vw,120px)]">
      <p className="font-display m-0 text-[clamp(1.3rem,3vw,2.2rem)] leading-[1.1]">
        {size && label
          ? `Rien en ${size} du côté des ${label}.`
          : size
            ? `Rien en ${size} pour l'instant.`
            : `Les ${label} arrivent bientôt.`}
      </p>
      <p className="m-0 max-w-[46ch] text-[15px]/[1.75] text-black/60">
        Le Drop 01 tient en séries courtes et toutes les pièces ne sont pas
        déclinées dans chaque taille. Écrivez-nous si vous cherchez une pièce
        précise.
      </p>
      <Link
        href="/shop"
        className="font-label border-b border-black/30 pb-[2px] text-[9px] font-bold tracking-[0.24em] uppercase transition-colors duration-300 hover:text-burgundy"
      >
        Voir toutes les pièces
      </Link>
    </div>
  );
}
