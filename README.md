# FL390 Paris — boutique en ligne

Storefront du Drop 01 de FL390, marque de streetwear d'inspiration aéronautique
fondée par un pilote de ligne. Implémentation du handoff de design
([`docs/design-handoff.md`](docs/design-handoff.md)) en Next.js, déployable sur
[Vercel](https://vercel.com) sans configuration de build.

> **Sur l'en-tête.** Le document de spec et le prototype `FL390 v2.dc.html`
> divergent : deux barres de 96 px avec bandeau défilant d'un côté, barre unique
> de 62 px avec pastille « Drop 01 » de l'autre. C'est le prototype qui fait foi,
> sur décision de la marque. Le bandeau d'annonces (« Livraison offerte dès
> 120 € », etc.) n'existe donc pas dans cette implémentation. Le document de spec
> se trompe aussi en qualifiant l'état `scrolled` d'« inutilisé » : il pilote la
> bascule de l'en-tête.

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19) |
| Langage | TypeScript |
| Styles | Tailwind CSS 4 (tokens dans `src/app/globals.css`) |
| Polices | `next/font` — Krona One, Work Sans, Titillium Web, auto-hébergées |
| Images | `next/image` sur les photographies fournies par la marque |
| Lint | ESLint (`eslint-config-next`) |
| Node | 22 (voir `.nvmrc`) |

## Démarrer

```bash
npm install
cp .env.example .env.local
npm run dev
```

L'application est disponible sur http://localhost:3000.

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm start` | Sert le build de production |
| `npm run lint` | ESLint |

## Pages

| Route | Contenu |
| --- | --- |
| `/` | Hero carrousel plein cadre, marquee typographique, grille « Nouvelles arrivées », bandeau plan de vol, diptyque lookbook, panneau manifeste |
| `/shop` | Collection, filtres sticky par rayon et par taille (`?categorie=sweats&taille=M`) |
| `/shop/[slug]` | Fiche produit — galerie, sélecteur de taille, ajout au panier, tableau de specs |
| `/lookbook` | Six visuels du drop |
| `/livraison`, `/retours`, `/contact` | Pages informatives, gabarit partagé |

`/shop/[slug]` est pré-rendu pour toutes les pièces (`generateStaticParams`).
`/shop` est rendu à la demande, puisque les filtres vivent dans l'URL.

## Catalogue et rayons

Trois rayons — T-shirts, Sweats, Accessoires — déclarés dans
`src/lib/products.ts`, où chaque produit porte sa catégorie, ses specs et ses
tailles. Une liste de tailles vide vaut taille unique : la fiche produit masque
alors le sélecteur, le panier enregistre `TU`, et le rayon n'affiche pas de
filtre par taille. Un produit sans photographie (`image: null`) rend un cadre
« Visuel à venir » plutôt qu'une image cassée.

## Navigation

L'en-tête ouvre trois panneaux, tous rendus dans la même bande blanche
(`NavFlyout`) sous la barre :

- **Shop all** au survol — les trois rayons avec leur nombre de pièces, un
  visuel du drop, et « Découvrir plus » vers la collection. La pastille
  « Drop 01 » voisine n'ouvre volontairement rien : la survoler referme un
  volet resté ouvert, et un clic mène à la collection.
- **Lookbook** au survol — quatre visuels du drop et « Découvrir plus ».
- **Search** au clic — recherche dans le catalogue, filtrée côté client sur le
  nom, le coloris, la description et le rayon.

Le survol n'ouvre un panneau qu'au pointeur fin (`pointerType === "mouse"`) :
au doigt, le lien navigue normalement. Un panneau ouvert force l'en-tête dans
son état opaque, se ferme à la sortie du pointeur, par Échap, et au changement
de page — cette dernière fermeture étant dérivée au rendu plutôt que par un
effet. En dessous de 720 px la barre ne peut plus porter les liens : ils passent
dans le menu du bouton de gauche.

## Structure

```
src/
  app/
    layout.tsx              # polices, métadonnées, en-tête, pied de page, panier
    page.tsx                # accueil (pas de spacer : le hero passe sous le glass)
    globals.css             # tokens de design, recettes de glass, keyframes
    (store)/                # toutes les autres pages — le layout ajoute le spacer de 96 px
    api/newsletter/         # inscription newsletter
    api/checkout/           # point de branchement du paiement
    sitemap.ts, robots.ts, icon.svg
  components/
    cart/                   # contexte panier + tiroir
    docs/                   # gabarit des pages informatives
    home/                   # hero, marquees, plan de vol, teaser, manifeste
    layout/                 # en-tête, ticker, pied de page, logotype, newsletter
    product/                # carte, grille, filtres, sélecteur de taille, guide
    ui/                     # marquee, pastille de légende
  lib/
    products.ts             # catalogue Drop 01 (source de vérité provisoire)
    cart-store.ts           # store externe du panier, persisté en localStorage
    docs.ts, site.ts, size-guide.ts, format.ts
