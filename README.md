# Klüg Hydraulics

Sitio de catálogo de Klüg Hydraulics. Next.js 16 (App Router), Tailwind v4,
bilingüe ES/EN y generado estáticamente: las 375 páginas se prerenderizan en
build.

```bash
npm run dev      # desarrollo en http://localhost:3000
npm run build    # build de producción
npm start        # servir el build
```

## Cómo está montado

```
src/
  app/[locale]/          Todas las páginas, bajo prefijo de idioma (/es, /en)
    products/            Listado, categoría, subcategoría y ficha de producto
  app/api/inquiries/     Recepción de cotizaciones y contacto (ver "Formularios")
  components/
    layout/              Header, Footer, menú móvil, logos flotantes
    products/            Card, galería, barra lateral, botón de guardar
    quote/               Lista de cotización (contexto + formulario)
    ui/                  Carrusel, mapa de distribuidores, cabecera de sección
  data/                  Datos generados y a mano (ver abajo)
  i18n/                  Diccionarios es/en y helper de idioma
  lib/                   Rutas, metadatos, acceso a productos, envío de formularios
  proxy.js               Redirección de idioma
scripts/                 Pipeline de contenido (Python)
```

### Idiomas

Todas las rutas llevan prefijo (`/es/...`, `/en/...`). `src/proxy.js` manda las
rutas sin prefijo al idioma que pida el navegador. Los textos viven en
`src/i18n/dictionaries/{es,en}.json`; los datos de producto llevan los campos
traducibles como `{ es, en }`.

Nunca escribas un href a mano: usa los constructores de `src/lib/routes.js`.

## Pipeline de contenido

El catálogo no se escribe a mano: se genera desde el material del cliente que
vive en `assets-inbox/usb/` (fuera de git). El orden importa.

```bash
python scripts/inventory_assets.py      # 1. inventaria el USB
python scripts/damage_report.py         # 2. mide el daño de cada imagen
python scripts/coverage_report.py       # 3. qué subcategorías tienen material
python scripts/build_taxonomy.py        # 4. taxonomía -> src/data/taxonomy.json
python scripts/build_images.py          # 5. imágenes -> public/products/ + manifiesto
python scripts/build_products.py        # 6. fichas -> src/data/products.json
python scripts/build_catalog_thumbs.py  # 7. portadas de los PDF
```

Atajos: `npm run assets:inventory` (pasos 1-3) y `npm run assets:taxonomy` (4).

Requisitos: Python con `Pillow` y `numpy`, y `pdftoppm` (poppler) para el paso 7.

### La fuente de verdad es `scripts/taxonomy.json`

Define las 6 categorías y 42 subcategorías extraídas de los menús del Figma, y
para cada una las carpetas del USB de las que salen sus imágenes. Cuando varias
subcategorías comparten carpeta (`BOMBAS/` alimenta DIN, SAE, CBK y pistones),
el campo `match` reparte por código de modelo. Los grupos que ninguna regla
reclama **no se asignan**: `build_images.py` los lista al final para decidirlos
a mano, porque etiquetar mal una foto técnica es peor que no tenerla.

### Corregir nombres y añadir especificaciones

`build_products.py` deduce el nombre de cada ficha del nombre de carpeta. Acierta
en la mayoría (`DG4V-3`, `HGP-1A-F4RX2B`, `CIT-03`) pero no siempre. Para
corregir a mano, crea `scripts/product-overrides.json` — lo que pongas ahí gana
sobre lo generado. Hay una plantilla con todas las fichas en
`scripts/out/product-overrides.template.json`.

Ese mismo archivo es donde van las descripciones y las tablas técnicas:

```json
{
  "valves/solenoid-directional-valves/dg4v-3": {
    "code": "DG4V-3",
    "name": { "es": "Válvula direccional solenoide DG4V-3", "en": "Solenoid Directional Valve DG4V-3" },
    "description": { "es": "...", "en": "..." },
    "specs": [
      {
        "title": { "es": "Datos hidráulicos", "en": "Hydraulic data" },
        "rows": [
          { "label": { "es": "Presión máxima de trabajo", "en": "Max working pressure" }, "unit": "MPa", "values": ["31.5"] }
        ]
      }
    ],
    "figures": [
      { "src": "/products/.../spool-symbols.webp", "width": 900, "height": 600,
        "caption": { "es": "Símbolos de corredera", "en": "Spool symbols" } }
    ]
  }
}
```

Las tablas se transcriben; los símbolos de corredera, las curvas de rendimiento
y los planos de dimensiones van como imagen. El material de origen está en
`assets-inbox/usb/KLUG/WEB/`, organizado por familia.

**Nada de estos scripts inventa datos técnicos.** Si una ficha no tiene specs,
sale sin la sección de especificaciones.

## Formularios

Todo el envío pasa por `src/lib/submitInquiry.js`, que es el único punto acoplado
al proveedor. Dos modos:

- **Servidor Node** (Vercel y similares): funciona sin configurar nada contra
  `src/app/api/inquiries/route.js`. Ahí queda pendiente enchufar el envío real de
  correo; ahora mismo valida y registra por consola.
- **Export estático**: define `NEXT_PUBLIC_FORM_ENDPOINT` con la URL de un
  servicio de formularios y la Route Handler deja de usarse.

## Exportar a estático

El proyecto está preparado: añade `output: "export"` y `images.unoptimized: true`
en `next.config.mjs`, y borra `src/proxy.js` (el proxy no existe en ese modo,
así que habrá que generar un `index.html` de redirección en el build).

## Variables de entorno

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canónica; alimenta sitemap, hreflang y JSON-LD. Por defecto `https://klughydraulics.com` |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Endpoint externo de formularios, solo en modo estático |

## SEO

Cada ficha emite JSON-LD `Product`, y todas las páginas declaran `canonical` y
`hreflang` para ES/EN mediante `src/lib/metadata.js`. `sitemap.xml` y
`robots.txt` se generan solos. La lista de cotización va con `noindex`: es
privada de cada visitante.
