# Case Studies FINAL Copy Rollout — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship the two existing case studies (Carytown Monarch and Church Hill Trolley Barn) with the FINAL humanized copy, hotlinking images from WordPress, adding visible figcaptions.

**Architecture:** Two markdown files under `src/content/projects/` drive two case-study pages rendered by `src/pages/work/[...slug].astro`. Full rewrite each `.md` from FINAL copy, add minimal CSS for `<figure>` + `<figcaption>` rendering in `src/styles/global.css`. Template unchanged. Images hotlinked from `https://untitledmixedmedia.com/wp-content/uploads/2023/{09,10}/<filename>`.

**Tech Stack:** Astro 6 static SSG, Tailwind v4 via CSS-first `@theme`, markdown content collections, Cloudflare Pages auto-deploy from GitHub `main`.

**Design doc:** `docs/plans/2026-04-20-case-studies-final-design.md` — has the full image-mapping tables and section-by-section body structure. Consult it anytime the plan references "per FINAL copy" or "per the mapping table".

**Source files for copy:**
- `C:\Users\thesu\Dropbox\ACTIVE PROJECTS\UNTITLED MIXED MEDIA\WEBSITE\WEBSITES PROJECTS\SHORT PUMP MURAL\case studies final\carytown-monarch-case-study-FINAL.md`
- `C:\Users\thesu\Dropbox\ACTIVE PROJECTS\UNTITLED MIXED MEDIA\WEBSITE\WEBSITES PROJECTS\SHORT PUMP MURAL\case studies final\trolley-barn-case-study-FINAL.md`

**Out-of-scope (do NOT do):**
- Do not modify `src/pages/work/[...slug].astro`.
- Do not add a FINAL-style CTA block inside the markdown body. The template's "Tell us about your walls." CTA stays.
- Do not include FINAL's closing italic "*Untitled Mixed Media LLC…*" line. Site footer already handles attribution.
- Do not embed any video — user confirmed videos in the FINAL were a mistake.
- Do not download WordPress images to the repo. Hotlinks only for this pass.

---

## Task 1: Add figure/figcaption CSS

**Files:**
- Modify: `src/styles/global.css` — append at end, before any existing closing block or module

**Step 1: Locate `.case-study-prose` references**

Run: `Grep` for `case-study-prose` across `src/`. Confirm this class is referenced in `src/pages/work/[...slug].astro` (wrapping `<Content />`) and verify there are no existing `.case-study-prose figure` rules to conflict with.

Expected: single wrapping element, no existing figure rules.

**Step 2: Read the end of `src/styles/global.css` to find a clean append point**

Run: `Read` the last 40 lines. Find the end of existing CSS. Append directly at end-of-file unless you spot an obvious thematic location for prose-related rules.

**Step 3: Append this CSS block**

```css
/* Case study prose — figure + figcaption */
.case-study-prose figure {
  margin: 2.5rem 0;
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
  color: var(--color-soft-gray, #B3B2B0);
  margin-top: 0.75rem;
  line-height: 1.6;
  max-width: 65ch;
}
```

Note: `--color-soft-gray` has a hex fallback in case the token name differs in `@theme`. Verify against existing tokens — if you see `--soft-gray` (no `color-` prefix) used elsewhere, switch the CSS to match.

**Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "style: add case-study figure and figcaption rendering"
```

---

## Task 2: Rewrite Carytown case study MD

**Files:**
- Modify: `src/content/projects/carytown-butterfly-mural.md` — full body rewrite + `cover:` frontmatter update

**Step 1: Open FINAL copy source**

Read: `C:\Users\thesu\Dropbox\ACTIVE PROJECTS\UNTITLED MIXED MEDIA\WEBSITE\WEBSITES PROJECTS\SHORT PUMP MURAL\case studies final\carytown-monarch-case-study-FINAL.md`

This is the source of truth for headings, paragraph text, section order, image-placement directives, and captions.

**Step 2: Update frontmatter**

Keep all existing fields (`title`, `description`, `tags`, `date`, `featured`, `client`, `location`, `materials`) except:

```yaml
cover: "https://untitledmixedmedia.com/wp-content/uploads/2023/10/northbank-mural-opening-angles-7ENLARGED-STANDARD-standard-height-1080px.png"
```

**Step 3: Rewrite body from FINAL, applying these transforms**

For each `<!-- IMAGE: filename.ext -->` + `<!-- PLACEMENT: ... -->` pair in the FINAL copy:

- Replace with:
  ```html
  <figure>
    <img src="https://untitledmixedmedia.com/wp-content/uploads/2023/10/<filename.ext>" alt="<short alt>" />
    <figcaption>Caption text per FINAL</figcaption>
  </figure>
  ```
- If the PLACEMENT directive says "No caption", omit the `<figcaption>` entirely but keep the `<figure>` wrapper.
- If the PLACEMENT directive says "No caption needed" (paired image), same: omit `<figcaption>`.
- For images with "Paired with the above" or "Second" directives, render them as separate `<figure>` blocks (no visual pairing needed; the surrounding prose handles context).
- `alt` text: use a short descriptive phrase derived from the caption or role (e.g., `alt="Hero mural view"`, `alt="Pattern analysis output"`). Don't repeat the full caption in alt — that's screen-reader redundancy.

For every `<!-- VIDEO: ... -->` block: **skip entirely.** Do not include the video, do not leave a placeholder.

For the FINAL's inline CTA block (`### Ready to build something that belongs to your place?` + the two mailto buttons): **omit.** End the markdown body at the last paragraph of `## What working with us looks like.`

For the FINAL's closing italic line (`*Untitled Mixed Media LLC. Based in Richmond, Virginia...*`): **omit.**

Use the complete filename list from Task table in the design doc (`docs/plans/2026-04-20-case-studies-final-design.md`) for every image. Base URL for Carytown is `https://untitledmixedmedia.com/wp-content/uploads/2023/10/`.

**Step 4: Visual sanity check**

Read the written file. Confirm:
- Frontmatter has `cover:` with full WordPress URL
- First body element is a `<figure>` with the hero image (no caption)
- All H2 headings from FINAL appear, in FINAL's order
- All H3 headings inside "How the work got done." appear in FINAL's order
- "The defining insight" (not "The pivotal insight") appears as H3
- Deliverables bullets use "Full traceability" wording, not "Certificate of Provenance"
- No `<video>` tags, no `<!-- VIDEO` comments
- No "Ready to build something…" CTA block
- No `*Untitled Mixed Media LLC…*` footer line
- Every `<img src>` URL points to `untitledmixedmedia.com/wp-content/uploads/2023/10/`

**Step 5: Commit**

```bash
git add src/content/projects/carytown-butterfly-mural.md
git commit -m "copy: rewrite carytown case study from FINAL copy

- Hotlink images from WordPress (temporary until repo migration)
- Add visible figcaptions per FINAL
- Skip videos (user confirmed they were a mistake)
- 'Certificate of Provenance' -> 'Full traceability' wording
- Rename 'The pivotal insight' -> 'The defining insight'"
```

---

## Task 3: Rewrite Trolley Barn case study MD

**Files:**
- Modify: `src/content/projects/church-hill-trolley-barn.md` — full body rewrite + `cover:` frontmatter update

**Step 1: Open FINAL copy source**

Read: `C:\Users\thesu\Dropbox\ACTIVE PROJECTS\UNTITLED MIXED MEDIA\WEBSITE\WEBSITES PROJECTS\SHORT PUMP MURAL\case studies final\trolley-barn-case-study-FINAL.md`

**Step 2: Update frontmatter**

Keep all existing fields except:

```yaml
cover: "https://untitledmixedmedia.com/wp-content/uploads/2023/09/untitled-mixed-media-historic-trolley-barn-mural-richmond@0.5xtopaz-exposure-sharpen-color.jpeg"
```

