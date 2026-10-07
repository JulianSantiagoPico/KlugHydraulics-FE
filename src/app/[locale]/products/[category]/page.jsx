import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/products/Breadcrumbs";
import ProductCard from "@/components/products/ProductCard";
import ProductsShell from "@/components/products/ProductsShell";
import PageHeader from "@/components/ui/PageHeader";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { alternates } from "@/lib/metadata";
import { getCategories, getCategory, getProducts } from "@/lib/products";
import { productsHref, subcategoryHref } from "@/lib/routes";

/** Cuántas fichas se muestran por subcategoría antes de enlazar al listado.
 *  Cinco llenan una fila completa en la rejilla más ancha; con más, una
 *  categoría como Válvulas (16 subcategorías) inflaba el HTML a 265 KB. */
const PREVIEW = 5;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getCategories().map((category) => ({ locale, category: category.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { locale, category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};

  const t = getDictionary(locale);
  const name = category.name[locale];

  return {
    title: name,
    description: `${name} — ${t.meta.siteName}. ${category.subcategories
      .map((sub) => sub.name[locale])
      .join(", ")}.`,
    alternates: alternates(locale, `/products/${categorySlug}`),
  };
}

export default async function CategoryPage({ params }) {
  const { locale, category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const t = getDictionary(locale);

  return (
    <>
      <PageHeader title={t.products.title} as="p" />

      <ProductsShell locale={locale}>
        <Breadcrumbs
          label={t.common.breadcrumb}
          items={[
            { label: t.products.title, href: productsHref(locale) },
            { label: category.name[locale] },
          ]}
        />

        <h1 className="text-2xl font-bold text-klug-navy border-b border-gray-200 pb-3 uppercase mb-8">
          {category.name[locale]}
        </h1>

        <div className="space-y-12">
          {category.subcategories.map((sub) => {
            const items = getProducts({ category: categorySlug, subcategory: sub.slug });
            if (items.length === 0) return null;

            return (
              <section key={sub.slug}>
                <h2 className="text-lg font-semibold text-klug-navy mb-4">
                  <Link
                    href={subcategoryHref(locale, categorySlug, sub.slug)}
                    className="hover:text-klug-blue transition-colors"
                  >
                    {sub.name[locale]}
                  </Link>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
                  {items.slice(0, PREVIEW).map((product) => (
                    <ProductCard key={product.slug} product={product} locale={locale} t={t} />
                  ))}
                </div>

                {items.length > PREVIEW && (
                  <Link
                    href={subcategoryHref(locale, categorySlug, sub.slug)}
                    className="inline-block mt-4 text-sm font-medium text-klug-blue hover:underline"
                  >
                    {t.products.seeCategory} →
                  </Link>
                )}
              </section>
            );
          })}
        </div>
      </ProductsShell>
    </>
  );
}
