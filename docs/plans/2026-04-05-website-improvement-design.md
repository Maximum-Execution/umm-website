# UMM Website Improvement Design

**Date:** 2026-04-05
**Approach:** Systems-First, Phased Rollout
**Visual Direction:** Keep current dark/Pentagram-inspired aesthetic, polish execution

---

## Decisions Made

- **Phased rollout.** Launch a solid V1 within a week, iterate with content depth and advanced SEO while the site is live.
- **Visual direction stays.** Dark theme, 5-font hierarchy, art-gallery vibe. Fix execution, not direction.
- **Gallery = hybrid showcase.** Featured work first, then organized categories below.
- **Price Estimator is Phase 1 priority.** Interactive mural cost estimator as a lead generator. Highest-intent conversion tool on the site.
- **Nav CTA becomes "Get a Price Estimate."** Replaces "Free Discovery Session" in the nav. Discovery session CTAs remain in hero sections and CTABlocks throughout the site.
- **Keep all 12 journal stubs.** Fix them in Phase 2, not now.

---

## Phase 1: Shared Systems and V1 Launch

### 1.1 Gallery Page Redesign (`/work`)

Current state: two text-only ServiceCard boxes. Redesign as a hybrid showcase.

**New structure:**
1. Breadcrumb (Home > Gallery)
2. Hero headline. Short declarative line, no subhead.
3. Featured Projects strip. 3-5 large-format images from the best work, asymmetric grid. Each links to its case study. Minimal text overlay: project title and location only.
4. Category sections. Two full-width visual bands:
   - Murals: background image, h2, one-liner, "Explore" link to `/murals`
   - Hand-Painted Signs: same pattern, links to `/hand-painted-signs`
5. Brand Mark callout. "Starting at $500" + link to `/brand-mark`.
6. CTABlock.

### 1.2 Mural Cost Estimator (`/mural-cost-estimator`)

Interactive tool that captures leads by offering immediate value (a price range).

**User flow:**
1. User selects wall dimensions (preset sizes or custom input)
2. User selects surface type (brick, stucco, wood, concrete, interior drywall)
3. User selects complexity level (simple graphics/lettering, moderate detail, high detail/photorealistic)
4. User selects indoor vs outdoor
5. Tool displays an estimated price range based on inputs
6. To get the full detailed estimate and schedule a site visit, user submits: name, email, phone (optional), project description
7. Form submission goes to Formspree (same as contact form) or a dedicated endpoint

**Pricing logic:** Based on Spencer's actual pricing. Per-square-foot ranges adjusted by surface type and complexity multipliers. The tool gives a range (e.g., "$2,400 - $4,800"), not a fixed quote. Disclaimer: "Final pricing depends on site conditions and design complexity. This estimate gives you a starting point."

**SEO value:** Rename the URL from `/price-estimator` to `/mural-cost-estimator` for search intent alignment. Title: "Mural Cost Estimator | How Much Does a Mural Cost? | Untitled Mixed Media". This page targets the exact query AI chatbots get asked.

**Technical notes:**
- Zero JavaScript framework. Pure Astro component with vanilla JS for the interactive form.
- No external dependencies. Form math runs client-side. Form submission via fetch to Formspree.
- `client:visible` or inline `<script>` for the calculator logic.

### 1.3 Navigation Updates

**Nav CTA button:** Replace "Free Discovery Session" with "Get a Price Estimate" linking to `/mural-cost-estimator`.

**Footer:** Rename "Services" column header to "Gallery". Keep the same links (Murals, Hand-Painted Signs, Sign Restoration, Brand Mark).

**Gallery link:** Already done. "Gallery" replaces "Murals" and "Signs" in the main nav, links to `/work`.

### 1.4 Homepage Section Flow Polish

Section order stays the same. Targeted fixes:

