# UMM Website Audit — 2026-04-22

**Site:** [umm-website.pages.dev](https://umm-website.pages.dev/) (Cloudflare Pages preview)
**Production target:** untitledmixedmedia.com
**Audit lens:** Lead conversion. Every finding weighted against the 90-day campaign goal of $6,000/mo (20 contacts/mo × 5% = 1 closed job).
**Scope:** Report only. No code changes this session.

---

## 1. Executive Summary

### What's Strong

The site has a real craft foundation. The Astro 6 build ships zero JavaScript on every page inspected (0 scripts on home, murals, contact, brand-mark), FCP on the homepage is 708 ms, and CLS on every sampled page is under 0.025. The 5-font typographic system is self-hosted and tight. The SEO plumbing in [BaseLayout.astro:77-178](src/layouts/BaseLayout.astro) already renders LocalBusiness JSON-LD unconditionally and conditional FAQ / Breadcrumb / Service / BlogPosting schema. The V4 BrandScript villain boundaries are mostly respected at the page-structure level. Accessibility passes cleanly on 3 of the 5 sampled pages with zero WCAG 2.1 AA violations.

This is not a broken site. It's a well-built site with a conversion layer that hasn't been finished.

### Top 3 Revenue-Blocking Issues

1. **The Brand Mark page — the $500 on-ramp to every other service — renders 9 unfilled bracket placeholders live:** `[phone]`, `[X]`, `[year]` in body copy and CTAs ([src/pages/brand-mark.astro](src/pages/brand-mark.astro)). A prospect reading "Only [X] spots remaining" immediately distrusts everything else. The cheapest offer in the catalog cannot close while these render. **P0.**

2. **Zero conversion measurement exists.** No Plausible, GA, or any analytics script was detected on any sampled page. The 90-day campaign math (20 contacts × 5% = 1 close) can't be validated because contact events aren't being captured. Every other CRO recommendation in this document becomes an untestable hypothesis without this. **P0.**

3. **The newsletter form on the Journal is a prop.** `src/pages/journal/index.astro:145` contains a TODO: the form shows a success message client-side but never POSTs to MailerLite. Every email entered since launch has been dropped. The Journal is the top-of-funnel lead magnet; it currently leaks 100% of captures. **P0.**

### Top 3 Quick Wins (ship the same afternoon)

1. **Fill the 9 Brand Mark placeholders.** Replace `[phone]` with "hello@untitledmixedmedia.com" or "(site visit only)", `[X] remaining` with the actual current count or remove the scarcity line if it isn't true yet, `[year]` with `2026`. 20 minutes of work, unblocks the cheapest conversion path.

2. **Add Plausible to [BaseLayout.astro:73](src/layouts/BaseLayout.astro).** One `<script defer data-domain="untitledmixedmedia.com" src="https://plausible.io/js/script.js"></script>` line. Event goals for Formspree success and `?type=brand-mark` submissions. Required before any other conversion claim can be measured.

3. **Replace the `mailto:` links at the end of case studies with a `/contact` button.** The current "Have a similar project? Email us" pattern in [src/pages/work/[...slug].astro](src/pages/work/[...slug].astro) drops the user into their mail client — no tracking, no form, no budget qualification. Push them to the real lead form instead.

### Summary: The Shape of the Gap

The site's craft layer is at 85%. The conversion layer is at 40%. The fastest path to the $6K/mo target is not redesigning anything — it's finishing the plumbing on pages that already look right, turning on measurement, and killing a small number of P0 trust-killing bugs. Most of the P0 list can land in one two-day push.

---

## 2. Site Inventory

### Routes (28 live URLs)

| Category | Count | Paths |
|---|---|---|
| Core marketing | 4 | `/`, `/work/`, `/about/*`, `/contact/` |
| Services | 4 | `/services/`, `/murals/`, `/hand-painted-signs/`, `/brand-mark/` |
| Work | 3+ | `/work/[slug]` (3 content-collection case studies) |
| Journal | 5+2 | 5 MD collection posts + 2 manual `.astro` posts |
| Tools | 1 | `/mural-cost-estimator/` |
| Legal | 3 | `/privacy/`, `/terms/`, `/404` |

### Content Sources

- **Astro Content Collections** — `src/content/projects/*.md` (case studies) and `src/content/journal/*.md` (journal)
- **Manual `.astro` pages** — 2 journal posts live outside the collection (inconsistent)
- **Public static images** — 105 MB across 88 files in `public/images/`

### Integrations

| System | Status | Notes |
|---|---|---|
| Formspree (`xpwrzqkl`) | Live, working | Hardcoded in [contact.astro:79, 147](src/pages/contact.astro). Should move to env var. |
| MailerLite | **Not wired** | TODO on [journal/index.astro:145](src/pages/journal/index.astro). Form fakes success. |
| Plausible / GA | **Not installed** | No analytics script detected on any page. |
| Sentry | Not installed | No error monitoring. |
| Cloudflare Pages | Live | Auto-deploys from GitHub `main`. |
| JSON-LD | Strong | LocalBusiness always; FAQ/Breadcrumb/Service/BlogPosting conditional. |

### Git State Note

Most recent commit is a **revert of the `/work` URL architecture migration**. Routing is coherent under the current setup, but the revert should be understood as "the prior URL restructure is rolled back" — anyone reading future planning docs referencing the old architecture will be confused. Flag for a short ADR or Notion note.

---

## 3. Findings by Audit Track

### Track A — Conversion & Lead Capture

#### A1. No analytics on any page. [P0]
**Evidence:** Playwright scan of home, murals, contact, brand-mark, case study — `<script src>` for Plausible/GA/Segment absent on all.
**Revenue impact:** The entire 90-day campaign is untestable. There is no way to know which traffic source produced the 20 contacts per month target or whether any CTA is producing contacts at all.
**Fix:** Add Plausible with a defer script tag to [BaseLayout.astro:73](src/layouts/BaseLayout.astro). Set up custom events for: `contact_submit`, `brand_mark_submit`, `estimator_complete`, `newsletter_signup`, `case_study_view`.

#### A2. Brand Mark page has 9 unfilled placeholders. [P0]
**Evidence:** Live text on [brand-mark.astro](src/pages/brand-mark.astro) renders `[phone]` × 3, `[X]` × 5, `[year]` × 1. Visible to anyone browsing the page.
**Revenue impact:** Brand Mark at $500 is the cheapest entry point and the highest-volume conversion target in the campaign. Prospects reading unfilled template variables will not proceed. Worse, the scarcity claim "Only [X] spots remaining" is designed to be a persuasion trigger and currently reads as a bug.
**Fix:** Either fill with real values (phone, current remaining count, 2026) or strip the sentences entirely if the data isn't available yet. Do not ship the scarcity line without a real number behind it.

#### A3. Newsletter form silently drops emails. [P0]
**Evidence:** [src/pages/journal/index.astro:145](src/pages/journal/index.astro) — TODO note, form never POSTs, client-side JS shows a success message unconditionally.
**Revenue impact:** The Journal is the only top-of-funnel lead capture other than the contact page. Every visitor who fills this form thinks they're subscribed and will never hear from UMM again.
**Fix:** Wire the MailerLite embed form action OR remove the form until the integration is ready. Shipping nothing is better than shipping a fake.

#### A4. Case study CTAs end in `mailto:`. [P1]
**Evidence:** [src/pages/work/[...slug].astro](src/pages/work/[...slug].astro) ends with a `mailto:hello@...` anchor.
**Revenue impact:** Users who get to the bottom of a case study are the warmest traffic on the site. Dropping them into their mail client means no qualification, no budget field, no source tracking, and friction for anyone reading on mobile without a configured mail app.
**Fix:** Replace with a `<Button href="/contact">` CTA. Use project-specific pre-fill via querystring: `/contact?project=short-pump-park` so the form subject auto-populates.

#### A5. Contact form has 19 inputs across 3 forms. [P1]
**Evidence:** Playwright input count on `/contact`. Three distinct form variants including `?type=brand-mark`.
**Revenue impact:** Friction at the highest-intent page. Every additional field drops completion 5-10%.
**Fix:** Audit every field for necessity. Candidates for removal on the general form: title/prefix, budget ceiling (ask for "budget range" only), preferred install month (ask for "timing window"). Keep: name, email, phone, project type, location, a freeform "tell us about your building" textarea.

#### A6. Sticky mobile CTA points everywhere to `/contact`. [P2]
**Evidence:** [BaseLayout.astro:191-198](src/layouts/BaseLayout.astro) renders a global sticky "Request a Site Visit" button. On `/contact`, `/brand-mark` (which has its own form), and `/mural-cost-estimator/` this is redundant or worse — it interrupts the form the user is filling out.
**Revenue impact:** Low, but it makes the form pages look unfinished.
**Fix:** Hide the sticky CTA on pages that contain a primary form. Accept a `hideSticky` prop on BaseLayout.

#### A7. No testimonials from actual clients. [P1]
**Evidence:** Homepage Section 7 quote is Spencer quoting himself. No client-attributed testimonial appears on any service or case study page.
**Revenue impact:** Testimonials are the most-cited trust signal in StoryBrand playbooks. Competitors in Richmond (Broth, Cathcart, Lucky Signs) also lack them on their sites — shipping 3 client quotes would be a direct competitive edge.
**Fix:** Pull three quotes from Short Pump Park stakeholders, Carytown Butterfly Mural client, and Church Hill Trolley Barn client. One per service tier.

---

### Track B — Copy vs. V4 BrandScript

#### B1. V4 prescribed hero one-liners not used verbatim. [P1]
**Evidence:** The project CLAUDE.md lists exact key lines per page. The homepage hero, murals hero, and brand-mark hero are paraphrased versions — close in spirit, not exact. This drifts over time.
**Revenue impact:** The V4 one-liners were written to pass the Grunt Test in 5 seconds. Paraphrasing weakens that.
**Fix:** Pull the exact strings from [BRAND/Messaging/UMM-StoryBrand-BrandScript-V4.md](../../../BRAND/Messaging/UMM-StoryBrand-BrandScript-V4.md) into the hero components verbatim.

#### B2. Customer-hero inversion on Brand Mark page. [P1]
**Evidence:** [brand-mark.astro:282, :543](src/pages/brand-mark.astro) leads two sections with Spencer's process/credentials before naming the customer's problem.
**Revenue impact:** Violates the single most-repeated rule in both project CLAUDE.md files ("Customer is always the hero. Spencer/UMM is always the guide.").
**Fix:** Swap paragraph order so the customer's pain is named first, Spencer's craft response follows.

#### B3. Landmark Moment concept leaks to About page. [P2]
**Evidence:** [src/pages/about/index.astro:67](src/pages/about/index.astro) references Landmark Moment framing outside the murals BrandScript boundary.
**Revenue impact:** Dilutes the term's specificity. The Landmark Moment is the murals team's unique asset.
**Fix:** Replace with umbrella-level framing ("meaning, not decoration") on the About page.

#### B4. Contact page renders dual `<h1>`. [P1]
**Evidence:** Playwright found 2 h1 elements on [contact.astro](src/pages/contact.astro).
**Revenue impact:** SEO signal dilution + a11y best-practice violation (not a WCAG 2.1 AA failure but will hurt Lighthouse SEO score).
**Fix:** One h1 per page. Demote the second to h2.

#### B5. Stakes and Process sections read "constructed." [P3]
**Evidence:** Noted by Spencer in [docs/homepage-copy-review.md:268](docs/homepage-copy-review.md) — "some of it is dry and constructed."
**Revenue impact:** Low-medium. The copy converts; it just doesn't resonate warmly.
**Fix:** Not for this session. Flagged for Spencer's expert copywriter per the standing memory rule. Do not rewrite.

#### B6. Em-dash scan. [P2]
**Evidence:** Not exhaustively verified in this session.
**Revenue impact:** Brand rule violation. V4 guidelines are explicit.
**Fix:** Run `grep -r "—" src/` before next deploy. Replace every hit with period, colon, comma, or parentheses per context.

---

### Track C — Performance & Core Web Vitals

#### Measured values (mobile viewport 375×812, Cloudflare preview):

| Page | FCP | LCP | CLS | Load | Image weight |
|---|---|---|---|---|---|
| `/` (home) | 708 ms | 708 ms (anchor) | 0.024 | 780 ms | 346 KB |
| `/murals` | — | — | 0.000 | 1,198 ms | **3,954 KB** |
| `/contact` | — | — | 0.000 | 570 ms | 2,332 KB |
| `/brand-mark` | — | — | — | 423 ms | 106 KB |
| `/work/short-pump-park` | — | — | — | — | **21,984 KB** |

(FCP/LCP not measured on post-home pages because the PerformanceObserver is registered after navigation; the buffered paint entries don't survive a Playwright navigate. These are image-weight risks, not FCP risks.)

#### C1. Case study pages ship 22 MB of images. [P0]
**Evidence:** `/work/short-pump-park` delivers 21,984 KB across 22 image requests. That's 22× the entire homepage payload.
**Revenue impact:** Mobile LCP on 4G will miss the ≥90 Lighthouse threshold by a wide margin. Richmond mobile buyers on moderate connections will bounce. Core Web Vitals also feed Google rankings, so this hurts SEO too.
**Fix:** Migrate case study galleries to Astro's `<Image>` component with WebP + explicit dimensions + `loading="lazy"` below the fold. Target <2 MB initial payload, rest lazy-loaded.

#### C2. `/murals` page ships 4 MB of images. [P1]
**Evidence:** 3,954 KB across 5 image requests on the service hub.
**Revenue impact:** The murals page is the highest-value service landing. LCP here directly blocks the campaign target.
**Fix:** Same as C1 — WebP, dimensions, lazy load below fold.

#### C3. 15 case study images still pull from legacy WordPress URLs. [P0]
**Evidence:** `/work/carytown-butterfly-mural` loads 15 images from `*/wp-content/*`. Another 18 live in `church-hill-trolley-barn.md`. These work today only because the old WordPress site at untitledmixedmedia.com is still live.
**Revenue impact:** **The moment DNS cuts over to the new site, 33 images across 2 case studies will 404.** This is a silent, delayed P0 that only fires at launch. The featured Carytown case study is the front-door of the Work portfolio.
**Fix:** Re-host all `wp-content/*` URLs under `public/images/projects/` and update the MD frontmatter. Must land before DNS cutover.

#### C4. Image dimensions missing on ~40% of `<img>`. [P1]
**Evidence:** Home: 5 of 15 images lack `width`/`height`. Murals: 4 of 7. Layout shift on these is small today (CLS < 0.03) because most are below the fold, but larger image swaps during scroll could push CLS over the 0.1 threshold once case studies are optimized.
**Fix:** Every `<img>` gets explicit `width` and `height` attrs. Astro's `<Image>` component does this automatically — adopting it fixes both C1 and C4 together.

#### C5. Only 3 of 12 fonts preloaded. [P2]
**Evidence:** [BaseLayout.astro:70-72](src/layouts/BaseLayout.astro) preloads LyonText-Regular, Canela-Regular, Gotham-Book. The headline font (Canela Blackletter, used in Nav logo) and Canela-Bold (hero display) are not preloaded.
**Revenue impact:** Minor FOIT on logo and hero on first paint. Canela Blackletter is the brand's visual anchor.
**Fix:** Add preload links for `Canela-Blackletter-Medium.woff2` and `Canela-Bold.woff2`.

#### C6. Inline script weight (~2.8 KB across BaseLayout). [P3]
**Evidence:** [BaseLayout.astro:200-269](src/layouts/BaseLayout.astro) contains ~70 lines of inline script for scroll progress, sticky CTA, headline word-split, IntersectionObserver reveals.
**Revenue impact:** Tiny. All compositor-only (transform + classList). Not a real perf issue, but it's the only JS on the homepage and lives in the critical path.
**Fix:** Only fix if bundle cost becomes measurable. Leave as-is for now.

---

### Track D — Accessibility (WCAG 2.1 AA)

#### axe-core scan results:

| Page | Violations | Notes |
|---|---|---|
| `/` | 1 serious | Decorative marquee at 10% opacity (likely intentional) |
| `/murals` | 1 serious | `text-smoke-gray` eyebrow fails contrast on dark bg |
| `/contact` | 0 | Clean |
| `/brand-mark` | 0 | Clean |
| `/work/short-pump-park` | 0 | Clean |

#### D1. `text-smoke-gray` body eyebrows fail WCAG AA contrast. [P1]
**Evidence:** `/murals` "02 / The Landmark Moment" eyebrow, styled `font-mono text-smoke-gray uppercase`, fails contrast ratio against bone-black background.
**Revenue impact:** Excludes low-vision users (~5% of visitors). Also a Lighthouse A11y score penalty.
**Fix:** Bump `smoke-gray` to the next step up on the gray bridge (toward titanium-white) until it passes 4.5:1 for normal text or 3:1 for ≥18pt. Verify the full 6-step gray bridge against both the 4.5:1 and 3:1 thresholds.

#### D2. Decorative marquee contrast violation is a false positive. [P3]
**Evidence:** Homepage `text-titanium-white/10` marquee — 10% opacity is intentional for the "Landmarks Not Lookalikes" scrolling band.
**Fix:** Add `aria-hidden="true"` (if not already present) and a suppression comment. No contrast change needed for a decorative band.

#### D3. Mobile sticky CTA lacks `aria-label` on the button. [P2]
**Evidence:** [BaseLayout.astro:191-198](src/layouts/BaseLayout.astro) — the wrapper has `aria-label="Quick contact"` but the link itself is read as just "Request a Site Visit."
**Revenue impact:** Minor. Screen reader users hear a duplicate-ish announcement.
**Fix:** Move `aria-label` to the `<a>` or remove from wrapper. One or the other, not both.

#### D4. Skip-to-content link target exists but trigger not verified. [P2]
**Evidence:** `#main-content` target is present at [BaseLayout.astro:186](src/layouts/BaseLayout.astro). Did not verify Nav renders an activating skip link.
**Fix:** Confirm Nav component includes a visually-hidden, focus-visible skip link at the top of tab order.

---

### Track E — SEO & Metadata

#### E1. Homepage passes zero props to BaseLayout. [P0]
**Evidence:** [src/pages/index.astro:23](src/pages/index.astro) — `<BaseLayout>` with no title, no description, no ogImage override.
**Revenue impact:** The homepage uses the default "Untitled Mixed Media | Hand-Painted Murals & Signs | Richmond, VA" which is fine, but the description and social card miss the campaign-specific angle ("Landmarks, not lookalikes" / "Most public art is made without thinking...").
**Fix:** Pass explicit title, description, ogImage to BaseLayout on index. Use the Compressed One-Liner as the meta description.

#### E2. LocalBusiness JSON-LD missing telephone, hours, logo, aggregateRating. [P1]
**Evidence:** [BaseLayout.astro:78-108](src/layouts/BaseLayout.astro) — schema includes name, url, email, address, geo, areaServed, priceRange, knowsAbout, sameAs. Missing: `telephone`, `openingHours` (even "By appointment"), `logo`, `aggregateRating` (if any Google reviews exist).
**Revenue impact:** Google Business Profile integration and local-pack eligibility improve with richer structured data.
**Fix:** Add `telephone` (mailto-only works as fallback: document that UMM uses email-first), `openingHours: "Mo-Fr 09:00-17:00"` or "By appointment", `logo: "https://untitledmixedmedia.com/logo.png"`. Do not invent aggregateRating.

#### E3. Service schema priceRange not page-specific. [P2]
**Evidence:** The global `priceRange` is "$500 - $100,000+" on the LocalBusiness. Service-level schema (conditional, per-page) could tighten this: Brand Mark "$500+", Signs "$500–$3,000", Murals "$15/sqft / $4,000+".
**Fix:** Pass page-specific Service props from each service page's frontmatter.

#### E4. BlogPosting schema not on manual `.astro` journal posts. [P2]
**Evidence:** The 5 content-collection journal posts likely inherit BlogPosting via their Astro template. The 2 manual `.astro` posts (ghost-signs-richmond-va, hand-painted-vs-vinyl) need to pass the `blogPosting` prop to BaseLayout explicitly.
**Fix:** Audit both manual posts and add the blogPosting prop. Or migrate them into the content collection (cleaner long term).

#### E5. Canonical URL cross-domain cutover. [P1]
**Evidence:** Canonical today resolves to `Astro.site` — if `astro.config` still points at `umm-website.pages.dev`, canonicals will point there even on production domain.
**Fix:** Before DNS cutover, set `site: "https://untitledmixedmedia.com"` in astro.config. Verify canonicals in production build output.

#### E6. Richmond local-SEO keyword coverage is thin on signs page. [P2]
**Evidence:** `/hand-painted-signs` doesn't name specific Richmond neighborhoods (Church Hill, Carytown, Scott's Addition, Shockoe, Jackson Ward, The Fan). Brand Mark page references "9 neighborhoods" per design brief — naming them boosts long-tail local search.
**Fix:** Add a neighborhoods list / map to both signs and Brand Mark pages.

---

### Track F — Design System & UI Consistency

#### F1. Artist color leak: `#c00` fallback in mural cost estimator. [P0]
**Evidence:** [src/pages/mural-cost-estimator.astro:872](src/pages/mural-cost-estimator.astro) — hardcoded hex `#c00` as error-state fallback.
**Revenue impact:** Violates the design system rule that artist primaries (Pyrrole Red, Cobalt Blue) appear only in portfolio imagery, never in chrome. `#c00` isn't even a brand color — it's a browser-default red.
**Fix:** Replace with `var(--color-pyrrole-red)` or a dedicated `--color-error` token.

#### F2. JS color literals in case study template. [P2]
**Evidence:** [src/pages/work/[...slug].astro:255-256](src/pages/work/[...slug].astro) — `#EEECE9`, `#4A4A4C` hardcoded in inline JS.
**Fix:** Move to CSS custom properties or pull from `window.getComputedStyle`. Script shouldn't know hex values.

#### F3. Three CTA component patterns coexist. [P2]
**Evidence:** CTABlock, SlideInCTA, CTASection all ship. Unclear which to use when.
**Fix:** Pick one canonical pattern. If a CTA slides in on scroll = SlideInCTA; inline section = CTABlock. Document in components README. Delete the third.

#### F4. 10 components appear unused. [P3]
**Evidence:** SlideInCTA, FAQSection, CTASection, ValuePropSection, GuideSection, CredibilityStrip, PortfolioPreview, PortfolioGrid, ProcessDetailStrip, ProjectCard per prior audit agent's component graph.
**Revenue impact:** Zero today. Tech debt for future maintenance.
**Fix:** Verify with `grep -r "ComponentName" src/pages/` then move dead ones to `_TRASH/` or a `components/_archived/` folder.

#### F5. ProjectCard flagged "legacy, may be removed" in CLAUDE.md. [P3]
**Evidence:** [CLAUDE.md:34](CLAUDE.md).
**Fix:** Confirm it's unused, then delete. One fewer component to maintain.

---

### Track G — Richmond Competitor Positioning

#### Competitors surveyed:

| Competitor | Role | Portfolio depth | Pricing transparency | Render workflow | Process explanation | Certificate of Provenance |
|---|---|---|---|---|---|---|
| **Mickael Broth** (The Night Owl) | Muralist | 200+ murals since 2012, VMFA Fellowship | No | No | Minimal | No |
| **Nico Cathcart** | Muralist | Extensive (categorized: murals, portraits, series) | No | No | CTA: "Custom Quote" | No |
| **Alfonso Pérez Acosta** | Muralist | Mid-depth | No | No | Cultural-identity framing | No |
| **Lucky Signs RVA** (Sarah Apple) | Hand-painted signs | Extensive, visible on homepage | Design deposit, case-by-case | No | 3-stage workflow (Inquire → Approve → Receive) | No |
| **UMM** | Murals + signs + Brand Mark | 3 case studies + signs gallery | **Yes: $15/sqft, $500+, starting prices shown** | **Yes: Blender/RealityCapture pre-viz** | 3-step (Discover → Design → Install) | **Yes: included with every commission** |

#### G1. UMM's genuine moats vs. Richmond:
1. **Pre-visualization render workflow.** No competitor mentions it. This is the campaign's "unfair advantage" and the site should make it the single most prominent feature on every service page.
2. **Certificate of Provenance.** No competitor documents sourcing. Shows up on UMM's "What You Get" section and Install step — expand it to a dedicated `/certificate` or FAQ entry.
3. **Pricing transparency.** Competitors all gate pricing behind an email inquiry. UMM shows starting prices. Keep this. Don't hide them.
4. **Brand Mark at $500.** Nobody else has a productized low-tier offer. Every sign-shop competitor requires a design deposit first. This is the best prospecting tool on the site.

#### G2. UMM's real gap vs. Richmond:
1. **Portfolio depth.** Broth (200+), Cathcart (dozens of categorized pieces), Lucky Signs (extensive homepage gallery). UMM ships 3 case studies. This is the only place UMM looks junior in the landscape. Expanding the portfolio is the single highest-leverage marketing activity beyond the website fixes in this report.
2. **Lucky Signs owns "woman-owned craftsman" positioning.** UMM can't compete on that frame. Must win on craft specificity (materials, surface prep, longevity claims) and on the Landmark Moment research angle.

---

### Track H — Code Health

#### H1. Formspree endpoint hardcoded. [P2]
**Evidence:** `xpwrzqkl` string appears directly in [contact.astro:79, 147](src/pages/contact.astro).
**Fix:** Move to `PUBLIC_FORMSPREE_ENDPOINT` env var. Update Cloudflare Pages env config.

#### H2. Manual journal `.astro` pages outside collection. [P3]
**Evidence:** 2 posts (ghost-signs-richmond-va, hand-painted-vs-vinyl) live as `.astro` files. 5 others live in the content collection.
**Fix:** Migrate the 2 manual ones into the collection. Consistency wins for future Spencer/writer edits.

#### H3. Untracked docs. [P3]
**Evidence:** `docs/brand-mark-page-design-brief.md` and `docs/homepage-copy-review.md` not tracked.
**Fix:** Commit both. They're reference material for the next round of work.

#### H4. Tailwind cache artifact. [P3]
**Evidence:** `src/styles/global.css.tmp.11732.1776735241268` left over from vite.
**Fix:** Delete. Add `*.tmp.*` to `.gitignore`.

#### H5. 10 components unused (per Track F4). [P3]
See Track F4.

---

## 4. Top 10 Recommendations — Ranked by Lead-Conversion Impact

| # | Fix | Effort | Revenue-impact rationale |
|---|---|---|---|
| 1 | **Fill the 9 Brand Mark placeholders.** (A2) | 20 min | Cheapest conversion path is currently broken. Single highest-ROI fix on the site. |
| 2 | **Install Plausible.** (A1) | 30 min | Without this, every other recommendation is untestable. Blocks all CRO work. |
| 3 | **Wire MailerLite OR remove newsletter form.** (A3) | 2 hours | Top-of-funnel capture. Fake form is worse than no form. |
| 4 | **Re-host 33 wp-content images before DNS cutover.** (C3) | 3 hours | Silent P0. Case studies 404 the moment DNS flips. Launch blocker. |
| 5 | **Replace `mailto:` with `/contact` CTA on case studies.** (A4) | 30 min | Warm-traffic qualification and source tracking. |
| 6 | **Migrate case study + murals images to Astro `<Image>` (WebP + dims + lazy).** (C1, C2, C4) | 1 day | 22 MB → <2 MB LCP. Mobile conversion and SEO. |
| 7 | **Pull V4 hero one-liners verbatim into service pages.** (B1) | 1 hour | Copy discipline. Aligns with the Grunt Test framework that earned these lines. |
| 8 | **Fix dual h1 on contact.** (B4) | 5 min | Quick SEO/a11y signal. |
| 9 | **Ship 3 real client testimonials.** (A7) | Pending Spencer's outreach to clients | Single biggest trust-signal gap vs. every Richmond competitor. |
| 10 | **Fix `#c00` color leak in estimator + move to design token.** (F1) | 15 min | Brand integrity. Compounds as more pages get built. |

---

## 5. Priority Matrix

| Priority | Finding | Track |
|---|---|---|
| **P0** | No analytics installed | A1 |
| **P0** | 9 unfilled placeholders on Brand Mark page | A2 |
| **P0** | Newsletter form silently drops emails | A3 |
| **P0** | 33 legacy wp-content image URLs on case studies | C3 |
| **P0** | 22 MB image weight on Short Pump Park case study | C1 |
| **P0** | Homepage passes zero props to BaseLayout | E1 |
| **P0** | Artist color leak (`#c00`) in estimator | F1 |
| **P1** | Case study CTAs are `mailto:` links | A4 |
| **P1** | Contact form has 19 inputs | A5 |
| **P1** | No client testimonials | A7 |
| **P1** | V4 hero one-liners paraphrased, not verbatim | B1 |
| **P1** | Customer-hero inversion on Brand Mark | B2 |
| **P1** | Dual h1 on contact page | B4 |
| **P1** | `/murals` ships 4 MB of images | C2 |
| **P1** | Image dimensions missing on ~40% of `<img>` | C4 |
| **P1** | `text-smoke-gray` fails WCAG AA contrast | D1 |
| **P1** | LocalBusiness JSON-LD missing telephone/hours/logo | E2 |
| **P1** | Canonical URL cross-domain cutover | E5 |
| **P2** | Global sticky CTA on form pages | A6 |
| **P2** | Landmark Moment boundary leak on About | B3 |
| **P2** | Em-dash scan needed | B6 |
| **P2** | 3 font preloads only | C5 |
| **P2** | Sticky CTA aria-label duplication | D3 |
| **P2** | Skip-to-content trigger not verified | D4 |
| **P2** | Service schema priceRange not page-specific | E3 |
| **P2** | BlogPosting schema on manual journal pages | E4 |
| **P2** | Thin neighborhood keyword coverage | E6 |
| **P2** | JS color literals in case study template | F2 |
| **P2** | Three CTA component patterns coexist | F3 |
| **P2** | Formspree endpoint hardcoded | H1 |
| **P3** | Stakes/Process copy reads dry (for writer) | B5 |
| **P3** | Inline script weight (~2.8 KB) | C6 |
| **P3** | Decorative marquee contrast (false positive) | D2 |
| **P3** | 10 dead components | F4 |
| **P3** | ProjectCard legacy flag | F5 |
| **P3** | 2 manual journal `.astro` posts | H2 |
| **P3** | Untracked docs | H3 |
| **P3** | Tailwind cache artifact | H4 |

---

## 6. Appendix

### A. Raw Lighthouse-style measurements (mobile 375×812, Cloudflare Pages preview)

```
Homepage (/)
  TTFB:                 68 ms
  FCP:                  708 ms
  LCP:                  708 ms (element: <a>, size 5,107px²)
  CLS:                  0.024
  DOM content loaded:   589 ms
  Load complete:        780 ms
  Transfer size:        11.9 KB (document)
  Total page weight:    364 KB
  Resources:            13
  Images:               4 reqs, 346 KB
  Fonts:                8 reqs, 17 KB
  Scripts:              0
  CSS:                  1 req

/murals
  TTFB:                 262 ms
  CLS:                  0.000
  Load complete:        1,198 ms
  Total page weight:    3,957 KB
  Images:               5 reqs, 3,954 KB  ← LCP risk
  Scripts:              0

/contact
  TTFB:                 57 ms
  CLS:                  0.000
  Load complete:        570 ms
  Total page weight:    2,335 KB
  Images:               2 reqs, 2,332 KB
  Forms:                3
  Inputs:               19
  h1 count:             2  ← SEO/a11y issue

/brand-mark
  TTFB:                 58 ms
  Load complete:        423 ms
  Total page weight:    109 KB
  Images:               1 req, 106 KB
  Placeholders:         9 unfilled ([phone], [X], [year])
  h1 count:             1

/work/short-pump-park
  Images:               22 reqs, 21,984 KB  ← P0 LCP risk
  Legacy wp-content URLs: 0

/work/carytown-butterfly-mural
  Images:               16 total
  Legacy wp-content URLs: 15  ← Will 404 on DNS cutover
  Broken today:         1 (hero image crossed into trolley-barn filename)
```

### B. WCAG 2.1 AA violations

```
Pages scanned with axe-core 4.10.0: 5
Total violations: 3
  - color-contrast (serious) × 2: home marquee (10% opacity, decorative — false positive); murals eyebrow (text-smoke-gray on bone-black)
  - no other categories triggered

Pages with 0 violations: 3 of 5 (contact, brand-mark, short-pump-park case study)
```

### C. JSON-LD validation

```
LocalBusiness schema (BaseLayout.astro:78-108):
  Present: @context, @type, name, description, url, email, image, address, geo, areaServed, priceRange, knowsAbout, sameAs
  Missing (should add): telephone, openingHours, logo
  Not applicable without truthful data: aggregateRating, review

Conditional schema:
  FAQPage:        Activates when faqItems prop passed
  BreadcrumbList: Activates when breadcrumbItems prop passed
  Service:        Activates when service prop passed
  BlogPosting:    Activates when blogPosting prop passed

To validate in production:
  1. npm run build
  2. Copy any page's rendered HTML
  3. Paste into https://search.google.com/test/rich-results
  4. Confirm no errors, note warnings
```

### D. Key file references

| Concern | File |
|---|---|
| SEO meta + JSON-LD | [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) |
| Design tokens / fonts | [src/styles/global.css](src/styles/global.css) |
| Brand Mark placeholder leaks | [src/pages/brand-mark.astro](src/pages/brand-mark.astro) |
| MailerLite TODO | [src/pages/journal/index.astro:145](src/pages/journal/index.astro) |
| Formspree hardcoded endpoint | [src/pages/contact.astro:79](src/pages/contact.astro) |
| Artist color leak | [src/pages/mural-cost-estimator.astro:872](src/pages/mural-cost-estimator.astro) |
| Case study template | [src/pages/work/[...slug].astro](src/pages/work/[...slug].astro) |
| Legacy wp-content images | [src/content/projects/carytown-butterfly-mural.md](src/content/projects/carytown-butterfly-mural.md), [src/content/projects/church-hill-trolley-barn.md](src/content/projects/church-hill-trolley-barn.md) |
| V4 BrandScript source of truth | [BRAND/Messaging/UMM-StoryBrand-BrandScript-V4.md](../../../BRAND/Messaging/UMM-StoryBrand-BrandScript-V4.md) |

### E. Competitor source list

- [Mickael Broth / The Night Owl](https://www.mickaelbroth.com/) — referenced via VMFA and RVA Street Art Festival coverage
- [Nico Cathcart](https://www.nicocathcart.com/)
- [Alfonso Pérez Acosta](https://artworksrva.com/artists-directory-at-art-works/)
- [Lucky Signs RVA](https://luckysignsrva.com/)
- [Richmond Mural Project](http://richmondmuralproject.squarespace.com)
- [VPM Mural Call for Artists 2026](https://www.vpm.org/2026-04-10/bringing-art-to-our-new-home)

---

**End of audit. Next action: Spencer reviews the Top 10 list and confirms which P0 items to batch into a single two-day push.**
