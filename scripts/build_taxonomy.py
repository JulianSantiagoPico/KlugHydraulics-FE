"""Genera la taxonomia que consume el sitio.

`scripts/taxonomy.json` es la fuente de verdad: ademas de los nombres lleva las
carpetas del USB de las que sale cada subcategoria, que solo importan en tiempo
de build. Este script publica la version limpia que va al bundle.

    python scripts/build_taxonomy.py   ->  src/data/taxonomy.json
"""

import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "taxonomy.json")
DEST = os.path.join(os.path.dirname(HERE), "src", "data", "taxonomy.json")


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    with open(SRC, encoding="utf-8") as fh:
        tax = json.load(fh)

    out = []
    for cat in tax["categories"]:
        out.append(
            {
                "slug": cat["slug"],
                "name": {"es": cat["es"], "en": cat["en"]},
                "subcategories": [
                    {
                        "slug": sub["slug"],
                        "name": {"es": sub["es"], "en": sub["en"]},
                    }
                    for sub in cat["subcategories"]
                ],
            }
        )

    os.makedirs(os.path.dirname(DEST), exist_ok=True)
    with open(DEST, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)
        fh.write("\n")

    subs = sum(len(c["subcategories"]) for c in out)
    print(f"{len(out)} categorias / {subs} subcategorias -> {DEST}")


if __name__ == "__main__":
    main()
