# UMM Layout Guide (Apple HIG for Web)

Translates Apple Human Interface Guidelines layout principles into actionable Tailwind CSS rules for the UMM website. Every layout decision on this site should reference this document.

---

## Foundation: The 8pt Grid

All spacing uses **multiples of 4px** (the site's atomic unit), with 8px multiples preferred for primary measurements. The existing `--space-*` tokens already enforce this.

| Token | Value | Apple HIG Role | Tailwind |
|-------|-------|---------------|----------|
| `--space-1` | 4px | Paired elements (icon + label) | `gap-1`, `p-1` |
| `--space-2` | 8px | Tight group spacing | `gap-2`, `p-2` |
| `--space-3` | 12px | List items, table rows | `gap-3`, `p-3` |
| `--space-4` | 16px | Apple minimum margin. Component padding (mobile) | `gap-4`, `p-4` |
| `--space-6` | 24px | Card padding, grid gutters. Standard mobile margin | `gap-6`, `p-6` |
| `--space-8` | 32px | Card-to-card gap | `gap-8`, `p-8` |
| `--space-10` | 40px | Sub-section group | `gap-10` |
| `--space-12` | 48px | Section break minimum | `gap-12`, `py-12` |
| `--space-16` | 64px | Primary section separation | `py-16` |
| `--space-20` | 80px | Strong section break | `py-20` |
| `--space-24` | 96px | Hero void, major break | `py-24` |
| `--space-32` | 128px | Maximum void | `py-32` |

### The Internal/External Rule

From Apple HIG: **Internal padding must never exceed external margin.**

- Card padding (24px) < card-to-card gap (32px)
- Component padding (16px) < section padding (64px+)
- List item spacing (12px) < list-to-other-content spacing (24px+)

This creates natural visual grouping without needing borders or backgrounds.

---

## Page Layout Skeleton

Every page section follows this structure:

```html
<section class="py-[var(--spacing-section)]">
  <div class="mx-auto max-w-7xl px-6 lg:px-12">
    <!-- Content here -->
  </div>
</section>
```

### Horizontal Padding (Margins)

| Viewport | Class | Value | Apple HIG Equivalent |
|----------|-------|-------|---------------------|
| Mobile (375px+) | `px-6` | 24px | Generous standard margin (Apple min is 16pt) |
| Desktop (1024px+) | `lg:px-12` | 48px | Readability margin, proportional to viewport |

**Rule: Never use `px-4` for page-level content margins.** 16px is the Apple minimum, but 24px is our standard for breathing room. `px-4` is reserved for internal component padding only.

### Content Max-Width

| Class | Value | When to Use |
|-------|-------|-------------|
| `max-w-7xl` | 80rem (1280px) | **Default for all sections.** Grids, cards, full layouts |
| `max-w-3xl` | 48rem (768px) | Narrow prose: journal articles, case study body text |
| `max-w-2xl` | 42rem (672px) | Tight prose: descriptions within wider layouts |
| `max-w-[65ch]` | ~65 characters | Reading text constrained by character count (Apple readability) |

Apple HIG readability principle: body text should never span more than ~75 characters per line. The `--measure-wide: 75ch` and `--measure-normal: 65ch` tokens enforce this on prose elements.

### Vertical Section Spacing

| Context | Mobile | Desktop | When to Use |
|---------|--------|---------|-------------|
| Standard section | `py-[var(--spacing-section)]` | Same (64px) | Default between all sections |
| Emphasis section | `py-24` | `lg:py-32` | Hero, CTA, testimonial, feature |
| Major break | `py-24` | `lg:py-36` | Between thematic groups (services → portfolio) |
| Content border | `border-t border-slate-gray` | Same | Visual break between sections of equal weight |

**Prefer CSS variable `--spacing-section` over hardcoded values** for standard section padding. Hardcode only when a section intentionally breaks the pattern for emphasis.

---

## Responsive Strategy

The site uses a **two-tier mobile-first** approach:

| Breakpoint | Tailwind Prefix | Width | Design Intent |
|------------|----------------|-------|---------------|
| Default | (none) | 0–1023px | Mobile and tablet. Single column. |
| Desktop | `lg:` | 1024px+ | Multi-column grids. Wider spacing. |

`md:` (768px) is used sparingly for grid column transitions (1-col → 2-col). `sm:` is almost never needed. `xl:` and `2xl:` are not used.

### Column Grid System

The site uses a **12-column grid** for asymmetric layouts:

```html
<!-- Standard two-column (content + sidebar) -->
<div class="grid lg:grid-cols-[1fr_280px] gap-12">

<!-- Equal columns -->
<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

<!-- Asymmetric featured grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-1">
```

**Grid gap guidance (Apple HIG grouping principle):**

| Gap Value | Tailwind | When to Use |
|-----------|----------|-------------|
| 4px | `gap-1` | Tight mosaic (portfolio grid, image gallery) |
| 16px | `gap-4` | Related items within a group |
| 24px | `gap-6` | Card grid on mobile |
| 32px | `gap-8` | Standard card-to-card gap |
| 48px | `gap-12` | Desktop card grid, section sub-groups |

---

## Interactive Element Sizing

### Tap Targets (Apple HIG: 44pt minimum)

Every button, link, and interactive control must have a **minimum touch target of 44x44px**. This is non-negotiable for accessibility.

**Primary CTA buttons:**
```html
<!-- Correct: 44px+ height via padding -->
<a class="font-sans inline-block px-8 py-3 text-sm font-medium tracking-[0.15em] uppercase min-h-[44px] flex items-center">
```

**Icon buttons (nav toggle, close, etc.):**
```html
<!-- Correct: 44px hit area via padding -->
<button class="p-2.5" aria-label="Toggle menu">
  <svg class="w-6 h-6">...</svg>
</button>
```

**Inline text links** are exempt from the 44px rule when they appear within body copy, but should have generous `text-underline-offset` and adequate line-height for comfortable targeting.

### Button Spacing

- Between adjacent buttons: minimum `gap-4` (16px)
- Critical action buttons: `gap-6` (24px) from surrounding elements
- Never place destructive actions adjacent to primary actions without spacing

---

## Typography Layout Rules

### Heading Spacing

Headings create hierarchy through size and spacing. Follow the **proximity principle**: headings should be closer to the content they introduce than to the content above them.

| Element | Top Margin | Bottom Margin | Reasoning |
|---------|-----------|---------------|-----------|
| h1 (page title) | `pt-24` (from nav) | `mb-3` to `mb-6` | Establishes page, followed by subtitle or content |
| h2 (section title) | `mt-20` (80px) | `mb-6` to `mb-8` | Clear section break above, tight to its content |
| h3 (subsection) | `mt-12` (48px) | `mb-4` | Smaller break, close to its content |
| Section label | (above heading) | `mb-4` to `mb-6` | Small caps mono label preceding a heading |

### Section Label + Heading Pattern

Many sections use a small uppercase label above the main heading:

```html
<p class="font-mono text-smoke-gray uppercase mb-4"
   style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">
  How It Works
</p>
<h2 class="font-heading text-titanium-white mb-6"
    style="font-size: var(--text-fluid-3xl);">
  Three steps. You approve everything before we paint.
</h2>
```

The label-to-heading spacing (`mb-4`, 16px) is tighter than heading-to-content (`mb-6`, 24px), following the proximity principle.

---

## Content Hierarchy Through Spacing

Apple HIG: "Express hierarchy through layout and grouping rather than decoration."

### The Spacing Hierarchy

| Relationship | Spacing | Examples |
|-------------|---------|---------|
| Tightly coupled | 4–8px | Icon + label, tag + tag, label + value |
| Same group | 12–16px | List items, form fields, metadata rows |
| Related sections | 24–32px | Card padding, heading to content, paragraph to paragraph |
| Distinct sections | 48–96px | Between homepage sections, major content breaks |
| Thematic breaks | 96–128px | Hero void, between service categories and portfolio |

### Visual Grouping Techniques

1. **Spacing alone** (preferred): Use 2x+ spacing between groups vs. within groups
2. **Border separator**: `border-t border-slate-gray` for equal-weight section breaks
3. **Background change**: `bg-midnight-graphite` for nested card surfaces
4. **Indentation**: `lg:pl-8 lg:border-l lg:border-slate-gray` for sidebar metadata

Avoid using color or decoration as the primary grouping mechanism. If you need a border to make grouping clear, first check if better spacing would solve it.

---

## Component Layout Patterns

### Card Pattern

```html
<div class="border border-slate-gray p-6 lg:p-8">
  <!-- Internal padding: 24px mobile, 32px desktop -->
  <h3>...</h3>
  <p>...</p>
</div>
<!-- External gap between cards: gap-8 (32px) or gap-12 (48px) -->
```

Internal padding (24–32px) < external gap (32–48px). This follows the Apple internal/external rule.

### Hero Pattern

```html
<section class="pt-32 pb-24 lg:pt-40 lg:pb-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-12">
    <!-- Generous top padding clears nav (fixed, ~80px) + breathing room -->
    <h1 style="font-size: var(--text-fluid-5xl);">...</h1>
    <p class="mt-6" style="font-size: var(--text-fluid-lg);">...</p>
    <div class="mt-10 flex gap-4"><!-- CTAs --></div>
  </div>
</section>
```

### Footer CTA Pattern

```html
<section class="py-24 lg:py-32 border-t border-slate-gray text-center">
  <div class="mx-auto max-w-7xl px-6 lg:px-12">
    <h2>...</h2>
    <p class="mt-4">...</p>
    <div class="mt-8"><!-- Button --></div>
  </div>
</section>
```

---

## Checklist: Before Shipping Any Layout

- [ ] All spacing values are multiples of 4px
- [ ] Page content uses `px-6 lg:px-12` horizontal padding
- [ ] Content constrained by `max-w-7xl mx-auto`
- [ ] Prose text constrained to 65–75ch line length
- [ ] All buttons and interactive elements are 44px+ touch targets
- [ ] Internal padding < external spacing on all grouped elements
- [ ] Headings closer to their content than to preceding content
- [ ] Section spacing uses `--spacing-section` or justified hardcoded values
- [ ] Tested at 375px (mobile) and 1280px+ (desktop)
- [ ] No orphaned content at `lg:` breakpoint transitions
