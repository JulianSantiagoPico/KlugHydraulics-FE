import { Download } from "lucide-react";
import DownloadIcon from "../../assets/icons/download-icon.svg";

const CatalogCard = ({ catalog, index, onDownload }) => {
  const handleDownload = () => {
    onDownload(catalog.pdfUrl, `${catalog.title}.pdf`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out overflow-hidden group transform hover:scale-105 animate-fade-in"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: "both",
      }}
    >
      {/* Contenedor con aspect ratio fijo */}
      <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
        {catalog.loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600 animate-pulse">
              Cargando...
            </span>
          </div>
        ) : (
          <img
            src={catalog.thumbnail}
            alt={catalog.title}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
            onError={(e) => {
              e.target.src = "/images/default-catalog.jpg";
            }}
          />
        )}
      </div>

      {/* Contenido inferior */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 transition-colors duration-300">
              {catalog.title}
            </h3>
            <span className="text-sm text-[#6EC2FF] font-medium">
              {catalog.category}
            </span>
          </div>
          <button
            onClick={handleDownload}
            className="p-2 bg-[#D9D9D94D] text-white rounded-full hover:bg-[#6EC2FF] transition-all duration-300 ease-in-out disabled:opacity-50 transform hover:scale-110 hover:shadow-lg active:scale-95"
            disabled={catalog.loading}
            title="Descargar PDF"
          >
            <img
              src={DownloadIcon}
              alt="Download Icon"
              className="w-4 h-4 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
