"use client";

import { useId, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload: unknown = await response.json().catch(() => null);
      const text =
        payload && typeof payload === "object"
          ? (payload as { message?: unknown }).message
          : null;

      if (response.ok) {
        setStatus("success");
        setMessage(
          typeof text === "string"
            ? text
            : "Inscription enregistrée. À bientôt en croisière.",
        );
        setEmail("");
        return;
      }

      setStatus("error");
      setMessage(
        typeof text === "string"
          ? text
          : "Inscription impossible pour le moment.",
      );
    } catch {
      setStatus("error");
      setMessage("Connexion impossible. Vérifiez votre réseau.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor={inputId} className="sr-only">
        Adresse email
      </label>
      <div className="flex max-w-[320px] items-center rounded-[999px] border border-paper/32 py-[2px] pr-[6px] pl-[14px]">
        <input
          id={inputId}
          type="email"
          required
          autoComplete="email"
          placeholder="Adresse email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={status === "loading"}
          className="font-label min-w-0 flex-1 border-0 bg-transparent py-[15px] text-[13px] text-paper placeholder:text-paper/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="font-label min-h-[44px] px-[14px] text-[11px] font-bold tracking-[0.2em] text-paper uppercase transition-colors duration-300 hover:text-burgundy disabled:opacity-50"
        >
          {status === "loading" ? "…" : "OK"}
        </button>
      </div>
      {message && (
        <p
          role="status"
          className={`mt-[12px] mb-0 text-[13px]/[1.6] ${
            status === "error" ? "text-burgundy" : "text-paper/66"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
