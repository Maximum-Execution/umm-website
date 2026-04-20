# Case Studies — Final Copy Rollout Design

**Date:** 2026-04-20
**Scope:** Finish the two existing case studies (Carytown Monarch and Church Hill Trolley Barn) by applying the FINAL humanized copy to the Astro site.
**Approach:** Full rewrite of each `.md` from FINAL copy, hotlinking live WordPress images, adding `<figure>` + `<figcaption>` rendering.

---

## Context

The Astro site already has two case studies at:

- `/work/carytown-butterfly-mural`
- `/work/church-hill-trolley-barn`

Both are wired through `src/pages/work/[...slug].astro` which renders markdown from `src/content/projects/*.md`. The current MD files are ~90% of the FINAL copy. What's missing:

- Some wording (FINAL renamed "Certificate of Provenance" → "Full traceability" / "documented source" in these case studies)
- Heading rename (FINAL: "The defining insight" vs current "The pivotal insight")
- Section reorder in Trolley (FINAL moves "What working with us looks like" before "The transformation")
- Published image captions (current uses `alt` only, FINAL has editorial captions)

The client also provided live WordPress URLs as the source of truth for image placement order. All referenced images exist on the live site under `https://untitledmixedmedia.com/wp-content/uploads/2023/{09,10}/`.

Videos in the Carytown FINAL copy are omitted by user's decision (they were a mistake in the FINAL doc).

## Principles

1. **FINAL copy is the source of truth.** Section order, headings, wording, bullet content, image placement all come from the FINAL `.md` files under `WEBSITES PROJECTS/SHORT PUMP MURAL/case studies final/`.
2. **Hotlink images from WordPress.** Spencer will migrate image assets to the Astro repo later. For now, `<img src>` points to the live WordPress URLs.
3. **No template changes.** The `[...slug].astro` template's standard CTA block + prev/next stays. FINAL's inline CTA block and closing italic line are omitted (redundant with template + site footer).
4. **Visible captions.** Every FINAL image with a caption gets `<figure>` + `<figcaption>` rendered visibly. Editorial tone, not museum-label tone.

## File-by-file plan

### `src/content/projects/carytown-butterfly-mural.md`

**Frontmatter:**
- `cover:` → `https://untitledmixedmedia.com/wp-content/uploads/2023/10/northbank-mural-opening-angles-7ENLARGED-STANDARD-standard-height-1080px.png`
- All other fields unchanged.

**Body (in FINAL order):**
1. Hero figure (no caption) — `northbank-mural-opening-angles-7ENLARGED...png`
2. `## What happened here, in plain language.` + 4 paragraphs
3. `## In Carytown, a blank wall doesn't sit quietly.` + 7 paragraphs + wide-mural figure with caption
4. `## Why a financial firm runs a monarch waystation.` + 3 paragraphs
5. `## The eastern monarch: the stakes behind the garden.` + 3 paragraphs
6. `## How the work got done.`
   - `### Research: The waystation becomes the source document.` + paragraphs + 2 paired figures (morph-1 with caption, morph-8 no caption)
   - `### The defining insight: the relationship was already in the photographs.` + paragraphs + 4 figures (morph-2, morph-6, morph-4, morph-9) with selective captions per FINAL
   - `### Execution: Painting the ecosystem by hand.` + paragraphs + 2 figures (hand-painted-detail, 11ENLARGED) with captions
   - `### Canvas prints and animated video.` + paragraphs + canvas print figure. **Videos skipped.**
7. `## The finished work.` + 7 gallery figures with captions per FINAL
8. `## What the project delivered.` + 6 bullets ("Full traceability" wording)
9. `## The impact.` + 6 paragraphs
10. `## What happens if the wall stays blank.` + 4 paragraphs
11. `## What working with us looks like.` + 5 paragraphs

**Omitted:** FINAL's inline CTA block, FINAL's italic closing footer.

### `src/content/projects/church-hill-trolley-barn.md`

**Frontmatter:**
- `cover:` → `https://untitledmixedmedia.com/wp-content/uploads/2023/09/untitled-mixed-media-historic-trolley-barn-mural-richmond@0.5xtopaz-exposure-sharpen-color.jpeg`
- All other fields unchanged.

