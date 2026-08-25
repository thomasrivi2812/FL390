# Handoff : FL390 Paris — boutique en ligne (Drop 01)

## Overview
FL390 is an aviation-inspired streetwear brand founded by an airline pilot, based in Paris,
manufactured in France. This handoff covers the complete customer-facing storefront:
home page with a rotating hero, product grid, product detail page, lookbook, and three
informational pages (Livraison / Retours / Contact).

The design language is deliberately restrained: near-black on off-white, an editorial
oversized wordmark, glass (backdrop-blur) surfaces wherever a control sits on top of
imagery or scrolling content, and generous full-bleed photography. No gradients, no
emoji, no icon sets — type, photography and 12px radii carry the whole identity.

## About the Design Files
The files in this bundle are **design references authored in HTML** — a working prototype
of the intended look and behaviour, not production code to lift verbatim. `FL390 v2.dc.html`
uses a proprietary template runtime (`<sc-for>`, `<sc-if>`, `{{ holes }}`, a `Component`
logic class) that exists only in the design tool; it will not run in a product codebase.

The task is to **recreate these designs in the target codebase's own environment** — its
framework (Next.js / Remix / Astro / Shopify Hydrogen / etc.), its component library, its
styling solution, its commerce backend — following that codebase's established patterns.
If no codebase exists yet, pick the most appropriate stack for a small-catalogue DTC
storefront (a Next.js App Router + Tailwind + Shopify/Stripe setup is a reasonable default)
and implement there. Read the HTML as a specification of layout, type, colour and motion.

Note also that the prototype fakes commerce: the cart is an integer counter, there is no
checkout, no inventory, no persistence, and no real product data source. All of that is
net-new work in the real implementation.

## Fidelity
**High-fidelity.** Colours, type scale, spacing, radii, motion durations and copy are all
final and should be reproduced precisely. Every value in this README is taken from the
prototype source. Where a value is expressed as a CSS `clamp()`, reproduce the clamp
rather than picking a single size — the fluid scaling is intentional and is what keeps the
oversized display type working from 390px to 2560px.

---

## Global chrome

### Fixed glass header (all pages)
A single `position: fixed` container at `z-index: 60` spanning the full viewport width.
Two stacked bars, both translucent glass so the hero photograph reads through them:

**Bar 1 — announcement ticker**
- Height `36px`, `display: flex; align-items: center`
- `background: rgba(253,253,253,0.42)`, `backdrop-filter: blur(26px) saturate(180%)` (plus `-webkit-` prefix)
- `border-bottom: 1px solid rgba(0,0,0,0.07)`
- Content scrolls right-to-left infinitely: Titillium Web 600, `10px`, `letter-spacing: 0.34em`, uppercase, `#000`
- Items separated by an `✳` glyph in `#6D1111`, `gap: 52px`
- Copy, in order: "Livraison offerte dès 120 €" · "Fabriqué en France" · "Collection 01 — séries courtes" · "See you at FL390"
- Marquee technique: two identical `display: inline-flex` runs inside a `width: max-content`
  wrapper, animated `transform: translateX(0)` → `translateX(-50%)` over `34s` `linear` `infinite`.
  The duplicate run must carry `aria-hidden="true"`.

**Bar 2 — navigation**
- Height `60px`, `display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 0 20px; gap: 14px`
- `background: rgba(253,253,253,0.5)`, `backdrop-filter: blur(30px) saturate(180%)`
- `border-bottom: 1px solid rgba(0,0,0,0.07)`, `box-shadow: 0 8px 34px rgba(0,0,0,0.06)`
- **Left**: nav links, `display: flex; gap: 22px`, Titillium Web 700, `10px`, `letter-spacing: 0.2em`,
  uppercase. Labels: "Shop all", "Lookbook", "Contact". Hover → `color: #6D1111`.
- **Centre**: stacked wordmark, `display: flex; flex-direction: column; align-items: center; gap: 3px`.
  "FL390" in Krona One `18px`, `line-height: 1`; "PARIS" in Titillium Web 600 `7px`,
  `letter-spacing: 0.62em` with matching `text-indent: 0.62em` (the indent is required —
  without it the tracking pushes the word off-centre). Acts as the home link.
- **Right**: `display: flex; justify-content: flex-end; align-items: center; gap: 18px`.
  A static "FR / EUR" locale label in `rgba(0,0,0,0.4)`, then the cart button:
  `background: rgba(0,0,0,0.82)`, `backdrop-filter: blur(14px)`,
  `border: 1px solid rgba(253,253,253,0.14)`, `color: #FDFDFD`, `padding: 8px 13px`,
  label `Panier · NN` (count zero-padded to two digits). Hover → `background: #6D1111`.

