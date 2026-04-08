# Phase 1: V1 Launch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship a launch-ready V1 of the UMM website with a hybrid Gallery page, interactive mural cost estimator as lead generator, structured data schemas, and polished shared components.

**Architecture:** Astro 6 static site on Cloudflare Pages. All changes are to .astro components and pages. No new dependencies. Structured data added via JSON-LD in BaseLayout. Cost estimator uses vanilla JS (no framework). Form submissions via Formspree.

**Tech Stack:** Astro 6, Tailwind CSS v4, DaisyUI 5, vanilla JavaScript, Formspree

**Design Doc:** `docs/plans/2026-04-05-website-improvement-design.md`

---

## Task 1: Nav CTA — Replace "Free Discovery Session" with "Get a Price Estimate"

**Files:**
- Modify: `src/components/Nav.astro`

**Step 1: Update desktop CTA button**

In `src/components/Nav.astro`, find the desktop CTA link (line ~37):

```html
<a href="/contact" class="hidden md:inline-block bg-titanium-white text-bone-black font-sans px-6 py-2.5 text-sm font-medium tracking-[0.15em] uppercase hover:bg-light-ash transition-colors">
  Free Discovery Session
</a>
```

Replace with:

```html
<a href="/mural-cost-estimator" class="hidden md:inline-block bg-titanium-white text-bone-black font-sans px-6 py-2.5 text-sm font-medium tracking-[0.15em] uppercase hover:bg-light-ash transition-colors">
  Get a Price Estimate
</a>
```

**Step 2: Update mobile menu CTA button**

Find the mobile CTA (line ~73):

```html
<a href="/contact" class="inline-block bg-titanium-white text-bone-black font-sans px-8 py-3.5 text-sm font-medium tracking-[0.15em] uppercase hover:bg-light-ash transition-colors">
  Free Discovery Session
</a>
```

Replace with:

```html
<a href="/mural-cost-estimator" class="inline-block bg-titanium-white text-bone-black font-sans px-8 py-3.5 text-sm font-medium tracking-[0.15em] uppercase hover:bg-light-ash transition-colors">
  Get a Price Estimate
</a>
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Clean build, no errors.

**Step 4: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: replace nav CTA with price estimator link"
```

---

## Task 2: Footer — Rename "Services" to "Gallery"

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Update column header**

Find the Services column header in Footer.astro:

```html
<p class="font-mono text-smoke-gray uppercase mb-4" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">
  Services
</p>
```

Replace `Services` with `Gallery`.

**Step 2: Verify build**

Run: `npm run build`
Expected: Clean build.

**Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: rename footer Services column to Gallery"
```

---

## Task 3: BaseLayout — Add FAQ, Breadcrumb, and Service Schema Support

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Extend Props interface**

Update the Props interface to accept optional structured data:

```typescript
interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  faqItems?: { question: string; answer: string }[];
  breadcrumbItems?: { name: string; url?: string }[];
  service?: {
    name: string;
    description: string;
    priceRange?: string;
  };
}
```

Destructure the new props:

```typescript
const {
  title = 'Untitled Mixed Media — Hand-Painted Murals & Signs | Richmond, VA',
  description = 'Hand-painted murals, signs, and restorations in Richmond, Virginia. Landmarks, not lookalikes.',
  ogImage = '/og-image.png',
  ogType = 'website',
  noindex = false,
  faqItems,
  breadcrumbItems,
  service,
} = Astro.props;
```

**Step 2: Add FAQ schema JSON-LD block**

After the existing LocalBusiness `<script type="application/ld+json">` block, add:

```html
{faqItems && faqItems.length > 0 && (
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  })} />
)}
```

**Step 3: Add Breadcrumb schema JSON-LD block**

```html
{breadcrumbItems && breadcrumbItems.length > 0 && (
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      ...(item.url ? { "item": new URL(item.url, 'https://untitledmixedmedia.com').href } : {})
    }))
  })} />
)}
```

**Step 4: Add Service schema JSON-LD block**

```html
{service && (
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Untitled Mixed Media",
      "url": "https://untitledmixedmedia.com"
    },
    "areaServed": {
      "@type": "City",
      "name": "Richmond",
      "addressRegion": "VA"
    },
    ...(service.priceRange ? { "priceRange": service.priceRange } : {})
  })} />
)}
```

**Step 5: Verify build**

Run: `npm run build`
Expected: Clean build. No existing pages should break since all new props are optional.

**Step 6: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add FAQ, Breadcrumb, and Service schema support to BaseLayout"
```

