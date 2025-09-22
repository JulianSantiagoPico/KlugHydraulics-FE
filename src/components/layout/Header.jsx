import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logos/Logo-Klüg-Hydraulics.webp";
import Dropdown, { MobileMenuButton } from "./Dropdown";
import { useDropdown } from "../../hooks/useMobile";

import { QUICK_ACCESS_ITEMS, NAVIGATION_ITEMS } from "../NavItems";

// Subcomponente: Logo
const Logo = () => (
  <div className="flex items-center justify-center xl:justify-start">
    <Link to="/" aria-label="Ir a página de inicio">
      <img
        src={logo}
        alt="Logo de Klüg-Hydraulics"
        className="h-[32px] w-[64px] sm:h-[40px] sm:w-[80px] md:h-[45px] md:w-[90px] lg:h-[50px] lg:w-[100px] xl:h-[55px] xl:w-[111px] hover:opacity-80 transition-opacity duration-200 cursor-pointer"
        loading="eager"
        onError={(e) => {
          e.target.style.display = "none";
          console.error("Error loading logo");
        }}
      />
    </Link>
  </div>
);

// Subcomponente: Barra de búsqueda
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
      //logica pa después
    }
  };

  return (
    <div className="hidden sm:flex flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-16 2xl:mx-40">
      <form onSubmit={handleSubmit} role="search" className="relative w-full">
        <label htmlFor="search-input" className="sr-only">
          Search products
        </label>
        <input
          id="search-input"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full px-3 py-1.5 sm:px-4 sm:py-2 pl-8 sm:pl-10 pr-3 sm:pr-4 text-sm sm:text-base text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          autoComplete="off"
          aria-describedby="search-help"
        />
        <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <span id="search-help" className="sr-only">
          Press Enter to search
        </span>
      </form>
    </div>
  );
};

// Subcomponente: Elemento de acceso rápido
const QuickAccessItem = ({ item }) => (
  <Link
    to={item.href}
    className="flex flex-col items-center text-gray-600 hover:text-brand-primary cursor-pointer group transition-colors duration-200"
    aria-label={item.alt}
  >
    <div className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] md:w-[30px] md:h-[30px] xl:w-[31px] xl:h-[31px] flex items-center justify-center">
      <img
        src={item.src}
        alt={item.alt}
        className="object-contain object-center max-h-full max-w-full"
        loading="lazy"
        onError={(e) => {
          e.target.style.display = "none";
          console.error(`Error loading ${item.label} icon`);
        }}
      />
    </div>
    <span className="text-xs sm:text-sm mt-1">{item.label}</span>
  </Link>
);

// Subcomponente: Accesos rápidos
const QuickAccess = () => (
  <div className="hidden xl:flex items-center space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6 xl:space-x-8">
    {QUICK_ACCESS_ITEMS.map((item) => (
      <QuickAccessItem key={item.id} item={item} />
    ))}
  </div>
);

// Subcomponente: Navegación principal
const MainNavigation = () => {
  const location = useLocation();

  return (
    <nav
      className="hidden xl:block bg-white border-b border-gray-200"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <div className="flex space-x-8 xl:space-x-12">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className="font-semibold py-3 xl:py-4 text-sm xl:text-base text-brand-dark hover:text-brand-primary transition-colors duration-200 border-b-2 border-transparent hover:border-brand-primary whitespace-nowrap"
                aria-current={
                  location.pathname === item.href ? "page" : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Componente principal
const Header = () => {
  const { isOpen, isAnimating, close, toggle } = useDropdown();

  return (
    <>
      <header className="bg-white shadow-sm" role="banner">
        {/* Top section with logo, search, and icons */}
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Logo />
            <SearchBar />

            {/* Desktop XL: Quick Access, Mobile/Tablet: Menu Button */}
            <div className="flex items-center">
              <QuickAccess />
              <MobileMenuButton isOpen={isOpen} onClick={toggle} />
            </div>
          </div>
        </div>

        <MainNavigation />

        {/* Blue divider line */}
        <div className="h-1 bg-[#30A7FF]" role="presentation"></div>
      </header>

      {/* Mobile/Tablet Dropdown Menu */}
      <Dropdown
        isOpen={isOpen}
        isAnimating={isAnimating}
        onClose={close}
        navigationItems={NAVIGATION_ITEMS}
        quickAccessItems={QUICK_ACCESS_ITEMS}
      />
    </>
  );
};

export default Header;
