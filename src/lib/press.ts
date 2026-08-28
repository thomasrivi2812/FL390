/**
 * Revue de presse.
 *
 * À remplir avec les parutions réelles de la marque. Tant que la liste est
 * vide, la bande ne s'affiche pas — mieux vaut aucune mention qu'une mention
 * inventée.
 *
 * Deux façons de citer une parution :
 * — avec un logo : déposer le fichier dans `public/img/presse/` et renseigner
 *   `logo`, `width` et `height` (les dimensions réelles du fichier, le rendu
 *   étant ensuite contraint en hauteur) ;
 * — sans logo : renseigner seulement `name`, affiché en typographie de la
 *   maison. Utile en attendant de recevoir les fichiers.
 *
 * `href` est facultatif et pointe vers l'article.
 */
export type PressMention = {
  /** Nom du média. Sert aussi de texte alternatif au logo. */
  name: string;
  logo?: string;
  width?: number;
  height?: number;
  href?: string;
};

export const PRESS: PressMention[] = [];
