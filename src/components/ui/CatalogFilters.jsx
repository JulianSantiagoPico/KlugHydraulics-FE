import { RotateCcw, X } from "lucide-react";
import FilterIcon from "../../assets/icons/filter-icon.svg";
import { categories } from "../../data/CatalogsData";

const CatalogFilters = ({
  activeFilters,
  onToggleFilter,
  onRemoveFilter,
  onResetFilters,
}) => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        {/* Layout desktop */}
        <div className="hidden md:flex items-center justify-center gap-6">
          {/* Contenedor de filtros */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center text-gray-700">
                <img
                  src={FilterIcon}
                  alt="Filter Icon"
                  className="w-5 h-5 mr-2"
                />
                <span className="font-medium">Filters:</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onToggleFilter(category)}
                    className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ease-in-out whitespace-nowrap transform hover:scale-105 ${
                      activeFilters.includes(category)
                        ? "bg-[#6EC2FF] text-white shadow-md scale-105"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="transition-colors duration-300">
                      {category}
                    </span>
                    <div
                      className={`ml-2 transition-all duration-300 ease-in-out ${
                        activeFilters.includes(category)
                          ? "opacity-100 scale-100 translate-x-0"
                          : "opacity-0 scale-0 -translate-x-2"
                      }`}
                    >
                      {activeFilters.includes(category) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveFilter(category);
                          }}
                          className="rounded-full p-0.5 transition-all duration-200 hover:bg-white hover:bg-opacity-20 hover:scale-110"
                        >
                          <X className="w-3 h-3 transition-transform duration-200" />
                        </button>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Botón Reset filters */}
          <div className="bg-gray-50 rounded-lg h-full flex items-center px-4 py-4">
            <button
              onClick={onResetFilters}
              className="flex items-center text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-white transition-all duration-200 border border-transparent hover:border-gray-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              <span className="font-medium">Reset filters</span>
            </button>
          </div>
        </div>

        {/* Layout móvil */}
        <div className="md:hidden space-y-4">
          {/* Header con ícono y reset */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-700">
              <img
                src={FilterIcon}
                alt="Filter Icon"
                className="w-5 h-5 mr-2"
              />
              <span className="font-medium">Filters</span>
            </div>
            <button
              onClick={onResetFilters}
              className="flex items-center text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Reset</span>
            </button>
          </div>

          {/* Grid de filtros móvil */}
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onToggleFilter(category)}
                className={`flex items-center justify-center px-3 py-2.5 rounded-lg font-medium transition-all duration-300 ease-in-out text-sm ${
                  activeFilters.includes(category)
                    ? "bg-[#6EC2FF] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                <span className="transition-colors duration-300 truncate">
                  {category}
                </span>
                {activeFilters.includes(category) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFilter(category);
                    }}
                    className="ml-2 rounded-full p-0.5 transition-all duration-200 hover:bg-white hover:bg-opacity-20 flex-shrink-0"
                  >
                    <X className="w-3 h-3 transition-transform duration-200" />
                  </button>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogFilters;