Total header height is **96px** (36 + 60). Both bars carry explicit heights specifically so
the offset cannot drift while webfonts load. Every consumer of that number depends on it:
- Non-home pages render a `96px` spacer div so content clears the fixed header.
- The home page does **not** spacer — the hero sits full-bleed underneath the glass.
- Sticky sub-bars (collection filter bar, product info column) use `top: 96px`.
  (Prototype note: those two currently read `top: 62px`, which is a bug inherited from an
  earlier 62px header — implement them at `96px`.)

### Footer (all pages)
`background: #000; color: #FDFDFD`, three parts:

1. **Link columns** — `display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 34px; padding: clamp(40px,6vw,78px) 22px`
   - Column "Boutique": Shop all, Lookbook
   - Column "Aide": Livraison, Retours, Contact
   - Column headings: Titillium Web 700, `10px`, `letter-spacing: 0.3em`, uppercase, `rgba(253,253,253,0.38)`
   - Links: same face at `letter-spacing: 0.2em`, hover `#6D1111`
   - Newsletter column: heading, the line "Une annonce par drop. Rien d'autre." at `14px`/`1.6`
     in `rgba(253,253,253,0.66)`, then a pill input — `border: 1px solid rgba(253,253,253,0.32)`,
     `border-radius: 999px`, `padding: 2px 6px 2px 14px`, `max-width: 320px`, transparent
     `<input type="email">` + an "OK" submit button (hover `#6D1111`). Needs real
     subscribe wiring, success and error states.
2. **Monumental wordmark** — centred, `padding: 0 12px`. "FL390" in Krona One
   `clamp(2rem, 11vw, 9rem)`, `line-height: 0.84`, `letter-spacing: -0.03em`; "PARIS" below in
   Titillium Web 600 `clamp(8px, 1.5vw, 16px)`, `letter-spacing: 0.72em` + `text-indent: 0.72em`.
3. **Legal row** — `border-top: 1px solid rgba(253,253,253,0.18)`, `padding: 16px 22px`,
   `display: flex; justify-content: space-between`, `10px` uppercase `letter-spacing: 0.18em`
   in `rgba(253,253,253,0.4)`: "© 2026 FL390 Paris — Fabriqué en France" and "See you at FL390."

---

## Screens / Views

### 1. Home
Route: `/`

**a. Hero carousel**
- `position: relative; height: 100svh; min-height: 560px; background: #000; overflow: hidden`
  (`svh` not `vh` — matters on mobile Safari)
- Three stacked `<img>` at `position: absolute; inset: 0; object-fit: cover`, crossfaded by
  `opacity` with `transition: opacity 1100ms ease`. Only the active slide is `opacity: 1`.
  | # | Image | `object-position` | Headline |
  |---|---|---|---|
  | 1 | `img/climb.png` | `44% 30%` | Climb And / Maintain |
  | 2 | `img/cleared-navy.png` | `50% 34%` | Cleared For / Takeoff |
  | 3 | `img/cdg-lhr.png` | `50% 36%` | CDG — / LHR |
- Scrim above the images: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 52%, rgba(0,0,0,0.3) 100%)`
- Content block pinned bottom-left: `position: absolute; inset: auto 0 0 0; padding: 0 22px 26px; display: flex; flex-direction: column; gap: 22px`
- Headlines: three `<h1>` superimposed in a `position: relative` wrapper (first in flow, the
  other two `position: absolute; inset: 0`), each Krona One,
  `font-size: clamp(2.6rem, 11vw, 10rem)`, `line-height: 0.84`, `letter-spacing: -0.02em`,
  `color: #FDFDFD`, line break between the two words. Crossfaded by `opacity` with
  `transition: opacity 700ms ease`. **Keep these as three real text nodes** — do not
  generate the headline from a JS array; the copy must stay editable in markup.
- Progress indicators: `display: flex; gap: 8px`. Each is a `46px × 2px` button,
  `background: rgba(253,253,253,0.3)`, containing a white inner bar whose `width` is
  `100%` when active and `0%` otherwise, `transition: width 400ms linear`. Clicking jumps
  to that slide. Each needs an `aria-label` ("Visuel 1"…).
- Advance: `setInterval` every **5000ms**, wrapping modulo 3. Clear on unmount. A manual
  pick should ideally reset the timer (the prototype does not — fix in implementation).
- No CTA button and no "Drop 01" badge in the hero. This was an explicit decision: the
  headline and the imagery carry it alone.

