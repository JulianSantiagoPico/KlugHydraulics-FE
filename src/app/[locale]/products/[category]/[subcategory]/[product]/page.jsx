import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/products/Breadcrumbs";
import ProductGallery from "@/components/products/ProductGallery";
import ProductsShell from "@/components/products/ProductsShell";
import SaveProductButton from "@/components/products/SaveProductButton";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { alternates } from "@/lib/metadata";
import { allProductParams, getCategory, getProduct, getSubcategory } from "@/lib/products";
import { categoryHref, modelHref, productsHref, subcategoryHref } from "@/lib/routes";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://klughydraulics.com";

export function generateStaticParams() {
  return locales.flatMap((locale) => allProductParams().map((entry) => ({ locale, ...entry })));
}

export async function generateMetadata({ params }) {
  const { locale, category, subcategory, product: slug } = await params;
  const product = getProduct(category, subcategory, slug);
  if (!product) return {};

  const name = product.name[locale];
  const description =
    product.description[locale] ||
    (product.references.length
      ? `${name}. ${product.references.slice(0, 6).join(" · ")}`
      : name);

  return {
    title: name,
    description,
    alternates: alternates(locale, `/products/${category}/${subcategory}/${slug}`),
    openGraph: {
      title: name,
      description,
      images: product.images[0] ? [product.images[0].src] : [],
    },
  };
}

/** Tabla de especificaciones: propiedad, unidad y una o varias columnas. */
function SpecTable({ group, locale }) {
  const columns = Math.max(...group.rows.map((row) => row.values.length), 1);

  return (
    <div className="mb-8">
      <h3 className="bg-gray-100 px-4 py-2 text-sm font-semibold text-klug-navy">
        {group.title[locale]}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <caption className="sr-only">{group.title[locale]}</caption>
          <tbody>
            {group.rows.map((row) => (
              <tr key={row.label[locale]} className="border-b border-gray-200">
                <th scope="row" className="text-left font-normal text-gray-700 py-2 pr-4 align-top">
                  {row.label[locale]}
                </th>
                <td className="py-2 px-3 text-gray-500 whitespace-nowrap w-16">{row.unit ?? ""}</td>
                {Array.from({ length: columns }, (_, index) => (
                  <td key={index} className="py-2 px-3 text-gray-900 whitespace-nowrap">
                    {row.values[index] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function ProductPage({ params }) {
  const { locale, category: categorySlug, subcategory: subSlug, product: slug } = await params;

  const product = getProduct(categorySlug, subSlug, slug);
  const category = getCategory(categorySlug);
  const sub = getSubcategory(categorySlug, subSlug);
  if (!product || !category || !sub) notFound();

  const t = getDictionary(locale);
  const name = product.name[locale];
  const href = modelHref(locale, categorySlug, subSlug, slug);

  // Datos estructurados: es lo que hace que la ficha salga como producto en
  // Google, que es el motivo de haber migrado a Next.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    sku: product.code ?? undefined,
    brand: { "@type": "Brand", name: "Klüg Hydraulics" },
    category: `${category.name[locale]} > ${sub.name[locale]}`,
    description: product.description[locale] || name,
    image: product.images.map((image) => `${SITE_URL}${image.src}`),
    url: `${SITE_URL}${href}`,
  };

  return (
    <ProductsShell locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        label={t.common.breadcrumb}
        items={[
          { label: t.products.title, href: productsHref(locale) },
          { label: category.name[locale], href: categoryHref(locale, categorySlug) },
          { label: sub.name[locale], href: subcategoryHref(locale, categorySlug, subSlug) },
          { label: product.code ?? name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductGallery
          images={product.images}
          alt={name}
          labels={{
            previous: t.product.previousImage,
            next: t.product.nextImage,
            gallery: t.product.gallery,
          }}
        />

        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-klug-navy mb-6">{name}</h1>

          {product.description[locale] && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t.product.description}
              </h3>
              <p className="text-gray-700 leading-relaxed">{product.description[locale]}</p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {t.product.details}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-klug-blue shrink-0" aria-hidden="true" />
                {t.product.heavyDuty}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-klug-blue shrink-0" aria-hidden="true" />
                {t.product.original}
              </li>
            </ul>
          </div>

          {product.catalog && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t.product.catalog}
              </h3>
              <a
                href={product.catalog}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-klug-blue text-white text-sm font-medium hover:bg-klug-blue/90 transition-colors"
              >
                {t.product.viewCatalog}
              </a>
            </div>
          )}

          <SaveProductButton
            variant="button"
            product={{
              id: `${categorySlug}/${subSlug}/${slug}`,
              slug,
              name,
              code: product.code,
              image: product.images[0]?.src ?? null,
              href,
            }}
            labels={{ save: t.product.saveProduct, saved: t.product.savedProduct }}
          />
        </div>
      </div>

      {product.references.length > 0 && (
        <section className="mt-14">
          <h2 className="text-sm font-bold text-klug-navy uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
            {t.product.models}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {product.references.map((reference) => (
              <li key={reference} className="py-2 border-b border-gray-100 text-sm font-mono text-gray-800">
                {reference}
              </li>
            ))}
          </ul>
        </section>
      )}

      {product.specs.length > 0 && (
        <section className="mt-14">
          <h2 className="text-sm font-bold text-klug-navy uppercase tracking-wide border-b border-gray-300 pb-2 mb-6">
            {t.product.specifications}
          </h2>
          {product.specs.map((group) => (
            <SpecTable key={group.title[locale]} group={group} locale={locale} />
          ))}
        </section>
      )}

      {product.figures.length > 0 && (
        <section className="mt-6 space-y-10">
          {product.figures.map((figure) => (
            <figure key={figure.src}>
              <figcaption className="bg-gray-100 px-4 py-2 text-sm font-semibold text-klug-navy mb-4">
                {figure.caption[locale]}
              </figcaption>
              <Image
                src={figure.src}
                alt={figure.caption[locale]}
                width={figure.width}
                height={figure.height}
                sizes="(max-width: 1024px) 100vw, 900px"
                className="w-full h-auto"
              />
            </figure>
          ))}
        </section>
      )}

      <Link
        href={subcategoryHref(locale, categorySlug, subSlug)}
        className="inline-block mt-14 text-sm font-medium text-klug-blue hover:underline"
      >
        ← {sub.name[locale]}
      </Link>
    </ProductsShell>
  );
}
