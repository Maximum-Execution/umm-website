# UMM Website — Design Audit
**Date:** 2026-04-22
**Scope:** Visual consistency, layout rhythm, typography discipline, CTA system
**Out of scope:** Copy (handled by copywriter), images (placeholder stage), information architecture

---

## Executive Summary

The site has a strong **design system on paper** (9-level fluid type scale, 5-font brand hierarchy, 13-step grayscale, 13-step spacing scale, neumorphic shadow tokens, gradient dividers). It is **not being consumed as a system in the pages.**

Three structural problems make the site feel generic:

1. **The `Button.astro` component is effectively dead.** Every CTA on every page is a copy-pasted class string. Spencer's reaction ("lame AI slop") is the correct reading of 30+ visually identical white pills with no typographic or interactive character.
2. **Section rhythm is ad-hoc.** `SectionWrapper.astro` exists and defines `py-[var(--spacing-section)]` (64px). Most pages ignore it and hand-roll `py-16 lg:py-20`, `py-24 lg:py-32`, `py-20`, `py-8`, in no consistent pattern. Result: vertical rhythm jumps section-to-section.
3. **Container width is a coin-flip.** `max-w-7xl`, `max-w-6xl`, `max-w-5xl`, `max-w-4xl`, `max-w-3xl`, `max-w-xl` are all in use with no rule for when to pick which. Readable text blocks stretch to 1280px; hero blocks compress to 640px; the eye has to re-calibrate at every scroll-stop.

Fix order: button system first (highest visual density, 40+ instances), then layout primitives (SectionWrapper + a "Prose" primitive for text-centered sections), then sweep the pages to consume them.

---

## 1. CTA / Button System

### 1.1 What exists

`src/components/Button.astro` defines three variants (primary / secondary / ghost). It is imported in **zero** page files. Every button on the site is handwritten inline.

### 1.2 Evidence — 30+ inline duplicates of the same class string

All use `font-sans px-? py-? text-sm font-medium tracking-[0.15em] uppercase hover:bg-light-ash transition-colors` with drift:

| Padding | Locations (representative) |
|---|---|
| `px-8 py-3.5` (canonical) | [index.astro:75](WEBSITE/umm-website/umm-website/src/pages/index.astro), [brand-mark.astro:85, 91, 223, 313, 468, 549, 593, 705](WEBSITE/umm-website/umm-website/src/pages/brand-mark.astro), [HeroSection.astro:67, 73](WEBSITE/umm-website/umm-website/src/components/sections/HeroSection.astro), [BrandMarkCallout.astro:35](WEBSITE/umm-website/umm-website/src/components/BrandMarkCallout.astro), [ExitIntentPopup.astro:59](WEBSITE/umm-website/umm-website/src/components/ExitIntentPopup.astro), Nav mobile, Button.astro:24 |
| `px-8 py-4` | [hand-painted-signs:62, 68](WEBSITE/umm-website/umm-website/src/pages/hand-painted-signs/index.astro), [murals:62, 68](WEBSITE/umm-website/umm-website/src/pages/murals/index.astro), [contact:136, 210](WEBSITE/umm-website/umm-website/src/pages/contact.astro), [brand-mark/claim:116](WEBSITE/umm-website/umm-website/src/pages/brand-mark/claim.astro) |
| `px-8 py-3` | [services:146](WEBSITE/umm-website/umm-website/src/pages/services/index.astro), [hand-painted-signs:312](WEBSITE/umm-website/umm-website/src/pages/hand-painted-signs/index.astro), [murals:322](WEBSITE/umm-website/umm-website/src/pages/murals/index.astro), [journal:111](WEBSITE/umm-website/umm-website/src/pages/journal/index.astro) |
| `px-6 py-3` | [SlideInCTA.astro:47](WEBSITE/umm-website/umm-website/src/components/SlideInCTA.astro), [Nav.astro:73](WEBSITE/umm-website/umm-website/src/components/Nav.astro) |
| `px-6 py-4` | [mural-cost-estimator:366](WEBSITE/umm-website/umm-website/src/pages/mural-cost-estimator.astro) |
| `px-6 py-2.5` | [brand-mark:736](WEBSITE/umm-website/umm-website/src/pages/brand-mark.astro) sticky mobile |

### 1.3 Why it reads "AI slop"

