import ProductsSidebar from "./ProductsSidebar";
import { getDictionary } from "@/i18n/getDictionary";
import { navigationTree } from "@/lib/products";

/**
 * Contenedor con barra lateral que comparten todas las páginas de producto.
 *
 * No es un layout de Next a propósito: la cabecera oscura va a sangre completa
 * y solo la llevan los listados, mientras que la ficha de producto empieza
 * directamente por las migas. Con un layout no se podía tener ambas cosas, así
 * que cada página compone su cabecera y envuelve el resto aquí.
 *
 * En móvil la barra pasa debajo: primero el producto, después el navegador.
 */
export default function ProductsShell({ locale, children }) {
  const t = getDictionary(locale);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="order-2 lg:order-1">
          <ProductsSidebar tree={navigationTree(locale)} t={t} />
        </div>
        <div className="order-1 lg:order-2 flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
