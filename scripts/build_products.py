"""Genera el catalogo de productos que consume el sitio.

Una ficha por familia/serie, como se acordo. Las familias salen de los grupos
del manifiesto de imagenes, porque las carpetas del USB estan nombradas con el
codigo de modelo (`ELECTRO VALVULAS/DG4V-3/`, `CHEQUE EN LINEA/CIT-06-05/`).

A cada familia se le enganchan:
  - sus imagenes ya procesadas,
  - las referencias de la lista de precios cuyo codigo empieza igual,
  - el catalogo PDF de su categoria.

Lo que este script NO inventa son descripciones ni tablas de especificaciones:
eso se escribe a mano en `scripts/product-overrides.json`, que siempre gana
sobre lo generado. Un catalogo industrial con datos tecnicos inventados es peor
que uno incompleto.

    python scripts/build_products.py   ->  src/data/products.json
"""

import json
import os
import re
import sys
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT = os.path.dirname(HERE)
OUT = os.path.join(PROJECT, "src", "data", "products.json")
OVERRIDES = os.path.join(HERE, "product-overrides.json")

# Catalogo PDF por defecto de cada categoria, de los que ya viven en public/.
CATEGORY_CATALOG = {
    "pumps": "/catalogs/KLUG-Pumps-c.pdf",
    "valves": "/catalogs/KLUG-directional-valves_c.pdf",
    "hydraulic-motors": "/catalogs/KLUG-BMR-c.pdf",
    "filters": "/catalogs/KLUG-Components-c.pdf",
    "power-units": "/catalogs/MINI POWER PACK KLUG.pdf",
    "accessories": "/catalogs/KLUG-Components-c.pdf",
}
SUBCATEGORY_CATALOG = {
    "monoblock-directional-control-valves": "/catalogs/KLUG-Monoblockvalves-c.pdf",
    "relief-valves": "/catalogs/KLUG_pressure-valves_c.pdf",
    "piloted-relief-valves": "/catalogs/KLUG_pressure-valves_c.pdf",
    "reduction-valves": "/catalogs/KLUG-modular-valves-c.pdf",
    "bms-motor": "/catalogs/KLUG-BMS-c.pdf",
    "coolers": "/catalogs/KLUG-Coolers-c.pdf",
    "accumulators": "/catalogs/CATALOG_ACCUMULATORS.pdf",
}

# Grupos que no son un modelo sino una carpeta cajon de sastre.
GENERIC = re.compile(
    r"^(varias|bombas|motor|valvulas?|filtros?|originales?|fotos|web|imagenes)(-|$)",
    re.IGNORECASE,
)


def normalize_code(value):
    """Codigo comparable: sin separadores y en mayusculas."""
    return re.sub(r"[^A-Z0-9]", "", value.upper())


# Palabras que la carpeta arrastra pero no forman parte del codigo de modelo.
TRAILING_NOISE = {
    "electro", "valvulas", "valvula", "bombas", "bomba", "motor", "motores",
    "filtros", "filtro", "originales", "original", "fotos", "foto", "web",
    "imagenes", "varias", "copia", "fondo", "eliminado",
}
# Palabras castellanas comunes en nombres de carpeta: si aparecen, el slug es
# una descripcion, no una referencia, y no debe ir en mayusculas.
SPANISH_WORDS = {
    "bobina", "bobinas", "mando", "palanca", "palancas", "tapa", "acople",
    "acoples", "cheque", "alivio", "subplaca", "subplacas", "campana",
    "minicentral", "cabeza", "pistones", "aisladora", "codo", "recta",
}


def display_name(group):
    """Nombre legible a partir del slug de la carpeta.

    Quita la cola descriptiva que arrastran algunas carpetas
    (`dg4v-5-oa-electro-valvulas` -> `DG4V-5-OA`) y decide entre mayusculas de
    referencia o capitalizacion normal segun si el slug parece un codigo.
    """
    tokens = [t for t in group.split("-") if t]
    while tokens and tokens[-1] in TRAILING_NOISE:
        tokens.pop()
    if not tokens:
        return None

    looks_like_code = (
        any(re.search(r"\d", t) for t in tokens)
        and all(len(t) <= 8 for t in tokens)
        and not any(t in SPANISH_WORDS for t in tokens)
    )
    if looks_like_code:
        return "-".join(tokens).upper()
    return " ".join(tokens).capitalize()


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    with open(os.path.join(HERE, "taxonomy.json"), encoding="utf-8") as fh:
        taxonomy = json.load(fh)
    with open(os.path.join(PROJECT, "src", "data", "product-images.json"), encoding="utf-8") as fh:
        images = json.load(fh)
    with open(os.path.join(HERE, "out", "references.json"), encoding="utf-8") as fh:
        references = json.load(fh)

    overrides = {}
    if os.path.exists(OVERRIDES):
        with open(OVERRIDES, encoding="utf-8") as fh:
            overrides = json.load(fh)

    ref_index = [(normalize_code(r["reference"]), r["reference"]) for r in references]

    products = []
    skipped = []

    for category in taxonomy["categories"]:
        for sub in category["subcategories"]:
            key = f"{category['slug']}/{sub['slug']}"
            entries = images.get(key, [])
            if not entries:
                skipped.append(key)
                continue

            by_group = defaultdict(list)
            for entry in entries:
                by_group[entry["group"]].append(entry)

            for group, group_images in sorted(by_group.items()):
                slug = group
                code = normalize_code(group)
                label = display_name(group)
                # Un cajon de sastre no da nombre de modelo: la ficha toma el
                # nombre de la subcategoria y sirve de entrada generica.
                generic = bool(GENERIC.match(group)) or label is None

                matched = [
                    original
                    for normalized, original in ref_index
                    if len(code) >= 3 and normalized.startswith(code)
                ]

                product = {
                    "slug": slug,
                    "category": category["slug"],
                    "subcategory": sub["slug"],
                    "code": None if generic else label,
                    "name": {
                        "es": sub["es"] if generic else f"{sub['es']} {label}",
                        "en": sub["en"] if generic else f"{sub['en']} {label}",
                    },
                    "description": {"es": "", "en": ""},
                    "catalog": SUBCATEGORY_CATALOG.get(sub["slug"])
                    or CATEGORY_CATALOG.get(category["slug"]),
                    "images": [
                        {"src": i["src"], "width": i["width"], "height": i["height"]}
                        for i in group_images
                    ],
                    "references": matched,
                    "specs": [],
                    "figures": [],
                }

                override = overrides.get(f"{key}/{slug}")
                if override:
                    product.update(override)

                products.append(product)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(products, fh, ensure_ascii=False, indent=1)
        fh.write("\n")

    template = {
        f"{p['category']}/{p['subcategory']}/{p['slug']}": {
            "code": p["code"],
            "name": p["name"],
            "description": {"es": "", "en": ""},
        }
        for p in products
    }
    template_path = os.path.join(HERE, "out", "product-overrides.template.json")
    with open(template_path, "w", encoding="utf-8") as fh:
        json.dump(template, fh, ensure_ascii=False, indent=1)
        fh.write("\n")

    with_refs = sum(1 for p in products if p["references"])
    with_specs = sum(1 for p in products if p["specs"])
    print(f"{len(products)} fichas -> {OUT}")
    print(f"  con referencias de la lista de precios: {with_refs}")
    print(f"  con tablas de especificaciones:         {with_specs}")
    if skipped:
        print(f"  subcategorias sin imagenes (sin ficha): {', '.join(skipped)}")
    print(f"  plantilla para corregir nombres a mano -> {template_path}")


if __name__ == "__main__":
    main()
