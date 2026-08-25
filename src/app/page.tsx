import Link from "next/link";

import { FlightStrip } from "@/components/home/flight-strip";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { LookbookTeaser } from "@/components/home/lookbook-teaser";
import { Manifesto } from "@/components/home/manifesto";
import { TypographicMarquee } from "@/components/home/typographic-marquee";
import { ProductGrid } from "@/components/product/product-grid";
import { getProducts } from "@/lib/products";

/**
 * L'accueil ne pose pas de spacer : le hero passe volontairement en plein cadre
 * sous l'en-tête en glass.
 */
export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <HeroCarousel />
      <TypographicMarquee />

      <section className="pb-[34px]">
        <div className="flex items-end justify-between gap-[20px] px-[22px] pt-[34px] pb-[18px]">
          <h2 className="font-display m-0 text-[clamp(1.3rem,3vw,2.2rem)] leading-none tracking-[-0.01em]">
            Nouvelles arrivées
          </h2>
          <Link
            href="/shop"
            className="border-b border-ink pb-[2px] text-[13px] tracking-[0.08em] whitespace-nowrap uppercase transition-opacity duration-300 hover:opacity-55"
          >
            Tout voir
          </Link>
        </div>
        <ProductGrid products={products.slice(0, 4)} className="px-[22px]" />
      </section>

      <FlightStrip />
      <LookbookTeaser />
      <Manifesto />
    </>
  );
}
