import CatalogGrid from "@/components/catalogs/CatalogGrid";
import PageHeader from "@/components/ui/PageHeader";
import { getCatalogs } from "@/data/catalogs";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { alternates } from "@/lib/metadata";
import { getCategories } from "@/lib/products";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return {
    title: t.catalogs.title,
    description: t.meta.defaultDescription,
    alternates: alternates(locale, "/catalogs"),
  };
}

export default async function CatalogsPage({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);

  const catalogs = getCatalogs().map((catalog) => ({
    ...catalog,
    title: catalog.title[locale],
  }));

  const categories = getCategories().map((category) => ({
    slug: category.slug,
    label: category.name[locale],
  }));

  return (
    <>
      <PageHeader title={t.catalogs.title} />
      <div className="container mx-auto px-4 py-10">
        <CatalogGrid catalogs={catalogs} categories={categories} t={t} />
      </div>
    </>
  );
}
