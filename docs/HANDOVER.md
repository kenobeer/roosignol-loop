# Rossignol LOOP microsite: handover

Written at the end of the build session (2026-10-05). Everything needed to pick this up again, compare it with the project docs, or hand it to someone else.

## 1. Status and links

> **Taken offline on 2026-10-13.** The course is finished, so the Vercel project was paused (`vercel project pause`, not deleted). The URL below now returns a 503. To bring it back: Vercel dashboard, project `roosignol-loop`, Settings, Unpause (or `vercel project unpause roosignol-loop`). The repo stays on GitHub as a reference.


| Item | Value |
| --- | --- |
| Production URL | https://roosignol-loop.vercel.app/ |
| Hosting | Vercel, project `roosignol-loop` (id `prj_dbUFipvYbhZcz7uevFY4niLLfcHT`), team id `team_GWqR3MWEv6Tdanin0yAVrTyH` (account shown as `ggkeno`) |
| Access | Public, no login, no deployment protection on the production alias (checked with a plain request and a fresh private browser context) |
| Repo | `/Users/yona/dev/roosignol`, branch `master`, all work committed and pushed to https://github.com/kenobeer/roosignol-loop (public, remote `origin`). The GitHub repo is not connected to Vercel: pushing does not deploy, production is deployed from the machine with `vercel deploy --prod --yes` |
| Last verified | Production page was byte-identical to the committed `public/index.html` after every deploy; the last check was after the hub circle change (commit `5579874`) |
| Stack | One static HTML file (inline CSS and JS), one service worker. No libraries, no build step, no backend, no analytics, no external requests at runtime |
| Size | `public/index.html` about 81 KB (about 22 KB gzipped) |

Not tested: a real phone, iOS Safari, or a real in-app QR scanner. Everything was checked in headless Chrome on macOS at phone width (360, 390 px) and heights 640 and 844.

## 2. What the site is

A mobile-first microsite for a university trade-show stand. A visitor scans a QR code, and in under a minute plays with the "Rossignol LOOP" business model. It is a companion to the slide deck, not a copy of it. Style: deep blue background, amber accent, thin light sans-serif type, red dot nodes on thin lines, rounded cards. English only, no logos.

Page order: header, hero (animated LOOP circle), tab bar with three tabs, footer.

1. **Ski passport** ("Same winters. Different ending.")
2. **You run the shop**
3. **Turbine blade**

Footer on every view: "Illustrative model. Fee levels would be tested in a pilot." plus "Student project, not an official Rossignol or Vattenfall publication. No agreement with either company is implied. Numbers marked as assumptions are ours."

Copy rules that were applied everywhere: no em dashes or en dashes, "winters" instead of "seasons" in user-facing copy (except the weather step "Record season" in section 2, which was left as is), the partnership with Vattenfall is always "our proposal", nothing claims Rossignol or Vattenfall agreed to anything.

## 3. Section by section

### Hero
A thin cyan double circle with four red dot nodes and amber arrows flowing clockwise: Rossignol, Shops, Skiers, Return. Tapping a node shows one line:

- Rossignol: "Carbon fibre from old blades flows in."
- Shops: "Skis arrive with no upfront cost."
- Skiers: "Skis to rent, winter after winter."
- Return: "Old skis come back for a voucher."

Maximum 265 px wide, about 280 px tall in total. The "Follow one ski" button was removed because it only scrolled.

### 1. Ski passport
One viewport, no vertical scrolling while playing (the section height is `100svh` minus the header, with a `vh` fallback). Three zones plus a link row.

**Comparison strip (top).** Headline "Same winters. Different ending." on the left and a status "Winter N of 5" on the right that follows the button. One numbered winter scale (1 to 5) above two lanes with full card width.
- Lane "Typical rental ski" stops at winter 3 and ends in a bin: "Thrown away or resold". A small note on its name row: "3 to 5 winters, 3 shown".
- Lane "LOOP ski" runs to winter 5 and ends in a rack: "Second life, then recycled". Its name row shows a small tag icon and the ski ID (LOOP-0427, settable with `?id=`).
- Both end icons use the same rounded box style and the same two-line label to the right.
- Skis are drawn as a pair with binding marks, tilted toward 2 o'clock. Dots go from hollow (ahead) to filled red (reached); the numbers turn amber when reached.
- Animation: both skis advance one dot per winter. After winter 3 the typical ski slides into the bin and fades. The LOOP ski gets a sparkle each summer, a damage mark and then a glowing carbon patch in winter 3, and after winter 5 slides into the rack (the rack bars light up).

