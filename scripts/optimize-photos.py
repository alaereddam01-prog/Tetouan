from pathlib import Path
from PIL import Image, ImageOps

for source in Path('.qa/originals').glob('*.jpg'):
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert('RGB')
        image.thumbnail((2000 if source.stem == 'hero' else 1400, 1500), Image.Resampling.LANCZOS)
        target = Path('dist/assets') / source.name
        image.save(target, quality=85, optimize=True, progressive=True)
        print(f'{source.stem}: {image.size}, {target.stat().st_size // 1024} KB')
