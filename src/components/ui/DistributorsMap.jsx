import Carousel from "../components/ui/Carousel";
import IndustryCarousel from "../components/ui/IndustryCarousel";
import DistributorsMap from "../components/ui/DistributorsMap";

// Importar las imágenes
import gearPumpsImg from "../assets/images/CarouselImages/GearPumps.webp";
import monoblockValvesImg from "../assets/images/CarouselImages/MonoblockValves.webp";
import solenoidDirectionalImg from "../assets/images/CarouselImages/SolenoidDirectional.webp";

// Importar los iconos
import durabilityIcon from "../assets/icons/durability-icon.svg";
import performanceIcon from "../assets/icons/performance-icon.svg";
import optimizationIcon from "../assets/icons/optimization-icon.svg";

// Importar los iconos de industrias
import liftingIcon from "../assets/icons/lifting-equipment-icon.svg";
import miningIcon from "../assets/icons/mining-icon.svg";
import manufacturingIcon from "../assets/icons/manufacturing-icon.svg";
import constructionIcon from "../assets/icons/construction-icon.svg";
import agribusinessIcon from "../assets/icons/agribusiness-icon.svg";

// Subcomponente ServiceCard
const ServiceCard = ({ icon, title, description, altText }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm relative pt-8 p-8 lg:p-12">
      {/* Icono posicionado en el borde superior */}
      <div className="absolute -top-6 left-6">
        <div className="bg-[#30A7FF] p-3 rounded-xl">
          <img src={icon} alt={altText} className="w-8 h-8" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

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

// Array con los datos de los servicios
const servicesData = [
  {
    icon: durabilityIcon,
    title: "Durability",
    description:
      "Components built to withstand extreme conditions and last longer.",
    altText: "Durability",
  },
  {
    icon: performanceIcon,
    title: "Maximum performance",
    description:
      "Maximum efficiency and power to take your machinery to the next level.",
    altText: "Maximum performance",
  },
  {
    icon: optimizationIcon,
    title: "Optimization",
    description:
      "Solutions that reduce waste and enhance your system's productivity.",
    altText: "Optimization",
  },
];

// Array con los datos de las industrias
const industriesData = [
  {
    icon: liftingIcon,
    title: "Lifting equipment",
    color: "#B9E1FF",
  },
  {
    icon: miningIcon,
    title: "Mining",
    color: "#6EC2FF",
  },
  {
    icon: manufacturingIcon,
    title: "Manufacturing",
    color: "#30A7FF",
  },
  {
    icon: constructionIcon,
    title: "Construction",
    color: "#B9E1FF",
  },
  {
    icon: agribusinessIcon,
    title: "Agribusiness",
    color: "#6EC2FF",
  },
];

// Datos de los distribuidores
const distributorsData = [
  {
    id: "north-america",
    region: "North America",
    phone: "+52 1 55 2690 1662",
    person: "Ingepromac",
    email: "Info@ingepromac.com.mx",
    position: { top: "38.5%", left: "24.2%" },
  },
  {
    id: "south-america",
    region: "South America",
    phone: "(+57) 313 750 44 93",
    person: "Camilo Zapata",
    email: "Saleslatam@klughydraulics.com",
    position: { top: "69.5%", left: "34.5%" },
  },
  {
    id: "colombia",
    region: "Colombia",
    phone: "(+57) 317 641 76 66",
    person: "Bitac S.A.S",
    email: "grupobitac@bitac.com.co",
    position: { top: "56%", left: "31.5%" },
  },
  {
    id: "europe",
    region: "Europe",
    phone: "+34 603 53 03 22",
    person: "Sara Al Jafari",
    email: "Europe@klughydraulics.com",
    position: { top: "23%", left: "47%" },
  },
  {
    id: "asia",
    region: "Asia",
    phone: "(+86) 18138859780",
    person: "Customer Service",
    email: "info@klughydraulics.com",
    position: { top: "27%", left: "73.2%" },
  },
  {
    id: "oceania",
    region: "Oceania",
    phone: "(+61) 029098 6961",
    person: "TITAN UP PTY LTD",
    position: { top: "78%", left: "78%" },
  },
];

const Home = () => {
  return (
    <div>
      {/* Carousel Section */}
      <Carousel images={carouselImages} autoScrollInterval={3000} />

      {/* Featured Products Section */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-brand-dark mb-6 text-center">
          Featured Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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

      {/* Our Services Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-12xl mx-auto bg-gray-100 rounded-3xl p-12 lg:p-16">
            {/* First Line: Our Services title + Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* Left Column - Our Services Title */}
              <div className="flex items-center justify-center min-h-[6rem]">
                <div className="relative w-72 h-32 flex items-center justify-center">
                  <span className="absolute bg-[#30A7FF] text-white px-12 py-4 rounded-xl text-2xl lg:text-5xl font-medium z-0 transform -rotate-[-4deg] shadow-lg lg:translate-y-16">
                    Our
                  </span>
                  <span className="absolute bg-white text-black px-12 py-4 rounded-xl text-2xl lg:text-5xl font-medium z-10 transform -rotate-[4deg] lg:-rotate-[5deg] shadow-lg translate-y-13 lg:translate-x-12 lg:translate-y-34">
                    services
                  </span>
                </div>
              </div>

              {/* Right Column - Main Content */}
              <div className="text-left p-8 lg:p-12">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  Powering Innovation in Hydraulic Systems
                </h2>
                <p className="text-gray-600 text-md lg:text-lg leading-relaxed">
                  At Klüg Hydraulics, we take hydraulic power to the next level
                  with high-performance solutions for the global industry. With
                  years of experience and an unwavering commitment to quality,
                  we provide hydraulic components designed to optimize
                  efficiency, precision, and durability in the most demanding
                  systems.
                </p>
              </div>
            </div>

            {/* Second Line: Services Cards*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
              {servicesData.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  altText={service.altText}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Industries Carousel Section */}
      <div className="py-16">
        <div className="container mx-auto px-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
            {/* Left Column - Title */}
            <div>
              <p className="text-sm text-gray-900 uppercase tracking-wide mb-2">
                who we help
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Power and precision
                <br />
                for every industry
              </h2>
            </div>

            {/* Right Column - Description */}
            <div>
              <p className="text-gray-900 text-lg leading-relaxed">
                Our products are designed to suit the most diverse applications.
                Wherever there's a challenge, there's a hydraulic solution from
                Klüg Hydraulics.
              </p>
            </div>
          </div>
        </div>
        <IndustryCarousel industries={industriesData} />
      </div>

      {/* Distributors Map Section */}
      <DistributorsMap distributorsData={distributorsData} />
    </div>
  );
};

export default Home;
