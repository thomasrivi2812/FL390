import Image from "next/image";
import Link from "next/link";

import { NavFlyout } from "@/components/layout/nav-flyout";
import { LOOKBOOK_PORTRAIT } from "@/lib/lookbook";

/** Volet « Lookbook » : quatre visuels du drop, en accès direct. */
export function LookbookFlyout({ onNavigate }: { onNavigate: () => void }) {
  return (
    <NavFlyout more={{ href: "/lookbook", label: "Découvrir plus" }}>
      <p className="font-label m-0 mb-[16px] text-[9px] font-bold tracking-[0.3em] text-burgundy uppercase">
        Drop 01 · Tarmac · 2026
      </p>

      <ul className="m-0 grid list-none grid-cols-2 gap-[14px] p-0 min-[760px]:grid-cols-4">
        {LOOKBOOK_PORTRAIT.slice(0, 4).map((figure) => (
          <li key={figure.src}>
            <Link
              href="/lookbook"
              onClick={onNavigate}
              className="group relative block aspect-3/4 overflow-hidden rounded-card bg-stone"
            >
              <Image
                src={figure.src}
                alt={figure.caption}
                fill
                sizes="(min-width: 760px) 22vw, 45vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-104"
              />
              <span className="glass-pill font-label absolute bottom-[10px] left-[10px] rounded-[999px] px-[12px] py-[7px] text-[9px] font-bold tracking-[0.24em] text-paper uppercase">
                {figure.caption}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </NavFlyout>
  );
}
