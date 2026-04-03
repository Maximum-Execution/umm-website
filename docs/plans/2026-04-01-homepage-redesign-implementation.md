# Homepage Competitive Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the UMM homepage to compete visually with Pentagram, Colossal Media, and top creative agencies — full-bleed imagery, video hero, asymmetric project grid, credibility strip, and staggered animations.

**Architecture:** Astro 6 static site. All new components are `.astro` files with zero JS framework dependencies. Animations use CSS transitions triggered by an Intersection Observer already in `BaseLayout.astro`. Video uses native `<video>` element. No new npm dependencies.

**Tech Stack:** Astro 6, Tailwind CSS v4 (CSS-first config via `@theme`), DaisyUI 5, self-hosted fonts (Canela Blackletter, Canela, Lyon Text, Gotham, Berkeley Mono). CRITICAL: `text-[var(...)]` does NOT work for font-size in Tailwind v4 — use inline `style` attributes for all fluid type sizes.

**Design doc:** `docs/plans/2026-04-01-homepage-competitive-redesign.md`

**Branch:** `feat/full-site-skeleton` (already active)

**Project root:** `C:/Users/thesu/Dropbox/ACTIVE PROJECTS/UNTITLED MIXED MEDIA/MARKETING/Website/umm-website`

---

## Task 1: Upgrade the Animation System in global.css

**Files:**
- Modify: `src/styles/global.css` (append after existing `[data-animate]` block, line ~317)
- Modify: `src/layouts/BaseLayout.astro` (update Intersection Observer script, line ~62)

**Step 1: Add new animation variants and stagger delays to global.css**

Append after the existing `@media (prefers-reduced-motion: reduce)` block (after line 317):

```css
/* ─── Staggered Animation Delays ──────────────────────── */

[data-animate-delay="1"] { transition-delay: 100ms; }
[data-animate-delay="2"] { transition-delay: 200ms; }
[data-animate-delay="3"] { transition-delay: 300ms; }
[data-animate-delay="4"] { transition-delay: 400ms; }
[data-animate-delay="5"] { transition-delay: 500ms; }

/* ─── Animation Variants ──────────────────────────────── */

/* Scale-in (for cards, grid items) */
[data-animate="scale"] {
  opacity: 0;
  transform: scale(0.97);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
[data-animate="scale"].is-visible {
  opacity: 1;
  transform: scale(1);
}

/* Fade only (no movement) */
[data-animate="fade"] {
  opacity: 0;
  transition: opacity 0.5s ease-out;
}
[data-animate="fade"].is-visible {
  opacity: 1;
}

/* Clip-path wipe reveal (for images) */
[data-animate="reveal"] {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
[data-animate="reveal"].is-visible {
  clip-path: inset(0);
}

/* ─── Scroll Indicator Pulse ──────────────────────────── */

@keyframes scroll-pulse {
  0%, 100% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0.4; transform: scaleY(0.6); }
}
```

**Step 2: Update the `prefers-reduced-motion` block to cover new variants**

Find the existing `@media (prefers-reduced-motion: reduce)` block and replace it with:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  [data-animate],
  [data-animate="scale"],
  [data-animate="fade"],
  [data-animate="reveal"] {
    opacity: 1;
    transform: none;
    clip-path: none;
    transition: none;
  }
  [data-animate-delay="1"],
  [data-animate-delay="2"],
  [data-animate-delay="3"],
  [data-animate-delay="4"],
  [data-animate-delay="5"] {
    transition-delay: 0ms;
  }
}
```

**Step 3: Update the Intersection Observer in BaseLayout.astro to handle all data-animate variants**

Replace the `<script>` block in `src/layouts/BaseLayout.astro` (lines 61-80) with:

```html
<script>
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-animate], [data-animate="scale"], [data-animate="fade"], [data-animate="reveal"]').forEach((el) => {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('[data-animate], [data-animate="scale"], [data-animate="fade"], [data-animate="reveal"]').forEach((el) => {
      el.classList.add('is-visible');
    });
  }