**b. Typographic marquee**
- `background: #FDFDFD; color: #000`, `border-bottom: 1px solid rgba(0,0,0,0.12)`, `padding: 14px 0`, `overflow: hidden; white-space: nowrap`
- "NOT FOR EVERYONE" repeated, separated by `/` in `#6D1111`, Krona One
  `clamp(1.4rem, 4.4vw, 3.4rem)`, `gap: 34px`
- Same two-run technique as the ticker, `26s linear infinite`

**c. "Nouvelles arrivées" product grid**
- Section header: `display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; padding: 34px 22px 18px`.
  Left: `<h2>` Krona One `clamp(1.3rem, 3vw, 2.2rem)`, `line-height: 1`, `letter-spacing: -0.01em`,
  text "Nouvelles arrivées". Right: "Tout voir" link, Work Sans `13px`,
  `letter-spacing: 0.08em`, uppercase, `border-bottom: 1px solid #000; padding-bottom: 2px`,
  hover `opacity: 0.55`. Navigates to the collection.
- Grid: `display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; padding: 0 22px`.
  Exactly four columns on one row; shows the **first four** products. Needs responsive
  fallbacks (suggest 2 columns under ~760px, 1 under ~460px).
- Section `padding-bottom: 34px` — deliberate breathing room before the next block.
- **Product card** (shared with the collection page; build it once):
  - Image frame: `position: relative; aspect-ratio: 3/4; background: #EFEFEC; overflow: hidden; border-radius: 12px`
  - Two `object-fit: cover` images stacked absolutely; the top one fades out on card hover
    (`transition: opacity 500ms ease` → `opacity: 0`) revealing the second view. Wrapped in
    a button covering `inset: 0` that opens the product page.
  - "New in" badge: `position: absolute; top: 12px; left: 12px`,
    `background: rgba(253,253,253,0.94)`, `backdrop-filter: blur(10px)`, `border-radius: 7px`,
    `padding: 7px 11px`, Work Sans `12px`, `letter-spacing: 0.06em`, uppercase, `#000`,
    `pointer-events: none`
  - Quick-add "+": `position: absolute; top: 12px; right: 12px`, `32 × 32px`, same glass
    treatment and radius, `font-size: 19px; font-weight: 300`, hover
    `transform: rotate(90deg)` over `300ms`. `aria-label="Ajouter au panier"`. Note the
    32px hit area is below the 44px minimum — enlarge it, or expand the hit box, on touch.
  - Meta row: `display: flex; justify-content: space-between; align-items: baseline; gap: 12px; padding: 13px 4px 0`.
    Name (Work Sans `14px`, hover `opacity: 0.6`, opens product) and price (`14px`,
    `white-space: nowrap`, format `85 €`).
  - Colour dots: `display: flex; gap: 7px; padding: 10px 4px 0`; each `11 × 11px`,
    `border-radius: 999px`, `border: 1px solid rgba(0,0,0,0.3)`, filled with the colourway hex.
    Currently decorative — wire to variant switching if the real catalogue has colourways.

**d. Flight strip** (signature element, toggleable)
- `background: #000; color: #FDFDFD`, `display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr))`,
  `border-radius: 14px; overflow: hidden; margin: 0 22px`
- Five cells, each `padding: 16px 12px`, `border-right: 1px solid rgba(253,253,253,0.16)`,
  `display: flex; flex-direction: column; gap: 6px`, Titillium Web
  - Key: `9px` 600, `letter-spacing: 0.3em`, uppercase, `rgba(253,253,253,0.4)`
  - Value: `14px` 700, `letter-spacing: 0.12em`
- Cells: Vol / **FL390** · Origine / **CDG — PARIS** · Niveau / **39 000 FT** · Cap / **270°** · Statut / **CLEARED**
- Vocabulary is strictly cockpit — no garment specs here (grammage, cut and price were
  explicitly removed from this strip).
- Controlled by the `showFlightStrip` prop (default true).

**e. Lookbook teaser**
- Wrapper: `display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr))`,
  `background: #000`, `border-radius: 12px`, `overflow: hidden`, `margin: 34px 22px 0`
- Cell 1 — image `img/cleared.png`, `aspect-ratio: 4/5`, `border-radius: 12px 0 0 0`
  (top-left only, by design)
