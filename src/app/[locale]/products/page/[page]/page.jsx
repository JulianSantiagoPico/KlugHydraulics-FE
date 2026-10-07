import { notFound } from "next/navigation";

import ProductsIndex from "@/components/products/ProductsIndex";
import { locales } from "@/i18n/config";
import { getDictionary, interpolate } from "@/i18n/getDictionary";
import { alternates } from "@/lib/metadata";
import { allProductPageParams, getProductsPage } from "@/lib/products";

export function generateStaticParams() {
  return locales.flatMap((locale) => allProductPageParams().map((entry) => ({ locale, ...entry })));
}

export async function generateMetadata({ params }) {
  const { locale, page } = await params;
  const t = getDictionary(locale);
  const { totalPages } = getProductsPage(1);
  const current = Number(page);

  return {
    title: `${t.products.title} — ${interpolate(t.products.pageOf, { page: current, total: totalPages })}`,
    description: t.meta.defaultDescription,
    alternates: alternates(locale, `/products/page/${current}`),
  };
}

export default async function ProductsPaginatedPage({ params }) {
  const { locale, page } = await params;
  const current = Number(page);
  const { totalPages } = getProductsPage(1);

  // La página 1 vive en /products; aquí solo existen de la 2 en adelante.
  if (!Number.isInteger(current) || current < 2 || current > totalPages) notFound();

  return <ProductsIndex locale={locale} page={current} />;
}
