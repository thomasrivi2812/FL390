# FL390 Paris — boutique en ligne

Storefront du Drop 01 de FL390, marque de streetwear d'inspiration aéronautique
fondée par un pilote de ligne. Implémentation du handoff de design
([`docs/design-handoff.md`](docs/design-handoff.md)) en Next.js, déployable sur
[Vercel](https://vercel.com) sans configuration de build.

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
| `/` | Hero carrousel plein cadre, marquee typographique, grille « Nouvelles arrivées », bandeau plan de vol, teaser lookbook, panneau manifeste |
| `/shop` | Collection complète, barre de filtres sticky par taille (`?taille=M`) |
| `/shop/[slug]` | Fiche produit — galerie, sélecteur de taille, ajout au panier, tableau de specs |
| `/lookbook` | Six visuels du drop |
| `/livraison`, `/retours`, `/contact` | Pages informatives, gabarit partagé |

`/shop/[slug]` est pré-rendu pour les cinq pièces (`generateStaticParams`).
`/shop` est rendu à la demande, puisque le filtre vit dans l'URL.

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

**Glass** — trois recettes, pas une de plus : `.glass-ticker` / `.glass-nav` /
`.glass-bar` (en-tête et barres), `.glass-pill` / `.glass-pill-cta` (posé sur
une image), `.glass-control` (contrôle de carte). Chacune est doublée d'un repli
opaque via `@supports not (backdrop-filter)`.

**Hauteur d'en-tête** — 96 px (ticker 36 + navigation 60), exposée en
`--header-height`. Le spacer des pages internes et les décalages sticky
(barre de filtres, colonne produit) en dépendent : ne pas la modifier isolément.

**Mouvement** — `prefers-reduced-motion: reduce` coupe globalement animations et
transitions, et la rotation du hero est également désactivée côté JavaScript.

### Complétions responsives

Le handoff ne spécifie que le rendu large. Les décisions prises en dessous :

- Grilles produit : 4 colonnes ≥ 760 px, 2 ≥ 460 px, 1 en dessous.
- Fiche produit : colonne d'info sticky ≥ 760 px, empilée en dessous (le filet
  passe de `border-left` à `border-top`).
- En-tête : sous 560 px, les gouttières passent de 20 à 14 px et le lien
  « Contact » sort de la navigation (il reste dans le pied de page) ; sous
  900 px, le libellé « FR / EUR » est masqué. Vérifié sans repli de ligne ni
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
| 5 | Seconde prise de vue | Seul `climb-tee` en a une ; le survol des quatre autres cartes est sans effet |
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
