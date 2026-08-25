# FL390

Base [Next.js](https://nextjs.org) (App Router) en TypeScript avec Tailwind CSS,
prête à être déployée sur [Vercel](https://vercel.com).

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19) |
| Langage | TypeScript |
| Styles | Tailwind CSS 4 |
| Lint | ESLint (`eslint-config-next`) |
| Node | 22 (voir `.nvmrc`) |

## Démarrer

```bash
npm install
npm run dev
```

L'application est disponible sur http://localhost:3000.

## Scripts

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm start` | Sert le build de production |
| `npm run lint` | ESLint |

## Structure

```
src/
  app/
    layout.tsx    # layout racine (fonts, metadata, <html lang="fr">)
    page.tsx      # page d'accueil
    globals.css   # tokens de thème + import Tailwind
public/           # assets statiques
```

## Variables d'environnement

Copier `.env.example` en `.env.local` et renseigner les valeurs.
Sur Vercel, les déclarer dans *Project Settings → Environment Variables*.

## Déploiement Vercel

1. Importer le dépôt sur Vercel — le framework Next.js est détecté
   automatiquement (aucune configuration de build requise).
2. Renseigner les variables d'environnement si nécessaire.
3. Chaque push sur la branche par défaut déclenche un déploiement de production,
   chaque autre branche un déploiement de preview.
