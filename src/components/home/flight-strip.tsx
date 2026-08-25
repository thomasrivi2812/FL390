import { FLIGHT_STRIP } from "@/lib/site";

/** Élément signature. Vocabulaire strictement cockpit — aucune donnée produit. */
export function FlightStrip() {
  return (
    <div className="mx-[22px] grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] overflow-hidden rounded-[14px] bg-ink text-paper">
      {FLIGHT_STRIP.map((cell) => (
        <div
          key={cell.key}
          className="font-label flex flex-col gap-[6px] border-r border-paper/16 px-[12px] py-[16px]"
        >
          <span className="text-[9px] font-semibold tracking-[0.3em] text-paper/40 uppercase">
            {cell.key}
          </span>
          <span className="text-[14px] font-bold tracking-[0.12em]">
            {cell.value}
          </span>
        </div>
      ))}
    </div>
  );
}
