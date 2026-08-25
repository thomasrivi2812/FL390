import { NextResponse } from "next/server";

/**
 * Inscription à la newsletter.
 *
 * Aucun fournisseur n'est branché par défaut. Renseignez `NEWSLETTER_WEBHOOK_URL`
 * (Brevo, Mailchimp, Klaviyo, Resend Audiences, un webhook maison…) pour activer
 * le formulaire. Tant que la variable est absente, la route répond explicitement
 * 503 : mieux vaut un message d'indisponibilité qu'une adresse silencieusement
 * perdue.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let email: unknown;
  try {
    const body: unknown = await request.json();
    email = (body as { email?: unknown } | null)?.email;
  } catch {
    return NextResponse.json(
      { message: "Requête invalide." },
      { status: 400 },
    );
  }

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
    return NextResponse.json(
      { message: "Cette adresse email ne semble pas valide." },
      { status: 422 },
    );
  }

  const endpoint = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!endpoint) {
    console.warn(
      "[newsletter] NEWSLETTER_WEBHOOK_URL absente : inscription refusée.",
    );
    return NextResponse.json(
      {
        message:
          "Les inscriptions ouvrent avec le Drop 01. Écrivez-nous en attendant.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    });

    if (!response.ok) {
      console.error("[newsletter] réponse %s du fournisseur", response.status);
      return NextResponse.json(
        { message: "Inscription impossible pour le moment." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message: "Inscription enregistrée. À bientôt en croisière.",
    });
  } catch (error) {
    console.error("[newsletter] appel du fournisseur en échec", error);
    return NextResponse.json(
      { message: "Inscription impossible pour le moment." },
      { status: 502 },
    );
  }
}