- **Flat white pill.** No surface treatment, no edge, no craft signal. For a hand-painted-signs studio, a button that looks like a 2021 SaaS landing page is a brand contradiction.
- **Uppercase + 0.15em tracking on literally everything.** Every button, every nav link, every eyebrow label uses `tracking-[0.15em] uppercase`. Nothing reads as "the button" because everything is styled like a button.
- **Predictable hover.** `hover:bg-light-ash transition-colors duration-200`. One-move interaction. No arrow shift, no border reveal, no depth change.
- **No icon system.** Some buttons have `&rarr;` appended in the content string ([SlideInCTA:51](WEBSITE/umm-website/umm-website/src/components/SlideInCTA.astro)), most don't. When they do, the arrow sits flat inline with no motion.
- **No size system.** "Sticky mobile small" vs "hero primary" vs "inline body CTA" all look the same size because there's no intentional ramp.

### 1.4 Proposed button system

Three design moves, in order of how much they change the feel:

**Move A — Sharp corners, 1px rule, character through restraint.**
The "pill" shape (implicit through `rounded-none` default + padding) is correct — UMM is a signpainter, not a startup. Keep squared edges. But add a subtle inner 1px hairline in the hover state so the button reads as a *plate* not a *button*. This is a sign-shop move: the edge is the craft signal.

**Move B — Arrow is part of the mark.** Every primary CTA gets an inline arrow that *shifts* on hover (translate-x-0.5). Secondary CTAs get an underline that animates from left. Ghost CTAs get a left-aligned arrow. The arrow is rendered as an SVG sibling, not a glyph in the copy string — so it's consistent, aligned to the cap-height, and can animate independently.

**Move C — Type detail.** Move primary CTAs **off** Gotham uppercase and onto **Gotham Medium at the Subhead size (15→16px) with tracking-wide (0.01em), sentence case**. Reserve uppercase 0.15em tracking for *eyebrow labels and nav only*. The button stops screaming and starts speaking. Secondary buttons stay uppercase-caps to distinguish hierarchy. This is the single biggest anti-slop move.

### 1.5 Proposed `Button.astro` rewrite — **needs your approval before I write it**

```astro
---
interface Props {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'large' | 'compact';
  icon?: 'arrow' | 'none';
  class?: string;
}

const {
  href,
  variant = 'primary',
  size = 'default',
  icon = 'arrow',
  class: className = '',
} = Astro.props;

const Tag = href ? 'a' : 'button';

const base =
  'group relative inline-flex items-center justify-center gap-3 ' +
  'font-sans font-medium transition-all duration-300 ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-titanium-white ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-bone-black';

const sizes = {
  compact: 'px-5 py-2.5 text-[var(--text-fluid-xs)] tracking-[0.12em] uppercase',
  default: 'px-7 py-3.5 text-[var(--text-fluid-sm)]',
  large:   'px-9 py-5 text-[var(--text-fluid-base)]',
};

const variants = {
  primary:
    'bg-titanium-white text-bone-black ' +
    'shadow-[inset_0_0_0_1px_rgba(238,236,233,1)] ' +
    'hover:bg-transparent hover:text-titanium-white ' +
    'hover:shadow-[inset_0_0_0_1px_rgba(238,236,233,1),inset_0_0_0_2px_rgba(0,0,0,0.25)]',
  secondary:
    'text-titanium-white ' +
    'shadow-[inset_0_0_0_1px_var(--color-slate-gray)] ' +
    'hover:shadow-[inset_0_0_0_1px_var(--color-titanium-white)] ' +
    'hover:text-titanium-white',
  ghost:
    'text-soft-gray px-0 py-2 ' +
    'hover:text-titanium-white ' +
    '[&>svg]:transition-transform [&:hover>svg]:translate-x-1',
};
---

<Tag
  href={href}
  class:list={[base, sizes[size], variants[variant], className]}
>
  <slot />
  {icon === 'arrow' && (
    <svg
      class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.25"
      aria-hidden="true"
    >
      <path d="M1 8h13M9 3l5 5-5 5" stroke-linecap="square" />
    </svg>
  )}
</Tag>
```

Key decisions in this rewrite for you to react to:

