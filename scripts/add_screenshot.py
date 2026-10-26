"""Converts a game screenshot into the webp files the gallery uses.

    python scripts/add_screenshot.py <image> <name>

Writes src/assets/img/shot-<name>-800.webp (grid card) and shot-<name>-full.webp (lightbox, at most 1600 px wide),
then add { key: '<name>', img: 'shot-<name>', w: 'full', cat: ... } to MEDIA in src/app.js with its strings.
Needs Pillow.
"""
import sys
from pathlib import Path

from PIL import Image

OUT = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'img'


def save(im, width, path):
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(path, quality=82, method=6)
    print(f'{path.name}: {im.width}x{im.height}')


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    image = Image.open(sys.argv[1]).convert('RGB')
    save(image, 800, OUT / f'shot-{sys.argv[2]}-800.webp')
    save(image, 1600, OUT / f'shot-{sys.argv[2]}-full.webp')
