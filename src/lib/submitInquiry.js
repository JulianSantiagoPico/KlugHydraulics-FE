/**
 * Único punto por el que sale un formulario del sitio.
 *
 * El hosting todavía no está decidido, así que todo el acoplamiento con el
 * proveedor vive aquí. Hay dos modos y no hace falta tocar nada más:
 *
 *  - Servidor Node (Vercel y similares): sin configurar nada, va a la Route
 *    Handler `/api/inquiries`, donde se enchufa Resend o el SMTP del cliente.
 *  - Export estático: no hay Route Handler, así que se define
 *    `NEXT_PUBLIC_FORM_ENDPOINT` con la URL del servicio de formularios
 *    (Formspree, Basin, un webhook propio) y se publica contra esa.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/inquiries";

export async function submitInquiry(payload) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`El envío falló con estado ${response.status}`);
  }

  return response.json().catch(() => ({ ok: true }));
}
