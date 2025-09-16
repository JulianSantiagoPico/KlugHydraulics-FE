import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
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

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />

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
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
