import { useState } from 'react';
import logo from '../../assets/icons/Logo-Klüg-Hydraulics.webp';
import Dropdown, { MobileMenuButton } from './Dropdown';
import { useDropdown } from '../../hooks/useMobile';

import { QUICK_ACCESS_ITEMS, NAVIGATION_ITEMS } from '../NavItems';

// Subcomponente: Logo
const Logo = () => (
  <div className="flex items-center">
    <img 
      src={logo} 
      alt="Logo de Klüg-Hydraulics" 
      className="h-[55px] w-[111px]"
      loading="eager"
      onError={(e) => {
        e.target.style.display = 'none';
        console.error('Error loading logo');
      }}
    />
  </div>
);

// Subcomponente: Barra de búsqueda
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      
      console.log('Searching for:', searchTerm);
      //logica pa después
    }
  };

  return (
    <div className="flex-1 max-w-md ml-40">
      <form onSubmit={handleSubmit} role="search" className="relative">
        <label htmlFor="search-input" className="sr-only">
          Search products
        </label>
        <input
          id="search-input"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          autoComplete="off"
          aria-describedby="search-help"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
  <a 
    href={item.href}
    className="flex flex-col items-center text-gray-600 hover:text-brand-primary cursor-pointer group transition-colors duration-200"
    aria-label={item.alt}
  >
    <div className="w-[31px] h-[31px] flex items-center justify-center">
      <img 
        src={item.src} 
        alt={item.alt}
        className="object-contain object-center max-h-full max-w-full"
        loading="lazy"
        onError={(e) => {
          e.target.style.display = 'none';
          console.error(`Error loading ${item.label} icon`);
        }}
      />
    </div>
    <span className="text-sm">{item.label}</span>
  </a>
);

// Subcomponente: Accesos rápidos
const QuickAccess = () => (
  <div className="hidden md:flex items-center space-x-8">
    {QUICK_ACCESS_ITEMS.map((item) => (
      <QuickAccessItem key={item.id} item={item} />
    ))}
  </div>
);

// Subcomponente: Navegación principal
const MainNavigation = () => (
  <nav className="hidden md:block bg-white border-b border-gray-200" role="navigation" aria-label="Main navigation">
    <div className="container mx-auto">
      <div className="flex items-center justify-evenly">
        <div className="flex space-x-8">
          {NAVIGATION_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="font-semibold py-4 px-2 text-brand-dark hover:text-brand-primary transition-colors duration-200 border-b-2 border-transparent hover:border-brand-primary"
              aria-current={item.id === 'pumps' ? 'page' : undefined} // Ejemplo para página actual
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  </nav>
);

// Componente principal
const Header = () => {
  const { isOpen, isAnimating, close, toggle } = useDropdown();

  return (
    <>
      <header className="bg-white shadow-sm" role="banner">
        {/* Top section with logo, search, and icons */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <SearchBar />
            
            {/* Desktop: Quick Access, Mobile: Menu Button */}
            <div className="flex items-center">
              <QuickAccess />
              <MobileMenuButton isOpen={isOpen} onClick={toggle} />
            </div>
          </div>
        </div>

        <MainNavigation />
        
        {/* Blue divider line */}
        <div className="h-1 bg-brand-primary" role="presentation"></div>
      </header>

      {/* Mobile Dropdown Menu */}
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