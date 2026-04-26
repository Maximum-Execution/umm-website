# UMM Website Copywriter Handoff
**Date:** 2026-04-25 (verified pass)
**For:** Expert copywriter
**From:** Spencer / UMM
**Purpose:** Identify every section that needs rewriting, additions, or strategic changes to improve SEO, conversions, and brand voice. This is an audit, not new copy. Spencer's copywriter writes the new copy.

---

## How to Use This Document

1. Each issue is tagged by page and severity.
2. The "Top Fixes" section at the bottom is the priority order.
3. The page inventory table at the top shows the current state (H1, meta title, primary CTA) for every public page.
4. **Hard rules from UMM brand:**
   - Customer is the hero. Spencer is the guide.
   - Lead with the customer's problem, not Spencer's credentials.
   - **No em dashes.** Use periods, colons, commas, semicolons, or parentheses.
   - V5 BrandScript villains: "Visual sameness" (umbrella), "the generic mural" (murals), "visual pollution" (signs and Brand Mark).
   - Voice: warm but direct. Professional artist. Not corporate. Not hustle-culture.

---

## Page Inventory (Verified)

| Page | URL | Current H1 | Top Issue |
|------|-----|------------|-----------|
| Homepage | `/` | "We help you build your idea into something worth painting." | Strong H1, but body copy across 11 sections lacks a single dominant CTA |
| Murals | `/murals` | "Hand-painted murals in Richmond, Virginia." | H1 is generic; mirrors Signs H1 word-for-word except the noun |
| Hand-Painted Signs | `/hand-painted-signs` | "Hand-painted signs in Richmond, Virginia." | H1 mirrors Murals H1; villain ("visual pollution") not named in hero |
| Brand Mark | `/brand-mark` | (PageHero headline — verify) | The Collector's Guarantee, the strongest risk reversal, first appears at line 434 of a 700-line page. Buried. |
| Brand Mark Claim | `/brand-mark/claim` | "Tell me what you're thinking." | Form-only page, zero SEO value, near-duplicate of `/brand-mark` |
| Contact | `/contact` | "Tell us about your project. We'll take it from here." | Generic meta title, vague subline |
| About | `/about` | "Most artists want everyone to know their name. We want everyone to know yours." | Strong opener, then drifts into Spencer's credentials |
| Work | `/work` | "Hand-painted murals and signs in Richmond, Virginia." | H1 reads like a service page, not a portfolio page |
| Journal | `/journal` | "Thoughts on public art, signs, buildings, and the people who care about them." | Newsletter form has no copy explaining why to subscribe |
| Process | `/about/process` | "Your project has more depth than you think. Our process finds it." | Strong. Use as the template for rewriting Murals/Signs/Brand Mark. |
| Philosophy | `/about/philosophy` | "Your space should tell your story. Not someone else's." | Orphaned. Only linked from About. |
| Sign Restoration | `/sign-restoration` | "Your building has a history painted on it. Don't let it disappear." | Strong, but missing local SEO signals (no neighborhoods named) |
| Mural Cost Estimator | `/mural-cost-estimator` | "How much does a mural cost?" | Hidden. Not linked from the Murals page hero. |

---

## A. SEO Gaps

### A1. Duplicate / Generic H1s
- **Murals:** "Hand-painted murals in Richmond, Virginia."
- **Signs:** "Hand-painted signs in Richmond, Virginia."
- These differ by one word. They look like duplicate pages in the SERPs. Each H1 should be distinct, problem-driven, and benefit-driven.
- **Work page** uses the same template ("Hand-painted murals and signs in Richmond, Virginia") instead of portfolio-page messaging like "Selected projects from Richmond, Virginia."

### A2. Meta Title / H1 Mismatch
- **Sign Restoration:** Meta is "Ghost Sign Restoration in Richmond, VA" but H1 is "Your building has a history painted on it." H1 is stronger; the meta should match the emotional hook.
- **Brand Mark:** Meta title is 15+ words. Bloated. Front-load the keyword.
- **Contact:** Meta is generic ("Contact | UMM"). Add a keyword: "Contact Spencer | Murals & Signs | Richmond, VA."

### A3. Thin or Duplicate Content
- **`/brand-mark/claim`** is a form-only page that duplicates the offer on `/brand-mark`. Has near-zero SEO value. Either merge into `/brand-mark` or noindex it.

