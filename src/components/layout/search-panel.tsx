"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";

import { NavFlyout } from "@/components/layout/nav-flyout";
import { ProductVisual } from "@/components/product/product-visual";
import { formatPrice } from "@/lib/format";
import { allProducts, findCategory, primaryImage } from "@/lib/products";

/**
 * Recherche dans le catalogue.
 *
 * Le filtrage est local : le drop tient en quelques pièces, une requête serveur
 * n'apporterait rien. Le jour où le catalogue grossit, c'est ici que se branche
 * une vraie recherche — le composant garde sa forme.
 */
export function SearchPanel({
  inputRef,
  onNavigate,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onNavigate: () => void;
}) {
  const inputId = useId();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle.length < 2) return [];
    return allProducts().filter((product) =>
      [
        product.name,
        product.color,
        product.description,
        findCategory(product.category).label,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  const searching = query.trim().length >= 2;

  return (
    <NavFlyout>
      <label htmlFor={inputId} className="sr-only">
        Rechercher une pièce
      </label>
      <input
        id={inputId}
        ref={inputRef}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Rechercher"
        autoComplete="off"
        className="font-display w-full border-0 border-b border-black/12 bg-transparent pb-[14px] text-[clamp(1.5rem,4vw,2.6rem)] leading-[1.1] tracking-[-0.02em] placeholder:text-black/24 focus:outline-none"
      />

      {searching && (
        <>
          <p
            aria-live="polite"
            className="font-label mt-[16px] mb-0 text-[10px] font-bold tracking-[0.22em] text-black/42 uppercase"
          >
            {results.length === 0
              ? "Aucun résultat"
              : results.length === 1
                ? "1 pièce"
                : `${results.length} pièces`}
          </p>

          {results.length > 0 && (
            <ul className="m-0 mt-[18px] grid list-none grid-cols-2 gap-[6px] p-0 min-[760px]:grid-cols-4 min-[760px]:gap-[14px]">
              {results.slice(0, 8).map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/shop/${product.slug}`}
                    onClick={onNavigate}
                    className="group block"
                  >
                    <span className="relative block aspect-3/4 overflow-hidden rounded-card bg-stone">
                      <ProductVisual
                        src={primaryImage(product)?.src ?? null}
                        alt={product.name}
                        sizes="(min-width: 760px) 22vw, 45vw"
                        className="absolute inset-0"
                      />
                    </span>
                    <span className="mt-[10px] flex items-baseline justify-between gap-[10px] text-[13px]">
                      <span className="min-w-0 truncate transition-opacity duration-300 group-hover:opacity-60">
                        {product.name}
                      </span>
                      <span className="shrink-0 whitespace-nowrap">
                        {formatPrice(product.price)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </NavFlyout>
  );
}
