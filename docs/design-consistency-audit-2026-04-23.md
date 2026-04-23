# UMM Website — Design Consistency & Quality Audit
**Date:** 2026-04-23
**Scope:** Visual consistency, typographic discipline, component reuse, above-the-fold quality.
**Not covered:** Revenue/CRO (see `docs/website-audit-2026-04-22.md`).

---

## 1. Above-the-Fold Inventory

Nav is fixed, transparent at rest, ~96px tall. Three distinct hero conventions coexist, and only one of them handles the transparent nav correctly.

| Page | `<main>` classes | First section top-spacing | Hero character | Dead black bar? |
|---|---|---|---|---|
| `/` (index) | `<main>` (no pad) | `HeroSection` — full-bleed `min-h-dvh` image, content anchored bottom | Image under transparent nav | **Correct** |
| `/work` | `pt-24` | `<section class="... pt-8 pb-16">` text block | Text on black | **Yes** — 96px black + `pt-8` gap before tiny eyebrow |
| `/murals` | `pt-24` | `<section class="relative ... pt-8 pb-24 lg:pb-32">` with background `<img>` | Image-backed hero, but image starts **below** nav | **Yes** — image never reaches top of viewport |
| `/hand-painted-signs` | `pt-24` | identical to `/murals` | same | **Yes** — same bug |
| `/brand-mark` | `pt-24 pb-16` | image hero inside `<main>` with `py-24 lg:py-32` | Image-backed, but `pt-24` on main pushes it down | **Yes** |
| `/sign-restoration` | `pb-0` | `pt-36 lg:pt-44` text-only hero | Typographic hero, no image | No (but nothing under nav either — flat) |
| `/about` | `pt-24 pb-16` | `max-w-4xl mx-auto mb-20 text-center` | Text-only, centered eyebrow + h1 | **Yes** |
| `/about/process` | `pb-0` | `pt-36 lg:pt-44` text hero | Typographic | No (flat) |
| `/about/philosophy` | `pb-0` | `pt-36 lg:pt-44` text hero | Typographic | No (flat) |
| `/about/insurance-and-licensing` | `pb-0` | `pt-36 lg:pt-44` text hero | Typographic | No (flat) |
| `/contact` | `pt-32 pb-16` | grid with `mb-10 lg:mb-16` | Text + small image | **Yes** |
| `/journal` | `pt-24 pb-16 px-6 lg:px-12` | `<div class="max-w-7xl mx-auto">` | Text | **Yes** |
| `/mural-cost-estimator` | `pb-0` | `pt-36 lg:pt-44` image hero | Image-backed + text | **Partial** — image is behind nav (correct) |

**CRITICAL — Inconsistent hero architecture.** Three patterns coexist:
- **A.** Full-bleed image behind transparent nav (`/`, `/mural-cost-estimator`). Correct.
- **B.** `pt-24` on main + section starting below it (`/work`, `/murals`, `/signs`, `/brand-mark`, `/about`, `/contact`, `/journal`). Wastes 96–128px on a black strip; for the image heroes in /murals and /signs, it also wastes their most valuable real estate.
- **C.** `pb-0` main + text-only `pt-36 lg:pt-44` (`/sign-restoration`, `/about/process`, `/about/philosophy`, `/about/insurance-and-licensing`). Fixes the bar, but every page looks the same: eyebrow, oversized h1, offset paragraph. Signature typographic move now reads as a template.

**Fix:** Adopt one rule. `<main>` has no top padding on every page. Every first section is either (a) full-bleed image extending behind the nav with internal `pt-32 lg:pt-40` for content, or (b) black-background text hero with internal `pt-32 lg:pt-40`. Delete the `pt-24` / `pt-32` pattern on `<main>` entirely. *(file refs: all pages listed above)*

---

## 2. Spacing Inconsistency Map

**HIGH — Section padding uses three different systems.**
- Token-based: `py-[var(--spacing-section-mobile)] md:py-[var(--spacing-section)]` (`index.astro:58`, likely inside section components).
- Hard utility: `py-24 lg:py-32` (`CTABlock.astro:26`).
- Hero-specific: `pt-36 lg:pt-44 pb-24 lg:pb-32` (restoration, philosophy, process, insurance, cost-estimator).
- Asymmetric ad-hoc: `pt-8 pb-16`, `pt-8 pb-24`, `pb-24 lg:pb-32` (`work/index.astro:33`, `murals/index.astro:40`).
**Why it matters:** section rhythm is the primary visual grammar of a Pentagram-style design. Five rhythms = no rhythm.
**Fix:** Two tokens, enforced. `--spacing-section` for body sections. `--spacing-hero` for first sections. All section components consume them; delete literal `py-24` etc. from pages.

