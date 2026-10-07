/**
 * Constructores de URL. Todas las rutas del sitio llevan prefijo de idioma, así
 * que nunca se escribe un href a mano: se pasa siempre por aquí.
 */

export const homeHref = (locale) => `/${locale}`;
export const aboutHref = (locale) => `/${locale}/about`;
export const contactHref = (locale) => `/${locale}/contact`;
export const catalogsHref = (locale) => `/${locale}/catalogs`;

export const productsHref = (locale) => `/${locale}/products`;

/**
 * Página N del listado completo. La 1 es `/products` a secas para no tener dos
 * URLs con el mismo contenido.
 */
export const productsPageHref = (locale, page) =>
  page <= 1 ? `/${locale}/products` : `/${locale}/products/page/${page}`;
export const categoryHref = (locale, category) => `/${locale}/products/${category}`;
export const subcategoryHref = (locale, category, subcategory) =>
  `/${locale}/products/${category}/${subcategory}`;
export const modelHref = (locale, category, subcategory, model) =>
  `/${locale}/products/${category}/${subcategory}/${model}`;

/**
 * La misma página en otro idioma: cambia solo el primer segmento. Los slugs de
 * producto son iguales en ambos idiomas, así que la ruta sigue siendo válida.
 */
export function switchLocale(pathname, nextLocale) {
  const segments = pathname.split("/");
  segments[1] = nextLocale;
  return segments.join("/") || `/${nextLocale}`;
}