</script>
```

**Step 4: Build to verify no regressions**

Run: `npm run build`
Expected: Clean build, zero errors. Existing `[data-animate]` elements still work.

**Step 5: Commit**

```bash
git add src/styles/global.css src/layouts/BaseLayout.astro
git commit -m "feat: expand animation system with scale, fade, reveal variants and stagger delays"
```

---

## Task 2: Rewrite HeroSection with Video Background

**Files:**
- Modify: `src/components/sections/HeroSection.astro` (full rewrite)

**Step 1: Rewrite HeroSection.astro**

Replace the entire file with:

```astro
---
interface Props {
  headline?: string;
  subline?: string;
  videoSrc?: string;
  posterSrc?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const {
  headline = 'Landmarks, not lookalikes.',
  subline = 'Hand-painted murals and signs in Richmond, Virginia.',
  videoSrc = '/video/hero-reel.mp4',
  posterSrc = '/images/hero-poster.jpg',
  ctaLabel = 'See the Work',
  ctaHref = '/work',
} = Astro.props;
---

<section class="relative min-h-screen flex items-end overflow-hidden">
  <!-- Video Background -->
  <video
    class="absolute inset-0 w-full h-full object-cover"
    autoplay
    muted
    loop
    playsinline
    poster={posterSrc}
    preload="metadata"
  >
    <source src={videoSrc} type="video/mp4" />
  </video>

  <!-- Gradient Overlay -->
  <div class="absolute inset-0 bg-gradient-to-t from-bone-black via-bone-black/50 to-bone-black/20" aria-hidden="true"></div>

  <!-- Content -->
  <div class="relative z-10 w-full px-6 lg:px-12 pb-24 lg:pb-32">
    <div class="max-w-5xl">
      <h1
        class="font-blackletter text-titanium-white mb-4"
        style="font-size: var(--text-fluid-5xl); line-height: var(--leading-solid); letter-spacing: var(--tracking-tighter);"
        data-animate
      >
        {headline}
      </h1>
      {subline && (
        <p
          class="font-body text-soft-gray mb-10 max-w-2xl"
          style="font-size: var(--text-fluid-lg);"
          data-animate
          data-animate-delay="1"
        >
          {subline}
        </p>
      )}
      <a
        href={ctaHref}
        class="font-sans inline-block bg-titanium-white text-bone-black px-8 py-3.5 text-sm font-medium tracking-[0.15em] uppercase hover:bg-light-ash transition-colors duration-200"
        data-animate
        data-animate-delay="2"
      >
        {ctaLabel}
      </a>
    </div>
  </div>

  <!-- Scroll Indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
    <div
      class="w-px h-12 bg-titanium-white/60 origin-top"
      style="animation: scroll-pulse 2s ease-in-out infinite;"
    ></div>
  </div>
</section>

<style>
  @media (prefers-reduced-motion: reduce) {
    video { display: none; }
    section { background-image: var(--hero-poster); background-size: cover; background-position: center; }
    [style*="scroll-pulse"] { animation: none !important; opacity: 0.6; }
  }
</style>
```

**Step 2: Create placeholder video and poster directories**

Run:
```bash
mkdir -p public/video public/images
```

Then create a placeholder note so Spencer knows where to drop files:

Create `public/video/README.md`:
```
Drop hero-reel.mp4 here. Recommended: 1920x1080, H.264, <15MB, 10-30 seconds.
```

Create `public/images/README.md`:
```
Drop hero-poster.jpg here. This is the fallback image shown before video loads.
Recommended: 1920x1080, JPEG, <500KB.
```

**Step 3: Build to verify**

Run: `npm run build`
Expected: Clean build. Hero renders with poster fallback (video file doesn't exist yet, that's fine).

**Step 4: Commit**

```bash
git add src/components/sections/HeroSection.astro public/video/README.md public/images/README.md
git commit -m "feat: rewrite hero with full-screen video background, gradient overlay, scroll indicator"
```

---

## Task 3: Build the FeaturedGrid Component

**Files:**
- Create: `src/components/sections/FeaturedGrid.astro`

**Step 1: Create the component**

```astro
---
import { getCollection } from 'astro:content';

const projects = (await getCollection('projects'))
  .filter((p) => p.data.featured)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 5);