**MEDIUM — Container width inconsistency.**
- `max-w-7xl mx-auto` — standard shell (most pages).
- `max-w-4xl mx-auto` — brand-mark hero inner, index brand-mark section, CTABlock content.
- `max-w-3xl mx-auto` — process hero body, philosophy body, work hero text.
- `max-w-2xl`, `max-w-5xl`, `max-w-xl` sprinkled.
**Why:** inner reading-column widths set typographic cadence; four of them = wobble.
**Fix:** define three named measures — `container` (7xl), `prose` (3xl/~70ch), `tight` (xl/~45ch) — and use only those. Replace arbitrary `max-w-4xl`/`5xl`/`2xl` usages.

**MEDIUM — Gutter inconsistency on `/journal`.** `main` declares `px-6 lg:px-12` *and* inner `max-w-7xl` receives it implicitly. Other pages put gutters on section-level. `/journal:54` is the only page that gutters the `<main>`. Normalize to section-level.

---

## 3. Typography Inconsistency Map

**HIGH — H1 size not consistent across comparable pages.**
- `var(--text-fluid-5xl)` — `/murals`, `/signs`, `/sign-restoration`, `/about/process`, `/about/philosophy`, `/about/insurance-and-licensing`, `/mural-cost-estimator`.
- `var(--text-fluid-4xl)` — `/work`, `/brand-mark`, `/about`, `/contact`.
- Homepage (`HeroSection.astro:42`) uses Tailwind `text-5xl` with `font-blackletter`, bypassing the fluid system entirely.
**Why:** the H1 is the brand's loudest voice. Two service detail pages the same tier should not have different headline sizes.
**Fix:** one H1 token (`--text-fluid-5xl`) for hero headlines. One sub-tier (`--text-fluid-4xl`) for interior page H1s *only* if the page has no hero image. Homepage should also use the token.

**HIGH — 899 inline `style="font-size: var(--text-fluid-*); ..."` declarations across 39 files.** Every heading and paragraph sets size, line-height, and letter-spacing in a style attribute. This is the opposite of a type system: there is no named type role (`.display`, `.h1`, `.lede`, `.body`, `.eyebrow`), only thousands of ad-hoc invocations. One typo in one page drifts silently. `about/philosophy.astro:46` has a `.lede` class; nothing else does.
**Fix:** create six type utilities in `global.css` (`.display`, `.h1`, `.h2`, `.h3`, `.lede`, `.body`, `.eyebrow`, `.mono-label`). Replace the inline styles. This is the single highest-impact refactor in the report.

**MEDIUM — Blackletter used once.** `HeroSection.astro:42` uses `font-blackletter` for the home H1. Nothing else uses it. Either commit to it as a home-only signature move (document it) or remove. Right now it reads as abandoned.

**LOW — Mixed heading hierarchy signal.** `/work/index.astro:46` has `<h2 class="sr-only">Featured Projects</h2>` but then uses `<p class="font-mono uppercase">` as the visible label — fine semantically but no consistent "section label" component. See Section 5.

---

## 4. Color & Token Violations

**LOW — Hardcoded hex exists but is fenced.** Grep finds `#EEECE9`, `#4A4A4C`, `#c00` in:
- Fallback values inside `var(--color-x, #HEX)` — defensible (5 files).
- `work/[...slug].astro:255-256` — JS constants for canvas/SVG rendering. Acceptable but should reference the same tokens via `getComputedStyle(document.documentElement).getPropertyValue('--color-titanium-white')` so a palette change propagates.

**MEDIUM — Tailwind arbitrary values for type size.** Patterns like `text-[var(--text-fluid-3xl)]` (`CTASection.astro:8`, `CTASection.astro:11`, `CTASection.astro:19`) mix the arbitrary-value syntax with the inline-`style` approach used everywhere else. Pick one — the type-utility refactor in §3 resolves both.

---

## 5. Component Duplication

**CRITICAL — Two CTA components doing the same job.**
- `CTABlock.astro` — props-rich, image background, used on service pages.
- `sections/CTASection.astro` — `SectionWrapper`-based, hardcoded copy, different headline size (`text-fluid-3xl` vs the same — actually consistent, but layout differs: centered narrow vs centered 4xl).
**Why:** two CTAs means drift. Different button labels, different trust lines, different backgrounds, different event-name strings for Plausible. Pick CTABlock; delete CTASection; migrate callers.

**HIGH — Three hero conventions (already mapped in §1).** Consolidate into one `<PageHero>` component with three named variants: `image` (extends under nav), `text` (typographic, flat), `split` (for contact-style). Every page calls `<PageHero variant="…" eyebrow="…" headline="…" subline="…" cta={…} />`. Removes inline style blocks, image + gradient boilerplate, and the `pt-24`/`pt-36` drift.

**MEDIUM — Eyebrow label duplicated inline everywhere.**
`<p class="font-mono text-soft-gray uppercase" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">` appears on: murals:51, signs:51, brand-mark:46, about:28, contact:49, cost-estimator, work. A `.eyebrow-label` class already exists in index.astro but isn't used elsewhere. Promote to a single `<Eyebrow>` component or utility.

