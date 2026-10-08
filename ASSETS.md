# Additional asset provenance

All city photographs are real and individually credited on the website’s Sources page. Optimized photographs preserve at least 1920 × 1080 real pixels; ultra-wide panoramas retain their proportions. `scripts/check.mjs` reads actual JPEG frame dimensions.

| Asset | Author | Source | Rights |
| --- | --- | --- | --- |
| `craft.jpg` | Ekaterina Kvelidze | [Sewing workshop in the street of Tetouan](https://commons.wikimedia.org/wiki/File:Sewing_workshop_in_the_street_of_Tetouan.jpg) | CC BY-SA 4.0 |
| `martil.jpg` | FayssalF | [Corniche martil](https://commons.wikimedia.org/wiki/File:Corniche_martil.jpg) | CC BY-SA 4.0 |
| `panorama.jpg` | Felipe Moreno Baquero | [Tetuan desde el Dersa](https://commons.wikimedia.org/wiki/File:Tetuan_desde_el_Dersa.jpg) | CC BY-SA 4.0 |
| `mat-crest.jpg` | Official club website | [Official MAT identity graphic](https://www.matfoot.com/wp-content/uploads/2017/09/%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A7%D9%84%D9%85%D8%A7%D8%B7.jpg) | Club mark; rights retained by owner, no CC license stated |
| `mat-crest.png` | Official club website | [Official small crest](https://www.matfoot.com/wp-content/uploads/2017/06/logomatfoot-footer.png) | Club mark; rights retained by owner |
| `doves.png` | OpenAI ImageGen | Generated for this project | Decorative illustration, not a photograph |

The low-resolution stadium photograph was removed. Football content uses a correctly captioned general city view and the authentic official crest. No verified Full HD photograph of Taboula or Jamaa Mezouak was found; their photographs are explicitly labelled as general city illustrations.

## Dove artwork prompt

Generated once using the built-in `image_gen` tool with `transparent_background: true`, then inspected for transparency. The original PNG is 1774 × 887 and is copied unchanged into the website.

```text
Use case: stylized-concept
Asset type: subtle transparent background accent for a Tetouan, Morocco tourism website; the flock will be animated softly at low opacity over a light page.
Primary request: a graceful loose flock of exactly 6 flying pigeons/doves as refined flat silhouettes.
Scene/backdrop: genuinely transparent background with alpha; no background surface.
Subject: six recognizable pigeons/doves viewed from below, with varied realistic wing poses and natural feather shapes.
Style/medium: clean elegant flat silhouette artwork; solid deep forest-green birds, color #143e34.
Composition/framing: wide, airy diagonal composition with generous transparent spacing between birds; every bird entirely in frame.
Constraints: preserve visual recognizability as pigeons/doves; clean edges; no text.
Avoid: white paper, scenery, floor, shadows, letters, outlines, logos, watermark.
```
