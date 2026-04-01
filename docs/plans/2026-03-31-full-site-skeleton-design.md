# UMM Website Full Skeleton Build — Design Document

**Date:** 2026-03-31
**Project:** untitledmixedmedia.com
**Stack:** Astro 6, Tailwind CSS v4, DaisyUI 5, Cloudflare Pages
**Source:** UMM Growth Engine strategy document

---

## Overview

Build the complete page skeleton for untitledmixedmedia.com based on the Growth Engine strategy. Every page is a real routable URL with placeholder content that serves as a copywriting guide. No final copy, no images — just structure, internal links, and SEO scaffolding.

The homepage hero section is preserved exactly as-is. Everything else is new or restructured.

---

## Decisions Made

- **Blog system:** Content collection (markdown files), called "Journal"
- **Service pages:** Flat `.astro` files, not content collections
- **Nav:** About, Work, Journal, Contact, + CTA button for price estimator
- **"Work"** replaces "Services" — goes to a single overview page with two doorways
- **Sign Restoration** nests under Hand-Painted Signs (not a separate service line)
- **Case studies = projects** — no separate case studies section
- **Design reference:** Pentagram.com (editorial, minimal, work speaks)
- **No Resources page** — the price estimator is the lead gen tool
- **Homepage hero:** Untouched

---

## Site Architecture

### Pages (46 total)

```
src/pages/
├── index.astro                                    HOME
├── 404.astro                                      404 (exists)
├── contact.astro                                  CONTACT
├── price-estimator/
│   └── index.astro                                LEAD GEN (mural cost estimator)
├── about/
│   ├── index.astro                                ABOUT hub
│   ├── process.astro                              Provenance methodology
│   ├── philosophy.astro                           Discovery-first philosophy
│   ├── insurance-and-licensing.astro              Credentials
│   └── press.astro                                Media mentions
├── work/
│   ├── index.astro                                WORK overview (2 doorways: murals + signs)
│   └── signs.astro                                Signs gallery (exists, may repurpose)
├── murals/
│   ├── index.astro                                MURALS hub
│   ├── [...slug].astro                            Project case studies (content collection)
│   ├── business-murals-richmond-va.astro
│   ├── outdoor-murals-richmond-va.astro
│   ├── property-owner-murals-richmond-va.astro
│   ├── mural-cost-richmond-va.astro               Links to price estimator
│   ├── indoor-murals-richmond-va.astro
│   ├── real-estate-developer-murals.astro
│   ├── public-art-murals-richmond-va.astro
│   ├── vara-compliance.astro
│   └── mural-maintenance.astro
├── hand-painted-signs/
│   ├── index.astro                                SIGNS hub
│   ├── storefront-signs-richmond-va.astro
│   ├── gold-leaf-signs.astro
│   ├── window-lettering.astro
│   ├── bar-and-restaurant-signs.astro
│   ├── interior-signs.astro
│   ├── hand-painted-menus.astro
│   ├── hand-painted-vs-vinyl.astro                High-value comparison
│   ├── cost-per-year-comparison.astro
│   ├── why-hand-painted-signs-last-longer.astro
│   └── sign-restoration/
│       ├── index.astro                            RESTORATION hub (under signs)
│       ├── ghost-signs-richmond-va.astro
│       ├── historic-sign-restoration.astro
│       ├── secretary-of-interior-standards.astro
│       ├── sign-restoration-cost.astro
│       └── how-it-works.astro
└── journal/
    ├── index.astro                                BLOG index
    └── [...slug].astro                            Blog post renderer
```

### Content Collections

```
src/content/
├── projects/                    EXISTS — mural case studies
│   ├── short-pump-park.md
│   ├── carytown-butterfly-mural.md
│   └── church-hill-trolley-barn.md
└── journal/                     NEW — blog posts
    ├── how-much-does-a-mural-cost.md
    └── hand-painted-vs-vinyl.md
```

Journal frontmatter schema:

```yaml
title: string
description: string
date: date
tags: string[]
cover: string (optional)
author: string (default: "Spencer Bennett")
featured: boolean (default: false)
```

---

## Navigation

**Header nav:**

```
[untitled mixed media]   About   Work   Journal   Contact   [Get an Estimate →]
```