**Passport (middle).** A closed navy cover (amber ski emblem, "ROSSIGNOL LOOP", "DIGITAL SKI PASSPORT", ID) opens with a flip to a cream page set in the dark site. Header: ski icon, "ROSSIGNOL LOOP, DIGITAL SKI PASSPORT", ID. Footer line: "Every LOOP ski carries a tag. Scan it and this is its history." Five dashed ghost outlines numbered 1 to 5 show where stamps land. Stamps (original SVG, multiply blend, worn ink, real text with an aria-label each):

| Winter | Shape and colour | Text |
| --- | --- | --- |
| 1 | Oval, teal | SERVICED, WINTER 1, 60 DAYS |
| 2 | Rounded rectangle with dashed inner border, orange, knocked-out banner | SERVICED, WINTER 2, 60 DAYS |
| 3 (large) | Triangle, red, carbon patch icon | REPAIRED, WINTER 3, RECOVERED CARBON FIBRE |
| 4 | Double ring circle with stars, navy, ski icon | SERVICED, WINTER 4, 60 DAYS (arc text) |
| 5 (large) | Double ring circle with stars, green, ski with check | SAFETY CHECK PASSED, CERTIFIED SECOND-HAND, ROSSIGNOL LOOP |

Day counts follow the busy/quiet setting (60 or 30). Tapping a stamp shows a one-line detail under the passport (see the copy list in section 5).

**Thumb zone (bottom).** A coin jar, one big animated number (running fee total), "Shop pays EUR 3 per rental day", and "Rossignol's revenue per pair, before production, refurbishment and logistics costs (not modelled)." One full-width 56 px button. Its label always names the next step: Open passport, Winter 1, Winter 2, Winter 3: repair, Winter 4, Winter 5: safety check, Replay. Taps are ignored while a step animates (under 1 second). Replay resets to the open, empty passport without the cover flip. After winter 5, "Try the shop" appears next to "Show the math".

**Show the math (bottom sheet).** "Fee: EUR 3 x 60 rental days x 5 winters = EUR 900", the lifespan assumption text, and the Busy shop (60 days) / Quiet shop (30 days) switch. Switching updates the total, the stamp day counts and the coin size immediately, even mid-game.

**Totals.** 6 coins per winter, 30 in the jar after 5 winters. EUR 180 per winter busy (EUR 90 quiet); EUR 900 busy and EUR 450 quiet after winter 5. No dragging anywhere in this section (the earlier piste, wax, patch, rack and lever versions were removed on purpose).

### 2. You run the shop
The visitor is the shop owner.

