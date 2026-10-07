"""Cuanto sobrevive de cada imagen danada del USB.

El USB llego con corrupcion de bits: muchos PNG/JPG tienen el tamano correcto y
la cabecera valida, pero el stream se corta a medias. Pillow los abre con
LOAD_TRUNCATED_IMAGES y rellena de ceros lo que no pudo decodificar, asi que la
fraccion de filas no nulas mide directamente cuanto se salvo.

    python scripts/damage_report.py

Salida: scripts/out/damage.json (rel -> aliveFrac 0..1)
"""

import json
import os
import sys
from collections import Counter

import numpy as np
from PIL import Image, ImageFile

Image.MAX_IMAGE_PIXELS = None
ImageFile.LOAD_TRUNCATED_IMAGES = True

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(os.path.dirname(HERE), "assets-inbox", "usb")
OUT = os.path.join(HERE, "out")


def alive_fraction(path):
    """Fraccion de filas que llegaron a decodificarse (0..1)."""
    try:
        with Image.open(path) as im:
            im.load()
            arr = np.array(im.convert("RGBA"))
    except Exception:
        return 0.0
    alive = np.any(arr.reshape(arr.shape[0], -1) != 0, axis=1)
    if not alive.any():
        return 0.0
    return (int(np.max(np.nonzero(alive))) + 1) / arr.shape[0]


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    inv_path = os.path.join(OUT, "inventory.json")
    if not os.path.exists(inv_path):
        sys.exit("Corre antes: python scripts/inventory_assets.py")
    with open(inv_path, encoding="utf-8") as fh:
        inv = json.load(fh)["images"]

    damaged = [it for it in inv if it["truncated"]]
    print(f"analizando {len(damaged)} imagenes danadas...")

    out, buckets = [], Counter()
    for it in damaged:
        frac = alive_fraction(os.path.join(ROOT, it["rel"]))
        out.append({"rel": it["rel"], "aliveFrac": round(frac, 3)})
        buckets[
            ">=95%" if frac >= 0.95 else
            "75-95%" if frac >= 0.75 else
            "40-75%" if frac >= 0.40 else "<40%"
        ] += 1

    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, "damage.json"), "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)

    for k in (">=95%", "75-95%", "40-75%", "<40%"):
        print(f"  {k:>7}: {buckets[k]}")
    print(f"\nrescatables (>=75%): {buckets['>=95%'] + buckets['75-95%']}")


if __name__ == "__main__":
    main()