Note the `@` character in the filename — keep it literal, don't encode.

**Step 3: Rewrite body from FINAL, applying the same image/video/CTA transforms as Task 2**

Base URL for Trolley: `https://untitledmixedmedia.com/wp-content/uploads/2023/09/`

**Critical: Section order.** The FINAL copy runs:
1. `## The impact.`
2. `## What working with us looks like.` (with 3 paragraphs)
3. `## The transformation.`

The current file has `## The transformation.` before `## What working with us looks like.`. **Follow FINAL order**, not current order.

The FINAL's `## What working with us looks like.` ends with two mailto CTAs ("Schedule Your Free Discovery Session" / "Get a Price Estimate"). **Omit** both — template handles CTA.

**Step 4: Visual sanity check**

Read the written file. Confirm:
- Frontmatter has `cover:` with full WordPress URL (including `@0.5xtopaz-...`)
- First body element is hero figure (no caption)
- Section order: Impact → Working with us → Transformation (not Impact → Transformation → Working)
- Deliverables bullets use "Full traceability" wording
- No `<video>` tags, no mailto-link CTA block, no italic footer line
- Every `<img src>` URL points to `untitledmixedmedia.com/wp-content/uploads/2023/09/`

**Step 5: Commit**

```bash
git add src/content/projects/church-hill-trolley-barn.md
git commit -m "copy: rewrite trolley barn case study from FINAL copy

- Hotlink images from WordPress (temporary until repo migration)
- Add visible figcaptions per FINAL
- Reorder: Impact -> Working with us -> Transformation
- 'Certificate of Provenance' -> 'Full traceability' wording"
```

---

## Task 4: Push and verify

**Step 1: Push to GitHub**

```bash
git push origin main
```

Expected: push succeeds, three new commits land on `origin/main`.

**Step 2: Wait for Cloudflare build**

Cloudflare Pages auto-builds from `main`. Typical time: 60–90 seconds. If there's a way to poll, use it; otherwise wait.

**Step 3: WebFetch the Carytown case study**

```
WebFetch: https://umm-website.pages.dev/work/carytown-butterfly-mural
Prompt: "Report whether (1) a hero image renders at the top, (2) at least one visible italic caption appears beneath an image, (3) the heading 'The defining insight: the relationship was already in the photographs.' is present. Return yes/no for each."
```

Expected: all three yes.

**Step 4: WebFetch the Trolley case study**

```
WebFetch: https://umm-website.pages.dev/work/church-hill-trolley-barn
Prompt: "Report whether (1) a hero image renders at the top, (2) at least one visible italic caption appears beneath an image, (3) the heading 'What working with us looks like.' appears BEFORE the heading 'The transformation.' in page order. Return yes/no for each."
```

Expected: all three yes.

**Step 5: Verify image hotlinks load (manual spot check)**

Open one of the hotlinked URLs directly in a browser or via `curl -I`:

```bash
curl -I "https://untitledmixedmedia.com/wp-content/uploads/2023/10/northbank-mural-opening-angles-7ENLARGED-STANDARD-standard-height-1080px.png"
```

Expected: `HTTP/1.1 200 OK` or similar. If 404, the hotlinked URL is wrong and needs correction.

**If any verification step fails:** return to the relevant Task, fix the problem, commit the fix, push, re-verify. Do NOT mark complete until all three WebFetch checks return all-yes.

---

## Commit log summary (expected end state)

```
<hash>  docs: plan for case studies FINAL copy rollout
<hash>  style: add case-study figure and figcaption rendering
<hash>  copy: rewrite carytown case study from FINAL copy
<hash>  copy: rewrite trolley barn case study from FINAL copy
```

Four commits. Three code/content files changed. One design doc, one plan doc.

---

## Rollback if needed

Each file change is a separate commit. If the copy turns out wrong:

```bash
git revert <trolley-commit-hash>
git revert <carytown-commit-hash>
git push origin main
```

CSS stays (harmless). No data-loss risk.