public/img/                 # photographies de la marque
```

## Système de design

Les valeurs du handoff sont reproduites telles quelles ; seules les couleurs et
les familles typographiques passent par des tokens Tailwind, le reste étant
volontairement écrit en valeurs explicites pour rester traçable jusqu'au
document de référence.

**Couleurs** — `ink #000000`, `paper #FDFDFD`, `stone #EFEFEC`,
`burgundy #6D1111`, `navy #092242`, `navy-garment #1B2A4A`, `olive #27351B`.

**Polices** — `font-display` (Krona One, display uniquement), `font-body`
(Work Sans, copy), `font-label` (Titillium Web, micro-labels en capitales).

**Rayons** — six paliers, en tokens : `rounded-badge` 4 px (pastille « Drop 01 »),
`rounded-control` 5 px (badge et bouton « + » des cartes), `rounded-field` 7 px
(sélecteur de taille), `rounded-card` 8 px (cartes, visuels, panneaux),
`rounded-frame` 10 px (bandeau plan de vol, cadres de la galerie produit),
`rounded-panel` 12 px (panneau manifeste). Les pastilles restent totalement
arrondies (`rounded-[999px]`). Les valeurs sont définies une seule fois dans le
bloc `@theme` de `globals.css` : les resserrer ou les élargir se fait là, pas
dans les composants.

**Glass** — trois recettes, pas une de plus : `.glass-nav` / `.glass-bar`
(en-tête et barres), `.glass-pill` / `.glass-pill-cta` (posé sur une image),
`.glass-control` (contrôle de carte). Chacune est doublée d'un repli opaque via
`@supports not (backdrop-filter)`.

⚠️ Ne jamais écrire `-webkit-backdrop-filter` à la main dans `globals.css` :
Lightning CSS traite l'alias et la propriété standard comme équivalents et ne
conserve que la dernière déclarée. Le préfixe est ajouté automatiquement d'après
browserslist.

**En-tête** — 62 px, exposés en `--header-height` ; le spacer des pages internes
et les décalages sticky (barre de filtres, colonne produit) en dépendent : ne pas
la modifier isolément. Deux états, avec 400 ms de transition : transparent en
blanc sur l'accueil tant que la page n'a pas défilé, glass avec texte noir
partout ailleurs et dès 60 px de défilement. L'état est lu via
`useSyncExternalStore`, pour qu'une page rouverte à une position déjà défilée
rende le bon état dès l'hydratation.

**Mouvement** — `prefers-reduced-motion: reduce` coupe globalement animations et
transitions, et la rotation du hero est également désactivée côté JavaScript.

### Complétions responsives

Le handoff ne spécifie que le rendu large. Les décisions prises en dessous :

- Grilles produit : 4 colonnes ≥ 760 px, 2 ≥ 460 px, 1 en dessous.
- Bandeau plan de vol : cinq colonnes ≥ 760 px, deux en dessous, la dernière
  cellule couvrant la largeur restante. Le handoff prévoyait une grille
  `auto-fit`, qui laissait une cellule vide en fin de grille — invisible sur le
  fond noir d'origine, mais lue comme un aplat gris depuis le passage au fond
  papier. Les filets viennent d'un `gap` d'un pixel, pour rester corrects entre
  les rangées lors du passage à la ligne.
