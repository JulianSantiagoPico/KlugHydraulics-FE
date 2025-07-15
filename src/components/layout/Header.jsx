import { useState } from 'react';
import logo from '../../assets/icons/Logo-Klüg-Hydraulics.webp';
import Products from '../../assets/Products.webp';
import About from '../../assets/images/About.webp';
import Catalogs from '../../assets/images/Catalogs.webp';
import Contact from '../../assets/images/Contact.webp';

const QUICK_ACCESS_ITEMS = [
  { id: 'about', src: About, alt: 'Acerca de nosotros', label: 'About', href: '/about' },
  { id: 'products', src: Products, alt: 'Productos', label: 'Products', href: '/products' },
  { id: 'catalogs', src: Catalogs, alt: 'Catálogos', label: 'Catalogs', href: '/catalogs' },
  { id: 'contact', src: Contact, alt: 'Contacto', label: 'Contact', href: '/contact' },
];

const NAVIGATION_ITEMS = [
  { id: 'pumps', label: 'PUMPS', href: '/pumps' },
  { id: 'valves', label: 'VALVES', href: '/valves' },
  { id: 'hydraulic-motors', label: 'HYDRAULIC MOTORS', href: '/hydraulic-motors' },
  { id: 'filters', label: 'FILTERS', href: '/filters' },
  { id: 'power-units', label: 'POWER UNITS', href: '/power-units' },
  { id: 'accessories', label: 'ACCESSORIES', href: '/accessories' },
];

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
          Buscar productos
        </label>
        <input
          id="search-input"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar productos..."
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
          Presiona Enter para buscar
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
    <div className="w-16 h-16 flex items-center justify-center">
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
  </a>
);

// Subcomponente: Accesos rápidos
const QuickAccess = () => (
  <div className="flex items-center space-x-8">
    {QUICK_ACCESS_ITEMS.map((item) => (
      <QuickAccessItem key={item.id} item={item} />
    ))}
  </div>
);

// Subcomponente: Navegación principal
const MainNavigation = () => (
  <nav className="bg-white border-b border-gray-200" role="navigation" aria-label="Navegación principal">
    <div className="container mx-auto">
      <div className="flex items-center justify-evenly">
        <div className="flex space-x-30">
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
  return (
    <header className="bg-white shadow-sm" role="banner">
      {/* Top section with logo, search, and icons */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <SearchBar />
          <QuickAccess />
        </div>
      </div>

      <MainNavigation />
      
      {/* Blue divider line */}
      <div className="h-1 bg-brand-primary" role="presentation"></div>
    </header>
  );
};

export default Header;