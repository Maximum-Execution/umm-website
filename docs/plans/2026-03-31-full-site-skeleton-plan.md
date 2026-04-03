# UMM Full Site Skeleton — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build every page from the Growth Engine strategy as a navigable skeleton with placeholder content, internal links, and SEO scaffolding.

**Architecture:** Astro 6 static site with flat `.astro` service pages, two content collections (projects + journal), shared layout components, and a Pentagram-inspired editorial design using the existing Tailwind v4 + DaisyUI 5 design system.

**Tech Stack:** Astro 6, Tailwind CSS v4, DaisyUI 5, Cloudflare Pages

**Critical rule:** Do NOT modify `src/components/sections/HeroSection.astro`. The homepage hero is frozen.

**Design doc:** `docs/plans/2026-03-31-full-site-skeleton-design.md`

---

## Phase 1: Shared Components (Tasks 1-6)

Build the reusable components first. Every page depends on these.

---

### Task 1: Breadcrumb Component

**Files:**
- Create: `src/components/Breadcrumb.astro`

**Step 1: Create the component**

```astro
---
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

const { items } = Astro.props;
---

<nav aria-label="Breadcrumb" class="mb-8">
  <ol class="flex items-center gap-2 font-mono text-sm text-smoke-gray" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
    {items.map((item, i) => (
      <li class="flex items-center gap-2">
        {i > 0 && <span aria-hidden="true">/</span>}
        {item.href ? (
          <a href={item.href} class="uppercase hover:text-titanium-white transition-colors">
            {item.label}
          </a>
        ) : (
          <span class="uppercase text-soft-gray">{item.label}</span>
        )}
      </li>
    ))}
  </ol>
</nav>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds (component not yet used, just created)

**Step 3: Commit**

```bash
git add src/components/Breadcrumb.astro
git commit -m "feat: add Breadcrumb component"
```

---

### Task 2: CTABlock Component

**Files:**
- Create: `src/components/CTABlock.astro`

**Step 1: Create the component**

```astro
---
import Button from './Button.astro';

interface Props {
  headline?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

const {
  headline = 'Ready to start?',
  description = 'Schedule your free 30-minute site visit. We come to your location, assess the wall, and give you an honest answer about what it will take.',
  primaryHref = '/price-estimator',
  primaryLabel = 'Get a Free Estimate',
  secondaryHref = '/contact',
  secondaryLabel = 'Contact Us',
} = Astro.props;
---

<section class="border-t border-slate-gray py-[var(--spacing-section)] px-6 lg:px-12">
  <div class="max-w-3xl">
    <h2 class="font-heading text-titanium-white mb-4" style="font-size: var(--text-fluid-3xl); line-height: 1.1; letter-spacing: -0.02em;">
      {headline}
    </h2>
    <p class="font-body text-shadow-gray mb-8" style="font-size: var(--text-fluid-lg); line-height: 1.5;">
      {description}
    </p>
    <div class="flex flex-row items-center gap-6">
      <Button href={primaryHref}>{primaryLabel}</Button>
      <Button href={secondaryHref} variant="ghost">{secondaryLabel}</Button>
    </div>
  </div>
</section>
```

**Step 2: Commit**

```bash
git add src/components/CTABlock.astro
git commit -m "feat: add CTABlock component"
```

---

### Task 3: FAQSection Component

**Files:**
- Create: `src/components/FAQSection.astro`

**Step 1: Create the component**

```astro
---
interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
  heading?: string;
}

const { items, heading = 'Frequently asked questions' } = Astro.props;
---

<section class="py-[var(--spacing-section)] px-6 lg:px-12">
  <h2 class="font-heading text-titanium-white mb-12" style="font-size: var(--text-fluid-2xl); line-height: 1.2;">
    {heading}
  </h2>
  <dl class="max-w-3xl divide-y divide-slate-gray">
    {items.map((item) => (
      <div class="py-8">
        <dt class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-lg); line-height: 1.4;">
          {item.question}
        </dt>
        <dd class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          {item.answer}
        </dd>
      </div>
    ))}
  </dl>
