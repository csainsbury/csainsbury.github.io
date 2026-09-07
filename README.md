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
- `/agenda/` — TRANsCEnD-CPRD Glasgow kick-off agenda

## Curated homepage and project updates

`src/data/portfolio.json` is the shared public-copy source for Home and Projects:

- `now`: a short current-emphasis paragraph; `updated` stays null until an approved substantive update has a date.
- `sections[].projects`: purpose, optional verified stage, featured flag and optional public output link. Keep 3–4 featured projects. Stage vocabulary: Exploring / Building / Evaluating / Public release; null means no verified stage is displayed.
- `milestones`: dated, source-linked public developments. Preprints must be labelled as preprints. Never use a review date as an event date or invent milestones to fill a quota.

`ProjectCard.astro` renders consistent project copy and the latest public milestone on both pages. The homepage displays at most five milestones, newest first. The introduction remains stable.

Daily review happens outside this public repository in Cog. It consumes explicitly selected public/sanitised proposals and produces a **local draft only**. Narrative approval and deployment are separate human-authorised steps; no scheduled site edits or auto-publishing. Do not commit private evidence, draft queues or internal research notes here.

Public copy should explain the purpose and supported milestone, not unpublished hypotheses, distinctive methods, experimental recipes, preliminary metrics, sensitive collaborators/data or grant strategy. A stage is not a clinical-readiness or completion claim.

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