- Cell 2 — copy block, `padding: clamp(36px,6vw,84px) clamp(24px,4vw,64px)`, `color: #FDFDFD`,
  `display: flex; flex-direction: column; justify-content: center; gap: 24px`:
  - Eyebrow "Le lookbook" — Titillium Web 700 `9px`, `letter-spacing: 0.32em`, uppercase, `#6D1111`
  - Statement "Dessiné en croisière, à 39 000 pieds." — Krona One `clamp(1.3rem,2.6vw,2.3rem)`, `line-height: 1.2`
  - Body "FL390 est fondée par un pilote de ligne. La discipline du cockpit appliquée au
    vêtement : rien de décoratif, tout est vérifié. Coton peigné 270 g, séries courtes,
    fabrication française." — `15px`/`1.75`, `max-width: 46ch`, `rgba(253,253,253,0.66)`
  - Glass pill CTA "Voir le lookbook" — `padding: 15px 26px`, `border-radius: 999px`,
    `background: rgba(253,253,253,0.1)`, `backdrop-filter: blur(18px) saturate(180%)`,
    `border: 1px solid rgba(253,253,253,0.3)`,
    `box-shadow: inset 0 1px 0 rgba(253,253,253,0.28)`;
    hover → `background: rgba(253,253,253,0.9); color: #000` over `300ms`
- Cell 3 — image `img/departures.png`, `grid-column: 1 / -1`, `aspect-ratio: 4/5`,
  `object-position: 50% 34%`, `border-radius: 0 0 12px 12px` (both bottom corners, by design)
- Both images carry a glass caption pill, bottom-left `16px`: `padding: 8px 14px`,
  `border-radius: 999px`, `background: rgba(253,253,253,0.14)`,
  `backdrop-filter: blur(18px) saturate(180%)`, `border: 1px solid rgba(253,253,253,0.28)`,
  Titillium Web 700 `9px`, `letter-spacing: 0.28em`, uppercase, `#FDFDFD`.
  Text: "01 — Cleared For Takeoff" and "02 — Departures".

**f. Manifesto panel**
- `background: #27351B; color: #FDFDFD`, `padding: clamp(64px,10vw,150px) clamp(24px,5vw,88px)`,
  `text-align: center`, `border-radius: 18px`, `margin: 34px 22px`
- Single line, Krona One `clamp(1.5rem, 4.4vw, 3.4rem)`, `line-height: 1.16`, `max-width: 20ch`, centred
- Default copy: "Discipline can take you places passion never will."
- Driven by the `quote` prop; alternates: "You. Me. Departure. No Return." / "See You At FL390." / "Not For Everyone."

### 2. Collection ("Shop all")
Route suggestion: `/shop`

- Title block: `padding: clamp(26px,4vw,52px) 22px`, `border-bottom: 1px solid #000`.
  `<h1>` "Shop all", Krona One `clamp(2rem, 9vw, 7rem)`, `line-height: 0.9`, `letter-spacing: -0.02em`
- **Sticky glass filter bar** at `top: 96px`, `z-index: 30`:
  `display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 18px; padding: 13px 22px`,
  `background: rgba(253,253,253,0.6)`, `backdrop-filter: blur(22px) saturate(180%)`,
  `border-bottom: 1px solid rgba(0,0,0,0.12)`
  - Size pills XS S M L XL: `min-width: 44px; padding: 9px 12px`, `border-radius: 999px`,
    `backdrop-filter: blur(12px)`, Titillium Web 700 `10px`, `letter-spacing: 0.14em`.
    Inactive: `background: rgba(253,253,253,0.5)`, `color: #000`, `border: 1px solid rgba(0,0,0,0.18)`.
    Active: `background: #000`, `color: #FDFDFD`, `border-color: #000`. Hover → `border-color: #000`.
    Single-select and **toggleable** — clicking the active pill clears the filter.
  - Result count, right-aligned: Titillium Web 700 `10px`, `letter-spacing: 0.22em`, uppercase,
    `rgba(0,0,0,0.42)`, text `N pièces` (singular `1 pièce`)
- Grid: identical card, `repeat(4, minmax(0, 1fr))`, `gap: 14px`, `padding: 18px 22px 46px`.
  Shows **all five** products (so the fifth wraps to a second row).
- Filtering is client-side over the in-memory catalogue in the prototype; in production this
  becomes a real query. Empty state is **not designed** — you will need one.

### 3. Product detail
Route suggestion: `/shop/[slug]`

Two columns: `display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr)); align-items: start`

**Left — gallery**: `display: flex; flex-direction: column; gap: 14px; padding: 18px 0 18px 22px`.
One or two frames, each `position: relative; aspect-ratio: 3/4; background: #EFEFEC; overflow: hidden; border-radius: 14px`,
with a glass caption pill bottom-left `14px` (same recipe as the lookbook pills):
"Dos — impression" on the first, "Porté — tarmac" on the second. The second frame renders
only when the product's two images differ.