- **FeaturedGrid:** Improve visibility of the "Selected Work / View all" header. Subtle section label or thin rule above it.
- **ProcessSection:** Increase visual weight of step labels ("01 / Discover"). Slightly larger step numbers or accent color treatment.
- **ServiceShowcase:** Keep direct links to `/murals` and `/hand-painted-signs` (not to Gallery). Homepage is the one place where direct service links make sense as an alternative path.
- **Journal Preview:** Show all posts. They'll get real content in Phase 2.
- **Brand Mark Callout:** No changes. Solid as-is.
- **Estimator callout:** Add a new section (between ServiceShowcase and Brand Mark Callout, or between Brand Mark and Journal) promoting the cost estimator. Short, direct: "Wondering what your mural will cost?" + button to the estimator.

### 1.5 Shared Component Fixes

**BaseLayout.astro — Structured Data:**
- **FAQSchema:** Accept FAQ items as a prop. Render `FAQPage` JSON-LD in `<head>` when present. Every service page already has FAQ content; this adds the schema wrapper.
- **BreadcrumbSchema:** Accept breadcrumb items as a prop. Render `BreadcrumbList` JSON-LD in `<head>`.
- **ServiceSchema:** Accept a service prop for service pages. Render `Service` JSON-LD with name, description, provider, areaServed, priceRange.