**Body (in FINAL order — note reorder from current):**
1. Hero figure (no caption)
2. `## What happened here, in plain language.` + 5 paragraphs
3. `## This building was four months from rubble.` + 4 paragraphs + before figure with caption
4. `## Why this building matters more than most people knew.` + 6 paragraphs + vintage-photo figure with caption
5. `## Three things that had to go exactly right.` + 3 bold-headed paragraphs + three-walls figure with caption
6. `## How the work got done.`
   - `### Research: The photographs become the source document.` + 3 paragraphs (no images)
   - `### Design: A photorealistic preview before a single brushstroke.` + paragraphs + 2 paired 3D render figures
   - `### Execution: Two photographs, three walls, one perspective you have to stand in the right place to see.` + paragraphs + interior-wall, corner-perspective, face-detail figures with captions
   - `### Sign restoration: Giving back what was always there.` + paragraphs + 3 sign figures with captions
7. `## The finished work.` + 10 gallery figures with captions
8. `## What the project delivered.` + 7 bullets ("Full traceability" wording)
9. `## The impact.` + 4 paragraphs
10. `## What working with us looks like.` + 3 paragraphs **(moved up from bottom)**
11. `## The transformation.` + 5 paragraphs **(now ends narrative)**

**Omitted:** FINAL's inline CTAs, FINAL's italic closing footer.

### `src/styles/global.css`

Append a minimal figure/figcaption block scoped to `.case-study-prose`:

```css
.case-study-prose figure {
  margin: var(--spacing-lg, 2.5rem) 0;
}
.case-study-prose figure img {
  width: 100%;
  height: auto;
  display: block;
}
.case-study-prose figcaption {
  font-family: var(--font-body);
  font-size: var(--text-fluid-sm);
  font-style: italic;
  color: var(--color-soft-gray);
  margin-top: 0.75rem;
  line-height: var(--leading-relaxed);
  max-width: var(--measure-base, 65ch);
}
```

Tokens referenced above use the names already defined in `@theme`. Fallback values provided for safety.

## Image mapping (complete)

### Carytown — base URL: `https://untitledmixedmedia.com/wp-content/uploads/2023/10/`

| # | FINAL role | Filename |
|---|---|---|
| 1 | Hero | `northbank-mural-opening-angles-7ENLARGED-STANDARD-standard-height-1080px.png` |
| 2 | Wide mural after Carytown section | `untitled_mixed_media_monarch-butterfly-mural-carytown-ai-art-richmond-virginia.jpg` |
| 3 | Pattern analysis pair (1) | `untitled-mixed-media-monarch-butterfly-mural-carytown-richmond-morph-1.jpg` |
| 4 | Pattern analysis pair (2) | `untitled-mixed-media-monarch-butterfly-mural-carytown-richmond-morph-8.jpg` |
| 5 | Shared geometry | `untitled-mixed-media-monarch-butterfly-mural-carytown-richmond-morph-2.jpg` |
| 6 | Analysis overlap | `untitled-mixed-media-monarch-butterfly-mural-carytown-richmond-morph-6.jpg` |
| 7 | Analysis revealed | `untitled-mixed-media-monarch-butterfly-mural-carytown-richmond-morph-4.jpg` |
| 8 | Analysis depth | `untitled-mixed-media-monarch-butterfly-mural-carytown-richmond-morph-9.jpg` |
| 9 | Hand-painted detail | `untitled_mixed_media_carytown_mural_richmond_virginia_monarch_northbank.jpeg` |
| 10 | Wide context with garden | `northbank-mural-opening-angles-11ENLARGED-STANDARD-standard-height-1080px.png` |
| 11 | Canvas print | `untitled-mixed-media-monarch-butterfly-mural-artificial-intelligence-art-print.jpg` |
| 12 | Finished establishing | `northbank-mural-opening-angles-10ENLARGED-STANDARD-standard-height-1080px.png` |
| 13 | Finished angle 2 | `northbank-mural-opening-angles-4ENLARGED-STANDARD-standard-height-1080px.png` |
| 14 | Finished from street | `northbank-mural-opening-angles-9ENLARGED-STANDARD-standard-height-1080px.png` |
| 15 | Finished detail | `northbank-mural-opening-angles-12ENLARGED-STANDARD-standard-height-1080px.png` |
| 16 | Finished angle 3 | `northbank-mural-opening-angles-14ENLARGED-STANDARD-standard-height-1080px.png` |
| 17 | Finished garden-and-wall shot | `northbank-mural-opening-angles-13ENLARGED-STANDARD-standard-height-1080px.png` |
| 18 | Closing | `untitled-mixed-media-butterfly-mural-northbank-partners-richmond.jpg` |