**Right — sticky info column** at `top: 96px`, `padding: clamp(28px,4vw,64px) clamp(22px,4vw,60px)`,
`border-left: 1px solid rgba(0,0,0,0.1)`:
- Back link "← Shop all" — Titillium Web 700 `9px`, `letter-spacing: 0.28em`, uppercase,
  `rgba(0,0,0,0.42)`, hover `#000`
- `<h1>` product name — Krona One `clamp(1.5rem,3.4vw,2.6rem)`, `line-height: 1.08`, `margin-top: 22px`
- Price + meta row, `margin-top: 14px`, `display: flex; align-items: baseline; gap: 16px`:
  price Titillium Web 700 `19px`; meta `9px` 600, `letter-spacing: 0.26em`, uppercase,
  `rgba(0,0,0,0.42)`, format `T-shirt · <Couleur> · 270 g`
- Description — `15px`/`1.75`, `max-width: 44ch`, `rgba(0,0,0,0.68)`, `margin-top: 24px`
- Size label row `margin-top: 36px`: "Taille" left, "Guide des tailles" right in
  `rgba(0,0,0,0.42)` (Titillium Web 700 `9px`, `letter-spacing: 0.28em`, uppercase).
  The size guide is a **link with no destination** in the prototype — needs a real
  drawer/modal with a measurements table.
- Size selector: single segmented control, `display: flex`, `border: 1px solid rgba(0,0,0,0.18)`,
  `border-radius: 10px`, `overflow: hidden`. Each cell `flex: 1; padding: 15px 0`,
  Titillium Web 700 `12px`, `letter-spacing: 0.1em`, `border-right: 1px solid rgba(0,0,0,0.16)`.
  Selected: `background: #000; color: #FDFDFD`. Unavailable for this product:
  `color: rgba(0,0,0,0.24)` and non-clickable. Hover → `background: #000; color: #FDFDFD`.
  Real implementation needs out-of-stock styling distinct from "size not offered".
- Add to cart: full width, `margin-top: 12px`, `background: rgba(0,0,0,0.9)`,
  `backdrop-filter: blur(16px)`, `border: 1px solid rgba(253,253,253,0.14)`,
  `border-radius: 999px`, `color: #FDFDFD`, Titillium Web 700 `12px`,
  `letter-spacing: 0.28em`, uppercase, `padding: 20px 0`; hover `background: #6D1111`.
  Label: `Ajouter — 85 €`. Needs loading + success + error states.
- Spec table, `margin-top: 40px`, `border-top: 1px solid #000`. Rows:
  `display: grid; grid-template-columns: minmax(100px, 0.7fr) 1fr; gap: 16px; padding: 13px 0`,
  `border-bottom: 1px solid rgba(0,0,0,0.14)`. Key: `9px` 700, `letter-spacing: 0.26em`,
  uppercase, `rgba(0,0,0,0.42)`. Value: `14px` 600.
  | Key | Value |
  |---|---|
  | Matière | 100 % coton peigné |
  | Grammage | 270 g/m² |
  | Coupe | Oversize, épaules tombantes |
  | Impression | Dos, sérigraphie mate |
  | Tailles | XS · S · M · L · XL |
  | Fabrication | France |
- Reassurance links, `margin-top: 26px`, `display: flex; flex-wrap: wrap; gap: 12px 28px`,
  `9px` 700, `letter-spacing: 0.24em`, uppercase, `border-bottom: 1px solid rgba(0,0,0,0.3)`,
  hover `#6D1111`: "Expédié 24–48h" → Livraison, "Retours 15 jours" → Retours

### 4. Lookbook
Route suggestion: `/lookbook`

- Header: `padding: clamp(26px,4vw,52px) 22px`, `border-bottom: 1px solid #000`,
  `display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 20px`.
  `<h1>` "Lookbook" (same scale as "Shop all") and a caption
  "Drop 01 · Tarmac · 2026" in Titillium Web 700 `10px`, `letter-spacing: 0.24em`, uppercase,
  `rgba(0,0,0,0.42)`
- Grid: `repeat(auto-fit, minmax(min(100%, 340px), 1fr))`, `gap: 14px`, `padding: 18px 22px`.
  Each `<figure>`: `aspect-ratio: 3/4`, `overflow: hidden`, `border-radius: 12px`;
  image hover `transform: scale(1.04)` over `900ms ease`; glass caption pill bottom-left `14px`.
  Six entries in order:
  1. `img/cleared-navy.png` — "01 — Cleared, navy"
  2. `img/cdg-lhr.png` — "02 — CDG · LHR"
  3. `img/climb-bw.png` — "03 — Climb, N&B"
  4. `img/cleared.png` — "04 — Cleared"
  5. `img/departures.png` — "05 — Departures"
  6. `img/climb.png` — "06 — Climb, couleur"