Top to bottom:
1. Label "Rental shop" and the sentence "You run a small rental shop with 80 LOOP skis. You did not buy a single pair."
2. **Price sign**: a hanging chalkboard "Your rental price per pair per day", default EUR 18, minus and plus buttons (48 px, step EUR 1, range EUR 8 to 40) and a styled native range slider kept in sync. The sign swings a little when the price changes. On first view it pulses once and shows a "Set your price" pill.
3. Caption directly under the slider: "Your price, your customers. Rossignol's fee per rental day depends on your fleet class."
4. **Your fleet class**: chips Standard EUR 2, Performance EUR 3 (default), Premium EUR 4.
5. **Split bar** for one rental day: amber segment is Rossignol's fee, light segment is what the shop keeps. Labels "Rossignol EUR 3 (17%)" and "You keep EUR 15", rounded to whole percents.
6. **Scene**: a shop window with snow and tiny skiers (density follows the weather), the weather dial (No snow, Weak, Normal, Record) with the hint "Drag the weather", and a rack of 20 ski icons (each icon stands for 4 pairs, 80 pairs). Tapping an icon shows "You +EUR 60" and "Rossignol EUR 12" (4 pairs times the day split). This is feedback only and does not change the monthly numbers.
7. **Sticky bottom bar** (stays pinned to the bottom of the screen while the section is scrolled): a coin till plus a smaller amber "Rossignol" jar, the one big number "You keep EUR 24,000" with "per month, before your own costs (staff, rent, boots)", the line "Rossignol's fee: EUR 4,800" with an amber coin, "Show the math", and the 56 px button "Run your month". Running the month plays 20 days at the speed of the chosen weather; light coins stay in the till and amber coins slide to the Rossignol jar (at most 40 animated coins). The button becomes "Skip" while running. At the end: "You keep EUR X and pay Rossignol EUR Y."
8. Three tokens, tap to cross out: "You did not buy the fleet", "You do not service it over the summer", "You do not dispose of it". Each shows "Rossignol's job, not yours."
9. Fixed lines: "Rossignol carries the fleet capital and earns it back through the fee over several winters." and "Built for small independent shops with mid and premium fleets."

**Show the math** (second bottom sheet): Rental days = 80 pairs x 20 days x weather factor. Revenue = rental days x your price. Rossignol's fee = rental days x class fee. You keep = revenue minus fee. A live "Now:" line with the current numbers, then: your price does not change the number of rental days in this illustration, illustrative assumptions to be tested in a pilot.

No comparison with a purchase price, no claim that leasing is cheaper than buying, no demand model.

Checked results (80 pairs, Performance, EUR 3 fee unless stated):

| Case | You keep | Rossignol's fee |
| --- | --- | --- |
| Default (EUR 18, normal) | EUR 24,000 | EUR 4,800 |
| No snow | EUR 2,400 | EUR 480 |
| Weak | EUR 12,000 | EUR 2,400 |
| Record | EUR 31,200 | EUR 6,240 |
| EUR 28, normal | EUR 40,000 | EUR 4,800 |
| EUR 10, normal | EUR 11,200 (split EUR 3, 30%, and EUR 7) | EUR 4,800 |
| Standard class, EUR 18 | EUR 25,600 | EUR 3,200 |
| Premium class, EUR 18 | EUR 22,400 | EUR 6,400 |

Rack icons shown as rented per weather step: 2, 7, 16, 20 of 20 (a picture only; the money follows the 10%, 50%, 100%, 130% factors).

### 3. Turbine blade
A small blade silhouette with a hub circle at the root and a "cut here" marker, linked to a cross-section (glass fibre skin, core, resin dots, two red carbon caps). Tap a part, or the chips under it, to read what happens to it:

- Carbon fibre: survives pyrolysis, is recovered, saturated with new resin and frozen as prepreg, then repairs and reinforces skis.
- Glass fibre: comes out brittle and degraded, not usable for skis, needs other circular solutions.
- Resin: binds the fibres; pyrolysis breaks it down, which frees the fibres; recovered carbon gets new resin before use.
- Core material: fills the blade, not used in our skis; this is where Vattenfall's other circular solutions matter.

Below: a five-step flow of how carbon fibre gets into a ski, and the honest note: "Only a small fraction of a blade is usable carbon fibre, so this complements Vattenfall's other circular solutions and does not replace them. That is why LOOP first keeps existing skis in use, and uses recovered fibre where it clearly extends a ski's life." Source line: "our interview with Endre Hals, EVI ski factory, Norway." No percentages or statistics are invented.

## 4. Numbers and assumptions

All live in the `CONFIG` object at the top of the main `<script>` in `public/index.html`.

| Setting | Value | Origin |
| --- | --- | --- |
| `feePerDay` | EUR 3 per pair per rental day (Performance class) | Brief |
| `busyDays`, `quietDays` | 60 and 30 rental days per winter | 60 from brief, 30 is ours |
| `seasons`, `carbonSeason` | 5 winters, carbon repair in winter 3 | Brief |
| `pairs`, `pairsPerIcon`, `daysPerMonth` | 80, 4, 20 | Brief |
| `classes` | Standard 2, Performance 3, Premium 4 (EUR per day) | Brief |
| `defaultPrice`, `priceMin`, `priceMax` | 18, 8, 40 (EUR per pair per day) | Brief |
| `weather` | f = 0.1, 0.5, 1, 1.3 and lit = 2, 7, 16, 20 | Brief, labelled as an illustration |
| `defaultId` | LOOP-0427 | Brief |

