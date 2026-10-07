"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import logo from "@/assets/logos/Logo-Klüg-Hydraulics.webp";
import { mainNavigation, quickAccess } from "@/data/navigation";
import { localeNames, locales } from "@/i18n/config";
import { homeHref, productsHref, switchLocale } from "@/lib/routes";
import MobileMenu, { MobileMenuButton } from "./MobileMenu";
import { useQuote } from "@/components/quote/QuoteProvider";

function Logo({ locale, t }) {
  return (
    <Link href={homeHref(locale)} aria-label={t.nav.home} className="shrink-0">
      <Image
        src={logo}
        alt="Klüg Hydraulics"
        priority
        className="h-[32px] w-auto sm:h-[40px] md:h-[45px] lg:h-[50px] xl:h-[55px] hover:opacity-80 transition-opacity duration-200"
      />
    </Link>
  );
}

function SearchBar({ locale, t }) {
  const router = useRouter();
  const [term, setTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = term.trim();
    if (query) router.push(`${productsHref(locale)}?q=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="hidden sm:block relative flex-1 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-16"
    >
      <label htmlFor="site-search" className="sr-only">
        {t.nav.searchLabel}
      </label>
      <input
        id="site-search"
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder={t.nav.search}
        autoComplete="off"
        className="w-full py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 text-sm sm:text-base text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-klug-blue focus:border-transparent"
      />
      <span className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
    </form>
  );
}

function QuickAccess({ locale, t }) {
  return (
    <div className="hidden xl:flex items-center gap-6 xl:gap-8">
      {quickAccess(locale, t).map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="flex flex-col items-center text-gray-600 hover:text-klug-blue transition-colors duration-200"
        >
          <Image src={item.image} alt="" aria-hidden="true" className="w-[28px] h-[28px] xl:w-[31px] xl:h-[31px] object-contain" />
          <span className="text-xs sm:text-sm mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

/** Contador de la lista de cotización. Solo aparece cuando hay algo dentro. */
function QuoteBadge({ t }) {
  const { count, hydrated, openQuote } = useQuote();
  if (!hydrated || count === 0) return null;

  return (
    <button
      type="button"
      onClick={openQuote}
      className="relative flex items-center gap-2 ml-4 px-3 py-2 rounded-lg bg-klug-blue text-white text-sm font-medium hover:bg-klug-blue/90 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
      </svg>
      <span className="hidden sm:inline">{t.quote.saved}</span>
      <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-white text-klug-blue text-xs font-bold">
        {count}
      </span>
    </button>
  );
}

function LocaleSwitcher({ locale }) {
  const pathname = usePathname();

  return (
    <div className="hidden xl:flex items-center gap-1 ml-4 text-sm">
      {locales.map((code, index) => (
        <span key={code} className="flex items-center">
          {index > 0 && <span className="text-gray-300 mx-1">|</span>}
          <Link
            href={switchLocale(pathname, code)}
            hrefLang={code}
            aria-current={code === locale ? "true" : undefined}
            className={
              code === locale
                ? "font-semibold text-klug-navy"
                : "text-gray-500 hover:text-klug-blue transition-colors"
            }
          >
            {localeNames[code]}
          </Link>
        </span>
      ))}
    </div>
  );
}

/**
 * Navegación de categorías con submenú. El Figma abre un panel por categoría
 * con sus subcategorías; se abre al pasar el ratón y también con teclado.
 */
function MainNavigation({ locale }) {
  const pathname = usePathname();
  const [openId, setOpenId] = useState(null);
  const navRef = useRef(null);
  const categories = mainNavigation(locale);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpenId(null);
    };
    const onClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) setOpenId(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  // Al navegar, el panel abierto debe cerrarse solo.
  useEffect(() => setOpenId(null), [pathname]);

  return (
    <nav
      ref={navRef}
      className="hidden xl:block bg-white border-b border-gray-200 relative"
      aria-label="Categorías de producto"
      onMouseLeave={() => setOpenId(null)}
    >
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-center gap-8 xl:gap-12">
          {categories.map((category) => {
            const active = pathname.startsWith(category.href);
            const open = openId === category.id;

            return (
              <li key={category.id} onMouseEnter={() => setOpenId(category.id)}>
                <Link
                  href={category.href}
                  onFocus={() => setOpenId(category.id)}
                  aria-current={active ? "page" : undefined}
                  aria-expanded={open}
                  className={`block font-semibold py-3 xl:py-4 text-sm xl:text-base uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors duration-200 ${
                    active
                      ? "text-klug-blue border-klug-blue"
                      : "text-klug-navy border-transparent hover:text-klug-blue hover:border-klug-blue"
                  }`}
                >
                  {category.label}
                </Link>

                {open && category.subcategories.length > 0 && (
                  <div className="absolute left-0 right-0 top-full bg-white shadow-xl border-t border-gray-100 z-40">
                    <div className="container mx-auto px-4 py-6">
                      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-2">
                        {category.subcategories.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={sub.href}
                              className="block py-1.5 text-sm text-gray-600 hover:text-klug-blue transition-colors"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default function Header({ locale, t }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Logo locale={locale} t={t} />
            <SearchBar locale={locale} t={t} />
            <div className="flex items-center">
              <QuickAccess locale={locale} t={t} />
              <QuoteBadge t={t} />
              <LocaleSwitcher locale={locale} />
              <MobileMenuButton
                isOpen={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              />
            </div>
          </div>
        </div>

        <MainNavigation locale={locale} />
        <div className="h-1 bg-klug-blue" role="presentation" />
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        locale={locale}
        t={t}
      />
    </>
  );
}
