import { NextResponse } from "next/server";

import { defaultLocale, locales } from "./i18n/config";

/**
 * Manda `/` y cualquier ruta sin prefijo de idioma a `/es` o `/en`, según lo
 * que pida el navegador.
 *
 * OJO si se decide exportar a estático (`output: "export"`): el proxy no existe
 * en ese modo. Habría que borrar este archivo y generar un `index.html` de
 * redirección en el paso de build. Todo lo demás del proyecto ya es compatible
 * con la exportación.
 */
export function proxy(request) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

/** Primer idioma soportado que aparezca en Accept-Language. */
function pickLocale(request) {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase());

  return preferred.find((code) => locales.includes(code)) ?? defaultLocale;
}

export const config = {
  // Todo salvo assets, rutas internas de Next y archivos con extensión.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
