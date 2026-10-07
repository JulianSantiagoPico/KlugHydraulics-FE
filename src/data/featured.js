import { getProduct } from "@/lib/products";

/**
 * Productos destacados de la portada, tal como los elige el Figma.
 *
 * `labelKey` apunta al diccionario porque el nombre generado desde la carpeta
 * del USB es más torpe que el rótulo del diseño ("Válvulas de alivio" frente a
 * "Válvula de alivio"). Si mañana se quiere destacar otro producto, basta con
 * cambiar aquí la terna categoría/subcategoría/slug.
 */
const FEATURED = [
  { labelKey: "relief", category: "valves", subcategory: "relief-valves", slug: "valvula-de-alivio" },
  { labelKey: "vrse", category: "valves", subcategory: "vrse-valves", slug: "vrse-g12" },
  {
    labelKey: "monoblock",
    category: "valves",
    subcategory: "monoblock-directional-control-valves",
    slug: "mando-3-palancas",
  },
  { labelKey: "filter", category: "filters", subcategory: "rfa", slug: "filtros" },
];

/**
 * Los destacados resueltos contra el catálogo. Si un slug deja de existir
 * porque cambió el pipeline de imágenes, esa entrada se descarta en vez de
 * romper la portada.
 */
export function getFeatured(locale, t) {
  return FEATURED.map((entry) => {
    const product = getProduct(entry.category, entry.subcategory, entry.slug);
    if (!product || product.images.length === 0) return null;

    return {
      id: `${entry.category}/${entry.subcategory}/${entry.slug}`,
      label: t.home.featured[entry.labelKey],
      image: product.images[0],
      category: entry.category,
      subcategory: entry.subcategory,
      slug: entry.slug,
      href: `/${locale}/products/${entry.category}/${entry.subcategory}/${entry.slug}`,
    };
  }).filter(Boolean);
}