</section>
```

**Step 2: Commit**

```bash
git add src/components/FAQSection.astro
git commit -m "feat: add FAQSection component"
```

---

### Task 4: ServiceCard Component

**Files:**
- Create: `src/components/ServiceCard.astro`

**Step 1: Create the component**

```astro
---
interface Props {
  title: string;
  description: string;
  href: string;
}

const { title, description, href } = Astro.props;
---

<a href={href} class="group block border border-slate-gray p-8 hover:border-soft-gray transition-colors">
  <h3 class="font-heading text-titanium-white mb-3 group-hover:text-soft-gray transition-colors" style="font-size: var(--text-fluid-xl); line-height: 1.2;">
    {title}
  </h3>
  <p class="font-body text-shadow-gray mb-6" style="font-size: var(--text-fluid-base); line-height: 1.6;">
    {description}
  </p>
  <span class="font-mono text-smoke-gray uppercase group-hover:text-titanium-white transition-colors" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
    Learn more &rarr;
  </span>
</a>
```

**Step 2: Commit**

```bash
git add src/components/ServiceCard.astro
git commit -m "feat: add ServiceCard component"
```

---

### Task 5: RelatedPages Component

**Files:**
- Create: `src/components/RelatedPages.astro`

**Step 1: Create the component**

```astro
---
interface RelatedPage {
  title: string;
  href: string;
  description?: string;
}

interface Props {
  heading?: string;
  pages: RelatedPage[];
}

const { heading = 'Related', pages } = Astro.props;
---

<section class="py-[var(--spacing-section)] px-6 lg:px-12 border-t border-slate-gray">
  <p class="font-mono text-smoke-gray uppercase mb-8" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
    {heading}
  </p>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
    {pages.map((page) => (
      <a href={page.href} class="group block border border-slate-gray p-6 hover:border-soft-gray transition-colors">
        <h3 class="font-heading text-titanium-white group-hover:text-soft-gray transition-colors mb-2" style="font-size: var(--text-fluid-lg); line-height: 1.3;">
          {page.title}
        </h3>
        {page.description && (
          <p class="font-body text-smoke-gray" style="font-size: var(--text-fluid-sm); line-height: 1.5;">
            {page.description}
          </p>
        )}
      </a>
    ))}
  </div>
</section>
```

**Step 2: Commit**

```bash
git add src/components/RelatedPages.astro
git commit -m "feat: add RelatedPages component"
```

---

### Task 6: JournalCard Component

**Files:**
- Create: `src/components/JournalCard.astro`

**Step 1: Create the component**

```astro
---
interface Props {
  title: string;
  description: string;
  date: Date;
  href: string;
  tags?: string[];
}

const { title, description, date, href, tags = [] } = Astro.props;

const formatted = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---

<a href={href} class="group block">
  <time class="font-mono text-smoke-gray uppercase block mb-2" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
    {formatted}
  </time>
  <h3 class="font-heading text-titanium-white group-hover:text-soft-gray transition-colors mb-2" style="font-size: var(--text-fluid-xl); line-height: 1.2;">
    {title}
  </h3>
  <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
    {description}
  </p>
  {tags.length > 0 && (
    <div class="flex gap-3 mt-3">
      {tags.map((tag) => (
        <span class="font-mono text-smoke-gray uppercase" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
          {tag}
        </span>
      ))}
    </div>
  )}
</a>
```

**Step 2: Commit**

```bash
git add src/components/JournalCard.astro
git commit -m "feat: add JournalCard component"
```

---

## Phase 2: Nav & Footer (Tasks 7-8)

---

### Task 7: Update Nav

**Files:**
- Modify: `src/components/Nav.astro`

**Step 1: Update nav links and add CTA button**

Replace the `navLinks` array and add a CTA button to both desktop and mobile nav. Keep the existing logo, mobile menu toggle, and scroll behavior scripts.

New nav links:
```js
const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];
```

Add after the desktop `<ul>`: a CTA button link to `/price-estimator` styled with `Button.astro` or inline as a distinct button element.

Add the same CTA at the bottom of the mobile menu.

**Step 2: Verify the dev server shows updated nav**

Run: `npm run dev` (if not running)
Check: `http://localhost:4321` — nav should show About, Work, Journal, Contact, + CTA button

