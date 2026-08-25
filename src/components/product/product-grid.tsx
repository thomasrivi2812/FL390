import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/products";

/**
 * Quatre colonnes à partir de ~760 px, deux au-dessus de ~460 px, une en dessous.
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
      className={`grid grid-cols-1 gap-[14px] min-[460px]:grid-cols-2 min-[760px]:grid-cols-4 ${className ?? ""}`}
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
