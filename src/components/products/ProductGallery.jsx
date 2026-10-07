"use client";

import Image from "next/image";
import { useState } from "react";

/** Galería de la ficha: imagen grande con flechas y tira de miniaturas. */
export default function ProductGallery({ images, alt, labels }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return <div className="aspect-4/3 bg-gray-50 border border-gray-200 rounded-lg" />;
  }

  const go = (delta) => setIndex((current) => (current + delta + images.length) % images.length);
  const current = images[index];

  return (
    <div>
      <div className="relative aspect-4/3 bg-white border border-gray-200 rounded-lg overflow-hidden">
        <Image
          key={current.src}
          src={current.src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-contain p-8"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={labels.previous}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 text-klug-navy hover:bg-white shadow transition-colors"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={labels.next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 text-klug-navy hover:bg-white shadow transition-colors"
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <ul className="flex gap-3 mt-4" aria-label={labels.gallery}>
          {images.map((image, position) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setIndex(position)}
                aria-current={position === index}
                aria-label={`${alt} ${position + 1}`}
                className={`relative w-20 h-20 rounded-md border-2 overflow-hidden transition-colors ${
                  position === index ? "border-klug-blue" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Image src={image.src} alt="" aria-hidden="true" fill sizes="80px" className="object-contain p-1" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
