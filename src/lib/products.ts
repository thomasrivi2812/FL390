/**
 * Catalogue Drop 01.
 *
 * Source de vérité provisoire : le catalogue est codé en dur. Le jour où un
 * backend commerce (Shopify, Stripe, CMS…) est branché, ce module devient la
 * couche d'accès — `getProducts` / `getProduct` gardent leur signature
 * asynchrone pour que les pages n'aient pas à changer.
 */

export const SIZES = ["XS", "S", "M", "L", "XL"] as const;
export type Size = (typeof SIZES)[number];

/** Taille unique, pour les pièces qui ne se déclinent pas. */
export const ONE_SIZE = "TU";
export type SelectableSize = Size | typeof ONE_SIZE;

export type CategorySlug = "t-shirts" | "sweats" | "accessoires";

export type Category = {
  slug: CategorySlug;
  label: string;
  /** Libellé au singulier, pour la ligne de méta d'une fiche produit. */
  singular: string;
  blurb: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "t-shirts",
    label: "T-shirts",
    singular: "T-shirt",
    blurb: "Coton peigné 270 g, coupe oversize, impression au dos.",
  },
  {
    slug: "sweats",
    label: "Sweats",
    singular: "Sweat",
    blurb: "Molleton gratté, coupe droite. Arrive avec le Drop 02.",
  },
  {
    slug: "accessoires",
    label: "Accessoires",
    singular: "Accessoire",
    blurb: "Ce qui part en vol avec vous. Toile épaisse, sérigraphie mate.",
  },
];

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  color: string;
  price: number;
  tag: string;
  /** Pastilles de coloris — décoratives tant qu'il n'y a pas de variantes. */
  dots: string[];
  /**
   * Visuel principal. `null` tant que la marque n'a pas fourni la photographie :
   * les cartes et la fiche produit affichent alors un cadre en attente plutôt
   * qu'une image cassée.
   */
  image: string | null;
  /** Second visuel révélé au survol de la carte. */
  secondImage: string | null;
  /** Vide pour une pièce en taille unique. */
  sizes: Size[];
  /** Grammage ou matière, affiché dans la ligne de méta. */
  weight: string;
  description: string;
  specs: { key: string; value: string }[];
};

const TEE_SPECS = [
  { key: "Matière", value: "100 % coton peigné" },
  { key: "Grammage", value: "270 g/m²" },
  { key: "Coupe", value: "Oversize, épaules tombantes" },
  { key: "Impression", value: "Dos, sérigraphie mate" },
  { key: "Tailles", value: "XS · S · M · L · XL" },
  { key: "Fabrication", value: "France" },
];

