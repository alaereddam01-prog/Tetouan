# Explore Tétouan — Interactive City Map

The map extends C-Tetouan's existing static site. It shares the place directory, four-language text, photograph credits, saved places, itineraries and persistent audio controller. It needs no backend, paid API key or runtime package installation.

## Implementation

| File | Responsibility |
| --- | --- |
| `dist/city-map.js` | Map lifecycle, local search, filters, markers, previews, itinerary stops and opt-in geolocation |
| `dist/city-map.css` | Forest-green and cream controls, responsive map layout, fullscreen and mobile location sheet |
| `dist/map-i18n.js` | French, Arabic, English and Spanish map interface |
| `dist/map-config.js` | Tile URL, zoom limit, attribution and provider policy |
| `dist/location-data.js` | Sourced coordinates, point interpretation and exact-place photograph coverage |
| `dist/vendor/leaflet/` | Pinned Leaflet 1.9.4 JavaScript, CSS, images, BSD-2-Clause license and SHA-256 provenance |
| `scripts/vendor-leaflet.mjs` | Reproducible download of the pinned Leaflet release |

[Leaflet 1.9.4](https://github.com/Leaflet/Leaflet/tree/v1.9.4) is vendored locally. Only its script loads when the visitor opens the map; the application does not depend on a JavaScript CDN at runtime. A shared load promise avoids loading the library again on every visit.

Navigation destroys the previous Leaflet instance before replacing the page. The map removes its observers, document keyboard handler and geolocation overlay when it unmounts. A generation token rejects asynchronous work belonging to an earlier page. The latest viewport remains in memory for a later visit.

## Coordinates and photographs

Every displayed place must have a finite latitude and longitude in the legal range and an HTTPS source in `locationRecords`. Each record includes the source name, review date, point type and four-language interpretation. Entries without a verified coordinate remain in the guide and itineraries, but receive no invented map marker.

The records distinguish a site, a neighbourhood label, a street reference and a town-centre reference. A label is not a district boundary. A published mountain point is not a trailhead, and the Martil town-centre point is not a beach entrance. The selected location card displays the relevant qualification and its source.

Source types include published OpenStreetMap objects, the GeoNames Morocco gazetteer, Wikidata coordinate statements and documented photographic GPS. Any Nominatim requests used to research these records were made during content preparation. The visitor's application does not perform runtime geocoding or call Nominatim.

The map reuses the site's `entryImage` function and explicit photograph coverage. A photograph is attached only where its subject is verified. If an exact-place photograph is unavailable, a labelled placeholder appears rather than a generic view presented as that place. Captions, source links, authors, licenses and actual image dimensions remain in the place gallery and source directory.

Nearby markers may be grouped by their screen-space distance to keep the medina readable. A group icon is anchored at a verified member coordinate and shows the number of represented places. Activating it fits the bounds of those member coordinates. The grouping does not create new geographic records or district centres; its members remain available in the place list.

## Search, navigation and itineraries

Search uses the existing place titles and summaries in all four languages. It runs locally, normalizes Latin accents and Arabic diacritics, and combines with category, saved-place and itinerary filters. Search terms are not sent to a geocoding service.

The map supports these hash routes without server rewrites:

```text
#/map
#/map?place=bab-okla
#/map?route=<existing-itinerary-id>
```

Place links open the existing detail dialog. Narration buttons use the existing Audio Guide; a place without a dedicated chapter links to the audio collection. Favorites use the same `tetouan-saved` browser storage as the rest of the site.

An itinerary displays its existing suggested stops in order, with numbers and a corresponding list. It does not draw straight lines or claim to calculate a pedestrian route. A stop without a verified point remains accessible in the itinerary page. “Get directions” opens Google Maps with the verified destination coordinate; the external service determines the street route.

The selected site language supplies map labels and place content. Arabic uses the site's RTL layout. Language rendering should preserve the visitor's current map interaction; an incoming place or itinerary URL is navigation intent, rather than an instruction to replay whenever labels change.

## Location and browser storage

Geolocation is requested only after the visitor activates “Locate me.” Browsers may require HTTPS and permission. Denial, unsupported browsers, timeout and other failures produce a localized status while the place directory remains usable.

The returned position and accuracy circle are shown only in the current map session. The application does not persist, upload or share that position with an application backend. The provider still receives normal tile requests for the viewport shown in the browser.

Map search, filters, selection and viewport use in-memory state. Favorites and the selected website language use existing local browser storage. There is no account-based synchronization of these preferences.

## OpenStreetMap tile usage

The default provider is the standard OpenStreetMap raster service:

```text
https://tile.openstreetmap.org/{z}/{x}/{y}.png
```

Its visible attribution links to [OpenStreetMap's copyright page](https://www.openstreetmap.org/copyright). The implementation follows the [OpenStreetMap tile usage policy](https://operations.osmfoundation.org/policies/tiles/):

- Tile requests go directly from the browser using its normal User-Agent and Referer.
- The browser honors the provider's ordinary HTTP caching headers; the application does not add cache-busting or no-cache headers.
- There is no tile proxy, offline download, bulk fetch, speculative itinerary tile download or application-level prefetch.
- `updateWhenIdle: true` and a small `keepBuffer` keep normal navigation modest.
- Attribution remains visible above the selected location sheet.

The standard tile service has limited capacity and no availability guarantee. Tile failures display a retry status without removing the sourced marker list or location cards. A library load failure also leaves place cards and external directions usable. For a substantially larger audience, choose another suitable provider in `map-config.js`, and update attribution and usage requirements with the URL.

## Accessibility and responsive behavior

Map controls, search, categories and location actions have localized accessible names. The place list provides a keyboard alternative to selecting a marker. Markers support Enter and Space; the map supports arrow-key panning and the Leaflet zoom controls. Selected cards expose an accessible heading, and status messages use a live region.

Mobile uses a fullscreen map and an expandable location sheet. A visible handle supports touch gestures and an ordinary button action. Fullscreen keeps its controls and the persistent audio mini-player accessible, and respects reduced-motion preferences. Location permission is unrelated to opening fullscreen.

## Verification without automated tile traffic

Automated browser checks must intercept `https://tile.openstreetmap.org/**` and fulfill requests with a local image fixture before opening, panning or zooming the map. This permits testing real Leaflet behavior without generating automated public tile traffic. Removing the fixture or deliberately failing it tests the localized tile-error and retry interfaces. Library failure can be tested by intercepting the local Leaflet script.

Test the following with fixtures on desktop, mobile portrait, tablet and short landscape viewports:

- All four languages, Arabic RTL, language changes after selecting a different place or itinerary, and navigation away and back.
- Search, each category, no-results state, saved filters, marker groups, marker keyboard activation and source links.
- Place dialogs, shared favorites, existing audio playback and mini-player persistence.
- Fullscreen entry/exit, Escape, focus recovery, touch-sheet expand/collapse, sidebar selection and visible attribution.
- Geolocation absent, denied and successful, with no request before its button is activated and no stale callback after navigation.
- Tile failures, library failures, retry, rapid retry and repeated page mounting without duplicate map containers.

A separate brief, visible manual check may confirm live tiles with normal browsing. The automated fixture checks do not establish the live provider's availability or replace factual coordinate verification.
