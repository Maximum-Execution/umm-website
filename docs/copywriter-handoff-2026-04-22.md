# Copywriter Handoff — UMM Website Copy Pass

**For:** Spencer's copywriter
**From:** Claude Code (structural work complete; copy work is yours)
**Date:** 2026-04-22
**Status:** All structural/routing/analytics work shipped. Everything below is strictly copy.

---

## 1. Purpose of This Document

The UMM website has been restructured to match the V5 BrandScript and the Brand Mark Offer v2. Routes, analytics, intake pages, CTAs, and performance scaffolding are all in place. What remains is the actual text on the page.

This is not a request to invent copy. Spencer has two governing source documents that already hold the approved language. Your job is to lift that language verbatim onto the site, section by section, and close the small set of authoring gaps that the source documents do not yet cover.

**Hard rule:** every page, every section, every CTA label must trace to one of these two source documents. If the line you need is not in a source document, flag it to Spencer and let him author it before it lands on the site.

---

## 2. Source Documents (Read These First)

| Source | Path | Use for |
|---|---|---|
| V5 BrandScript | `ACTIVE PROJECTS/UNTITLED MIXED MEDIA/BRAND/Messaging/UMM-StoryBrand-BrandScript-V5.md` | Umbrella one-liner, villain names, controlling ideas, all page-level Key Lines, 3-step process labels for each script, tagline, master anchor line, trust line |
| Brand Mark Offer v2 | `ACTIVE PROJECTS/UNTITLED MIXED MEDIA/MARKETING/Offers/brand-mark-offer-document-v2.md` | Entire `/brand-mark` page, scarcity band, Collector's Guarantee, Aged-to-Order finishes, Neighborhood Nine, $500 Neighborhood Expansion Credit, objections/FAQ, intake CTA |

**Do not use:**
- V4 BrandScript (deprecated)
- `brand-mark-discovery-session-guide.md` — that is an internal-only sales script. Never lifted to the public site.

---

## 3. V5 Deltas That Touch the Whole Site

V5 supersedes V4. These shifts will affect many pages at once. Worth reading V5 end-to-end before touching any individual page.

| # | Delta | Impact |
|---|---|---|
| 1 | Umbrella villain renamed from "Indifference" to "Visual sameness" | Any page currently using "Indifference" as a villain name must switch |
| 2 | Primary One-Liner fully rewritten (V5 §1.3) | Homepage hero subhead, About page, Services page intro, any "what we do" block |
| 3 | Compressed One-Liner rewritten | Mobile hero, shorter placements, social captions |
| 4 | Philosophical Shorthand replaces V4 "Core Belief" | "How you do anything is how you do everything" is no longer the guiding phrase. Use V5 §1.2 instead |
| 5 | Murals 3-step is now Discover → Collect → Paint (was Discover → Design → Install) | Anywhere the murals process is shown as 3 steps |
| 6 | Signs 3-step is Discover → Design → Paint | Anywhere the signs process is shown as 3 steps |
| 7 | Brand Mark 3-step is Discover → Design → Install (unchanged) | No change needed here |
| 8 | Brand Mark inherits the Signs villain ("visual pollution"), manifested as "the catalog sign" | Current Brand Mark copy that frames it as a standalone "fine art for your brand identity" villain needs to be re-framed per V5 §4 |
| 9 | Certificate of Provenance applies to murals and custom signs only | Remove any Certificate of Provenance language from the Brand Mark page and intake |
| 10 | New rule: UMM does not sign finished work (Henri reference in V5) | Remove any site copy that says or implies Spencer signs the finished piece |

---

## 4. Voice and Style Rules (From Project CLAUDE.md)

These are the UMM voice rules that every piece of copy on this site must follow. They are not suggestions.

1. Customer is always the hero. Spencer/UMM is always the guide.
2. Lead with the customer's problem, not Spencer's credentials.
3. Never use em dashes. Replace with periods, colons, commas, semicolons, or parentheses.
4. Warm but direct. Professional artist voice, not corporate, not hustle-culture.
5. Show the craft. Name the technique. Be specific about materials and process.
6. Numbers, not adjectives. "Within 24 hours" is better than "fast turnaround."

---

## 5. Page-by-Page Copy Work