---

## Task 4: FAQSection — Add Anchor IDs for Direct Linking

**Files:**
- Modify: `src/components/FAQSection.astro`

**Step 1: Add id attribute to each FAQ item**

Update the FAQ item rendering to generate a slugified id from the question text. In the `items.map()` block, add an id to each `<dt>` element:

```astro
{items.map((item, i) => {
  const slug = item.question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  return (
    <div class="py-6" id={`faq-${slug}`}>
      <dt class="font-heading text-titanium-white" style="font-size: var(--text-fluid-lg);">
        {item.question}
      </dt>
      <dd class="mt-3 font-body text-shadow-gray" style="font-size: var(--text-fluid-base);">
        {item.answer}
      </dd>
    </div>
  );
})}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Clean build. Existing FAQ sections render unchanged, now with id attributes.

**Step 3: Commit**

```bash
git add src/components/FAQSection.astro
git commit -m "feat: add anchor IDs to FAQ items for direct linking"
```

---

## Task 5: Wire FAQ Schema Into Service Pages

**Files:**
- Modify: One service page as a template, then replicate across all service pages

**Step 1: Pick one service page to template**

Start with `src/pages/murals/business-murals-richmond-va.astro`. Read the file and find the FAQ items array. It should look something like:

```astro
const faqItems = [
  { question: "How much does a business mural cost?", answer: "..." },
  ...
];
```

**Step 2: Pass faqItems and breadcrumbItems to BaseLayout**

Update the `<BaseLayout>` call to include the new props:

```astro
<BaseLayout
  title="Business Murals in Richmond, VA | Untitled Mixed Media"
  description="..."
  faqItems={faqItems}
  breadcrumbItems={[
    { name: 'Home', url: '/' },
    { name: 'Murals', url: '/murals' },
    { name: 'Business Murals' }
  ]}
  service={{
    name: 'Business Murals',
    description: 'Custom hand-painted murals for businesses in Richmond, Virginia.',
    priceRange: '$3,000 - $25,000'
  }}
