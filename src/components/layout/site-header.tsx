"use client";

import Link from "next/link";

import { useCart } from "@/components/cart/cart-provider";
import { AnnouncementTicker } from "@/components/layout/announcement-ticker";
import { Wordmark } from "@/components/layout/wordmark";
import { padCount } from "@/lib/format";
import { NAV_LINKS } from "@/lib/site";

/**
 * En-tête fixe, 96 px au total (ticker 36 + navigation 60).
 * Les deux barres portent une hauteur explicite pour que le décalage ne bouge
 * pas pendant le chargement des polices — le spacer des pages internes et les
 * barres sticky en dépendent (`--header-height`).
 */
export function SiteHeader() {
  const { count, open } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-60">
      <AnnouncementTicker />

      <div className="glass-nav grid h-[60px] grid-cols-[1fr_auto_1fr] items-center gap-[8px] border-b border-black/7 px-[14px] shadow-[0_8px_34px_rgba(0,0,0,0.06)] min-[560px]:gap-[14px] min-[560px]:px-[20px]">
        <nav
          aria-label="Navigation principale"
          className="font-label flex items-center gap-[10px] text-[10px] font-bold tracking-[0.2em] whitespace-nowrap uppercase min-[560px]:gap-[16px] min-[760px]:gap-[22px]"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-300 hover:text-burgundy ${
                link.href === "/contact" ? "hidden min-[560px]:inline" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" aria-label="FL390 Paris — accueil">
          <Wordmark
            markClassName="text-[18px]"
            cityClassName="text-[7px] tracking-[0.62em] indent-[0.62em]"
          />
        </Link>

        <div className="flex items-center justify-end gap-[18px]">
          <span className="font-label hidden text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase min-[900px]:inline">
            FR / EUR
          </span>
          <button
            type="button"
            onClick={open}
            className="font-label rounded-[999px] border border-paper/14 bg-black/82 px-[13px] py-[8px] text-[10px] font-bold tracking-[0.2em] whitespace-nowrap text-paper uppercase backdrop-blur-[14px] transition-colors duration-300 hover:bg-burgundy"
          >
            Panier · {padCount(count)}
          </button>
        </div>
      </div>
    </header>
  );
}