const PRODUCTS: Product[] = [
  {
    slug: "cleared-tee",
    name: "Cleared For Takeoff",
    category: "t-shirts",
    color: "Noir",
    price: 85,
    tag: "New in",
    dots: ["#000000", "#FDFDFD"],
    image: "/img/cleared.png",
    secondImage: "/img/cleared.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    weight: "270 g",
    description:
      "Le message d'ouverture de la marque, imprimé au dos en grand. Coupe oversize, épaules tombantes, col côtelé.",
    specs: TEE_SPECS,
  },
  {
    slug: "departures-tee",
    name: "Departures",
    category: "t-shirts",
    color: "Blanc",
    price: 85,
    tag: "New in",
    dots: ["#FDFDFD", "#092242"],
    image: "/img/departures.png",
    secondImage: "/img/departures.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    weight: "270 g",
    description:
      "Dix-huit codes OACI empilés sur toute la hauteur du dos. Blanc cassé, impression noire mate, coupe oversize.",
    specs: TEE_SPECS,
  },
  {
    slug: "climb-tee",
    name: "Climb And Maintain",
    category: "t-shirts",
    color: "Noir",
    price: 85,
    tag: "New in",
    dots: ["#000000", "#27351B"],
    image: "/img/climb.png",
    secondImage: "/img/climb-bw.png",
    sizes: ["S", "M", "L", "XL"],
    weight: "270 g",
    description:
      "Monter, puis tenir le niveau. Impression dos trois lignes, coton peigné 270 g, coupe oversize.",
    specs: TEE_SPECS,
  },
  {
    slug: "cleared-navy",
    name: "Cleared For Takeoff — Navy",
    category: "t-shirts",
    color: "Navy",
    price: 85,
    tag: "New in",
    dots: ["#1B2A4A", "#000000"],
    image: "/img/cleared-navy.png",
    secondImage: "/img/cleared-navy.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    weight: "270 g",
    description:
      "La signature de la marque en bleu marine, impression dos blanche mate avec la mention born to fly. Coupe oversize, coton peigné 270 g.",
    specs: TEE_SPECS,
  },
  {
    slug: "cdg-lhr",
    name: "CDG — LHR",
    category: "t-shirts",
    color: "Navy",
    price: 85,
    tag: "New in",
    dots: ["#1B2A4A", "#FDFDFD"],
    image: "/img/cdg-lhr.png",
    secondImage: "/img/cdg-lhr.png",
    sizes: ["S", "M", "L", "XL"],
    weight: "270 g",
    description:
      "Treize codes OACI répartis sur le dos, logo poitrine discret. Bleu marine, impression blanche mate, coupe oversize.",
    specs: TEE_SPECS,
  },
  {
    /**
     * ⚠️ Deux valeurs restent à confirmer par la marque : la photographie du
     * produit, absente du dossier `public/img/`, et le prix, fixé ici à titre
     * indicatif.
     */
    slug: "remove-before-flight-tote",
    name: "Remove Before Flight — Tote",
    category: "accessoires",
    color: "Bordeaux",
    price: 45,
    tag: "New in",
    dots: ["#6D1111"],
    image: null,
    secondImage: null,
    sizes: [],
    weight: "Toile 340 g",
    description:
      "La formule qui ferme chaque check-list avant le roulage, imprimée en grand sur toile bordeaux. Anses longues, portées à l'épaule.",
    specs: [
      { key: "Matière", value: "100 % coton, toile 340 g/m²" },
      { key: "Dimensions", value: "38 × 42 cm, anses 65 cm" },
      { key: "Impression", value: "Recto, sérigraphie mate" },
      { key: "Taille", value: "Unique" },
      { key: "Fabrication", value: "France" },
    ],
  },
];

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return PRODUCTS.find((product) => product.slug === slug);
}

/** Résolution synchrone, pour le panier et la recherche côté client. */
export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

/** Catalogue complet côté client, pour la recherche. */
export function allProducts(): Product[] {
  return PRODUCTS;
}

export function isSize(value: string): value is Size {
  return (SIZES as readonly string[]).includes(value);
}

export function isCategorySlug(value: string): value is CategorySlug {
  return CATEGORIES.some((category) => category.slug === value);
}

export function findCategory(slug: CategorySlug): Category {
  // Le type garantit la présence : la liste couvre tous les slugs possibles.
  return CATEGORIES.find((category) => category.slug === slug)!;
}

export function countByCategory(
  products: Product[],
  slug: CategorySlug,
): number {
  return products.filter((product) => product.category === slug).length;
}

/** Une pièce en taille unique n'expose pas de sélecteur de taille. */
export function isOneSize(product: Product): boolean {
  return product.sizes.length === 0;
}

/** Une seconde prise de vue n'existe que si elle diffère de la première. */
export function hasSecondView(product: Product): boolean {
  return product.secondImage !== null && product.secondImage !== product.image;
}

export function productMeta(product: Product): string {
  const category = findCategory(product.category);
  return `${category.singular} · ${product.color} · ${product.weight}`;
}

/** Taille présélectionnée : L par défaut, sinon la première proposée. */
export function defaultSize(product: Product): SelectableSize {
  if (isOneSize(product)) return ONE_SIZE;
  return product.sizes.includes("L") ? "L" : product.sizes[0];
}