---

<section class="py-4">
  <!-- Section Label -->
  <div class="px-6 lg:px-12 flex items-baseline justify-between mb-6">
    <p
      class="font-mono text-smoke-gray uppercase"
      style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);"
    >
      Selected Work
    </p>
    <a
      href="/work"
      class="font-mono text-smoke-gray uppercase hover:text-titanium-white transition-colors"
      style="font-size: var(--text-fluid-xs);"
    >
      View all &rarr;
    </a>
  </div>

  <!-- Asymmetric Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-1">
    {projects.map((project, i) => {
      /* Asymmetric span pattern: large-small-small-large-medium */
      const spans = [
        'lg:col-span-7 lg:row-span-2',   /* large landscape */
        'lg:col-span-5',                   /* medium right */
        'lg:col-span-5',                   /* medium right */
        'lg:col-span-5 lg:row-span-2',   /* tall left */
        'lg:col-span-7',                   /* wide bottom-right */
      ];
      const aspects = [
        'aspect-[16/10]',  /* wide */
        'aspect-[4/3]',    /* standard */
        'aspect-[4/3]',    /* standard */
        'aspect-[3/4]',    /* tall */
        'aspect-[16/9]',   /* cinematic */
      ];
      const span = spans[i % spans.length];
      const aspect = aspects[i % aspects.length];

      return (
        <a
          href={`/work/${project.id}`}
          class={`group relative overflow-hidden block ${span}`}
          data-animate="scale"
          data-animate-delay={String(Math.min(i + 1, 5))}
        >
          <div class={`w-full h-full ${aspect}`}>
            <img
              src={project.data.cover}
              alt={project.data.title}
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-bone-black/0 group-hover:bg-bone-black/60 transition-colors duration-300 flex flex-col justify-end p-6 lg:p-8">
            <div class="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <h3
                class="font-heading text-titanium-white mb-1"
                style="font-size: var(--text-fluid-xl);"
              >
                {project.data.title}
              </h3>
              {project.data.location && (
                <p
                  class="font-mono text-soft-gray uppercase"
                  style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);"
                >
                  {project.data.location}
                </p>
              )}
            </div>
          </div>
          <!-- Mobile: Always-visible caption -->
          <div class="lg:hidden p-4">
            <h3
              class="font-heading text-titanium-white mb-1"
              style="font-size: var(--text-fluid-lg);"
            >
              {project.data.title}
            </h3>
            {project.data.location && (
              <p
                class="font-mono text-smoke-gray uppercase"
                style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);"
              >
                {project.data.location}
              </p>
            )}
          </div>
        </a>
      );
    })}
  </div>
</section>
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Component compiles. It won't appear on homepage yet (that's Task 9).

**Step 3: Commit**

```bash
git add src/components/sections/FeaturedGrid.astro
git commit -m "feat: add asymmetric full-bleed FeaturedGrid component"
```

---

## Task 4: Build the CredibilityStrip Component

**Files:**
- Create: `src/components/sections/CredibilityStrip.astro`

**Step 1: Create the component**

