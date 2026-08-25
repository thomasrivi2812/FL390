import { Marquee } from "@/components/ui/marquee";

export function TypographicMarquee() {
  return (
    <div className="border-b border-black/12 bg-paper py-[14px] text-ink">
      <Marquee
        durationMs={26000}
        gapPx={34}
        className="font-display text-[clamp(1.4rem,4.4vw,3.4rem)] leading-none"
      >
        <span className="inline-flex items-center gap-[34px]">
          <span>NOT FOR EVERYONE</span>
          <span className="text-burgundy">/</span>
          <span>NOT FOR EVERYONE</span>
          <span className="text-burgundy">/</span>
        </span>
      </Marquee>
    </div>
  );
}
