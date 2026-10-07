import ProductsIndex from "@/components/products/ProductsIndex";
import { getDictionary, interpolate } from "@/i18n/getDictionary";
import { alternates } from "@/lib/metadata";
import { getProductsPage } from "@/lib/products";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const { total } = getProductsPage(1);

  return {
    title: t.products.title,
    description: `${interpolate(t.products.allProductsCount, { count: total })}. ${t.meta.defaultDescription}`,
    alternates: alternates(locale, "/products"),
  };
}

export default async function ProductsPage({ params }) {
  const { locale } = await params;
  return <ProductsIndex locale={locale} page={1} />;
}