### A4. Missing Local SEO Signals
- The homepage hero subline already names Richmond ("Hand-painted murals and signs in Richmond, Virginia"). Good.
- But **no neighborhood-specific landing pages exist.** The Brand Mark intake lists 9 Richmond neighborhoods (Scott's Addition, Carytown, Church Hill, Manchester, The Fan, Jackson Ward, Shockoe Bottom, Brookland Park, Oregon Hill). None of them has a landing page. Each one is a missed search-traffic opportunity.
- Sign Restoration page doesn't name any neighborhoods (huge miss for ghost-sign hunters in specific districts like Manchester or Shockoe Bottom).

### A5. Missing Internal Linking
- **Philosophy and Process are orphaned.** They're only reachable through the About page nav. Service pages (Murals, Signs, Brand Mark) should link to Philosophy and Process where the topic comes up naturally.
- **Note:** Murals + Signs DO already cross-link to each other (Murals page links to Signs at line 310; Signs links to Murals at line 300). Good.
- **Insurance & Licensing page exists** at `/about/insurance-and-licensing` but isn't linked from service pages. "Fully insured and licensed" should hyperlink to it.

### A6. Missing Pages Worth Building
- **Neighborhood landing pages** (highest SEO ROI). Start with two or three of the highest-traffic Richmond neighborhoods (Scott's Addition + Church Hill + Carytown), build them as templates, then replicate for the rest.
- **Standalone `/pricing` page** with clean tiers, examples, and photos. Currently the Cost Estimator is interactive but hidden. A simple pricing page would rank for "mural cost richmond."
- **`/testimonials`** index. Social proof is currently scattered.
- **Journal category pages** (`/journal/materials`, `/journal/richmond-history`, `/journal/budgeting`). Currently the Journal has no taxonomy.

---

## B. Conversion / CTA Problems

### B1. Too Many Competing CTAs
- **Homepage** has CTAs in roughly 5 sections (hero, services showcase, brand mark, journal, footer CTA block). No single dominant action.
- **Murals page** has the hero pair (Schedule + See What It Costs), then a Brand Mark cross-sell button mid-page, plus inline text links. Same on Signs.
- Pattern needed: one primary CTA per page (e.g., "Schedule Discovery") + one secondary (e.g., "See pricing"). Everything else demoted to text links.

### B2. Vague CTA Labels
- "View All →" (multiple pages) doesn't tell the user what's on the other side.
- "See the Process" (Philosophy) is unclear about value.
- "Schedule Your Free Discovery Session" is long and front-loads effort ("schedule") before benefit. Compare to Brand Mark's "Claim Your Spot" which front-loads ownership.

### B3. The Strongest Risk Reversal Is Buried
- **Brand Mark:** The Collector's Guarantee ("Accept the finished piece or I take it home. You owe nothing more.") first appears at **line 434** of a 700-line page. It then repeats at line 492 and line 677. This is the single strongest sales tool on the site. It should be in the hero subline.

### B4. Missing Risk Reversal in Service Page Heroes
- **Murals:** No mention of durability, guarantee, or "what happens if you don't like it" above the fold.
- **Signs:** Same. The competitive hook ("vinyl costs more, lasts less") is buried hundreds of words down.

### B5. Missing Social Proof Above the Fold
- No testimonials in any service page hero.
- No project count or "trusted by" stat (e.g., "100+ Richmond businesses since 2019").
- The portfolio exists but isn't framed as proof on the service pages themselves.

### B6. Form Friction
- **Brand Mark claim form:** check field count and add a progress indicator if 5+ fields.
- **Contact form:** consider whether optional fields (phone, timeline, budget) could be moved to a follow-up step.

### B7. Pricing Transparency
- **Murals page:** range shown ("$4K–$100K+") but no examples of what each tier looks like in real life. The Cost Estimator does this well; surface it from the hero.
- **Signs page:** same issue. Add tier examples.
- **Brand Mark:** $500 is clear, but the upsell ("$500 credit toward future mural") isn't in the hero. Move it up.

---

## C. StoryBrand / Messaging Weaknesses

### C1. Customer Framing
- **Homepage hero subline** does this well: "Most artists paint for themselves. Most sign shops print for speed. I paint for you." Strong customer-first framing.
- **About page** opens strong ("We want everyone to know your name") but the second section ("Why I care about this") shifts to Spencer's perspective for two paragraphs before returning to the customer. The voice slip is fine for an About page, but the rest of the site shouldn't follow that pattern.
- **Service pages** lead with the service, not the customer's problem. Murals subline ("We create murals with intention, care, and depth") describes the work, not the customer's situation.

### C2. Missing Explicit Problem Statements in Heroes
- **Murals hero subline:** "We create murals with intention, care, and depth." Vague. The villain (the generic mural) isn't named.
- **Signs hero subline:** Names the problem ("Your sign is the first thing people judge about your business") but then shifts to process before the stakes land.
- **Brand Mark hero:** Process-focused ("Tell me what you're thinking") instead of problem-focused.

### C3. Missing the 3-Step Plan in Visible Hierarchy
- Per V5 BrandScript: Murals = Discover → Collect → Paint. Signs = Discover → Design → Paint. Brand Mark = Discover → Design → Install.
- The plan should be a labeled section near the top of each service page with three numbered steps. Currently it's buried in mid-page paragraphs.

### C4. Missing Failure Stakes
- **Murals:** What happens if you hire the wrong muralist? "Your wall becomes generic. People walk past it. The investment fades." Not stated up front.
- **Signs:** "A bad sign tells people your business is cheap and temporary." Should be a hero-level claim.
- **Brand Mark:** No failure scenario at all. Add: "Without this, you're left with vinyl that peels in three years."

### C5. Missing Success Vision
- **Murals:** Add what life looks like after. "Your building becomes a landmark. People cross the street to photograph it. Local press covers the unveiling."
- **Signs:** Add: "Strangers ask about your sign. The conversation starts there."
- **Brand Mark:** The closing copy ("This isn't signage. It's an original.") gestures at the success vision but doesn't paint the picture.

### C6. V5 BrandScript Compliance
- **Brand Mark page:** does NOT name a villain. Per V5, Brand Mark inherits "visual pollution" from Signs. Currently no villain is named.
- Search the codebase for any remaining V4 villain language ("indifference") and replace with the V5 umbrella villain ("visual sameness").
- Project CLAUDE.md is still on V4 messaging — flagged as P1 from a prior planning session.

### C7. Em Dashes (Audit Result)
- Searched the entire `src/` tree for em dashes (` — `) and en dashes (` – `) in user-facing copy.
- **Em dashes in user-facing body copy: zero confirmed.** All 58 matches were in code comments (`<!-- ... -->`) or component docstrings, not in rendered text.
- **En dashes (` – ` and `&ndash;`) are used for price ranges** (e.g., "$15 – $25/sqft") and date ranges in the cost estimator and the hand-painted-vs-vinyl article. **This is correct typography.** En dashes are the standard glyph for numeric ranges. Don't strip them.
- **Action:** No em dash cleanup needed unless the copywriter introduces one in new copy. The brand rule still applies going forward.

---

## D. Brand Voice Issues

### D1. Corporate-Speak Drift
- **Homepage Brand Mark section** (in `index.astro` lines 86-87): "Your $500 includes the panel, professional installation, a protective topcoat, a touch-up kit with your exact paint, and $500 in credit toward any future mural or sign project." Reads like a product spec sheet. The Brand Mark page itself does the same thing in a different paragraph.
- **Process page** uses "Every phase is documented." Vague corporate-speak. Specific is stronger: "I photograph and log every step."

### D2. Generic Phrases
- "We believe your sign should reflect who you are" (Signs page) — could be on a hair salon's site.
- "Premium quality" / "professional-grade" — meaningless without specifics.
- "Bring the thinking" (compressed one-liner) — vague. Specific examples convert better than abstractions.

### D3. Missing Specificity
- **Murals:** "I research all of it before I pick up a brush" → make it specific. "I visit the site three times, photograph the building from twelve angles, research the original owner's family, and interview your team before sketching the first line."
- **Signs:** "Design science" mentions "viewing distances and angles" but gives no actual numbers. "Letters need to be X inches tall to be read at 50 feet" with a real number.
- **Brand Mark:** "professional-grade archival materials" → "Museum-grade paint that survives twenty Virginia summers without fading."

### D4. Passive Voice
- "Materials are gathered" → "I source every color from your building's actual brick."
- "Service Shield topcoat is applied" → "I seal it with a clear coat that protects against graffiti and UV."

---

## E. Pages That Need to Exist

### E1. Neighborhood Landing Pages (Highest SEO ROI)
For each Richmond neighborhood UMM works in, create a paired set:
- `/murals/scotts-addition`, `/hand-painted-signs/scotts-addition`
- `/murals/church-hill`, `/hand-painted-signs/church-hill`
- ...and so on for the 9 neighborhoods listed in the Brand Mark intake.

Hyper-local searches convert at higher rates than broad terms. Start with the 2–3 highest-traffic neighborhoods as templates.

### E2. Standalone `/pricing` Page
A clean, scannable pricing breakdown with examples and photos. Cost Estimator is interactive but buried. A simple pricing page would rank for "mural pricing richmond" and "how much does a mural cost."

### E3. `/testimonials` Index
Customer quotes, projects, and outcomes on one page.

### E4. Journal Category Pages
- `/journal/materials` — "Mineral paint vs. acrylic," "Why we use KEIM."
- `/journal/richmond-history` — "Ghost signs in Jackson Ward."
- `/journal/budgeting` — "How to budget for a mural" (ranks for "mural cost" intent).

### E5. Better Discoverability for `/about/insurance-and-licensing`
The page exists but is buried. Hyperlink "fully insured and licensed" from every service page where the phrase appears.

---

## Top Fixes (Priority Order)

1. **Move the Collector's Guarantee to the Brand Mark hero subline.** Strongest risk reversal on the site, currently buried at line 434 of a 700-line page.
2. **Cut to one primary CTA + one secondary per service page.** Currently each page has a hero pair plus mid-page Brand Mark cross-sells plus inline text links. Pick a hierarchy.
3. **Differentiate the Murals and Signs H1s.** They mirror each other word-for-word. Make each one problem-driven and benefit-driven.
4. **Build 2–3 neighborhood landing pages as a template** (Scott's Addition, Church Hill, Carytown). Replicate for the other 6 once the template proves itself.
5. **Name the villain in service page heroes.** Murals: "the generic mural." Signs / Brand Mark: "visual pollution." Currently no villain is named in any service hero.
6. **Build a standalone `/pricing` page** with tiers, examples, and photos. Link from each service page hero.
7. **Add social proof to service page heroes.** A project count ("100+ Richmond businesses since 2019") and one testimonial above the fold.
8. **Add the 3-step plan as a visible numbered section** near the top of each service page. Currently buried in mid-page paragraphs.
9. **Merge or noindex `/brand-mark/claim`.** Form-only duplicate.
10. **Update the project CLAUDE.md to V5 messaging.** Currently still references V4 villain language.

---

## Notes for the Copywriter

- **Spencer's voice is strongest** when he's naming the customer's problem in the customer's language. Lean into that. The homepage hero subline ("Most artists paint for themselves. Most sign shops print for speed. I paint for you.") is the best example on the site.
- **Avoid vague benefits.** "Professional-grade materials" → "Paint that survives twenty Virginia summers without fading."
- **The Brand Mark page is exhausting at ~700 lines.** Tighten the offer to the four things that matter: what you get, how long it takes, how much it costs, the guarantee.
- **The `/about/process` page is the gold standard.** Its structure (clear problem, clear solution, clear proof) should be the template for rewriting Murals, Signs, and Brand Mark.
- **The Contact page lacks confidence.** "Tell us about your project. We'll take it from here." is passive. The Brand Mark page's "Tell me what you're thinking" is better. Even better would be customer-state-driven: "You know what you want. You just don't know how to build it."

---

## Audit Caveats

- This audit reflects what's in the codebase as of 2026-04-25.
- A first pass of this audit incorrectly claimed the homepage had no H1, and incorrectly cited em dashes on Sign Restoration line 92 and About line 57. Those claims have been removed after verification.
- En dashes in price ranges and date ranges are correct typography, not violations.
- One claim in this version remains unverified by line-count: that the Brand Mark page is ~8000 words. The line count (700+) confirms it's long; word count was not directly measured.
