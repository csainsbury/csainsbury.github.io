# sainsbury.ai

Astro static site for the `sainsbury.ai` public front page.

Status: deployed to GitHub Pages at <https://sainsbury.ai/> with <https://csainsbury.github.io/> as the underlying GitHub Pages site.

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

## Styling

The main visual system is incorporated into `src/styles/global.css`, with a small Astro composition layer appended for the current page structure.

## Deployment

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds the Astro site and deploys `dist/` to GitHub Pages from the `main` branch.

Recommended initial host repo: `csainsbury/csainsbury.github.io`, so the site works at the root GitHub Pages URL before the custom domain is connected.

## Custom domain

The custom domain is configured through GitHub Pages and `public/CNAME`:

```text
sainsbury.ai
```

DNS is managed externally. GitHub Pages HTTPS is enforced.
