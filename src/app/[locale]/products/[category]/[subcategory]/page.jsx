import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/products/Breadcrumbs";
import ProductCard from "@/components/products/ProductCard";
import ProductsShell from "@/components/products/ProductsShell";
import PageHeader from "@/components/ui/PageHeader";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { alternates } from "@/lib/metadata";
import { allSubcategoryParams, getCategory, getProducts, getSubcategory } from "@/lib/products";
import { categoryHref, productsHref } from "@/lib/routes";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    allSubcategoryParams().map((entry) => ({ locale, ...entry }))
  );
}

export async function generateMetadata({ params }) {
  const { locale, category: categorySlug, subcategory: subSlug } = await params;
  const category = getCategory(categorySlug);
  const sub = getSubcategory(categorySlug, subSlug);
  if (!category || !sub) return {};

  // Los códigos de modelo en la descripción son lo que hace que la página
  // aparezca al buscar una referencia concreta.
  const codes = getProducts({ category: categorySlug, subcategory: subSlug })
    .map((product) => product.code)
    .filter(Boolean)
    .slice(0, 8)
    .join(", ");

  return {
    title: `${sub.name[locale]} — ${category.name[locale]}`,
    description: codes
      ? `${sub.name[locale]}: ${codes}.`
      : `${sub.name[locale]} — ${category.name[locale]}.`,
    alternates: alternates(locale, `/products/${categorySlug}/${subSlug}`),
  };
}

export default async function SubcategoryPage({ params }) {
  const { locale, category: categorySlug, subcategory: subSlug } = await params;
  const category = getCategory(categorySlug);
  const sub = getSubcategory(categorySlug, subSlug);
  if (!category || !sub) notFound();

  const t = getDictionary(locale);
  const items = getProducts({ category: categorySlug, subcategory: subSlug });

  return (
    <>
      <PageHeader title={t.products.title} as="p" />

      <ProductsShell locale={locale}>
        <Breadcrumbs
          label={t.common.breadcrumb}
          items={[
            { label: t.products.title, href: productsHref(locale) },
            { label: category.name[locale], href: categoryHref(locale, categorySlug) },
            { label: sub.name[locale] },
          ]}
        />

        <p className="text-2xl font-bold text-klug-navy border-b border-gray-200 pb-3 uppercase">
          {category.name[locale]}
        </p>
        <h1 className="text-lg font-semibold text-klug-navy mt-6 mb-6">{sub.name[locale]}</h1>

        {items.length === 0 ? (
          <p className="text-gray-500">{t.products.empty}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
            {items.map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} t={t} />
            ))}
          </div>
        )}
      </ProductsShell>
    </>
  );
}
