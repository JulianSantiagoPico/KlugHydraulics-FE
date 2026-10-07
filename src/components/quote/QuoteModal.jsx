"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useQuote } from "./QuoteProvider";
import { productsHref } from "@/lib/routes";
import { submitInquiry } from "@/lib/submitInquiry";

function TrashIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5h6v2m-8 0 1 12h8l1-12M10 11v5M14 11v5" />
    </svg>
  );
}

/** Campo con línea inferior, como en el Figma. */
function Field({ id, label, type = "text", value, onChange, error, requiredMark }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-gray-500 mb-1">
        {label}
        <span className="text-gray-500" aria-hidden="true">
          *
        </span>
        <span className="sr-only"> ({requiredMark})</span>
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full bg-transparent border-0 border-b py-2 text-klug-navy focus:outline-none focus:border-klug-blue transition-colors ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Solicitud de cotización en ventana emergente.
 *
 * Se apoya en el `<dialog>` nativo: de ahí salen gratis el foco atrapado, el
 * cierre con Escape, el backdrop y la devolución del foco al botón que lo
 * abrió, que a mano son bastante código y fácil de hacer mal.
 *
 * Se monta una sola vez en el layout de idioma; cualquier botón lo abre con
 * `openQuote()` del contexto.
 */
export default function QuoteModal({ locale, t }) {
  const { items, remove, clear, isOpen, closeQuote } = useQuote();
  const dialogRef = useRef(null);

  const [values, setValues] = useState({ name: "", email: "", whatsapp: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      // `showModal` deja el foco en el diálogo, pero lo útil aquí es entrar
      // directamente al primer campo del formulario.
      dialog.querySelector("input")?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // El bloqueo del scroll de fondo va en su propio efecto con limpieza: si se
  // libera dentro de un manejador, cualquier cierre que no pase por ahí (o un
  // desmontaje) deja la página trabada.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  /*
   * Cerrar siempre pasa por el estado, nunca por `dialog.close()` desde la UI.
   *
   * El motivo: el evento `close` del `<dialog>` no es fiable en todos los
   * navegadores —en el de pruebas no llega nunca—, y si el estado se
   * sincronizara desde ahí, React seguiría creyendo que está abierto: el
   * diálogo no volvería a abrirse y el scroll quedaría bloqueado. Así que las
   * dos vías de cierre nativas (Escape y clic en el backdrop) se interceptan y
   * se traducen a `closeQuote()`.
   */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;

    const onCancel = (event) => {
      event.preventDefault();
      closeQuote();
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeQuote();
      }
    };
    const onClick = (event) => {
      if (event.target === dialog) closeQuote();
    };

    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("keydown", onKeyDown);
    dialog.addEventListener("click", onClick);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("keydown", onKeyDown);
      dialog.removeEventListener("click", onClick);
    };
  }, [isOpen, closeQuote]);

  // Al cerrar se olvida el resultado del envío anterior.
  useEffect(() => {
    if (isOpen) return;
    setStatus("idle");
    setErrors({});
  }, [isOpen]);

  const set = (field) => (value) => setValues((current) => ({ ...current, [field]: value }));

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = t.quote.required;
    if (!values.email.trim()) next.email = t.quote.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = t.quote.invalidEmail;
    if (!values.whatsapp.trim()) next.whatsapp = t.quote.required;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      await submitInquiry({ type: "quote", locale, ...values, items });
      setStatus("sent");
      clear();
    } catch {
      setStatus("error");
    }
  };

  const salesEmail = t.contact.salesEmail;

  // `m-auto` no es decorativo: el navegador centra los diálogos modales con
  // `margin: auto` sobre `inset: 0`, y el Preflight de Tailwind pone `margin: 0`
  // a todos los elementos, con lo que el diálogo se pegaba a la esquina
  // superior izquierda.
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="quote-modal-title"
      className="m-auto w-[min(64rem,92vw)] max-h-[90vh] p-0 rounded-3xl backdrop:bg-black/40 backdrop:backdrop-blur-sm open:flex"
    >
      <div className="relative w-full overflow-y-auto p-6 sm:p-10 lg:p-14">
        <button
          type="button"
          onClick={closeQuote}
          aria-label={t.quote.close}
          className="absolute top-5 right-5 w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 id="quote-modal-title" className="text-3xl lg:text-4xl text-klug-ink leading-tight pr-16">
          {t.quote.modalTitleLead}
          <br />
          <strong className="font-bold">{t.quote.modalTitleStrong}</strong>
        </h2>

        {status === "sent" ? (
          <div className="mt-8 rounded-2xl border border-klug-blue bg-klug-blue-soft/30 p-6">
            <p className="text-klug-navy font-medium">{t.quote.success}</p>
            <button
              type="button"
              onClick={closeQuote}
              className="mt-4 inline-flex items-center justify-center px-6 py-2 rounded-full bg-klug-blue text-white text-sm font-medium hover:bg-klug-blue-mid transition-colors"
            >
              {t.quote.close}
            </button>
          </div>
        ) : (
          <>
            <p className="mt-3 text-sm text-gray-600">{t.quote.intro}</p>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
              <section aria-label={t.quote.listLabel}>
                {items.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center">
                    <p className="text-gray-600">{t.quote.empty}</p>
                    <p className="text-sm text-gray-400 mt-1">{t.quote.emptyHint}</p>
                    <Link
                      href={productsHref(locale)}
                      onClick={closeQuote}
                      className="inline-block mt-4 text-sm text-klug-blue hover:underline"
                    >
                      {t.products.allProducts} →
                    </Link>
                  </div>
                ) : (
                  <ul className="max-h-80 overflow-y-auto pr-3 divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center gap-4 py-4">
                        <div className="relative w-[88px] h-[88px] shrink-0 bg-white border border-gray-200 rounded-md">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt=""
                              aria-hidden="true"
                              fill
                              sizes="88px"
                              className="object-contain p-1.5"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-bold text-klug-ink truncate">
                            {item.code ?? item.name}
                          </p>
                          <button
                            type="button"
                            onClick={() => remove(item.id)}
                            className="mt-1 inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 underline transition-colors"
                          >
                            <TrashIcon />
                            {t.quote.remove}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <Field
                  id="quote-name"
                  label={t.quote.name}
                  value={values.name}
                  onChange={set("name")}
                  error={errors.name}
                  requiredMark={t.quote.requiredMark}
                />
                <Field
                  id="quote-email"
                  label={t.quote.email}
                  type="email"
                  value={values.email}
                  onChange={set("email")}
                  error={errors.email}
                  requiredMark={t.quote.requiredMark}
                />
                <Field
                  id="quote-whatsapp"
                  label={t.quote.whatsapp}
                  type="tel"
                  value={values.whatsapp}
                  onChange={set("whatsapp")}
                  error={errors.whatsapp}
                  requiredMark={t.quote.requiredMark}
                />

                {status === "error" && (
                  <p role="alert" className="text-sm text-red-600">
                    {t.quote.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending" || items.length === 0}
                  className="w-full px-6 py-2.5 rounded-full bg-klug-blue text-white font-medium hover:bg-klug-blue-mid disabled:opacity-50 transition-colors"
                >
                  {status === "sending" ? t.quote.sending : t.quote.submit}
                </button>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <p className="text-sm text-gray-600">
                    {t.quote.orContact}{" "}
                    <a href={`mailto:${salesEmail}`} className="underline hover:text-klug-blue">
                      {salesEmail}
                    </a>
                  </p>
                  <a
                    href={`mailto:${salesEmail}`}
                    aria-label={t.quote.emailUs}
                    className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z" />
                    </svg>
                  </a>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
