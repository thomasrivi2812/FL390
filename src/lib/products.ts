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
    blurb: "Molleton gratté, capuche doublée, même impression au dos.",
  },
  {
    slug: "accessoires",
    label: "Accessoires",
    singular: "Accessoire",
    blurb: "Ce qui part en vol avec vous. Toile épaisse, sérigraphie mate.",
  },
];

/** Une prise de vue et sa légende, telle qu'affichée dans la galerie produit. */
export type ProductImage = { src: string; caption: string };

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
   * Galerie, dans l'ordre d'affichage. La première image porte la carte, la
   * seconde est révélée à son survol, toutes sont montrées sur la fiche.
   */
  images: ProductImage[];
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

const ALL_SIZES: Size[] = ["XS", "S", "M", "L", "XL"];

const PRODUCTS: Product[] = [
  {
    slug: "cleared-navy",
    name: "Cleared For Takeoff — Navy",
    category: "t-shirts",
    color: "Navy",
    price: 85,
    tag: "New in",
    dots: ["#1B2A4A", "#000000"],
    images: [
      { src: "/img/cleared-navy-worn.png", caption: "Porté" },
      { src: "/img/cleared-navy-back.png", caption: "Dos — impression" },
      { src: "/img/navy-front.png", caption: "Face" },
    ],
    sizes: ALL_SIZES,
    weight: "270 g",
    description:
      "La signature de la marque en bleu marine, impression dos blanche mate avec la mention born to fly. Coupe oversize, coton peigné 270 g.",
    specs: TEE_SPECS,
  },
  {
    slug: "discipline-tee",
    name: "Discipline",
    category: "t-shirts",
    color: "Noir",
    price: 85,
    tag: "New in",
    dots: ["#000000", "#FDFDFD"],
    images: [
      { src: "/img/discipline-worn.png", caption: "Porté" },
      { src: "/img/discipline-back.png", caption: "Dos — impression" },
      { src: "/img/discipline-front.png", caption: "Face" },
    ],
    sizes: ALL_SIZES,
    weight: "270 g",
    description:
      "Quatre lignes au dos, la devise de la maison en toutes lettres. Noir profond, impression blanche mate, coupe oversize et épaules tombantes.",
    specs: TEE_SPECS,
  },
  {
    slug: "cleared-tee",
    name: "Cleared For Takeoff",
    category: "t-shirts",
    color: "Noir",
    price: 85,
    tag: "New in",
    dots: ["#000000", "#FDFDFD"],
    images: [
      { src: "/img/cleared-black-worn.png", caption: "Porté — tarmac" },
      { src: "/img/cleared.png", caption: "Dos — impression" },
    ],
    sizes: ALL_SIZES,
    weight: "270 g",
    description:
      "Le message d'ouverture de la marque, imprimé au dos en grand. Coupe oversize, épaules tombantes, col côtelé.",
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
    images: [
      { src: "/img/cdg-lhr-worn.png", caption: "Porté" },
      { src: "/img/cdg-lhr-back.png", caption: "Dos — impression" },
      { src: "/img/navy-front.png", caption: "Face" },
    ],
    sizes: ["S", "M", "L", "XL"],
    weight: "270 g",
    description:
      "Treize codes OACI répartis sur le dos, logo poitrine discret. Bleu marine, impression blanche mate, coupe oversize.",
    specs: TEE_SPECS,
  },
  {
    slug: "you-me-tee",
    name: "You. Me. Departure. No Return.",
    category: "t-shirts",
    color: "Blanc",
    price: 85,
    tag: "New in",
    dots: ["#FDFDFD", "#6D1111"],
    images: [
      { src: "/img/you-me-worn.png", caption: "Porté" },
      { src: "/img/you-me-back.png", caption: "Dos — impression" },
      { src: "/img/you-me-front.png", caption: "Face" },
    ],
    sizes: ALL_SIZES,
    weight: "270 g",
    description:
      "Quatre mots, un aller simple. Impression bordeaux sur blanc cassé, la seule pièce du drop où l'accent de la marque passe au premier plan.",
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
    images: [{ src: "/img/departures.png", caption: "Dos — impression" }],
    sizes: ALL_SIZES,
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
    images: [
      { src: "/img/climb.png", caption: "Porté — tarmac" },
      { src: "/img/climb-bw.png", caption: "Dos — impression" },
    ],
    sizes: ["S", "M", "L", "XL"],
    weight: "270 g",
    description:
      "Monter, puis tenir le niveau. Impression dos trois lignes, coton peigné 270 g, coupe oversize.",
    specs: TEE_SPECS,
  },
  {
    /** ⚠️ Prix indicatif, à confirmer par la marque. */
    slug: "discipline-hoodie",
    name: "Sweat à capuche Discipline",
    category: "sweats",
    color: "Noir",
    price: 120,
    tag: "New in",
    dots: ["#000000"],
    images: [
      { src: "/img/hoodie-discipline-worn.png", caption: "Porté — tarmac" },
    ],
    sizes: ALL_SIZES,
    weight: "400 g",
    description:
      "La devise de la maison portée sur molleton. Capuche doublée, poche kangourou, coupe droite un peu ample. Impression dos blanche mate.",
    specs: [
      { key: "Matière", value: "Molleton gratté, 85 % coton" },
      { key: "Grammage", value: "400 g/m²" },
      { key: "Coupe", value: "Droite, légèrement ample" },
      { key: "Impression", value: "Dos, sérigraphie mate" },
      { key: "Tailles", value: "XS · S · M · L · XL" },
      { key: "Fabrication", value: "France" },
    ],
  },
  {
    /** ⚠️ Prix indicatif, à confirmer par la marque. */
    slug: "remove-before-flight-tote",
    name: "Remove Before Flight — Tote",
    category: "accessoires",
    color: "Bordeaux",
    price: 45,
    tag: "New in",
    dots: ["#6D1111"],
    images: [{ src: "/img/editorial-tote.png", caption: "Porté" }],
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

/** Visuel de la carte. */
export function primaryImage(product: Product): ProductImage | undefined {
  return product.images[0];
}

/** Visuel révélé au survol — le second, à défaut le premier. */
export function hoverImage(product: Product): ProductImage | undefined {
  return product.images[1] ?? product.images[0];
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
