import { locales } from "@/i18n/config";

/**
 * Bloque `alternates` de una página.
 *
 * Va en todas las `generateMetadata`: el `alternates` del layout no se hereda
 * cuando una página define el suyo, así que sin esto las hijas se quedaban sin
 * hreflang y ES/EN competirían entre sí como contenido duplicado.
 *
 * @param {string} locale idioma de la página
 * @param {string} path ruta sin prefijo de idioma, empezando por "/" ("" para la home)
 */
export function alternates(locale, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(locales.map((code) => [code, `/${code}${path}`])),
  };
}
