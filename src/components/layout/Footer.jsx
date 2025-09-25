import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { QUICK_ACCESS_ITEMS_TEXT, NAVIGATION_ITEMS } from "../../data/NavItems";

import logo from "../../assets/logos/Logo-Klüg-Hydraulics.webp";

const Logo = () => (
  <div className="flex items-center justify-center lg:justify-start">
    <Link to="/" aria-label="Ir a página de inicio">
      <img
        src={logo}
        alt="Logo de Klüg-Hydraulics"
        className="h-[40px] w-[80px] sm:h-[45px] sm:w-[90px] lg:h-[55px] lg:w-[111px] hover:opacity-80 transition-opacity duration-200 cursor-pointer"
        loading="eager"
        onError={(e) => {
          e.target.style.display = "none";
          console.error("Error loading logo");
        }}
      />
    </Link>
  </div>
);

const FooterNavigation = () => (
  <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 lg:flex-row lg:space-y-0 lg:space-x-10 px-4 mb-8 mt-4">
    <p className="text-gray-600 text-sm sm:text-base text-center">
      © {new Date().getFullYear()} Klüg Company. All rights reserved.
    </p>
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
      {QUICK_ACCESS_ITEMS_TEXT.map((item) => (
        <QuickAccessItem key={item.id} item={item} />
      ))}
      {NAVIGATION_ITEMS.map((item) => (
        <NavigationItem key={item.id} item={item} />
      ))}
    </div>
  </div>
);

const ExternalLinks = () => (
  <div className="container mx-auto px-4 py-4 sm:py-6">
    <div className="flex flex-col items-center space-y-6 lg:flex-row lg:justify-center lg:space-y-0 lg:space-x-28">
      <Logo />
      <div className="flex flex-col items-center space-y-4 sm:space-y-6 lg:flex-row lg:space-y-0 lg:items-center lg:gap-4">
        <p className="text-lg sm:text-xl font-bold text-center lg:text-left">
          Visit our others line products:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <a
            href="https://klugelectric.com/"
            target="_blank"
            className="w-full sm:w-auto"
          >
            <Button className="bg-[#30A7FF] text-base sm:text-lg lg:text-xl p-4 sm:p-5 lg:p-6 hover:bg-[#30A7FF]/90 hover:cursor-pointer w-full sm:w-auto">
              KLÜG ELECTRIC
            </Button>
          </a>
          <a
            href="https://klugpneumatics.com/"
            target="_blank"
            className="w-full sm:w-auto"
          >
            <Button className="bg-[#30A7FF] text-base sm:text-lg lg:text-xl p-4 sm:p-5 lg:p-6 hover:bg-[#30A7FF]/90 hover:cursor-pointer w-full sm:w-auto">
              KLÜG PNEUMATICS
            </Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

const QuickAccessItem = ({ item }) => (
  <Link
    to={item.href}
    className="flex flex-col items-center text-gray-600 hover:text-brand-primary cursor-pointer group transition-colors duration-200"
    aria-label={item.alt}
  >
    <div className="flex items-center justify-center px-2">
      <p className="text-sm sm:text-base text-center">{item.label}</p>
    </div>
  </Link>
);

const NavigationItem = ({ item }) => (
  <Link
    to={item.href}
    className="flex flex-col items-center text-gray-600 hover:text-brand-primary cursor-pointer group transition-colors duration-200 underline"
    aria-label={item.alt}
  >
    <div className="flex items-center justify-center px-2">
      <p className="text-sm sm:text-base text-center">{item.label}</p>
    </div>
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-white mt-auto py-12">
      <ExternalLinks />
      <FooterNavigation />
    </footer>
  );
};

export default Footer;
