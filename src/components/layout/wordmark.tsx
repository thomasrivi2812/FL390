/**
 * Logotype empilé. Le `text-indent` égal au `letter-spacing` est obligatoire :
 * sans lui, l'interlettrage pousse « PARIS » hors de l'axe.
 */
export function Wordmark({
  markClassName,
  cityClassName,
  gapClassName = "gap-[3px]",
}: {
  markClassName: string;
  cityClassName: string;
  gapClassName?: string;
}) {
  return (
    <span className={`flex flex-col items-center ${gapClassName}`}>
      <span className={`font-display leading-none ${markClassName}`}>FL390</span>
      <span className={`font-label font-semibold leading-none ${cityClassName}`}>
        PARIS
      </span>
    </span>
  );
}