- Closing CTA, `padding: clamp(40px,7vw,96px) 22px`, centred: "Acheter les pièces" —
  `background: rgba(0,0,0,0.86)`, `backdrop-filter: blur(16px)`,
  `border: 1px solid rgba(253,253,253,0.16)`, `border-radius: 999px`, `color: #FDFDFD`,
  `padding: 19px 36px`, Titillium Web 700 `11px`, `letter-spacing: 0.28em`, uppercase;
  hover `background: #6D1111`

### 5. Info pages — Livraison / Retours / Contact
Routes: `/livraison`, `/retours`, `/contact`. One shared template.

- `padding: clamp(26px,4vw,52px) 22px clamp(60px,9vw,120px)`, `max-width: 1180px`
- Eyebrow `FL390 / <Tag>` — Titillium Web 700 `9px`, `letter-spacing: 0.3em`, uppercase, `#6D1111`
- `<h1>` — Krona One `clamp(1.8rem, 6vw, 4rem)`, `line-height: 0.98`, `letter-spacing: -0.02em`, `margin-top: 20px`
- Intro — `16px`/`1.75`, `max-width: 56ch`, `rgba(0,0,0,0.6)`, `margin-top: 20px`
- Definition rows, `margin-top: clamp(34px,5vw,64px)`, `border-top: 1px solid #000`; each
  `display: grid; grid-template-columns: minmax(170px, 0.55fr) 1fr; gap: clamp(16px,4vw,52px); padding: clamp(18px,3vw,30px) 0`,
  `border-bottom: 1px solid rgba(0,0,0,0.14)`. Key: Titillium Web 700 `10px`,
  `letter-spacing: 0.26em`, uppercase. Value: `16px`/`1.75`, `max-width: 62ch`.

**Livraison** — intro: "Expédition depuis la France. Les délais courent à compter de la confirmation de commande."
| Key | Value |
|---|---|
| France métropolitaine | Expédié sous 24 à 48h. Livraison offerte dès 120 € d'achat. |
| Union européenne | Livraison en 5 à 10 jours ouvrés. Les frais sont calculés au paiement selon le pays de destination. |
| International hors UE | Nous livrons dans une sélection de pays hors UE. Délais et frais de douane variables — écrivez-nous avant commande si besoin. |
| Suivi | Un email avec numéro de suivi est envoyé dès l'expédition du colis. |

**Retours** — intro: "Une taille qui ne convient pas, un changement d'avis — voici comment ça se passe, sans complication."
| Key | Value |
|---|---|
| Délai | 15 jours à compter de la réception pour nous retourner un article. |
| Conditions | Article non porté, non lavé, étiquettes d'origine attachées. |
| Procédure | Écrivez-nous avec votre numéro de commande. Une étiquette de retour prépayée est fournie pour la France métropolitaine. |
| Remboursement | Sous 5 à 10 jours ouvrés après contrôle du colis retourné, sur le moyen de paiement d'origine. |

**Contact** — intro: "Une question, un imprévu sur votre commande — on répond directement, sans standard ni robot."
| Key | Value |
|---|---|
| Nous écrire | contact@fl390.paris — réponse sous 24h ouvrées. |
| Commandes | Les réponses sur les délais et les retours se trouvent sur les pages Livraison et Retours. |
| Presse & collaborations | Même adresse, objet « PRESSE ». |

⚠️ **`contact@fl390.paris` is a placeholder.** Replace it with the brand's real address before
shipping — it appears on the Contact page and should also become a `mailto:` link.

---

## Catalogue data
All five products: 85 €, 100 % combed cotton 270 g/m², oversize, back print, made in France.
`tag` is "New in" on all five today.

| id | Name | Colour | Sizes | Front image | Second view | Dots |
|---|---|---|---|---|---|---|
| `cleared-tee` | Cleared For Takeoff | Noir | XS S M L XL | `img/cleared.png` | — | `#000000`, `#FDFDFD` |
| `departures-tee` | Departures | Blanc | XS S M L XL | `img/departures.png` | — | `#FDFDFD`, `#092242` |
| `climb-tee` | Climb And Maintain | Noir | S M L XL | `img/climb.png` | `img/climb-bw.png` | `#000000`, `#27351B` |
| `cleared-navy` | Cleared For Takeoff — Navy | Navy | XS S M L XL | `img/cleared-navy.png` | — | `#1B2A4A`, `#000000` |
| `cdg-lhr` | CDG — LHR | Navy | S M L XL | `img/cdg-lhr.png` | — | `#1B2A4A`, `#FDFDFD` |

