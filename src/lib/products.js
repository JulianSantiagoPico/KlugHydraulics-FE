import products from "@/data/products.json";
import taxonomy from "@/data/taxonomy.json";

/**
 * Productos por página del listado completo.
 *
 * Medido sobre el build: el armazón de la página (cabecera, barra lateral de 42
 * subcategorías y pie) ocupa 59 KB de HTML y cada tarjeta suma ~3,5 KB. Con las
 * 131 fichas en una sola página el HTML se iba a ~505 KB; con 24 se queda en
 * ~143 KB y no crece aunque el catálogo lo haga.
 */
export const PRODUCTS_PER_PAGE = 24;

/** Un tramo del catálogo completo, ordenado por categoría y subcategoría. */
export function getProductsPage(page = 1) {
  const all = products;
  const totalPages = Math.max(1, Math.ceil(all.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PRODUCTS_PER_PAGE;

  return {
    items: all.slice(start, start + PRODUCTS_PER_PAGE),
    page: safePage,
    total: all.length,
    totalPages,
  };
}

/** Parámetros de las páginas 2..N, para `generateStaticParams`. */
export function allProductPageParams() {
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export function getCategories() {
  return taxonomy;
}

export function getCategory(slug) {
  return taxonomy.find((category) => category.slug === slug) ?? null;
}

export function getSubcategory(categorySlug, subcategorySlug) {
  const category = getCategory(categorySlug);
  if (!category) return null;
  return category.subcategories.find((sub) => sub.slug === subcategorySlug) ?? null;
}

export function getProducts({ category, subcategory } = {}) {
  return products.filter(
    (product) =>
      (!category || product.category === category) &&
      (!subcategory || product.subcategory === subcategory)
  );
}

export function getProduct(category, subcategory, slug) {
  return (
    products.find(
      (product) =>
        product.category === category &&
        product.subcategory === subcategory &&
        product.slug === slug
    ) ?? null
  );
}

/** Cuántas fichas hay por subcategoría, para no pintar ramas vacías. */
export function countsBySubcategory() {
  return products.reduce((acc, product) => {
    const key = `${product.category}/${product.subcategory}`;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}

/**
 * El árbol de navegación de la barra lateral, ya resuelto al idioma y con las
 * subcategorías vacías marcadas para poder atenuarlas.
 */
export function navigationTree(locale) {
  const counts = countsBySubcategory();

  return taxonomy.map((category) => ({
    slug: category.slug,
    label: category.name[locale],
    href: `/${locale}/products/${category.slug}`,
    subcategories: category.subcategories.map((sub) => ({
      slug: sub.slug,
      label: sub.name[locale],
      href: `/${locale}/products/${category.slug}/${sub.slug}`,
      count: counts[`${category.slug}/${sub.slug}`] ?? 0,
    })),
  }));
}

/** Parámetros de todas las fichas, para `generateStaticParams`. */
export function allProductParams() {
  return products.map((product) => ({
    category: product.category,
    subcategory: product.subcategory,
    product: product.slug,
  }));
}

export function allSubcategoryParams() {
  return taxonomy.flatMap((category) =>
    category.subcategories.map((sub) => ({
      category: category.slug,
      subcategory: sub.slug,
    }))
  );
}

/** Búsqueda simple por nombre, código y referencias. */
export function searchProducts(query, locale) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const compact = needle.replace(/[^a-z0-9]/g, "");

  return products.filter((product) => {
    if (product.name[locale].toLowerCase().includes(needle)) return true;
    if (product.code?.toLowerCase().replace(/[^a-z0-9]/g, "").includes(compact)) return true;
    return product.references.some((reference) =>
      reference.toLowerCase().replace(/[^a-z0-9]/g, "").includes(compact)
    );
  });
}
