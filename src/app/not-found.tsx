import Link from "next/link";

import { HeaderSpacer } from "@/components/layout/header-spacer";

export default function NotFound() {
  return (
    <>
      <HeaderSpacer />
      <div className="flex flex-col items-start gap-[20px] px-[22px] pt-[clamp(40px,7vw,80px)] pb-[clamp(60px,9vw,120px)]">
        <p className="font-label m-0 text-[9px] font-bold tracking-[0.3em] text-burgundy uppercase">
          FL390 / 404
        </p>
        <h1 className="font-display m-0 text-[clamp(1.8rem,6vw,4rem)] leading-[0.98] tracking-[-0.02em]">
          Hors trajectoire.
        </h1>
        <p className="m-0 max-w-[52ch] text-[16px]/[1.75] text-black/60">
          Cette page n&apos;existe pas ou n&apos;existe plus. Le Drop 01 se
          trouve dans la boutique.
        </p>
        <Link
          href="/shop"
          className="font-label mt-[8px] rounded-[999px] border border-paper/14 bg-black/90 px-[36px] py-[19px] text-[11px] font-bold tracking-[0.28em] text-paper uppercase transition-colors duration-300 hover:bg-burgundy"
        >
          Retour à la boutique
        </Link>
      </div>
    </>
  );
}
