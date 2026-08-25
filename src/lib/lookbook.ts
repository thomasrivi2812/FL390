/** Visuels du lookbook, partagés par la page et le volet de l'en-tête. */
export type LookbookEntry = {
  src: string;
  caption: string;
  /** Prise de vue au format bannière : elle occupe toute la largeur. */
  wide?: boolean;
};

export const LOOKBOOK: LookbookEntry[] = [
  { src: "/img/editorial-both.png", caption: "01 — Discipline & Cleared", wide: true },
  { src: "/img/discipline-worn.png", caption: "02 — Discipline" },
  { src: "/img/cleared-navy-worn.png", caption: "03 — Cleared, navy" },
  { src: "/img/you-me-worn.png", caption: "04 — You. Me. Departure." },
  { src: "/img/hero-cdg-lhr.png", caption: "05 — CDG · LHR", wide: true },
  { src: "/img/hoodie-discipline-worn.png", caption: "06 — Sweat Discipline" },
  { src: "/img/cleared-black-worn.png", caption: "07 — Cleared, tarmac" },
  { src: "/img/departures.png", caption: "08 — Departures" },
  { src: "/img/editorial-tote.png", caption: "09 — Remove Before Flight", wide: true },
];

/** Entrées au format portrait, pour les grilles à ratio fixe. */
export const LOOKBOOK_PORTRAIT = LOOKBOOK.filter((entry) => !entry.wide);
