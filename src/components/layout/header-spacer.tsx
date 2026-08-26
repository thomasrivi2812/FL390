/**
 * Réserve la hauteur de l'en-tête fixe sur toutes les pages sauf l'accueil,
 * dont le hero passe volontairement sous le glass.
 */
export function HeaderSpacer() {
  return <div aria-hidden className="h-(--header-offset) flex-none" />;
}
