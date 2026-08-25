import { FLIGHT_STRIP } from "@/lib/site";

/**
 * Élément signature. Vocabulaire strictement cockpit — aucune donnée produit.
 *
 * Traité comme une bandelette de progression du contrôle aérien : fond papier,
 * contour encre, filets fins. Deux particularités liées au fond clair, qui ne
 * se voyaient pas sur le fond noir d'origine :
 *
 * — les séparateurs viennent d'un `gap` d'un pixel laissant voir le fond du
 *   conteneur, et non de bordures de cellules : ils restent ainsi corrects
 *   entre les rangées quand la grille passe à la ligne ;
 * — les colonnes sont explicites plutôt qu'en `auto-fit`, et la dernière
 *   cellule couvre la largeur restante si le compte est impair. Sans cela une
 *   cellule vide apparaît en fin de grille, visible comme un aplat gris.
 */
export function FlightStrip() {
  const isOdd = FLIGHT_STRIP.length % 2 === 1;

  return (
    <div className="mx-[22px] grid grid-cols-2 gap-px overflow-hidden rounded-frame border border-ink bg-black/16 text-ink min-[760px]:grid-cols-5">
      {FLIGHT_STRIP.map((cell, index) => {
        const spansRest = isOdd && index === FLIGHT_STRIP.length - 1;
        return (
          <div
            key={cell.key}
            className={`font-label flex flex-col gap-[6px] bg-paper px-[12px] py-[16px] ${
              spansRest ? "col-span-2 min-[760px]:col-span-1" : ""
            }`}
          >
            <span className="text-[9px] font-semibold tracking-[0.3em] text-black/42 uppercase">
              {cell.key}
            </span>
            <span className="text-[14px] font-bold tracking-[0.12em]">
              {cell.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