### Trolley — base URL: `https://untitledmixedmedia.com/wp-content/uploads/2023/09/`

| # | FINAL role | Filename |
|---|---|---|
| 1 | Hero | `untitled-mixed-media-historic-trolley-barn-mural-richmond@0.5xtopaz-exposure-sharpen-color.jpeg` |
| 2 | Before shot | `untitled-mixed-media-historic-trolley-barn-mural-richmond-original.jpg` |
| 3 | Archival vintage photo | `untitled-mixed-media-church-hill-trolley-barn-mural-richmond-vintage-photo.jpg` |
| 4 | Three walls wide | `untitled-mixed-media-church-hill-trolley-barn-mural-richmond.jpeg` |
| 5 | 3D render 1 | `untitled-mixed-media-historic-trolley-barn-mural-richmond-3d-render-mockup.jpg` |
| 6 | 3D render 2 | `untitled-mixed-media-historic-trolley-barn-mural-richmond-3d-mockup-render.jpg` |
| 7 | Interior wall | `untitled-mixed-media-historic-trolley-barn-mural-richmond-historicmural.jpg` |
| 8 | Corner perspective | `untitled-mixed-media-church-hill-trolley-barn-mural-richmond-streetartist.jpg` |
| 9 | Face detail (close-up value channels) | `untitled-mixed-media-church-hill-trolley-barn-mural-richmond-handpainted.jpg` |
| 10 | Sign restored | `untitled-mixed-media-virginia-electric-power-hand-painted-sign.jpg` |
| 11 | Sign in context with mural | `untitled-mixed-media-trolley-mural-richmond-handpainted-sign-historic.jpg` |
| 12 | Sign detail | `untitled-mixed-media-trolley-mural-richmond-handpainted-sign.jpg` |
| 13 | Finished wide | `untitled-mixed-media-trolley-mural-richmond-virginia-historic-rva.jpg` |
| 14 | Finished setting | `untitled-mixed-media-trolley-mural-richmond-virginia-rva.jpg` |
| 15 | Ground level | `untitled-mixed-media-historic-trolley-barn-mural-richmond-streetart.jpg` |
| 16 | Composition | `untitled-mixed-media-church-hill-trolley-barn-mural-richmond-rva.jpg` |
| 17 | Close-up face | `untitled-mixed-media-church-hill-trolley-barn-mural-richmond-art.jpg` |
| 18 | Full sweep | `untitled-mixed-media-church-hill-trolley-barn-mural-richmond-artwork.jpg` |
| 19 | Another angle | `untitled-mixed-media-church-hill-trolley-barn-mural-richmond-rvamural.jpg` |
| 20 | Texture | `untitled-mixed-media-church-hill-trolley-barn-mural-richmond-muralart.jpg` |
| 21 | Preservation | `untitled-mixed-media-historic-trolley-barn-restoration-mural-richmond.jpg` |
| 22 | Final context | `untitled-mixed-media-historic-trolley-barn-restoration-mural-richmond-virginia.jpg` |

## Commits

1. `style: add case-study figure and figcaption styles` — `src/styles/global.css`
2. `copy: rewrite carytown case study from FINAL — hotlinked images, figcaptions, skip videos` — `src/content/projects/carytown-butterfly-mural.md`
3. `copy: rewrite trolley barn case study from FINAL — hotlinked images, figcaptions, section reorder` — `src/content/projects/church-hill-trolley-barn.md`

## Verification

After push, wait for Cloudflare build, then WebFetch:
- `https://umm-website.pages.dev/work/carytown-butterfly-mural`
- `https://umm-website.pages.dev/work/church-hill-trolley-barn`

Confirm (1) hero image renders from WordPress URL, (2) at least one figcaption is visibly present on each page, (3) "What working with us looks like" appears before "The transformation" on the Trolley page.

## Later follow-up (not in this rollout)

Spencer will download the WordPress images into `public/images/projects/*` and re-point the hotlinks to local paths. Separate task, separate commit.

## Known constraints

- Hotlinks mean images break if WordPress goes offline. Acceptable for now; explicit in "Later follow-up" above.
- FINAL copy uses "I" voice in some places and "We" voice in others (e.g., "I visit the building" / "We started at the waystation"). Keeping FINAL's mixed voicing as written — not editing it.
