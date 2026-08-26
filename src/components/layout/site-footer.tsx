import Link from "next/link";

import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Wordmark } from "@/components/layout/wordmark";
import { FOOTER_COLUMNS, SITE } from "@/lib/site";

const HEADING =
  "font-label text-[10px] font-bold tracking-[0.3em] text-paper/38 uppercase";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[34px] px-[22px] py-[clamp(40px,6vw,78px)]">
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.heading}>
            <h2 className={`${HEADING} m-0`}>{column.heading}</h2>
            <ul className="m-0 mt-[10px] flex list-none flex-col p-0">
              {column.links.map((link) => (
                <li key={link.href}>
                  {/* Bloc et rembourrage vertical : au doigt, un lien de 15 px
                      de haut n'est pas une cible atteignable. */}
                  <Link
                    href={link.href}
                    className="font-label block py-[14px] text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 hover:text-burgundy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className={`${HEADING} m-0`}>Newsletter</h2>
          <p className="mt-[18px] mb-[18px] text-[14px]/[1.6] text-paper/66">
            Une annonce par drop. Rien d&apos;autre.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="px-[12px] pb-[14px]">
        <Wordmark
          gapClassName="gap-[2px]"
          markClassName="text-[clamp(2rem,11vw,9rem)] leading-[0.84] tracking-[-0.03em]"
          cityClassName="text-[clamp(8px,1.5vw,16px)] tracking-[0.72em] indent-[0.72em]"
        />
      </div>

      <div className="font-label flex flex-wrap justify-between gap-[12px] border-t border-paper/18 px-[22px] py-[16px] text-[10px] tracking-[0.18em] text-paper/40 uppercase">
        <span>{SITE.legal}</span>
        <span>{SITE.tagline}</span>
      </div>
    </footer>
  );
}
