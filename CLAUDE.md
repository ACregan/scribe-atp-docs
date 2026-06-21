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
├── Framework Guides      ← Core · React · React Router v7 · Angular · Next.js · Vue · Nuxt · Other
├── Guides                ← RSS · sitemaps · building URLs · request cancellation
└── API Reference         ← hand-written, one page per package

For Authors / Site Owners
├── Introduction
├── The Content Model     ← Sites, Groups, Articles — no AT Protocol jargon
├── Getting Started
├── Managing Your Site
├── Contributors          ← thin until invitation flow is built
└── Using a Website       ← hand-off guide: what to ask a developer for
```

## Content conventions

- **No AT Protocol jargon in the Authors section.** DIDs, PDSes, XRPC — none of it. Authors need to know Sites, Groups, and Articles only.
- **Core Concepts comes before Framework Guides** in the Developer section. Developers must understand the data model before reading code examples.
- **API Reference is hand-written** — no TypeDoc auto-generation. Fixes to reference pages are committed here and deploy independently of the SDK.
- Use the canonical terms from `scribe-atp-sdk/UBIQUITOUS_LANGUAGE.md` and `scribe-atp.app/UBIQUITOUS_LANGUAGE.md` throughout. Key terms: Site, Group, Article, ArticleRef, Owner, Contributor, Draft, Unpublished, Published.

## Publication states (important — reflects updated model)

| State | Condition | Use in docs |
| ----- | --------- | ----------- |
| Draft | Article on PDS, not in any Site record | "Draft article" |
| Unpublished | Article in a Site's `ungroupedArticles` | "Unpublished article" |
| Published | Article in a Site's Group | "Published article" |

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