- **Sentence case, not uppercase.** `"Start your mural"` not `"START YOUR MURAL"`. The button stops shouting.
- **Inset 1px hairline via `shadow`**, not `border`. Borders add layout-box. `inset shadow` gives the edge without affecting hit area, and allows two stacked hairlines on hover (outer + inner) for a sign-plate reading.
- **Gap-3 + inline SVG arrow**, rendered by the component. No more `&rarr;` in copy strings. Arrow shifts 4px on hover via CSS only.
- **Three sizes, not three variants of padding.** `compact` for sticky mobile and inline utility, `default` for most page CTAs, `large` for hero and pricing anchor moments.
- **Secondary = text + hairline rule, no fill reveal on hover.** Current implementation inverts to solid white on hover, which makes secondary feel like a failed-primary. New secondary stays transparent, the hairline brightens. Reads as a typographic mark, not a button.
- **Ghost = arrow-leading link**, not an underline. Reserved for "View all →" and "Back to work" moves. Inherits color from parent so it works in any section.

### 1.6 Migration scope (once approved)

Replace in this order, smallest diff first:

1. Component imports in Nav, Footer, HeroSection, CTABlock, BrandMarkCallout — ~8 files
2. `brand-mark.astro` — 9 button instances, all primary or secondary, direct swaps
3. `murals/`, `hand-painted-signs/`, `services/` — ~6 instances per file
4. Form submit buttons in `contact.astro`, `brand-mark/claim.astro`, `mural-cost-estimator.astro` — these become `<Button type="submit" size="large">`
5. Delete ExitIntentPopup/SlideInCTA inline copies — use Button component

No copy changes. Arrow glyphs currently in copy strings (`&rarr;`) get removed — the component renders them.

---

## 2. Section & Layout Primitives

### 2.1 Observed drift

| Pattern | Usage |
|---|---|
| `SectionWrapper.astro` (canonical: `py-[var(--spacing-section)]` = 64px, `max-w-7xl`, `px-6 lg:px-12`) | Used inconsistently — e.g. FeaturedGrid, ProcessSection likely do; many sections don't |
| Hand-rolled `py-16 lg:py-20` | [index.astro:57](WEBSITE/umm-website/umm-website/src/pages/index.astro) section 9 |
| Hand-rolled `py-24 lg:py-32` | [index.astro:84](WEBSITE/umm-website/umm-website/src/pages/index.astro) journal section |
| Hand-rolled `py-20` | [services/index.astro:130](WEBSITE/umm-website/umm-website/src/pages/services/index.astro) |
| Hand-rolled `py-8` | [about/process.astro:175](WEBSITE/umm-website/umm-website/src/pages/about/process.astro), [journal/hand-painted-vs-vinyl.astro:114](WEBSITE/umm-website/umm-website/src/pages/journal/hand-painted-vs-vinyl.astro) |

### 2.2 What "breathing room" actually needs

`--spacing-section` is currently **64px**. For a Pentagram-adjacent portfolio feel on a dark background with sparse content, 64px is **too tight**. Reference: `--space-20` (80px) to `--space-24` (96px) is the right minimum for section separation on desktop; `--space-16` (64px) on mobile.

**Proposal (needs your approval):**

```css
/* in global.css */
--spacing-section-mobile:  var(--space-16);  /* 64px  */
--spacing-section:         var(--space-24);  /* 96px  desktop baseline */
--spacing-section-major:   var(--space-32);  /* 128px hero-to-content, content-to-footer */
```

Then in `SectionWrapper.astro`, switch to:
```astro
class="py-[var(--spacing-section-mobile)] md:py-[var(--spacing-section)]"
```

### 2.3 Container width — one rule, three tiers

Right now the site picks between 6 max-widths with no rule. Propose reducing to three, each with a named purpose:

| Tier | Max-width | Purpose |
|---|---|---|
| **Wide** | `max-w-7xl` (1280px) | Full-bleed grids: portfolio, journal index, work index |
| **Content** | `max-w-5xl` (1024px) | Most section content — headline + body paragraph + CTA |
| **Prose** | `max-w-[65ch]` (measure-normal) | Long-form reading: case study body, about page, journal posts |

`SectionWrapper.astro` already supports `narrow` (boolean → max-w-3xl). Propose replacing with `width?: 'wide' | 'content' | 'prose'`, default `content`.

### 2.4 Alignment — your stated preference

You said: *"I like things to be centered vertically and left-justified."* Most sections on the site today are `text-center` inside a `max-w-*xl mx-auto`. That conflicts with your preference and weakens the editorial feel.

