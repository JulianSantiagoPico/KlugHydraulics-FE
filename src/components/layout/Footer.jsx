import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logos/Logo-Klüg-Hydraulics.webp";
import { mainNavigation, quickAccess } from "@/data/navigation";
import { homeHref } from "@/lib/routes";

const SISTER_BRANDS = [
  { label: "KLÜG ELECTRIC", url: "https://klugelectric.com/" },
  { label: "KLÜG PNEUMATICS", url: "https://klugpneumatics.com/" },
];

export default function Footer({ locale, t }) {
  return (
    <footer className="bg-white mt-auto py-12 border-t border-gray-100">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-28">
          <Link href={homeHref(locale)} aria-label={t.nav.home}>
            <Image
              src={logo}
              alt="Klüg Hydraulics"
              className="h-[40px] w-auto sm:h-[45px] lg:h-[55px] hover:opacity-80 transition-opacity duration-200"
            />
          </Link>

          <div className="flex flex-col items-center gap-4 sm:gap-6 lg:flex-row lg:gap-4">
            <p className="text-lg sm:text-xl font-bold text-center lg:text-left">
              {t.footer.otherLines}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              {SISTER_BRANDS.map((brand) => (
                <a
                  key={brand.url}
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-klug-blue px-6 py-3 text-base sm:text-lg lg:text-xl font-medium text-white hover:bg-klug-blue/90 transition-colors"
                >
                  {brand.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 sm:gap-6 lg:flex-row lg:justify-center lg:gap-10 px-4 mt-8">
        <p className="text-gray-600 text-sm sm:text-base text-center">
          © {new Date().getFullYear()} {t.footer.rights}
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6" aria-label="Footer">
          {quickAccess(locale, t).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm sm:text-base text-gray-600 hover:text-klug-blue transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {mainNavigation(locale).map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="text-sm sm:text-base text-gray-600 underline hover:text-klug-blue transition-colors"
            >
              {category.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
