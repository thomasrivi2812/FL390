import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CaptionPill } from "@/components/ui/caption-pill";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "Drop 01 · Tarmac · 2026 — les six visuels de la collection.",
};

const FIGURES = [
  { src: "/img/cleared-navy.png", caption: "01 — Cleared, navy" },
  { src: "/img/cdg-lhr.png", caption: "02 — CDG · LHR" },
  { src: "/img/climb-bw.png", caption: "03 — Climb, N&B" },
  { src: "/img/cleared.png", caption: "04 — Cleared" },
  { src: "/img/departures.png", caption: "05 — Departures" },
  { src: "/img/climb.png", caption: "06 — Climb, couleur" },
] as const;

export default function LookbookPage() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-[20px] border-b border-ink px-[22px] py-[clamp(26px,4vw,52px)]">
        <h1 className="font-display m-0 text-[clamp(2rem,9vw,7rem)] leading-[0.9] tracking-[-0.02em]">
          Lookbook
        </h1>
        <p className="font-label m-0 text-[10px] font-bold tracking-[0.24em] text-black/42 uppercase">
          Drop 01 · Tarmac · 2026
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-[14px] px-[22px] py-[18px]">
        {FIGURES.map((figure, index) => (
          <figure
            key={figure.src}
            className="group relative m-0 aspect-3/4 overflow-hidden rounded-card bg-stone"
          >
            <Image
              src={figure.src}
              alt={figure.caption}
              fill
              priority={index < 2}
              sizes="(min-width: 1060px) 33vw, (min-width: 720px) 50vw, 100vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-104"
            />
            <CaptionPill className="bottom-[14px] left-[14px]">
              {figure.caption}
            </CaptionPill>
          </figure>
        ))}
      </div>

      <div className="px-[22px] py-[clamp(40px,7vw,96px)] text-center">
        <Link
          href="/shop"
          className="font-label inline-block rounded-[999px] border border-paper/16 bg-black/86 px-[36px] py-[19px] text-[11px] font-bold tracking-[0.28em] text-paper uppercase backdrop-blur-[16px] transition-colors duration-300 hover:bg-burgundy"
        >
          Acheter les pièces
        </Link>
      </div>
    </>
  );
}
