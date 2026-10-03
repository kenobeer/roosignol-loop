# Rossignol LOOP microsite

Static site (plain HTML, CSS and JS, no dependencies, no backend, no external requests). Production: https://roosignol-loop.vercel.app/

What is on the page: a hero with the animated LOOP circle, then three tabs.

1. Follow one ski: one button, one big number, one digital ski passport. Each press is one winter, and a stamp lands on the passport.
2. The shop: a rental shop scene with a weather dial, a rack of skis and the monthly fee.
3. Turbine blade: what happens to each part of a wind turbine blade.

## Change the numbers
Open `public/index.html` and edit the `CONFIG` block at the top of the main `<script>`:

| Setting | Meaning |
| --- | --- |
| `feePerDay` | EUR per pair per rental day in the passport (3, Performance class, illustrative) |
| `busyDays`, `quietDays` | Rental days per winter for the busy and quiet switch in the "Show the math" sheet (60, 30) |
| `seasons`, `carbonSeason` | Number of winters in the passport (5) and the winter of the carbon fibre repair (3). The five stamps are drawn for exactly these defaults, so changing them also needs changes to the stamps in the `STAMPS` array |
| `defaultId` | Default ski ID (LOOP-0427) |
| `pairs`, `pairsPerIcon`, `daysPerMonth` | Shop fleet (80 pairs, shown as 20 icons of 4) and normal rental days a month (20) |
| `classes`, `defaultClass` | Ski classes and their fee per day (Standard 2, Performance 3, Premium 4). Section 2 only |
| `dayPrice` | Day rental price per pair, an illustrative assumption (17.60). Section 2 only |
| `weather` | Weather steps and their share of normal rental days (10%, 50%, 100%, 130%), an illustration |

Passport total: `fee x days x winters` (3 x 60 x 5 = EUR 900 busy, 3 x 30 x 5 = EUR 450 quiet). Each winter drops 6 coins into the jar, so the jar holds 30 coins after 5 winters whatever the mode. Shop: `pairs x days x weather factor x fee` (80 x 20 x 100% x 3 = EUR 4,800). Both formulas are shown under "Show the math". The passport fee does not follow the ski class chips in section 2.

Copy that quotes numbers (for example "3 to 5 winters", "EUR 3 per rental day") is plain text in the HTML, so search for it if you change the defaults.

## Different ski IDs
Open the site with `?id=LOOP-0428` (letters, digits, hyphen, up to 16 characters). Without it the ID is `LOOP-0427`.

## QR code and printable card
`print/qr.svg` and `print/qr.png` (2000 px) encode the exact production URL. `print/card-LOOP-0427.html` is an A6 card with the line "Scan: follow one ski through 5 winters" and the ski ID. Open it in a browser and print (turn on background graphics).

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

## Reduced motion
With the system setting "reduce motion", nothing animates by itself: the cover opens instantly, stamps appear without movement, counters jump to their value. All buttons still work.

## Ink effect on stamps
Stamps use one shared SVG filter for worn ink. On devices that report 4 or fewer CPU cores or 3 GB or less memory, a static speckle mask is used instead (`lite` in the script).

## Test
Needs Google Chrome on macOS and `npm install` in `tools`. Each script drives the page in headless Chrome at phone size and prints what it finds.

    node tools/test-passport.mjs <url> <screenshot-dir> [640|844] [rm]   # section 1: fit in the viewport, 6 button presses, 900 and 450 totals, sheet, quiet switch
    node tools/test-shop.mjs <url> [rm]                                   # section 2: EUR 4,800 default, rack tap shows +EUR 12
    node tools/verify.mjs                                                 # QR code decodes to the production URL, private window, offline reload

`<url>` can be the production URL or `file:///.../public/index.html`. Pass `rm` for reduced motion.