**Step 3: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: update nav with new site structure and CTA button"
```

---

### Task 8: Update Footer

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Restructure footer with three-column link grid**

Keep the existing philosophy quote, email, social links, and copyright. Add a three-column link section above them:

Column 1 — Services: Murals (`/murals`), Hand-Painted Signs (`/hand-painted-signs`), Sign Restoration (`/hand-painted-signs/sign-restoration`), Price Estimator (`/price-estimator`)

Column 2 — Learn More: Journal (`/journal`), Mural Cost Guide (`/murals/mural-cost-richmond-va`), Hand-Painted vs Vinyl (`/hand-painted-signs/hand-painted-vs-vinyl`), Ghost Signs Richmond (`/hand-painted-signs/sign-restoration/ghost-signs-richmond-va`), VARA Compliance (`/murals/vara-compliance`)

Column 3 — Company: About (`/about`), Process (`/about/process`), Philosophy (`/about/philosophy`), Insurance & Licensing (`/about/insurance-and-licensing`), Press (`/about/press`), Contact (`/contact`)

**Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: restructure footer with SEO link columns"
```

---

## Phase 3: Content Collections (Tasks 9-10)

---

### Task 9: Add Journal Content Collection

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/content/journal/how-much-does-a-mural-cost.md`
- Create: `src/content/journal/hand-painted-vs-vinyl.md`

**Step 1: Add journal collection to config**

Add a `journal` collection alongside the existing `projects` collection in `content.config.ts`:

```ts
const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    author: z.string().default('Spencer Bennett'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects, journal };
```

**Step 2: Create two starter journal posts**

Each post should have proper frontmatter and placeholder body content explaining what the post covers, what keywords it targets, what service pages it should link to, and what CTA to use.

Post 1: `how-much-does-a-mural-cost.md` — targets "mural cost Richmond VA," links to `/murals/mural-cost-richmond-va` and `/price-estimator`

Post 2: `hand-painted-vs-vinyl.md` — targets "hand-painted signs vs vinyl," links to `/hand-painted-signs/hand-painted-vs-vinyl` and `/hand-painted-signs/cost-per-year-comparison`

**Step 3: Commit**

```bash
git add src/content.config.ts src/content/journal/
git commit -m "feat: add journal content collection with 2 starter posts"
```

---

### Task 10: Move Project Case Studies Under Murals

**Files:**
- Modify: `src/pages/murals/[...slug].astro` (created in Phase 4)
- Remove or repurpose: `src/pages/work/[...slug].astro`

The existing `work/[...slug].astro` case study renderer needs to move to `murals/[...slug].astro` so project URLs become `/murals/short-pump-park` instead of `/work/short-pump-park`.

This task is completed as part of Task 13 (Murals hub) since the catch-all route is created there. The old `work/[...slug].astro` should be removed once the murals catch-all is confirmed working.

**Step 1: Verify existing case study renders at new URL after Task 13**

Check: `http://localhost:4321/murals/short-pump-park`

**Step 2: Remove old catch-all**

Delete `src/pages/work/[...slug].astro`

**Step 3: Commit**

```bash
git rm src/pages/work/[...slug].astro
git commit -m "refactor: move project case studies from /work to /murals"
```

---

## Phase 4: Hub Pages (Tasks 11-16)

Each hub page uses the hub template: eyebrow, headline, description, card grid linking to subpages, and CTA block.

---

### Task 11: Work Overview Page

**Files:**
- Modify: `src/pages/work/index.astro`

**Step 1: Rewrite as services overview**

Replace the current portfolio grid with a services overview page. Two large `ServiceCard` components linking to `/murals` and `/hand-painted-signs`. Include a brief introductory paragraph explaining what UMM does (placeholder). Add a CTA block at the bottom.

The page should explain (in placeholder text) that this is the services overview — the visitor's doorway to learning about murals and sign work.

**Step 2: Commit**

```bash
git add src/pages/work/index.astro
git commit -m "feat: rewrite /work as services overview page"
```

---

### Task 12: About Hub Page

**Files:**
- Create: `src/pages/about/index.astro`

**Step 1: Create about hub**

Eyebrow: "About." Headline placeholder noting this is NOT a biography — it's about the client's transformation. Card grid linking to: Process, Philosophy, Insurance & Licensing, Press. CTA block.

