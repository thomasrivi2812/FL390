import Image from "next/image";
import Link from "next/link";

import { NavFlyout } from "@/components/layout/nav-flyout";
import { allProducts, CATEGORIES, countByCategory } from "@/lib/products";

/** Volet « Shop all » : les rayons, et un visuel du drop en cours. */
export function ShopFlyout({ onNavigate }: { onNavigate: () => void }) {
  const products = allProducts();

  return (
    <NavFlyout more={{ href: "/shop", label: "Découvrir plus" }}>
      <div className="grid gap-[clamp(24px,4vw,60px)] min-[860px]:grid-cols-[1.1fr_0.9fr]">
        <ul className="m-0 flex list-none flex-col p-0">
          {CATEGORIES.map((category) => {
            const count = countByCategory(products, category.slug);
            return (
              <li key={category.slug} className="border-t border-black/12">
                <Link
                  href={`/shop?categorie=${category.slug}`}
                  onClick={onNavigate}
                  className="group flex items-baseline justify-between gap-[20px] py-[clamp(12px,1.6vw,18px)]"
                >
                  <span className="font-display text-[clamp(1.3rem,2.6vw,2rem)] leading-[1.1] tracking-[-0.01em] transition-colors duration-300 group-hover:text-burgundy">
                    {category.label}
                  </span>
                  <span className="font-label text-[10px] font-bold tracking-[0.22em] whitespace-nowrap text-black/42 uppercase">
                    {count === 1 ? "1 pièce" : `${count} pièces`}
                  </span>
                </Link>
                <p className="mt-0 mb-[clamp(12px,1.6vw,18px)] max-w-[46ch] text-[14px]/[1.6] text-black/60">
                  {category.blurb}
                </p>
              </li>
            );
          })}
        </ul>

        <Link
          href="/shop"
          onClick={onNavigate}
          className="group relative hidden min-h-[260px] overflow-hidden rounded-card bg-stone min-[860px]:block"
        >
          <Image
            src="/img/cleared-navy.png"
            alt="Cleared For Takeoff — Navy"
            fill
            sizes="45vw"
            style={{ objectPosition: "50% 22%" }}
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-104"
          />
          {/* Pastille en glass clair : la pastille sur image du système est pensée
              pour des photos sombres, celle-ci est posée sur un fond beige. */}
          <span className="glass-control font-label absolute bottom-[14px] left-[14px] rounded-[999px] px-[14px] py-[8px] text-[9px] font-bold tracking-[0.28em] text-ink uppercase">
            Drop 01 — en ligne
          </span>
        </Link>
      </div>
    </NavFlyout>
  );
}
