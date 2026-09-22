# Aamna Akram — Portfolio Website

A brand-new, fully redesigned one-page portfolio site, built from your CV. Static files only — no build step, no dependencies.

## Files
- `index.html` — page content and structure
- `styles.css` — full visual design system and animations
- `script.js` — scroll reveals, count-up numbers, animated skill gauges, and the drawing timeline
- `images/aamna-akram.jpg` — your portrait

## Design notes
- Alternating dark "ink" and warm "paper" panels, like moving between activation stands on a retail floor.
- Animated moments: a curtain-wipe reveal on your photo, a rising headline on load, brand names scrolling in a ticker, numbers counting up, skill levels drawn as gauges, and a timeline line that draws itself in as you scroll through your experience.
- Fully responsive down to mobile, keyboard-accessible, and respects "reduce motion" settings for visitors who prefer less animation.

## Put it live on GitHub Pages
1. Create a new GitHub repository (e.g. `aamna-portfolio`).
2. Upload **all** files and folders from this zip to the repo root — keep `images/` as a folder, don't flatten it.
3. Go to **Settings → Pages** → set Source to "Deploy from a branch", branch `main`, folder `/root`.
4. Your site will be live at `https://<your-username>.github.io/aamna-portfolio/` within a minute or two.

## Updating content later
- Text lives directly in `index.html` — search for the section you want to change (`Experience`, `Brands`, `Skills`, etc.).
- Skill percentages are set in `data-value="95"` attributes inside the `.gauge` blocks.
- Stat numbers are set in `data-count="10"` attributes inside the `.stat` blocks.
- To swap your photo, replace `images/aamna-akram.jpg` and keep the same filename (or update the `src` in `index.html`).
