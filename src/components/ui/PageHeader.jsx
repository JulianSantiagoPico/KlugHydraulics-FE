import Image from "next/image";

import headerBg from "@/assets/images/SitesBg.webp";

/**
 * Cabecera oscura con el título de sección, igual que en el Figma.
 *
 * `as` existe porque en los listados de producto la banda repite el rótulo
 * genérico ("Productos") mientras el título real de la página está más abajo
 * ("Todos los productos", el nombre de la categoría...). En esos casos se pasa
 * `as="p"` para no acabar con dos `h1` compitiendo en la misma página.
 */
export default function PageHeader({ title, subtitle, showUnderline = true, as: Heading = "h1" }) {
  return (
    <div className="relative h-56 md:h-72 lg:h-96 w-full overflow-hidden">
      <Image
        src={headerBg}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="relative h-full flex flex-col items-center justify-center px-4">
        <Heading className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white">
          {title}
        </Heading>
        {showUnderline && <div className="mt-6 w-44 h-1 bg-white rounded-full" />}
        {subtitle && (
          <p className="mt-4 max-w-2xl text-center text-white/80 text-base md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