Placeholder text should note the StoryBrand structure: open with empathy, then establish authority.

**Step 2: Commit**

```bash
git add src/pages/about/index.astro
git commit -m "feat: add /about hub page"
```

---

### Task 13: Murals Hub Page

**Files:**
- Create: `src/pages/murals/index.astro`
- Create: `src/pages/murals/[...slug].astro`

**Step 1: Create murals hub**

Eyebrow: "Murals." Card grid linking to all 11 mural subpages. Section showing featured projects filtered from the projects content collection (tag: "mural"). Cross-hub link to Hand-Painted Signs. CTA block.

**Step 2: Create catch-all route for mural case studies**

Copy the rendering logic from the existing `work/[...slug].astro` into `murals/[...slug].astro`. This renders project markdown files at `/murals/short-pump-park`, etc.

**Step 3: Commit**

```bash
git add src/pages/murals/
git commit -m "feat: add /murals hub page and case study renderer"
```

---

### Task 14: Hand-Painted Signs Hub Page

**Files:**
- Create: `src/pages/hand-painted-signs/index.astro`

**Step 1: Create signs hub**

Eyebrow: "Hand-Painted Signs." Card grid linking to all 9 sign subpages + the Sign Restoration section. Cross-hub link to Murals. CTA block.

**Step 2: Commit**

```bash
git add src/pages/hand-painted-signs/index.astro
git commit -m "feat: add /hand-painted-signs hub page"
```

---

### Task 15: Sign Restoration Hub Page

**Files:**
- Create: `src/pages/hand-painted-signs/sign-restoration/index.astro`

**Step 1: Create restoration hub (nested under signs)**

Eyebrow: "Sign Restoration." Breadcrumb: Home > Work > Hand-Painted Signs > Sign Restoration. Card grid linking to 5 restoration subpages. Parent link back to Signs hub. CTA block.

**Step 2: Commit**

```bash
git add src/pages/hand-painted-signs/sign-restoration/index.astro
git commit -m "feat: add sign restoration hub page under /hand-painted-signs"
```

---

### Task 16: Journal Index Page

**Files:**
- Create: `src/pages/journal/index.astro`
- Create: `src/pages/journal/[...slug].astro`

**Step 1: Create journal index**

Lists all journal posts from the content collection, sorted by date descending. Each post rendered as a `JournalCard`. CTA block at the bottom.

**Step 2: Create journal post renderer**

Renders individual journal posts from markdown. Layout: date + tags, h1, optional cover image, markdown body, related posts (2-3 by matching tags), CTA block.

**Step 3: Commit**

```bash
git add src/pages/journal/
git commit -m "feat: add /journal index and post renderer"
```

---

## Phase 5: Service Subpages (Tasks 17-19)

All service subpages follow the same template. Build them in batches by hub.

---

### Task 17: Mural Subpages (11 pages)

**Files to create:**
- `src/pages/murals/business-murals-richmond-va.astro`
- `src/pages/murals/outdoor-murals-richmond-va.astro`
- `src/pages/murals/property-owner-murals-richmond-va.astro`
- `src/pages/murals/mural-cost-richmond-va.astro`
- `src/pages/murals/indoor-murals-richmond-va.astro`
- `src/pages/murals/real-estate-developer-murals.astro`
- `src/pages/murals/public-art-murals-richmond-va.astro`
- `src/pages/murals/vara-compliance.astro`
- `src/pages/murals/mural-maintenance.astro`

Note: "How It Works" and "Certificate of Provenance" from the Growth Engine map to `/about/process` and can be linked from mural subpages rather than duplicated. This keeps the sitemap DRY.

**Step 1: Create each page using the service subpage template**

Each page gets:
- Breadcrumb: Home > Work > Murals > [Page Title]
- H1 matching the SEO target keyword
- Placeholder body with StoryBrand structure sections noted
- FAQ section with 3-4 placeholder Q&A pairs specific to the topic
- Related pages linking to 3-4 sibling mural subpages
- CTA block

The `/murals/mural-cost-richmond-va.astro` page should include a prominent link to `/price-estimator` and note that the cost estimator will be embedded here.

**Step 2: Verify build**

Run: `npm run build`
Expected: All pages generate without errors

**Step 3: Commit**

