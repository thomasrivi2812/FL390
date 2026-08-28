import Image from "next/image";

import { PRESS, type PressMention } from "@/lib/press";

/**
 * Bande de revue de presse.
 *
 * Ne rend rien tant qu'aucune parution n'est déclarée : une section « vu dans »
 * vide ferait plus de tort que son absence. Les logos sont désaturés au repos
 * et reprennent leurs couleurs au survol, traitement habituel qui évite qu'une
 * juxtaposition de chartes tierces ne parasite la page.
 */
export function PressStrip() {
  if (PRESS.length === 0) return null;

  return (
    <section
      aria-labelledby="presse"
      className="border-b border-black/12 px-[22px] py-[clamp(26px,3.4vw,40px)]"
    >
      <h2
        id="presse"
        className="font-label m-0 text-center text-[9px] font-bold tracking-[0.32em] text-black/42 uppercase"
      >
        Vu dans
      </h2>

      {/* Rangée centrée au large, ruban que l'on fait glisser sur téléphone. */}
      <ul className="no-scrollbar m-0 mt-[clamp(18px,2.4vw,26px)] flex list-none items-center gap-[clamp(28px,5vw,64px)] overflow-x-auto p-0 min-[760px]:flex-wrap min-[760px]:justify-center min-[760px]:overflow-x-visible">
        {PRESS.map((mention) => (
          <li key={mention.name} className="shrink-0">
            <Mention mention={mention} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Mention({ mention }: { mention: PressMention }) {
  const content =
    mention.logo && mention.width && mention.height ? (
      <Image
        src={mention.logo}
        alt={mention.name}
        width={mention.width}
        height={mention.height}
        sizes="160px"
        className="h-[clamp(18px,2.2vw,26px)] w-auto object-contain opacity-45 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
      />
    ) : (
      <span className="font-display block text-[clamp(0.95rem,1.6vw,1.25rem)] leading-none whitespace-nowrap text-black/45 transition-colors duration-300 group-hover:text-ink">
        {mention.name}
      </span>
    );

  if (!mention.href) {
    return <div className="group flex items-center">{content}</div>;
  }

  return (
    <a
      href={mention.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${mention.name} — lire l'article`}
      className="group flex min-h-[44px] items-center"
    >
      {content}
    </a>
  );
}
