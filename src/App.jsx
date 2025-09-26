import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import FloatingLogos from "./components/layout/FloatingLogos.jsx";
import { useDropdown } from "./hooks/useMobile";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Catalogs from "./pages/Catalogs";
import Pumps from "./pages/Pumps";
import Valves from "./pages/Valves";
import HydraulicMotors from "./pages/HydraulicMotors";
import Filters from "./pages/Filters";
import PowerUnits from "./pages/PowerUnits";
import Accessories from "./pages/Accessories";

// Importar los logos
import klugPneumaticsLogo from "./assets/logos/klug-pneumatics-logo.webp";
import klugElectricLogo from "./assets/logos/klug-electric-logo.webp";

// Configuración de los logos
const floatingLogos = [
  {
    src: klugPneumaticsLogo,
    alt: "Klüg Pneumatics",
    url: "https://klugpneumatics.com/",
  },
  {
    src: klugElectricLogo,
    alt: "Klüg Electric",
    url: "https://klugelectric.com/",
  },
];

function App() {
  // Mover el estado del dropdown aquí
  const { isOpen, isAnimating, close, toggle } = useDropdown();

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header
            isDropdownOpen={isOpen}
            isDropdownAnimating={isAnimating}
            onDropdownClose={close}
            onDropdownToggle={toggle}
          />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/catalogs" element={<Catalogs />} />
              <Route path="/pumps" element={<Pumps />} />
              <Route path="/valves" element={<Valves />} />
              <Route path="/hydraulic-motors" element={<HydraulicMotors />} />
              <Route path="/filters" element={<Filters />} />
              <Route path="/power-units" element={<PowerUnits />} />
              <Route path="/accessories" element={<Accessories />} />
            </Routes>
          </main>

          <Footer />

          {/* Floating Logos */}
          <FloatingLogos logos={floatingLogos} isDropdownOpen={isOpen} />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
