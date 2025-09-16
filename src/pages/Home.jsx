import Carousel from "../components/ui/Carousel";

// Importar las imágenes
import gearPumpsImg from "../assets/images/CarouselImages/GearPumps.webp";
import monoblockValvesImg from "../assets/images/CarouselImages/MonoblockValves.webp";
import solenoidDirectionalImg from "../assets/images/CarouselImages/SolenoidDirectional.webp";

const carouselImages = [
  {
    src: monoblockValvesImg,
    alt: "Monoblock Valves",
    title: "Monoblock Valves",
    description: "High-quality hydraulic valves for industrial applications",
  },
  {
    src: solenoidDirectionalImg,
    alt: "Solenoid Directional",
    title: "Solenoid Directional Valves",
    description: "Precision control for hydraulic systems",
  },
  {
    src: gearPumpsImg,
    alt: "Gear Pumps",
    title: "Gear Pumps",
    description: "Reliable and efficient hydraulic pumps",
  },
];

const Home = () => {
  return (
    <div>
      {/* Carousel Section */}
      <Carousel images={carouselImages} autoScrollInterval={3000} />

      {/* Rest of the content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-brand-dark mb-6">
          Welcome to Klüg Hydraulics
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Your trusted partner for professional hydraulic systems and
          components.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-brand-dark mb-3">
              Quality Products
            </h3>
            <p className="text-gray-600">
              Industry-leading hydraulic components and systems.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-brand-dark mb-3">
              Expert Support
            </h3>
            <p className="text-gray-600">
              Professional technical support and consultation.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-brand-dark mb-3">
              Reliable Service
            </h3>
            <p className="text-gray-600">
              Fast delivery and comprehensive service solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
