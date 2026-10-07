import Image from "next/image";

import agribusinessIcon from "@/assets/icons/agribusiness-icon.svg";
import constructionIcon from "@/assets/icons/construction-icon.svg";
import durabilityIcon from "@/assets/icons/durability-icon.svg";
import liftingIcon from "@/assets/icons/lifting-equipment-icon.svg";
import manufacturingIcon from "@/assets/icons/manufacturing-icon.svg";
import miningIcon from "@/assets/icons/mining-icon.svg";
import optimizationIcon from "@/assets/icons/optimization-icon.svg";
import performanceIcon from "@/assets/icons/performance-icon.svg";
import gearPumpsImg from "@/assets/images/CarouselImages/GearPumps.webp";
import monoblockValvesImg from "@/assets/images/CarouselImages/MonoblockValves.webp";
import solenoidDirectionalImg from "@/assets/images/CarouselImages/SolenoidDirectional.webp";

import FeaturedProducts from "@/components/products/FeaturedProducts";
import DistributorsMap from "@/components/ui/DistributorsMap";
import HeroCarousel from "@/components/ui/HeroCarousel";
import IndustryCarousel from "@/components/ui/IndustryCarousel";
import { getDistributors } from "@/data/distributors";
import { getFeatured } from "@/data/featured";
import { getDictionary } from "@/i18n/getDictionary";

const SERVICE_ICONS = {
  durability: durabilityIcon,
  performance: performanceIcon,
  optimization: optimizationIcon,
};

const INDUSTRY_STYLE = {
  lifting: { icon: liftingIcon, color: "#B9E1FF" },
  mining: { icon: miningIcon, color: "#6EC2FF" },
  manufacturing: { icon: manufacturingIcon, color: "#30A7FF" },
  construction: { icon: constructionIcon, color: "#B9E1FF" },
  agribusiness: { icon: agribusinessIcon, color: "#6EC2FF" },
};

function ServiceCard({ icon, title, body }) {
  return (
    <article className="relative bg-white rounded-3xl shadow-sm pt-8 p-8 lg:p-12">
      <div className="absolute -top-6 left-6 bg-klug-blue p-3 rounded-xl">
        <Image src={icon} alt="" aria-hidden="true" className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{body}</p>
    </article>
  );
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);

  const slides = [
    { src: monoblockValvesImg, alt: t.home.slideMonoblock },
    { src: solenoidDirectionalImg, alt: t.home.slideSolenoid },
    { src: gearPumpsImg, alt: t.home.slideGearPumps },
  ];

  const industries = Object.entries(INDUSTRY_STYLE).map(([key, style]) => ({
    ...style,
    title: t.industries[key],
  }));

  return (
    <>
      <HeroCarousel slides={slides} interval={5000} />

      <FeaturedProducts
        products={getFeatured(locale, t)}
        title={t.home.featuredTitle}
        labels={{ prev: t.home.featuredPrev, next: t.home.featuredNext }}
        t={t}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gray-100 rounded-3xl p-8 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* Las dos etiquetas rotadas del Figma. */}
              <div className="flex items-center justify-center min-h-24">
                <div className="relative w-72 h-32 flex items-center justify-center">
                  <span className="absolute z-0 bg-klug-blue text-white px-12 py-4 rounded-xl text-2xl lg:text-5xl font-medium rotate-[4deg] shadow-lg lg:translate-y-16">
                    {t.home.servicesKicker}
                  </span>
                  <span className="absolute z-10 bg-white text-black px-12 py-4 rounded-xl text-2xl lg:text-5xl font-medium -rotate-[5deg] shadow-lg translate-y-14 lg:translate-x-12 lg:translate-y-34">
                    {t.home.servicesKickerAccent}
                  </span>
                </div>
              </div>

              <div className="text-left p-4 lg:p-12">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  {t.home.servicesTitle}
                </h2>
                <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                  {t.home.servicesBody}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
              {Object.entries(SERVICE_ICONS).map(([key, icon]) => (
                <ServiceCard
                  key={key}
                  icon={icon}
                  title={t.services[key].title}
                  body={t.services[key].body}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
            <div>
              <p className="text-sm text-gray-900 uppercase tracking-wide mb-2">
                {t.home.industriesKicker}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight whitespace-pre-line">
                {t.home.industriesTitle}
              </h2>
            </div>
            <p className="text-gray-900 text-lg leading-relaxed">
              {t.home.industriesBody}
            </p>
          </div>
        </div>

        <IndustryCarousel industries={industries} />
      </section>

      <DistributorsMap
        distributors={getDistributors(locale)}
        title={t.distributors.title}
        contactLabel={t.distributors.contact}
      />
    </>
  );
}
