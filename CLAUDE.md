# CLAUDE.md — umm-website

## What This Is

Marketing website for Untitled Mixed Media LLC. Static Astro site replacing the WordPress site at untitledmixedmedia.com.

## Stack

- **Astro 5** — static site generator
- **Tailwind CSS v4** — CSS-first config via `@theme` in `global.css`
- **DaisyUI 5** — component library (dark theme `umm`)
- **@astrojs/sitemap** — auto sitemap
- **TypeScript** — strict mode
- **Cloudflare Pages** — hosting (static output)

## Commands

```bash
npm run dev        # Dev server
npm run build      # Production build
npm run preview    # Preview production build
```

## Architecture

```
src/
  layouts/BaseLayout.astro     ← document shell, meta, fonts, OG tags
  components/
    Nav.astro                  ← responsive nav + mobile menu
    Footer.astro               ← philosophy quote, contact, social, copyright
    Button.astro               ← CTA button (primary/secondary/ghost)
    SectionWrapper.astro       ← consistent section spacing
    ProjectCard.astro          ← portfolio grid card
    sections/                  ← homepage section components
  content/
    config.ts                  ← Content Collection schema (projects)
    projects/*.md              ← portfolio project entries
  pages/
    index.astro                ← homepage
    work/index.astro           ← portfolio grid
    work/[...slug].astro       ← project detail pages
  styles/
    global.css                 ← design tokens, DaisyUI theme, base styles
```

## Design System

Colors from `_BUSINESS/Brand/Untitled Mixed Media color guideline.txt`:
- Core: Bone Black `#000205`, Middle Grey `#777777`, Titanium White `#EEECE9`
- Grays: Midnight Graphite → Light Ash (6-step bridge)
- Primaries: Pyrrole Red, Cobalt Blue, Sap Green, Dioxazine Mauve, Cadmium Orange, Lemon Yellow, Burnt Sienna, Dusty Rose

Typography: Fraunces (headings) + Inter (body) via Google Fonts.

## Content Collection

Projects use this frontmatter:
```yaml
title: string
description: string
cover: string (path to cover image)
images: string[] (optional gallery)
tags: string[]
date: YYYY-MM-DD
featured: boolean
client: string (optional)
location: string (optional)
```

## Deployment

Cloudflare Pages auto-deploys from GitHub `main` branch.
Preview URLs generated per commit/branch.

## Copy Source Files

All homepage copy lives in:
- `_BUSINESS/Inbox/website-and-instagram-copy-ready-to-paste.md`
- `_BUSINESS/Inbox/copy-ready-tonight.md`

## Contact

Mailto only: `hello@untitledmixedmedia.com`
CTA: "Request Your Site Visit"
