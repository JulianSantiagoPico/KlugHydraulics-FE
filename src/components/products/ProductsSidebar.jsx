"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useQuote } from "@/components/quote/QuoteProvider";

/** Acordeón de categorías. La categoría de la ruta actual arranca abierta. */
function CategoryTree({ tree, t }) {
  const pathname = usePathname();
  const activeCategory = tree.find((category) => pathname.startsWith(category.href));
  const [open, setOpen] = useState(activeCategory?.slug ?? null);

  return (
    <nav aria-label={t.products.browseBy}>
      <p className="text-lg font-bold text-klug-navy mb-4">{t.products.browseBy}</p>
      <ul className="space-y-0">
        {tree.map((category) => {
          const expanded = open === category.slug;
          return (
            <li key={category.slug} className="border-b border-gray-200">
              <div className="flex items-center">
                <Link
                  href={category.href}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    pathname.startsWith(category.href)
                      ? "text-klug-blue"
                      : "text-klug-navy hover:text-klug-blue"
                  }`}
                >
                  {category.label}
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : category.slug)}
                  aria-expanded={expanded}
                  aria-label={category.label}
                  className="p-2 text-gray-400 hover:text-klug-blue text-lg leading-none"
                >
                  {expanded ? "×" : "+"}
                </button>
              </div>

              {expanded && (
                <ul className="pb-3 space-y-1">
                  {category.subcategories.map((sub) => {
                    const active = pathname.startsWith(sub.href);
                    return (
                      <li key={sub.slug}>
                        <Link
                          href={sub.href}
                          aria-current={active ? "page" : undefined}
                          className={`block py-1 pl-2 text-sm transition-colors ${
                            active
                              ? "text-klug-blue underline"
                              : sub.count === 0
                                ? "text-gray-300 hover:text-gray-400"
                                : "text-gray-600 hover:text-klug-blue"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Panel de productos guardados, tal como aparece en la ficha del Figma. */
function SavedProducts({ t }) {
  const { items, remove, hydrated, openQuote } = useQuote();
  if (!hydrated || items.length === 0) return null;

  return (
    <section className="mt-10" aria-label={t.quote.saved}>
      <p className="flex items-center gap-2 text-lg font-bold text-klug-navy mb-4">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
        </svg>
        {t.quote.saved}
      </p>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <div className="relative w-12 h-12 shrink-0 bg-white border border-gray-200 rounded">
              {item.image && (
                <Image src={item.image} alt="" aria-hidden="true" fill sizes="48px" className="object-contain p-1" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Link href={item.href} className="block text-sm font-medium text-klug-navy truncate hover:text-klug-blue">
                {item.code ?? item.name}
              </Link>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                {t.quote.remove}
              </button>
            </div>
            <button
              type="button"
              onClick={openQuote}
              className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 text-klug-navy hover:border-klug-blue hover:text-klug-blue transition-colors"
            >
              {t.quote.quote}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={openQuote}
        className="mt-4 block w-full text-center px-4 py-2 rounded-lg bg-klug-blue text-white text-sm font-medium hover:bg-klug-blue/90 transition-colors"
      >
        {t.quote.quoteAll}
      </button>
    </section>
  );
}

export default function ProductsSidebar({ tree, t }) {
  return (
    <aside className="w-full lg:w-64 xl:w-72 shrink-0">
      <CategoryTree tree={tree} t={t} />
      <SavedProducts t={t} />
    </aside>
  );
}
