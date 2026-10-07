import Link from "next/link";

import { interpolate } from "@/i18n/getDictionary";

/** Ventana de números alrededor de la página actual, con elipsis. */
function pageWindow(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current, current - 1, current + 1]);
  const list = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const withGaps = [];
  list.forEach((page, index) => {
    if (index > 0 && page - list[index - 1] > 1) withGaps.push("gap");
    withGaps.push(page);
  });
  return withGaps;
}

/**
 * Paginación por enlaces reales.
 *
 * Son `<a>` a rutas prerenderizadas, no botones con estado: así cada página se
 * puede compartir, el botón atrás funciona y los buscadores recorren el
 * catálogo entero aunque no se ejecute JavaScript.
 */
export default function Pagination({ current, total, hrefFor, t }) {
  if (total <= 1) return null;

  const items = pageWindow(current, total);

  const linkClass = (active) =>
    `inline-flex items-center justify-center min-w-9 h-9 px-3 rounded-md text-sm font-medium transition-colors ${
      active
        ? "bg-klug-blue text-white"
        : "bg-white text-klug-navy border border-gray-200 hover:border-klug-blue hover:text-klug-blue"
    }`;

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2 mt-10"
      aria-label={interpolate(t.products.pageOf, { page: current, total })}
    >
      {current > 1 ? (
        <Link href={hrefFor(current - 1)} rel="prev" className={linkClass(false)}>
          ‹ {t.products.prevPage}
        </Link>
      ) : (
        <span className={`${linkClass(false)} opacity-40 pointer-events-none`} aria-hidden="true">
          ‹ {t.products.prevPage}
        </span>
      )}

      {items.map((item, index) =>
        item === "gap" ? (
          <span key={`gap-${index}`} className="px-1 text-gray-400" aria-hidden="true">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={hrefFor(item)}
            aria-label={interpolate(t.products.goToPage, { page: item })}
            aria-current={item === current ? "page" : undefined}
            className={linkClass(item === current)}
          >
            {item}
          </Link>
        )
      )}

      {current < total ? (
        <Link href={hrefFor(current + 1)} rel="next" className={linkClass(false)}>
          {t.products.nextPage} ›
        </Link>
      ) : (
        <span className={`${linkClass(false)} opacity-40 pointer-events-none`} aria-hidden="true">
          {t.products.nextPage} ›
        </span>
      )}
    </nav>
  );
}
