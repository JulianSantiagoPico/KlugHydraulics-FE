import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({
  isOpen,
  isAnimating,
  onClose,
  navigationItems,
  quickAccessItems,
  className = "",
}) => {
  const dropdownRef = useRef(null);

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      // Prevenir scroll del body cuando el menu está abierto
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay de fondo translúcido con blur */}
      <div
        className={`fixed inset-0 backdrop-blur-sm transition-all duration-500 ease-out z-40 xl:hidden ${
          isAnimating
            ? "bg-black/20 backdrop-blur-sm"
            : "bg-black/0 backdrop-blur-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu dropdown con transiciones suaves */}
      <div
        ref={dropdownRef}
        className={`fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-2xl transform transition-all duration-500 ease-out z-50 xl:hidden ${
          isAnimating
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        } ${className}`}
        style={{
          transitionDelay: isAnimating ? "0ms" : "0ms",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header del dropdown con animación en cascada */}
        <div
          className={`flex items-center justify-between p-4 border-b border-gray-200/60 transition-all duration-700 ease-out ${
            isAnimating
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8"
          }`}
          style={{
            transitionDelay: isAnimating ? "200ms" : "0ms",
          }}
        >
          <h2 className="text-lg font-semibold text-brand-dark">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100/70 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200 backdrop-blur-sm"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Contenido del dropdown */}
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Accesos rápidos con animación escalonada */}
          {quickAccessItems && quickAccessItems.length > 0 && (
            <div
              className={`p-4 border-b border-gray-200/60 transition-all duration-700 ease-out ${
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isAnimating ? "300ms" : "0ms",
              }}
            >
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                Quick Access
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickAccessItems.map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={onClose}
                    className={`flex flex-col items-center p-3 rounded-lg hover:bg-gray-50/80 transition-all duration-300 ease-out group transform hover:scale-105 ${
                      isAnimating
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{
                      transitionDelay: isAnimating
                        ? `${400 + index * 100}ms`
                        : "0ms",
                    }}
                  >
                    <div className="w-12 h-12 mb-2 flex items-center justify-center">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                    <span className="text-xs text-center text-gray-700 group-hover:text-brand-primary transition-colors duration-200">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Navegación principal con animación escalonada */}
          {navigationItems && navigationItems.length > 0 && (
            <div
              className={`flex-1 p-4 transition-all duration-700 ease-out ${
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isAnimating ? "500ms" : "0ms",
              }}
            >
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                Products
              </h3>
              <nav className="space-y-1">
                {navigationItems.map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={onClose}
                    className={`block px-4 py-3 text-brand-dark hover:text-brand-primary hover:bg-gray-50/80 rounded-lg transition-all duration-300 ease-out font-medium transform hover:translate-x-2 ${
                      isAnimating
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8"
                    }`}
                    style={{
                      transitionDelay: isAnimating
                        ? `${600 + index * 80}ms`
                        : "0ms",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* Footer del dropdown */}
          <div
            className={`p-4 border-t border-gray-200/60 bg-gray-50/80 backdrop-blur-sm transition-all duration-700 ease-out ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: isAnimating ? "700ms" : "0ms",
            }}
          >
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <Link
                to="/help"
                className="hover:text-brand-primary transition-colors duration-200"
              >
                Help
              </Link>
              <span>•</span>
              <Link
                to="/contact"
                className="hover:text-brand-primary transition-colors duration-200"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Componente del botón hamburguesa con transiciones más suaves
export const MobileMenuButton = ({ isOpen, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`xl:hidden p-2 rounded-lg hover:bg-gray-100/70 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200 backdrop-blur-sm ${className}`}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="w-6 h-6 flex flex-col justify-center space-y-1">
        <span
          className={`block h-0.5 w-6 bg-gray-600 transition-all duration-400 ease-out transform origin-center ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ease-out ${
            isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-gray-600 transition-all duration-400 ease-out transform origin-center ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </div>
    </button>
  );
};

export default Dropdown;
