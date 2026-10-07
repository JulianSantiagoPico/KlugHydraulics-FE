import Image from "next/image";

function IndustryCard({ icon, title, color, duplicate }) {
  return (
    <li
      // Las copias del bucle son decorativas: se ocultan a los lectores para
      // que no lean cinco industrias tres veces.
      aria-hidden={duplicate ? "true" : undefined}
      className="shrink-0 mx-2 w-60 h-60 p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)` }}
    >
      <Image src={icon} alt="" aria-hidden="true" className="w-16 h-16 mb-3" />
      <h3 className="text-lg font-medium text-gray-800 text-center">{title}</h3>
    </li>
  );
}

/**
 * Cinta de industrias en movimiento continuo.
 *
 * El contenido se repite tres veces y la animación desplaza exactamente un
 * tercio, así que el bucle no tiene costura. La separación va en `mx-2` y no en
 * `gap` justamente para que ese tercio sea exacto (ver `globals.css`).
 */
export default function IndustryCarousel({ industries }) {
  const track = [
    ...industries.map((industry) => ({ ...industry, key: industry.title })),
    ...[...industries, ...industries].map((industry, index) => ({
      ...industry,
      key: `copy-${index}`,
      duplicate: true,
    })),
  ];

  return (
    <div className="marquee overflow-hidden py-8">
      <ul className="flex w-max animate-scroll-infinite list-none">
        {track.map(({ key, ...industry }) => (
          <IndustryCard key={key} {...industry} />
        ))}
      </ul>
    </div>
  );
}
