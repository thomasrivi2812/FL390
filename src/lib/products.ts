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

/**
 * Un coloris. C'est lui qui porte les visuels et les tailles : une même pièce
 * peut être photographiée et déclinée différemment d'une couleur à l'autre.
 */
export type Colorway = {
  id: string;
  label: string;
  /** Pastille du sélecteur. */
  hex: string;
  /**
   * Galerie, dans l'ordre d'affichage. La première image porte la carte, la
   * seconde est révélée à son survol, toutes sont montrées sur la fiche.
   */
  images: ProductImage[];
  /** Vide pour une pièce en taille unique. */
  sizes: Size[];
};

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  tag: string;
  /** Le premier coloris est celui présenté par défaut. */
  colorways: Colorway[];
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
    slug: "cleared-tee",
    name: "Cleared For Takeoff",
    category: "t-shirts",
    price: 85,
    tag: "New in",
    colorways: [
      {
        id: "navy",
        label: "Navy",
        hex: "#1B2A4A",
        images: [
          { src: "/img/cleared-navy-worn.png", caption: "Porté" },
          { src: "/img/cleared-navy-back.png", caption: "Dos — impression" },
          { src: "/img/navy-front.png", caption: "Face" },
        ],
        sizes: ALL_SIZES,
      },
      {
        id: "noir",
        label: "Noir",
        hex: "#000000",
        images: [
          { src: "/img/cleared-black-worn.png", caption: "Porté — tarmac" },
          { src: "/img/cleared.png", caption: "Dos — impression" },
        ],
        sizes: ALL_SIZES,
      },
    ],
    weight: "270 g",
    description:
      "Le message d'ouverture de la marque, imprimé au dos en grand, avec la mention born to fly. Coupe oversize, épaules tombantes, col côtelé.",
    specs: TEE_SPECS,
  },
  {
    slug: "discipline-tee",
    name: "Discipline",
    category: "t-shirts",
    price: 85,
    tag: "New in",
    colorways: [
      {
        id: "noir",
        label: "Noir",
        hex: "#000000",
        images: [
          { src: "/img/discipline-worn.png", caption: "Porté" },
          { src: "/img/discipline-back.png", caption: "Dos — impression" },
          { src: "/img/discipline-front.png", caption: "Face" },
        ],
        sizes: ALL_SIZES,
      },
    ],
    weight: "270 g",
    description:
      "Quatre lignes au dos, la devise de la maison en toutes lettres. Noir profond, impression blanche mate, coupe oversize et épaules tombantes.",
    specs: TEE_SPECS,
  },
  {
    slug: "cdg-lhr",
    name: "CDG — LHR",
    category: "t-shirts",
    price: 85,
    tag: "New in",
    colorways: [
      {
        id: "navy",
        label: "Navy",
        hex: "#1B2A4A",
        images: [
          { src: "/img/cdg-lhr-worn.png", caption: "Porté" },
          { src: "/img/cdg-lhr-back.png", caption: "Dos — impression" },
          { src: "/img/navy-front.png", caption: "Face" },
        ],
        sizes: ["S", "M", "L", "XL"],
      },
    ],
    weight: "270 g",
    description:
      "Treize codes OACI répartis sur le dos, logo poitrine discret. Bleu marine, impression blanche mate, coupe oversize.",
    specs: TEE_SPECS,
  },
  {
    slug: "you-me-tee",
    name: "You. Me. Departure. No Return.",
    category: "t-shirts",
    price: 85,
    tag: "New in",
    colorways: [
      {
        id: "blanc",
        label: "Blanc",
        hex: "#FDFDFD",
        images: [
          { src: "/img/you-me-worn.png", caption: "Porté" },
          { src: "/img/you-me-back.png", caption: "Dos — impression" },
          { src: "/img/you-me-front.png", caption: "Face" },
        ],
        sizes: ALL_SIZES,
      },
    ],
    weight: "270 g",
    description:
      "Quatre mots, un aller simple. Impression bordeaux sur blanc cassé, la seule pièce du drop où l'accent de la marque passe au premier plan.",
    specs: TEE_SPECS,
  },
  {
    slug: "departures-tee",
    name: "Departures",
    category: "t-shirts",
    price: 85,
    tag: "New in",
    colorways: [
      {
        id: "blanc",
        label: "Blanc",
        hex: "#FDFDFD",
        images: [{ src: "/img/departures.png", caption: "Dos — impression" }],
        sizes: ALL_SIZES,
      },
    ],
    weight: "270 g",
    description:
      "Dix-huit codes OACI empilés sur toute la hauteur du dos. Blanc cassé, impression noire mate, coupe oversize.",
    specs: TEE_SPECS,
  },
  {
    slug: "climb-tee",
    name: "Climb And Maintain",
    category: "t-shirts",
    price: 85,
    tag: "New in",
    colorways: [
      {
        id: "noir",
        label: "Noir",
        hex: "#000000",
        images: [
          { src: "/img/climb.png", caption: "Porté — tarmac" },
          { src: "/img/climb-bw.png", caption: "Dos — impression" },
        ],
        sizes: ["S", "M", "L", "XL"],
      },
    ],
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
    price: 120,
    tag: "New in",
    colorways: [
      {
        id: "noir",
        label: "Noir",
        hex: "#000000",
        images: [
          { src: "/img/hoodie-discipline-worn.png", caption: "Porté — tarmac" },
        ],
        sizes: ALL_SIZES,
      },
    ],
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
    price: 45,
    tag: "New in",
    colorways: [
      {
        id: "bordeaux",
        label: "Bordeaux",
        hex: "#6D1111",
        images: [{ src: "/img/editorial-tote.png", caption: "Porté" }],
        sizes: [],
      },
    ],
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

/** Coloris présenté par défaut. */
export function defaultColorway(product: Product): Colorway {
  return product.colorways[0];
}

/** Coloris demandé, ou celui par défaut si l'identifiant est inconnu. */
export function findColorway(product: Product, id?: string | null): Colorway {
  if (!id) return defaultColorway(product);
  return (
    product.colorways.find((colorway) => colorway.id === id) ??
    defaultColorway(product)
  );
}

/** Une pièce en taille unique n'expose pas de sélecteur de taille. */
export function isOneSize(colorway: Colorway): boolean {
  return colorway.sizes.length === 0;
}

/** Visuel de la carte, pour le coloris donné. */
export function primaryImage(colorway: Colorway): ProductImage | undefined {
  return colorway.images[0];
}

/** Visuel révélé au survol — le second, à défaut le premier. */
export function hoverImage(colorway: Colorway): ProductImage | undefined {
  return colorway.images[1] ?? colorway.images[0];
}

/** Toutes les tailles proposées par la pièce, tous coloris confondus. */
export function offeredSizes(product: Product): Size[] {
  return SIZES.filter((size) =>
    product.colorways.some((colorway) => colorway.sizes.includes(size)),
  );
}

export function productMeta(product: Product, colorway: Colorway): string {
  const category = findCategory(product.category);
  return `${category.singular} · ${colorway.label} · ${product.weight}`;
}

/** Taille présélectionnée : L par défaut, sinon la première proposée. */
export function defaultSize(colorway: Colorway): SelectableSize {
  if (isOneSize(colorway)) return ONE_SIZE;
  return colorway.sizes.includes("L") ? "L" : colorway.sizes[0];
}
