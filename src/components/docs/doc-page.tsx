import type { Doc } from "@/lib/docs";
import { SITE } from "@/lib/site";

/** Gabarit partagé par Livraison, Retours et Contact. */
export function DocPage({ doc }: { doc: Doc }) {
  return (
    <article className="max-w-[1180px] px-[22px] pt-[clamp(26px,4vw,52px)] pb-[clamp(60px,9vw,120px)]">
      <p className="font-label m-0 text-[9px] font-bold tracking-[0.3em] text-burgundy uppercase">
        FL390 / {doc.tag}
      </p>

      <h1 className="font-display mt-[20px] mb-0 text-[clamp(1.8rem,6vw,4rem)] leading-[0.98] tracking-[-0.02em]">
        {doc.title}
      </h1>

      <p className="mt-[20px] mb-0 max-w-[56ch] text-[16px]/[1.75] text-black/60">
        {doc.intro}
      </p>

      <dl className="mt-[clamp(34px,5vw,64px)] mb-0 border-t border-ink">
        {doc.rows.map((row) => (
          <div
            key={row.key}
            className="grid grid-cols-[minmax(170px,0.55fr)_1fr] gap-[clamp(16px,4vw,52px)] border-b border-black/14 py-[clamp(18px,3vw,30px)] max-[600px]:grid-cols-1"
          >
            <dt className="font-label text-[10px] font-bold tracking-[0.26em] uppercase">
              {row.key}
            </dt>
            <dd className="m-0 max-w-[62ch] text-[16px]/[1.75]">
              {row.value.startsWith(SITE.email) ? (
                <>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="border-b border-black/30 transition-colors duration-300 hover:text-burgundy"
                  >
                    {SITE.email}
                  </a>
                  {row.value.slice(SITE.email.length)}
                </>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
