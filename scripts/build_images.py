"""Selecciona y procesa las imagenes de producto que van al sitio.

De las ~1500 imagenes del USB solo unas pocas por subcategoria sirven para la
web. Este script las elige, las recorta, las convierte a WebP y deja un
manifiesto que el sitio consume.

Criterio de seleccion, en orden:
  1. Fondo transparente (ya recortada por el disenador).
  2. Intacta antes que recuperada de una copia truncada.
  3. Mas resolucion.

Agrupa por la carpeta que contiene el archivo, porque en el USB esa carpeta
suele ser el codigo de modelo (`BOMBAS/HGP-1A-F6RX2B/`, `ELECTRO VALVULAS/DG4V-3/`).

    python scripts/build_images.py [--limit-per-group 4] [--dry-run]

Salidas:
  public/products/<categoria>/<subcategoria>/<grupo>-<n>.webp
  src/data/product-images.json
"""

import argparse
import json
import os
import re
import sys
from collections import defaultdict

import numpy as np
from PIL import Image, ImageFile

Image.MAX_IMAGE_PIXELS = None
ImageFile.LOAD_TRUNCATED_IMAGES = True

HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT = os.path.dirname(HERE)
USB = os.path.join(PROJECT, "assets-inbox", "usb")
OUT_IMAGES = os.path.join(PROJECT, "public", "products")
OUT_MANIFEST = os.path.join(PROJECT, "src", "data", "product-images.json")

USABLE_FRAC = 0.75
MAX_EDGE = 1200
WEBP_QUALITY = 82
# Carpetas que guardan el material crudo previo al recorte.
RAW_FOLDER = re.compile(r"^(ORIGINAL(ES)?|RAW|Fotos editables)", re.IGNORECASE)


def slugify(value):
    value = value.lower().replace("ñ", "n")
    value = re.sub(r"[áàä]", "a", value)
    value = re.sub(r"[éèë]", "e", value)
    value = re.sub(r"[íìï]", "i", value)
    value = re.sub(r"[óòö]", "o", value)
    value = re.sub(r"[úùü]", "u", value)
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return re.sub(r"-{2,}", "-", value).strip("-") or "img"


def is_flat(path):
    """True si la imagen es practicamente un color plano.

    Algunos archivos danados conservan bastantes filas para pasar el umbral de
    `aliveFrac` pero se decodifican como un rectangulo liso. Se detectan por la
    desviacion tipica del contenido visible.
    """
    try:
        with Image.open(path) as im:
            im.load()
            im = im.convert("RGBA")
            bbox = im.getbbox()
            if bbox:
                im = im.crop(bbox)
            im.thumbnail((160, 160))
            arr = np.asarray(im.convert("RGB"), dtype=np.float32)
            alpha = np.asarray(im.getchannel("A"), dtype=np.float32)
            visible = arr[alpha > 16]
            if visible.size == 0:
                return True
            return float(visible.std()) < 12.0
    except Exception:
        return True


def score(item):
    """Cuanto mejor es una imagen para una ficha, mayor la tupla."""
    return (
        item["transparentBg"],
        not item["truncated"],
        item["width"] * item["height"],
    )


