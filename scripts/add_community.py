"""Converts the community screenshots into the webp files the page uses.

    python scripts/add_community.py <folder>

<folder> holds gathering.*, active.* and boss.* (png/jpg). Writes src/assets/img/community-<name>-800.webp (cards)
and community-<name>-full.webp (lightbox, at most 1600 px wide). Needs Pillow.
"""
import sys
from pathlib import Path

from PIL import Image

NAMES = ('gathering', 'active', 'boss')
OUT = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'img'


def save(im, width, path):
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(path, quality=82, method=6)
    print(f'{path.name}: {im.width}x{im.height}')


def main(folder):
    for name in NAMES:
        found = [p for p in Path(folder).glob(f'{name}.*') if p.suffix.lower() in ('.png', '.jpg', '.jpeg', '.webp')]
        if not found:
            sys.exit(f'missing {name}.png/.jpg in {folder}')
        im = Image.open(found[0]).convert('RGB')
        save(im, 800, OUT / f'community-{name}-800.webp')
        save(im, 1600, OUT / f'community-{name}-full.webp')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
