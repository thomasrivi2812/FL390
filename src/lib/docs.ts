import { SITE } from "@/lib/site";

export type DocRow = { key: string; value: string };

export type Doc = {
  tag: string;
  title: string;
  intro: string;
  rows: DocRow[];
};

export const LIVRAISON: Doc = {
  tag: "Livraison",
  title: "Livraison",
  intro:
    "Expédition depuis la France. Les délais courent à compter de la confirmation de commande.",
  rows: [
    {
      key: "France métropolitaine",
      value: "Expédié sous 24 à 48h. Livraison offerte dès 120 € d'achat.",
    },
    {
      key: "Union européenne",
      value:
        "Livraison en 5 à 10 jours ouvrés. Les frais sont calculés au paiement selon le pays de destination.",
    },
    {
      key: "International hors UE",
      value:
        "Nous livrons dans une sélection de pays hors UE. Délais et frais de douane variables — écrivez-nous avant commande si besoin.",
    },
    {
      key: "Suivi",
      value:
        "Un email avec numéro de suivi est envoyé dès l'expédition du colis.",
    },
  ],
};

export const RETOURS: Doc = {
  tag: "Retours",
  title: "Retours",
  intro:
    "Une taille qui ne convient pas, un changement d'avis — voici comment ça se passe, sans complication.",
  rows: [
    {
      key: "Délai",
      value: "15 jours à compter de la réception pour nous retourner un article.",
    },
    {
      key: "Conditions",
      value: "Article non porté, non lavé, étiquettes d'origine attachées.",
    },
    {
      key: "Procédure",
      value:
        "Écrivez-nous avec votre numéro de commande. Une étiquette de retour prépayée est fournie pour la France métropolitaine.",
    },
    {
      key: "Remboursement",
      value:
        "Sous 5 à 10 jours ouvrés après contrôle du colis retourné, sur le moyen de paiement d'origine.",
    },
  ],
};

export const CONTACT: Doc = {
  tag: "Contact",
  title: "Contact",
  intro:
    "Une question, un imprévu sur votre commande — on répond directement, sans standard ni robot.",
  rows: [
    { key: "Nous écrire", value: `${SITE.email} — réponse sous 24h ouvrées.` },
    {
      key: "Commandes",
      value:
        "Les réponses sur les délais et les retours se trouvent sur les pages Livraison et Retours.",
    },
    { key: "Presse & collaborations", value: "Même adresse, objet « PRESSE »." },
  ],
};
