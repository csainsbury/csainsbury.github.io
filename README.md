# sainsbury.ai

Astro static site for the `sainsbury.ai` public front page.

Status: prepared for GitHub Pages deployment. DNS for `sainsbury.ai` is not connected from this repo yet.

## Commands

```sh
npm install
npm run dev
npm run build
npm run preview
```

The production build writes static files to `dist/`.

## Current pages

- `/` — homepage
- `/projects/` — project cards
- `/outputs/` — selected outputs
- `/about/` — short bio and links

## Styling

The main visual system is incorporated into `src/styles/global.css`, with a small Astro composition layer appended for the current page structure.

## Deployment

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds the Astro site and deploys `dist/` to GitHub Pages from the `main` branch.

Recommended initial host repo: `csainsbury/csainsbury.github.io`, so the site works at the root GitHub Pages URL before the custom domain is connected.

## Before custom-domain launch

- review all wording for public safety and current status
- decide final public email/contact links
- connect DNS for `sainsbury.ai`
- when DNS is ready, add `public/CNAME` containing `sainsbury.ai` and rebuild/deploy
