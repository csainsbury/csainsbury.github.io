# sainsbury.ai

Astro static site for the `sainsbury.ai` public front page.

Status: deployed to GitHub Pages at <https://sainsbury.ai/> with <https://csainsbury.github.io/> as the underlying GitHub Pages site.

## Commands

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

The production build writes static files to `dist/`.

## Current pages

- `/` — homepage
- `/projects/` — project cards
- `/outputs/` — selected outputs

## Curated homepage and project updates

`src/data/portfolio.json` is the shared public-copy source for Home and Projects:

- `now`: a short current-emphasis paragraph; `updated` stays null until an approved substantive update has a date.
- `sections[].projects`: one-line summary, abstract-level `aim` and `approach`, optional verified stage, featured flag and optional public output link. Keep 3–4 featured projects. Stage vocabulary: Exploring / Building / Evaluating / Public release; null means no verified stage is displayed.
- `milestones`: dated, source-linked public developments. Preprints must be labelled as preprints. Never use a review date as an event date or invent milestones to fill a quota.

`ProjectCard.astro` renders consistent project copy and the latest public milestone on both pages. The homepage displays at most five milestones, newest first. The introduction remains stable.

Daily review runs in Cog and checks selected public profiles/primary output sources plus explicitly selected sanitised updates. Since 10 September 2026, meaningful, evidence-backed, public-safe portfolio updates are automatically built, tested and published under standing authorisation. No change means no deploy or date bump. Uncertain facts/disclosure cases are withheld. The automatic publisher may change only `src/data/portfolio.json`; it cannot add new project identities or alter code, layout, settings or unrelated local files. Do not commit private evidence, review packets or internal research notes here.

Public copy gives an abstract-level aim and approach for each project (Chris, 2026-10-19) and supported milestones, not unpublished results, preliminary metrics, experimental recipes, sensitive collaborators/data or grant strategy. A stage is not a clinical-readiness or completion claim.

## Styling

Direction D ("latent sequence", chosen 2026-10-19 from the design canvas): Geist and Geist Mono, hairline-separated sections, no panels. `src/styles/global.css` holds the tokens; the site follows the visitor's system theme (dark and light palettes). The homepage figure is an illustrative coded record with per-token representation dots, generated deterministically in `src/pages/index.astro`.

## Deployment

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds the Astro site and deploys `dist/` to GitHub Pages from the `main` branch.

Recommended initial host repo: `csainsbury/csainsbury.github.io`, so the site works at the root GitHub Pages URL before the custom domain is connected.

## Custom domain

The custom domain is configured through GitHub Pages and `public/CNAME`:

```text
sainsbury.ai
```

DNS is managed externally. GitHub Pages HTTPS is enforced.