```astro
---
interface Stat {
  value: string;
  label: string;
}

interface Props {
  stats?: Stat[];
}

const { stats = [
  { value: '20+', label: 'Years Painting' },
  { value: '50+', label: 'Projects Completed' },
  { value: '10,000+', label: 'Square Feet Painted' },
  { value: 'Richmond', label: 'Virginia' },
] } = Astro.props;
---

<section class="bg-midnight-graphite border-y border-slate-gray">
  <div class="max-w-6xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
      {stats.map((stat, i) => (
        <div
          class:list={[
            'text-center',
            i > 0 && 'lg:border-l lg:border-slate-gray',
          ]}
          data-animate="fade"
          data-animate-delay={String(Math.min(i + 1, 4))}
        >
          <p
            class="font-heading text-titanium-white mb-2"
            style="font-size: var(--text-fluid-4xl); line-height: var(--leading-solid); letter-spacing: var(--tracking-tight);"
            data-count-target={stat.value}
          >
            {stat.value}
          </p>
          <p
            class="font-mono text-smoke-gray uppercase"
            style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);"
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Clean build.

**Step 3: Commit**

```bash
git add src/components/sections/CredibilityStrip.astro
git commit -m "feat: add CredibilityStrip component with stat grid"
```

---

## Task 5: Upgrade ProcessSection with Image Slots

**Files:**
- Modify: `src/components/sections/ProcessSection.astro` (full rewrite)

**Step 1: Rewrite ProcessSection.astro**

```astro
---
const steps = [
  {
    number: '01',
    title: 'We visit your site',
    body: 'We come to your location and collect the raw data your project will be built from: photography from every angle and lighting condition, spectrometer color readings of your physical materials, historical documentation, and a full visual record of what your space already contains.',
    image: '/images/process-visit.jpg',
    imageAlt: 'Spencer photographing a wall during a site visit',
  },
  {
    number: '02',
    title: 'You see the design before we start',
    body: 'We develop the design from your data and deliver a photorealistic render showing the finished work on your specific wall. You see exactly what you are getting. You approve it or we revise it.',
    image: '/images/process-render.jpg',
    imageAlt: 'Photorealistic Blender render of a mural on a building wall',
  },
  {
    number: '03',
    title: 'We paint it and prove it',
    body: 'We execute the work and deliver your Certificate of Provenance: a document tracing every color, shape, and texture to its origin in your data. The work is installed, protected, and documented.',
    image: '/images/process-paint.jpg',
    imageAlt: 'Spencer painting a large-scale mural on an exterior wall',
  },
];
---

