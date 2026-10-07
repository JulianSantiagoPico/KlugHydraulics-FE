"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import emailIcon from "@/assets/icons/email-icon.svg";
import personIcon from "@/assets/icons/person-icon.svg";
import phoneIcon from "@/assets/icons/phone-icon.svg";
import mapDotsBlue from "@/assets/images/Map/MapDots-Blue.svg";
import mapDotsWhite from "@/assets/images/Map/MapDots.svg";
import mapLinesBlue from "@/assets/images/Map/MapLines-Blue.svg";
import mapLinesWhite from "@/assets/images/Map/MapLines.svg";

const THEMES = {
  // Home: mapa blanco sobre el degradado azul oscuro.
  dark: {
    lines: mapLinesWhite,
    dots: mapDotsWhite,
    section: "text-white",
    background: "radial-gradient(50% 50% at 50% 50%, #00406F 0%, #132E43 100%)",
  },
  // Contacto: mapa azul sobre blanco.
  light: {
    lines: mapLinesBlue,
    dots: mapDotsBlue,
    section: "text-klug-navy",
    background: "#ffffff",
  },
};

/** Cuánto tarda la ficha en desaparecer tras soltar el punto. */
const HIDE_DELAY_MS = 2000;

function ContactRow({ icon, children, iconClassName }) {
  if (!children) return null;
  return (
    <div className="flex items-center">
      <Image src={icon} alt="" aria-hidden="true" className={`w-4 h-4 mr-3 ${iconClassName}`} />
      <span className="truncate">{children}</span>
    </div>
  );
}

function DistributorDetails({ distributor, label, variant }) {
  const onDark = variant === "dark";
  const iconClassName = onDark ? "brightness-0 invert opacity-70" : "opacity-70";

  return (
    <>
      <span className="inline-block bg-klug-blue-mid text-white px-4 py-2 rounded-xl text-sm font-medium mb-3">
        {label}
      </span>
      <h3 className="text-xl font-bold mb-4">{distributor.region}</h3>
      <div className={`space-y-3 text-sm ${onDark ? "" : "text-gray-700"}`}>
        <ContactRow icon={phoneIcon} iconClassName={iconClassName}>
          {distributor.phone}
        </ContactRow>
        <ContactRow icon={personIcon} iconClassName={iconClassName}>
          {distributor.person}
        </ContactRow>
        <ContactRow icon={emailIcon} iconClassName={iconClassName}>
          {distributor.email}
        </ContactRow>
      </div>
    </>
  );
}

/**
 * Mapa de distribuidores. En escritorio los puntos son botones sobre el mapa y
 * abren una ficha; por debajo de `lg` se degrada a una rejilla de tarjetas,
 * que además es la única vista utilizable con lector de pantalla.
 */
export default function DistributorsMap({ distributors, title, contactLabel, theme = "dark" }) {
  const [active, setActive] = useState(null);
  const [shown, setShown] = useState(null);
  const skin = THEMES[theme] ?? THEMES.dark;

  // La ficha se queda un momento en pantalla al salir del punto, para poder
  // llevar el ratón hasta ella sin que desaparezca.
  useEffect(() => {
    if (active) {
      setShown(active);
      return;
    }
    const timeout = setTimeout(() => setShown(null), HIDE_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [active]);

  return (
    <section className={`py-16 lg:py-20 ${skin.section}`} style={{ background: skin.background }}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-12">{title}</h2>

        <div className="hidden lg:block">
          <div className="relative w-full h-[500px] lg:h-[600px]">
            <Image src={skin.lines} alt="" aria-hidden="true" fill className="object-contain" />
            <Image src={skin.dots} alt="" aria-hidden="true" fill className="object-contain" />

            {distributors.map((distributor) => (
              <button
                key={distributor.id}
                type="button"
                style={{ top: distributor.position.top, left: distributor.position.left }}
                onMouseEnter={() => setActive(distributor)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(distributor)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(distributor)}
                className={`absolute w-11 h-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 flex items-center justify-center transition-transform duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-klug-blue z-10 ${
                  theme === "light" ? "border-klug-blue-soft bg-klug-blue-soft" : "border-white bg-white"
                } ${
                  active?.id === distributor.id ? "scale-110" : ""
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-klug-navy" />
                <span className="sr-only">{distributor.region}</span>
              </button>
            ))}

            {/* En escritorio la rejilla de tarjetas está en display:none, así que
                esta ficha es la única fuente de los datos: se anuncia al enfocar
                un punto con el teclado en lugar de ocultarse a los lectores. */}
            <div
              aria-live="polite"
              className={`absolute bottom-4 left-32 w-80 max-w-sm p-6 transition-all duration-500 ease-out ${
                shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
              }`}
            >
              {shown && (
                <DistributorDetails distributor={shown} label={contactLabel} variant={theme} />
              )}
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden list-none">
          {distributors.map((distributor) => (
            <li
              key={distributor.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <DistributorDetails distributor={distributor} label={contactLabel} variant="light" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