Descriptions (French, used on card and PDP):
- Cleared For Takeoff — "Le message d'ouverture de la marque, imprimé au dos en grand. Coupe oversize, épaules tombantes, col côtelé."
- Departures — "Dix-huit codes OACI empilés sur toute la hauteur du dos. Blanc cassé, impression noire mate, coupe oversize."
- Climb And Maintain — "Monter, puis tenir le niveau. Impression dos trois lignes, coton peigné 270 g, coupe oversize."
- Cleared For Takeoff — Navy — "La signature de la marque en bleu marine, impression dos blanche mate avec la mention born to fly. Coupe oversize, coton peigné 270 g."
- CDG — LHR — "Treize codes OACI répartis sur le dos, logo poitrine discret. Bleu marine, impression blanche mate, coupe oversize."

Note: only `climb-tee` currently has two distinct photographs, so the card hover-swap and the
PDP second frame are no-ops for the other four. Shoot or supply a second angle per product.

---

## Interactions & Behavior

| Interaction | Behaviour |
|---|---|
| Hero rotation | Auto-advance every 5000ms, wraps 0→1→2→0. Crossfade image 1100ms, headline 700ms, progress bar width 400ms linear. |
| Hero progress click | Jumps to that slide. Should also reset the interval. |
| Nav / footer links | Client-side navigation; scroll to top on change. |
| Product card hover | Top image fades to `opacity: 0` over 500ms revealing the second view; card scales nothing. |
| Product card "+" | Adds to cart without leaving the page; icon rotates 90° over 300ms on hover. Needs a real toast/drawer confirmation — the prototype only increments a number. |
| Card name / image click | Opens the product detail page, resets selected size to L, scrolls to top. |
| Size filter pill | Single-select, toggles off when re-clicked, filters the grid client-side. |
| PDP size cell | Selects, unless the size is not offered for that product. |
| Add to cart (PDP) | Increments the counter. Needs real cart mutation, optimistic UI, error handling. |
| Marquees | Infinite `translateX` loops, 34s (ticker) and 26s (typographic). Duplicate run is `aria-hidden`. |
| Lookbook figure hover | Image `scale(1.04)` over 900ms ease. |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables all animations and transitions globally. **Must be carried over** — the marquees and hero rotation are otherwise unavoidable motion. |

Entry animations (home hero, first paint): `fl-fade` (opacity 0→1) and `fl-rise`
(`translateY(30px)` + opacity) — 900–1100ms, `ease-out`, `both`.

## State Management
Prototype state, all local to one component:
- `page` — which view is shown. **Replace with real routing**; deep links, back button and
  shareable product URLs do not work in the prototype.
- `productId` — currently viewed product → becomes a route param.
- `size` — selected size on the PDP, defaults to `'L'`, resets on product change.
- `sizeFilter` — active collection filter or null → belongs in the URL as a query param.
- `cart` — an integer. **Replace with a real cart**: line items (product, size, quantity),
  persistence, server sync, subtotal, checkout handoff.
- `hero` — active hero slide index (0–2), driven by the interval.
- `scrolled` — tracked from a passive scroll listener; currently unused, safe to drop.

Data fetching: none in the prototype (the catalogue is a hard-coded array). Production needs
product list + product detail queries, inventory per size, and cart mutations.

## Design Tokens

**Colours**
| Token | Hex | Use |
|---|---|---|
| Ink | `#000000` | Text, dark surfaces, active states |
| Paper | `#FDFDFD` | Page background, text on dark |
| Stone | `#EFEFEC` | Image frame placeholder |
| Burgundy | `#6D1111` | Accent: hover, eyebrows, marquee separators, destructive-free emphasis |
| Navy | `#092242` | Secondary accent, colour dot |
| Navy garment | `#1B2A4A` | Colour dot only |
| Olive | `#27351B` | Manifesto panel background, colour dot |

Alpha values in use: text `rgba(0,0,0,0.42/0.6/0.68)`; hairlines `rgba(0,0,0,0.07/0.1/0.12/0.14/0.16/0.18/0.3)`;
on dark `rgba(253,253,253,0.14/0.16/0.18/0.28/0.3/0.32/0.38/0.4/0.66)`.

**Glass recipes** (three tiers, do not invent more)
- Header: `rgba(253,253,253,0.42–0.5)` + `blur(26–30px) saturate(180%)`
- On-image pill: `rgba(253,253,253,0.13–0.16)` + `blur(18px) saturate(180%)` + `1px rgba(253,253,253,0.26–0.36)` border + `inset 0 1px 0 rgba(253,253,253,0.28–0.4)`
- Card control: `rgba(253,253,253,0.94)` + `blur(10px)`
Always pair with the `-webkit-backdrop-filter` prefix, and provide an opaque fallback for
browsers without `backdrop-filter` support.