Each row below is one file the copywriter needs to touch. "Current state" describes what's there now. "Source" names where the approved language lives. Nothing should land in the file until Spencer approves the exact proposed text.

### 5.1 Homepage — `src/pages/index.astro` + `src/components/sections/HeroSection.astro`

| Block | Current state | What needs to happen | Source |
|---|---|---|---|
| Hero eyebrow | "RICHMOND, VIRGINIA" | Keep or replace per V5 | V5 §1 |
| Hero headline | "We help you build your idea into something worth painting." | Evaluate against V5 Primary One-Liner. If it aligns, keep. If not, replace verbatim from V5 §1.3 | V5 §1.3 |
| Hero subline | Two paragraphs starting "Hand-painted murals and signs in Richmond, Virginia…" and "Your building, your story, your business." | Replace with V5 Primary One-Liner verbatim, or a verbatim Compressed One-Liner for mobile | V5 §1.3 |
| Hero CTA label | "SCHEDULE YOUR FREE DISCOVERY SESSION" | Confirm against V5 / Offer v2 CTA language | V5 §1 |
| "Here's what nobody in this industry talks about" section | Full narrative about muralists vs. sign shops, ending on "That's what happens when the meaning gets skipped." | This is the problem/villain section. Rewrite against V5 umbrella villain ("visual sameness") — the current paragraphs still read as two separate villains (murals + signs) rather than the unified V5 umbrella villain | V5 §1.4, §1.5 |
| Process 3-step | "We start with questions, not sketches." → "You see it on your actual wall before we paint anything." → "Painted by hand. Documented to the source." | V5 umbrella does not have a 3-step; this block should align to whichever script is being surfaced on the homepage. If umbrella, restructure. If murals-focused, update labels to Discover → Collect → Paint | V5 §1, §2 |
| Quote block | "Most people don't know exactly what they want…" Spencer Bennett | Verify against V5 trust line or master anchor line | V5 §1.7, §1.8 |
| Tagline section | "Landmarks, not lookalikes." | V5 should confirm tagline. If unchanged, keep | V5 §1.6 |

### 5.2 Murals Page — `src/pages/murals/index.astro`

Requires full V5 §2 alignment. Key items the copywriter must lift:

- V5 §2 Primary One-Liner into the hero
- V5 §2 villain ("the generic mural") framed from the customer's POV
- V5 §2 Key Line (the "Landmark Moment" concept belongs here and only here)
- V5 §2 3-step: **Discover → Collect → Paint** (the site currently reflects the old Discover → Design → Install for murals)
- V5 §2 guarantee / Certificate of Provenance language (applies here, unlike Brand Mark)
- V5 §2 closing / call

Every block should be a verbatim lift from V5 §2. Do not paraphrase.

### 5.3 Hand-Painted Signs Page — `src/pages/hand-painted-signs/index.astro`

Requires full V5 §3 alignment. Key items:

- V5 §3 Primary One-Liner into the hero
- V5 §3 villain is "visual pollution"
- V5 §3 Key Line: "How your sign is made tells the world what kind of business you run."
- V5 §3 3-step: **Discover → Design → Paint**
- V5 §3 guarantee / Certificate of Provenance language (applies here too)
- V5 §3 closing / call

### 5.4 Brand Mark Page — `src/pages/brand-mark.astro` (HIGHEST PRIORITY)

This is the single most important copy job on the site. Revenue target depends on it. The full Offer v2 document is the script.

| Section | Source |
|---|---|
| Hero headline + subhead | Offer v2 §"The Offer in One Breath" + V5 §4 paragraph 1 |
| Scarcity band (Neighborhood Nine) | Offer v2 §"Neighborhood Nine". Hardcode "9 spots launching, 9 remain" for now (no live inventory system) |
| What you get at $500 | Offer v2 §"What's Included at $500" — bullet list verbatim |
| Aged-to-Order (three finishes) | Offer v2 §"The Three Finishes" — Pristine / Distressed / Antiqued, each with one-line description. Do not surface the internal neighborhood finish defaults from the Discovery Session Guide |
| Collector's Guarantee | Offer v2 §"The Collector's Guarantee" — verbatim, including the $250/$250 split and decline-and-return terms |
| Process (3-step) | V5 §4 Brand Mark 3-step (Discover → Design → Install). Do not use Offer v2's internal 15-minute sales script |
| $500 Neighborhood Expansion Credit | Offer v2 §"Upgrade Path" |
| FAQ | Offer v2 §"Objections" — pick 4 to 6, verbatim |
| Closing CTA | Offer v2 CTA: **"Claim Your Spot. 5 questions. 60 seconds."** — routes to `/brand-mark/claim` (already wired) |
| REMOVE: Certificate of Provenance mentions | Per V5, does not apply to Brand Mark |
| REMOVE: Standalone "fine art for your brand identity" villain framing | Per V5, Brand Mark inherits signs' "visual pollution" villain via "the catalog sign" manifestation |

