/**
 * Constantes d'identité et de navigation.
 */

export const SITE = {
  name: "FL390",
  city: "PARIS",
  fullName: "FL390 Paris",
  tagline: "See you at FL390.",
  description:
    "Streetwear d'inspiration aéronautique fondé par un pilote de ligne. Coton peigné 270 g, séries courtes, fabrication française.",
  locale: "FR / EUR",
  /**
   * ⚠️ Adresse de contact provisoire héritée du handoff.
   * À remplacer par l'adresse réelle de la marque avant la mise en ligne :
   * elle apparaît sur la page Contact et dans les données structurées.
   */
  email: "contact@fl390.paris",
  legal: "© 2026 FL390 Paris — Fabriqué en France",
} as const;

/**
 * Normalise une URL de site : ignore les valeurs vides, ajoute `https://`
 * quand le protocole manque, retire la barre oblique finale.
 * Rend `null` si la valeur est inexploitable, pour laisser jouer le repli.
 */
function normalizeSiteUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return new URL(candidate).href.replace(/\/$/, "");
  } catch {
    console.warn(`[site] URL ignorée car invalide : ${JSON.stringify(value)}`);
    return null;
  }
}

/**
 * URL publique, utilisée pour les métadonnées absolues, le sitemap et robots.txt.
 *
 * Une variable déclarée mais vide ne doit jamais faire échouer le build : elle
 * est traitée comme absente. À défaut de `NEXT_PUBLIC_SITE_URL`, on retombe sur
 * le domaine de production fourni par Vercel, puis sur l'URL du déploiement
 * courant (utile pour les previews), puis sur le développement local.
 */
export const siteUrl =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalizeSiteUrl(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) ??
  normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  normalizeSiteUrl(process.env.NEXT_PUBLIC_VERCEL_URL) ??
  normalizeSiteUrl(process.env.VERCEL_URL) ??
  "http://localhost:3000";

export const ANNOUNCEMENTS = [
  "Livraison offerte dès 120 €",
  "Fabriqué en France",
  "Collection 01 — séries courtes",
  "See you at FL390",
] as const;

export const NAV_LINKS = [
  { href: "/shop", label: "Shop all" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_COLUMNS = [
  {
    heading: "Boutique",
    links: [
      { href: "/shop", label: "Shop all" },
      { href: "/lookbook", label: "Lookbook" },
    ],
  },
  {
    heading: "Aide",
    links: [
      { href: "/livraison", label: "Livraison" },
      { href: "/retours", label: "Retours" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

/** Bandeau « plan de vol » — vocabulaire strictement cockpit. */
export const FLIGHT_STRIP = [
  { key: "Vol", value: "FL390" },
  { key: "Origine", value: "CDG — PARIS" },
  { key: "Niveau", value: "39 000 FT" },
  { key: "Cap", value: "270°" },
  { key: "Statut", value: "CLEARED" },
] as const;

export const MANIFESTO_QUOTES = [
  "Discipline can take you places passion never will.",
  "You. Me. Departure. No Return.",
  "See You At FL390.",
  "Not For Everyone.",
] as const;
