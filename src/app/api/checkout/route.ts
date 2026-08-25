import { NextResponse } from "next/server";

/**
 * Passage en caisse.
 *
 * Point de branchement du paiement. Le panier est réel (lignes, quantités,
 * persistance côté client) mais aucun prestataire n'est encore choisi : cette
 * route doit créer une session de paiement côté serveur — en recalculant les
 * prix depuis le catalogue, jamais depuis le corps de la requête — puis
 * renvoyer `{ url }` vers laquelle le tiroir redirige.
 *
 * Tant que rien n'est branché, elle répond 501 et le tiroir affiche le message.
 */
export async function POST() {
  return NextResponse.json(
    {
      message:
        "Le paiement ouvre avec le Drop 01. Écrivez-nous pour réserver une pièce.",
    },
    { status: 501 },
  );
}
