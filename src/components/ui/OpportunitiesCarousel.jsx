import Image from "next/image";

function OpportunityCard({ image, title, body, duplicate }) {
  return (
    <li
      aria-hidden={duplicate ? "true" : undefined}
      className="shrink-0 mx-2 w-[22rem] bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4"
    >
      <Image
        src={image}
        alt=""
        aria-hidden="true"
        sizes="80px"
        className="w-20 h-20 shrink-0 object-contain"
      />
      <div>
        <h3 className="text-lg font-bold text-klug-navy leading-tight mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
      </div>
    </li>
  );
}

/**
 * Cinta de oportunidades de mercado sobre banda oscura.
 *
 * Mismo mecanismo que `IndustryCarousel`: el contenido se repite tres veces y
 * la animación desplaza un tercio exacto, de modo que el bucle es continuo.
 * La cinta se detiene al pasar el ratón o al enfocar con el teclado, porque
 * aquí sí hay texto que leer.
 */
export default function OpportunitiesCarousel({ opportunities }) {
  const track = [
    ...opportunities.map((item) => ({ ...item, key: item.title })),
    ...[...opportunities, ...opportunities].map((item, index) => ({
      ...item,
      key: `copy-${index}`,
      duplicate: true,
    })),
  ];

  return (
    <div
      className="marquee overflow-hidden py-4"
      style={{ "--marquee-duration": "45s", "--marquee-duration-sm": "28s" }}
    >
      <ul className="flex w-max animate-scroll-infinite list-none items-stretch">
        {track.map(({ key, ...item }) => (
          <OpportunityCard key={key} {...item} />
        ))}
      </ul>
    </div>
  );
}
