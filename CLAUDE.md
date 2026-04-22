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
- **Type scale:** 9-level fluid Apple HIG hierarchy using `clamp()` (xs → 5xl)
- **DaisyUI theme:** `umm` (primary=cobalt, secondary=mauve, accent=orange)

### Type Scale (Apple HIG Hierarchy)

| Token | Apple Style | Mobile | Desktop | Leading | Tracking | Font Role |
|-------|------------|--------|---------|---------|----------|-----------|
| `--text-fluid-xs` | Caption 1 | 12px | 13px | 1.4 | 0.08em (caps) | Mono — tags, metadata |
| `--text-fluid-sm` | Subhead | 15px | 16px | 1.4 | 0.01em | Sans — nav, UI labels |
| `--text-fluid-base` | Body | 17px | 18px | 1.4 | 0 | Body — reading text |
| `--text-fluid-lg` | Callout | 18px | 21px | 1.4 | 0 | Body — lead text |
| `--text-fluid-xl` | Title 3 | 20px | 24px | 1.25 | -0.01em | Heading — h3, cards |
| `--text-fluid-2xl` | Title 2 | 22px | 28px | 1.25 | -0.01em | Heading — content h2 |
| `--text-fluid-3xl` | Title 1 | 28px | 40px | 1.2 | -0.01em | Heading — section h2 |
| `--text-fluid-4xl` | Large Title | 34px | 56px | 1.1 | -0.015em | Heading — page h1 |
| `--text-fluid-5xl` | Display | 44px | 72px | 1.1 | -0.02em | Heading — hero |

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

---

## Design Priority Order

iPhone first. Always.

1. **iPhone (newest Safari first)** — ease of use, flawless functionality, zero broken layouts
2. **Older iPhones** — same standards, tested down to iPhone 12
3. **Other mobile (Android)** — parity, nothing missing
4. **iPad / tablets** — layout adapts gracefully
5. **Desktop** — artistic statement; more visual complexity, editorial layouts, and features than mobile carries

The iPhone experience must be perfect before any desktop work begins. Desktop is additive, not the baseline.

### iPhone-First Non-Negotiables

- All tap targets min 44×44px (`min-h-[44px]` on every CTA)
- No functionality hidden behind hover states
- Font sizes never below 16px (prevents iOS Safari auto-zoom on inputs)
- Sticky/fixed elements must not obscure readable content
- Bottom CTAs must not conflict with iOS home bar (use `pb-safe` or equivalent)
- Test sticky mobile CTA: does it show/hide correctly on scroll?
- Test exit intent: does it trigger appropriately on mobile?

---

## Skills — When to Use Each

These are the globally installed skills that apply to this project. Invoke the relevant skill before starting any major task.

### Design

| Skill | Invoke when |
|---|---|
| `/frontend-design` | Running a design pass on any new or existing page |
| `/landing-page-design` | Designing or redesigning a conversion/offer page |
| `/hig-foundations` | Checking any design decision against Apple HIG (spacing, type, touch targets) |
| `/hig-platforms` | iPhone- or iPad-specific layout and interaction patterns |
| `/web-typography` | Auditing or refining the type system (5-font hierarchy, fluid scale) |
| `/visual-storytelling-design` | Adding photography — "let the work speak," Pentagram aesthetic |
| `/ux-heuristics` | Reviewing a new page layout for usability |

### Copy

| Skill | Invoke when |
|---|---|
| `/copy-editing` | Editing or refining existing copy on any page |
| `/copywriting` | Writing new copy from scratch |
| `/storybrand-messaging` | Checking copy against StoryBrand BrandScript (customer-as-hero, villain, guide) |
| `/hundred-million-offers` | Writing or reviewing offer pages, value stacks, pricing, guarantees |
| `/landing-page-copywriter` | Full copy pass on a landing/offer page |

### Quality, SEO, Performance

| Skill | Invoke when |
|---|---|
| `/accessibility` | Full a11y audit — run before any page is called done |
| `/web-quality-audit` | Final QA pass (copy, links, markup, accessibility, performance) |
| `/core-web-vitals` | Performance audit — especially important for iPhone load times |
| `/page-cro` | Conversion audit on any landing or offer page |
| `/seo-geo` | Local Richmond VA SEO — run when a new page or section is added |
| `/schema-markup` | Structured data — run when adding new service or location pages |

## Messaging Rules

The V4 BrandScript governs all copy on this site. Governing document: `BRAND/Messaging/UMM-StoryBrand-BrandScript-V4.md` (relative to the UMM project root).

### Villain Boundaries

- "Indifference" as the villain belongs to the UMM umbrella ONLY.
- "The generic mural" as the villain belongs to Murals & Public Art ONLY. The Landmark Moment concept (the specific human experience, event, memory, or community truth that a mural is built around) belongs to murals ONLY.
- "Visual pollution" as a villain belongs to signs ONLY.
- "The catalog sign" / "fine art for your brand identity" angle belongs to Brand Mark ONLY.

### Copy Rules

- Customer is always the hero. Spencer/UMM is always the guide.
- Lead with the customer's problem, not Spencer's credentials.
- Never use em dashes. Replace with periods, colons, commas, semicolons, or parentheses.
- Core belief (use as a section anchor or pull quote, not as body copy): "How you do anything is how you do everything."

### Key Lines by Page

| Page | Key Line |
|------|----------|
| Homepage hero | Most murals and signs are made on autopilot. We bring creative strategy, original research, and hand-painting craft to every project, so your building gets public art with real thought behind it: work that means something, lasts, and stops people. |
| Murals | Every mural we paint is built around a Landmark Moment: the instant when something changed forever for the people, the place, or the story behind it. |
| Signs | How your sign is made tells the world what kind of business you run. We hand-paint signs the way they were meant to be made: by a craftsman, with real materials, on real surfaces. |
| Brand Mark | This is not signage. It is an original. Your brand identity, painted by hand, treated like fine art. |

The Compressed One-Liner ("Most public art is made without thinking. We bring the thinking. Then we bring the paint.") is available for shorter placements: subheads, mobile hero, social captions.
