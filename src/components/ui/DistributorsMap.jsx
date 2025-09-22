import { useState, useEffect } from "react";

// Importar los SVGs del mapa - Blancos
import mapLinesWhite from "../../assets/images/Map/MapLines.svg";
import mapDotsWhite from "../../assets/images/Map/MapDots.svg";

// Importar los SVGs del mapa - Azules
import mapLinesBlue from "../../assets/images/Map/MapLines-Blue.png";
import mapDotsBlue from "../../assets/images/Map/MapDots-Blue.svg";

// Importar los iconos de contacto
import phoneIcon from "../../assets/icons/phone-icon.svg";
import personIcon from "../../assets/icons/person-icon.svg";
import emailIcon from "../../assets/icons/email-icon.svg";

// Componente Card para vista mobile
const DistributorCard = ({
  distributor,
  cardIconColor = "opacity-70",
  cardTextColor = "text-gray-700",
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <div className="inline-block bg-[#6EC2FF] text-white px-4 py-2 rounded-xl text-sm font-medium mb-3">
          Contact
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {distributor.region}
        </h3>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center">
          <img
            src={phoneIcon}
            alt="Phone"
            className={`w-4 h-4 mr-3 ${cardIconColor}`}
          />
          <span className={cardTextColor}>{distributor.phone}</span>
        </div>

        <div className="flex items-center">
          <img
            src={personIcon}
            alt="Person"
            className={`w-4 h-4 mr-3 ${cardIconColor}`}
          />
          <span className={cardTextColor}>{distributor.person}</span>
        </div>

        {distributor.email && (
          <div className="flex items-center">
            <img
              src={emailIcon}
              alt="Email"
              className={`w-4 h-4 mr-3 ${cardIconColor}`}
            />
            <span className={`${cardTextColor} truncate`}>
              {distributor.email}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const DistributorsMap = ({
  distributorsData,
  title = "Contact our distributors",
  titleColor = "text-white",
  titleSize = "text-2xl lg:text-3xl",
  titleWeight = "font-semibold",
  titleAlign = "text-center",
  titleMargin = "mb-8",
  className = "",
  showTitle = true,
  mapHeight = "h-[500px] lg:h-[600px]",
  mapTheme = "white", // "white" o "blue"
  pointColor = "#00406F",
  pointBackgroundColor = "white", // Color de fondo del punto
  pointBorderColor = "white", // Color del borde del punto
  showRadialBackground = true, // Nueva prop para mostrar/ocultar el fondo radial
  backgroundColor = "", // Color de fondo alternativo si no se usa el radial
  // Props para ajustar posición del mapa
  mapLinesScale = 1.003,
  mapLinesTranslateX = 0,
  mapLinesTranslateY = 0.6,
  mapDotsScale = 0.999,
  mapDotsTranslateX = -0.04,
  mapDotsTranslateY = 0,
  // Props para personalizar las cards de información
  cardBackgroundColor = "transparent", // Color de fondo de la card de información
  cardTextColor = "text-white", // Color del texto de la card de información
  cardIconFilter = "filter brightness-0 invert opacity-70", // Filtro para los iconos de la card
  cardBorderRadius = "rounded-2xl", // Border radius de la card
  cardPadding = "p-6", // Padding de la card
  cardShadow = "shadow-lg", // Sombra de la card
  // Props para personalizar mobile cards
  mobileCardIconColor = "opacity-70", // Color/filtro de iconos en mobile
  mobileCardTextColor = "text-gray-700", // Color del texto en mobile
}) => {
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [hoveredDistributor, setHoveredDistributor] = useState(null);
  const [displayedDistributor, setDisplayedDistributor] = useState(null);

  const currentDistributor = hoveredDistributor || selectedDistributor;

  // Construir clases del título dinámicamente
  const titleClasses = `${titleSize} ${titleWeight} ${titleColor} ${titleMargin}`;

  // Seleccionar los SVGs según el tema
  const mapLines = mapTheme === "blue" ? mapLinesBlue : mapLinesWhite;
  const mapDots = mapTheme === "blue" ? mapDotsBlue : mapDotsWhite;

  // Configurar el estilo de fondo
  const containerStyle = showRadialBackground
    ? {
        background:
          "radial-gradient(50% 50% at 50% 50%, #00406F 0%, #132E43 100%)",
      }
    : backgroundColor
    ? { backgroundColor }
    : {};

  // Estilo para la card de información
  const cardStyle =
    cardBackgroundColor !== "transparent"
      ? { backgroundColor: cardBackgroundColor }
      : {};

  // Efecto para manejar el delay de desaparición
  useEffect(() => {
    let timeoutId;

    if (currentDistributor) {
      // Si hay un distribuidor actual, mostrarlo inmediatamente
      setDisplayedDistributor(currentDistributor);
    } else {
      // Si no hay distribuidor actual, esperar 2 segundos antes de ocultar
      timeoutId = setTimeout(() => {
        setDisplayedDistributor(null);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentDistributor]);

  // Función para manejar clicks fuera del mapa
  const handleMapClick = (e) => {
    // Verificar si el click fue en el mapa pero no en un botón
    if (e.target.closest(".distributor-button") === null) {
      setSelectedDistributor(null);
      setHoveredDistributor(null);
    }
  };

  return (
    <div className={`py-16 lg:py-20 ${className}`} style={containerStyle}>
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className={titleAlign + " mb-12"}>
            <h2 className={titleClasses}>{title}</h2>
          </div>
        )}

        {/* Vista Desktop - Mapa Interactivo */}
        <div className="hidden md:block">
          {/* Map Container */}
          <div
            className={`relative w-full ${mapHeight}`}
            onClick={handleMapClick}
          >
            {/* Background Map */}
            <div className="absolute inset-0">
              {/* Map Lines*/}
              <img
                src={mapLines}
                alt="World Map Lines"
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  transform: `scale(${mapLinesScale}) translateX(${mapLinesTranslateX}%) translateY(${mapLinesTranslateY}%)`,
                }}
              />

              {/* Map Dots */}
              <img
                src={mapDots}
                alt="World Map Dots"
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  transform: `scale(${mapDotsScale}) translateX(${mapDotsTranslateX}%) translateY(${mapDotsTranslateY}%)`,
                }}
              />

              {/* Interactive Points */}
              {distributorsData.map((distributor) => (
                <button
                  key={distributor.id}
                  className={`distributor-button absolute w-11 h-11 rounded-full border-2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out hover:scale-125 z-10 flex items-center justify-center ${
                    currentDistributor?.id === distributor.id ? "scale-110" : ""
                  }`}
                  style={{
                    top: distributor.position.top,
                    left: distributor.position.left,
                    backgroundColor: pointBackgroundColor,
                    borderColor: pointBorderColor,
                  }}
                  onMouseEnter={() => setHoveredDistributor(distributor)}
                  onMouseLeave={() => setHoveredDistributor(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDistributor(distributor);
                  }}
                >
                  {/* Smaller Inner Circle */}
                  <div
                    className="w-5 h-5 rounded-full transition-all duration-300"
                    style={{ backgroundColor: pointColor }}
                  ></div>
                  <span className="sr-only">{distributor.region}</span>
                </button>
              ))}
            </div>

            {/* Information Card */}
            <div
              className={`absolute bottom-4 left-32 w-80 max-w-sm transition-all duration-700 ease-out ${
                displayedDistributor
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-6 scale-95 pointer-events-none"
              }`}
            >
              <div
                className={`${cardPadding} ${cardTextColor} ${cardBorderRadius} ${cardShadow}`}
                style={cardStyle}
              >
                <div
                  className={`inline-block bg-[#6EC2FF] text-white px-4 py-2 rounded-xl text-sm font-medium mb-4 transition-all duration-500 ease-out ${
                    displayedDistributor
                      ? "opacity-100 translate-x-0 scale-100"
                      : "opacity-0 -translate-x-4 scale-95"
                  }`}
                  style={{
                    transitionDelay: displayedDistributor ? "200ms" : "0ms",
                  }}
                >
                  Contact
                </div>
                <h3
                  className={`text-xl font-bold mb-4 transition-all duration-600 ease-out ${
                    displayedDistributor
                      ? "opacity-100 translate-x-0 scale-100"
                      : "opacity-0 -translate-x-4 scale-95"
                  }`}
                  style={{
                    transitionDelay: displayedDistributor ? "300ms" : "0ms",
                  }}
                >
                  {displayedDistributor?.region}
                </h3>
                <div className="space-y-3 text-sm">
                  <div
                    className={`flex items-center transition-all duration-500 ease-out ${
                      displayedDistributor
                        ? "opacity-100 translate-x-0 scale-100"
                        : "opacity-0 -translate-x-4 scale-95"
                    }`}
                    style={{
                      transitionDelay: displayedDistributor ? "400ms" : "0ms",
                    }}
                  >
                    <img
                      src={phoneIcon}
                      alt="Phone"
                      className={`w-4 h-4 mr-3 ${cardIconFilter}`}
                    />
                    <span>{displayedDistributor?.phone}</span>
                  </div>
                  <div
                    className={`flex items-center transition-all duration-500 ease-out ${
                      displayedDistributor
                        ? "opacity-100 translate-x-0 scale-100"
                        : "opacity-0 -translate-x-4 scale-95"
                    }`}
                    style={{
                      transitionDelay: displayedDistributor ? "500ms" : "0ms",
                    }}
                  >
                    <img
                      src={personIcon}
                      alt="Person"
                      className={`w-4 h-4 mr-3 ${cardIconFilter}`}
                    />
                    <span>{displayedDistributor?.person}</span>
                  </div>
                  <div
                    className={`flex items-center transition-all duration-500 ease-out ${
                      displayedDistributor && displayedDistributor.email
                        ? "opacity-100 translate-x-0 scale-100"
                        : "opacity-0 -translate-x-4 scale-95"
                    }`}
                    style={{
                      transitionDelay:
                        displayedDistributor && displayedDistributor.email
                          ? "600ms"
                          : "0ms",
                    }}
                  >
                    {displayedDistributor?.email && (
                      <>
                        <img
                          src={emailIcon}
                          alt="Email"
                          className={`w-4 h-4 mr-3 ${cardIconFilter}`}
                        />
                        <span className="truncate">
                          {displayedDistributor.email}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vista Mobile - Cards Grid */}
        <div className="block md:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {distributorsData.map((distributor) => (
              <DistributorCard
                key={distributor.id}
                distributor={distributor}
                cardIconColor={mobileCardIconColor}
                cardTextColor={mobileCardTextColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorsMap;
