/**
 * Catálogos descargables. `category` usa los mismos slugs que la taxonomía de
 * producto, para que el filtro comparta vocabulario con el resto del sitio.
 * Las portadas las genera `scripts/build_catalog_thumbs.py`.
 */
const catalogs = [
  { file: "KLUG-Pumps-c.pdf", category: "pumps", title: { es: "Bombas hidráulicas", en: "Hydraulic pumps" } },
  { file: "GEAR PUMP CATALOG.pdf", category: "pumps", title: { es: "Bombas de piñones", en: "Gear pumps" } },
  { file: "KLUG-directional-valves_c.pdf", category: "valves", title: { es: "Válvulas direccionales", en: "Directional valves" } },
  { file: "DIRECTIONAL VALVES CATALOG.pdf", category: "valves", title: { es: "Válvulas direccionales (ampliado)", en: "Directional valves (extended)" } },
  { file: "KLUG-Monoblockvalves-c.pdf", category: "valves", title: { es: "Válvulas monoblock", en: "Monoblock valves" } },
  { file: "MONOBLOCK VALVES CATALOG.pdf", category: "valves", title: { es: "Válvulas monoblock (ampliado)", en: "Monoblock valves (extended)" } },
  { file: "KLUG_pressure-valves_c.pdf", category: "valves", title: { es: "Válvulas de presión", en: "Pressure valves" } },
  { file: "KLUG-modular-valves-c.pdf", category: "valves", title: { es: "Válvulas modulares", en: "Modular valves" } },
  { file: "KLUG-BMR-c.pdf", category: "hydraulic-motors", title: { es: "Motor hidráulico BMR", en: "BMR hydraulic motor" } },
  { file: "KLUG-BMS-c.pdf", category: "hydraulic-motors", title: { es: "Motor hidráulico BMS", en: "BMS hydraulic motor" } },
  { file: "MULTIPLIERS CATALOG.pdf", category: "hydraulic-motors", title: { es: "Multiplicadores", en: "Multipliers" } },
  { file: "MINI POWER PACK KLUG.pdf", category: "power-units", title: { es: "Mini power pack", en: "Mini power pack" } },
  { file: "KLUG-Components-c.pdf", category: "accessories", title: { es: "Componentes hidráulicos", en: "Hydraulic components" } },
  { file: "KLUG-Coolers-c.pdf", category: "accessories", title: { es: "Enfriadores aceite-aire", en: "Oil-air coolers" } },
  { file: "AIR_COOLERS_CATALOG_2024.pdf", category: "accessories", title: { es: "Enfriadores de aire 2024", en: "Air coolers 2024" } },
  { file: "CATALOG_ACCUMULATORS.pdf", category: "accessories", title: { es: "Acumuladores", en: "Accumulators" } },
];

export function getCatalogs() {
  return catalogs.map((catalog) => ({
    ...catalog,
    id: catalog.file,
    pdfUrl: `/catalogs/${catalog.file}`,
    thumbnail: `/catalogs/thumbs/${catalog.file.replace(/\.pdf$/i, "")}.webp`,
  }));
}