```bash
git add src/pages/murals/*.astro
git commit -m "feat: add 9 mural service subpages"
```

---

### Task 18: Sign Subpages (9 pages)

**Files to create:**
- `src/pages/hand-painted-signs/storefront-signs-richmond-va.astro`
- `src/pages/hand-painted-signs/gold-leaf-signs.astro`
- `src/pages/hand-painted-signs/window-lettering.astro`
- `src/pages/hand-painted-signs/bar-and-restaurant-signs.astro`
- `src/pages/hand-painted-signs/interior-signs.astro`
- `src/pages/hand-painted-signs/hand-painted-menus.astro`
- `src/pages/hand-painted-signs/hand-painted-vs-vinyl.astro`
- `src/pages/hand-painted-signs/cost-per-year-comparison.astro`
- `src/pages/hand-painted-signs/why-hand-painted-signs-last-longer.astro`

**Step 1: Create each page using the service subpage template**

Same structure as mural subpages. Breadcrumb: Home > Work > Hand-Painted Signs > [Page Title]. Related pages link to sibling sign subpages. Cross-link to Sign Restoration where relevant.

The `/hand-painted-signs/hand-painted-vs-vinyl.astro` page is high-value — note in placeholder that it should include the 12-year cost breakdown comparison.

**Step 2: Verify build and commit**

```bash
git add src/pages/hand-painted-signs/*.astro
git commit -m "feat: add 9 hand-painted sign service subpages"
```

---

### Task 19: Sign Restoration Subpages (5 pages)

**Files to create:**
- `src/pages/hand-painted-signs/sign-restoration/ghost-signs-richmond-va.astro`
- `src/pages/hand-painted-signs/sign-restoration/historic-sign-restoration.astro`
- `src/pages/hand-painted-signs/sign-restoration/secretary-of-interior-standards.astro`
- `src/pages/hand-painted-signs/sign-restoration/sign-restoration-cost.astro`
- `src/pages/hand-painted-signs/sign-restoration/how-it-works.astro`

**Step 1: Create each page**

Breadcrumb: Home > Work > Hand-Painted Signs > Sign Restoration > [Page Title]. Related pages link to sibling restoration subpages + parent sign subpages.

The ghost signs page should note it will become a comprehensive photo guide — a backlink magnet per the Growth Engine.

**Step 2: Verify build and commit**

```bash
git add src/pages/hand-painted-signs/sign-restoration/*.astro
git commit -m "feat: add 5 sign restoration subpages"
```

---

## Phase 6: About Subpages (Task 20)

---

### Task 20: About Subpages (4 pages)

**Files to create:**
- `src/pages/about/process.astro`
- `src/pages/about/philosophy.astro`
- `src/pages/about/insurance-and-licensing.astro`
- `src/pages/about/press.astro`

**Step 1: Create each page**

- **Process:** Explains the provenance methodology and three service tiers (Radical Locality, Narrative Cartography, Object Biography). Links to Certificate of Provenance explanation. Breadcrumb: Home > About > Process.
- **Philosophy:** Discovery-first approach. "Meaning discovered, not imposed." Breadcrumb: Home > About > Philosophy.
- **Insurance & Licensing:** Placeholder for credentials, insurance details, licensing. Breadcrumb: Home > About > Insurance & Licensing.
- **Press:** Placeholder list for media mentions. Breadcrumb: Home > About > Press.

Each gets a CTA block and related links to sibling about pages.

**Step 2: Commit**

```bash
git add src/pages/about/*.astro
git commit -m "feat: add 4 about subpages"
```

---

## Phase 7: Standalone Pages (Tasks 21-22)

---

### Task 21: Contact Page

**Files:**
- Create: `src/pages/contact.astro`

**Step 1: Create contact page**

H1: "Contact." Address, email, placeholder for phone. Placeholder form with fields noted: name, email, phone, project type (mural/sign/restoration), brief description, timeline. CTA button text: "Schedule Your Free 30-Minute Site Visit." Note that form handler (Cloudflare Worker) will be wired later.

