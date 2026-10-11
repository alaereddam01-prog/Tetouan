# MAT editorial data and image provenance

Checked on **10 October 2026**. `dist/football-data.js` contains original French, Arabic, English and Spanish editorial text. Leadership has dated primary citations; the static website does not claim to provide a live sporting feed.

## Leadership

| Role | Name | Appointment | Latest primary confirmation used |
| --- | --- | --- | --- |
| First-team coach | Amine El Karma — أمين كرمة | 5 September 2026, renewable one-season contract | MAT first-team report, 19 September 2026 |
| President | Mohamed Jedaouni — محمد جدعوني | Elected at the 24 August 2026 assembly | MAT sponsorship announcement, 18 September 2026 |

Primary club pages are linked in the exported `leadership`, `sources`, and `appointmentSource` fields. Public WordPress REST responses were inspected and cached in the ignored `.qa/` directory, including original publication dates and complete official text. The current official website front page was also checked. Older club pages and secondary football databases still show Youssef Azeroual, Khalid Fouhami, Sergio Lobera and other former officials; those stale names are not used as the present leadership.

The club's official photograph of the coach's presentation is available as `leadershipPhoto`. It shows Mohamed Jedaouni on the left and Amine El Karma on the right. Its original dimensions are **2048 × 1152**. The named people are confirmed by the article accompanying the photograph and the shirt bearing Amine El Karma's name.

## Current badge

`dist/assets/football/mat-current.png` is an unchanged **192 × 192** transparent PNG distributed by [FotMob](https://images.fotmob.com/image_resources/logo/teamlogo/102044.png). It depicts the modern MOGHREB ATLETICO / TETUAN shield with its mosque, palm, moon, red-and-white stripes and Moroccan star.

The design was visually matched against the crest in the club's **5 September 2026** coach presentation photograph, particularly the large background shield and club flag. That primary verification page is the exported `crest.source`; the exact PNG distributor URL is retained separately as `crest.downloadSource`. The badge is a club mark, and its rights remain with the club and relevant rights holders. No Creative Commons license is asserted.

The existing `mat-crest.png` and `mat-crest.jpg` originated from **2017** club media and depict an older shield. The official website's `logo-web.png` header also continues to show this older mark. A freshly checked official header does not by itself establish that its graphic is the club's latest crest. The new asset updates the page to the modern shield visible in current club media; it is not an invented redesign or an AI reconstruction.

## Three distinct stadium photographs

These are **remote images from the official club's public media**, not downloaded photographs shipped in the site bundle. They retain the exact source URL, caption, publisher credit, date and dimensions in the exported metadata. The MAT website states that all rights are reserved to the club. The photographer is not individually credited, so the attribution says that plainly. No open reuse license, Full HD quality, or claim of current stadium condition is invented.

| Photograph | Original dimensions | Verification |
| --- | --- | --- |
| Stadium panorama after repairs, December 2017 | 1440 × 960 | [Official readiness announcement](https://www.matfoot.com/2481-2/), 24 December 2017 |
| Players celebrating in front of the stands, 15 May 2026 | 1296 × 864 | Official MAT Throne Cup match report, published 16 May 2026; article explicitly identifies Saniat Rmel and the match date |
| North derby action near the benches, 14 April 2025 | 1280 × 853 | Official MAT–Ittihad Tanger match report, published 14 April 2025; article explicitly identifies Saniat Rmel |

The exact original image URLs are:

- [2017 stadium panorama](https://www.matfoot.com/wp-content/uploads/2017/12/FB_IMG_1514128819429.jpg)
- [2026 cup-match view](https://www.matfoot.com/wp-content/uploads/2026/05/m-at.jpeg)
- [2025 derby view](https://www.matfoot.com/wp-content/uploads/2025/04/IMG-20250414-WA0001.jpg)

All three were opened and visually inspected. They are genuinely different photographs, show identifiable Saniat Rmel features, and are captioned for their documented period. No crop, upscale, compositing or pixel editing was performed. Local copies used solely for inspection remain in ignored `.qa/football-images/`.

The accessible Commons panorama is only **638 × 324**. It is not included as a substitute for a premium image and is not enlarged to imply Full HD. Flickr stadium photographs found during research were All Rights Reserved and were not downloaded into the public project. The official club's 2026 homepage also contains files explicitly named “ChatGPT Image”; these are not used as documentary stadium photographs or as evidence for a badge redesign.

## Stadium history

The [official Athletic Club match archive](https://www.athletic-club.eus/en/teams/athletic-club/1951-52/matches/1_477/) places Atlético Tetuán–Athletic Club at **Sania Ramel, Tetuán, on 24 February 1952**, with a **1–2** result. This supports the stadium's connection with the 1951–52 Spanish top-division season without asserting that the old Atlético Tetuán and modern MAT are the same legal club.

The [MAT announcement of 24 December 2017](https://www.matfoot.com/2481-2/) states that Saniat Rmel was ready again for the northern derby following repairs to its facilities, pitch and equipment. This is used directly rather than the conflicting January 2018 reopening dates repeated by secondary pages.

Secondary sources disagree about capacity and construction dates; several repeat an unsupported identification of Marqués de Varela as the engineer. No exact capacity, architect, opening year or “oldest stadium in Africa” claim is included without suitable primary evidence. The verified 1952 match and 2017 renovation offer concrete stadium history.

The 2012 and 2014 national titles remain football content. They do not belong in the separate city-history timeline.