- CTA button styled distinctly (not a text link)
- Mobile: hamburger menu, CTA prominent at bottom

**Footer — three-column link grid:**

```
Services              Learn More                 Company
├── Murals            ├── Journal                ├── About
├── Hand-Painted      ├── Mural Cost Guide       ├── Process
│   Signs             ├── Hand-Painted vs Vinyl  ├── Philosophy
├── Sign Restoration  ├── Ghost Signs Richmond   ├── Insurance & Licensing
├── Price Estimator   ├── VARA Compliance        ├── Press
                                                 ├── Contact
```

Plus existing philosophy quote, email, social, copyright.

---

## Homepage Structure

```
[Nav]                          Updated
[HeroSection]                  UNTOUCHED
[Services Overview]            NEW — 2 cards: Murals + Signs → hub pages
[Featured Project]             NEW — single featured case study (replaces PortfolioGrid)
[ProcessSection]               EXISTS — repositioned below featured project
[Testimonial]                  NEW — placeholder for client quote
[Journal Preview]              NEW — 2-3 latest posts
[CTA Block]                    NEW — price estimator CTA
[Footer]                       Updated with link columns
```

---

## Page Templates

### Template 1: Hub Page

Used by: `/murals`, `/hand-painted-signs`, `/hand-painted-signs/sign-restoration`, `/work`, `/about`

- Eyebrow label
- Hub headline (placeholder with copy guidance)
- Hub description (StoryBrand structure noted)
- Grid of subpage cards (auto-linked)
- Case studies section (filtered from projects collection, where applicable)
- Cross-hub links ("We also do")
- CTA block

### Template 2: Service Subpage

Used by: all ~25 service subpages

- Breadcrumb (Home > Work > Hub > Page)
- H1 (SEO target keyword)
- Placeholder sections with StoryBrand structure:
  - Character & desire
  - External/internal/philosophical problem
  - Guide statement (empathy + authority)
  - 3-step plan
  - Stakes
  - Transformation
- Image placeholder
- FAQ section (3-4 Q&A pairs)
- Related pages (3-4 siblings from same hub)
- CTA block

### Template 3: Journal Post

Content collection rendered by `journal/[...slug].astro`

- Date + tags
- H1 title
- Cover image (optional)
- Markdown body
- Related posts (2-3 by matching tags)
- CTA block

### Template 4: Standalone Page

Used by: `/contact`, `/price-estimator`, `/about/press`, etc.

- H1
- Page-specific content
- CTA or next step

---

## Shared Components (new)

| Component | Purpose |
|-----------|---------|
| `Breadcrumb.astro` | Path navigation, BreadcrumbList schema |
| `RelatedPages.astro` | Card grid of related internal links |
| `CTABlock.astro` | Reusable CTA section (direct + transitional) |
| `FAQSection.astro` | Q&A pairs, ready for FAQPage schema |
| `ServiceCard.astro` | Hub page cards linking to subpages |
| `JournalCard.astro` | Blog post preview card (title, date, description) |

---

## Internal Linking Network

**Vertical:** Hub ↔ subpages via card grids and breadcrumbs
**Horizontal:** Sibling subpages via "Related" sections (3-4 per page)
**Cross-hub:** Murals hub ↔ Signs hub via "We also do" sections
**Content → Service:** Journal posts link to relevant service pages inline
**Case studies → Hub:** Project pages link back to murals hub
**Price estimator:** Linked from mural cost page, CTAs site-wide, nav CTA button
**Footer:** Links to all hubs + high-value subpages from every page
**Contact:** Linked from every CTA block on every page

---

## Schema Markup (scaffolded, not populated)

- `LocalBusiness` — home page + all service pages
- `FAQPage` — every page with FAQ section
- `BlogPosting` — journal posts
- `BreadcrumbList` — every page with breadcrumbs
- `VisualArtwork` — project case study pages (future, when images exist)

---

## What Is NOT In This Build

- Final web copy (placeholder content only)
- Images or video
- Working mural cost estimator logic (placeholder form only)
- Email capture / MailerLite integration
- Schema markup population (structure only)
- Neighborhood pages (build only after completing projects there)
- Shopify store integration
