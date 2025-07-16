import Products from '../assets/Products.webp';
import About from '../assets/images/About.webp';
import Catalogs from '../assets/images/Catalogs.webp';
import Contact from '../assets/images/Contact.webp';

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

const QUICK_ACCESS_ITEMS_TEXT = [
  { id: 'about', label: 'About', href: '/about' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'catalogs', label: 'Catalogs', href: '/catalogs' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export { QUICK_ACCESS_ITEMS, NAVIGATION_ITEMS, QUICK_ACCESS_ITEMS_TEXT };