<section id="process" class="bg-midnight-graphite py-24 lg:py-32 px-6 lg:px-12">
  <div class="max-w-7xl mx-auto">
    <p
      class="font-mono text-smoke-gray uppercase mb-16 lg:mb-24"
      style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);"
      data-animate="fade"
    >
      Process
    </p>

    <div class="space-y-24 lg:space-y-32">
      {steps.map((step, i) => {
        const isReversed = i % 2 === 1;
        return (
          <div
            class={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? 'lg:[direction:rtl]' : ''}`}
            data-animate
            data-animate-delay={String(i + 1)}
          >
            <!-- Image -->
            <div class={`overflow-hidden ${isReversed ? 'lg:[direction:ltr]' : ''}`}>
              <div class="aspect-[4/3] bg-midnight-graphite border border-slate-gray overflow-hidden">
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  class="w-full h-full object-cover"
                  loading="lazy"
                  onerror="this.style.display='none'"
                />
                <!-- Placeholder visible when image fails to load -->
                <div class="w-full h-full flex items-center justify-center">
                  <p class="font-mono text-smoke-gray uppercase" style="font-size: var(--text-fluid-xs);">
                    {step.imageAlt}
                  </p>
                </div>
              </div>
            </div>

            <!-- Text -->
            <div class={isReversed ? 'lg:[direction:ltr]' : ''}>
              <span
                class="font-heading text-slate-gray block mb-4"
                style="font-size: var(--text-fluid-5xl); line-height: var(--leading-solid);"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3
                class="font-heading text-titanium-white mb-4"
                style="font-size: var(--text-fluid-xl);"
              >
                {step.title}
              </h3>
              <p
                class="font-body text-shadow-gray"
                style="font-size: var(--text-fluid-base); line-height: var(--leading-relaxed);"
              >
                {step.body}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Clean build. Process section now has image placeholders and alternating layout.

**Step 3: Commit**

```bash
git add src/components/sections/ProcessSection.astro
git commit -m "feat: upgrade ProcessSection with image slots and alternating layout"
```

---

## Task 6: Build the TestimonialSection Component

**Files:**
- Create: `src/components/sections/TestimonialSection.astro`

**Step 1: Create the component**

```astro
---
interface Props {
  quote?: string;
  attribution?: string;
  company?: string;
  backgroundImage?: string;
}

const {
  quote = 'Placeholder for client testimonial. Replace with a real quote from a completed project — ideally one that speaks to the process, professionalism, and result.',
  attribution = 'Client Name',
  company = 'Business Name',
  backgroundImage,
} = Astro.props;
---

<section
  class="relative py-32 lg:py-40 px-6 lg:px-12 overflow-hidden"
>
  {/* Optional background image */}
  {backgroundImage && (
    <div class="absolute inset-0" aria-hidden="true">
      <img
        src={backgroundImage}
        alt=""
        class="w-full h-full object-cover"
        loading="lazy"
        style="image-rendering: auto;"
      />
      <div class="absolute inset-0 bg-bone-black/80"></div>
    </div>
  )}

  <div class="relative z-10 max-w-4xl mx-auto text-center" data-animate="fade">
    {/* Decorative quotation mark */}
    <span
      class="font-blackletter text-slate-gray block mb-8"
      style="font-size: clamp(4rem, 8vw, 8rem); line-height: 0.8;"
      aria-hidden="true"
    >
      &ldquo;
    </span>

    <blockquote>
      <p
        class="font-heading text-titanium-white italic mb-10"
        style="font-size: var(--text-fluid-2xl); line-height: 1.3;"
      >
        &ldquo;{quote}&rdquo;
      </p>
      <footer>
        <cite class="font-sans text-smoke-gray uppercase not-italic" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">
          {attribution}{company && `, ${company}`}
        </cite>
      </footer>
    </blockquote>
  </div>
</section>
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Clean build.

**Step 3: Commit**

```bash
git add src/components/sections/TestimonialSection.astro
git commit -m "feat: add TestimonialSection with decorative quote mark and optional background image"
```

---

## Task 7: Build the ServiceShowcase Component

**Files:**
- Create: `src/components/sections/ServiceShowcase.astro`

**Step 1: Create the component**

```astro
---
const services = [
  {
    title: 'Murals',
    description: 'Hand-painted murals for businesses, property owners, and public spaces. From site visit to sealed wall.',
    href: '/murals',
    image: '/images/service-murals.jpg',
    imageAlt: 'Hand-painted exterior mural on a commercial building',
  },
  {
    title: 'Hand-Painted Signs',
    description: 'Gold leaf, window lettering, storefront signs, and menu boards. Traditional sign painting that outlasts vinyl by decades.',
    href: '/hand-painted-signs',
    image: '/images/service-signs.jpg',
    imageAlt: 'Gold leaf lettering on a storefront window',
  },
];
---

<section class="py-4">
  <div class="px-6 lg:px-12 mb-6">
    <p
      class="font-mono text-smoke-gray uppercase"
      style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);"
    >
      Services
    </p>
  </div>

  <div class="grid md:grid-cols-2 gap-1">
    {services.map((service, i) => (
      <a
        href={service.href}
        class="group relative block overflow-hidden min-h-[60vh] md:min-h-[70vh]"
        data-animate="scale"
        data-animate-delay={String(i + 1)}
      >
        {/* Background Image */}
        <img
          src={service.image}
          alt={service.imageAlt}
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
          onerror="this.style.display='none'"
        />

        {/* Fallback solid background when image missing */}
        <div class="absolute inset-0 bg-midnight-graphite" aria-hidden="true"></div>

        {/* Gradient overlay */}
        <div class="absolute inset-0 bg-gradient-to-t from-bone-black/90 via-bone-black/40 to-transparent" aria-hidden="true"></div>

        {/* Content */}
        <div class="relative z-10 h-full flex flex-col justify-end p-8 lg:p-12">
          <h3
            class="font-heading text-titanium-white mb-3"
            style="font-size: var(--text-fluid-3xl); line-height: var(--leading-tight);"
          >
            {service.title}
          </h3>
          <p
            class="font-body text-soft-gray mb-6 max-w-md"
            style="font-size: var(--text-fluid-base); line-height: var(--leading-relaxed);"
          >
            {service.description}
          </p>
          <span
            class="font-mono text-smoke-gray uppercase group-hover:text-titanium-white transition-colors"
            style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);"
          >
            Explore &rarr;
          </span>
        </div>
      </a>
    ))}
  </div>
</section>
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Clean build.

**Step 3: Commit**

```bash
git add src/components/sections/ServiceShowcase.astro
git commit -m "feat: add ServiceShowcase with full-bleed image cards and hover effects"
```

---

## Task 8: Upgrade JournalCard with Image Support and Hover Effects

**Files:**
- Modify: `src/components/JournalCard.astro`

**Step 1: Rewrite JournalCard.astro**

```astro
---
interface Props {
  title: string;
  description: string;
  href: string;
  date: Date;
  tags?: string[];
  cover?: string;
}

const { title, description, href, date, tags, cover } = Astro.props;

const formattedDate = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---

<a
  href={href}
  class="group block transition-transform duration-300 hover:-translate-y-1"
>
  {/* Cover Image */}
  <div class="aspect-[16/9] overflow-hidden bg-midnight-graphite border border-slate-gray mb-5">
    {cover ? (
      <img
        src={cover}
        alt=""
        class="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] group-hover:brightness-75"
        loading="lazy"
      />
    ) : (
      <div class="w-full h-full flex items-center justify-center">
        <span
          class="font-mono text-smoke-gray uppercase"
          style="font-size: var(--text-fluid-xs);"
        >
          Journal
        </span>
      </div>
    )}
  </div>

  {/* Meta */}
  <time
    datetime={date.toISOString().split('T')[0]}
    class="font-mono text-smoke-gray uppercase"
    style="font-size: var(--text-fluid-xs);"
  >
    {formattedDate}
  </time>

  {/* Title */}
  <h3
    class="font-heading text-titanium-white group-hover:text-soft-gray transition-colors duration-200 mt-2 mb-3"
    style="font-size: var(--text-fluid-xl);"
  >
    {title}
  </h3>

  {/* Description */}
  <p
    class="font-body text-shadow-gray mb-4"
    style="font-size: var(--text-fluid-base);"
  >
    {description}
  </p>

  {/* Tags */}
  {tags && tags.length > 0 && (
    <div class="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <span
          class="font-mono text-smoke-gray uppercase"
          style="font-size: var(--text-fluid-xs);"
        >
          {tag}
        </span>
      ))}
    </div>
  )}
</a>
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Clean build. Journal cards on existing pages still render (cover is optional).

**Step 3: Commit**

```bash
git add src/components/JournalCard.astro
git commit -m "feat: upgrade JournalCard with cover image, hover lift, and brightness transition"
```

---

## Task 9: Upgrade CTABlock with Full-Width Treatment and Trust Line

**Files:**
- Modify: `src/components/CTABlock.astro`

**Step 1: Rewrite CTABlock.astro**

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
  trustLine?: string;
}

