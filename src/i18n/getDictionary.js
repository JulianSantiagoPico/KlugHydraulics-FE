import { defaultLocale, isLocale } from "./config";
import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";

const dictionaries = { es, en };

/**
 * Diccionario de un idioma. Los JSON se importan estáticamente para que el
 * build pueda prerenderizar todas las rutas sin tocar el sistema de archivos.
 */
export function getDictionary(locale) {
  return dictionaries[isLocale(locale) ? locale : defaultLocale];
}

/** Reemplaza marcadores `{clave}` dentro de una cadena del diccionario. */
export function interpolate(template, values) {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match
  );
}
