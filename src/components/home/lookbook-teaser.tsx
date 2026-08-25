import Image from "next/image";
import Link from "next/link";

import { CaptionPill } from "@/components/ui/caption-pill";

/**
 * Deux photographies côte à côte, la copy posée sur celle de gauche.
 *
 * La grille `auto-fit` du handoff ouvrait une troisième colonne à partir de
 * 1200 px de large, que la bande basse occupait sans la remplir : il en
 * résultait un grand aplat noir vide à droite du texte. Un gabarit à deux
 * colonnes fixes règle le problème et laisse les visuels porter le bloc.
 */
export function LookbookTeaser() {
  return (
    <section className="mx-[22px] mt-[34px] grid gap-[14px] min-[760px]:grid-cols-2">
      {/* En colonne unique, la copy est plus haute que la photo ne le permet :
          la cellule s'étire au lieu d'imposer son ratio, qui ne reprend qu'à
          partir de deux colonnes. */}
      <div className="relative flex min-h-[520px] flex-col justify-end overflow-hidden rounded-card bg-stone min-[760px]:aspect-4/5 min-[760px]:min-h-0">
        <Image
          src="/img/cleared.png"
          alt="T-shirt Cleared For Takeoff, impression au dos"
          fill
          sizes="(min-width: 760px) 50vw, 100vw"
          className="object-cover"
        />
        {/* Voile d'ambiance sur toute l'image. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.08)_60%,transparent_100%)]" />

        {/* Le dégradé porteur est sur le bloc de texte, pas sur l'image : il
            épouse ainsi exactement la hauteur de la copy à toutes les largeurs.
            L'accroche est en bordeaux, couleur pensée pour du noir plein — il
            faut donc l'amener près du noir derrière elle. */}
        <div className="relative flex flex-col gap-[18px] bg-[linear-gradient(to_top,rgba(0,0,0,0.93)_0%,rgba(0,0,0,0.9)_78%,rgba(0,0,0,0.5)_93%,transparent_100%)] px-[clamp(22px,3vw,40px)] pt-[clamp(48px,7vw,96px)] pb-[clamp(22px,3vw,40px)] text-paper">
          <span className="font-label text-[9px] font-bold tracking-[0.32em] text-burgundy uppercase">
            Le lookbook
          </span>
          <p className="font-display m-0 max-w-[16ch] text-[clamp(1.3rem,2.6vw,2.3rem)] leading-[1.2]">
            Dessiné en croisière, à 39 000 pieds.
          </p>
          <p className="m-0 max-w-[42ch] text-[15px]/[1.75] text-paper/80">
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
      </div>

      <div className="relative aspect-4/5 overflow-hidden rounded-card bg-stone">
        <Image
          src="/img/departures.png"
          alt="T-shirt Departures, dix-huit codes OACI imprimés au dos"
          fill
          sizes="(min-width: 760px) 50vw, 100vw"
          style={{ objectPosition: "50% 34%" }}
          className="object-cover"
        />
        <CaptionPill className="bottom-[16px] left-[16px]">
          Departures
        </CaptionPill>
      </div>
    </section>
  );
}
