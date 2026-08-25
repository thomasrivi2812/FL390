import Image from "next/image";

/**
 * Visuel produit, avec cadre en attente.
 *
 * Toutes les pièces n'ont pas encore de photographie : plutôt qu'une image
 * cassée, on rend un cadre en pierre portant la mention, pour que le manque se
 * lise comme une étape du travail et non comme un défaut.
 */
export function ProductVisual({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  objectPosition,
}: {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  objectPosition?: string;
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-stone ${className}`}
        role="img"
        aria-label={`${alt} — visuel à venir`}
      >
        <span className="font-label text-[9px] font-bold tracking-[0.28em] text-black/42 uppercase">
          Visuel à venir
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      style={objectPosition ? { objectPosition } : undefined}
      className={`object-cover ${className}`}
    />
  );
}