>
```

**Step 3: Verify the schema renders**

Run: `npm run build`
Check the built HTML at `dist/murals/business-murals-richmond-va/index.html` for the JSON-LD blocks.

**Step 4: Replicate across all service pages**

Apply the same pattern to every page that uses FAQSection:
- `src/pages/murals/outdoor-murals-richmond-va.astro`
- `src/pages/murals/property-owner-murals-richmond-va.astro`
- `src/pages/murals/mural-cost-richmond-va.astro`
- `src/pages/murals/indoor-murals-richmond-va.astro`
- `src/pages/murals/real-estate-developer-murals.astro`
- `src/pages/murals/public-art-murals-richmond-va.astro`
- `src/pages/murals/mural-maintenance.astro`
- `src/pages/hand-painted-signs/storefront-signs-richmond-va.astro`
- `src/pages/hand-painted-signs/gold-leaf-signs.astro`
- `src/pages/hand-painted-signs/window-lettering.astro`
- `src/pages/hand-painted-signs/bar-and-restaurant-signs.astro`
- `src/pages/hand-painted-signs/interior-signs.astro`
- `src/pages/hand-painted-signs/hand-painted-menus.astro`
- `src/pages/hand-painted-signs/hand-painted-vs-vinyl.astro`
- `src/pages/hand-painted-signs/cost-per-year-comparison.astro`
- `src/pages/hand-painted-signs/why-hand-painted-signs-last-longer.astro`
- `src/pages/hand-painted-signs/sign-restoration/index.astro`
- `src/pages/hand-painted-signs/sign-restoration/how-it-works.astro`
- `src/pages/hand-painted-signs/sign-restoration/ghost-signs-richmond-va.astro`
- `src/pages/hand-painted-signs/sign-restoration/historic-sign-restoration.astro`
- `src/pages/hand-painted-signs/sign-restoration/sign-restoration-cost.astro`
- `src/pages/hand-painted-signs/sign-restoration/secretary-of-interior-standards.astro`

Each page needs:
- `faqItems` prop (use existing FAQ array)
- `breadcrumbItems` prop (match existing Breadcrumb component items)
- `service` prop (name, description, priceRange appropriate to the service)

**Step 5: Verify build**

Run: `npm run build`
Expected: Clean build, all pages render.

**Step 6: Commit**

```bash
git add src/pages/murals/ src/pages/hand-painted-signs/
git commit -m "feat: add FAQ, breadcrumb, and service schemas to all service pages"
```

---

## Task 6: Gallery Page Redesign (`/work`)

**Files:**
- Modify: `src/pages/work/index.astro`

**Step 1: Read current page and understand imports**

Read `src/pages/work/index.astro` to see current imports and structure.

**Step 2: Rewrite the page**

Replace the current content with the hybrid gallery layout:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';

const projects = (await getCollection('projects'))
  .filter(p => p.data.featured)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<BaseLayout
  title="Gallery — Untitled Mixed Media | Hand-Painted Murals & Signs"
  description="Hand-painted murals, signs, and restorations in Richmond, Virginia. See our work."
  breadcrumbItems={[
    { name: 'Home', url: '/' },
    { name: 'Gallery' }
  ]}
>
  <Nav />
  <main id="main-content" class="pt-24">
    <div class="px-6 lg:px-12 max-w-7xl mx-auto">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Gallery' },
      ]} />
    </div>

    <!-- Hero headline -->
    <section class="px-6 lg:px-12 max-w-7xl mx-auto pt-8 pb-16">
      <h1 class="font-heading text-titanium-white text-balance" style="font-size: var(--text-fluid-4xl);" data-animate>
        The work speaks.
      </h1>
    </section>

    <!-- Featured Projects -->
    <section class="px-6 lg:px-12 max-w-7xl mx-auto pb-24">
      <div class="flex items-center justify-between mb-8">
        <p class="font-mono text-smoke-gray uppercase" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">
          Featured Projects
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <a
            href={`/work/${project.id}`}
            class:list={[
              'group relative block overflow-hidden',
              i === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'
            ]}
            data-animate
            data-animate-delay={String(Math.min(i + 1, 5))}
          >
            <img
              src={project.data.cover}
              alt={project.data.title}
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div class="absolute inset-0 bg-gradient-to-t from-bone-black/80 via-bone-black/20 to-transparent" />
            <div class="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <h3 class="font-heading text-titanium-white mb-1" style="font-size: var(--text-fluid-xl);">
                {project.data.title}
              </h3>
              <p class="font-body text-soft-gray" style="font-size: var(--text-fluid-sm);">
                {project.data.location}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>

    <!-- Category Sections -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-0">
      <!-- Murals -->
      <a href="/murals" class="group relative block aspect-[4/3] overflow-hidden" data-animate>
        <img
          src="/images/service-murals.jpg"
          alt="Hand-painted exterior mural on a commercial building in Richmond"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-bone-black/50 group-hover:bg-bone-black/40 transition-colors" />
        <div class="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
          <h2 class="font-heading text-titanium-white mb-2" style="font-size: var(--text-fluid-3xl);">
            Murals
          </h2>
          <p class="font-body text-soft-gray mb-4 max-w-md" style="font-size: var(--text-fluid-base);">
            Most murals could be anywhere. Ours could only be here.
          </p>
          <span class="font-sans text-titanium-white text-sm tracking-[0.15em] uppercase">
            Explore &rarr;
          </span>
        </div>
      </a>

      <!-- Hand-Painted Signs -->
      <a href="/hand-painted-signs" class="group relative block aspect-[4/3] overflow-hidden" data-animate>
        <img
          src="/images/service-signs.jpg"
          alt="Gold leaf lettering on a storefront window in Richmond"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-bone-black/50 group-hover:bg-bone-black/40 transition-colors" />
        <div class="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
          <h2 class="font-heading text-titanium-white mb-2" style="font-size: var(--text-fluid-3xl);">
            Hand-Painted Signs
          </h2>
          <p class="font-body text-soft-gray mb-4 max-w-md" style="font-size: var(--text-fluid-base);">
            Gold leaf, window lettering, and storefront signs built to last 20+ years.
          </p>
          <span class="font-sans text-titanium-white text-sm tracking-[0.15em] uppercase">
            Explore &rarr;
          </span>
        </div>
      </a>
    </section>

    <!-- Brand Mark Callout -->
    <section class="px-6 lg:px-12 py-20 bg-midnight-graphite" data-animate>
      <div class="max-w-7xl mx-auto text-center">
        <p class="font-mono text-smoke-gray uppercase mb-4" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">
          Starting at $500
        </p>
        <h2 class="font-heading text-titanium-white mb-4" style="font-size: var(--text-fluid-2xl);">
          The Brand Mark: your logo, hand-painted.
        </h2>
        <p class="font-body text-shadow-gray mb-8 max-w-xl mx-auto" style="font-size: var(--text-fluid-base);">
          Wall or wood panel. Three shapes. The fastest way to get hand-painted work on your wall.
        </p>
        <a href="/brand-mark" class="inline-block border border-titanium-white text-titanium-white font-sans px-8 py-3 text-sm font-medium tracking-[0.15em] uppercase hover:bg-titanium-white hover:text-bone-black transition-colors">
          See The Brand Mark
        </a>
      </div>
    </section>

    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

**Step 3: Verify build and preview**

Run: `npm run build`
Expected: Clean build. Navigate to `/work` and verify the gallery layout renders with featured projects, category cards, and Brand Mark callout.

**Step 4: Commit**

```bash
git add src/pages/work/index.astro
git commit -m "feat: redesign Gallery page as hybrid showcase"
```

---

## Task 7: Mural Cost Estimator Upgrade

**Files:**
- Modify: `src/pages/price-estimator/index.astro` (or move to `src/pages/mural-cost-estimator.astro`)

**Step 1: Move the page to the SEO-friendly URL**

Rename/move the file:
- From: `src/pages/price-estimator/index.astro`
- To: `src/pages/mural-cost-estimator.astro`

This changes the URL from `/price-estimator` to `/mural-cost-estimator`.

**Step 2: Rewrite the estimator page**

Build an interactive estimator with these sections:
1. Hero: "How much does a mural cost?" with subhead explaining the tool
2. Interactive calculator form:
   - Wall dimensions (width x height in feet, or preset sizes: Small 4x8, Medium 8x10, Large 10x20, XL 20x40)
   - Surface type (brick, stucco, concrete, wood, drywall)
   - Location (exterior, interior)
   - Complexity (simple/lettering, moderate, highly detailed)
3. Live estimate display: shows range as user adjusts inputs (no page reload)
4. Lead capture gate: "Get your detailed estimate" form (name, email, phone optional, project notes) appears below the estimate
5. Form submits to Formspree (same endpoint as contact form, or a dedicated one)
6. FAQ section with common pricing questions
7. Link to journal article "How Much Does a Mural Cost?"
8. CTABlock

**Pricing logic (vanilla JS):**
- Base rate: wall square footage * per-sqft rate
- Per-sqft rates by complexity: simple $15-25, moderate $25-40, detailed $40-65
- Surface multiplier: drywall 1.0, wood 1.0, stucco 1.1, concrete 1.15, brick 1.2
- Location multiplier: interior 1.0, exterior 1.1
- Display as range: low estimate to high estimate
- Minimum project: $500

**Technical approach:**
- All calculation logic in an inline `<script>` tag
- `addEventListener('input')` on all form fields to recalculate live
- No framework, no build dependency
- Form submission via fetch to Formspree with the estimate values included as hidden fields

**Step 3: Add FAQ items and structured data**

Pass faqItems to BaseLayout for schema:
```astro
const faqItems = [
  { question: "How much does a mural cost per square foot?", answer: "In the Richmond market, mural pricing typically ranges from $15 to $65 per square foot depending on complexity, surface type, and whether the mural is interior or exterior. Simple graphics and lettering run $15-25/sqft. Moderate detail runs $25-40/sqft. Highly detailed or photorealistic work runs $40-65/sqft." },
  { question: "What is the minimum cost for a mural?", answer: "Our minimum project cost is $500. This covers The Brand Mark: a 16-square-foot hand-painted logo on wall or wood panel." },
  { question: "What factors affect mural pricing?", answer: "Four main factors: wall size (square footage), surface type (brick costs more than drywall due to prep), complexity of the design, and whether the mural is indoor or outdoor. Outdoor murals require UV-resistant materials and protective sealant." },
  { question: "Does the estimate include design?", answer: "Yes. Every project includes a discovery session, site visit, and photorealistic 3D render showing the design on your actual wall. You approve the design before any painting begins." },
  { question: "How long does a mural take?", answer: "Most murals take 4-12 weeks from discovery to completion. The timeline depends on wall size, design complexity, weather (for exteriors), and scheduling. The painting phase itself typically runs 1-3 weeks." },
];
```

**Step 4: Verify build and test calculator**

Run: `npm run build`
Open in browser, test calculator with different inputs, verify estimate updates live.

**Step 5: Commit**

```bash
git add src/pages/mural-cost-estimator.astro
git commit -m "feat: build interactive mural cost estimator with lead capture"
```

If the old price-estimator directory still exists, remove it:
```bash
git rm -r src/pages/price-estimator/
git commit -m "chore: remove old price-estimator route"
```

---

## Task 8: Homepage — Add Estimator Callout Section

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Add estimator callout between Brand Mark section and Journal Preview**

Read `src/pages/index.astro`. Find the Brand Mark callout section and the Journal preview section. Between them, add:

```html
<!-- Estimator Callout -->
<section class="px-6 lg:px-12 py-20" data-animate>
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-gray p-8 lg:p-12">
    <div>
      <h2 class="font-heading text-titanium-white mb-2" style="font-size: var(--text-fluid-2xl);">
        Wondering what your mural will cost?
      </h2>
      <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base);">
        Get an instant estimate based on your wall size, surface, and design complexity.
      </p>
    </div>
    <a href="/mural-cost-estimator" class="shrink-0 bg-titanium-white text-bone-black font-sans px-8 py-3.5 text-sm font-medium tracking-[0.15em] uppercase hover:bg-light-ash transition-colors">
      Get a Price Estimate
    </a>
  </div>