Wording that is ours and worth checking against the project docs: the quiet case (30 days, EUR 450); "never resold" for skis that fail the safety check (the stamp-5 detail line); the resin and core-material lines on the blade page; the tag and scan idea in "Every LOOP ski carries a tag"; "usually buried or burned" was removed, the typical ski outcome label now reads "Thrown away or resold"; and the passport summary still says "Typical rental ski: 3 to 5 winters, then waste", which may no longer fit now that the strip says "resold".

Facts from your slides that are **not** on the site: about 500,000 skis binned a year in France; shops replace 1/5 to 1/3 of their fleet each year; 47% of French skiers rent (removed on request); shops sign for at least 3 seasons. The EUR 4,800 example appears only as the shop's default fee line.

## 5. Copy shown on interaction

Stamp detail lines (tap a stamp):
- Winters 1, 2 and 4: "60 rental days. Summer service by Rossignol: base, edges, bindings, wax." (30 in quiet mode)
- Winter 3: "Structural repair with carbon fibre recovered from old wind turbine blades (our proposal with Vattenfall)."
- Winter 5: "Safety check passed, sold as certified second-hand. Skis that fail the check are never resold, they are recycled via MTB."

Passport end state, shown above the button: "Typical rental ski: 3 to 5 winters, then waste. LOOP ski: 5 winters in rental, then a second life, then recycling."

Show the math (passport) lifespan text: "Rental skis usually last 3 to 5 winters today (shown at 3). With yearly service and repairs we assume LOOP skis stay in rental for 5 winters, followed by second-hand sale and recycling. Illustrative assumption, to be tested in a pilot."

## 6. Code map

Everything is in `public/index.html`:

1. `<head>`: meta tags and an inline SVG favicon.
2. `<style>`: design tokens (`--bg`, `--amber`, `--red`...), then base styles, then three "additions" blocks (hero and game, section 1, section 2). Reduced-motion rules are at the end of the first block (`prefers-reduced-motion`, includes `::before` and `::after`).
3. `<body>`: hero card, tab bar, `#p-ski`, `#p-shop`, `#p-blade`, footer, then two bottom sheets (`#sheet`, `#sheet2`).
4. `<script>`: `CONFIG`, helpers (`el`, `tween`, `makeDrag`, `svgPt`, `Jar`, `eur`, `vib`), an IntersectionObserver that pauses off-screen animations, `showTab`, then four IIFEs: hero, "Follow one ski" (strip, stamps, button, sheet), "You run the shop", and the blade (`PARTS`, chips). The service worker registration is at the very end.

Useful names: `STAMPS` (stamp geometry, colours, text), `stripStep` / `paintStrip` (the strip), `S` (passport state, exposed as `window.__skiState`), `sh` (shop state, exposed as `window.__shop`), `refresh()` (shop numbers), `PARTS` (blade copy).

Other files:
- `public/sw.js`: caches the page after the first load (HTTPS only).
- `vercel.json`: serves `public/`, clean URLs, no-cache header for `sw.js`.
- `print/`: `qr.svg`, `qr.png` (2000 px), `card-LOOP-0427.html` (A6 printable card).
- `tools/`: `make-card.mjs`, tests, `verify.mjs`, `strip-shots.mjs` (needs `npm install` in `tools`, which pulls `qrcode`, `puppeteer-core`, `jsqr`, `pngjs`).
- `docs/screenshots/`: before and after pictures of the comparison strip (390 and 360 px). The 360 "after" set is current; the 390 "after" set was refreshed for "resold".

