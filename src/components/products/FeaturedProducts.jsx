"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import SaveProductButton from "./SaveProductButton";

function Arrow({ direction, label, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`absolute top-1/3 z-10 hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-white text-klug-navy shadow-md transition-opacity hover:text-klug-blue disabled:opacity-0 ${
        direction === "prev" ? "-left-3" : "-right-3"
      }`}
    >
      {direction === "prev" ? "‹" : "›"}
    </button>
  );
}

/**
 * Productos destacados de la portada.
 *
 * Es una tira con desplazamiento nativo y ajuste por tarjeta: las flechas solo
 * empujan el scroll, así que en móvil funciona con el dedo sin código extra y
 * el teclado puede tabular por las tarjetas con normalidad.
 */
export default function FeaturedProducts({ products, title, labels, t }) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  // Sin esto las flechas arrancan mal: si las tarjetas caben sin desplazamiento
  // "Siguiente" se mostraría activa hasta el primer scroll, que nunca llega.
  // Hay que recalcular también al redimensionar, porque cambia el número de
  // columnas. Se escucha por partida doble: `ResizeObserver` cubre los cambios
  // de tamaño que no pasan por la ventana, y el evento `resize` entra por el
  // bucle de eventos, que sigue vivo aunque el navegador no esté pintando
  // fotogramas (pestaña oculta) y el observador quede en pausa.
  useEffect(() => {
    syncEdges();
    const el = trackRef.current;
    if (!el) return;

    const observer = new ResizeObserver(syncEdges);
    observer.observe(el);
    window.addEventListener("resize", syncEdges);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncEdges);
    };
  }, [syncEdges]);

  const scrollByCard = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-klug-navy text-center mb-10">{title}</h2>

      <div className="relative">
        <Arrow direction="prev" label={labels.prev} disabled={atStart} onClick={() => scrollByCard(-1)} />
        <Arrow direction="next" label={labels.next} disabled={atEnd} onClick={() => scrollByCard(1)} />

        <ul
          ref={trackRef}
          onScroll={syncEdges}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 list-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <li
              key={product.id}
              className="snap-start shrink-0 w-[calc(100%-1rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <Link
                href={product.href}
                className="block relative aspect-4/3 bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-klug-blue transition-colors"
              >
                <Image
                  src={product.image.src}
                  alt={product.label}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
                  className="object-contain p-6"
                />
              </Link>

              <div className="flex items-center justify-between gap-2 mt-3">
                <Link
                  href={product.href}
                  className="text-sm font-medium text-klug-navy hover:text-klug-blue transition-colors"
                >
                  {product.label}
                </Link>
                <SaveProductButton
                  product={{
                    id: product.id,
                    slug: product.slug,
                    name: product.label,
                    code: null,
                    image: product.image.src,
                    href: product.href,
                  }}
                  labels={{ save: t.product.saveProduct, saved: t.product.savedProduct }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
