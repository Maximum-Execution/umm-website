# Subtract-First Launch — Design Doc

**Date:** 2026-04-26
**Author:** Spencer + Claude (brainstorm session)
**Status:** Approved. Implementation pending.

## Purpose

Ship the UMM website live today by removing every page that needs more work, leaving the smallest possible site that can still sell. Then re-enable one deferred page per month as a content drop until the full site is operational.

## Why subtract instead of finish

Every page kept in the launch site is one more thing that has to be polished, image-swapped, copy-reviewed, and QA'd before going live. Cutting a page from the launch removes all of that work. The page is not gone, just paused. When it comes back, it comes back as a "new" thing for the audience — which doubles as a content event we can post about.

## Launch Site (Kept Pages)

Thirteen routes total. Ten content routes plus three required (legal/404).

| URL | Role |
|---|---|
| `/` | Front door |
| `/murals` | Service page |
| `/hand-painted-signs` | Service page |
| `/brand-mark` | $500 offer page |
| `/brand-mark/claim` | Brand Mark intake form |
| `/work` | Portfolio index |
| `/work/short-pump-park` | Case study |
| `/work/carytown-butterfly-mural` | Case study |
| `/work/church-hill-trolley-barn` | Case study |
| `/contact` | Contact form |
| `/mural-cost-estimator` | Lead magnet (interactive estimator + email capture) |
| `/privacy`, `/terms` | Legal |
| `/404` | Required |

## Deferred Pages (Files Preserved)

These pages stay in the repo as files but are not served on the live site, are not linked from any kept page, and redirect to the closest kept page if a direct URL is hit.

| URL | Re-enable target month | Redirect target |
|---|---|---|
| `/sign-restoration` | TBD | `/hand-painted-signs` |
| `/about` (index) | TBD | `/` |
| `/about/process` | TBD | `/` |
| `/about/philosophy` | TBD | `/` |
| `/about/insurance-and-licensing` | TBD | `/` |
| `/journal` (index) | TBD | `/` |
| `/journal/ghost-signs-richmond-va` | TBD | `/` |
| `/journal/hand-painted-vs-vinyl` | TBD | `/` |
| `/journal/[...slug]` (dynamic template) | n/a | n/a |

## How the subtraction works (three layers)

### Layer 1 — Build exclusion

Each deferred page gets excluded from the build so the URL literally does not exist on the live site. The file stays in `src/pages/` so re-enabling is a one-line change.

Implementation options (decide during writing-plans phase):
- Astro page-level export to skip the page from the build
- Move deferred pages out of `src/pages/` into a `src/pages-deferred/` folder
- Astro config exclusion glob

The cleanest option is the move-folder approach because it works at the file system level and there is no question whether a page is deferred or not.

### Layer 2 — Cloudflare redirects

Add `public/_redirects` with three rules:

```
/sign-restoration       /hand-painted-signs   301
/about                  /                     301
/about/*                /                     301
/journal                /                     301
/journal/*              /                     301
```

Cloudflare Pages reads this file automatically. Old Google results, old Instagram links, and any cached URL all land somewhere live instead of a 404.

### Layer 3 — Internal link audit

Every kept page must be grepped for links to deferred URLs. Known starting points:

- `src/components/Footer.astro` — likely contains `/about` and possibly `/journal`
- `src/components/Nav.astro` — already cleaned this session
- `src/pages/contact.astro` — the project-type select has a `Sign Restoration` option that must be removed
- `src/components/RelatedPages.astro` — may cross-link service pages to journal
- `src/pages/work/[...slug].astro` — case study CTAs
- Any `JSON-LD` structured data referencing deferred pages

The audit is a single repo-wide grep:

```
href="/sign-restoration
href="/about
href="/journal
```

Every match in a kept page either gets removed or repointed to a kept page.

## Re-Enable Cadence (Monthly Drops)

One deferred page per month. The order is Spencer's call, but a sensible default is by sales impact:

1. **Month 1 — `/sign-restoration`** — high-intent SEO ("ghost sign restoration richmond" is searchable)
2. **Month 2 — `/about`** — credibility and trust, important for higher-budget RFPs
3. **Month 3 — `/journal/ghost-signs-richmond-va`** — first content marketing drop
4. **Month 4 — `/journal/hand-painted-vs-vinyl`** — second journal post
5. **Month 5 — `/about/process`** — depth on the discovery-first methodology
6. **Month 6 — `/about/philosophy`** — brand storytelling
7. **Month 7 — `/about/insurance-and-licensing`** — closes objections for larger commercial work

### Re-enable checklist (per page)

When a deferred page comes back online:

1. **Move the page file back** to `src/pages/`
2. **Remove the `_redirects` line** for that URL
3. **Audit images** on the page — all production-ready, no placeholders
4. **Audit copy** — Spencer's copywriter has approved every block
5. **Add internal links** from kept pages back to it (nav, footer, RelatedPages, etc.)
6. **Verify build is clean** — `npm run build`
7. **Verify in preview** — page loads, all links resolve, mobile renders correctly
8. **Commit + push to `main`** — Cloudflare Pages auto-deploys
9. **Announce the drop** — Instagram post, email list, Slack `#untitled-mixed-media`
10. **Mark the page as "Live" in Notion**

### Tracking the cadence

The deferral status of each page lives in two places:

- **`WEBSITE/umm-website/umm-website/CLAUDE.md`** — table of deferred pages with status
- **Notion** — UMM workspace gets a new "Website Relaunch Schedule" page tracking month, page, target date, and status

## Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Old Google results for deferred pages 404 | `_redirects` 301s catch them |
| An internal link to a deferred page was missed in the audit | Build will succeed, but click leads to redirect — annoying but not broken |
| Spencer wants to flip a deferred page back fast | Re-enable checklist is 9 steps, no architecture changes needed |
| A monthly drop slips | Nothing breaks. Site continues operating with current page set. |
| Copywriter delivers copy before image is ready (or vice versa) | Re-enable checklist requires both before going live. No partial drops. |

## Out of Scope (this design)

- Refinement work on the kept pages (image swaps, copy review, layout polish) — separate brainstorm
- New pages not currently in the repo
- Stripe or payment integration
- Real form backend (still mailto for now)
- Domain DNS cutover (Spencer handles last)

## Approval

Spencer approved the subtraction plan, the per-category redirect strategy, the deferral list (5 pages + journal), and the requirement that no internal links remain to deferred pages.

The next step is the writing-plans skill, which produces the executable step-by-step implementation plan.
