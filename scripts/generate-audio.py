"""Build optional static neural MP3 narration with local Piper, without API keys.

Install generator-only dependencies (they are never shipped to the website):
  python -m pip install --target .qa/piper-deps piper-tts==1.8.0 imageio-ffmpeg==0.6.0 mutagen==1.48.1
Generate recordings from the exact published transcripts:
  python scripts/generate-audio.py

French, Spanish and English models have documented open dataset licenses.
Arabic uses browser speech synthesis until an appropriately licensed local model
is selected. Models, Python packages and intermediate WAVs stay under ignored .qa.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import subprocess
import sys
import urllib.request
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
for directory in ['tts-deps', 'piper-deps']:
    candidate = ROOT / '.qa' / directory
    if candidate.exists():
        sys.path.insert(0, str(candidate))

VOICE_REVISION = 'c10ece1aade47bb51c153c893d14e5bf8e5b7117'
VOICE_BASE = f'https://huggingface.co/rhasspy/piper-voices/resolve/{VOICE_REVISION}'
VOICES = {
    'fr': {
        'name': 'fr_FR-siwis-medium', 'directory': 'fr/fr_FR/siwis/medium',
        'license': 'CC BY 4.0',
        'attribution': 'SIWIS: Junichi Yamagishi, Pierre-Edouard Honnet, Philip Garner, Alexandros Lazaridis; Piper voice by Michael Hansen / Rhasspy.',
    },
    'es': {
        'name': 'es_ES-davefx-medium', 'directory': 'es/es_ES/davefx/medium',
        'license': 'CC0',
        'attribution': 'DaveFX voice dataset, OHF-Voice; Piper voice by Michael Hansen / Rhasspy.',
    },
    'en': {
        'name': 'en_GB-alba-medium', 'directory': 'en/en_GB/alba/medium',
        'license': 'CC BY 4.0',
        'attribution': 'Alba speech corpus: Cassia Valentini-Botinhao, Junichi Yamagishi, University of Edinburgh; Piper voice by Michael Hansen / Rhasspy.',
    },
}


def node_json(source: str):
    completed = subprocess.run(
        ['node', '--input-type=module', '-e', source],
        cwd=ROOT, check=True, capture_output=True, encoding='utf-8',
    )
    return json.loads(completed.stdout)


def load_stories(path: Path | None):
    if path:
        return json.loads(path.read_text(encoding='utf-8'))
    return node_json(
        "import { audioStories } from './dist/audio-stories.js'; "
        "process.stdout.write(JSON.stringify(audioStories));"
    )


def load_manifest():
    if not (ROOT / 'dist' / 'audio-recordings.js').exists():
        return {}
    return node_json(
        "import { audioRecordings } from './dist/audio-recordings.js'; "
        "process.stdout.write(JSON.stringify(audioRecordings));"
    )


def download_voice(language: str, directory: Path):
    configuration = VOICES[language]
    directory.mkdir(parents=True, exist_ok=True)
    model_name = configuration['name'] + '.onnx'
    for filename in [model_name, model_name + '.json', 'MODEL_CARD']:
        destination = directory / (configuration['name'] + '-MODEL_CARD' if filename == 'MODEL_CARD' else filename)
        if destination.exists() and destination.stat().st_size > 0:
            continue
        url = f"{VOICE_BASE}/{configuration['directory']}/{filename}"
        temporary = destination.with_suffix(destination.suffix + '.part')
        print(f'Downloading {language}/{filename}', flush=True)
        with urllib.request.urlopen(url, timeout=90) as response, temporary.open('wb') as output:
            while block := response.read(1024 * 1024):
                output.write(block)
        temporary.replace(destination)
    return directory / model_name


def generate(args):
    try:
        from piper import PiperVoice, SynthesisConfig
        from mutagen.mp3 import MP3
        import imageio_ffmpeg
    except ImportError:
        print('Install optional piper-tts==1.8.0, imageio-ffmpeg==0.6.0 and mutagen==1.48.1 first.', file=sys.stderr)
        return 1

    stories = load_stories(args.stories_json)
    manifest = load_manifest()
    languages = [args.language] if args.language else list(VOICES)
    selected = [story for story in stories if not args.story or story['id'] == args.story]
    if not selected:
        raise ValueError('No matching story was found.')
    staging = ROOT / '.qa' / 'audio-build'
    staging.mkdir(parents=True, exist_ok=True)
    models = ROOT / '.qa' / 'piper-models' / VOICE_REVISION
    output_directory = ROOT / 'dist' / 'assets' / 'audio'
    encoder = imageio_ffmpeg.get_ffmpeg_exe()
    synthesis = SynthesisConfig(length_scale=args.length_scale, volume=0.85)
    generated = 0

    for language in languages:
        pending = []
        for story in selected:
            story_id = story['id']
            if not story_id or any(character not in 'abcdefghijklmnopqrstuvwxyz0123456789-' for character in story_id):
                raise ValueError('Unsafe story identifier.')
            paragraphs = story['paragraphs'][language]
            if not paragraphs or not all(isinstance(part, str) and part.strip() for part in paragraphs):
                raise ValueError(f'Missing transcript: {story_id}/{language}')
            digest = hashlib.sha256('\n\n'.join(paragraphs).encode('utf-8')).hexdigest()
            previous = manifest.get(story_id, {}).get(language)
            if previous and not args.force and previous.get('transcriptHash') == digest and previous.get('voice') == VOICES[language]['name']:
                existing = ROOT / 'dist' / previous['src']
                if existing.is_file() and MP3(existing).info.length > 0:
                    print(f'Reusing {story_id}/{language}', flush=True)
                    continue
            pending.append((story_id, paragraphs, digest))
        if not pending:
            continue
        model = download_voice(language, models)
        model_hash = hashlib.sha256(model.read_bytes()).hexdigest()
        voice = PiperVoice.load(str(model), download_dir=staging)
        print(f'Loaded {VOICES[language]["name"]}', flush=True)
        for story_id, paragraphs, digest in pending:
            wav = staging / f'{story_id}-{language}.wav'
            temporary = staging / f'{story_id}-{language}.mp3'
            with wave.open(str(wav), 'wb') as output:
                output.setframerate(voice.config.sample_rate)
                output.setsampwidth(2)
                output.setnchannels(1)
                output.writeframes(b'\x00\x00' * round(voice.config.sample_rate * 0.18))
                for index, paragraph in enumerate(paragraphs):
                    voice.synthesize_wav(paragraph, output, syn_config=synthesis, set_wav_format=False)
                    pause = 0.65 if index < len(paragraphs) - 1 else 0.3
                    output.writeframes(b'\x00\x00' * round(voice.config.sample_rate * pause))
            subprocess.run([
                encoder, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(wav),
                '-af', 'loudnorm=I=-18:TP=-2:LRA=7', '-ar', '22050', '-ac', '1',
                '-codec:a', 'libmp3lame', '-b:a', '64k', str(temporary),
            ], check=True, timeout=60)
            duration = float(MP3(temporary).info.length)
            if duration <= 5 or temporary.stat().st_size < 1000:
                raise ValueError('Incomplete MP3 output.')
            output_directory.mkdir(parents=True, exist_ok=True)
            destination = output_directory / temporary.name
            shutil.copyfile(temporary, destination)
            manifest.setdefault(story_id, {})[language] = {
                'src': f'assets/audio/{destination.name}', 'duration': round(duration, 3),
                'voice': VOICES[language]['name'], 'engine': 'Piper',
                'license': VOICES[language]['license'], 'attribution': VOICES[language]['attribution'],
                'transcriptHash': digest, 'modelRevision': VOICE_REVISION, 'modelSha256': model_hash,
            }
            serialized = json.dumps(manifest, ensure_ascii=False, indent=2, sort_keys=True)
            temporary_manifest = staging / 'audio-recordings.js.part'
            temporary_manifest.write_text(
                '// Generated by scripts/generate-audio.py. Durations are decoded MP3 lengths.\n'
                + 'export const audioRecordings = ' + serialized + ';\n', encoding='utf-8',
            )
            temporary_manifest.replace(ROOT / 'dist' / 'audio-recordings.js')
            generated += 1
            print(f'Generated {story_id}/{language}: {duration:.3f}s, {destination.stat().st_size} bytes', flush=True)
        del voice
    print(f'Completed: {generated} bundled MP3s generated. Arabic uses browser speech synthesis.', flush=True)
    return 0


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--stories-json', type=Path, help='Optional transcript JSON instead of Node module export.')
    parser.add_argument('--language', choices=list(VOICES), help='Generate one language only.')
    parser.add_argument('--story', help='Generate one story identifier only.')
    parser.add_argument('--length-scale', type=float, default=1.12, help='Speaking duration multiplier, default 1.12.')
    parser.add_argument('--force', action='store_true', help='Regenerate matching existing audio.')
    args = parser.parse_args()
    if not 0.5 <= args.length_scale <= 2:
        parser.error('--length-scale must be between 0.5 and 2.')
    try:
        result = generate(args)
    except (OSError, ValueError, KeyError, subprocess.CalledProcessError) as error:
        print('Generator could not produce valid audio: ' + type(error).__name__, file=sys.stderr)
        result = 1
    raise SystemExit(result)


if __name__ == '__main__':
    main()
