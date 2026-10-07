"use client";

import { useQuote } from "@/components/quote/QuoteProvider";

function BookmarkIcon({ filled, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
    </svg>
  );
}

/**
 * Añade o quita un producto de la lista de cotización.
 *
 * `variant="icon"` es el marcador de las cards del listado; `variant="button"`
 * es el botón ancho de la ficha.
 */
export default function SaveProductButton({ product, labels, variant = "icon" }) {
  const { has, toggle, hydrated } = useQuote();
  const saved = hydrated && has(product.id);

  const handleClick = () => toggle(product);

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={saved ? labels.saved : labels.save}
        title={saved ? labels.saved : labels.save}
        className={`p-1.5 rounded-md transition-colors ${
          saved ? "text-klug-blue" : "text-gray-300 hover:text-klug-blue"
        }`}
      >
        <BookmarkIcon filled={saved} className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg border text-sm font-medium transition-colors ${
        saved
          ? "bg-klug-blue text-white border-klug-blue hover:bg-klug-blue/90"
          : "bg-white text-klug-navy border-gray-300 hover:border-klug-blue hover:text-klug-blue"
      }`}
    >
      <BookmarkIcon filled={saved} className="w-4 h-4" />
      {saved ? labels.saved : labels.save}
    </button>
  );
}
