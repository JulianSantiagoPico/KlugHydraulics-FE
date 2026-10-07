import Image from "next/image";
import Link from "next/link";

import SaveProductButton from "./SaveProductButton";
import { modelHref } from "@/lib/routes";

/**
 * Card del listado: foto sobre blanco, código debajo y marcador para cotizar.
 *
 * El `sizes` va ajustado al ancho real que ocupa la tarjeta en la rejilla; si
 * se deja ancho de más, Next genera un `srcset` largo y cada tarjeta engorda el
 * HTML sin necesidad, que con 24 por página se nota.
 */
export default function ProductCard({ product, locale, t, priority = false }) {
  const href = modelHref(locale, product.category, product.subcategory, product.slug);
  const image = product.images[0];
  const title = product.code ?? product.name[locale];

  return (
    <article className="group">
      <Link
        href={href}
        className="block aspect-square relative bg-white border border-gray-200 rounded-md overflow-hidden hover:border-klug-blue transition-colors"
      >
        {image ? (
          <Image
            src={image.src}
            alt={product.name[locale]}
            fill
            // La primera fila entra como prioritaria: es el LCP del listado y
            // en `lazy` el navegador la pide tarde.
            priority={priority}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center p-2 text-center text-[11px] text-gray-400">
            {product.name[locale]}
          </span>
        )}
      </Link>

      <div className="flex items-center justify-between gap-1 mt-1.5">
        <Link
          href={href}
          title={title}
          className="text-xs font-medium text-klug-navy hover:text-klug-blue transition-colors truncate"
        >
          {title}
        </Link>
        <SaveProductButton
          product={{
            id: `${product.category}/${product.subcategory}/${product.slug}`,
            slug: product.slug,
            name: product.name[locale],
            code: product.code,
            image: image?.src ?? null,
            href,
          }}
          labels={{ save: t.product.saveProduct, saved: t.product.savedProduct }}
        />
      </div>
    </article>
  );
}