Design decisions worth remembering: skis are always drawn as a pair (the shared `#skiS` symbol; the first single-ski outline flared at one end and was redrawn with even width and tapered ends); the passport page and stamps scale to fit the available height; worn ink uses one SVG filter, with a static speckle mask on devices reporting 4 or fewer cores or 3 GB or less memory; the shop's till scales its coin unit (about EUR 800 per coin at the default) so up to 30 coins show keep and fee in proportion; touch-action none is set only on the weather dial handle (the only drag left on the site).

## 7. How to change things

- Numbers: edit `CONFIG` (table in section 4), save, redeploy. Copy that quotes numbers ("3 to 5 winters", "EUR 3 per rental day", "60 DAYS") is plain text in the HTML or in the `STAMPS` array, so search for it. The five stamps are drawn for exactly 5 winters with the repair in winter 3, so changing `seasons` or `carbonSeason` also needs edits in `STAMPS` and the strip.
- Ski ID: open the site with `?id=LOOP-0428` (letters, digits, hyphen, up to 16 characters).
- Printed cards: `cd tools && npm install`, then `node make-card.mjs LOOP-0428` writes `print/card-LOOP-0428.html` with a QR code that includes the ID. `node make-card.mjs LOOP-0427 https://new-url/` rewrites `qr.svg`, `qr.png` and the card for a new URL.
- Redeploy: Vercel CLI installed and logged in, then `vercel deploy --prod --yes` from the repo root. The link to the project is in `.vercel/` (not committed). Keep Deployment Protection off for production if the project is ever moved.

## 8. Tests

Run from the repo root (Google Chrome on macOS, `npm install` in `tools` first). `<url>` is the production URL or a `file://` path to `public/index.html`; add `rm` for reduced motion.

    node tools/test-passport.mjs <url> <screenshot-dir> [640|844] [rm]
    node tools/test-shop.mjs <url> [rm]
    node tools/verify.mjs
    node tools/strip-shots.mjs <url> <out-prefix> [width]

Last results against production: passport reaches EUR 900 (busy) and EUR 450 (quiet) with 6 button presses; shop numbers match the table in section 3; no console errors; no horizontal scroll; reduced motion shows zero running animations; the QR code decodes to the production URL; a fresh private browser context gets HTTP 200 and the page works offline after the first load.

## 9. Known limitations and open points

- Never tested on a real device (drag on the weather dial, the sticky bar, the stamp animation, the ink effect, a real QR scanner, printing the card).
- On a 390 x 640 phone the passport scales to about 0.8, so stamp secondary text is about 9.8 to 10 px, and the passport footer line is just under 11 px. At 844 px tall everything meets the sizes.
- At 360 px wide the small strip note is about 9.6 px.
- The strip has no explicit label for what the dots are beyond the "Winter" scale; the lane lengths do the explaining.
- The passport page and cover are drawn for 5 winters only.
- The GitHub repo is public and not linked to Vercel, so a push does not update the live site. This file contains the Vercel project and team ids (identifiers, not credentials); remove them if you prefer.
- The URL is a `.vercel.app` address tied to the current Vercel account. A custom domain would mean regenerating the QR code and reprinting cards.
- The service worker only runs over HTTPS and caches after the first visit; there is no offline page for a first visit without network.

## 10. History of decisions (newest last)

1. First build: hero, ski passport, shop calculator, turbine blade, QR and card, README.
2. Sections 1 and 2 turned into playful games (piste, scan, wax, patch, safety check, lever; weather dial, rack, jar).
3. Section 1 redesigned as one button, one big number, one passport with stamps; all drag gestures removed.
4. Ski drawing changed to a pair, redrawn to stop the flared end, tilted to 2 o'clock in the strip.
5. Hero made smaller, then a bit bigger, then its button removed.
6. Spacing fixes around the strip, passport header, footer line and links.
7. Typical rental ski stays discarded after winter 3 (no replacement ski).
8. Section 2 became "You run the shop" (price sign, split bar, sticky till and big number); class chips moved under the slider; weather step rack counts set to 2, 7, 16, 20; red tags removed; caption no longer names a fixed fee.
9. Blade copy trimmed; hub circle added to the blade drawing.
10. Comparison strip redesigned ("Same winters. Different ending.") and the typical ski label changed from "burned" to "resold".
