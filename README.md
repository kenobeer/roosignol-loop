# Rossignol LOOP microsite

Static site (plain HTML, CSS and JS, no dependencies, no backend, no external requests). Production: https://roosignol-loop.vercel.app/

## Change the numbers
Open `public/index.html` and edit the `CONFIG` block at the top of the `<script>`:

| Setting | Meaning |
| --- | --- |
| `feePerDay` | EUR per pair per rental day (3) |
| `daysPerSeason` | Rental days per season in the ski passport (60) |
| `seasons`, `carbonSeason` | Passport length (5) and the season of the carbon fibre repair (3) |
| `defaultPairs`, `defaultDays` | Calculator defaults (80 pairs, 20 days per month) |
| `defaultPrice` | Purchase price per pair, an assumption (300) |
| `winters` | Winter quality names and factors. The factors are assumptions |

Copy that mentions numbers (for example "EUR 4,800" in the formula note and the "1/5 to 1/3" text) is plain text in the HTML, so search for it if you change the defaults.

Passport totals: `daysPerSeason × feePerDay × seasons` (60 × 3 × 5 = EUR 900). Calculator: `pairs × days × feePerDay × winter factor` (80 × 20 × 3 × 1 = EUR 4,800).

## Different ski IDs
Open the site with `?id=LOOP-0428` (letters, digits, hyphen, up to 16 characters). Without it the ID is `LOOP-0427`.

## QR code and printable card
`print/qr.svg` and `print/qr.png` (2000 px) encode the exact production URL. `print/card-LOOP-0427.html` is an A6 card: open it in a browser and print (turn on background graphics).

Make more cards, or change the URL:

    cd tools && npm install
    node make-card.mjs LOOP-0428            # writes ../print/card-LOOP-0428.html with a ?id=LOOP-0428 QR code
    node make-card.mjs LOOP-0427 https://your-new-url/   # new URL, rewrites qr.svg, qr.png and the card

## Redeploy
Needs the Vercel CLI (`npm i -g vercel`) and `vercel login`.

    vercel deploy --prod --yes

The project is linked to `roosignol-loop` (see `.vercel`, not committed). Config is in `vercel.json` (serves `public/`). The `.vercel.app` production URL has no login. If you move to another Vercel team, check Project Settings, Deployment Protection, so that production stays public.

## Offline
Everything is inline in one HTML file. A small service worker (`public/sw.js`) caches the page after the first visit over HTTPS. Without it, the page still works once loaded.

## Test
`node tools/test.mjs [url]` drives the page in headless Chrome at phone size (needs Google Chrome on macOS and `npm install` in `tools`).
