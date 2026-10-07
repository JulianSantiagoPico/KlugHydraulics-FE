"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Carrusel de portada. Avanza solo cada `interval` y se detiene mientras el
 * ratón está encima o algo dentro tiene el foco, que es el mecanismo de pausa
 * que pide la WCAG para contenido que se mueve sin que el usuario lo pida.
 */
export default function HeroCarousel({ slides, interval = 5000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  // `index` no entra en las dependencias a propósito: se usa la forma
  // funcional de setIndex para que el temporizador no se reinicie en cada
  // avance, sólo cuando cambian la pausa o el intervalo.
  useEffect(() => {
    if (paused || total < 2) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % total), interval);
    return () => clearInterval(timer);
  }, [paused, interval, total]);

  const goTo = (position) => setIndex(((position % total) + total) % total);

  return (
    <section
      className="w-full"
      aria-roledescription="carousel"
      aria-label={slides[index]?.alt}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, position) => (
            <div
              key={slide.alt}
              className="min-w-full"
              role="group"
              aria-roledescription="slide"
              aria-label={`${position + 1} / ${total}`}
              aria-hidden={position !== index}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                priority={position === 0}
                sizes="100vw"
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {slides.map((slide, position) => (
          <button
            key={slide.alt}
            type="button"
            onClick={() => goTo(position)}
            aria-label={slide.alt}
            aria-current={position === index}
            className={`h-3 rounded-full transition-all duration-300 ${
              position === index ? "w-6 bg-klug-navy" : "w-3 bg-klug-navy/40 hover:bg-klug-navy/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
