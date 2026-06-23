// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.scribe-atp.app",
  integrations: [
    starlight({
      title: "Scribe ATP",
      logo: {
        dark: "./src/assets/ScribeATP-LOGO_white.svg",
        light: "./src/assets/ScribeATP-LOGO.svg",
        alt: "Scribe ATP",
        replacesTitle: true,
      },
      components: {
        Header: "./src/components/Header.astro",
      },
      social: [
        {
          icon: "npm",
          label: "npm",
          href: "https://www.npmjs.com/org/scribe-atp",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/ACregan/scribe-atp-sdk",
        },
      ],
      sidebar: [
        {
          label: "For Developers",
          items: [
            { label: "Introduction", slug: "developers" },
            { label: "Core Concepts", slug: "developers/core-concepts" },
            { label: "Quickstart", slug: "developers/quickstart" },
            {
              label: "Framework Guides",
              items: [
                {
                  label: "Core (vanilla TS)",
                  slug: "developers/framework-guides/core",
                },
                { label: "React", slug: "developers/framework-guides/react" },
                {
                  label: "React Router v7",
                  slug: "developers/framework-guides/react-router",
                },
                {
                  label: "Angular",
                  slug: "developers/framework-guides/angular",
                },
                { label: "Next.js", slug: "developers/framework-guides/next" },
                { label: "Vue", slug: "developers/framework-guides/vue" },
                { label: "Nuxt", slug: "developers/framework-guides/nuxt" },
                {
                  label: "Other frameworks",
                  slug: "developers/framework-guides/other",
                },
              ],
            },
            {
              label: "Guides",
              items: [
                { label: "RSS feeds", slug: "developers/guides/rss" },
                { label: "Sitemaps", slug: "developers/guides/sitemaps" },
                {
                  label: "Building URLs",
                  slug: "developers/guides/building-urls",
                },
                {
                  label: "Request cancellation",
                  slug: "developers/guides/cancellation",
                },
              ],
            },
            {
              label: "API Reference",
              items: [
                {
                  label: "@scribe-atp/core",
                  slug: "developers/api-reference/core",
                },
                {
                  label: "@scribe-atp/react",
                  slug: "developers/api-reference/react",
                },
                {
                  label: "@scribe-atp/react-router-framework",
                  slug: "developers/api-reference/react-router-framework",
                },
                {
                  label: "@scribe-atp/angular",
                  slug: "developers/api-reference/angular",
                },
                {
                  label: "@scribe-atp/next",
                  slug: "developers/api-reference/next",
                },
                {
                  label: "@scribe-atp/vue",
                  slug: "developers/api-reference/vue",
                },
                {
                  label: "@scribe-atp/nuxt",
                  slug: "developers/api-reference/nuxt",
                },
              ],
            },
          ],
        },
        {
          label: "For Authors / Site Owners",
          items: [
            { label: "Introduction", slug: "authors" },
            { label: "The Content Model", slug: "authors/content-model" },
            { label: "Getting Started", slug: "authors/getting-started" },
            { label: "Managing Your Site", slug: "authors/managing-your-site" },
            { label: "Contributors", slug: "authors/contributors" },
            { label: "Using a Website", slug: "authors/using-a-website" },
          ],
        },
      ],
    }),
  ],
});
