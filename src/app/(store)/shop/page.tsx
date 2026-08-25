import type { Metadata } from "next";
import Link from "next/link";

import { ProductGrid } from "@/components/product/product-grid";
import { SizeFilterBar } from "@/components/product/size-filter-bar";
import { getProducts, isSize, type Size } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop all",
  description:
    "Les cinq pièces du Drop 01 — coton peigné 270 g, coupe oversize, fabrication française.",
};

export default async function ShopPage(props: PageProps<"/shop">) {
  const { taille } = await props.searchParams;
  const raw = Array.isArray(taille) ? taille[0] : taille;
  const active: Size | null = raw && isSize(raw) ? raw : null;

  const products = await getProducts();
  const filtered = active
    ? products.filter((product) => product.sizes.includes(active))
    : products;

  return (
    <>
      <div className="border-b border-ink px-[22px] py-[clamp(26px,4vw,52px)]">
        <h1 className="font-display m-0 text-[clamp(2rem,9vw,7rem)] leading-[0.9] tracking-[-0.02em]">
          Shop all
        </h1>
      </div>

      <SizeFilterBar active={active} count={filtered.length} />

      {filtered.length > 0 ? (
        <ProductGrid
          products={filtered}
          priorityCount={4}
          className="px-[22px] pt-[18px] pb-[46px]"
        />
      ) : (
        <div className="flex flex-col items-start gap-[18px] px-[22px] pt-[clamp(40px,7vw,80px)] pb-[clamp(60px,9vw,120px)]">
          <p className="font-display m-0 text-[clamp(1.3rem,3vw,2.2rem)] leading-[1.1]">
            Rien en {active} pour l&apos;instant.
          </p>
          <p className="m-0 max-w-[46ch] text-[15px]/[1.75] text-black/60">
            Le Drop 01 tient en séries courtes et toutes les pièces ne sont pas
            déclinées dans chaque taille. Écrivez-nous si vous cherchez une
            taille précise.
          </p>
          <Link
            href="/shop"
            className="font-label border-b border-black/30 pb-[2px] text-[9px] font-bold tracking-[0.24em] uppercase transition-colors duration-300 hover:text-burgundy"
          >
            Voir toutes les pièces
          </Link>
        </div>
      )}
    </>
  );
}
