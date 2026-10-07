"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "klug.quote.items";
const MAX_ITEMS = 50;

const QuoteContext = createContext(null);

/**
 * Lista de cotización del visitante.
 *
 * Vive en localStorage a propósito: no hay cuentas de usuario ni backend, y una
 * solicitud de cotización se arma y se envía en la misma sesión. Al enviar, la
 * lista viaja en el formulario.
 */
export function QuoteProvider({ children }) {
  const [items, setItems] = useState([]);
  // La solicitud se pide desde varios sitios (cabecera, barra lateral, ficha),
  // así que quién abre el diálogo vive aquí y no en cada botón.
  const [isOpen, setIsOpen] = useState(false);
  // Hasta que no se lee localStorage no se puede pintar el contador, o el HTML
  // del servidor y el del cliente no coinciden.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed.slice(0, MAX_ITEMS));
      }
    } catch {
      // localStorage bloqueado o JSON corrupto: se arranca con la lista vacía.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Cuota llena o modo privado: la lista sigue funcionando en memoria.
    }
  }, [items, hydrated]);

  const add = useCallback((item) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id) || prev.length >= MAX_ITEMS
        ? prev
        : [...prev, item]
    );
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggle = useCallback((item) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : prev.length >= MAX_ITEMS
          ? prev
          : [...prev, item]
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const openQuote = useCallback(() => setIsOpen(true), []);
  const closeQuote = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      hydrated,
      has: (id) => items.some((i) => i.id === id),
      add,
      remove,
      toggle,
      clear,
      isOpen,
      openQuote,
      closeQuote,
    }),
    [items, hydrated, add, remove, toggle, clear, isOpen, openQuote, closeQuote]
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote debe usarse dentro de <QuoteProvider>");
  return ctx;
}