### 5.5 Brand Mark Intake Page — `src/pages/brand-mark/claim.astro`

Created during this session using pre-existing intake copy relocated from the legacy contact.astro brand-mark variant. Nothing was authored. The copywriter should review this page against Offer v2 §"The 5-Question Intake" and align:

- Page title / H1 (current: "Tell me what you're thinking.")
- Subhead (current: 24-hour follow-up language)
- Field labels for the 5 required questions: business name / words, neighborhood select, finish preference, preferred shape (Square 4×4 / Rectangle 3×5 / Banner 2×8), email + phone
- Note: current form has 7 fields (includes logo upload and notes textarea). Offer v2 specifies 5 questions. Copywriter should flag to Spencer whether logo + notes stay or are removed
- Submit button (current: "Send to Spencer") — align to Offer v2 CTA language
- Success message text

### 5.6 Contact Page — `src/pages/contact.astro`

One orphan cleanup task:

- The page still contains a full `data-variant="brand-mark"` block (hero + form) that is never shown to visitors (redirects now point to `/brand-mark/claim`). All associated copy, field labels, and JS toggling should be deleted. This is the "dual H1 on contact" item in the audit. Deletion removes copy Spencer once authored, so requires his explicit approval before removal.
- The default `data-variant="default"` hero + form should be reviewed against V5 §1 for umbrella-voice alignment.

### 5.7 Journal Index — `src/pages/journal/index.astro`

Spencer elected to leave the newsletter form as-is for this sprint. No action now. Flagged for a future decision: wire to MailerLite, or remove the form and replace with an Instagram CTA. Copy for either option will need Spencer's direction.

### 5.8 Cost Estimator — `src/pages/mural-cost-estimator.astro`

No V5 rewrite mandated. Two notes for the copywriter to flag:

- Error-state messaging uses an undefined color token (`--color-pyrrole-red`). Error text currently renders with no color. Copy change not needed; brand-color decision from Spencer is
- Form copy should be reviewed against V5 §2 voice to confirm it reads as murals-script, not umbrella

### 5.9 CTA Block — `src/components/CTABlock.astro`

Shared component used on 14 pages (homepage, murals, signs, about sub-pages, services, journal, etc.). Default copy is hardcoded:

- Default headline: "Let's figure out what belongs on your wall."
- Default description: "Free site visit. You see the design before we start. Richmond, VA and surrounding areas."
- Default primary CTA: "Schedule Your Free Discovery Session"
- Default secondary CTA: "See Our Work"

All defaults must be reviewed against V5 umbrella voice. Where an individual page passes overriding props, those overrides need their own V5 pass.

### 5.10 Sticky Mobile CTA — `src/layouts/BaseLayout.astro` (line 193)

Global sticky CTA across all pages. Current text: **"Request a Site Visit"** → `/contact`. Per audit, on `/brand-mark` and `/brand-mark/claim` it should swap to **"Claim Your Spot"** → `/brand-mark/claim`. Requires either per-page prop support (dev work) or copywriter providing both labels so dev can wire in conditional logic.

### 5.11 404 Page — `src/pages/404.astro`

Review against V5 voice. Current copy should be checked for V4 residue.

### 5.12 Case Studies — `src/pages/work/[...slug].astro` and `src/content/projects/*.md`

Individual case study bodies live in the `content/projects/*.md` files. Each case study should be reviewed for:

- V4 language (villain names, Core Belief quote)
- "Landmark Moment" concept applied correctly (mural-only)
- Trust line / master anchor line alignment

The shared footer CTA on every case study now reads "Start a Conversation" and routes to `/contact`. Review the label against V5 §1 or §2.

### 5.13 About Pages — `src/pages/about/*.astro`

