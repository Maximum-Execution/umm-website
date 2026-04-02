# Homepage Competitive Redesign

**Date:** 2026-04-01
**Status:** Approved by Spencer
**Branch:** `feat/full-site-skeleton`

## Context

Spencer studied 10 top-tier agency and mural company websites (Overall Murals, Colossal Media, Pentagram, Landor, Siegel+Gale, Loaded For Bear, BASIC/DEPT, Instrument, Work & Co, Campfire & Co) and wants the UMM site to compete at that level. Real photography and video are available to drop in. The site still follows StoryBrand and Marketing Made Simple, but the visual execution must match the best creative agencies in the world.

## 10 Competitive Gaps (What They Do, We Don't)

1. **Work is the hero** -- they open with project imagery, not explanatory text
2. **Full-bleed, edge-to-edge imagery** -- nothing constrained in padded boxes
3. **Video in the hero** -- autoplay loops, showreels, time-lapses
4. **Project-centric homepage** -- projects before services, not after
5. **Asymmetric/magazine-style grids** -- varied sizes, visual rhythm
6. **Scale numbers / credibility markers** -- "500+ murals a year," hard stats
7. **Client name drops** -- logo strips or named client rosters
8. **Staggered scroll-reveal animations** -- sequential delays, parallax, scale
9. **Distinctive visual texture** -- atmospheric elements beyond clean layout
10. **Footer as a destination** -- newsletter, locations, featured links

## Design Direction

### Aesthetic

Dark, atmospheric, gallery-like. The site should feel like walking into a well-lit exhibition space at night. Bone black walls. Work illuminated. The noise overlay stays. We add subtle grain, deep shadows, and generous void between sections. Typography remains the star when there's no image -- Canela Blackletter for impact moments, Canela for headings, Lyon Text for body. The 5-font hierarchy is already distinctive and stays untouched.

This is NOT minimalism for minimalism's sake. It's editorial restraint -- like Pentagram's discipline but with the raw energy of Colossal's hand-painted craft. The tension between refined typography and raw mural photography IS the brand.

### StoryBrand Integration

The StoryBrand framework still governs the narrative arc. But instead of explaining the framework with text sections, we SHOW it:

- **Character** (the visitor) sees themselves in the full-bleed hero -- a wall transformed
- **Problem** is implied by the before state (bare wall, generic building)
- **Guide** (UMM) is established through the work itself, then the process section
- **Plan** is the 3-step process (visit, render, paint)
- **Call to Action** appears after proof, not before
- **Success** is the project gallery -- buildings that became landmarks
- **Failure** is never seeing what your wall could become (avoided by the CTA)

The visitor scrolls through proof first, then gets the plan, then the ask. This is Marketing Made Simple's homepage wireframe executed visually instead of textually.

## Homepage Section Redesign (Top to Bottom)

### 1. Hero -- Full-Screen Video with Text Overlay

**Current:** Static text hero (HeroSection.astro) with headline + CTA.
**New:** Full-viewport video background (autoplay, muted, loop) showing a mural being painted -- time-lapse or slow dolly shot. Dark gradient overlay from bottom. Headline in Canela Blackletter at `--text-fluid-5xl`. Single CTA below. Scroll indicator (animated chevron or line) at bottom edge.

**Key details:**
- Video fills viewport: `min-h-screen`, `object-cover`
- `<video>` element with poster image fallback for slow connections
- Gradient overlay: `bg-gradient-to-t from-bone-black via-bone-black/60 to-transparent`
- Headline: short, identity-level statement (from Brand Book)
- One CTA only: "See the Work" or "Request a Site Visit"
- Scroll indicator: thin animated line, CSS keyframes only
- `prefers-reduced-motion`: show poster image instead of video, no scroll indicator animation

**Component:** Rewrite `HeroSection.astro` to accept video/poster props.

### 2. Featured Projects -- Asymmetric Full-Bleed Grid

**Current:** Single featured project in a 16:9 bordered box inside max-w-7xl.
**New:** Full-width asymmetric grid of 3-5 featured projects. Mixed aspect ratios (some landscape 16:9, some portrait 3:4, some square). Images bleed edge-to-edge with no container padding. Project title + location appear as overlay on hover (desktop) or below image (mobile). Staggered scroll-reveal: each item enters 100ms after the previous.

**Key details:**
- Full-width section: no `max-w-7xl`, no `px-6`
- CSS Grid with `grid-template-columns` and `grid-row` spanning for asymmetry
- Hover: image scales 1.03x, dark overlay fades in, title + location appear
- Mobile: stack vertically, 100% width, text below each image
- Section label: "Selected Work" in Berkeley Mono, top-left, inside a thin padding band
- "View all work" link at bottom-right

