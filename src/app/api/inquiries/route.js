import { NextResponse } from "next/server";

/**
 * Recibe cotizaciones y mensajes de contacto.
 *
 * PENDIENTE DE CONFIGURAR: ahora mismo valida y registra la solicitud, pero no
 * la envía a ningún sitio. Cuando se decida el hosting, aquí va la llamada al
 * proveedor de correo. Con Resend serían tres líneas:
 *
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({ from, to: process.env.SALES_EMAIL, subject, html });
 *
 * Si el sitio acaba exportándose a estático esta ruta no existe: en ese caso se
 * define NEXT_PUBLIC_FORM_ENDPOINT (ver src/lib/submitInquiry.js).
 */

const MAX_ITEMS = 50;
const MAX_FIELD = 2000;

function clean(value) {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD) : "";
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const inquiry = {
    type: body.type === "quote" ? "quote" : "contact",
    name: clean(body.name),
    company: clean(body.company),
    email: clean(body.email),
    phone: clean(body.phone),
    message: clean(body.message),
    locale: clean(body.locale) || "es",
    items: Array.isArray(body.items)
      ? body.items.slice(0, MAX_ITEMS).map((item) => ({
          code: clean(item.code),
          name: clean(item.name),
          href: clean(item.href),
        }))
      : [],
    receivedAt: new Date().toISOString(),
  };

  if (!inquiry.name || !inquiry.email || !inquiry.email.includes("@")) {
    return NextResponse.json({ error: "Faltan nombre o correo válido" }, { status: 422 });
  }

  // Sustituir por el envío real cuando haya proveedor.
  console.info("[inquiry]", JSON.stringify(inquiry));

  return NextResponse.json({ ok: true });
}
