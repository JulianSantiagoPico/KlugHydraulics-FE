"use client";

import Image from "next/image";
import { useState } from "react";

import downloadIcon from "@/assets/icons/download-icon.svg";
import filterIcon from "@/assets/icons/filter-icon.svg";

/**
 * Rejilla de catálogos con filtro por categoría.
 *
 * Los datos llegan ya resueltos desde el servidor; aquí solo vive el estado del
 * filtro, así que el HTML inicial ya trae los 16 catálogos indexables.
 */
export default function CatalogGrid({ catalogs, categories, t }) {
  const [active, setActive] = useState([]);

  const toggle = (slug) =>
    setActive((current) =>
      current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]
    );

  const visible = active.length
    ? catalogs.filter((catalog) => active.includes(catalog.category))
    : catalogs;

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
        <div
          className="flex flex-wrap items-center gap-2 flex-1 bg-gray-100 rounded-xl px-3 py-2"
          role="group"
          aria-label={t.catalogs.filterBy}
        >
          <Image src={filterIcon} alt="" aria-hidden="true" className="w-5 h-5 mx-1 shrink-0" />

          {categories.map((category) => {
            const on = active.includes(category.slug);
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => toggle(category.slug)}
                aria-pressed={on}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  on
                    ? "bg-klug-blue-soft text-klug-navy"
                    : "bg-white text-klug-navy hover:bg-klug-blue-soft/40"
                }`}
              >
                {category.label}
                {on && (
                  <span aria-hidden="true" className="text-klug-navy/60 leading-none">
                    ×
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setActive([])}
          disabled={active.length === 0}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white shadow-sm text-sm font-medium text-klug-navy hover:text-klug-blue disabled:opacity-40 disabled:hover:text-klug-navy transition-colors lg:w-56"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M20 9A8 8 0 006.3 5.3M4 15a8 8 0 0013.7 3.7" />
          </svg>
          {t.catalogs.reset}
        </button>
      </div>

      {visible.length === 0 ? (
        <p className="text-gray-500 py-12 text-center">{t.catalogs.empty}</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 list-none">
          {visible.map((catalog) => (
            <li key={catalog.id} className="bg-white rounded-2xl shadow-sm p-2">
              {/* `contain` y no `cover`: 10 de los 16 catálogos tienen portada
                  vertical y llevan el título abajo, que un recorte se comería. */}
              <div className="relative aspect-3/2 rounded-xl overflow-hidden bg-gray-50">
                <Image
                  src={catalog.thumbnail}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                  className="object-contain"
                />
              </div>

              <div className="flex items-center justify-between gap-3 px-2 py-3">
                <h2 className="font-bold text-klug-navy leading-snug">{catalog.title}</h2>
                <a
                  href={catalog.pdfUrl}
                  download
                  aria-label={`${t.catalogs.download}: ${catalog.title}`}
                  className="shrink-0 p-1.5 rounded-md hover:bg-klug-blue-soft/40 transition-colors"
                >
                  <Image src={downloadIcon} alt="" aria-hidden="true" className="w-5 h-5" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
