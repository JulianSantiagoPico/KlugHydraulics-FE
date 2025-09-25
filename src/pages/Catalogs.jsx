import { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import PageHeader from "../components/ui/PageHeader";
import CatalogCard from "../components/ui/CatalogCard";
import CatalogFilters from "../components/ui/CatalogFilters";
import { catalogsData as initialCatalogsData } from "../data/CatalogsData";
import { useFilters } from "../hooks/useFilters";

const Catalogs = () => {
  const [catalogsData, setCatalogsData] = useState(initialCatalogsData);

  const {
    activeFilters,
    toggleFilter,
    removeFilter,
    resetFilters,
    filterData,
  } = useFilters();

  // Función mejorada para generar thumbnail del PDF
  const generatePDFThumbnail = async (pdfUrl) => {
    try {
      const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl,
        cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/",
        cMapPacked: true,
        verbosity: 0,
      });

      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const scale = 0.3;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
        intent: "display",
      };

      await page.render(renderContext).promise;

      // Cleanup
      page.cleanup();

      return canvas.toDataURL("image/jpeg", 0.7);
    } catch (error) {
      console.warn(`Error generando thumbnail para ${pdfUrl}:`, error.message);
      return "/images/default-catalog.jpg";
    }
  };

  // Generar thumbnails al montar el componente
  useEffect(() => {
    const loadThumbnails = async () => {
      const updatedCatalogs = await Promise.all(
        catalogsData.map(async (catalog) => {
          if (catalog.loading) {
            const thumbnail = await generatePDFThumbnail(catalog.pdfUrl);
            return { ...catalog, thumbnail, loading: false };
          }
          return catalog;
        })
      );
      setCatalogsData(updatedCatalogs);
    };

    loadThumbnails();
  }, []);

  const handleDownload = (pdfUrl, filename) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtrar catálogos
  const filteredCatalogs = filterData(catalogsData);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Catalogs" />

      {/* Componente de filtros */}
      <CatalogFilters
        activeFilters={activeFilters}
        onToggleFilter={toggleFilter}
        onRemoveFilter={removeFilter}
        onResetFilters={resetFilters}
      />

      {/* Grid de catálogos */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out">
          {filteredCatalogs.map((catalog, index) => (
            <CatalogCard
              key={catalog.id}
              catalog={catalog}
              index={index}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {/* Mensaje cuando no hay catálogos filtrados */}
        {filteredCatalogs.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-gray-500 text-lg transition-all duration-300">
              No se encontraron catálogos para esta categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalogs;