</section>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Clean build. Homepage renders with the new callout section.

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add mural cost estimator callout to homepage"
```

---

## Task 9: CTABlock — Standardize Trust Line

**Files:**
- Modify: `src/components/CTABlock.astro`

**Step 1: Verify default trust line**

Read `src/components/CTABlock.astro`. The default trustLine prop should already be:
"Free site visit. You see the design before we start. Richmond, VA and surrounding areas."

If it matches, no changes needed. If it differs, update the default value.

**Step 2: Audit CTABlock usage across pages**

Search for `<CTABlock` across all pages. Check if any pass custom props that override the trust line or omit it. Ensure every instance renders with the standard trust line.

**Step 3: Commit if changes were made**

```bash
git add src/components/CTABlock.astro src/pages/
git commit -m "fix: standardize CTABlock trust line across all pages"
```

---

## Task 10: Image Alt Text Cleanup

**Files:**
- Modify: All pages and components with `<img>` tags

**Step 1: Search for placeholder alt text**

Run: `grep -rn 'alt="Image placeholder"\|alt=""\|alt="image"' src/`

**Step 2: Replace each instance with descriptive alt text**

Every alt attribute should describe what the image shows in context. Examples:
- ❌ `alt="Image placeholder"`
- ✅ `alt="Hand-painted business mural on a brick storefront in Richmond, Virginia"`
- ❌ `alt=""`
- ✅ `alt="Gold leaf lettering detail on a window sign"`

Follow this pattern:
- [Medium] + [subject] + [context/location]
- Include "Richmond" or "Virginia" where appropriate for local SEO

**Step 3: Verify build**

Run: `npm run build`
Expected: Clean build.

**Step 4: Commit**

```bash
git add src/
git commit -m "fix: replace placeholder alt text with descriptive image descriptions"
```

---

## Task 11: Orphan Route Cleanup

**Files:**
- Remove or redirect: `src/pages/work/signs.astro`
- Evaluate: `src/pages/murals/[...slug].astro` (duplicate of `src/pages/work/[...slug].astro`)

**Step 1: Check work/signs.astro**

Read the file. If it duplicates content that lives at `/hand-painted-signs/`, remove it. Signs content has a full hub at `/hand-painted-signs/` with 9+ sub-pages.

```bash
git rm src/pages/work/signs.astro
```

**Step 2: Check murals/[...slug].astro**

Read the file. If it renders the same projects as `work/[...slug].astro`, remove it to eliminate duplicate URLs. The canonical path for case studies is `/work/[slug]`.

```bash
git rm src/pages/murals/[...slug].astro
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Clean build. No pages should break since the canonical routes remain.

