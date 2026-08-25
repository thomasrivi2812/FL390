"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDE_DURATION_MS = 5000;

/** Les visuels sont pilotés par index ; les titres restent des nœuds de texte. */
const SLIDES = [
  {
    src: "/img/climb.png",
    alt: "T-shirt Climb And Maintain porté sur le tarmac",
    position: "44% 30%",
  },
  {
    src: "/img/cleared-navy.png",
    alt: "T-shirt Cleared For Takeoff navy, impression au dos",
    position: "50% 34%",
  },
  {
    src: "/img/cdg-lhr.png",
    alt: "T-shirt CDG — LHR, codes OACI au dos",
    position: "50% 36%",
  },
] as const;

const HEADLINE =
  "font-display m-0 text-[clamp(2.6rem,11vw,10rem)] leading-[0.84] tracking-[-0.02em] text-paper transition-opacity duration-700 ease-out";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  /** Incrémenté à chaque choix manuel pour relancer le compte à rebours. */
  const [restart, setRestart] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const timer = setInterval(
      () => setIndex((current) => (current + 1) % SLIDES.length),
      SLIDE_DURATION_MS,
    );
    return () => clearInterval(timer);
  }, [restart]);

  function pick(next: number) {
    setIndex(next);
    setRestart((value) => value + 1);
  }

  return (
    <section className="relative h-svh min-h-[560px] overflow-hidden bg-ink">
      {SLIDES.map((slide, slideIndex) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={slideIndex === 0}
          sizes="100vw"
          style={{ objectPosition: slide.position }}
          className={`object-cover transition-opacity duration-[1100ms] ease-out ${
            slideIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.05)_52%,rgba(0,0,0,0.3)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-[22px] px-[22px] pb-[26px]">
        <div className="animate-fl-rise relative">
          <h1
            aria-hidden={index !== 0}
            className={`${HEADLINE} ${index === 0 ? "opacity-100" : "opacity-0"}`}
          >
            Climb And
            <br />
            Maintain
          </h1>
          <h1
            aria-hidden={index !== 1}
            className={`${HEADLINE} absolute inset-0 ${index === 1 ? "opacity-100" : "opacity-0"}`}
          >
            Cleared For
            <br />
            Takeoff
          </h1>
          <h1
            aria-hidden={index !== 2}
            className={`${HEADLINE} absolute inset-0 ${index === 2 ? "opacity-100" : "opacity-0"}`}
          >
            CDG —
            <br />
            LHR
          </h1>
        </div>

        <div className="animate-fl-fade flex gap-[8px]">
          {SLIDES.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => pick(slideIndex)}
              aria-label={`Visuel ${slideIndex + 1}`}
              aria-current={slideIndex === index}
              className="-my-[10px] w-[46px] py-[10px]"
            >
              <span className="block h-[2px] w-full overflow-hidden bg-paper/30">
                <span
                  className={`block h-full bg-paper transition-[width] duration-[400ms] ease-linear ${
                    slideIndex === index ? "w-full" : "w-0"
                  }`}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
