/**
 * Guide des tailles.
 *
 * ⚠️ Le handoff ne fournit aucune mesure : le lien « Guide des tailles » du
 * prototype ne pointait nulle part. Les valeurs ci-dessous sont une base
 * cohérente pour une coupe oversize à épaules tombantes — elles doivent être
 * relevées sur les pièces réelles et confirmées par la marque avant la mise
 * en ligne.
 */

export type SizeGuideRow = {
  size: string;
  /** Largeur de poitrine à plat, en centimètres. */
  chest: number;
  /** Longueur devant, de la couture d'épaule au bas, en centimètres. */
  length: number;
  /** Largeur d'épaule à épaule, en centimètres. */
  shoulders: number;
};

export const SIZE_GUIDE: SizeGuideRow[] = [
  { size: "XS", chest: 52, length: 68, shoulders: 50 },
  { size: "S", chest: 55, length: 70, shoulders: 53 },
  { size: "M", chest: 58, length: 72, shoulders: 56 },
  { size: "L", chest: 61, length: 74, shoulders: 59 },
  { size: "XL", chest: 64, length: 76, shoulders: 62 },
];

export const SIZE_GUIDE_NOTE =
  "Mesures de la pièce à plat, en centimètres, tolérance ±2 cm. La coupe est oversize : prenez votre taille habituelle pour le tomber prévu, une taille en dessous pour un porté ajusté.";