**MEDIUM — Image hero with gradient duplicated verbatim.** Lines 41–48 of `murals/index.astro` are byte-identical to `hand-painted-signs/index.astro` and nearly identical to `brand-mark.astro:31–38` and `mural-cost-estimator.astro:51–58`. Move into the new `<PageHero variant="image">`.

**LOW — `SectionWrapper.astro` exists but only some pages/components use it.** Audit which; make it the standard.

---

## 6. Visual Character Gaps

**HIGH — Above-the-fold treatment is generic on four key pages.** `/work`, `/about`, `/contact`, `/journal` open with the same shape: ~96px of black, a small mono eyebrow, a centered H1, a paragraph. For a studio that sells hand-painted craft, the portfolio index and the about page are the two places where visual character should hit hardest. Neither has an image, neither has a typographic risk, neither has a moment.
**Fix:** `/work` should open on a single enormous featured piece, edge-to-edge, with the page title as an overlaid typographic gesture. `/about` should open on a portrait or a painting-in-progress photograph, same treatment.

**MEDIUM — Section transitions are uniform.** Every section is `py-24 lg:py-32` on black with a thin rule (`section-rule` on CTABlock) or no rule at all. No contrast — no image bands between text bands, no color shifts, no scale shifts. The homepage at least alternates with `bg-midnight-graphite` on the brand-mark section (`index.astro:58`) and uses `ArchitecturalReveal`. Interior pages have none of this.
**Fix:** introduce one or two interstitial patterns — a full-bleed image strip between text sections, or a single oversized pull-quote on `bg-midnight-graphite`. The murals page especially should break between text and image at least twice.

**MEDIUM — The "landmark" typographic moment is same-same.** Process, philosophy, restoration, insurance all lead with an h1 at `--text-fluid-5xl`, line-height 0.95, letter-spacing tight, with a col-span-7 offset subhead on col-start-5. It's a great move once. It's a tic four times. At least one of those should break the pattern — a very short statement headline, or an asymmetric wide-format layout, or a headline that sits against a painted background.

**LOW — "Let the work speak" barely happens outside `/`.** Only the homepage `HeroSection` trusts an image to do the work alone. Every other page leads with copy. The murals page, of all pages, should open on paint — not a small gradient-washed background with text floating over it.

---

## 7. Mobile Concerns (375px, from code review)

**HIGH — Hero padding tokens not mobile-tested.** `pt-36 lg:pt-44` on `/sign-restoration`, `/about/process`, etc. = 9rem on mobile (144px). Combined with a 96px nav that remains fixed, headline starts at roughly y=240px on a 667px viewport. That's 36% of the fold gone before the H1 appears. Shrink to `pt-24 lg:pt-40`.

**MEDIUM — `var(--text-fluid-5xl)` headlines at 375px.** Without the clamp definition in hand I can't verify, but a 5xl headline with `letter-spacing: var(--tracking-tight)` and `line-height: 0.95` is the kind of combo that overflows narrow columns. `sign-restoration.astro:73`: "Your building has a history painted on it. Don't let it disappear." — 10 words at 5xl at 375px likely wraps awkwardly. Verify clamp min-size and consider forcing a balance break.

**MEDIUM — `grid lg:grid-cols-12 gap-x-8 lg:gap-x-16` with `col-span-7 col-start-5`.** On mobile this collapses to a single column (good), but the subhead visually loses its "offset" relationship to the headline — the whole compositional idea disappears below `lg`. On mobile, add an explicit `<span class="block h-px w-12 bg-soft-gray mb-6">` rule or a `│` rhythm to preserve the offset signal. *(restoration:93, process:112, insurance-and-licensing:44)*

**LOW — `/contact` hero grid.** `lg:col-span-7 / lg:col-span-5` with a 4:3 image. On mobile the image stacks below the H1, which pushes the form below the fold. Consider placing the image above the H1 on mobile only, or making it a compressed strip.

**LOW — Horizontal padding.** `px-6 lg:px-12` = 24px / 48px. At 320px (iPhone SE), 24px × 2 leaves 272px of content. With a 5xl headline this will feel cramped. Test at 320.

---

## Prioritized Fix Order

1. Adopt one hero architecture; delete `pt-24`/`pt-32` on `<main>` and rebuild first sections. Fixes §1, §6, §7 top items.
2. Build `<PageHero>` + `<Eyebrow>` components; migrate all pages. Fixes §5.
3. Define type-role utilities; replace 899 inline `style="font-size..."` declarations. Fixes §3.
4. Consolidate `CTABlock` / `CTASection`. Fixes §5.
5. Define two spacing tokens + three container widths; enforce. Fixes §2.
6. Break visual monotony on `/work`, `/about`, `/murals`. Fixes §6.
