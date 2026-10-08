from pathlib import Path
from PIL import Image, ImageOps
import json

# Real pixels only: preserve at least a 1920x1080 envelope, with no upscaling.
# Ultra-wide photographs retain their natural proportions and a 1080px height.
ids = ['hero', 'medina', 'passage', 'daily', 'feddan', 'palace', 'babokla', 'ensanche', 'craft', 'martil', 'panorama']
manifest = {}
for photo_id in ids:
    source = Path('.qa/originals') / f'{photo_id}.jpg'
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert('RGB')
        width, height = image.size
        assert width >= 1920 and height >= 1080, f'{photo_id}: original is below Full HD'
        ratio = width / height
        max_width = max(2560, round(1080 * ratio))
        image.thumbnail((max_width, max(1920, round(1920 / ratio))), Image.Resampling.LANCZOS)
        assert image.width >= 1920 and image.height >= 1080
        target = Path('dist/assets') / source.name
        image.save(target, quality=90, optimize=True, progressive=True)
        manifest[photo_id] = {'width': image.width, 'height': image.height, 'bytes':target.stat().st_size}
        print(f'{source.stem}: {image.size}, {target.stat().st_size // 1024} KB')
Path('dist/assets/photo-dimensions.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
Path('dist/photo-dimensions.js').write_text('export const photoDimensions = ' + json.dumps(manifest, indent=2) + ';\n', encoding='utf-8')