**CTABlock.astro:**
- Standardize trust line across all instances: "Free site visit. You see the design before we start. Richmond, VA and surrounding areas."
- Primary CTA: "Schedule Your Free Discovery Session" (this is where the discovery session lives now that it's out of the nav)
- Secondary CTA: "See Our Work" or "Get a Price Estimate" depending on context

**FAQSection.astro:**
- Add `id` prop for each FAQ item so they can be directly linked (useful for AI chatbot citation).

**Footer.astro:**
- Rename "Services" column to "Gallery"
- Newsletter form backend: defer to Phase 2 (MailerLite integration)

### 1.6 Image Handling (V1 Level)

- Keep raw `<img>` tags for now (Astro `<Image>` migration is Phase 3)
- Replace every "Image placeholder" alt text with descriptive, keyword-rich alt text
- Ensure explicit `width` and `height` on every `<img>` to prevent layout shift
- Hero images: `loading="eager"` + `fetchpriority="high"`
- Below-fold images: `loading="lazy"`

### 1.7 Orphan Route Cleanup

- Redirect or remove `/work/signs.astro` (signs content lives at `/hand-painted-signs/`)
- Resolve duplicate case study routes: pick `/work/[slug]` as canonical, remove `/murals/[slug]` dynamic route or redirect it

---

## Phase 2: Content Depth and AI-SEO

Runs after V1 is live and the domain is cut over.

### 2.1 AI-SEO Content Patterns

Structure content so AI chatbots cite the site when users ask about murals and signs in Richmond.

**Key patterns:**
- **Definition + context blocks.** Open service pages with a factual paragraph answering "what is [service]" before selling. AI chatbots pull these as answer snippets.
- **Specific numbers.** Pricing ranges, timelines, durability claims with concrete data on every service page.
- **Richmond-specific authority.** Mention specific neighborhoods, local regulations (VARA, historic districts), climate considerations (Virginia humidity, UV, freeze-thaw), local references no national competitor can replicate.
- **Process transparency.** Expand beyond the 3-step overview. What happens at the site visit, what tools are used (Blender, RealityCapture), what paints and why, sealant schedules. Technical specificity signals expertise.
- **FAQ answers as standalone knowledge.** Every FAQ answer should be a complete, self-contained paragraph that could stand alone as a chatbot response. No "Contact us to learn more." Actual answers with numbers, timelines, specifics.

### 2.2 Journal Article Development

Write real content for all 12 existing stubs. Priority order:

**Tier 1 (Highest buyer intent):**
1. How Much Does a Mural Cost in Richmond, VA?
2. Hand-Painted Signs vs Vinyl: A 12-Year Cost Breakdown
3. The Mural Process from Start to Finish
4. Why Businesses Invest in Murals

**Tier 2 (Authority builders):**
5. How to Choose a Muralist in Richmond, VA
6. What Makes a Mural Last?
7. Gold Leaf Lettering Explained

**Tier 3 (Long-tail):**
8-12. Ghost signs history, VARA guide, interior murals vs wallpaper, sign care guide, public art funding

**Target:** 1000-1500 words per article. Dense, specific, Richmond-focused.

**Internal linking:** Every article links to 2-3 service pages and 1-2 other journal articles.

### 2.3 Service Page Copy Expansion

Expand each service page from 300-500 words to 800-1200 words:
- Opening factual paragraph (what, who, where)
- Process section specific to that service type
- Materials and durability section
- Pricing context (ranges, factors, inclusions)
- Richmond-specific details
- Expanded FAQ (6-8 questions with substantive answers)

### 2.4 Contextual Internal Linking

Add links within body copy (not just in RelatedPages at the bottom):
- Service pages link to relevant journal articles
- Journal articles link to service pages
- Case studies link to their service type
- FAQ answers link to deeper resources

### 2.5 Newsletter Backend

Wire footer signup form to MailerLite. POST to MailerLite API, subscribe to "Website Signup" group.

---

## Phase 3: Refinement and Performance

Runs once Phase 2 content is live and real traffic data is available.

### 3.1 Performance Optimization

- **Astro `<Image>` migration.** Replace raw `<img>` with `<Image>` from `astro:assets`. Automatic WebP, dimensions, blur placeholders.
- **Hero image preload.** `<link rel="preload" as="image">` in BaseLayout.
- **Font subsetting.** Evaluate subsetting Canela Blackletter (logo only) to save 20-40KB.
- **Lighthouse audit.** Target 90+ Performance on mobile.

### 3.2 Advanced Structured Data

- **PersonSchema** on About page for Spencer Bennett
- **ArticleSchema** on journal posts
- **ReviewSchema** when real testimonial/rating data is available

### 3.3 Content Expansion Based on Data

After 4-6 weeks live:
- Review Search Console for near-page-1 queries. Write targeted content.
- Review AI chatbot responses for target queries. Analyze competitor citations.
- Expand journal based on traffic patterns.

### 3.4 Route Cleanup

- Resolve any remaining duplicate routes
- Audit for orphan pages

### 3.5 Brand Mark Page Enhancement

- Real product photography
- "Recent Brand Marks" gallery section
- Dedicated Brand Mark intake form (name, logo upload, wall vs panel preference)

---

## Architecture Overview

```
Navigation:
  Gallery (/work) — Brand Mark (/brand-mark) — About (/about) — Journal (/journal) — Contact (/contact)
  CTA Button: "Get a Price Estimate" (/mural-cost-estimator)

Gallery (/work):
  Featured Projects (hero-scale images)
  Murals (/murals) — 8 service sub-pages + case studies
  Hand-Painted Signs (/hand-painted-signs) — 9 sub-pages + restoration hub (5 sub-pages)
  Brand Mark callout

Lead Generation:
  /mural-cost-estimator — interactive tool, captures email for detailed estimate
  /contact — general inquiry form (Formspree)
  CTABlocks on every page — "Schedule Your Free Discovery Session"

Content:
  /journal — 12 articles (SEO + AI-SEO authority)
  Service sub-pages — detailed guides with FAQ schema
  Case studies — portfolio proof (/work/[slug])
```

---

## Success Criteria

**Phase 1 (V1 Launch):**
- Gallery page shows featured work visually, not text-only boxes
- Cost estimator captures leads with email
- Nav CTA drives to estimator
- Structured data (FAQ, Breadcrumb, Service schemas) renders on all applicable pages
- All images have descriptive alt text
- Site builds clean, zero console errors
- Domain cut over to Cloudflare Pages

**Phase 2 (Content Depth):**
- All 12 journal articles have real 1000-1500 word content
- Service pages expanded to 800-1200 words each
- AI chatbots cite the site for "murals Richmond VA" queries
- Internal linking mesh connects all content

**Phase 3 (Refinement):**
- Lighthouse 90+ Performance on mobile
- All images served as WebP via Astro `<Image>`
- Advanced schema in place
- Content strategy informed by real traffic data