- Diptyque lookbook : deux colonnes ≥ 760 px, empilées en dessous. Le handoff
  prévoyait une grille `auto-fit` qui ouvrait une troisième colonne au-delà de
  1200 px, laissée vide en noir par la bande basse ; elle est remplacée par deux
  colonnes fixes, la copy posée sur la photographie de gauche. En colonne unique
  la cellule s'étire au lieu d'imposer son ratio, la copy étant alors plus haute
  que la photo ne le permet.
- Fiche produit : colonne d'info sticky ≥ 760 px, empilée en dessous (le filet
  passe de `border-left` à `border-top`).
- En-tête : la barre dessinée n'entre pas sous 720 px. Les liens « Shop all »,
  « Lookbook » et la pastille « Drop 01 » se replient donc dans le menu en
  dessous, « Contact » sous 560 px et « FR / EUR » sous 900 px. Le bouton menu
  de l'en-tête ouvre un panneau portant la navigation complète — il est présent
  à toutes les largeurs, comme dans le prototype, mais il y ouvre un vrai menu
  au lieu de pointer vers la collection. Vérifié sans repli de ligne ni
  débordement horizontal de 320 à 1440 px.
- Bouton « + » des cartes : cible tactile de 44 px autour du carré visuel de
  32 px, conformément à la remarque du handoff.

## Panier

Le panier est réel : lignes (produit + taille + quantité), sous-total, tiroir
avec modification des quantités, persistance en `localStorage`. Il repose sur un
petit store externe (`src/lib/cart-store.ts`) consommé via
`useSyncExternalStore`, ce qui permet de relire le stockage sans divergence
d'hydratation.

**Le paiement n'est pas branché.** `POST /api/checkout` répond `501` et le
tiroir affiche le message. Pour l'activer, cette route doit créer une session
chez le prestataire retenu — en recalculant les prix depuis le catalogue, jamais
depuis le corps de la requête — et renvoyer `{ "url": "…" }`.

## À faire avant la mise en ligne

| # | Point | État |
| --- | --- | --- |
| 1 | Paiement, commandes, stock | `POST /api/checkout` renvoie 501 — prestataire à choisir |
| 2 | Newsletter | `NEWSLETTER_WEBHOOK_URL` à renseigner, sinon 503 |
| 3 | Adresse de contact | `contact@fl390.paris` est un placeholder du handoff (`src/lib/site.ts`) |
| 4 | Guide des tailles | Mesures plausibles à confirmer sur les pièces réelles (`src/lib/size-guide.ts`) |
| 5 | Seconde prise de vue | Seul `climb-tee` en a une ; le survol des autres cartes est sans effet |
| 5b | Photographie du tote | `remove-before-flight-tote` n'a pas de visuel — le cadre « Visuel à venir » s'affiche à sa place. Son prix (45 €) est également indicatif |
| 5c | Rayon Sweats | Déclaré et navigable, mais sans produit : l'état vide s'affiche. À alimenter au Drop 02 |
| 6 | Visuel Open Graph | Une photo produit fait office de repli — prévoir un 1200 × 630 dédié |
| 7 | Favicon | `src/app/icon.svg` est un placeholder typographique |
| 8 | Catalogue | Codé en dur dans `src/lib/products.ts` ; `getProducts`/`getProduct` sont asynchrones pour absorber un backend sans toucher aux pages |
| 9 | Photographies | PNG sources lourds (7,6 Mo) ; `next/image` génère les variantes, un ré-export allégerait le dépôt |

## Déploiement Vercel

1. Importer le dépôt — le framework Next.js est détecté automatiquement.
2. `NEXT_PUBLIC_SITE_URL` est facultative : à défaut, le domaine de production
   du projet Vercel est utilisé, puis l'URL du déploiement courant pour les
   previews. Ne la déclarer que pour forcer un domaine précis — et avec une
   valeur non vide. Ajouter `NEWSLETTER_WEBHOOK_URL` le cas échéant.
3. Chaque push sur la branche par défaut déclenche un déploiement de production,
   chaque autre branche un déploiement de preview.