def process(src_path, dest_path):
    """Recorta el margen sobrante, reescala y guarda como WebP."""
    with Image.open(src_path) as im:
        im.load()
        im = im.convert("RGBA")

        # El recorte del disenador suele dejar mucho aire alrededor.
        bbox = im.getbbox()
        if bbox:
            im = im.crop(bbox)

        if max(im.size) > MAX_EDGE:
            ratio = MAX_EDGE / max(im.size)
            im = im.resize((round(im.width * ratio), round(im.height * ratio)), Image.LANCZOS)

        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        im.save(dest_path, "WEBP", quality=WEBP_QUALITY, method=6)
        return im.size


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    parser = argparse.ArgumentParser()
    parser.add_argument("--limit-per-group", type=int, default=4)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    out_dir = os.path.join(HERE, "out")
    with open(os.path.join(out_dir, "inventory.json"), encoding="utf-8") as fh:
        inventory = json.load(fh)["images"]
    with open(os.path.join(out_dir, "damage.json"), encoding="utf-8") as fh:
        damage = {d["rel"]: d["aliveFrac"] for d in json.load(fh)}
    with open(os.path.join(HERE, "taxonomy.json"), encoding="utf-8") as fh:
        taxonomy = json.load(fh)

    usable = []
    for item in inventory:
        frac = damage.get(item["rel"], 1.0) if item["truncated"] else 1.0
        if frac < USABLE_FRAC or min(item["width"], item["height"]) < 400:
            continue
        usable.append(item)

    by_prefix = defaultdict(list)
    for item in usable:
        parts = item["cleanPath"].split("/")
        for i in range(1, len(parts)):
            by_prefix["/".join(parts[:i])].append(item)

    manifest = {}
    written = 0
    # Grupos de una carpeta compartida que ninguna regla `match` reclama. No se
    # asignan a nadie: es preferible una subcategoria sin foto a una foto
    # tecnica mal etiquetada. `claimed` es global porque un mismo grupo puede
    # rechazarlo una subcategoria y reclamarlo otra que mira la misma carpeta.
    unassigned = defaultdict(set)
    claimed = set()

    for category in taxonomy["categories"]:
        for sub in category["subcategories"]:
            seen, pool = set(), []
            for folder in sub["usb"]:
                for item in by_prefix.get(folder, []):
                    if item["rel"] not in seen:
                        seen.add(item["rel"])
                        pool.append(item)
            if not pool:
                continue

            # Agrupamos por la carpeta contenedora; si es una carpeta de
            # material crudo, se sube un nivel para no crear grupos "ORIGINALES".
            groups = defaultdict(list)
            for item in pool:
                parts = item["cleanPath"].split("/")
                parent = parts[-2] if len(parts) > 1 else parts[0]
                if RAW_FOLDER.match(parent) and len(parts) > 2:
                    parent = parts[-3]
                groups[slugify(parent)].append(item)

            # Con `match`, la subcategoria solo se queda los grupos cuyo codigo
            # de modelo casa; el resto queda pendiente de decidir a mano. Se usa
            # `search` para que un patron suelto encuentre el codigo aunque la
            # carpeta lo lleve dentro ("bhp" casa con "bombas-bhp"); antepon `^`
            # cuando quieras anclarlo al principio.
            patterns = [re.compile(p) for p in sub.get("match", [])]
            if patterns:
                for group in list(groups):
                    if any(p.search(group) for p in patterns):
                        claimed.add(group)
                    else:
                        unassigned[sub["usb"][0]].add(group)
                        del groups[group]

            entries = []
            for group, items in sorted(groups.items()):
                items.sort(key=score, reverse=True)
                items = [i for i in items if not is_flat(os.path.join(USB, i["rel"]))]
                for index, item in enumerate(items[: args.limit_per_group]):
                    name = f"{group}-{index + 1}.webp" if len(items) > 1 else f"{group}.webp"
                    rel_out = f"products/{category['slug']}/{sub['slug']}/{name}"
                    dest = os.path.join(PROJECT, "public", *rel_out.split("/"))

                    if args.dry_run:
                        size = (item["width"], item["height"])
                    else:
                        try:
                            size = process(os.path.join(USB, item["rel"]), dest)
                        except Exception as exc:
                            print(f"  ! {item['rel']}: {type(exc).__name__}")
                            continue
                        written += 1

                    entries.append(
                        {
                            "group": group,
                            "src": "/" + rel_out,
                            "width": size[0],
                            "height": size[1],
                            "cutout": item["transparentBg"],
                            "source": item["cleanPath"],
                        }
                    )

            if entries:
                manifest[f"{category['slug']}/{sub['slug']}"] = entries
                print(f"{category['slug']}/{sub['slug']:<38} {len(entries):>3} imgs / {len(groups)} grupos")

    if not args.dry_run:
        os.makedirs(os.path.dirname(OUT_MANIFEST), exist_ok=True)
        with open(OUT_MANIFEST, "w", encoding="utf-8") as fh:
            json.dump(manifest, fh, ensure_ascii=False, indent=1)
            fh.write("\n")

    total = sum(len(v) for v in manifest.values())
    print(f"\n{total} imagenes en {len(manifest)} subcategorias ({written} escritas)")

    pending = {
        folder: sorted(groups - claimed)
        for folder, groups in unassigned.items()
        if groups - claimed
    }
    if pending:
        print("\nGrupos sin asignar (anade una regla `match` en taxonomy.json):")
        for folder, groups in pending.items():
            print(f"  {folder}: {', '.join(groups)}")

    if not args.dry_run:
        print(f"manifiesto -> {OUT_MANIFEST}")


if __name__ == "__main__":
    main()
