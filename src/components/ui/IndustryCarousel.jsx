import React from "react";

const IndustryCard = ({ icon, title, color }) => {
  // Función para crear un gradiente más oscuro
  const createGradient = (baseColor) => {
    const darkerColor = baseColor + "CC";
    return `linear-gradient(135deg, ${baseColor} 0%, ${darkerColor} 100%)`;
  };

  return (
    <div
      className="flex-shrink-0 p-6 rounded-2xl shadow-sm mx-2 w-60 h-60 flex flex-col items-center justify-center"
      style={{ background: createGradient(color) }}
    >
      <div className="mb-3">
        <img src={icon} alt={title} className="w-16 h-16 text-gray-800" />
      </div>
      <h3 className="text-lg font-medium text-gray-800 text-center">{title}</h3>
    </div>
  );
};

const IndustryCarousel = ({ industries }) => {
  return (
    <div className="overflow-hidden py-8">
      <div className="flex animate-scroll-infinite space-x-4">
        {/* Primera serie de cards */}
        {industries.map((industry, index) => (
          <IndustryCard
            key={`first-${index}`}
            icon={industry.icon}
            title={industry.title}
            color={industry.color}
          />
        ))}
        {/* Duplicar para scroll infinito */}
        {industries.map((industry, index) => (
          <IndustryCard
            key={`second-${index}`}
            icon={industry.icon}
            title={industry.title}
            color={industry.color}
          />
        ))}
        {/* Triplicar para mayor fluidez */}
        {industries.map((industry, index) => (
          <IndustryCard
            key={`third-${index}`}
            icon={industry.icon}
            title={industry.title}
            color={industry.color}
          />
        ))}
      </div>
    </div>
  );
};

export default IndustryCarousel;
