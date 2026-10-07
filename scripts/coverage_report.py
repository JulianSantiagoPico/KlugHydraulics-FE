"""Cobertura de imagenes por subcategoria.

Cruza el inventario (inventory_assets.py), el analisis de dano (damage.json) y
la taxonomia del Figma (taxonomy.json) para responder una sola pregunta:
que subcategorias tienen material suficiente para publicar y cuales hay que
volver a pedirle al cliente.

    python scripts/inventory_assets.py     # primero
    python scripts/damage_report.py        # segundo
    python scripts/coverage_report.py      # este

Umbral: una imagen sirve si esta intacta o conserva >=75% de sus filas.
"""

import json
import os
import sys
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
USABLE_FRAC = 0.75
# Por debajo de esto una foto no da para la imagen principal de una ficha.
HERO_MIN_PX = 800


def load(name):
    path = os.path.join(OUT, name)
    if not os.path.exists(path):
        sys.exit(f"Falta {path}. Corre antes los scripts previos.")
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    inv = load("inventory.json")["images"]
    damage = {d["rel"]: d["aliveFrac"] for d in load("damage.json")}
    with open(os.path.join(HERE, "taxonomy.json"), encoding="utf-8") as fh:
        tax = json.load(fh)

    # Marcamos cada imagen como usable o no.
    for it in inv:
        frac = damage.get(it["rel"], 1.0) if it["truncated"] else 1.0
        it["aliveFrac"] = frac
        it["usable"] = frac >= USABLE_FRAC
        it["hero"] = it["usable"] and min(it["width"], it["height"]) >= HERO_MIN_PX

    # Indice por prefijo de ruta limpia para poder casar carpetas anidadas.
    by_prefix = defaultdict(list)
    for it in inv:
        parts = it["cleanPath"].split("/")
        for i in range(1, len(parts)):
            by_prefix["/".join(parts[:i])].append(it)

    rows = []
    for cat in tax["categories"]:
        for sub in cat["subcategories"]:
            seen, imgs = set(), []
            for folder in sub["usb"] + sub.get("web", []):
                for it in by_prefix.get(folder, []):
                    if it["rel"] not in seen:
                        seen.add(it["rel"])
                        imgs.append(it)
            usable = [i for i in imgs if i["usable"]]
            heroes = [i for i in imgs if i["hero"]]
            cut = [i for i in usable if i["transparentBg"]]
            rows.append(
                {
                    "cat": cat["slug"],
                    "sub": sub["slug"],
                    "label": sub["en"],
                    "total": len(imgs),
                    "usable": len(usable),
                    "hero": len(heroes),
                    "cut": len(cut),
                    "shared": len(sub["usb"]) > 1 or sub["usb"][0].count("/") == 0 and len(imgs) > 60,
                }
            )

    def status(r):
        if r["hero"] == 0:
            return "SIN MATERIAL"
        if r["hero"] < 3:
            return "JUSTO"
        return "OK"

    print(f"{'CATEGORIA':<18}{'SUBCATEGORIA':<36}{'TOT':>5}{'USA':>5}{'HERO':>6}{'CUT':>5}  ESTADO")
    print("-" * 92)
    for r in rows:
        print(
            f"{r['cat']:<18}{r['label'][:35]:<36}{r['total']:>5}{r['usable']:>5}"
            f"{r['hero']:>6}{r['cut']:>5}  {status(r)}"
        )

    blocked = [r for r in rows if r["hero"] == 0]
    tight = [r for r in rows if 0 < r["hero"] < 3]
    print(f"\n{len(rows)} subcategorias | OK: {len(rows)-len(blocked)-len(tight)} | "
          f"justas: {len(tight)} | sin material: {len(blocked)}")
    if blocked:
        print("\nHay que pedir fotos de:")
        for r in blocked:
            print(f"  - {r['cat']}/{r['sub']}")

    with open(os.path.join(OUT, "coverage.json"), "w", encoding="utf-8") as fh:
        json.dump(rows, fh, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