Four pages in this folder (index, philosophy, process, insurance-and-licensing). All need V5 voice alignment. Philosophy page especially: it likely still centers on the V4 "How you do anything is how you do everything" Core Belief, which V5 replaces with the Philosophical Shorthand.

---

## 6. Metadata Copy (SEO and Social)

Every page in `src/pages/` passes a `title` and `description` to `BaseLayout`. These populate `<title>`, `<meta name="description">`, Open Graph, and Twitter cards. Most are still V4-era. Each one needs a V5 pass. The audit report at `docs/website-audit-2026-04-22.md` has the full list.

Also in `BaseLayout.astro`: the LocalBusiness JSON-LD block currently lacks `telephone`, `openingHours`, and `logo`. Spencer needs to decide whether to add these. If yes, the copywriter does not write those values; they come from Spencer directly.

---

## 7. CLAUDE.md Terminology Updates (Internal Docs, Not Client-Facing)

Two project instruction files still reference V4 terminology. These are agent instructions, not site copy, but they should be updated so future AI sessions operate on V5. Spencer declined to update these during the current structural session. The copywriter is welcome to propose the diff for Spencer's approval or simply flag it back to Spencer.

- `WEBSITE/umm-website/umm-website/CLAUDE.md` — lines 125, 129, 132–133, 139, 143–148
- `ACTIVE PROJECTS/UNTITLED MIXED MEDIA/CLAUDE.md` — lines ~114–125 (Messaging Stack), ~129–134 (BrandScripts table), line 136 (governing doc path), lines ~138–149 (Content Generation Rules)

What specifically changes: V4 path → V5 path; villain name "Indifference" → "Visual sameness"; villain-ownership lines updated for Brand Mark inheritance; Core Belief row replaced with Philosophical Shorthand; new rules added for Certificate of Provenance scope and "UMM does not sign finished work."

---

## 8. Approval Workflow

For every block above:

1. Propose the exact text in chat with Spencer, citing the V5 section or Offer v2 section it came from.
2. Wait for Spencer's explicit approval.
3. Only after approval, the text lands in the file.

If the language does not exist in V5 or Offer v2 verbatim, do not author a paraphrase. Flag the gap and let Spencer write the line.

---

## 9. What Is Already Done (No Copy Work Needed Here)

So the copywriter does not duplicate effort:

- Plausible analytics installed, 13 CTAs tagged
- `/brand-mark/claim` intake route exists and submits to Formspree
- All `/contact?type=brand-mark` URL references swapped to `/brand-mark/claim`
- Case-study footer CTA routes to `/contact` (previously `mailto:`)
- Canela Blackletter font preload added
- Defensive `type="button"` on 4 non-submit buttons
- Clean production build (27 pages)

---

## 10. Post-Launch Structural Work (DNS Cutover)

When `untitledmixedmedia.com` DNS moves to Cloudflare, one task is waiting:

**Build the Cloudflare Email Routing Worker for form submissions.** All forms currently use a dead Formspree endpoint (`xpwrzqkl` — 404 Form Not Found). Forms show a graceful fallback error pointing users to `hello@untitledmixedmedia.com`, so this is not a pre-launch blocker, but it must be resolved before launch day.

Files to update once the Worker is deployed (5 locations):
- `src/pages/brand-mark/claim.astro:53`
- `src/pages/contact.astro:79`
- `src/pages/contact.astro:147`
- `src/pages/mural-cost-estimator.astro:344`
- `src/pages/mural-cost-estimator.astro:1334`

Estimated time: 30 minutes after Email Routing is enabled on the domain.

---

## 11. Open Questions for Spencer to Answer Before Copy Starts

1. On the Brand Mark intake (`/brand-mark/claim`), do the logo upload and notes fields stay (current: 7 fields total), or do we collapse to the 5 questions Offer v2 specifies?
2. Sticky mobile CTA on `/brand-mark*` — confirm label should be "Claim Your Spot" and target `/brand-mark/claim`?
3. LocalBusiness JSON-LD: provide telephone, opening hours, and logo URL, or leave out?
4. `pyrrole-red` brand color: confirm the hex value so the error styling on the cost estimator can be fixed.
5. Journal newsletter form: wire to MailerLite, or remove the form?

Each answer unblocks a specific piece of copy or structural follow-up.