**Typography** — three families, loaded from Google Fonts
- **Krona One** 400 — display only: hero headlines, section `<h2>`, page `<h1>`, wordmark,
  manifesto, marquee. Always tight: `line-height: 0.84–1.2`, `letter-spacing: -0.01em` to `-0.03em`.
- **Work Sans** 400/500/600 — body copy, product names, prices, card badges.
- **Titillium Web** 400/600/700 — all uppercase micro-labels, nav, buttons, table keys,
  flight strip. Wide tracking `0.1em–0.34em`.

Display scale (fluid): `clamp(2.6rem, 11vw, 10rem)` hero · `clamp(2rem, 9vw, 7rem)` page title ·
`clamp(1.8rem, 6vw, 4rem)` doc title · `clamp(1.5rem, 4.4vw, 3.4rem)` manifesto ·
`clamp(1.4rem, 4.4vw, 3.4rem)` marquee · `clamp(1.3rem, 3vw, 2.2rem)` section · `clamp(1.5rem, 3.4vw, 2.6rem)` PDP title.
Body: `16px`/`1.75` long-form · `15px`/`1.75` secondary · `14px` product meta.
Micro: `12px` badge · `11px`, `10px`, `9px` labels.

**Spacing** — page gutter `22px`; grid gap `14px`; card inner `4px`/`12px`;
section rhythm `18px` / `34px` / `46px`; fluid section padding
`clamp(26px,4vw,52px)`, `clamp(36px,6vw,84px)`, `clamp(64px,10vw,150px)`.

**Radii** — `7px` card controls · `10px` size selector · `12px` cards, images, lookbook
wrapper · `14px` flight strip, PDP gallery frames · `18px` manifesto panel · `999px` pills.
Hero and full-bleed sections are **square** — no radius (explicit decision).

**Shadows** — only two: `0 8px 34px rgba(0,0,0,0.06)` under the header, and
`inset 0 1px 0 rgba(253,253,253,0.28–0.4)` as the glass top highlight.

**Motion** — `220ms` pill background · `300ms` button background / icon rotate ·
`400ms` linear progress · `500ms` card image swap · `700ms` headline fade ·
`900ms` lookbook scale · `1100ms` hero image crossfade · `26s`/`34s` marquees.
Easing is `ease` or `ease-out` throughout; nothing bounces.

## Assets
All photography was supplied by the brand and is bundled in `img/`. These are real product
shots, not placeholders — carry them over (and re-export at responsive sizes; several are
large single-resolution PNGs, which should become optimised responsive images).

| File | Content |
|---|---|
| `img/climb.png` | Climb And Maintain worn on the tarmac, colour — hero slide 1 |
| `img/climb-bw.png` | Climb And Maintain, black & white |
| `img/cleared.png` | Cleared For Takeoff, black, back print |
| `img/cleared-navy.png` | Cleared For Takeoff, navy, back print — hero slide 2 |
| `img/cdg-lhr.png` | CDG — LHR, navy, front and back — hero slide 3 |
| `img/departures.png` | Departures, white, eighteen ICAO codes on the back |

Fonts: Google Fonts — `Krona One`, `Work Sans` (400,500,600), `Titillium Web` (400,600,700).
Self-host them in production. No icon library is used anywhere; the only glyphs are `+`,
`←`, `→`, `✳`, `/` and `—` set in the body fonts.

## Files
- `FL390 v2.dc.html` — the current design, all five views. **This is the reference.**
- `FL390.dc.html` — the first direction, kept for history. Ignore unless you want to see
  what was rejected (bordered flat grid, no glass, no carousel).
- `img/` — all photography.
- `support.js` — design-tool runtime. **Do not port.**

## Known gaps to resolve in implementation
1. Real routing and URLs (currently one component with a `page` string).
2. Real cart, checkout and inventory; the counter is cosmetic.
3. Responsive breakpoints for the 4-up grid, the 2-column PDP, and the hero type.
4. Empty state for a filter with no results.
5. Size-guide content and its drawer/modal.
6. Newsletter subscribe endpoint, success and error states.
7. Second product photograph for four of the five products.
8. Sticky offsets: use `96px` (the prototype has a stale `62px` in two places).
9. Touch target on the card "+" button (32px → 44px minimum).
10. Real contact email address in place of `contact@fl390.paris`.
11. SEO, Open Graph images, and French/English copy strategy (UI is French, brand slogans English).
