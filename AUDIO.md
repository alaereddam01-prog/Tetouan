# Voices of Tétouan: narration and credits

The listening scripts in `dist/audio-stories.js` are original C-Tetouan text. Each
story lists the factual sources used for its historical claims. The supplied
French, Spanish and English MP3s are synthetic narration generated locally with
[Piper](https://github.com/OHF-Voice/piper1-gpl), not recordings of a human guide.
No API key, remote synthesis call or Python runtime is required to play them.

The initial collection contains **15 MP3s**: five stories in each recorded
language, totaling 5,503,487 bytes and 687.464 seconds. Individual tracks run
between 40.960 and 51.670 seconds. Their metadata hashes match the final published
transcripts, including the revised El Feddan paragraph.

## Voice attribution

The Piper voice models are published by Michael Hansen / Rhasspy in the
[Piper voices repository](https://huggingface.co/rhasspy/piper-voices). The exact
model source revision is `c10ece1aade47bb51c153c893d14e5bf8e5b7117`.
Individual model cards identify the training datasets and their licenses:

- **French — `fr_FR-siwis-medium`.** The SIWIS French Speech Synthesis Database,
  by Junichi Yamagishi, Pierre-Edouard Honnet, Philip Garner and Alexandros
  Lazaridis (2017), University of Edinburgh, Centre for Speech Technology
  Research. Dataset [source](https://doi.org/10.7488/ds/1705).
  [Model card](https://huggingface.co/rhasspy/piper-voices/blob/c10ece1aade47bb51c153c893d14e5bf8e5b7117/fr/fr_FR/siwis/medium/MODEL_CARD):
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- **Spanish — `es_ES-davefx-medium`.** DaveFX speech dataset, OHF-Voice.
  [Dataset source](https://github.com/OHF-Voice/voice-datasets).
  [Model card](https://huggingface.co/rhasspy/piper-voices/blob/c10ece1aade47bb51c153c893d14e5bf8e5b7117/es/es_ES/davefx/medium/MODEL_CARD):
  [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
- **English — `en_GB-alba-medium`.** Alba speech corpus, Cassia
  Valentini-Botinhao and Junichi Yamagishi (2019), University of Edinburgh.
  Dataset [source](https://doi.org/10.7488/ds/2506).
  [Model card](https://huggingface.co/rhasspy/piper-voices/blob/c10ece1aade47bb51c153c893d14e5bf8e5b7117/en/en_GB/alba/medium/MODEL_CARD):
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

These voices were applied to newly written narration, slowed with a 1.12 duration
multiplier, separated by short paragraph pauses, normalized for speech and encoded
as mono 22.05 kHz / 64 kbit/s MP3. The voice models and original training
recordings are not included in this website. The metadata records actual decoded
MP3 durations, the transcript SHA-256 and the downloaded model SHA-256.

## Arabic and browser fallback

Arabic is supported through the visitor's browser speech synthesis, with an Arabic
voice selected when available. The proposed `ar_JO-kareem-medium` model was not
used: its [model card](https://huggingface.co/rhasspy/piper-voices/blob/c10ece1aade47bb51c153c893d14e5bf8e5b7117/ar/ar_JO/kareem/medium/MODEL_CARD)
points to a training repository without a clear dataset license. We do not infer
permission from the repository's general model license label.

The [edge-tts](https://github.com/rany2/edge-tts) neural voice catalogue confirmed
French Denise, Spanish Elvira, English Sonia and Moroccan Arabic Mouna. Actual
synthesis was unavailable during preparation on 10 October 2026: repeated
requests received HTTP 403. No Edge recording or broken MP3 reference is shipped.

Browser speech synthesis also acts as the fallback for a missing or failed
recording. Voice quality and availability depend on the browser and installed
language voices. The interface should keep the complete transcript available
when a matching voice cannot be found.

## Regeneration

Optional build tools: `piper-tts==1.8.0`, `imageio-ffmpeg==0.6.0`,
`mutagen==1.48.1`. Piper's engine is GPL-3.0; these build tools and the voice models
remain in ignored `.qa/` and are not deployed with the static website.

```sh
python -m pip install --target .qa/piper-deps piper-tts==1.8.0 imageio-ffmpeg==0.6.0 mutagen==1.48.1
python scripts/generate-audio.py
```

The generator consumes the exact four-language story module through Node, or an
explicit `--stories-json` file, and writes `dist/assets/audio/` plus
`dist/audio-recordings.js`. Use `--language fr`, `--story medina` or `--force` for
focused regeneration. Existing recordings are reused only when their transcript
hash and voice identifier match. A future Arabic recording can be added after
its source and license are verified.