const {
  headline = 'See what your wall could become.',
  description,
  primaryHref = '/price-estimator',
  primaryLabel = 'Get a Free Estimate',
  secondaryHref = '/contact',
  secondaryLabel = 'Contact Us',
  trustLine = 'Free estimates. No obligation. Richmond, VA and surrounding areas.',
} = Astro.props;
---

<section class="border-t border-slate-gray py-24 lg:py-32 px-6 lg:px-12">
  <div class="max-w-4xl mx-auto text-center" data-animate="fade">
    <h2
      class="font-heading text-titanium-white mb-6"
      style="font-size: var(--text-fluid-3xl); line-height: var(--leading-tight);"
    >
      {headline}
    </h2>
    {description && (
      <p
        class="font-body text-shadow-gray mb-10 max-w-2xl mx-auto"
        style="font-size: var(--text-fluid-lg);"
      >
        {description}
      </p>
    )}
    <div class="flex flex-wrap items-center justify-center gap-6 mb-8">
      <Button href={primaryHref} variant="primary">{primaryLabel}</Button>
      <Button href={secondaryHref} variant="ghost">{secondaryLabel}</Button>
    </div>
    {trustLine && (
      <p
        class="font-mono text-smoke-gray uppercase"
        style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);"
      >
        {trustLine}
      </p>
    )}
  </div>
