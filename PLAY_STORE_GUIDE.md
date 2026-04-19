# Publishing to Google Play Store — ON Math Contest Prep

## Step 1: Generate App Icons

1. Open `generate-icons.html` in Chrome or Edge
2. Icons auto-generate on load — preview all 8 sizes
3. Click **"⬇ Download All PNGs"** — saves icon-72 through icon-512
4. Move the downloaded PNGs into the `icons/` folder
5. Open `generate-feature-graphic.html` for the Play Store banner (1024×500)
6. Download that too — you'll need it for the store listing

**Icon design:** Gold trophy with π symbol on dark blue, red "MATH PREP" banner, green/blue/orange grade dots (9/10/11), "ON" badge. Designed to pop at every size from 72px to 512px.

## Step 2: Deploy the PWA to HTTPS

The Play Store TWA loads your live website. You need a public HTTPS URL first.

### Vercel (recommended, free)

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) — auto-deploys on push.

### Netlify (alternative, free)

Drag and drop the project folder at [netlify.com/drop](https://app.netlify.com/drop).

### Required files on the server

| File | Purpose |
|------|---------|
| `waterloo-math-contests.html` | Main app (or rename to `index.html`) |
| `manifest.json` | PWA manifest |
| `sw.js` | Service worker for offline |
| `icons/*.png` | All 8 icon sizes |
| `.well-known/assetlinks.json` | Digital Asset Links (Step 4) |

## Step 3: Wrap as Android App (TWA)

Since this is a PWA, you wrap it in a Trusted Web Activity — no native code needed.

### Option A: PWABuilder.com (easiest — zero code)

1. Go to [pwabuilder.com](https://www.pwabuilder.com)
2. Paste your deployed URL (e.g. `https://your-app.vercel.app`)
3. It scores your PWA — fix any warnings it flags
4. Click **"Package for stores"** → select **Android**
5. Configure: app name, package name (`com.yourname.mathprep`), signing key
6. Download the generated `.aab` (Android App Bundle)
7. It also gives you the `assetlinks.json` file — deploy that to your site

### Option B: Bubblewrap CLI

```bash
npm i -g @nicolo-ribaudo/chokidar-2
npx bubblewrap init --manifest https://YOUR-URL/manifest.json
npx bubblewrap build
```

Produces a signed `.aab` file.

### Option C: Android Studio (full control)

1. Create a new Android project with TWA template
2. Point it to your PWA URL
3. Build the AAB

## Step 4: Digital Asset Links (removes browser bar)

For the app to show fullscreen (no URL bar), you must prove domain ownership.

1. PWABuilder generates an `assetlinks.json` with your signing key fingerprint
2. Upload it to: `https://your-domain.com/.well-known/assetlinks.json`
3. Format:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.yourname.mathprep",
    "sha256_cert_fingerprints": ["YOUR_SHA256_FINGERPRINT"]
  }
}]
```

4. Verify at: `https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://your-domain.com`

## Step 5: Google Play Developer Account

1. Go to [play.google.com/console](https://play.google.com/console)
2. Pay the **$25 one-time** registration fee
3. Complete identity verification (1-2 business days)
4. You need a Google account

## Step 6: Create the Store Listing

### App info

| Field | Value |
|-------|-------|
| **App name** | ON Math Contest Prep |
| **Short description** | Free practice for Waterloo math contests — Pascal, Cayley & Fermat (Gr 9-11) |
| **Category** | Education |
| **Content rating** | Everyone |
| **App icon** | `icons/icon-512.png` |
| **Feature graphic** | `feature-graphic-1024x500.png` |

### Full description

> Complete free preparation hub for CEMC Waterloo math contests.
>
> 📝 Mock Tests — Timed 25-question tests with auto-grading
> 📋 Past Paper Practice — Year-by-year from 2015-2025
> 💡 Solutions — Step-by-step for every question
> 🃏 Flash Cards — Flip through key concepts
> 📐 Formula Sheets — All formulas organized by topic
> 📈 Progress Tracking — See your improvement over time
>
> Covers all three contests:
> • Pascal (Grade 9) — 2015-2025
> • Cayley (Grade 10) — 2015-2025
> • Fermat (Grade 11) — 2015-2025
>
> Contest materials © CEMC, University of Waterloo. Used under CC BY-NC 4.0.
> This app is 100% free. No ads, no subscriptions.

### Tags / Keywords

`math, contest, waterloo, pascal, cayley, fermat, CEMC, practice, education, Ontario, grade 9, grade 10, grade 11, mock test, math prep`

### Screenshots (minimum 2, recommended 4-8)

Take these from Chrome DevTools → toggle device toolbar → select a phone like Pixel 7:

1. Home screen with contest cards (Pascal/Cayley/Fermat)
2. Mock test in progress with timer
3. Solutions view with step-by-step explanations
4. Flash cards view
5. Formulas cheat sheet
6. Progress/history screen

### Privacy Policy

Required by Google. Create a simple page on your site or use a free generator. Key points:
- App does not collect personal data
- All data stored locally on device (localStorage)
- No analytics, no tracking, no ads
- No account required

## Step 7: Submit for Review

1. Upload the `.aab` file to the Production track
2. Complete the content rating questionnaire (5 min)
3. Set pricing to **Free** (required — CC BY-NC 4.0 means no monetization)
4. Submit for review — typically 1-3 days

## Important: Copyright Compliance

Since content uses CEMC materials under CC BY-NC 4.0:
- ✅ App must be **free** (no monetization)
- ✅ Attribution clearly visible (already in footer)
- ✅ Store listing mentions CC BY-NC 4.0 and links to CEMC
- ✅ "Unofficial" clearly stated — not affiliated with CEMC
- ❌ Cannot charge for the app or show ads

## What's Already Done

| Feature | Status |
|---------|--------|
| Responsive mobile layout (768px + 380px breakpoints) | ✅ |
| Touch targets — 44px minimum | ✅ |
| Safe area insets for notched phones | ✅ |
| Sticky tab bar on mobile | ✅ |
| Inline tab switching (no popups) | ✅ |
| Test auto-save on tab switch / page close | ✅ |
| PWA manifest with all icon sizes | ✅ |
| Service worker with offline caching | ✅ |
| Standalone display mode | ✅ |
| Portrait orientation lock | ✅ |
| Theme color #1a1a2e | ✅ |
| App icon SVG + PNG generator | ✅ |
| Feature graphic generator (1024×500) | ✅ |
| Apple touch icon support | ✅ |