**Step 2: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: add /contact page"
```

---

### Task 22: Price Estimator Page

**Files:**
- Create: `src/pages/price-estimator/index.astro`

**Step 1: Create lead gen page**

H1: "Richmond Mural Price Estimator." Placeholder form with fields noted: wall dimensions, complexity level, surface type, interior/exterior. Pricing tiers documented in placeholder text (from Growth Engine). Note that the calculator logic and email capture will be built later. Links to `/murals/mural-cost-richmond-va` for the full cost guide.

**Step 2: Commit**

```bash
git add src/pages/price-estimator/index.astro
git commit -m "feat: add /price-estimator lead gen page"
```

---

## Phase 8: Homepage Restructure (Task 23)

---

### Task 23: Update Homepage (preserve hero)

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/sections/ServicesOverview.astro`
- Create: `src/components/sections/FeaturedProject.astro`
- Create: `src/components/sections/TestimonialSection.astro`
- Create: `src/components/sections/JournalPreview.astro`

**Step 1: Create new homepage section components**

- **ServicesOverview:** Two large `ServiceCard` components for Murals and Signs
- **FeaturedProject:** Single featured case study (query projects collection for `featured: true`), large image placeholder + title + description + link
- **TestimonialSection:** Placeholder for a client quote with attribution
- **JournalPreview:** Query latest 3 journal posts, render as `JournalCard` components

**Step 2: Update index.astro**

Replace the page body (NOT the hero) with:
```
HeroSection (UNTOUCHED)
ServicesOverview (NEW)
FeaturedProject (NEW — replaces PortfolioGrid)
ProcessSection (EXISTS — repositioned)
TestimonialSection (NEW)
JournalPreview (NEW)
CTABlock (NEW)
```

**Step 3: Commit**

```bash
git add src/components/sections/ServicesOverview.astro \
       src/components/sections/FeaturedProject.astro \
       src/components/sections/TestimonialSection.astro \
       src/components/sections/JournalPreview.astro \
       src/pages/index.astro
git commit -m "feat: restructure homepage with services, featured project, testimonial, journal preview"
```

---

## Phase 9: Cleanup & Verification (Tasks 24-25)

---

### Task 24: Remove Unused Components and Pages

**Files to evaluate:**
- `src/pages/work/signs.astro` — evaluate if still needed or replaced by `/hand-painted-signs`
- `src/components/sections/PortfolioGrid.astro` — removed from homepage, evaluate if used elsewhere
- `src/components/sections/StakesSection.astro` — check if used
- `src/components/sections/ValuePropSection.astro` — check if used
- `src/components/sections/GuideSection.astro` — check if used
- `src/components/sections/ExplanatorySection.astro` — check if used
- `src/components/sections/PortfolioPreview.astro` — check if used
- `src/components/sections/CTASection.astro` — check if replaced by CTABlock
- `src/components/ProjectCard.astro` — check if used
- `src/components/SectionWrapper.astro` — check if used

**Step 1: Search for imports of each component**

Run grep for each component name across all `.astro` files. If not imported anywhere, remove it.

**Step 2: Commit removals**

```bash
git add -A
git commit -m "chore: remove unused components and pages"
```

---

### Task 25: Full Build Verification

**Step 1: Run production build**

Run: `npm run build`
Expected: Zero errors. All 46 pages generate.

**Step 2: Count generated pages**

Run: `find dist -name "*.html" | wc -l`
Expected: ~46 HTML files

**Step 3: Spot-check internal links**

Start dev server, manually click through:
- Homepage → Work → Murals → Business Murals → breadcrumb back to Murals → breadcrumb to Work
- Homepage → Work → Signs → Sign Restoration → Ghost Signs → related pages
- Homepage → Journal → click a post → related posts
- Nav CTA → Price Estimator
- Footer links → verify 3-4 random links resolve

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete UMM full site skeleton — 46 pages, all links wired"
```

---

## Execution Notes

- **Do NOT modify `src/components/sections/HeroSection.astro`** at any point
- **Use inline `style` attributes** for fluid type sizes (the `text-[length:var(...)]` Tailwind syntax has a known issue in this project — see previous session notes)
- **Every placeholder paragraph** should explain what copy goes there, what StoryBrand section it represents, and what keywords to target
- **Every page** imports `BaseLayout`, `Nav`, and `Footer`
- **Use context7** before writing any Astro 6-specific code (content collections API, etc.)
