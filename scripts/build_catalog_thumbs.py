"""Portadas de los catalogos PDF, generadas en build.

La version anterior del sitio renderizaba la primera pagina de cada PDF en el
navegador con pdf.js: descargaba los 16 catalogos enteros solo para pintar una
miniatura. Aqui se hace una vez, en build, con poppler, y el navegador recibe
un WebP de unos pocos KB.

Requiere `pdftoppm` (poppler) en el PATH.

    python scripts/build_catalog_thumbs.py

Salida: public/catalogs/thumbs/<nombre>.webp
"""

import os
import shutil
import subprocess
import sys
import tempfile

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT = os.path.dirname(HERE)
CATALOGS = os.path.join(PROJECT, "public", "catalogs")
THUMBS = os.path.join(CATALOGS, "thumbs")

WIDTH = 600
QUALITY = 80


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    if not shutil.which("pdftoppm"):
        sys.exit("Falta pdftoppm (poppler). Instalalo o salta este paso.")

    os.makedirs(THUMBS, exist_ok=True)
    pdfs = sorted(f for f in os.listdir(CATALOGS) if f.lower().endswith(".pdf"))
    if not pdfs:
        sys.exit(f"No hay PDFs en {CATALOGS}")

    done, failed = 0, []
    for pdf in pdfs:
        stem = os.path.splitext(pdf)[0]
        dest = os.path.join(THUMBS, f"{stem}.webp")

        with tempfile.TemporaryDirectory() as tmp:
            prefix = os.path.join(tmp, "page")
            result = subprocess.run(
                ["pdftoppm", "-png", "-f", "1", "-l", "1", "-scale-to-x", str(WIDTH),
                 "-scale-to-y", "-1", os.path.join(CATALOGS, pdf), prefix],
                capture_output=True,
            )
            rendered = [f for f in os.listdir(tmp) if f.endswith(".png")]
            if result.returncode != 0 and not rendered:
                failed.append((pdf, result.stderr.decode("utf-8", "replace")[:120]))
                continue

            with Image.open(os.path.join(tmp, rendered[0])) as im:
                im.convert("RGB").save(dest, "WEBP", quality=QUALITY, method=6)

        done += 1
        print(f"  {stem}.webp  ({os.path.getsize(dest) // 1024} KB)")

    print(f"\n{done}/{len(pdfs)} portadas -> {THUMBS}")
    for pdf, err in failed:
        print(f"  ! {pdf}: {err.strip()}")


if __name__ == "__main__":
    main()
