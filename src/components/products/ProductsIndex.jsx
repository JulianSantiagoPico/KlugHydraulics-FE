import Breadcrumbs from "./Breadcrumbs";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import ProductsShell from "./ProductsShell";
import PageHeader from "@/components/ui/PageHeader";
import { getDictionary, interpolate } from "@/i18n/getDictionary";
import { getProductsPage } from "@/lib/products";
import { productsHref, productsPageHref } from "@/lib/routes";

/**
 * Listado completo del catálogo, plano y paginado.
 *
 * Lo comparten `/products` (página 1) y `/products/page/N`, para que ambas
 * rutas rendericen exactamente lo mismo salvo el tramo de productos.
 */
export default function ProductsIndex({ locale, page }) {
  const t = getDictionary(locale);
  const { items, total, totalPages, page: current } = getProductsPage(page);

  return (
    <>
      <PageHeader title={t.products.title} as="p" />

      <ProductsShell locale={locale}>
        {current > 1 && (
          <Breadcrumbs
            label={t.common.breadcrumb}
            items={[
              { label: t.products.title, href: productsHref(locale) },
              { label: interpolate(t.products.pageOf, { page: current, total: totalPages }) },
            ]}
          />
        )}

        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-200 pb-3 mb-8">
          <h1 className="text-2xl font-bold text-klug-navy uppercase">{t.products.allProducts}</h1>
          <p className="text-sm text-gray-500">
            {interpolate(t.products.allProductsCount, { count: total })}{" "}
            {totalPages > 1 && (
              <span className="ml-2 text-gray-400">
                · {interpolate(t.products.pageOf, { page: current, total: totalPages })}
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
          {items.map((product, position) => (
            <ProductCard
              key={`${product.category}/${product.subcategory}/${product.slug}`}
              product={product}
              locale={locale}
              t={t}
              priority={position < 5}
            />
          ))}
        </div>

        <Pagination
          current={current}
          total={totalPages}
          hrefFor={(n) => productsPageHref(locale, n)}
          t={t}
        />
      </ProductsShell>
    </>
  );
}
