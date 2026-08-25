import Image from "next/image";
import Link from "next/link";

import { CaptionPill } from "@/components/ui/caption-pill";

export function LookbookTeaser() {
  return (
    <section className="mx-[22px] mt-[34px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] overflow-hidden rounded-card bg-ink">
      <div className="relative aspect-4/5 overflow-hidden rounded-tl-card">
        <Image
          src="/img/cleared.png"
          alt="T-shirt Cleared For Takeoff, impression au dos"
          fill
          sizes="(min-width: 860px) 50vw, 100vw"
          className="object-cover"
        />
        <CaptionPill className="bottom-[16px] left-[16px]">
          01 — Cleared For Takeoff
        </CaptionPill>
      </div>

      <div className="flex flex-col justify-center gap-[24px] px-[clamp(24px,4vw,64px)] py-[clamp(36px,6vw,84px)] text-paper">
        <span className="font-label text-[9px] font-bold tracking-[0.32em] text-burgundy uppercase">
          Le lookbook
        </span>
        <p className="font-display m-0 text-[clamp(1.3rem,2.6vw,2.3rem)] leading-[1.2]">
          Dessiné en croisière, à 39 000 pieds.
        </p>
        <p className="m-0 max-w-[46ch] text-[15px]/[1.75] text-paper/66">
          FL390 est fondée par un pilote de ligne. La discipline du cockpit
          appliquée au vêtement : rien de décoratif, tout est vérifié. Coton
          peigné 270 g, séries courtes, fabrication française.
        </p>
        <Link
          href="/lookbook"
          className="glass-pill-cta font-label self-start rounded-[999px] px-[26px] py-[15px] text-[11px] font-bold tracking-[0.26em] uppercase transition-colors duration-300 hover:bg-paper/90 hover:text-ink"
        >
          Voir le lookbook
        </Link>
      </div>

      <div className="relative col-span-full aspect-4/5 overflow-hidden rounded-b-card">
        <Image
          src="/img/departures.png"
          alt="T-shirt Departures, dix-huit codes OACI imprimés au dos"
          fill
          sizes="100vw"
          style={{ objectPosition: "50% 34%" }}
          className="object-cover"
        />
        <CaptionPill className="bottom-[16px] left-[16px]">
          02 — Departures
        </CaptionPill>
      </div>
    </section>
  );
}
