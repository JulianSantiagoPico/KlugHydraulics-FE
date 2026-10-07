"use client";

import Image from "next/image";
import { useState } from "react";

import klugElectricLogo from "@/assets/logos/klug-electric-logo.webp";
import klugPneumaticsLogo from "@/assets/logos/klug-pneumatics-logo.webp";

const LOGOS = [
  {
    src: klugPneumaticsLogo,
    alt: "Klüg Pneumatics",
    url: "https://klugpneumatics.com/",
    color: "#6EC2FF",
  },
  {
    src: klugElectricLogo,
    alt: "Klüg Electric",
    url: "https://klugelectric.com/",
    color: "#30A7FF",
  },
];

/** Pestañas fijas al borde derecho con las marcas hermanas. */
export default function FloatingLogos() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
      <div className="hidden md:block shadow-lg rounded-l-lg overflow-hidden">
        {LOGOS.map((logo) => (
          <a
            key={logo.url}
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-[140px] h-[80px] items-center justify-center p-4 hover:brightness-110 transition-all duration-200"
            style={{ backgroundColor: logo.color }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              className="h-auto w-auto max-w-full max-h-full object-contain brightness-0 invert"
            />
          </a>
        ))}
      </div>

      <div className="md:hidden flex flex-col items-end">
        <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col mb-2 shadow-lg rounded-l-lg overflow-hidden">
            {LOGOS.map((logo) => (
              <a
                key={logo.url}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-[100px] h-[50px] items-center justify-center p-2"
                style={{ backgroundColor: logo.color }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  className="h-auto w-auto max-w-full max-h-full object-contain brightness-0 invert"
                />
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          aria-label="Klüg Electric / Klüg Pneumatics"
          className="w-[45px] h-[45px] flex items-center justify-center rounded-l-lg bg-klug-blue text-white shadow-lg hover:bg-klug-blue/90 transition-colors"
        >
          <svg className={`w-5 h-5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
