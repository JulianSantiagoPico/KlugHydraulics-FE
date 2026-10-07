"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { mainNavigation, quickAccess } from "@/data/navigation";
import { localeNames, locales } from "@/i18n/config";
import { switchLocale } from "@/lib/routes";

/** Botón hamburguesa que se transforma en aspa al abrir. */
export function MobileMenuButton({ isOpen, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={isOpen}
      className="xl:hidden p-2 ml-2 rounded-lg hover:bg-gray-100/70 focus:outline-none focus:ring-2 focus:ring-klug-blue transition-colors"
    >
      <span className="w-6 h-6 flex flex-col justify-center gap-1">
        <span className={`block h-0.5 w-6 bg-gray-600 transition-transform duration-300 origin-center ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
        <span className={`block h-0.5 w-6 bg-gray-600 transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`block h-0.5 w-6 bg-gray-600 transition-transform duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
      </span>
    </button>
  );
}

export default function MobileMenu({ isOpen, onClose, locale, t }) {
  const panelRef = useRef(null);
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(null);
  const categories = mainNavigation(locale);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    const onPointerDown = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 xl:hidden" aria-hidden="true" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menu}
        className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 xl:hidden flex flex-col animate-fade-in"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-klug-navy">{t.nav.menu}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.nav.closeMenu}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-klug-blue"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              {t.nav.quickAccess}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickAccess(locale, t).map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Image src={item.image} alt="" aria-hidden="true" className="w-10 h-10 object-contain mb-2" />
                  <span className="text-xs text-center text-gray-700">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <nav className="p-4" aria-label={t.nav.products}>
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              {t.nav.products}
            </h3>
            <ul className="space-y-1">
              {categories.map((category) => {
                const open = expanded === category.id;
                return (
                  <li key={category.id}>
                    <div className="flex items-center">
                      <Link
                        href={category.href}
                        onClick={onClose}
                        className="flex-1 px-3 py-3 text-klug-navy hover:text-klug-blue rounded-lg font-medium transition-colors"
                      >
                        {category.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setExpanded(open ? null : category.id)}
                        aria-expanded={open}
                        aria-label={category.label}
                        className="p-3 text-gray-400 hover:text-klug-blue"
                      >
                        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {open && (
                      <ul className="pl-4 pb-2 space-y-0.5">
                        {category.subcategories.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={sub.href}
                              onClick={onClose}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-klug-blue transition-colors"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center justify-center gap-3 text-sm">
          {locales.map((code) => (
            <Link
              key={code}
              href={switchLocale(pathname, code)}
              hrefLang={code}
              onClick={onClose}
              className={
                code === locale
                  ? "font-semibold text-klug-navy"
                  : "text-gray-500 hover:text-klug-blue transition-colors"
              }
            >
              {localeNames[code]}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
