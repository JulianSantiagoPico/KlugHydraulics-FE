import { locales } from "@/i18n/config";
import {
  allProductPageParams,
  allProductParams,
  allSubcategoryParams,
  getCategories,
} from "@/lib/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://klughydraulics.com";

/**
 * Sitemap con las dos versiones de idioma enlazadas entre sí. Cada URL declara
 * sus alternativas para que Google no trate ES y EN como contenido duplicado.
 */
export default function sitemap() {
  const paths = ["", "/about", "/products", "/catalogs", "/contact"];

  // Las páginas 2..N del listado completo: ayudan al rastreo aunque cada ficha
  // ya esté listada por separado más abajo.
  for (const entry of allProductPageParams()) {
    paths.push(`/products/page/${entry.page}`);
  }
  for (const category of getCategories()) {
    paths.push(`/products/${category.slug}`);
  }
  for (const entry of allSubcategoryParams()) {
    paths.push(`/products/${entry.category}/${entry.subcategory}`);
  }
  for (const entry of allProductParams()) {
    paths.push(`/products/${entry.category}/${entry.subcategory}/${entry.product}`);
  }

  const lastModified = new Date();

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : path.split("/").length > 3 ? 0.6 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [code, `${SITE_URL}/${code}${path}`])
        ),
      },
    }))
  );
}
