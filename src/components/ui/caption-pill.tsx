/** Pastille de légende en glass, posée en bas à gauche d'une photographie. */
export function CaptionPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`glass-pill font-label absolute rounded-[999px] px-[14px] py-[8px] text-[9px] font-bold tracking-[0.28em] text-paper uppercase ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