**Step 4: Commit**

```bash
git commit -m "chore: remove duplicate routes (work/signs, murals/[slug])"
```

---

## Task 12: Homepage Polish — FeaturedGrid and ProcessSection

**Files:**
- Modify: `src/components/sections/FeaturedGrid.astro`
- Modify: `src/components/sections/ProcessSection.astro`

**Step 1: FeaturedGrid — improve section header visibility**

Read `src/components/sections/FeaturedGrid.astro`. Find the "Selected Work / View all" header. Add a thin border-bottom or increase the text contrast:

- Change the label text color from `text-smoke-gray` to `text-soft-gray` for better contrast
- Add `border-b border-slate-gray pb-4` to the header row

**Step 2: ProcessSection — increase step number visual weight**

Read `src/components/sections/ProcessSection.astro`. Find the step labels (e.g., "01 / Discover"). Increase visual weight:

- Increase the step number font size slightly or use accent color (cobalt blue or cadmium orange) for just the number portion
- Example: wrap the number in a `<span class="text-cobalt-blue">` or increase to `text-fluid-lg`

**Step 3: Verify build and preview**

Run: `npm run build`
Check homepage for visual improvements.

**Step 4: Commit**

```bash
git add src/components/sections/FeaturedGrid.astro src/components/sections/ProcessSection.astro
git commit -m "fix: improve FeaturedGrid header visibility and ProcessSection step numbers"
```

---

## Summary: Task Execution Order

| Task | What | Priority |
|------|------|----------|
| 1 | Nav CTA update | Do first (quick) |
| 2 | Footer rename | Do first (quick) |
| 3 | BaseLayout schemas | Foundation (do before Task 5) |
| 4 | FAQSection anchor IDs | Foundation (do before Task 5) |
| 5 | Wire schemas to service pages | High impact, depends on 3+4 |
| 6 | Gallery page redesign | High impact |
| 7 | Mural Cost Estimator | Highest priority feature |
| 8 | Homepage estimator callout | Depends on 7 |
| 9 | CTABlock standardization | Quick |
| 10 | Image alt text cleanup | Medium effort |
| 11 | Orphan route cleanup | Quick |
| 12 | Homepage polish | Visual refinement |

**Recommended order:** 1 → 2 → 3 → 4 → 9 → 6 → 7 → 8 → 5 → 10 → 11 → 12

After all tasks: run full build, preview all key pages, verify structured data with Google Rich Results Test.
