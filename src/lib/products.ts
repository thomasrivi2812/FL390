/**
 * Catalogue Drop 01.
 *
 * Source de vérité provisoire : les cinq pièces du handoff sont codées en dur.
 * Le jour où un backend commerce (Shopify, Stripe, CMS…) est branché, ce module
 * devient la couche d'accès — `getProducts` / `getProduct` gardent leur
 * signature asynchrone pour que les pages n'aient pas à changer.
 */

export const SIZES = ["XS", "S", "M", "L", "XL"] as const;
export type Size = (typeof SIZES)[number];

export type Product = {
  slug: string;
  name: string;
  color: string;
  price: number;
  tag: string;
  /** Pastilles de coloris — décoratives tant qu'il n'y a pas de variantes. */
  dots: string[];
  /** Visuel principal. */
  image: string;
  /** Second visuel révélé au survol de la carte. Identique au premier tant que
   *  la marque n'a pas fourni une seconde prise de vue par pièce. */
  secondImage: string;
  sizes: Size[];
  description: string;
};

/** Communes aux cinq pièces du drop. */
export const SPEC_ROWS = [
  { key: "Matière", value: "100 % coton peigné" },
  { key: "Grammage", value: "270 g/m²" },
  { key: "Coupe", value: "Oversize, épaules tombantes" },
  { key: "Impression", value: "Dos, sérigraphie mate" },
  { key: "Tailles", value: "XS · S · M · L · XL" },
  { key: "Fabrication", value: "France" },
] as const;

const PRODUCTS: Product[] = [
  {
    slug: "cleared-tee",
    name: "Cleared For Takeoff",
    color: "Noir",
    price: 85,
    tag: "New in",
    dots: ["#000000", "#FDFDFD"],
    image: "/img/cleared.png",
    secondImage: "/img/cleared.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Le message d'ouverture de la marque, imprimé au dos en grand. Coupe oversize, épaules tombantes, col côtelé.",
  },
  {
    slug: "departures-tee",
    name: "Departures",
    color: "Blanc",
    price: 85,
    tag: "New in",
    dots: ["#FDFDFD", "#092242"],
    image: "/img/departures.png",
    secondImage: "/img/departures.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Dix-huit codes OACI empilés sur toute la hauteur du dos. Blanc cassé, impression noire mate, coupe oversize.",
  },
  {
    slug: "climb-tee",
    name: "Climb And Maintain",
    color: "Noir",
    price: 85,
    tag: "New in",
    dots: ["#000000", "#27351B"],
    image: "/img/climb.png",
    secondImage: "/img/climb-bw.png",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Monter, puis tenir le niveau. Impression dos trois lignes, coton peigné 270 g, coupe oversize.",
  },
  {
    slug: "cleared-navy",
    name: "Cleared For Takeoff — Navy",
    color: "Navy",
    price: 85,
    tag: "New in",
    dots: ["#1B2A4A", "#000000"],
    image: "/img/cleared-navy.png",
    secondImage: "/img/cleared-navy.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "La signature de la marque en bleu marine, impression dos blanche mate avec la mention born to fly. Coupe oversize, coton peigné 270 g.",
  },
  {
    slug: "cdg-lhr",
    name: "CDG — LHR",
    color: "Navy",
    price: 85,
    tag: "New in",
    dots: ["#1B2A4A", "#FDFDFD"],
    image: "/img/cdg-lhr.png",
    secondImage: "/img/cdg-lhr.png",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Treize codes OACI répartis sur le dos, logo poitrine discret. Bleu marine, impression blanche mate, coupe oversize.",
  },
];

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return PRODUCTS.find((product) => product.slug === slug);
}

/** Résolution synchrone, pour le panier côté client. */
export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function isSize(value: string): value is Size {
  return (SIZES as readonly string[]).includes(value);
}

/** Une seconde prise de vue n'existe que si elle diffère de la première. */
export function hasSecondView(product: Product): boolean {
  return product.secondImage !== product.image;
}

export function productMeta(product: Product): string {
  return `T-shirt · ${product.color} · 270 g`;
}

/** Taille présélectionnée : L par défaut, sinon la première proposée. */
export function defaultSize(product: Product): Size {
  return product.sizes.includes("L") ? "L" : product.sizes[0];
}
