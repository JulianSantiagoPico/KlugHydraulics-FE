import { useState } from "react";

const FloatingLogos = ({ logos, isDropdownOpen = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!logos || logos.length === 0) return null;

  // Colores para cada logo
  const logoColors = ["#6EC2FF", "#30A7FF"];

  return (
    <div
      className={`fixed right-0 top-1/2 transform -translate-y-1/2 z-50 transition-opacity duration-300 ${
        isDropdownOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Vista Desktop - Siempre visible */}
      <div className="hidden md:block">
        <div className="shadow-lg rounded-l-lg overflow-hidden">
          {logos.map((logo, index) => (
            <a
              key={index}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:brightness-110 transition-all duration-200 hover:scale-105"
              style={{
                width: "140px",
                height: "80px",
                backgroundColor: logoColors[index] || "#30A7FF",
              }}
            >
              <div className="w-full h-full flex items-center justify-center p-4">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain filter brightness-0 invert"
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Vista Mobile - Con botón expandible */}
      <div className="block md:hidden">
        <div className="flex flex-col items-end">
          {/* Logos container */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col mb-2 shadow-lg rounded-l-lg overflow-hidden">
              {logos.map((logo, index) => (
                <a
                  key={index}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:brightness-110 transition-all duration-200"
                  style={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: logoColors[index] || "#30A7FF",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-w-full max-h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Toggle button */}
          <button
            onClick={toggleExpanded}
            className="bg-[#30A7FF] hover:bg-[#2691E6] text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-l-lg flex items-center justify-center"
            style={{ width: "45px", height: "45px" }}
            aria-label={isExpanded ? "Hide logos" : "Show logos"}
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingLogos;
