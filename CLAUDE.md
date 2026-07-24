# scribe-atp-docs

Documentation site and project landing page for the Scribe ATP project. Built with Starlight (Astro).

## Domains

| Domain | Served from |
| ------ | ----------- |
| `scribe-atp.app` | Custom Starlight home page (`src/pages/index.astro`) — project landing page |
| `docs.scribe-atp.app` | Starlight docs sidebar (`src/content/docs/`) |

Both domains are served from this single repo. nginx routes subdomains to the same `dist/` output.

## Stack

- **Astro** with **Starlight** integration — static site generator purpose-built for docs
- **@astrojs/sitemap** — sitemap generation (Starlight does not bundle this itself)
- **MDX** — all doc pages use `.mdx` for component embedding flexibility
- **TypeScript** — strict mode

## Project structure

```
src/
  pages/
    index.astro           ← scribe-atp.app landing page (outside Starlight sidebar)
  content/
    docs/
      developers/         ← "For Developers" sidebar section
        index.mdx         ← Introduction (slug: "developers" — Starlight treats index files as the directory slug)
        core-concepts.mdx
        quickstart.mdx
        framework-guides/ ← one .mdx per adapter
        guides/           ← RSS, sitemaps, URL building, cancellation
        api-reference/    ← one .mdx per package
      authors/            ← "For Authors / Site Owners" sidebar section
        index.mdx         ← Introduction
        content-model.mdx
        getting-started.mdx
        managing-your-site.mdx
        contributors.mdx
        using-a-website.mdx
  assets/                 ← images referenced in docs
public/                   ← favicons, open graph images
```

## Sidebar structure

Two top-level groups in `astro.config.mjs`:

```
For Developers
├── Introduction
├── Core Concepts         ← AT Protocol model, then Scribe model (Site → Group → Article)
├── Quickstart            ← @scribe-atp/core, fetch a site + article in < 5 min
├── Framework Guides      ← Core · React · React Router v7/v8 · Angular · Next.js · Vue · Nuxt · Styles · Other
├── Guides                ← RSS · sitemaps · building URLs · request cancellation
└── API Reference         ← hand-written, one page per package

For Authors / Site Owners
├── Introduction
├── The Content Model     ← Sites, Groups, Articles — no AT Protocol jargon
├── Getting Started
├── Managing Your Site
├── Contributors          ← invite/accept, submit-for-review, and Site Chat, all shipped
└── Using a Website       ← hand-off guide: what to ask a developer for
```

## Content conventions

- **No AT Protocol jargon in the Authors section.** DIDs, PDSes, XRPC — none of it. Authors need to know Sites, Groups, and Articles only.
- **Core Concepts comes before Framework Guides** in the Developer section. Developers must understand the data model before reading code examples.
- **API Reference is hand-written** — no TypeDoc auto-generation. Fixes to reference pages are committed here and deploy independently of the SDK.
- Use the canonical terms from `scribe-atp-sdk/UBIQUITOUS_LANGUAGE.md` and `scribe-atp.app/UBIQUITOUS_LANGUAGE.md` throughout. Key terms: Site, Group, Article, ArticleRef, Owner, Contributor, Draft, Published.

## Publication states (important — reflects ADR 0013, 2026-07-08)

**Two states, not three.** The CMS used to have an intermediate "Unpublished" state (assigned to a site but not yet placed in a group). That state was removed — assigning an article to a site and placing it in a group now happen together, in one Publish action. Don't describe a separate assign-then-group-later flow anywhere in the authors docs; it no longer exists in the UI.

| State | Condition | Use in docs |
| ----- | --------- | ----------- |
| Draft | Article on PDS, not associated with any Site | "Draft article" |
| Published | Article in a Site's Group (assigned and grouped together, via Publish) | "Published article" |

Internally the codebase calls the Draft state "loose" (see `scribe-atp.app`'s ADR 0013) — keep using **Draft** in author-facing docs per the no-jargon rule above; "loose" is an implementation term, not something authors should see.

## Sitemap & robots.txt

`@astrojs/sitemap` always names its output `sitemap-index.xml` — the `-index.xml` suffix is hardcoded in the integration, no config produces a bare `sitemap.xml`. That's a one-entry pointer file (`<sitemapindex><sitemap><loc>.../sitemap-0.xml</loc>`), not the actual URL list. A `postbuild` npm script (`cp dist/sitemap-0.xml dist/sitemap.xml`) copies the real chunk — the one that actually contains all `<url>` entries — to the conventional path instead, matching every consumer site in the fleet. Fine to rely on chunk 0 alone at this repo's scale (under `@astrojs/sitemap`'s 45,000-URL-per-chunk split threshold); if the docs corpus ever grows past that, this needs revisiting.

`astro.config.mjs`'s `site:` is a single origin (`https://docs.scribe-atp.app`), but this repo serves two domains from one build (see Domains above) — the sitemap is scoped to `docs.scribe-atp.app` only. The 2-page `scribe-atp.app` marketing site (`index.astro`, `privacy.astro`) ends up in it too since those pages are technically served at that domain as well; deliberately not worth a second sitemap for 2 pages.

`public/robots.txt` points `Sitemap:` at `/sitemap.xml`.

## Deployment

GitLab CI → SSH pull-deploy → VPS. Same pattern as all other sites in this project.

- Build output: `dist/` (static files)
- Served by nginx
- Manual deploy step in CI

## Key commands

```bash
npm install       # install dependencies
npm run dev       # dev server at localhost:4321
npm run build     # production build to dist/
npm run preview   # preview production build
```
