# scribe-atp-docs

Documentation site and project landing page for the Scribe ATP project.

| URL | Purpose |
| --- | ------- |
| `scribe-atp.app` | Project landing page — links to the CMS, docs, and SDK |
| `docs.scribe-atp.app` | **Retired 2026-10-06.** Every URL 301s to its counterpart on [sdk.skyscribe.app](https://sdk.skyscribe.app) (developer docs) or skyscribe.app (author docs, privacy). The redirect is an nginx map in `vps-hosting` (`NGINX/docs.scribe-atp.app`) |

Built with [Starlight](https://starlight.astro.build) (Astro).

## Related repos

| Repo | Purpose |
| ---- | ------- |
| [`scribe-atp-sdk`](https://github.com/ACregan/scribe-atp-sdk) | The SkyScribe SDK, `@skyscribe-sdk/*` npm packages (formerly `@scribe-atp/*`, now deprecated), and its docs at sdk.skyscribe.app |
| `scribe-atp.app` | Scribe CMS — the AT Protocol authoring tool |

## Commands

| Command | Action |
| ------- | ------ |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview production build locally |
