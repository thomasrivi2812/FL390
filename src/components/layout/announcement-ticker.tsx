import { Marquee } from "@/components/ui/marquee";
import { ANNOUNCEMENTS } from "@/lib/site";

/** Barre 1 de l'en-tête : 36 px de haut, glass, défilement 34 s. */
export function AnnouncementTicker() {
  return (
    <div className="glass-ticker flex h-[36px] items-center border-b border-black/7">
      <Marquee
        durationMs={34000}
        gapPx={52}
        className="font-label text-[10px] font-semibold tracking-[0.34em] text-ink uppercase"
      >
        {ANNOUNCEMENTS.map((announcement) => (
          <span key={announcement} className="inline-flex items-center gap-[52px]">
            <span>{announcement}</span>
            <span className="text-burgundy">✳</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