</section>
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Clean build. CTABlock now centered with trust line.

**Step 3: Commit**

```bash
git add src/components/CTABlock.astro
git commit -m "feat: upgrade CTABlock with centered layout, trust line, and full-width treatment"
```

---

## Task 10: Upgrade Footer with Newsletter Signup

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Add newsletter column**

Read the current Footer.astro first. Then add a fourth column to the nav grid containing a newsletter signup form. Change the grid from `md:grid-cols-3` to `md:grid-cols-2 lg:grid-cols-4`. Add after the Company column:

```html
<!-- Newsletter -->
<div>
  <p class="font-mono text-smoke-gray uppercase tracking-[0.08em] mb-6" style="font-size: var(--text-fluid-xs);">Stay Connected</p>
  <p class="font-body text-shadow-gray mb-4" style="font-size: var(--text-fluid-sm);">
    Updates on new projects and journal posts.
  </p>
  <form class="flex gap-2" action="#" method="POST" data-newsletter-form>
    <input
      type="email"
      name="email"
      placeholder="your@email.com"
      required
      autocomplete="email"
      class="flex-1 bg-transparent border border-slate-gray px-4 py-2.5 font-mono text-titanium-white placeholder:text-smoke-gray focus:border-soft-gray focus:outline-none transition-colors"
      style="font-size: var(--text-fluid-xs);"
    />
    <button
      type="submit"
      class="bg-titanium-white text-bone-black font-sans px-4 py-2.5 text-sm font-medium tracking-[0.08em] uppercase hover:bg-light-ash transition-colors"
    >
      Join
    </button>
  </form>
</div>
```

Also add Facebook SVG next to the Instagram link in the social section:

```html
<a
  href="https://www.facebook.com/untitledmixedmedia"
  target="_blank"
  rel="noopener noreferrer"
  class="text-shadow-gray hover:text-titanium-white transition-colors"
  aria-label="Untitled Mixed Media on Facebook"
>
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
</a>
```

**Step 2: Build to verify**

Run: `npm run build`
Expected: Clean build. Footer now 4 columns on desktop with newsletter form.

**Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add newsletter signup and Facebook link to footer"
```

---

## Task 11: Rewire the Homepage (index.astro)

This is the critical task that brings everything together.

**Files:**
- Modify: `src/pages/index.astro` (full rewrite)

**Step 1: Rewrite index.astro with new section order**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import HeroSection from '../components/sections/HeroSection.astro';
import FeaturedGrid from '../components/sections/FeaturedGrid.astro';
import CredibilityStrip from '../components/sections/CredibilityStrip.astro';
import ProcessSection from '../components/sections/ProcessSection.astro';
import TestimonialSection from '../components/sections/TestimonialSection.astro';
import ServiceShowcase from '../components/sections/ServiceShowcase.astro';
import JournalCard from '../components/JournalCard.astro';
import CTABlock from '../components/CTABlock.astro';
import { getCollection } from 'astro:content';

const journalPosts = (await getCollection('journal'))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 3);
---

<BaseLayout>
  <Nav />
  <main>
    {/* 1. Hero — full-screen video with headline */}
    <HeroSection />

    {/* 2. Featured Projects — asymmetric full-bleed grid */}
    <FeaturedGrid />

    {/* 3. Credibility Strip — hard numbers */}
    <CredibilityStrip />

    {/* 4. Process — 3 steps with imagery */}
    <ProcessSection />

    {/* 5. Testimonial — full-width pull quote */}
    <TestimonialSection />

    {/* 6. Services — image-backed showcase cards */}
    <ServiceShowcase />

    {/* 7. Journal Preview — 3 recent posts with images */}
    {journalPosts.length > 0 && (
      <section class="py-24 px-6 lg:px-12">
        <div class="max-w-7xl mx-auto">
          <div class="flex items-baseline justify-between mb-12">
            <p
              class="font-mono text-smoke-gray uppercase"
              style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);"
            >
              Journal
            </p>
            <a
              href="/journal"
              class="font-mono text-smoke-gray uppercase hover:text-titanium-white transition-colors"
              style="font-size: var(--text-fluid-xs);"
            >
              View all &rarr;
            </a>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            {journalPosts.map((post, i) => (
              <div data-animate="scale" data-animate-delay={String(i + 1)}>
                <JournalCard
                  title={post.data.title}
                  description={post.data.description}
                  href={`/journal/${post.id}`}
                  date={post.data.date}
                  tags={post.data.tags}
                  cover={post.data.cover}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )}

    {/* 8. CTA Block — final conversion section */}
    <CTABlock
      headline="See what your wall could become."
      description="Get a free estimate for your mural or sign project. We'll visit your site, show you the design before we start, and paint it right."
    />
  </main>
  <Footer />
</BaseLayout>
```

