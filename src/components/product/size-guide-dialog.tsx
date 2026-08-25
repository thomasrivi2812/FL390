"use client";

import { useEffect, useRef } from "react";

import { SIZE_GUIDE, SIZE_GUIDE_NOTE } from "@/lib/size-guide";

const LABEL = "font-label text-[9px] font-bold tracking-[0.26em] uppercase";

export function SizeGuideDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Fermer le guide des tailles"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/45"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
        className="animate-fl-fade-fast relative m-[12px] w-full max-w-[560px] rounded-card bg-paper p-[clamp(22px,4vw,34px)]"
      >
        <div className="flex items-start justify-between gap-[20px]">
          <h2 id="size-guide-title" className={`${LABEL} m-0`}>
            Guide des tailles
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={`${LABEL} text-black/42 transition-colors duration-300 hover:text-ink`}
          >
            Fermer
          </button>
        </div>

        <div className="mt-[22px] overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-ink">
                {["Taille", "Poitrine", "Longueur", "Épaules"].map((head) => (
                  <th
                    key={head}
                    scope="col"
                    className={`${LABEL} py-[10px] text-black/42`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZE_GUIDE.map((row) => (
                <tr key={row.size} className="border-b border-black/14">
                  <th
                    scope="row"
                    className="font-label py-[13px] text-[12px] font-bold tracking-[0.1em]"
                  >
                    {row.size}
                  </th>
                  <td className="py-[13px] text-[14px] font-semibold">
                    {row.chest} cm
                  </td>
                  <td className="py-[13px] text-[14px] font-semibold">
                    {row.length} cm
                  </td>
                  <td className="py-[13px] text-[14px] font-semibold">
                    {row.shoulders} cm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-[20px] mb-0 max-w-[52ch] text-[14px]/[1.7] text-black/60">
          {SIZE_GUIDE_NOTE}
        </p>
      </div>
    </div>
  );
}
