# Tétouan — La ville qui se raconte

A travel and cultural guide to Tétouan in French, Arabic, English and Spanish. An editorial design, real credited photography, and accessible motion connect the medina, the modern city, its history and local football.

## Explore

- 19 districts and sectors, including Taboula, Jamaa Mezouak, Mhannech, Boujarrah, Touibla/Touilaa, Samsa and Sidi Bahrouri.
- 37 entries in four languages, including landmarks, crafts and five documented stories.
- A historical timeline covering migration, the 1860 conflict, the protectorate and the regional Rif War.
- The Moghreb de Tétouan, its 2012 and 2014 championships, and the historical Atlético Tetuán.
- The current MAT badge matched against official September 2026 club photographs, sourced stadium history and three distinct stadium views. Coach Amine El Karma and president Mohamed Jedaouni have dated official confirmations. [Club provenance](FOOTBALL.md).
- 11 original Full HD photographs plus 32 additional exact-site images with truthful individual resolutions and credits. All seven attraction entries have at least three distinct pictures. Unverified district photographs are explicitly unavailable rather than replaced with a misleading city view. [Location provenance](LOCATIONS.md).
- 22 personalities with distinct credited portraits or explicitly labelled historical documents, multilingual biographies and city connections. YouTube videos and Cheqara’s Spotify album load on request inside the guide. [Portrait and media provenance](PEOPLE.md).
- Explore Tétouan — Interactive City Map: Leaflet 1.9.4, 22 verified geographic references, local search, category/saved filters, numbered itinerary stops, shared audio and favorites, external street directions, and opt-in geolocation. Mobile fullscreen, a sliding location sheet, keyboard controls and loading/retry fallbacks are included. [Map implementation and provider policy](CITY-MAP.md).
- A searchable directory of 25 bus route labels, with sources and a review date; practical visitor information.
- Search across four languages, category filters, saved places and three downloadable itineraries.
- Owner contact cards with platform icons: [Instagram @alae_rdd](https://www.instagram.com/alae_rdd/), [Facebook Alae Rdd](https://www.facebook.com/alae.rd.587/) and [email](mailto:alae200409rd@gmail.com).
- Transparent dove artwork with gentle background animation.
- Voices of Tétouan: five sourced audio stories, 15 locally generated neural MP3s in French, Spanish and English, and Arabic browser narration. Seek, playback speed, transcripts and a persistent mini-player work across navigation. [Voice credits and regeneration](AUDIO.md).
- Arabic RTL layouts, responsive navigation, keyboard-accessible dialogs and reduced-motion support.

## Run locally

Requires Node.js 20 or newer. No package installation or build step is needed.

```sh
npm run dev
```

Open `http://127.0.0.1:4173`. To use a different port, set the `PORT` environment variable before starting.

```sh
npm run check
```

The checks validate all four languages, actual JPEG dimensions, local assets, bus source metadata, itinerary references and JavaScript syntax.

## Project structure

| File | Purpose |
| --- | --- |
| `dist/index.html` | Document metadata and accessible application containers |
| `dist/main.js` | Navigation, four-language rendering, search, dialogs and itinerary downloads |
| `dist/data.js` | All editorial content, sources and photograph attribution |
| `dist/content-locales.js` | English and Spanish editorial translations |
| `dist/i18n.js` | English and Spanish interface translations |
| `dist/extra-data.js` | Additional districts, references and owner contact |
| `dist/extra-pages.js` | Bus directory and practical visitor pages |
| `dist/photo-dimensions.js` | Verified dimensions of the deployed photographs |
| `dist/audio-guide.js` | Persistent media controller, speech fallback and audio guide interface |
| `dist/audio-stories.js` | Original four-language scripts and historical sources |
| `dist/audio-recordings.js` | Verified narration durations, transcript hashes and attribution |
| `dist/audio-guide.css` | Audio layouts extending the existing visual identity |
| `dist/city-map.js` | Leaflet lifecycle, verified markers, filters, itineraries and location previews |
| `dist/map-config.js` | OpenStreetMap provider attribution and usage configuration |
| `dist/map-i18n.js` | Four-language map interface |
| `dist/location-data.js` | Verified coordinates, exact-site galleries and individual image rights |
| `dist/people-data.js` | Personalities, portrait provenance and selected music |
| `dist/people-feature.js` | Personality collection, profiles and on-demand embedded media |
| `dist/football-data.js` | Dated club leadership, badge and stadium sources |
| `dist/football-feature.js` | Club presentation and stadium gallery |
| `dist/contacts.js` | Accessible owner contact cards and platform icons |
| `dist/city-features.css` | Contacts, portraits, galleries and club layouts |
| `dist/city-map.css` | Map controls, fullscreen mode and responsive location sheet |
| `dist/vendor/leaflet/` | Pinned Leaflet 1.9.4, license and file integrity records |
| `dist/app.js` | Shared SVG interface icons and wordmark |
| `dist/styles.css` | Visual identity, responsive layouts, RTL, animations and print styles |
| `dist/assets/` | Locally stored, compressed photographs |
| `scripts/server.mjs` | Dependency-free local static server |
| `scripts/check.mjs` | Content and asset validation |

The `dist` directory is the authored static website, not disposable build output. Serve it with any static host. Hash-based navigation works without server rewrite rules. `.openai/hosting.json` identifies the owner's Sites deployment; remove its project identity when making an independent deployment.

## Editing

Add or update entries in `dist/data.js` or `dist/extra-data.js`, with corresponding translations in `dist/content-locales.js`. Each entry needs all four languages, a photograph identifier, practical visit notes and factual references. Add route stops using existing entry identifiers. Preserve image attribution and distinguish a general city illustration from the exact location of a district.

Favorites and language preferences are stored only in the visitor's browser. There are no accounts, analytics, reservations, payment forms, live football scores or external database.

## Editorial sources

The site links to UNESCO, the Moroccan National Tourist Office, the Fondation Nationale des Musées, Dar El Oddi, El legado andalusí, historical research, the Museu Nacional d’Art de Catalunya, FIFA and Médias24. Secondary sources are identified in the source page. Practical information such as opening hours, match schedules and access conditions must be checked with the relevant venue. Suggested walks are editorial plans, not GPS navigation.

Original guide reviewed on 8 October 2026; map, portraits, galleries and club additions reviewed on 10–11 October 2026. Each source retains its own date. The independent guide is not affiliated with UNESCO, the tourism office or the football clubs.

### Bus accuracy

CTM’s official 6 May 2026 release confirms the change of name from Issal Madina to Issal Tétouan. The 25 route labels come from the [Moovit directory](https://moovitapp.com/index/fr/transport_en_commun-linesIndex-T%C3%A9touan-1-5505), consulted on 8 October 2026, which retains the previous operator name. A current official route list was not available during verification. These labels are presented as secondary directory information; exact termini may vary by direction. No claim of 100% official accuracy, live service, fares, schedules or frequencies is made. Confirm the displayed route and destination before boarding. The website explains this beside the directory.

## Photography and fonts

Photographs include Wikimedia Commons images under their individual licenses and credited institutional images under their respective rights. Authors, source links, licenses and original dimensions are recorded in the data modules and Sources page. Images may be resized, compressed or cropped for display. Archive portraits and smaller institutional originals are not described as Full HD. The permissions associated with photographs are separate from the website code.

The stylesheet loads DM Sans, Playfair Display and Noto Sans Arabic from Google Fonts, with local system fallbacks. Application scripts, Leaflet and licensed image assets are local. Some credited institutional portraits and exact-site photographs remain hosted by their source; their rights and dimensions are recorded separately. Browser image failures retain an honest unavailable message.

The current MAT badge is an official club mark distributed by FotMob, visually matched against September 2026 photographs on [matfoot.com](https://www.matfoot.com/), and remains the property of its rights holders. It has no stated Creative Commons license; its 192px original is not described as a Full HD photograph. Dove silhouettes are decorative artwork created with OpenAI ImageGen; they do not depict a real location. The exact asset prompt is recorded in `ASSETS.md`.

`scripts/download-photos.mjs` and `scripts/optimize-photos.py` document the optional asset preparation flow. Optimization requires Pillow; it is not necessary for running the website. Original source files and QA screenshots stay outside tracked website files.

## Validation

The release was checked in Microsoft Edge on desktop and mobile viewports. Browser checks exercise the existing guide and new map/personality routes, four-language rendering and search, 19 districts, details and keyboard closing, saved-place persistence, localized itinerary downloads, actual gallery dimensions, bus filtering, owner links, the current crest, responsive navigation and reduced motion. Local image loading and JavaScript errors are checked as well.

Map checks cover verified marker selection, category and saved filters, three itineraries without fabricated street paths, click-only geolocation with permission denial, audio and place integration, keyboard focus, fullscreen navigation, mobile sheets, library/tile failures and recovery. Automated map tests use local tile fixtures; a brief visible browser check verifies real OpenStreetMap rendering and attribution. Personality checks open all 22 profiles and exercise on-demand YouTube and Spotify embeds.

Audio validation plays all 15 MP3s in the browser and checks pause/replay, seeking, speed, place and history launch buttons, navigation persistence and language switching. Layout checks cover 360, 390, 768, 1200 and 1280px widths in all four languages. Controlled speech events verify Arabic fallback, unavailable voices, failed recordings and cancellation without overlapping voices. This device has no installed Arabic voice, so real Arabic pronunciation was not assessed here. Audio progress is exact for recordings and estimated for browser speech.
