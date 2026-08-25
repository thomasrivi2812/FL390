/**
 * Défilement infini : deux passes identiques dans un conteneur `width: max-content`,
 * translatées de 0 à -50 %. La seconde passe est masquée aux lecteurs d'écran.
 */
export function Marquee({
  durationMs,
  gapPx,
  className,
  children,
}: {
  durationMs: number;
  gapPx: number;
  className?: string;
  children: React.ReactNode;
}) {
  const run = (hidden: boolean) => (
    <span
      aria-hidden={hidden || undefined}
      className="inline-flex items-center"
      style={{ gap: `${gapPx}px`, paddingRight: `${gapPx}px` }}
    >
      {children}
    </span>
  );

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={`inline-flex w-max ${className ?? ""}`}
        style={{ animation: `fl-marquee ${durationMs}ms linear infinite` }}
      >
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