**Component:** New `FeaturedGrid.astro` component. Replaces the single featured project section.

### 3. Credibility Strip -- Hard Numbers

**Current:** Nothing.
**New:** Horizontal strip with 3-4 statistics in large display type. Dark background (midnight-graphite). Numbers in Canela at `--text-fluid-4xl`, labels in Berkeley Mono at `--text-fluid-xs`. Separated by thin vertical rules on desktop, stacked on mobile.

**Candidates (Spencer to confirm real numbers):**
- Years painting / Years in business
- Projects completed
- Square feet painted
- Cities / Locations served

**Key details:**
- Full-width background, content centered in max-w-5xl
- Numbers animate up from 0 on scroll entry (Intersection Observer + CSS counter or JS)
- `prefers-reduced-motion`: show final numbers immediately, no count-up
- Minimal: just numbers, labels, vertical dividers. No icons, no illustrations.

**Component:** New `CredibilityStrip.astro`.

### 4. Process -- Elevated with Imagery

**Current:** 3-column grid of numbered steps. Text only.
**New:** Keep the 3-step structure (it's the StoryBrand Plan). Add a large image above or beside each step showing the actual phase: (1) site visit photo, (2) Blender render screenshot, (3) finished mural photo. Numbers stay oversized in Canela at `--text-fluid-4xl` as subtle background elements.

**Key details:**
- Each step gets an image placeholder slot (aspect 4:3 or 3:2)
- Staggered reveal: steps enter sequentially
- On large screens: alternating layout (image left / text right, then flip)
- On mobile: image on top, text below, straight stack
- Background stays `midnight-graphite`

**Component:** Modify `ProcessSection.astro` to accept image props per step.

### 5. Testimonial -- Full-Width Pull Quote

**Current:** Blockquote with placeholder text in constrained width.
**New:** Full-width section with generous vertical padding (128px+). Quote in Canela Italic at `--text-fluid-3xl`. Attribution in Gotham uppercase. Optional: full-bleed background image of the referenced project, darkened, behind the quote.

**Key details:**
- Quote text: `max-w-4xl`, centered
- Background option: fixed background image with dark overlay (parallax-like via `background-attachment: fixed`)
- Quotation mark as decorative element: oversized Canela Blackletter `"` in slate-gray, positioned absolutely
- `prefers-reduced-motion`: no parallax, standard background

**Component:** Modify testimonial section in `index.astro` or extract to `TestimonialSection.astro`.

### 6. Services -- Moved Down, Visual Cards

**Current:** Two ServiceCards with text only, positioned as second section after hero.
**New:** Moved BELOW projects and process. Now visual: each card gets a background image (mural photo for Murals, sign photo for Signs). Text overlays on dark gradient. Cards are large, roughly 50/50 split on desktop, stacked on mobile. Hover: image shifts slightly (translateX/Y 4-8px), creating depth.

**Key details:**
- Full-width section, two columns
- Each card: full-height image, gradient overlay, title in Canela, short description in Lyon Text, "Explore" link in Berkeley Mono
- This section answers "what do you do" AFTER the visitor has already seen the work
- Follows StoryBrand: prove competence first, then categorize services

**Component:** New `ServiceShowcase.astro` or modify ServiceCard to accept image prop + overlay mode.

### 7. Journal Preview -- Image-Forward Cards

**Current:** 3-column grid of text-only JournalCards.
**New:** Each card gets a header image placeholder (aspect 16:9). Title below. Date and tags stay. Hover: image darkens, card lifts with subtle shadow.

**Key details:**
- Grid stays 3-column desktop, 1-column mobile
- Image placeholder: `bg-midnight-graphite` with aspect-ratio, to be replaced with real images
- Card: no border, relies on image + typography for structure
- Hover: `translateY(-4px)` + shadow, image overlay darkens

**Component:** Modify `JournalCard.astro` to accept optional `image` prop.

### 8. CTA Block -- Elevated Final Section

**Current:** Text headline + two buttons in constrained width.
**New:** Full-width dark section with centered text. Headline in Canela at `--text-fluid-3xl`. Optional background: subtle texture or a faded mural image. Two CTAs stay (primary filled, ghost outline). Add a small trust line below: "Free estimates. No obligation. Richmond, VA and surrounding areas."

**Component:** Modify `CTABlock.astro` for full-width treatment.

### 9. Footer -- Richer, More Useful

**Current:** 3-column nav + philosophy quote + info row + copyright.
**New:** Add newsletter signup (email input + submit, MailerLite integration placeholder). Add a "Recent Projects" or "Instagram" link row. Keep philosophy quote -- it's distinctive. Make email address more prominent. Add phone number if Spencer wants.

**Key details:**
- Newsletter: simple inline form (email + button), Berkeley Mono label
- Social links: add Facebook alongside Instagram
- Keep the 3-column link grid, philosophy quote, copyright
- Consider: 4-column layout on desktop (links, links, links, newsletter)

**Component:** Modify `Footer.astro`.

## Animation System Upgrades

### Current State
- `[data-animate]`: fade-up on scroll (opacity 0 + translateY 1.5rem -> visible)
- Single Intersection Observer (assumed in a script somewhere)

### Additions

1. **Staggered reveals**: `[data-animate-delay="1"]` through `[data-animate-delay="5"]` adding 100ms increments to transition-delay
2. **Scale-in**: `[data-animate="scale"]` starts at `scale(0.97)` instead of translateY
3. **Fade-in only**: `[data-animate="fade"]` for elements that shouldn't move
4. **Image reveal**: `[data-animate="reveal"]` uses `clip-path` animation from `inset(0 100% 0 0)` to `inset(0)` -- wipe-in effect
5. **Number count-up**: JS-driven for credibility strip only

### Rules
- All animations: 400ms max duration, ease-out timing
- All animations respect `prefers-reduced-motion` (show immediately, no motion)
- No JS animation libraries. CSS transitions + Intersection Observer only.
- Stagger delays calculated via CSS custom properties, not JS timeouts.

## Full-Bleed Architecture Change

### Current Pattern
Every section: `<section class="px-6 lg:px-12"><div class="max-w-7xl">...</div></section>`

### New Pattern
Two modes:
1. **Contained sections** (process, testimonial, journal, CTA): keep `max-w-7xl` centering
2. **Full-bleed sections** (hero, featured grid, service showcase): no container, no padding, edge-to-edge

This means some sections drop the wrapper entirely. The `SectionWrapper.astro` component should support a `fullBleed` prop.

## New Components Summary

| Component | Type | Purpose |
|-----------|------|---------|
| `FeaturedGrid.astro` | New | Asymmetric project image grid |
| `CredibilityStrip.astro` | New | Hard numbers strip |
| `ServiceShowcase.astro` | New | Image-backed service cards |
| `TestimonialSection.astro` | New (extract) | Full-width pull quote |
| `ScrollIndicator.astro` | New | Animated scroll-down indicator |

## Modified Components Summary

| Component | Changes |
|-----------|---------|
| `HeroSection.astro` | Video background, gradient overlay, poster fallback |
| `ProcessSection.astro` | Image slots per step, alternating layout |
| `JournalCard.astro` | Optional image prop, hover lift effect |
| `CTABlock.astro` | Full-width treatment, trust line |
| `Footer.astro` | Newsletter signup, richer layout |
| `index.astro` | Complete section reorder and replacement |

## Homepage Section Order (Final)

```
1. Hero (full-screen video + headline + CTA)
2. Featured Projects (asymmetric full-bleed grid)
3. Credibility Strip (numbers)
4. Process (3 steps with images)
5. Testimonial (full-width pull quote)
6. Services (image-backed cards -- Murals + Signs)
7. Journal Preview (3 cards with images)
8. CTA Block (full-width, elevated)
9. Footer (newsletter added)
```

## Global CSS Additions

```css
/* Staggered animation delays */
[data-animate-delay="1"] { transition-delay: 100ms; }
[data-animate-delay="2"] { transition-delay: 200ms; }
[data-animate-delay="3"] { transition-delay: 300ms; }
[data-animate-delay="4"] { transition-delay: 400ms; }
[data-animate-delay="5"] { transition-delay: 500ms; }

/* Animation variants */
[data-animate="scale"] {
  opacity: 0;
  transform: scale(0.97);
}
[data-animate="fade"] {
  opacity: 0;
  transform: none;
}
[data-animate="reveal"] {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.6s ease-out;
}
[data-animate="reveal"].is-visible {
  clip-path: inset(0);
}

/* Full-bleed utility */
.full-bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}
```

## What This Does NOT Change

- Typography system (5 fonts stay exactly as-is)
- Color palette (all tokens stay)
- Noise overlay (stays)
- Subpage layouts (service pages, journal pages, about pages -- untouched)
- Nav structure (links + logo + mobile menu stay)
- StoryBrand framework (still the narrative backbone)
- Astro/Tailwind/DaisyUI stack
- Content collections schema
- Deployment pipeline

## Success Criteria

When finished, a visitor should:
1. See stunning project imagery within 1 second of landing
2. Understand "this is a mural and sign painting company in Richmond" within 3 seconds
3. Feel the quality of the work before reading a single paragraph
4. Encounter the CTA only after being shown proof of competence
5. Compare favorably in visual quality to Colossal Media and Pentagram
