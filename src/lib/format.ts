/** Espace insécable, imposé par la typographie française devant le €. */
const NBSP = " ";

/**
 * Formate un prix en euros au format du handoff : « 85 € ».
 * Les décimales ne sont affichées que si elles existent.
 */
export function formatPrice(amount: number): string {
  const body = Number.isInteger(amount)
    ? String(amount)
    : amount.toFixed(2).replace(".", ",");
  return `${body}${NBSP}€`;
}

/** Compteur du panier, sur deux chiffres : « 07 ». */
export function padCount(count: number): string {
  return String(Math.min(count, 99)).padStart(2, "0");
}
