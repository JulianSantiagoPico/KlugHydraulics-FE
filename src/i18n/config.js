export const locales = ["es", "en"];
export const defaultLocale = "es";

export function isLocale(value) {
  return locales.includes(value);
}

/** Etiquetas del selector de idioma, en su propio idioma. */
export const localeNames = {
  es: "Español",
  en: "English",
};
