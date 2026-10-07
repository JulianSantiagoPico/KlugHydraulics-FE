"""Inventario de assets-inbox/usb.

Recorre el material crudo del USB y produce un JSON con todo lo que sirve para
la web: dimensiones, peso, si tiene canal alfa y si el fondo ya viene limpio.
No toca nada: solo lee y reporta.

    python scripts/inventory_assets.py

Salida: scripts/out/inventory.json  +  resumen por consola.
"""

import json
import os
import re
import sys
import unicodedata
from collections import defaultdict

from PIL import Image, ImageFile

Image.MAX_IMAGE_PIXELS = None

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets-inbox", "usb")
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")

RASTER = {".png", ".jpg", ".jpeg", ".webp"}
# Basura de macOS: los AppleDouble (._foo) y los .DS_Store.
JUNK = re.compile(r"^(\._|\.DS_Store$)")
def clean(name):
    """Nombre normalizado y sin caracteres basura.

    La copia Mac -> Windows dejó caracteres del Área de Uso Privado pegados al
    final de varias carpetas (`BOBINAS\\uF028`, `MOTOR\\uF028`...). No se ven en
    el explorador pero rompen cualquier comparación por nombre, así que se
    eliminan junto con marcas de formato y controles.
    """
    normalized = unicodedata.normalize("NFC", name)
    stripped = "".join(c for c in normalized if unicodedata.category(c) not in ("Co", "Cf", "Cc"))
    return stripped.strip()


def probe(path):
    """Datos de una imagen.

    El USB llegó con corrupción de bits: ~30% de los archivos tienen el stream
    dañado aunque el tamaño y la cabecera sean correctos. Se leen dos veces —
    primero en estricto, luego tolerando truncado — para saber cuáles están
    intactas y cuáles se recuperan parcialmente (`truncated: true`).
    """
    ImageFile.LOAD_TRUNCATED_IMAGES = False
    truncated = False
    try:
        with Image.open(path) as im:
            im.load()
    except Exception:
        truncated = True

    ImageFile.LOAD_TRUNCATED_IMAGES = True
    try:
        with Image.open(path) as im:
            im.load()
            w, h = im.size
            mode = im.mode
            alpha = mode in ("RGBA", "LA") or "transparency" in im.info
            transparent_bg = False
            if alpha:
                # Muestreamos las cuatro esquinas: si son transparentes, el
                # recorte ya está hecho y la imagen sirve tal cual para una card.
                rgba = im.convert("RGBA")
                corners = [
                    rgba.getpixel((0, 0)),
                    rgba.getpixel((w - 1, 0)),
                    rgba.getpixel((0, h - 1)),
                    rgba.getpixel((w - 1, h - 1)),
                ]
                transparent_bg = all(px[3] < 16 for px in corners)
            return {
                "width": w,
                "height": h,
                "mode": mode,
                "alpha": alpha,
                "transparentBg": transparent_bg,
                "truncated": truncated,
            }
    except Exception as exc:  # irrecuperable
        return {"error": type(exc).__name__}


def main():
    # La consola de Windows va en cp1252 y los nombres del USB traen acentos.
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    if not os.path.isdir(ROOT):
        sys.exit(f"No existe {ROOT}")

    items = []
    broken = []
    skipped = defaultdict(int)

    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if not JUNK.match(d)]
        for fn in filenames:
            if JUNK.match(fn):
                skipped["junk"] += 1
                continue
            ext = os.path.splitext(fn)[1].lower()
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, ROOT).replace("\\", "/")
            parts = [clean(p) for p in rel.split("/")]

            if ext not in RASTER:
                skipped[ext or "sin-extension"] += 1
                continue

            info = probe(full)
            if "error" in info:
                skipped["irrecuperable"] += 1
                broken.append(rel)
                continue

            items.append(
                {
                    "rel": rel,
                    "cleanPath": "/".join(parts),
                    "folder": parts[0],
                    "sub": parts[1] if len(parts) > 2 else None,
                    "file": parts[-1],
                    "ext": ext,
                    "bytes": os.path.getsize(full),
                    **info,
                }
            )

    os.makedirs(OUT_DIR, exist_ok=True)
    out = os.path.join(OUT_DIR, "inventory.json")
    with open(out, "w", encoding="utf-8") as fh:
        json.dump({"images": items, "unrecoverable": broken}, fh, ensure_ascii=False, indent=1)

    # --- resumen ---
    by_folder = defaultdict(lambda: {"n": 0, "cut": 0, "big": 0, "trunc": 0})
    for it in items:
        b = by_folder[it["folder"]]
        b["n"] += 1
        if it["transparentBg"]:
            b["cut"] += 1
        if min(it["width"], it["height"]) >= 800:
            b["big"] += 1
        if it["truncated"]:
            b["trunc"] += 1

    print(f"{len(items)} imagenes utilizables -> {out}")
    print("omitidos:", dict(skipped))
    print(f"\n{'CARPETA':<40}{'IMGS':>6}{'RECORTE':>9}{'>=800px':>9}{'DANADAS':>9}")
    for folder in sorted(by_folder, key=lambda f: -by_folder[f]["n"]):
        b = by_folder[folder]
        print(f"{folder[:39]:<40}{b['n']:>6}{b['cut']:>9}{b['big']:>9}{b['trunc']:>9}")
    tot = len(items)
    trunc = sum(b["trunc"] for b in by_folder.values())
    print(f"\nintactas {tot - trunc} | recuperadas parcialmente {trunc} | perdidas {len(broken)}")


if __name__ == "__main__":
    main()
