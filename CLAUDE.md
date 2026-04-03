# CLAUDE.md — umm-website

## What This Is

Portfolio-first marketing website for Untitled Mixed Media LLC. Static Astro site replacing the WordPress site at untitledmixedmedia.com. Design inspired by Pentagram — let the work speak.

## Stack

- **Astro 6** — static site generator
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
  layouts/BaseLayout.astro        ← document shell, meta, self-hosted fonts, OG tags
  components/
    Nav.astro                     ← responsive nav + mobile menu (Canela Blackletter logo)
    Footer.astro                  ← philosophy quote, contact, social, copyright
    Button.astro                  ← CTA button (primary/secondary/ghost, Gotham font)
    SectionWrapper.astro          ← consistent section spacing
    ProjectCard.astro             ← portfolio card (legacy, may be removed)
    sections/
      HeroSection.astro           ← minimal hero (headline + CTA)
      ProcessSection.astro        ← 3-step process
      PortfolioGrid.astro         ← asymmetric featured grid (homepage)
  content.config.ts               ← Content Collection schema (projects)
  content/projects/*.md           ← portfolio project entries (murals)
  pages/
    index.astro                   ← homepage: hero → process → portfolio grid
    404.astro                     ← branded 404 page
    work/index.astro              ← full work listing
    work/signs.astro              ← hand-painted signs gallery
    work/[...slug].astro          ← Pentagram-style case study (expandable details)
  styles/
    global.css                    ← @font-face, design tokens, DaisyUI theme, base styles
public/
  fonts/woff2/                    ← self-hosted WOFF2 fonts (12 files, ~253KB total)
```

## Typography — 5-Font Brand Hierarchy

All fonts self-hosted as WOFF2. No external font services.

| Role | Font | CSS Variable | Tailwind Class |
|------|------|-------------|----------------|
| Logo / primary display | Canela Blackletter Medium | `--font-blackletter` | `.font-blackletter` |
| Headings / subheads | Canela (Regular, Italic, Medium, Bold) | `--font-heading` | `.font-heading` |
| Body text | Lyon Text (Regular, Italic, Bold, BoldItalic) | `--font-body` | `.font-body` |
| Nav / UI / buttons | Gotham (Book, Medium) | `--font-sans` | `.font-sans` |
| Tags / metadata | Berkeley Mono Regular | `--font-mono` | `.font-mono` |

## Design System

- **Theme:** Dark (bone black `#000205` background, titanium white `#EEECE9` text)
- **Colors:** 8 artist primaries (Pyrrole Red, Cobalt Blue, etc.) + 6-step gray bridge
- **Type scale:** 9-level fluid system using `clamp()` (xs → 5xl)
- **DaisyUI theme:** `umm` (primary=cobalt, secondary=mauve, accent=orange)

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
materials: string (optional)
```

## Page Structure

**Homepage:** Hero (headline + CTA) → Process (3 steps) → Asymmetric Portfolio Grid → Footer

**Case study pages:** Title + metadata → full-width hero image → expandable `<details>` "About This Project" (body text + metadata sidebar) → image gallery → prev/next navigation

**Signs page:** Gallery/collection of sign work photos. Separate template from mural case studies.

**Work index:** 2-column grid of all projects + signs entry.

## Deployment

Cloudflare Pages auto-deploys from GitHub `main` branch.
Preview URL: `umm-website.pages.dev`
Production target: `untitledmixedmedia.com`

## Contact

Mailto only: `hello@untitledmixedmedia.com`
CTA: "Request a Site Visit"