**Step 2: Build to verify the full homepage**

Run: `npm run build`
Expected: Clean build with all 9 homepage sections rendering in the new order.

**Step 3: Run dev server to visually verify**

Run: `npm run dev`
Open: `http://localhost:4321`

Verify:
- Hero fills viewport with gradient (video won't play without the mp4 file, but poster/gradient visible)
- FeaturedGrid renders project cards (from content collection)
- CredibilityStrip shows 4 stats
- Process shows 3 alternating steps with image placeholders
- Testimonial shows pull quote with decorative quotation mark
- ServiceShowcase shows Murals + Signs as tall image cards
- Journal shows 3 cards with image placeholders
- CTA shows centered with trust line
- Footer has newsletter form

**Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: rewire homepage with competitive redesign — video hero, project grid, credibility strip, service showcase"
```

---

## Task 12: Final Build Verification and Push

**Step 1: Full production build**

Run: `npm run build`
Expected: Clean build, zero errors, all pages compile.

**Step 2: Verify no broken references**

Run: `grep -r "ServiceCard" src/pages/index.astro` — should return nothing (ServiceCards removed from homepage).
Run: `grep -r "PortfolioGrid" src/pages/index.astro` — should return nothing.

**Step 3: Push the branch**

```bash
git push origin feat/full-site-skeleton
```

---

## Post-Implementation: Spencer's Action Items

After the code is built, Spencer needs to:

1. **Drop video file** at `public/video/hero-reel.mp4` (H.264, 1920x1080, <15MB, 10-30s loop)
2. **Drop hero poster** at `public/images/hero-poster.jpg` (1920x1080 JPEG fallback)
3. **Drop process images** at `public/images/process-visit.jpg`, `process-render.jpg`, `process-paint.jpg`
4. **Drop service images** at `public/images/service-murals.jpg`, `service-signs.jpg`
5. **Confirm credibility numbers** — replace placeholder stats with real numbers
6. **Replace testimonial placeholder** with a real client quote
7. **Add journal cover images** — update frontmatter `cover:` field in journal posts
8. **Choose final headline** — replace "Landmarks, not lookalikes." if a better one exists in the Brand Book

## Summary

| Task | Component | Type |
|------|-----------|------|
| 1 | Animation system (global.css + BaseLayout) | Modify |
| 2 | HeroSection.astro | Rewrite |
| 3 | FeaturedGrid.astro | New |
| 4 | CredibilityStrip.astro | New |
| 5 | ProcessSection.astro | Rewrite |
| 6 | TestimonialSection.astro | New |
| 7 | ServiceShowcase.astro | New |
| 8 | JournalCard.astro | Modify |
| 9 | CTABlock.astro | Modify |
| 10 | Footer.astro | Modify |
| 11 | index.astro | Rewrite |
| 12 | Build verification + push | DevOps |
