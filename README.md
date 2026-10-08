# Tétouan — La ville qui se raconte

A complete bilingual travel and cultural guide to Tétouan, Morocco. An editorial design, real credited photography, and accessible motion connect the medina, the modern city, its history and local football.

## Explore

- 12 districts and sectors, with explanations of what draws visitors.
- 30 detailed French and Arabic entries, including landmarks, crafts and five documented stories.
- A historical timeline covering migration, the 1860 conflict, the protectorate and the regional Rif War.
- The Moghreb de Tétouan, its 2012 and 2014 championships, and the historical Atlético Tetuán.
- 12 photographs, a gallery with enlarged views, source links and photographer credits.
- Search across both languages, category filters, saved places and three downloadable itineraries.
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

The checks validate local assets, bilingual content, itinerary references and JavaScript syntax.

## Project structure

| File | Purpose |
| --- | --- |
| `dist/index.html` | Document metadata and accessible application containers |
| `dist/main.js` | Navigation, bilingual rendering, search, dialogs and itinerary downloads |
| `dist/data.js` | All editorial content, sources and photograph attribution |
| `dist/app.js` | Shared SVG interface icons and wordmark |
| `dist/styles.css` | Visual identity, responsive layouts, RTL, animations and print styles |
| `dist/assets/` | Locally stored, compressed photographs |
| `scripts/server.mjs` | Dependency-free local static server |
| `scripts/check.mjs` | Content and asset validation |

The `dist` directory is the authored static website, not disposable build output. Serve it with any static host. Hash-based navigation works without server rewrite rules. `.openai/hosting.json` identifies the owner's Sites deployment; remove its project identity when making an independent deployment.

## Editing

Add or update entries in `dist/data.js`. Each entry includes French and Arabic text, a photograph identifier, practical visit notes, and the references that support factual claims. Add route stops using existing entry identifiers. Preserve image attribution and distinguish an illustrative medina photograph from the exact location of a building or district.

Favorites and language preferences are stored only in the visitor's browser. There are no accounts, analytics, reservations, payment forms, live football scores or external database.

## Editorial sources

The site links to UNESCO, the Moroccan National Tourist Office, the Fondation Nationale des Musées, Dar El Oddi, El legado andalusí, historical research, the Museu Nacional d’Art de Catalunya, FIFA and Médias24. Secondary sources are identified in the source page. Practical information such as opening hours, match schedules and access conditions must be checked with the relevant venue. Suggested walks are editorial plans, not GPS navigation.

Content reviewed on 8 October 2026. The independent guide is not affiliated with UNESCO, the tourism office or the football clubs.

## Photography and fonts

Photographs are from Wikimedia Commons, under their individually recorded Creative Commons licenses. Authors and license links are in `dist/data.js` and the Sources page. Images were resized and compressed; the display may crop them. The permissions associated with photographs are separate from the website code.

The stylesheet loads DM Sans, Playfair Display and Noto Sans Arabic from Google Fonts, with local system fallbacks. The website's photographs and scripts are local.

`scripts/download-photos.mjs` and `scripts/optimize-photos.py` document the optional asset preparation flow. Optimization requires Pillow; it is not necessary for running the website. Original source files and QA screenshots stay outside tracked website files.

## Validation

The release was checked in Microsoft Edge on desktop and a 390px mobile viewport. Browser checks exercise routes, filters, Arabic search, details and keyboard closing, saved-place persistence, itinerary downloads, enlarged photos and the RTL language switch. Local image loading and JavaScript error handling are checked as well.
