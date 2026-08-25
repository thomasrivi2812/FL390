import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/products";

/**
 * Quatre colonnes à partir de 760 px, deux en dessous — jamais une seule.
 *
 * Sur téléphone les cartes sont volontairement resserrées : gouttière de 6 px
 * au lieu de 14, pour que la grille se lise comme une planche continue plutôt
 * que comme une pile de vignettes isolées.
 */
export function ProductGrid({
  products,
  className,
  priorityCount = 0,
}: {
  products: Product[];
  className?: string;
  priorityCount?: number;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-[6px] min-[760px]:grid-cols-4 min-[760px]:gap-[14px] ${className ?? ""}`}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.slug}
          product={product}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
