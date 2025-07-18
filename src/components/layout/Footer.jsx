import logo from '../../assets/icons/Logo-Klüg-Hydraulics.webp';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { QUICK_ACCESS_ITEMS_TEXT, NAVIGATION_ITEMS } from '../NavItems';

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

const FooterNavigation = () => (
  <div className="flex items-center justify-center space-x-10">

    <p className="text-gray-600">© {new Date().getFullYear()} Klüg Company. All rights reserved.</p>
    {QUICK_ACCESS_ITEMS_TEXT.map((item) => (
      <QuickAccessItem key={item.id} item={item} />
    ))}
    {NAVIGATION_ITEMS.map((item) => (
      <NavigationItem key={item.id} item={item} />
    ))}
  </div>
);

const ExternalLinks = () => (
  <div className="container mx-auto px-4 py-4">
    <div className="flex items-center justify-center space-x-28">
        <Logo />
        <div className="flex items-center gap-4">
            <p className="text-xl font-bold">Visit our others line products:</p>
            <a href="https://klugelectric.com/" target="_blank">
                <Button className="bg-[#30A7FF] text-xl p-6 hover:bg-[#30A7FF]/90 hover:cursor-pointer">KLÜG ELECTRIC</Button>
            </a>
            <a href="https://klugpneumatics.com/" target="_blank">
                <Button className="bg-[#30A7FF] text-xl p-6 hover:bg-[#30A7FF]/90 hover:cursor-pointer">KLÜG PNEUMATICS</Button>
            </a>
        </div>
    </div>
  </div>
)

const QuickAccessItem = ({ item }) => (
  <Link 
    to={item.href}
    className="flex flex-col items-center text-gray-600 hover:text-brand-primary cursor-pointer group transition-colors duration-200"
    aria-label={item.alt}
  >
    <div className="w-16 h-16 flex items-center justify-center">
      <p>{item.label}</p>
    </div>
  </Link>
);

const NavigationItem = ({ item }) => (
  <Link 
    to={item.href}
    className="flex flex-col items-center text-gray-600 hover:text-brand-primary cursor-pointer group transition-colors duration-200 underline"
    aria-label={item.alt}
  >
    <div className="w-16 h-16 flex items-center justify-center">
      <p>{item.label}</p>
    </div>
  </Link>
);



const Footer = () => {
  return (
    <footer className="bg-white mt-24">
      <ExternalLinks />
      <FooterNavigation />
    </footer>
  )
}

export default Footer