**Propose:** default to `mx-auto` container (centered in viewport) + `text-left` content inside. Text block sits left-justified within a centered column. Headline uses `text-balance` for poster-style line-breaks. Eyebrow label + CTA align to the left edge of the body copy.

Keep `text-center` only for:
- Homepage hero (stage moment)
- Testimonial quote (pull-quote convention)
- Footer CTA block (closing gesture)

Every other section shifts to left-justified within a centered container. This is the single change that will make the site feel more like *Pentagram / It's Nice That* and less like a Webflow template.

---

## 3. Typography Discipline

### 3.1 Problems observed

- **Uppercase + 0.15em tracking** is used on nav links, buttons, eyebrow labels, form submit buttons, and Nav skip-to-content link. It's the site's only "UI voice" — so everything in that voice fights for attention.
- `style="font-size: var(--text-fluid-xs)"` is written inline **repeatedly** because there's no Tailwind utility wired to the fluid scale. Example: [index.astro:59](WEBSITE/umm-website/umm-website/src/pages/index.astro).
- Heading sizes are set inline with `style="font-size: var(--text-fluid-2xl)"` instead of using `<h2>` which already has the correct size via global.css. Authors are bypassing semantic headings.

### 3.2 Proposed fixes

**A. Wire the fluid scale to Tailwind v4 utilities.** Add to `@theme` in `global.css`:

```css
--text-xs: var(--text-fluid-xs);
--text-sm: var(--text-fluid-sm);
--text-base: var(--text-fluid-base);
--text-lg: var(--text-fluid-lg);
--text-xl: var(--text-fluid-xl);
--text-2xl: var(--text-fluid-2xl);
--text-3xl: var(--text-fluid-3xl);
--text-4xl: var(--text-fluid-4xl);
--text-5xl: var(--text-fluid-5xl);
```

Then `text-xs`, `text-sm`, `text-base`, etc. become fluid-by-default. Inline `style="font-size: var(--text-fluid-xs)"` disappears across ~40+ sites.

**B. Reserve uppercase/0.15em-tracking for eyebrow labels and nav only.** Build a single utility:

```css
.label-eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-fluid-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);   /* 0.08em */
  color: var(--color-soft-gray);
}
```

Then every eyebrow collapses from ~5 inline attributes to `class="label-eyebrow"`. Buttons lose the uppercase treatment (see §1.4). Nav keeps it (it's the nav voice).

**C. Stop bypassing semantic headings with inline styles.** Global.css already sizes h1/h2/h3 correctly. When authors need a size that doesn't match the semantic level, use `.text-display` / `.text-title-1` / `.text-title-2` utility classes that decouple size from element.

---

## 4. Priority Fix Order

| Priority | Work | Rationale | Diff size |
|---|---|---|---|
| **P0** | Button system rewrite + migration | Highest visual density, Spencer's primary complaint | Large (30+ file edits, 1 component rewrite) |
| **P1** | SectionWrapper tokens + container-width consolidation | Fixes the vertical rhythm + "centered left-justified" alignment | Medium (1 component + 10+ page edits) |
| **P2** | Fluid-scale → Tailwind utility wiring | Removes 40+ inline `style=` uses, makes future authoring clean | Small (config) + Medium (sweep) |
| **P3** | `.label-eyebrow` utility | Single point of eyebrow styling | Small (1 class + sweep) |
| **P4** | Remove `Certificate of Provenance` / V4 vestiges from Brand Mark (per P0 plan) | Already in plan, unrelated to visual | Tracked separately |

---

## 5. Open Questions for Spencer

1. **Approve the sentence-case button direction?** This is the biggest departure from what's on the site today. "Start your mural →" reads very differently from "START YOUR MURAL". A Pentagram/Paula Scher-aligned move, but a departure.
2. **Approve the 96px desktop section spacing?** It will make the site *feel* longer even though it's the same number of sections. That's intentional (breathing room = perceived quality) but worth confirming.
3. **Left-justify default?** Keep center only on hero, testimonial, and footer CTA. Confirms your stated preference but requires touching ~8 pages.
4. **Arrow style?** The proposed SVG is a simple line-arrow (stroke-linecap: square) — signpainter-appropriate. If you want more character (hand-drawn, tapered, forked), I'll propose alternatives before implementing.

Nothing in this document modifies copy. No changes have been applied yet.
