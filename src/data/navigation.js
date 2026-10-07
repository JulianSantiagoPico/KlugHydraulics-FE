import aboutImg from "@/assets/images/About.webp";
import catalogsImg from "@/assets/images/Catalogs.webp";
import contactImg from "@/assets/images/Contact.webp";
import productsImg from "@/assets/images/Products.webp";

import { aboutHref, catalogsHref, contactHref, productsHref } from "@/lib/routes";
import taxonomy from "./taxonomy.json";

/**
 * Accesos rápidos de la cabecera. `labelKey` apunta al diccionario para que el
 * texto salga traducido sin duplicar la estructura por idioma.
 */
export const QUICK_ACCESS = [
  { id: "about", labelKey: "about", image: aboutImg, href: aboutHref },
  { id: "products", labelKey: "products", image: productsImg, href: productsHref },
  { id: "catalogs", labelKey: "catalogs", image: catalogsImg, href: catalogsHref },
  { id: "contact", labelKey: "contact", image: contactImg, href: contactHref },
];

/**
 * La navegación principal son las seis categorías del catálogo, tal cual las
 * define la taxonomía. Si mañana se añade una categoría, aparece sola.
 */
export function mainNavigation(locale) {
  return taxonomy.map((category) => ({
    id: category.slug,
    label: category.name[locale],
    href: `/${locale}/products/${category.slug}`,
    subcategories: category.subcategories.map((sub) => ({
      id: sub.slug,
      label: sub.name[locale],
      href: `/${locale}/products/${category.slug}/${sub.slug}`,
    })),
  }));
}

export function quickAccess(locale, t) {
  return QUICK_ACCESS.map((item) => ({
    ...item,
    label: t.nav[item.labelKey],
    href: item.href(locale),
  }));
}
