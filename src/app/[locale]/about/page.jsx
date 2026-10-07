import Image from "next/image";
import Link from "next/link";

import innovationIcon from "@/assets/icons/innovation-agility.svg";
import personalizedIcon from "@/assets/icons/personalized-approach.svg";
import precisionIcon from "@/assets/icons/precision-engineering.svg";
import qualityIcon from "@/assets/icons/quality-price.svg";
import sustainabilityIcon from "@/assets/icons/sustainability.svg";
import aftermarketImg from "@/assets/images/opportunities/aftermarket.webp";
import energyImg from "@/assets/images/opportunities/energy-efficient.webp";
import globalImg from "@/assets/images/opportunities/global-expansion.webp";
import oemImg from "@/assets/images/opportunities/oem-partnerships.webp";
import smartImg from "@/assets/images/opportunities/smart-hydraulics.webp";
import team1 from "@/assets/images/about/team-1.webp";
import team2 from "@/assets/images/about/team-2.webp";

import OpportunitiesCarousel from "@/components/ui/OpportunitiesCarousel";
import PageHeader from "@/components/ui/PageHeader";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { alternates } from "@/lib/metadata";
import { contactHref } from "@/lib/routes";

const WHY_ICONS = {
  precision: precisionIcon,
  innovation: innovationIcon,
  personalized: personalizedIcon,
  sustainability: sustainabilityIcon,
  quality: qualityIcon,
};

const OPPORTUNITY_IMAGES = {
  aftermarket: aftermarketImg,
  smart: smartImg,
  energy: energyImg,
  global: globalImg,
  oem: oemImg,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return {
    title: t.about.title,
    description: t.about.whoBody.slice(0, 160),
    alternates: alternates(locale, "/about"),
  };
}

/**
 * Tarjeta de "por qué elegir Klüg".
 *
 * El Figma define dos estados: plano en reposo y degradado hacia el azul claro
 * de marca al pasar el ratón. El degradado va sobre el gris de fondo, así que
 * en reposo (ambos extremos transparentes) se ve el gris y en hover lo tapa.
 */
function WhyCard({ icon, title, body }) {
  return (
    <li
      className="group flex w-full sm:w-[22rem] items-start gap-4 rounded-2xl p-6 bg-gray-100
                 bg-gradient-to-b from-transparent to-transparent
                 hover:from-white hover:to-klug-blue-soft
                 hover:shadow-lg hover:-translate-y-1
                 transition-all duration-300 ease-out
                 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <Image
        src={icon}
        alt=""
        aria-hidden="true"
        className="w-16 h-16 shrink-0 transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100"
      />
      <div>
        <h3 className="font-bold text-klug-navy mb-1">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
      </div>
    </li>
  );
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);

  // El Figma reparte las cinco tarjetas en dos filas centradas, 2 arriba y 3
  // abajo, en lugar de dejarlas alineadas a la izquierda en una rejilla.
  const whyKeys = Object.keys(WHY_ICONS);
  const whyRows = [whyKeys.slice(0, 2), whyKeys.slice(2)];

  const opportunities = Object.entries(OPPORTUNITY_IMAGES).map(([key, image]) => ({
    image,
    title: t.opportunities.cards[key].title,
    body: t.opportunities.cards[key].body,
  }));

  return (
    <>
      <PageHeader title={t.about.title} />

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="block w-16 h-1 bg-klug-blue mb-4" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-klug-navy mb-6">{t.about.whoTitle}</h2>
            <p className="text-gray-700 leading-relaxed">{t.about.whoBody}</p>
          </div>
          <Image
            src={team1}
            alt={t.about.photoAlt}
            className="rounded-2xl w-full h-auto"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </div>
      </section>

      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #1565A8 0%, #0E2233 100%)" }}
      >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: t.about.mission, body: t.about.missionBody },
            { title: t.about.vision, body: t.about.visionBody },
          ].map((block) => (
            <article key={block.title} className="relative bg-white rounded-2xl p-8 pt-12 text-center">
              <h2 className="absolute -top-5 left-1/2 -translate-x-1/2 bg-klug-blue text-white px-8 py-2 rounded-xl text-xl font-bold">
                {block.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">{block.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <p className="text-xs text-center text-gray-500 uppercase tracking-wide mb-2">
          {t.about.whyKicker}
        </p>
        <h2 className="text-3xl font-bold text-klug-navy text-center mb-4">{t.about.whyTitle}</h2>
        <p className="max-w-2xl mx-auto text-center text-gray-600 mb-10">{t.about.whyBody}</p>

        <div className="space-y-6">
          {whyRows.map((row) => (
            <ul key={row.join()} className="flex flex-wrap justify-center gap-6 list-none">
              {row.map((key) => (
                <WhyCard
                  key={key}
                  icon={WHY_ICONS[key]}
                  title={t.about.why[key].title}
                  body={t.about.why[key].body}
                />
              ))}
            </ul>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={contactHref(locale)}
            className="inline-flex items-center justify-center px-10 py-3 rounded-full bg-klug-blue text-white font-medium hover:bg-klug-blue/90 transition-colors"
          >
            {t.about.cta}
          </Link>
        </div>
      </section>

      <section
        className="py-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0E2233 0%, #1565A8 100%)" }}
      >
        <div className="container mx-auto px-4 text-center mb-10">
          <p className="text-xs text-white/70 uppercase tracking-wide mb-2">
            {t.opportunities.kicker}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t.opportunities.title}
          </h2>
          <p className="max-w-3xl mx-auto text-white/80 leading-relaxed">{t.opportunities.body}</p>
        </div>

        <OpportunitiesCarousel opportunities={opportunities} />
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Image
            src={team2}
            alt={t.about.photoAlt}
            className="rounded-2xl w-full h-auto order-2 lg:order-1"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
          <div className="order-1 lg:order-2">
            <span className="block w-16 h-1 bg-klug-blue mb-4" aria-hidden="true" />
            <h2 className="text-3xl lg:text-4xl font-bold text-klug-navy mb-6">
              {t.about.joinTitle}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8">{t.about.joinBody}</p>
            <Link
              href={contactHref(locale)}
              className="inline-flex items-center justify-center px-10 py-3 rounded-full bg-klug-blue text-white font-medium hover:bg-klug-blue/90 transition-colors"
            >
              {t.about.cta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
