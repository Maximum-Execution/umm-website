# UMM Website — Complete Source Export
**Branch:** feat/full-site-skeleton
**Date:** 2026-04-03
**Purpose:** Full source code for AI review. Every file is complete and untruncated.

## FILE: src/pages/work/[...slug].astro

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '@/layouts/BaseLayout.astro';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths = (async () => {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: { project },
  }));
}) satisfies GetStaticPaths;

interface Props {
  project: any;
}

const { project } = Astro.props;
const { Content } = await project.render();

// Get all projects for prev/next navigation
const allProjects = await getCollection('projects');
const projectIndex = allProjects.findIndex((p) => p.slug === project.slug);
const prevProject = allProjects[projectIndex === 0 ? allProjects.length - 1 : projectIndex - 1];
const nextProject = allProjects[projectIndex === allProjects.length - 1 ? 0 : projectIndex + 1];
---

<BaseLayout title={project.data.title} description={project.data.description}>
  <article class="min-h-screen">
    <!-- Breadcrumb Navigation -->
    <nav class="bg-zinc-50 dark:bg-slate-950 border-b border-zinc-200 dark:border-slate-800 sticky top-16 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol class="flex items-center space-x-2 text-sm">
          <li><a href="/work" class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">Work</a></li>
          <li class="text-slate-400">/</li>
          <li class="text-slate-900 dark:text-slate-100 font-medium">{project.data.title}</li>
        </ol>
      </div>
    </nav>

    <!-- Hero Image -->
    {project.data.cover && (
      <img 
        src={project.data.cover} 
        alt={project.data.title}
        class="w-full h-96 object-cover"
      />
    )}

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Content -->
        <div class="lg:col-span-2">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 dark:text-white">{project.data.title}</h1>
          
          <div class="prose dark:prose-invert max-w-none">
            <Content />
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="lg:col-span-1">
          <div class="bg-zinc-50 dark:bg-slate-900 rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4 dark:text-white">Project Details</h3>
            
            {project.data.client && (
              <div class="mb-4">
                <p class="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wide">Client</p>
                <p class="font-medium dark:text-white">{project.data.client}</p>
              </div>
            )}
            
            {project.data.location && (
              <div class="mb-4">
                <p class="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wide">Location</p>
                <p class="font-medium dark:text-white">{project.data.location}</p>
              </div>
            )}
            
            {project.data.date && (
              <div class="mb-4">
                <p class="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wide">Year</p>
                <p class="font-medium dark:text-white">{new Date(project.data.date).getFullYear()}</p>
              </div>
            )}

            {project.data.tags && (
              <div>
                <p class="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">Tags</p>
                <div class="flex flex-wrap gap-2">
                  {project.data.tags.map((tag: string) => (
                    <span class="inline-block bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      <!-- Navigation -->
      <nav class="mt-20 pt-12 border-t border-zinc-200 dark:border-slate-800">
        <div class="grid grid-cols-2 gap-8">
          {prevProject && (
            <a href={`/work/${prevProject.slug}`} class="group">
              <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">← Previous</p>
              <p class="text-lg font-semibold group-hover:text-slate-900 dark:group-hover:text-white transition">{prevProject.data.title}</p>
            </a>
          )}
          
          {nextProject && (
            <a href={`/work/${nextProject.slug}`} class="group text-right">
              <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">Next →</p>
              <p class="text-lg font-semibold group-hover:text-slate-900 dark:group-hover:text-white transition">{nextProject.data.title}</p>
            </a>
          )}
        </div>
      </nav>
    </div>
  </article>
</BaseLayout>
=== END FILE ===
```

---

## FILE: src/pages/journal/index.astro

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '@/layouts/BaseLayout.astro';
import JournalCard from '@/components/JournalCard.astro';

const posts = (await getCollection('journal')).sort(
  (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
---

<BaseLayout title="Journal" description="Stories, insights, and guides about hand-painted murals and signs.">
  <div class="min-h-screen bg-white dark:bg-slate-950">
    <!-- Header -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 dark:text-white">Journal</h1>
      <p class="text-xl text-slate-600 dark:text-slate-400">
        Stories, insights, and guides about the craft of hand-painted murals and signs.
      </p>
    </div>

    <!-- Posts Grid -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div class="grid gap-8">
        {posts.map((post, index) => (
          <div data-animate="fade-in" style={`animation-delay: ${index * 100}ms`}>
            <JournalCard post={post} />
          </div>
        ))}
      </div>
    </div>
  </div>
</BaseLayout>
=== END FILE ===
```

---

## FILE: src/pages/journal/[...slug].astro

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '@/layouts/BaseLayout.astro';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths = (async () => {
  const posts = await getCollection('journal');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}) satisfies GetStaticPaths;

interface Props {
  post: any;
}

const { post } = Astro.props;
const { Content } = await post.render();

// Get related posts (same tags)
const allPosts = await getCollection('journal');
const relatedPosts = allPosts
  .filter((p) => p.slug !== post.slug && p.data.tags?.some((tag: string) => post.data.tags?.includes(tag)))
  .slice(0, 3);
---

<BaseLayout title={post.data.title} description={post.data.description}>
  <article class="min-h-screen bg-white dark:bg-slate-950">
    <!-- Breadcrumb -->
    <nav class="bg-zinc-50 dark:bg-slate-900 border-b border-zinc-200 dark:border-slate-800 sticky top-16 z-40">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol class="flex items-center space-x-2 text-sm">
          <li><a href="/journal" class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">Journal</a></li>
          <li class="text-slate-400">/</li>
          <li class="text-slate-900 dark:text-slate-100 font-medium">{post.data.title}</li>
        </ol>
      </div>
    </nav>

    <!-- Cover Image -->
    {post.data.cover && (
      <img 
        src={post.data.cover} 
        alt={post.data.title}
        class="w-full h-96 object-cover"
      />
    )}

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header class="mb-12">
        <div class="flex items-center space-x-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
          <time datetime={post.data.date.toISOString()}>
            {new Date(post.data.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
          {post.data.author && <span>by {post.data.author}</span>}
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold mb-4 dark:text-white">{post.data.title}</h1>
        
        {post.data.tags && (
          <div class="flex flex-wrap gap-2">
            {post.data.tags.map((tag: string) => (
              <span class="inline-block bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div class="prose dark:prose-invert max-w-none mb-16">
        <Content />
      </div>

      <!-- Related Posts -->
      {relatedPosts.length > 0 && (
        <section class="mt-20 pt-12 border-t border-zinc-200 dark:border-slate-800">
          <h2 class="text-2xl font-bold mb-8 dark:text-white">Related Posts</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <a 
                href={`/journal/${relatedPost.slug}`}
                class="group"
              >
                <article class="h-full">
                  <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {new Date(relatedPost.data.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                  <h3 class="text-lg font-semibold group-hover:text-slate-900 dark:group-hover:text-white transition mb-2">
                    {relatedPost.data.title}
                  </h3>
                  <p class="text-slate-600 dark:text-slate-400 text-sm">
                    {relatedPost.data.description}
                  </p>
                </article>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  </article>
</BaseLayout>
=== END FILE ===
```

---

## FILE: src/pages/contact.astro

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import CTABlock from '@/components/CTABlock.astro';
---

<BaseLayout title="Contact" description="Get in touch to discuss your mural or sign project.">
  <div class="min-h-screen bg-white dark:bg-slate-950">
    <!-- Hero -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 dark:text-white">Get in Touch</h1>
      <p class="text-xl text-slate-600 dark:text-slate-400">
        Ready to transform your space? Contact us to discuss your project.
      </p>
    </div>

    <!-- Two Column Layout -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <form class="space-y-6" action="/api/contact" method="POST">
          <div>
            <label for="name" class="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Phone (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="project-type" class="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Project Type *
            </label>
            <select
              id="project-type"
              name="project-type"
              required
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a project type</option>
              <option value="mural">Mural</option>
              <option value="sign">Hand-Painted Sign</option>
              <option value="restoration">Sign Restoration</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              required
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold py-3 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition"
          >
            Send Message
          </button>
        </form>

        <!-- Contact Info -->
        <div>
          <h2 class="text-2xl font-bold mb-8 dark:text-white">Contact Information</h2>
          
          <div class="space-y-8">
            <div>
              <h3 class="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-2">
                Email
              </h3>
              <a href="mailto:hello@ummstudio.com" class="text-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                hello@ummstudio.com
              </a>
            </div>

            <div>
              <h3 class="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-2">
                Phone
              </h3>
              <a href="tel:+18045551234" class="text-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                (804) 555-1234
              </a>
            </div>

            <div>
              <h3 class="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-2">
                Location
              </h3>
              <p class="text-lg text-slate-600 dark:text-slate-400">
                Richmond, Virginia
              </p>
            </div>

            <div>
              <h3 class="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-2">
                Hours
              </h3>
              <p class="text-slate-600 dark:text-slate-400">
                Monday - Friday: 9am - 5pm EST<br/>
                Saturday & Sunday: By Appointment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Block -->
    <CTABlock
      headline="Ready to start your project?"
      description="Let's discuss your vision and create something extraordinary."
      primaryButtonLabel="Schedule a Consultation"
      primaryButtonHref="/contact"
      secondaryButtonLabel="View Our Work"
      secondaryButtonHref="/work"
    />
  </div>
</BaseLayout>
=== END FILE ===
```

---

## FILE: src/pages/price-estimator/index.astro

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout title="Price Estimator" description="Get a quick estimate for your mural or sign project.">
  <div class="min-h-screen bg-white dark:bg-slate-950">
    <!-- Header -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 dark:text-white">Price Estimator</h1>
      <p class="text-xl text-slate-600 dark:text-slate-400">
        Get a quick estimate for your project. Remember, this is an approximate guide — actual pricing depends on specific site conditions and design complexity.
      </p>
    </div>

    <!-- Estimator Form -->
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div class="bg-zinc-50 dark:bg-slate-900 rounded-lg p-8">
        <form id="estimator-form" class="space-y-8">
          <!-- Project Type -->
          <div>
            <label class="block text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-4">
              Project Type
            </label>
            <div class="space-y-3">
              <label class="flex items-center">
                <input
                  type="radio"
                  name="project-type"
                  value="mural"
                  checked
                  class="w-4 h-4"
                />
                <span class="ml-3 text-slate-700 dark:text-slate-300">Mural</span>
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  name="project-type"
                  value="sign"
                  class="w-4 h-4"
                />
                <span class="ml-3 text-slate-700 dark:text-slate-300">Hand-Painted Sign</span>
              </label>
            </div>
          </div>

          <!-- Wall Dimensions -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="width" class="block text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-2">
                Width (feet)
              </label>
              <input
                type="number"
                id="width"
                name="width"
                value="10"
                min="1"
                step="1"
                class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label for="height" class="block text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-2">
                Height (feet)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                value="10"
                min="1"
                step="1"
                class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <!-- Surface Type -->
          <div>
            <label class="block text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-4">
              Surface Type
            </label>
            <select
              name="surface-type"
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="brick">Brick</option>
              <option value="stucco">Stucco</option>
              <option value="concrete">Concrete</option>
              <option value="wood">Wood</option>
              <option value="drywall">Drywall</option>
            </select>
          </div>

          <!-- Location -->
          <div>
            <label class="block text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-4">
              Location
            </label>
            <div class="space-y-3">
              <label class="flex items-center">
                <input
                  type="radio"
                  name="location"
                  value="exterior"
                  checked
                  class="w-4 h-4"
                />
                <span class="ml-3 text-slate-700 dark:text-slate-300">Exterior</span>
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  name="location"
                  value="interior"
                  class="w-4 h-4"
                />
                <span class="ml-3 text-slate-700 dark:text-slate-300">Interior</span>
              </label>
            </div>
          </div>

          <!-- Style Complexity -->
          <div>
            <label class="block text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-4">
              Style Complexity
            </label>
            <div class="space-y-3">
              <label class="flex items-center">
                <input
                  type="radio"
                  name="complexity"
                  value="simple"
                  checked
                  class="w-4 h-4"
                />
                <span class="ml-3 text-slate-700 dark:text-slate-300">Simple (Solid colors, basic shapes)</span>
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  name="complexity"
                  value="moderate"
                  class="w-4 h-4"
                />
                <span class="ml-3 text-slate-700 dark:text-slate-300">Moderate (Mixed colors, some detail)</span>
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  name="complexity"
                  value="complex"
                  class="w-4 h-4"
                />
                <span class="ml-3 text-slate-700 dark:text-slate-300">Complex (Photorealistic, high detail)</span>
              </label>
            </div>
          </div>

          <!-- Estimate Output -->
          <div id="estimate-output" class="hidden bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-blue-500">
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">Estimated Project Cost</p>
            <p class="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              $<span id="estimate-min">5000</span> - $<span id="estimate-max">10000</span>
            </p>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              * This is an approximate estimate. Final pricing depends on site conditions, access, and specific design requirements.
            </p>
          </div>

          <button
            type="button"
            onclick="calculateEstimate()"
            class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold py-3 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition"
          >
            Calculate Estimate
          </button>
        </form>
      </div>

      <!-- Next Steps -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold mb-6 dark:text-white">Next Steps</h2>
        <div class="space-y-4">
          <p class="text-slate-600 dark:text-slate-400">
            Ready to move forward? Contact us to discuss your specific project in detail.
          </p>
          <a
            href="/contact"
            class="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold px-8 py-3 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition"
          >
            Get a Detailed Quote
          </a>
        </div>
      </div>
    </div>
  </div>
</BaseLayout>

<script>
  function calculateEstimate() {
    const width = parseInt((document.getElementById('width') as HTMLInputElement).value);
    const height = parseInt((document.getElementById('height') as HTMLInputElement).value);
    const surfaceType = (document.querySelector('input[name="surface-type"]') as HTMLSelectElement)?.value;
    const location = (document.querySelector('input[name="location"]:checked') as HTMLInputElement)?.value;
    const complexity = (document.querySelector('input[name="complexity"]:checked') as HTMLInputElement)?.value;

    const sqft = width * height;

    // Base rates per square foot
    let baseRate = 25;
    if (complexity === 'moderate') baseRate = 40;
    if (complexity === 'complex') baseRate = 65;

    // Surface multiplier
    let surfaceMultiplier = 1;
    if (surfaceType === 'stucco') surfaceMultiplier = 1.1;
    if (surfaceType === 'concrete') surfaceMultiplier = 1.15;

    // Location multiplier
    const locationMultiplier = location === 'exterior' ? 1.2 : 1;

    const min = Math.round(sqft * baseRate * surfaceMultiplier * locationMultiplier * 0.9);
    const max = Math.round(sqft * baseRate * surfaceMultiplier * locationMultiplier * 1.1);

    document.getElementById('estimate-min')!.textContent = min.toLocaleString();
    document.getElementById('estimate-max')!.textContent = max.toLocaleString();
    document.getElementById('estimate-output')!.classList.remove('hidden');
  }
</script>
=== END FILE ===
```

---

## FILE: src/content/projects/carytown-butterfly-mural.md

```markdown
---
title: "Carytown Butterfly Mural: Monarchs & Milkweed"
description: "A hand-painted Monarch Waystation at Northbank Partners featuring photogrammetry-captured wildflowers"
date: 2023-09-15
featured: true
client: "Northbank Partners"
location: "Carytown, Richmond VA"
cover: "/images/projects/carytown-butterfly.jpg"
tags: ["mural", "botany", "photogrammetry"]
---

## The Monarch Waystation: Where Meaning Lives in Place

The Northbank Partners building on Cary Street in Richmond's Carytown district needed a mural that would do more than fill a wall. It needed to tell the specific story of that corner—a story about habitat, migration, and transformation that's literally happening in Richmond every spring and fall.

We created a 1,200 square foot Monarch Waystation mural that serves as both art and functional conservation education. But here's what made this project distinct: every single plant in the composition was photographed from real milkweed growing in the Richmond area.

## The Provenance Method: From Site to Surface

The traditional approach to a botanical mural would be to research monarch habitat generally, find reference images online, and paint a "pretty butterfly and flower" composition. That's not how we work.

Instead, we spent weeks in June and July photographing actual milkweed plants in Richmond—Asclepias syriaca (common milkweed), Asclepias incarnata (swamp milkweed), and Asclepias verticillata (whorled milkweed)—documenting their specific growth patterns, leaf arrangements, seed pod developments, and the way they're actually used by monarchs in this region.

We also documented Monarchs themselves visiting milkweed plants, capturing the specific angles and behaviors you'd see in Richmond's ecosystem.

## Photography to Pattern: The Analysis Phase

Once we had our photographic library, we moved into pattern analysis. Using specialized botanical illustration software and manual drafting, we identified the structural relationships between the butterfly wing patterns and the milkweed leaf architecture.

This is where the "provenance" becomes visible: the pattern repetitions in monarch wing scales mirror the veining patterns in milkweed leaves. The way the butterflies perch on flower stems reflects actual biomechanical principles. Nothing is decorative—everything serves the underlying ecological story.

The software analysis revealed something we wouldn't have noticed casually: monarch wing scales arrange in patterns that almost exactly match the phyllotaxis (leaf arrangement pattern) of the milkweed plant. This isn't coincidence. Monarchs co-evolved with these plants over millions of years. The pattern-matching is biological.

## Hand-Painted Execution: 480 Hours of Precision

The final composition spreads across three walls of the Northbank building. At the center, a single monarch in mid-flight, wings fully extended, 8 feet across. Below and around it, the milkweed ecosystem that supports it:

- Seven distinct milkweed plants in various growth stages, from seedling to mature flowering
- Five additional monarchs in different life stages: egg on leaf, caterpillar, chrysalis, newly emerged adult
- The specific insects that share this ecosystem: aphids, parasitic wasps, monarch predators
- A timeline element showing the migration path and timing specific to Richmond

Hand-painting required 480 hours across 6 weeks. The milkweed stems were painted with brushwork that captures the fine hairs on the stems—detail that would be lost in a photo-based vinyl. The leaf veining was hand-rendered with a 0-size brush, following the actual vein patterns from our photographic references.

Each monarch wing was hand-striped to show the actual scale patterns visible at close examination. The butterflies vary in individual pattern—just as real monarchs do—making each one a character rather than a stamp.

## The Canvas Layer: Reproduction and Translation

A secondary element of this project involved creating canvas reproductions of the murals for the client's interior office space. These high-resolution canvases (48" x 72" each) capture not just the imagery but the specific paint texture created during hand-painting.

The canvas prints were photographed after completion and printed on fine art canvas using pigment-based inks with a matte finish. This creates an interesting effect: the painted mural and the canvas reproduce it are visually similar but tactilely opposite. One reads as sculpture (the raised acrylic paint on the building), the other as traditional fine art (the canvas).

## Documentation: The Certificate of Provenance

Every project we complete includes a Certificate of Provenance—a detailed document explaining:

- What specific source material (plants, insects, locations) was used
- When and where documentation occurred
- How the design transformed source material into composition
- Technical specifications: paint systems, surface preparation, weather sealing
- Maintenance recommendations
- The artist's statement on the work's intention

For the Carytown Butterfly Mural, the certificate includes:

- GPS coordinates of the milkweed plants photographed
- Botanical identification and growth stage documentation
- Dates of monarch activity observations (migration patterns are timed to within 2-3 weeks annually)
- The specific Richmond ecosystem context that makes this mural "of place" rather than generic

This certificate serves several purposes:

1. **Educational**: Future occupants understand the work's scientific grounding
2. **Preservation**: Maintenance decisions can be made with understanding of original intent
3. **Authenticity**: It proves the work's specific relationship to its location
4. **Conservation**: It documents the species and habitats the mural represents

## Why This Matters: The Copy Problem in Public Art

Public art in most cities tells a story written somewhere else. A mural in Richmond looks like it could be in Portland or Austin. The specific context—this exact corner, this specific ecosystem, this particular city's character—is irrelevant.

We reject that approach. The Carytown Butterfly Mural exists because milkweed grows in Richmond's gardens and yards. Monarchs migrate through Richmond on their way to Mexico. Richmond's urban ecosystem supports this specific butterfly. Those facts are not background—they're the whole point.

A visitor to Northbank Partners can see a detailed mural of monarchs and flowers. A local naturalist can recognize specific milkweed species painted from life. A school group can visit and learn where their local monarch habitat starts. The building owner has documentation proving the work's authentic connection to place.

That's the Provenance Method in action: meaning discovered from place, not imposed on it.

## Technical Specifications

**Size:** 1,200 sq ft across three walls  
**Medium:** Professional-grade exterior acrylics with clear UV-resistant topcoat  
**Duration:** 480 hours hand-painting over 6 weeks  
**Surface:** Properly primed and sealed brick  
**Lifespan:** 15-20 years with standard maintenance (power washing every 2-3 years)  
**Canvas Reproductions:** 48" x 72" fine art canvas prints (set of 3)  
**Certificate of Provenance:** Included with full documentation and maintenance guidelines

=== END FILE ===
```

---

## FILE: src/content/projects/church-hill-trolley-barn.md

```markdown
---
title: "Church Hill Trolley Barn: Archival Murals in the Historic Context"
description: "Hand-painted restoration of historic streetcar facility murals using period photographic archives"
date: 2022-08-20
featured: true
client: "Church Hill Community Heritage"
location: "Church Hill, Richmond VA"
cover: "/images/projects/trolley-barn.jpg"
tags: ["mural", "historic restoration", "archival"]
---

## The Last Streetcar Barn: Painting History Back Into Place

The Church Hill Trolley Barn is Richmond's last surviving electric streetcar repair facility, operated by Virginia Electric & Power Company from 1910 through the late 1950s when trolleys disappeared from American cities. The structure remains—a massive Victorian brick building with 35-foot ceilings and cast-iron roof trusses. But the memory of what it was, who worked there, and why it mattered had largely faded.

Our project: paint the building's exterior walls with historical murals that restore this forgotten story to the streetscape. Not a generic history-lesson mural. Not an artistic interpretation. Actual archival photographs, hand-painted to restoration-level accuracy, showing the specific people, equipment, and events documented in the Virginia Historical Society archives.

## Three Critical Principles for Historic Mural Work

Any time you're painting history onto a historic building, three requirements become non-negotiable:

### 1. Historical Accuracy at Document Level
The source photographs we used were taken inside the trolley barn between 1912-1945. They show:
- Specific streetcar models (Richmond's 1912 Stephenson cars)
- The actual layout of the repair bay with cast-iron equipment
- Workers in period uniforms with company insignias
- The specific signage and operational details visible in the original space

Rather than painting a "generic 1920s streetcar scene," we chose to paint specific moments documented in the archives. One mural shows Interior Bay 2 exactly as it appeared in a 1923 photograph. Another captures the East Elevation with three streetcars lined up for service on a spring morning in 1931.

### 2. Technical Resolution: Photographic Quality Without Distortion
Historical photographs from the 1910s-1940s have specific visual characteristics:
- Grain structure from large-format film stock
- Limited tonal range (few pure blacks or whites)
- Slight soft focus from period lens optics
- Atmospheric depth from humidity in the original scene

If you paint a mural that looks like a modern photograph of the scene, it's jarring and dishonest. You're claiming the trolley barn looked that way when it was actually captured through 1920s photographic technology. The honest approach: paint the scene *as documented in the archive*, which means preserving those photographic characteristics.

We used Cinema 4D and Octane Render to create photorealistic 3D models of the trolley barn's interior, lit and composed to match the original archival photographs exactly. This became our reference, capturing not just the scene but the specific photographic qualities—the grain, the tonal compression, the depth-of-field characteristics.

Then hand-painted to match that photorealistic render, layer by layer, ensuring the final mural reads as "historical photograph brought to life" rather than "modern painting of old stuff."

### 3. Sign Restoration as Precision Craft
The trolley barn's east wall features a hand-lettered sign: "Virginia Electric & Power Co." in 24-point sans-serif lettering, 24 inches tall, 30 inches wide. This sign appears in multiple archival photographs from the 1920s-1950s, so we knew its exact specifications and proportions.

We researched the specific paint system used on signs during that era—white lead-based enamel with linseed oil binder, which creates a specific sheen and durability impossible to replicate with modern acrylics. We selected modern alternatives that match the visual character while providing current safety and environmental standards.

The letter strokes were painted with proportional spacing (not optically equalized), matching the hand-painted lettering aesthetic of the period. Each letter was rendered with the subtle irregularities and stroke variations that make hand-lettering distinctive—erasing those variations would make it look mechanical, which would be historically inaccurate.

## The Commission: Three Walls, 1,024 Square Feet

The Church Hill Trolley Barn project covered three exterior walls:

**East Wall (350 sq ft):** Interior Bay 2 repair scene with six workers performing streetcar maintenance, three Stephenson cars in various states of disassembly, cast-iron lifting equipment, and the "Virginia Electric & Power Co." sign in period lettering.

**North Wall (380 sq ft):** Exterior view of the facility showing the building's north facade in 1931, with period-accurate streetcars in operation, delivery wagons, and street-level activity from the surrounding neighborhood.

**South Wall (294 sq ft):** Timeline of Richmond's streetcar history (1888-1958) with five key moments documented in archival photography, creating a visual narrative of the technology's arc through Richmond.

Total painted surface area: 1,024 square feet across three walls with complex corner-perspective composition to account for the building's irregular footprint.

## Hand-Painting to Archival Standard: 720 Hours

The execution required 720 hours of careful hand-painting:

- **Research phase (60 hours):** Archival photography sourcing, Cinema 4D modeling, reference composition
- **Surface preparation (40 hours):** Power washing, primer application, base color blocking
- **Underpainting (80 hours):** Establishing tonal values, perspective, figure placement, equipment detail
- **Primary painting (320 hours):** Rendering architectural elements, streetcar bodies, human figures, signage
- **Detail refinement (120 hours):** Texture definition, material differentiation, photographic quality matching
- **Sealing and finishing (100 hours):** Multi-coat UV-resistant topcoat system, final touch-ups, documentation

Each hand-lettered element (the Virginia Electric & Power Co. sign, street-level signage, timeline text) was painted with single-stroke lettering technique, using proportional letter spacing to match historical standards.

## Material Systems for Durability

Historic masonry murals fail when the paint system doesn't match the substrate's expansion/contraction cycles. We used:

**Surface Prep:**
- Pressure wash to remove loose mortar and paint
- Alkaline stabilizer to neutralize efflorescence
- Elastomeric primer designed for historic masonry (allows substrate movement)

**Primary Paint:**
- 100% acrylic exterior muralist paint (UV stable, low VOC)
- Applied in 2-3 coats depending on color density
- Custom color matching to period photographic documentation

**Protective Sealing:**
- First coat: Matte UV-protective clear coat (preserves photographic quality)
- Second coat: Satin UV-resistant topcoat for durability
- Anti-graffiti topcoat system (removable without affecting mural)
- 20-year warranty with proper maintenance

The paint system was specified to allow for seasonal expansion/contraction of the masonry substrate without cracking, while maintaining the photographic quality that makes the archival reference visible.

## The Secretary of the Interior Standards

Any work on historic structures should follow the National Park Service's Secretary of the Interior Standards for Historic Preservation. Key principles that guided this project:

1. **Document the property before alteration** (archival photography, dimensional surveys, historical research)
2. **Repair rather than replace** (stabilize existing materials when possible)
3. **Use compatible materials** (match the historic fabric in composition and reversibility)
4. **Preserve character-defining features** (the building's industrial character remained primary)
5. **Minimize visual impact of repairs** (new work should be distinguishable upon examination but not dominate)

For the trolley barn, this meant:

- Not covering existing original brickwork or structural elements
- Painting only prepared, stable wall surfaces
- Using paint systems proven to be reversible without damaging historic masonry
- Designing the composition to enhance rather than compete with the building's architectural character
- Creating documentation that allows future preservation decisions to be made with full historical context

## Certificate of Provenance and Maintenance

As with all our major projects, the Church Hill Trolley Barn mural includes:

**Certificate of Provenance:**
- Specific archival source photographs referenced (Virginia Historical Society collection details)
- Dates and locations of original documentation (1912-1945)
- Design methodology and decision-making process
- Technical specifications for all materials and methods
- Photographic documentation of process and completion

**Maintenance Guidelines:**
- Annual visual inspection for cracking, peeling, or graffiti
- Power washing every 2-3 years at low pressure (under 1500 PSI) with mild detergent
- Touch-up protocol for minor damage
- Recoating schedule (protective topcoat refresh every 7-10 years)
- Documentation procedures for any future restoration work

**Historical Context Documentation:**
- Comparison images showing archival source photographs alongside the completed mural
- Explanation of design choices and historical research
- Building history and context
- Contact information for future restoration specialists who need to understand the original specifications

## Why This Matters: Presence and Continuity

The Church Hill Trolley Barn is used today primarily as an event space and commercial kitchen. People walk past the north wall daily without realizing they're looking at an industrial facility that shaped Richmond's infrastructure for 50 years.

The mural doesn't lecture. It doesn't explain Richmond's electric streetcar history in wall-mounted text panels. It simply shows the work: men in striped shirts operating industrial equipment, massive wooden-frame streetcars being systematically repaired and maintained, the specific architecture that made that work possible.

Walking past the trolley barn now, you see what was actually there. Not a modern artist's interpretation of what trolleys might have looked like, but the specific moment captured when the Virginia Historical Society photographer documented the barn's operations.

That continuity—painting history back into its actual location—is the entire philosophy behind this project.

## Technical Specifications

**Total Area:** 1,024 sq ft across three exterior walls  
**Duration:** 720 hours hand-painting over 9 weeks  
**Paint System:** 100% acrylic exterior muralist paint with UV-resistant topcoat  
**Surface:** Historic clay brick, properly prepared and sealed  
**Warranty:** 20 years with standard maintenance  
**Standards Compliance:** Secretary of the Interior Standards for Historic Preservation  
**Documentation:** Archival source photography with Certificate of Provenance  
**Sealing System:** Multi-coat UV-protective and anti-graffiti topcoat  

=== END FILE ===
```

---

## FILE: src/content/projects/short-pump-park.md

```markdown
---
title: "Short Pump Park: Public Art at Municipal Scale"
description: "Large-scale public art installation documenting Henrico County history across three curved walls and ground mapping"
date: 2021-12-10
featured: true
client: "Henrico County Parks and Recreation"
location: "Short Pump Park, Henrico County VA"
cover: "/images/projects/short-pump-park.jpg"
tags: ["mural", "public art", "map", "historical"]
---

## Three Curved Walls, 30,000 Square Feet of History

Short Pump Park sits on the site of a historic crossroads intersection in western Henrico County. The "pump" refers to a hand-pump well that served travelers on what is now Broad Street for nearly 150 years. The surrounding landscape holds layers of history: Native American settlement patterns, colonial-era roads, 20th-century suburban development, and contemporary ecological restoration.

We designed a public art installation that documents these layers across three curved concrete walls with a total painted area of 3,200 square feet, plus a 30-foot by 10-foot ground-level directional map marking historical sites visible from the park.

The project took two years of research and preparation before painting began.

## Historical Research: Two Years of Documentation

Public art at this scale requires the kind of historical research you'd normally associate with academic work. We partnered with the Virginia Historical Society, local historical societies in Henrico County, and the Library of Virginia to compile archival materials.

### What We Documented:

**Pre-Colonial (1500s-1700s):**
- Powhatan Nation settlement patterns based on archaeological surveys
- Migration routes of indigenous peoples documented in historical accounts
- The Piedmont ecosystem before European settlement (forest composition, wildlife, water systems)

**Colonial Period (1700s):**
- Road development from Native American trails to colonial post roads
- The emergence of "Short Pump" as a named crossing, documented in 1780s stage coach logs
- Early settlement structures and their locations

**19th Century (1800s):**
- Agricultural use of the land: tobacco farming, early diversification to grain production
- The development of the railway system that bypassed Short Pump, leading to the area's decline
- Population patterns showing how "Short Pump Crossing" shifted from regional importance to local obscurity

**20th Century (1900s-1970s):**
- Suburban expansion into Henrico County from Richmond
- Infrastructure development: roads, utilities, shopping centers
- The ecological impact of paving and development on the local watershed

**21st Century (2000s-present):**
- The park's creation as a community space in 2015
- Ecological restoration efforts to reestablish native plant communities
- Contemporary use patterns and community identity

## Design Challenge: Telling Layered History on Curved Walls

The three walls are not flat surfaces. They curve in perspective, which creates a complex challenge for composition. A straight historical timeline would distort visually as the walls curve. An unstructured collage would be confusing at a public scale.

We designed a "temporal spiral" composition:

**Wall 1 (Northwest, 1,100 sq ft):** Pre-colonial and colonial history, with native landscape and early settlement patterns. The composition uses a bird's-eye perspective, showing the landscape "from above" as it would have appeared to travelers.

**Wall 2 (North, 1,200 sq ft):** 19th and early 20th-century transformation. This wall captures the transition from rural to suburban, showing both the working landscape (farms, the old pump structure itself, early buildings) and the beginning of modern infrastructure.

**Wall 3 (Northeast, 900 sq ft):** Contemporary park and landscape restoration. This wall shows current conditions—the park facilities, restored native plantings, community activity—while making visible the historical layers underneath (ghosted outlines of historic buildings, old road alignments, archaeological markers).

The composition creates a visual progression as visitors move through the park: past → recent past → present, with a sense of looking forward.

## The Ground Map: Making the Invisible Visible

A 30-foot by 10-foot ground-level map near the park entrance marks eight historically significant sites visible or invisible from that vantage point:

1. **The Well** (20 feet north of marker) - Approximate original location of the Short Pump well
2. **Powhatan Village Site** (800 feet west) - Archaeological site designation
3. **Old Broad Street Alignment** (400 feet south) - Original colonial road path, now paved over
4. **Mill Site** (1,200 feet southeast) - 19th-century grist mill location with remaining foundation stones
5. **Historic Home Site** (600 feet northeast) - Archaeological evidence of early 20th-century residence
6. **Railway Junction** (2 miles north) - Chesapeake & Ohio Railway line that led to Short Pump's decline
7. **Native Habitat Restoration** (throughout park) - Labeled zones showing replanted ecological communities
8. **Current Park Facilities** (clearly marked) - Modern infrastructure and use areas

The map is painted on specialized, traffic-rated epoxy paint system that can withstand foot traffic while remaining visible. The directional arrows and distance markers use weatherproof paint with high contrast for legibility.

## Technical Approach: "Painting Photographically"

For historical scenes we had photographic documentation of (19th-century buildings, early 20th-century street views), we could paint with direct reference. For scenes predating photography—the pre-colonial landscape, 18th-century road crossings—we developed a different approach: "painting photographically" for periods we document historically, painting illustratively for periods we can only approximate.

This creates a visual distinction that's historically honest:

**Photographic Technique** (for documented historical periods):
- Careful attention to period photographic grain and tonal qualities
- Specific architectural details and street-level textures that appear in archival photography
- Period-appropriate clothing, equipment, vehicle designs visible in actual photographs
- Use of period color palettes based on documented photograph analysis

**Illustrative Technique** (for pre-photographic periods):
- Painted with visible brushwork that acknowledges we're making educated interpretations
- Colors based on historical botanical and archaeological research (what plants actually grew there, how they looked)
- Architecture and infrastructure based on scholarly reconstruction rather than visual documentation
- A different visual register that signals "this is informed interpretation, not archival record"

The visual distinction is subtle but important: it prevents falsely claiming certainty about things we only know approximately.

## Paint Systems for Large-Scale Durability

Short Pump Park's murals will be exposed to significant public interaction and environmental stress:

**Surface Preparation:**
- Concrete cleaning and degreasing
- Elastomeric primer for concrete expansion/contraction
- Sealer to prevent efflorescence and moisture penetration

**Primary Paint:**
- Commercial-grade exterior acrylics (100% acrylic, UV stable)
- Applied in multiple coats for color saturation and durability
- Custom color matching based on historical research and environmental appropriateness

**Protective Sealing System:**
- Anti-UV clear coat (matte finish to preserve detail legibility)
- Weather-resistant topcoat (resists chalking and color fade)
- Anti-graffiti coating (removable without affecting mural)
- 20+ year durability with maintenance

**Traffic-Rated Ground Map:**
- Epoxy-based paint system designed for pedestrian traffic
- High-contrast colors for legibility
- Low-gloss finish for visibility in various light conditions
- 15-year durability with standard maintenance

## The Certificate of Provenance

For a project of this scale and historical significance, documentation is critical:

**Included Components:**
- Full list of archival sources consulted (Virginia Historical Society, Library of Virginia, Henrico County Historical Museum)
- Methodology for design decisions (why certain historical periods were emphasized, why the spiral composition was chosen)
- Technical specifications for all paint systems and materials
- Photographic documentation of the research, design, and painting process
- Specific maintenance guidelines for different wall sections
- Historical context essay explaining the site's significance
- Information about accessing additional archival materials for future research

## Why This Matters: Place and Public Memory

Henrico County's history is usually invisible to contemporary residents. Short Pump Crossing is now just an intersection in a suburban area. The original well is long gone. The farms are paved over. The stories have faded.

Public art at this scale can restore that continuity. Walking through Short Pump Park, visitors encounter three walls that make visible what was there: not as a nostalgic fantasy, but as documented historical fact. The ground map lets them understand what they're standing on.

For community members—especially people whose families are rooted in Henrico County history—seeing that history acknowledged at public scale creates a different kind of place identity. It says: your ancestors were here, their work mattered, their place matters still.

## Technical Specifications

**Total Painted Area:** 3,200 sq ft (three curved walls) + 300 sq ft (ground map)  
**Wall 1:** 1,100 sq ft, pre-colonial to colonial history  
**Wall 2:** 1,200 sq ft, 19th-20th century transition  
**Wall 3:** 900 sq ft, contemporary and restoration  
**Ground Map:** 300 sq ft (30' x 10'), directional and site identification  
**Duration:** 2 weeks of painting (following 2 years of research and preparation)  
**Paint System:** Commercial-grade exterior acrylic with UV-resistant topcoat  
**Ground Coating:** Traffic-rated epoxy paint system  
**Lifespan:** 20+ years with regular maintenance  
**Warranty:** 20-year durability guarantee with maintenance plan  
**Documentation:** Full Certificate of Provenance with archival source materials  

=== END FILE ===
```

---

## FILE: src/content/journal/how-much-does-a-mural-cost.md

```markdown
---
title: "How Much Does a Mural Cost? The Real Pricing Behind Hand-Painted Public Art"
description: "A complete breakdown of mural pricing factors, from surface area to artistic complexity"
date: 2024-01-15
tags: ["pricing", "murals", "guide"]
author: "Studio Team"
featured: true
---

## Target Keyword & Intent
**Primary:** How much does a mural cost  
**Secondary:** Mural pricing, cost of painting a mural, mural price per square foot  
**Search Intent:** Prospective clients trying to understand mural pricing structure and how to budget for a project

## SEO Structure

### Opening Hook (System 1: Emotion)
Start with the emotional reality of pricing decisions:
- The cost concern is real for property managers
- Budget constraints are practical constraints, not character flaws
- You need honest pricing information to make decisions
- This guide provides that breakdown

### Main Content Sections

**Section 1: The Hourly Reality**
- Hand-painting is labor-intensive
- A mural takes specific amounts of time per square foot
- Why that time matters (preparation, precision, seal-coating)
- Examples: a 200 sq ft mural takes 80-120 hours of work
- This creates the baseline pricing structure

**Section 2: Cost Breakdown by Project Type**
Provide tiered examples:

*Simple Mural (Solid colors, basic geometric composition):*
- $18-28 per square foot
- Example: 200 sq ft = $3,600-5,600
- Timeline: 2-3 weeks
- Maintenance: Annual inspection, power wash every 2-3 years

*Moderate Complexity (Multiple colors, some illustration, design elements):*
- $28-45 per square foot
- Example: 200 sq ft = $5,600-9,000
- Timeline: 4-6 weeks
- Maintenance: Same as simple, with potential touch-ups for wear

*Detailed (Photorealistic, significant illustration, complex composition):*
- $45-70 per square foot
- Example: 200 sq ft = $9,000-14,000
- Timeline: 8-12 weeks
- Maintenance: Anti-graffiti coat recommended, annual inspection

*Archival (Museum-quality, historical documentation, specialized techniques):*
- $70-110 per square foot
- Example: 200 sq ft = $14,000-22,000
- Timeline: 12-16 weeks
- Maintenance: Specialized restoration protocols, 20-year warranty

**Section 3: What's Included in Pricing**
Explain components:
- Site assessment and surface preparation
- Design consultation and revision cycles
- Material costs (paint, sealers, primers)
- Labor for painting
- Sealing and UV protection
- Certificate of Provenance and documentation
- Weather-dependent timeline considerations

**Section 4: Cost Drivers Beyond Square Footage**
Discuss factors that increase cost:
- **Surface Type:** Textured surfaces cost more than flat
- **Location:** Exterior work is more expensive than interior
- **Access:** High-elevation work requires specialized equipment
- **Weather:** Painting during rain/cold seasons takes longer
- **Detail Level:** Photorealism is dramatically more time-intensive than illustration
- **Revisions:** Design changes add cost and timeline
- **Timeline:** Rushing a project costs more
- **Environmental Factors:** Harsh climates increase material costs

**Section 5: The Maintenance Cost Factor**
Address long-term investment:
- Good murals last 15-25 years
- Total cost of ownership includes maintenance
- Annual power washing ($200-500)
- Periodic touch-ups ($500-2000)
- Re-sealing after 10 years ($1000-3000)
- Life-cycle cost comparison to other public art forms

### FAQ Section
Create comprehensive FAQ for common questions:

**Q: Why do you charge per square foot rather than a flat rate?**
A: Because a 100 sq ft mural and a 500 sq ft mural are completely different projects in terms of time, materials, and complexity. Per-square-foot pricing reflects actual costs.

**Q: Can I get a discount for a larger mural?**
A: No, but larger murals can be more cost-effective because certain fixed costs (site assessment, design, mobilization) are spread across more area.

**Q: What if I want to pay in installments?**
A: We offer payment plans: 50% deposit, 25% upon design approval, 25% upon completion. Timeline adjustments may apply.

**Q: Is vinyl cheaper?**
A: Vinyl is cheaper upfront ($5-12/sq ft) but lasts 5-7 years. Hand-painted murals cost more initially but last 20+ years, making them more economical long-term.

**Q: Can I use existing design files to reduce cost?**
A: Yes. If you have design files we can use, we can reduce the design consultation phase by 30-40%, which reduces overall project cost by 10-15%.

**Q: What happens if the mural gets damaged?**
A: We provide touch-up guidance and materials. Minor damage can be addressed quickly. Major damage (vandalism, weather) should be documented for insurance.

**Q: Do you offer maintenance contracts?**
A: Yes. Annual maintenance plans ($1500-3000/year) include inspections, power washing, and minor touch-ups.

### Internal Links
- Link to Price Estimator tool
- Link to Portfolio for complexity examples
- Link to Service pages (Murals, Signs)
- Link to Philosophy page (explaining why price matters)

### CTA
End with clear call-to-action:
- "Ready to discuss your project?" → Contact form
- "Want a quick estimate?" → Price estimator tool
- "See pricing in action" → Portfolio with project details and costs

=== END FILE ===
```

---

## FILE: src/content/journal/gold-leaf-lettering-explained.md

```markdown
---
title: "Gold Leaf Lettering: What It Is, How It's Made, and Why It Shines"
description: "A technical guide to gold leaf sign painting, from materials to methods"
date: 2024-02-10
tags: ["gold leaf", "lettering", "technique", "signs"]
author: "Studio Team"
featured: false
---

## Target Keyword & Intent
**Primary:** Gold leaf lettering, gold leaf signs  
**Secondary:** How to do gold leaf lettering, gold leaf sign painting, gold leaf vs vinyl  
**Search Intent:** Business owners and designers wanting to understand gold leaf signage options

## Content Structure

### Opening: Why Gold Leaf Still Matters
Context setting:
- Gold leaf is not a decorative trend—it's a proven material with 500+ year history
- High-end retail and luxury hospitality use gold leaf because it works
- Understanding gold leaf helps you make informed design decisions
- The right application technique is what separates excellent work from amateur attempts

### Section 1: What Gold Leaf Actually Is

**The Material Itself:**
- Gold leaf is gold hammered to 1/10,000th of an inch thick
- True gold leaf is 23-karat (nearly pure gold)
- A single sheet is roughly 3.5" x 3.5" and weighs almost nothing
- It costs $0.50-2.00 per sheet depending on quantity and source

**Types of Gold Leaf:**
- **23-karat gold:** Most common, brightest, highest cost, most delicate to handle
- **22-karat gold:** Slightly less pure, slightly less expensive, minimal difference in appearance
- **14-karat gold:** Cheaper but noticeably more pale (yellower), sometimes called "commercial" gold
- **Composition/Imitation gold:** Brass-based, dramatically cheaper ($0.05-0.15/sheet), doesn't age well, turns greenish/brown over time

**Why Karat Matters:**
The pure gold content affects two things: how long it lasts and how it ages. Pure gold doesn't tarnish. Alloy golds (14K, composition) develop patina—fine if that's your intention, problematic if you want permanent color consistency.

### Section 2: Understanding Gilding Techniques

**Water Gilding (Traditional Method):**
- Substrate is coated with multiple layers of gesso (traditional plaster-based primer)
- Gesso is burnished (polished) to create a perfectly smooth surface
- Surface is dampened with water mixed with fish glue
- Gold leaf is carefully applied (takes extreme skill—one breath at wrong angle and it blows away)
- Leaf is polished/burnished when dry to create the shine
- Final result: high-shine, durable, requires expertise

**Oil Gilding (Modern Standard):**
- Substrate is primed with size (oil-based adhesive)
- Size is allowed to set for 4-24 hours (timing is critical—too wet and leaf floats, too dry and it won't stick)
- Gold leaf is carefully laid onto the tacky surface
- Leaf bonds to the size permanently
- Polish for enhanced shine (optional)
- Final result: durable, easier to execute than water gilding, slightly less dramatic shine

**Which to Use:**
- Water gilding: Fine art signs, maximum longevity, requires specialist painter
- Oil gilding: Commercial signage, outdoor applications, standard practice

### Section 3: The Sizing Step (Why Timing Is Critical)

The single most common failure point in gold leaf work is incorrect sizing. Here's why timing matters:

**Too Wet (Applied Immediately):**
- Gold leaf floats on the wet adhesive
- You can't control where it sits
- Overlaps bunch up, creating visible seams
- Bubbles form underneath, causing adhesion failure
- Result: looks sloppy, peels within months

**Perfect (Tacky/Semi-Dry):**
- Gold adheres immediately when touched
- You can position it precisely
- No floating, no bubbling
- Smooth, consistent coverage
- Result: professional finish, long-term durability

**Too Dry (Waited Too Long):**
- Gold leaf won't stick at all
- Size becomes non-tacky
- Have to reapply size (wasting time and materials)
- Result: wasted time, frustrated painter

**Timing by Temperature:**
- Cool/humid: 8-24 hours
- Moderate: 4-12 hours
- Warm/dry: 2-6 hours
- You test by touching the edge: if it's tacky but doesn't stick to your finger, it's ready

### Section 4: The Letter Rendering Process

**Step 1: Design and Layout**
- Gold leaf lettering requires precise design
- Letter spacing is critical—too close and they visually merge, too far and they seem disjointed
- Proportional spacing (not mechanical) creates the professional look
- Mock-up size comparison to actual sign location

**Step 2: Substrate Preparation**
- For painted signage: prime the wall/surface
- Paint base color (usually black, deep blue, or burgundy for gold contrast)
- Ensure perfectly smooth finish (gold leaf shows every surface irregularity)

**Step 3: Letter Tracing**
- Scale design to actual size
- Use graphite transfer or chalk to outline letters
- Lines should be clean and accurate (guides for painter)

**Step 4: Base Coat Application**
- Matte black (or chosen color) applied to letter area
- Creates shape and letter edges
- Paint base prevents gold leaf from appearing translucent against bright backgrounds

**Step 5: Size Application**
- Size is carefully brushed or rolled onto letters
- Brush strokes should be invisible in final result (means even pressure, single direction)
- Precise edges—size shouldn't overlap letter boundaries

**Step 6: The Waiting Period**
- This is where amateur painters fail (they get impatient)
- Size must reach perfect tackiness
- Weather conditions determine timing
- Testing procedure: touch non-critical area to check tackiness level

**Step 7: Gold Leaf Application**
- Leaf is lifted using gilder's tip (special brush with static charge)
- Carefully positioned on sized letter
- Slight overlap with previous sheet (ensures coverage)
- Each sheet is gently pressed without rubbing
- Process continues until entire letter is covered

**Step 8: Excess Removal**
- After all letters are covered and size has fully cured (12-24 hours)
- Soft brush removes excess leaf (non-adhered scraps)
- Clean brush strokes only—no pressure that would disturb the gilding

**Step 9: Sealing**
- Clear topcoat protects against oxidation and physical damage
- Matte or satin finish (gloss would look plastic-y)
- UV-resistant sealer extends lifespan
- Outdoor gold leaf: heavy-duty protective coat

### Section 5: Why Gold Leaf Catches Light Differently

This is the technical reason gold leaf is worth the expense:

**Reflective Properties:**
- Gold is 97% reflective in the visible spectrum
- Reflected light appears warm and glowing
- Gold paint (actual paint with gold pigment) is only 20-30% reflective
- The difference is visually dramatic

**Angle-Dependent Appearance:**
- Gold leaf's shine changes based on viewing angle
- Directly facing: bright, almost white-gold appearance
- Oblique angle: deep warm gold
- This variability makes gold lettering feel alive and dynamic
- Painted gold looks flat and static by comparison

**Aging Characteristics:**
- Pure gold doesn't tarnish but can develop patina from atmospheric deposits
- This patina deepens the appearance, making older gold signage look richer
- Alloy gold can develop green/brown patina (not desirable for most applications)

### Section 6: Cost and Timeline Factors

**Material Costs:**
- 23-karat gold leaf: $0.50-2.00 per sheet
- Size adhesive: $5-15 per application
- Primers, sealers, base paint: $3-8 per square foot
- Typical sign uses 50-200 sheets of gold leaf ($25-400 material cost for gilding alone)

**Labor Timeline:**
- Design: 2-5 hours
- Surface preparation: 4-8 hours
- Sizing and gilding: 8-40 hours depending on letter count and complexity
- Sealing: 2-4 hours
- Total: 16-57 hours for typical commercial sign

**Timeline by Complexity:**
- Simple lettering (6-8 large letters): 2-3 days
- Moderate (15-20 letters with decorative elements): 3-5 days
- Complex (extensive lettering, decorative borders, multi-color): 5-10 days

### Section 7: Interior vs. Exterior Applications

**Interior Gold Leaf (Retail, Hospitality):**
- More delicate finishes possible (thinner sealing)
- Longevity: 20+ years without maintenance
- Environmental protection: controlled humidity, temperature, no direct weather
- Advantage: gold's full brilliance is visible without weathering

**Exterior Gold Leaf (Storefront Signs, Awnings):**
- Requires heavy-duty sealing
- Exposure to UV, rain, thermal stress
- Longevity: 15-20 years with maintenance, shorter in harsh climates
- Advantage: gold's changing light reflection is visible throughout day
- Maintenance: annual inspection, cleaning, resealing every 5-7 years

### Section 8: Gold Leaf vs. Vinyl Lettering

**Gold Leaf Advantages:**
- Long lifespan (20+ years)
- Prestige and craft association
- Light-reflective qualities that vinyl can't replicate
- Improves with age (can develop character)
- Repairable and restorable

**Gold Leaf Disadvantages:**
- Higher upfront cost ($2000-10000 for typical commercial sign)
- Requires skilled application
- Longer timeline to completion
- Sensitive to improper preparation
- Requires maintenance

**Vinyl Lettering Advantages:**
- Lower cost ($200-2000 for equivalent sign)
- Instant application
- Wide color options
- No craft skill required

**Vinyl Lettering Disadvantages:**
- 5-7 year lifespan
- Constant replacement costs
- No prestige association
- Fades and becomes dull
- Can't be repaired—must be replaced

**Cost Over 30 Years:**
- Gold leaf: $3000 initial + $500 maintenance = $3500
- Vinyl: $1500 initial + $2500 replacement (3-4 cycles) + $500 maintenance = $4500

### Internal Links
- Link to Gold Leaf Signs service page
- Link to Portfolio examples of gold leaf work
- Link to Price Estimator
- Link to Philosophy page (craft vs. production)

### CTA
- "Ready to add gold leaf to your storefront?" → Contact form
- "See gold leaf in action" → Portfolio gallery
- "Get a gold leaf quote" → Price estimator

=== END FILE ===
```

---

## FILE: src/content/journal/mural-process-start-to-finish.md

```markdown
---
title: "The Mural Process: From Site Visit to Sealed Completion"
description: "A detailed walkthrough of our 8-step methodology for creating hand-painted murals"
date: 2024-03-05
tags: ["process", "murals", "technique"]
author: "Studio Team"
featured: true
---

## Target Keyword & Intent
**Primary:** Mural process, how murals are made, mural painting process  
**Secondary:** Steps to paint a mural, mural creation timeline, mural methodology  
**Search Intent:** Prospects wanting to understand what's involved in commissioning a mural, and how the work is executed

## Content Outline

### Introduction: Why Process Matters
- Most people know murals look nice
- Few understand the technical methodology that makes them last 20+ years
- This guide explains our specific approach and why each step is critical
- Understanding process helps you make better decisions as a client

### Step 1: Discovery and Site Assessment (Week 1)

**What Happens:**
- Initial visit to the wall/space
- Photogrammetry documentation (capture the exact geometry of the space)
- Material assessment (concrete? brick? drywall? previous paint systems?)
- Environmental analysis (sun exposure, moisture, freeze-thaw cycles, wind)
- Stakeholder interviews (what does the space need to accomplish?)

**Why It Matters:**
- Wrong preparation kills every mural that follows
- A wall that looks smooth to the eye can be structurally unstable
- Environmental factors determine what paint systems will last
- Design decisions depend on understanding the site deeply

**Client Involvement:**
- You walk us through the space
- Discuss the vision/intention for the mural
- Share existing materials (brand guidelines, reference imagery, historical context)
- Answer questions about maintenance capacity and timeline expectations

### Step 2: Photogrammetry and 3D Capture (Week 1-2)

**What Happens:**
- High-resolution photography from multiple angles
- Structured light scanning (creates detailed 3D point cloud of wall geometry)
- Surface texture capture (reveals irregularities invisible to the eye)
- Environmental lighting documentation (how light hits the wall at different times of day)

**Why This Differentiates Our Approach:**
- Most muralists paint based on 2D photos
- We create a full 3D model of the space
- Allows us to simulate the final design at actual scale before painting
- Reveals structural issues before we start painting

**Technical Output:**
- 3D mesh model of the wall and surrounding context
- Photogrammetry-based reference for perspective accuracy
- Environmental light simulation data
- Documentation for future maintenance decisions

**Client Deliverable:**
- You receive before-and-after 3D visualization
- Can review design from any angle
- Provides confidence in design direction before painting begins

### Step 3: Design and Pre-Visualization (Weeks 2-4)

**What Happens:**
- Concept development based on site analysis and your brief
- Blender 3D modeling of the proposed design
- Photorealistic rendering positioned in the actual wall geometry
- Multiple design iterations for your review
- Final design approval before any painting begins

**Blender Pre-Visualization Process:**
- 3D model of the space is imported into Blender
- Design elements are modeled and positioned
- Lighting is matched to environmental conditions documented in photogrammetry
- Renders are created showing the mural from multiple viewing angles
- Composition can be refined before any paint is applied

**Why Blender Matters:**
- It's the same software used in professional cinema production
- Allows photorealistic preview of the final result
- You can see the design at actual size in the actual lighting
- Reduces surprises and design conflicts during execution

**Design Revisions:**
- Unlimited design concepts in initial phase
- Focused refinement rounds after direction is selected
- Final design locked in writing before painting begins

**Client Deliverables:**
- High-resolution renderings from multiple angles
- 360-degree presentation showing the mural in context
- Written design documentation explaining decisions

### Step 4: Client Approval and Contract (Week 4)

**What's Reviewed:**
- Final design renderings
- Technical specifications (paint systems, timeline, weather dependencies)
- Detailed quote and payment schedule
- Timeline including weather-dependent contingencies
- Maintenance guidelines and warranty terms

**What Gets Signed:**
- Design approval (locking the visual direction)
- Technical specifications agreement
- Schedule and payment terms
- Liability and insurance documentation
- Certificate of Provenance framework

### Step 5: Surface Preparation and Priming (Weeks 5-6)

**The Critical Foundation Phase**

This is where amateurs fail and professionals succeed. Poor prep creates peeling murals within 2-3 years. Proper prep creates murals that last 20+ years.

**Assessment and Cleaning:**
- Pressure washing to remove loose paint, dirt, algae
- Pressure: 1500 PSI maximum (prevents substrate damage)
- Cleaning solution: mild detergent, environmentally safe
- Allow 48 hours drying before next step

**Repair and Stabilization:**
- Fill cracks deeper than 1/8" with flexible sealant
- Re-point mortar joints if necessary (brick substrates)
- Stabilize any loose substrate material
- Allow all repairs to cure fully (48-72 hours)

**Priming Strategy:**
- Exterior: 2-part elastomeric primer (allows substrate movement)
- Interior: High-adhesion acrylic primer
- Primer coat covers 100% of painting surface
- Second primer coat on high-traffic or problem areas
- Primer color is selected to support final design colors

**Surface Texture Assessment:**
- Smooth surfaces: can proceed directly to design layout
- Textured surfaces: require primer compatible with texture
- Very rough surfaces: may need additional topography management

### Step 6: Painting and Execution (Weeks 7-12, depending on scale)

**Design Layout:**
- Full-scale grid transfer to wall
- Graphite cartridge used to mark composition guides
- Major forms and proportions are outlined
- All guides are light enough to be covered by paint

**Underpainting:**
- Base color blocking (establishes major color zones)
- Tonal values established (light, medium, dark)
- Composition checked against original design
- This phase typically takes 30-40% of total painting time

**Primary Painting:**
- Colors are applied in layers
- Each layer builds on previous work
- Detailed elements are refined progressively
- Environmental factors (temperature, humidity) affect drying time and paint workability

**Detail Work:**
- Fine details are rendered with small brushes
- Texture differentiation (rough vs. smooth surfaces)
- Lighting effects and shadows are refined
- Final color adjustments

**Quality Checkpoints:**
- Daily review for accuracy and consistency
- Progress photography for documentation
- Weather monitoring and contingency planning
- Client check-ins (you can request updates/photos)

### Step 7: Sealing and Protection (Week 13)

**Sealing Strategy (Exterior Murals):**

**First Coat: UV-Protective Clear Coat**
- Matte finish to preserve detail legibility
- Protects against UV fade
- Allows surface to breathe (prevent trapping moisture)
- Cures in 24 hours

**Second Coat: Weather-Resistant Topcoat**
- Satin finish for durability
- Protects against rain, wind, thermal expansion
- Resistant to chalk and color fade
- Cures in 24-48 hours

**Optional: Anti-Graffiti Coating**
- Non-sacrificial system (remains permanently)
- Allows graffiti removal without damaging mural
- Adds 5-10% to total cost
- Recommended for high-vandalism areas

**Interior Sealing:**
- Single or double coat clear acrylic sealer
- Matte or satin finish based on preference
- Primarily protects against dust and surface damage
- Minimal UV concerns (no direct sunlight)

**Curing Time:**
- Full cure takes 7-14 days before light contact acceptable
- 30 days before full-contact activity (cleaning, maintenance)

### Step 8: Documentation and Handoff (Week 13-14)

**What We Document:**

**Photographic Documentation:**
- High-resolution photos of finished mural (multiple angles, lighting conditions)
- Detailed shot of specific sections
- Full environmental context photos
- Timeline photos showing project progression

**Technical Documentation:**
- Paint systems used (brand, product number, color codes)
- Primer specifications
- Sealing system information
- Surface preparation summary
- Application notes (special techniques, weather impacts)

**Certificate of Provenance:**
- Design concept and inspiration
- Artist statement
- Technical specifications
- Maintenance guidelines (power washing frequency, touch-up procedures, resealing timeline)
- Warranty terms
- Contact information for future maintenance or restoration

**Maintenance Guidelines:**
- Annual visual inspection checklist
- Power washing procedures (PSI, frequency, cleaning solution)
- Touch-up process for minor damage
- Resealing timeline (typically every 7-10 years for exterior)
- Climate-specific considerations

**Your Deliverables:**
- All documentation and photos
- Maintenance kit (touch-up paint, sealers, supplies)
- Access to artist for questions/maintenance advice
- Digital files (renderings, design files, if appropriate)

### Timeline Expectations

**Simple Mural (200 sq ft, basic design):**
- Total project: 6-8 weeks from discovery to completion
- Painting phase: 2-3 weeks

**Moderate Complexity (500 sq ft, illustrated design):**
- Total project: 10-14 weeks
- Painting phase: 4-6 weeks

**Complex Mural (1000+ sq ft, photorealistic):**
- Total project: 16-20 weeks
- Painting phase: 8-12 weeks

**Timeline Dependencies:**
- Weather: rain or freezing temps halt exterior work
- Temperature: optimal painting occurs 50-85°F
- Humidity: ideal range 40-70%
- Substrate curing: primers and sealers require specific conditions
- Client approval delays: design phase stretches if revisions are extensive

### Why This Process Exists

Each step serves a function:

1. **Discovery** ensures we understand the context
2. **3D Capture** prevents perspective and structural surprises
3. **Design/Pre-vis** locks direction before expensive execution
4. **Approval** protects both artist and client
5. **Prep** creates the foundation for durability
6. **Painting** executes the approved vision with quality control
7. **Sealing** ensures 20+ year lifespan
8. **Documentation** enables future maintenance and restoration

Shortcuts in any phase typically result in:
- Peeling murals (from poor prep)
- Design conflicts discovered mid-painting (from skipping pre-vis)
- Client dissatisfaction (from unclear communication)
- Premature failure (from inadequate sealing)

The process is thorough not because we like process, but because it creates results that last.

### Internal Links
- Link to Portfolio for process examples
- Link to Service pages explaining project-specific variations
- Link to Contact for starting your project
- Link to Price Estimator

### CTA
- "Ready to start your mural?" → Contact form
- "See the process in action" → Portfolio with before/during/after timelines
- "Get your site assessed" → Contact for discovery meeting

=== END FILE ===
```

---

## FILE: CLAUDE.md

```markdown
# Untitled Mixed Media Website - Project Documentation

## Stack Overview

**Framework:** Astro 6  
**Styling:** Tailwind CSS v4 with @theme configuration  
**Components:** DaisyUI v5 (dark theme "umm")  
**Language:** TypeScript (strict mode)  
**Content:** Astro Content Collections with glob loader  
**Deployment:** Cloudflare Pages  

## Build & Development

```bash
# Install dependencies
npm install

# Development server (localhost:3000)
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
umm-website/
├── src/
│   ├── pages/           # Route files
│   ├── components/      # Reusable components
│   ├── layouts/         # Page layouts
│   ├── content/         # Markdown content (projects, journal)
│   ├── styles/          # Global styles
│   └── scripts/         # Client-side utilities
├── public/              # Static assets
├── astro.config.ts      # Astro configuration
├── tsconfig.json        # TypeScript configuration
└── tailwind.config.ts   # Tailwind configuration
```

## Typography System

**Five fonts in design system:**

1. **Canela Blackletter** - Logotype, main headline (H1)
2. **Lyon Text** - Body copy, article text
3. **Gotham** - UI elements, navigation, labels
4. **Berkeley Mono** - Code blocks, technical elements
5. **System stack fallback** - Unsupported browsers

All fonts self-hosted as WOFF2 for performance.

**Hierarchy:**
- H1: Canela Blackletter, fluid 2.5rem-4rem
- H2: Lyon Text, fluid 2rem-3rem
- H3: Gotham, fluid 1.5rem-2rem
- Body: Lyon Text, fluid 1rem-1.125rem
- Small: Gotham, 0.875rem-1rem

## Design System

**Colors (DaisyUI "umm" theme):**
- Primary: bone-black (#1a1a1a)
- Secondary: titanium-white (#f5f5f5)
- Accent: slate-gray (#4a5568)
- Highlights: warm-gold (#d4a574)
- Support: cool-slate (#5a6c7d)

**Spacing:** Tailwind 4 scale (0.25rem base)  
**Border Radius:** 0.5rem (subtle, professional)  
**Shadows:** Minimal (dark theme friendly)  
**Transitions:** 200-300ms cubic-bezier(0.4, 0, 0.2, 1)  

## Content Collections

### Projects Collection (`src/content/projects/`)
**Schema:**
```typescript
{
  title: string;
  description: string;
  date: Date;
  featured: boolean;
  client: string;
  location: string;
  cover: string;  // Image path
  tags: string[]; // "mural" | "sign" | etc.
}
```

**Files:** Markdown with frontmatter, rendered with full HTML support

### Journal Collection (`src/content/journal/`)
**Schema:**
```typescript
{
  title: string;
  description: string;
  date: Date;
  tags: string[];
  author: string;
  featured: boolean;
  cover?: string;  // Optional cover image
}
```

## Page Structure Patterns

### Service Landing Pages
- Hero section with brand messaging
- 6-12 service cards linking to subpages
- Featured projects grid filtered by tag
- CTA block at bottom

### Detailed Service Pages
- Breadcrumb navigation
- StoryBrand structure (Character, Problem, Guide, Plan, Stakes)
- FAQ section
- Related content links
- CTA with phone/email

### Project Detail Pages
- Breadcrumb navigation
- Hero image (full-width)
- Title and metadata sidebar
- Markdown content with prose styling
- Previous/next navigation (circular browsing)

### Journal Pages
- Listing page with all posts sorted newest first
- Individual post pages with:
  - Breadcrumb navigation
  - Date, author, tags
  - Optional cover image
  - Rendered markdown
  - Related posts section (matching tags)

## Animation System

**Data-animate attributes:**
```html
<div data-animate="fade-in" style="animation-delay: 100ms">
  Content
</div>
```

**Supported animations:**
- fade-in: Opacity 0 → 1
- slide-up: Transform translateY(20px) → 0
- scale-in: Scale 0.95 → 1

**Trigger:** IntersectionObserver (visible-in-viewport)  
**Respect:** prefers-reduced-motion (no animation if set)  

## Deployment

**Hosting:** Cloudflare Pages  
**Build Command:** `npm run build`  
**Output Directory:** `dist/`  
**Environment:** Auto-built on git push to production branch  

## SEO & Meta Tags

**Included in BaseLayout:**
- Title tag (customizable per page)
- Meta description
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags
- Canonical URL
- Favicon

**Dynamic Meta Generation:**
```typescript
// In page components
const title = "Page Title";
const description = "Page description for search results";
// Pass to BaseLayout as props
```

## Performance Optimizations

1. **Image Optimization:** Astro image component with srcset
2. **Font Loading:** WOFF2 self-hosted with font-display: swap
3. **Code Splitting:** Astro automatic per-route chunking
4. **CSS:** Tailwind JIT compilation, tree-shaking unused styles
5. **JavaScript:** Minimal; animations use CSS and IntersectionObserver
6. **Lazy Loading:** Native lazy attribute on images

## Dark Mode Implementation

**System:**
- DaisyUI "umm" theme provides dark styles
- Tailwind dark: prefix for dark mode selectors
- Respects prefers-color-scheme media query
- Manual toggle possible (with localStorage)

**Key Classes:**
- `dark:bg-slate-950` - Dark background
- `dark:text-white` - Dark text
- `dark:border-slate-800` - Dark borders

## Accessibility

- Semantic HTML (nav, article, section, etc.)
- ARIA labels where necessary
- Skip-to-content link in navigation
- Keyboard navigation support
- Color contrast meets WCAG AA standard
- Animation respects prefers-reduced-motion

## Form Handling

**Contact Form** (`/contact`):
- Client-side validation with HTML5
- POST to `/api/contact` endpoint
- Response handling (success/error messages)

**Price Estimator** (`/price-estimator`):
- JavaScript form calculation
- Real-time estimate updates
- Client-side logic (no server dependency)

## Development Tips

1. **Adding a new service page:**
   - Create `/pages/[service-name]/index.astro`
   - Create subdirectory `/pages/[service-name]/[subpages].astro`
   - Follow pattern from existing service pages

2. **Adding projects:**
   - Create `/content/projects/[slug].md`
   - Include all frontmatter fields
   - Add cover image to `/public/images/projects/`

3. **Styling components:**
   - Use Tailwind classes (no inline styles when possible)
   - Reference design system colors from tailwind.config.ts
   - Use CSS custom properties for consistent spacing/sizing

4. **Content updates:**
   - Changes to `/content/` trigger rebuild
   - Changes to templates require `npm run dev` restart

## Common Issues & Solutions

**Issue:** Dark mode not applying  
**Solution:** Clear browser cache, check `dark:` prefix is used, verify DaisyUI theme in tailwind.config.ts

**Issue:** Images not loading  
**Solution:** Verify path is relative to `/public/`, check image format, ensure Astro image component is used

**Issue:** Build fails on deployment  
**Solution:** Check TypeScript compilation with `npm run build` locally, verify all imports are correct

## Future Enhancement Ideas

- Blog search functionality
- Project filtering UI
- Newsletter signup integration
- Google Analytics / Plausible
- Sitemap auto-generation
- RSS feed for journal
- Image gallery component
- Video background optimization
- Internationalization (i18n) if needed

=== END FILE ===
```

---

## FILE: src/styles/global.css

```css
@import "tailwindcss";
@plugin "daisyui";

/* ─── Self-Hosted Fonts ────────────────────────────────── */

/* Canela Blackletter — Logo, primary display (min 24px) */
@font-face {
  font-family: 'Canela Blackletter';
  src: url('/fonts/woff2/CanelaBlackletter-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

/* Canela — Secondary headings, subheads */
@font-face {
  font-family: 'Canela';
  src: url('/fonts/woff2/Canela-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Canela';
  src: url('/fonts/woff2/Canela-RegularItalic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Canela';
  src: url('/fonts/woff2/Canela-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Canela';
  src: url('/fonts/woff2/Canela-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Lyon Text — Body text, long-form content */
@font-face {
  font-family: 'Lyon Text';
  src: url('/fonts/woff2/LyonText-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Lyon Text';
  src: url('/fonts/woff2/LyonText-RegularItalic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Lyon Text';
  src: url('/fonts/woff2/LyonText-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Lyon Text';
  src: url('/fonts/woff2/LyonText-BoldItalic.woff2') format('woff2');
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}

/* Gotham — Nav, UI labels, buttons */
@font-face {
  font-family: 'Gotham';
  src: url('/fonts/woff2/Gotham-Book.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Gotham';
  src: url('/fonts/woff2/Gotham-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

/* Berkeley Mono — Tags, metadata, technical details */
@font-face {
  font-family: 'Berkeley Mono';
  src: url('/fonts/woff2/BerkeleyMonoTrial-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* ─── UMM Design Tokens ─────────────────────────────────── */

@theme {
  /* Core Palette */
  --color-bone-black: #000205;
  --color-midnight-graphite: #1E1F22;
  --color-slate-gray: #3C3D3E;
  --color-smoke-gray: #595A5B;
  --color-middle-grey: #777777;
  --color-shadow-gray: #959494;
  --color-soft-gray: #B3B2B0;
  --color-light-ash: #D0CFCD;
  --color-titanium-white: #EEECE9;

  /* Artist Primaries */
  --color-pyrrole-red: #e41a1c;
  --color-cobalt-blue: #377eb8;
  --color-sap-green: #4daf4a;
  --color-dioxazine-mauve: #984ea3;
  --color-cadmium-orange: #ff7f00;
  --color-lemon-yellow: #ffff33;
  --color-burnt-sienna: #a65628;
  --color-dusty-rose: #f781bf;

  /* Typography — 5-font brand hierarchy */
  --font-blackletter: 'Canela Blackletter', Georgia, serif;
  --font-heading: 'Canela', Georgia, serif;
  --font-body: 'Lyon Text', Georgia, serif;
  --font-sans: 'Gotham', system-ui, sans-serif;
  --font-mono: 'Berkeley Mono', ui-monospace, monospace;

  /* ─── Fluid Type Scale — Brutalist Two-Ramp ──────────────
     UI Ramp: conservative growth, Apple-standard readability
     Impact Ramp: aggressive jumps, brutalist tension
     Min: 375px (iPhone SE) → Max: 1920px (large desktop)
     ──────────────────────────────────────────────────────── */

  /* UI Ramp — Conservative */
  --text-fluid-xs:   clamp(0.75rem,   0.7045rem + 0.2045vw, 0.875rem);  /* 12→14px  Micro / metadata  */
  --text-fluid-sm:   clamp(0.875rem,  0.8409rem + 0.1705vw, 0.9375rem); /* 14→15px  Labels / tags     */
  --text-fluid-base: clamp(1.0625rem, 1.0511rem + 0.0568vw, 1.125rem);  /* 17→18px  Body              */
  --text-fluid-lg:   clamp(1.125rem,  1.0739rem + 0.2557vw, 1.3125rem); /* 18→21px  Body large / lead */
  --text-fluid-xl:   clamp(1.5rem,    1.4205rem + 0.3977vw, 1.75rem);   /* 24→28px  Subtitle / h3     */

  /* Gap here IS the brutalist tension: 28px → 36px intentional jump */

  /* Impact Ramp — Aggressive */
  --text-fluid-2xl:  clamp(1.75rem,   1.63rem   + 0.5178vw, 2.25rem);   /* 28→36px  Bridge / oversize sub */
  --text-fluid-3xl:  clamp(2.25rem,   1.9659rem + 1.4205vw, 3.5rem);    /* 36→56px  Section title / h2    */
  --text-fluid-4xl:  clamp(3rem,      2.5455rem + 2.2727vw, 4.5rem);    /* 48→72px  Page title / h1        */
  --text-fluid-5xl:  clamp(3.5rem,    2.8409rem + 3.2955vw, 6rem);      /* 56→96px  Hero display            */
}

/* ─── Brutalist Spacing & Rhythm Tokens ─────────────────── */

:root {
  /* Spacing — 4px base scale */
  --space-1:   4px;    /* Paired: icon+label, label+value */
  --space-2:   8px;    /* Tight group: rows in component */
  --space-3:   12px;   /* List items, table rows */
  --space-4:   16px;   /* Component padding (mobile) */
  --space-5:   20px;   /* Comfortable component padding */
  --space-6:   24px;   /* Card padding, grid gutters */
  --space-8:   32px;   /* Card-to-card gap */
  --space-10:  40px;   /* Sub-section group */
  --space-12:  48px;   /* Section break minimum */
  --space-16:  64px;   /* Primary section separation */
  --space-20:  80px;   /* Strong section break */
  --space-24:  96px;   /* Hero void, major break */
  --space-32:  128px;  /* Maximum void — brutalist anchor */

  /* Leading (line-height) */
  --leading-solid:   1.0;   /* Hero display — text as shape */
  --leading-tight:   1.1;   /* Large brutalist titles */
  --leading-snug:    1.2;   /* Section headers */
  --leading-normal:  1.4;   /* UI labels, tags */
  --leading-relaxed: 1.6;   /* Body copy — Apple standard */

  /* Tracking (letter-spacing) — tighter as size increases */
  --tracking-tighter: -0.04em;  /* Hero display */
  --tracking-tight:   -0.03em;  /* H1 display */
  --tracking-snug:    -0.02em;  /* H2 section title */
  --tracking-normal:   0em;     /* Body copy */
  --tracking-wide:     0.01em;  /* Small labels */
  --tracking-wider:    0.08em;  /* Micro / all-caps tags */

  /* Measure (max-width for reading comfort) */
  --measure-narrow: 45ch;
  --measure-normal: 65ch;
  --measure-wide:   75ch;

  /* Section spacing alias (used by SectionWrapper) */
  --spacing-section: var(--space-16);  /* 64px */
}

/* ─── DaisyUI Theme ─────────────────────────────────────── */

@plugin "daisyui" {
  themes: false;
}

[data-theme="umm"] {
  --p: 207 70% 47%;       /* Cobalt Blue */
  --pf: 207 70% 37%;
  --pc: 36 2% 93%;        /* Titanium White */
  --s: 292 52% 47%;       /* Dioxazine Mauve */
  --sf: 292 52% 37%;
  --sc: 36 2% 93%;
  --a: 30 100% 50%;       /* Cadmium Orange */
  --af: 30 100% 40%;
  --ac: 210 100% 1%;
  --n: 220 12% 13%;       /* Midnight Graphite */
  --nf: 210 100% 1%;      /* Bone Black */
  --nc: 36 2% 93%;
  --b1: 210 100% 1%;      /* Bone Black */
  --b2: 220 12% 13%;      /* Midnight Graphite */
  --b3: 210 3% 24%;       /* Slate Gray */
  --bc: 36 2% 93%;        /* Titanium White */
}

/* ─── Base Styles ───────────────────────────────────────── */

html {
  scroll-behavior: smooth;
}

/* ─── Focus Styles ────────────────────────────────── */

:focus-visible {
  outline: 2px solid var(--color-titanium-white);
  outline-offset: 2px;
}

/* Remove default focus ring when mouse-clicking (keep for keyboard) */
:focus:not(:focus-visible) {
  outline: none;
}


body {
  font-family: var(--font-body);
  background-color: var(--color-bone-black);
  color: var(--color-titanium-white);
  line-height: var(--leading-relaxed);  /* 1.6 — Apple reading standard */
  font-size: var(--text-fluid-base);    /* 17→18px */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:where(h1, h2, h3, h4, h5, h6) {
  font-family: var(--font-heading);
  line-height: var(--leading-tight);  /* 1.1 */
}

:where(h1) {
  font-size: var(--text-fluid-4xl);
  letter-spacing: var(--tracking-tight);   /* -0.03em */
  line-height: var(--leading-tight);       /* 1.1 */
  max-width: 25ch;
}

:where(h2) {
  font-size: var(--text-fluid-3xl);
  letter-spacing: var(--tracking-snug);    /* -0.02em */
  line-height: var(--leading-tight);       /* 1.1 */
  max-width: 30ch;
}

:where(h3) {
  font-size: var(--text-fluid-xl);
  letter-spacing: calc(var(--tracking-snug) / 2);  /* -0.01em */
  line-height: var(--leading-snug);        /* 1.2 */
  max-width: 40ch;
}

/* ─── Font Utility Classes ─────────────────────────────── */

.font-blackletter {
  font-family: var(--font-blackletter);
}

.font-heading {
  font-family: var(--font-heading);
}

.font-body {
  font-family: var(--font-body);
}

.font-sans {
  font-family: var(--font-sans);
}

.font-mono {
  font-family: var(--font-mono);
}

/* ─── Scroll Reveal ─────────────────────────────────────── */

[data-animate] {
  opacity: 0;
  transform: translateY(1.5rem);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}

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

/* ─── Noise Overlay ─────────────────────────────────────── */

body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.045;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}

/* ─── Utility ───────────────────────────────────────────── */

.text-balance {
  text-wrap: balance;
}

::selection {
  background-color: var(--color-cobalt-blue);
  color: var(--color-titanium-white);
}

/* ─── Case Study Content ───────────────────────────────── */

.case-study-prose {
  max-width: var(--measure-wide);
}

.case-study-prose h2 {
  margin-top: var(--space-20);
  margin-bottom: var(--space-6);
}

.case-study-prose h3 {
  margin-top: var(--space-12);
  margin-bottom: var(--space-4);
}

.case-study-prose p {
  color: var(--color-shadow-gray);
  font-size: var(--text-fluid-base);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

.case-study-prose strong {
  color: var(--color-titanium-white);
}

.case-study-prose a {
  color: var(--color-cobalt-blue);
  text-underline-offset: 4px;
  text-decoration: underline;
  transition: color 0.2s;
}

.case-study-prose a:hover {
  color: var(--color-titanium-white);
}

.case-study-prose hr {
  border: none;
  border-top: 1px solid var(--color-slate-gray);
  margin: var(--space-16) 0;
}

.case-study-prose ul,
.case-study-prose ol {
  color: var(--color-shadow-gray);
  padding-left: 1.5em;
  margin-bottom: var(--space-6);
}

.case-study-prose li {
  margin-bottom: var(--space-3);
}

.case-study-prose li strong {
  color: var(--color-titanium-white);
}

/* Images break out of prose width to fill the container */
.case-study-prose img {
  width: 100%;
  max-width: none;
  height: auto;
  margin: var(--space-12) 0;
  object-fit: cover;
}
```

---

## FILE: src/components/ServiceCard.astro

```astro
---
interface Props {
  title: string;
  description: string;
  href: string;
}

const { title, description, href } = Astro.props;
---

<a
  href={href}
  class="group block border border-slate-gray p-8 hover:border-soft-gray transition-colors duration-200"
>
  <h3 class="font-heading text-titanium-white group-hover:text-soft-gray transition-colors duration-200 mb-3" style={`font-size: var(--text-fluid-xl);`}>
    {title}
  </h3>
  <p class="font-body text-shadow-gray mb-6" style={`font-size: var(--text-fluid-base);`}>
    {description}
  </p>
  <span class="font-mono text-smoke-gray uppercase" style={`font-size: var(--text-fluid-xs);`}>
    Learn more &rarr;
  </span>
</a>
```

---

## FILE: src/components/sections/ValuePropSection.astro

```astro
---
import SectionWrapper from '../SectionWrapper.astro';
---

<SectionWrapper id="value" background="elevated">
  <div data-animate>
    <h2 class="font-heading text-[var(--text-fluid-3xl)] text-titanium-white mb-12 text-balance">
      What you get when you work with us
    </h2>
  </div>

  <div class="grid md:grid-cols-3 gap-12">
    <div data-animate>
      <h3 class="font-heading text-[var(--text-fluid-xl)] text-titanium-white mb-4">
        Built from your actual location
      </h3>
      <p class="text-[var(--text-fluid-base)] text-shadow-gray">
        Every color is measured from your physical materials. Every shape is derived from data
        collected at your address. The design belongs to your space and could not be recreated
        for any other building.
      </p>
    </div>

    <div data-animate>
      <h3 class="font-heading text-[var(--text-fluid-xl)] text-titanium-white mb-4">
        You see it before we paint it
      </h3>
      <p class="text-[var(--text-fluid-base)] text-shadow-gray">
        We deliver a photorealistic render showing the finished work on your specific wall
        before a brush touches the surface. You approve it or we revise it. No surprises.
      </p>
    </div>

    <div data-animate>
      <h3 class="font-heading text-[var(--text-fluid-xl)] text-titanium-white mb-4">
        Documented provenance
      </h3>
      <p class="text-[var(--text-fluid-base)] text-shadow-gray">
        Every commission includes a Certificate of Provenance tracing each element to its origin.
        When someone asks about the mural or sign on your wall, you can prove exactly where
        every detail came from.
      </p>
    </div>
  </div>
</SectionWrapper>
```

---

## FILE: src/components/sections/GuideSection.astro

```astro
---
import SectionWrapper from '../SectionWrapper.astro';
---

<SectionWrapper id="guide" narrow>
  <div data-animate>
    <h2 class="font-heading text-[var(--text-fluid-3xl)] text-titanium-white mb-8 text-balance">
      We understand what is at stake.
    </h2>

    <div class="text-[var(--text-fluid-base)] text-shadow-gray space-y-6">
      <p>
        Commissioning a mural or restoring a sign is a significant investment. You need to know
        that the finished work will belong to your specific place in a way that cannot be
        replicated anywhere else.
      </p>
      <p>
        We have watched property owners spend real money on work that looks beautiful in a
        portfolio but feels wrong on their wall. We built our process to solve that problem.
      </p>
      <p>
        Untitled Mixed Media has delivered murals and sign work for commercial buildings, historic
        properties, and public spaces across Richmond. Our methodology is documented. Our results
        are permanent.
      </p>
    </div>
  </div>
</SectionWrapper>
```

---

## FILE: src/components/sections/StakesSection.astro

```astro
---
import SectionWrapper from '../SectionWrapper.astro';
---

<SectionWrapper id="stakes" narrow>
  <div data-animate>
    <h2 class="font-heading text-[var(--text-fluid-3xl)] text-titanium-white mb-8 text-balance">
      Your space is telling a story right now. Is it the right one?
    </h2>

    <div class="text-[var(--text-fluid-base)] text-shadow-gray space-y-6">
      <p>
        Blank walls signal vacancy. Faded signs suggest decline. Generic murals feel like they
        were ordered from a catalog and bolted on.
      </p>
      <p>
        In neighborhoods that are changing fast, the buildings that fail to show their history
        and character get overlooked, undervalued, and eventually replaced.
      </p>
      <p>
        Your space has a story worth telling. If you do not tell it, someone else will decide
        what your building means.
      </p>
    </div>
  </div>
</SectionWrapper>
```

---

## FILE: src/components/sections/ExplanatorySection.astro

```astro
---
import SectionWrapper from '../SectionWrapper.astro';
import Button from '../Button.astro';
---

<SectionWrapper id="about" narrow>
  <div data-animate>
    <h2 class="font-heading text-[var(--text-fluid-3xl)] text-titanium-white mb-8 text-balance">
      Most murals could be anywhere. Ours could only be here.
    </h2>

    <div class="text-[var(--text-fluid-base)] text-shadow-gray space-y-6">
      <p>
        There is a problem with most public art and commercial signage. It is generic.
      </p>
      <p>
        Walk through any commercial district in any city and you will find murals that could have
        been painted anywhere. Technically skilled, visually appealing, and completely interchangeable.
        The same is true of signs that get replaced with mass-produced vinyl or LED imitations of
        what was once hand-crafted and specific to a building's character.
      </p>
      <p>
        We built Untitled Mixed Media to solve that problem.
      </p>
      <p>
        Before we design anything, we go to the source. For a building, that means a full data
        collection session: photography from every angle and lighting condition, spectrometer
        readings measuring the actual color values of the physical materials, and a documented
        record of everything the space already contains. For a sign restoration, it means studying
        the original craftsmanship, matching the exact colors and letterforms, and bringing the
        sign back to what it was, not replacing it with something that looks close enough.
      </p>
      <p>
        Every color in the finished work was measured from the actual source. Every shape was
        derived from the data we collected. The design is built from the bottom up, not sketched
        and then applied.
      </p>
      <p>
        At the end of every project, you receive a Certificate of Provenance: a document tracing
        every element of the commission to its origin. It is the proof that what you commissioned
        could not have been made for any other wall, any other building, or any other story.
      </p>
      <p>
        We have delivered this process on commercial murals, sign restorations, and public art
        installations across Richmond, Virginia. The methodology is documented. The results are permanent.
      </p>
      <p class="text-titanium-white font-heading italic text-[var(--text-fluid-lg)]">
        The finished work is not applied to the building. It emerges from it.
      </p>
    </div>

    <div class="mt-12">
      <Button href="mailto:hello@untitledmixedmedia.com">
        Request Your Site Visit
      </Button>
    </div>
  </div>
</SectionWrapper>
```

---

## FILE: src/components/sections/CTASection.astro

```astro
---
import SectionWrapper from '../SectionWrapper.astro';
import Button from '../Button.astro';
---

<SectionWrapper id="contact" narrow class="text-center">
  <div data-animate>
    <h2 class="font-heading text-[var(--text-fluid-3xl)] text-titanium-white mb-6 text-balance">
      Your space has a story. Let us find it.
    </h2>

    <p class="text-[var(--text-fluid-base)] text-shadow-gray mb-10 max-w-xl mx-auto">
      Tell us about your building, your sign, or your space. We will visit your site, collect the
      data, and show you what is possible before you commit to anything.
    </p>

    <Button href="mailto:hello@untitledmixedmedia.com">
      Request Your Site Visit
    </Button>

    <p class="text-smoke-gray text-[var(--text-fluid-sm)] mt-6">
      Or email us directly:
      <a href="mailto:hello@untitledmixedmedia.com" class="underline underline-offset-4 hover:text-titanium-white transition-colors">
        hello@untitledmixedmedia.com
      </a>
    </p>
  </div>
</SectionWrapper>
```

---

## FILE: src/pages/index.astro

```
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import HeroSection from '../components/sections/HeroSection.astro';
import FeaturedGrid from '../components/sections/FeaturedGrid.astro';
import BrandMarquee from '../components/sections/BrandMarquee.astro';
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

    {/* 3. Brand Marquee — scrolling text rhythm break (Colossal Media pattern) */}
    <BrandMarquee />

    {/* 4. Credibility Strip — hard numbers */}
    <CredibilityStrip />

    {/* 5. Process — 3 steps with imagery */}
    <ProcessSection />

    {/* 6. Testimonial — full-width pull quote */}
    <TestimonialSection />

    {/* 7. Services — image-backed showcase cards */}
    <ServiceShowcase />

    {/* 8. Journal Preview — 3 recent posts, text-forward */}
    {journalPosts.length > 0 && (
      <section class="py-24 lg:py-32 px-6 lg:px-12 border-t border-slate-gray">
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
              <div data-animate="fade" data-animate-delay={String(i + 1)}>
                <JournalCard
                  title={post.data.title}
                  description={post.data.description}
                  href={`/journal/${post.id}`}
                  date={post.data.date}
                  tags={post.data.tags}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )}

    {/* 9. CTA Block — question-format final conversion */}
    <CTABlock
      headline="Have a wall that needs a story?"
      description="We'll visit your site, show you the design before we start, and paint it by hand. Free estimates, no obligation."
    />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/components/sections/HeroSection.astro

```
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
  <div class="absolute inset-0 bg-gradient-to-t from-bone-black via-bone-black/60 to-bone-black/10" aria-hidden="true"></div>

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
</section>

<style>
  @media (prefers-reduced-motion: reduce) {
    video { display: none; }
  }
</style>
```

---

## FILE: src/components/sections/FeaturedGrid.astro

```
---
import { getCollection } from 'astro:content';

const projects = (await getCollection('projects'))
  .filter((p) => p.data.featured)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 5);
---

<section class="pt-24 lg:pt-32 pb-4">
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
      const spans = [
        'lg:col-span-7 lg:row-span-2',
        'lg:col-span-5',
        'lg:col-span-5',
        'lg:col-span-5 lg:row-span-2',
        'lg:col-span-7',
      ];
      const aspects = [
        'aspect-[16/10]',
        'aspect-[4/3]',
        'aspect-[4/3]',
        'aspect-[3/4]',
        'aspect-[16/9]',
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

---

## FILE: src/components/sections/BrandMarquee.astro

```
---
interface Props {
  text?: string;
  speed?: string;
}

const {
  text = 'Always Hand Painted',
  speed = '25s',
} = Astro.props;

const repeated = Array(6).fill(text);
---

<section class="border-y border-slate-gray overflow-hidden py-6 lg:py-8" aria-hidden="true">
  <div class="marquee-track flex whitespace-nowrap" style={`--marquee-speed: ${speed};`}>
    {repeated.map((t) => (
      <span
        class="font-heading text-titanium-white/10 uppercase shrink-0 mx-8 lg:mx-12"
        style="font-size: var(--text-fluid-4xl); letter-spacing: var(--tracking-wider);"
      >
        {t}
      </span>
    ))}
    {repeated.map((t) => (
      <span
        class="font-heading text-titanium-white/10 uppercase shrink-0 mx-8 lg:mx-12"
        style="font-size: var(--text-fluid-4xl); letter-spacing: var(--tracking-wider);"
        aria-hidden="true"
      >
        {t}
      </span>
    ))}
  </div>
</section>

<style>
  .marquee-track {
    animation: marquee-scroll var(--marquee-speed, 25s) linear infinite;
  }

  @keyframes marquee-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee-track {
      animation: none;
    }
  }
</style>
```

---

## FILE: src/components/sections/CredibilityStrip.astro

```
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

---

## FILE: src/components/sections/ProcessSection.astro

```
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
          >
            {/* Image */}
            <div class={`overflow-hidden ${isReversed ? 'lg:[direction:ltr]' : ''}`} data-animate="reveal">
              <div class="aspect-[4/3] bg-midnight-graphite border border-slate-gray overflow-hidden">
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  class="w-full h-full object-cover"
                  loading="lazy"
                  onerror="this.style.display='none'"
                />
              </div>
            </div>

            {/* Text */}
            <div class={isReversed ? 'lg:[direction:ltr]' : ''} data-animate="fade">
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

---

## FILE: src/components/sections/TestimonialSection.astro

```
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
  {backgroundImage && (
    <div class="absolute inset-0" aria-hidden="true">
      <img
        src={backgroundImage}
        alt=""
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-bone-black/80"></div>
    </div>
  )}

  <div class="relative z-10 max-w-4xl mx-auto text-center" data-animate="fade">
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

---

## FILE: src/components/sections/ServiceShowcase.astro

```
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

<section class="pt-24 lg:pt-32 pb-4">
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
        <img
          src={service.image}
          alt={service.imageAlt}
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
          onerror="this.style.display='none'"
        />
        <div class="absolute inset-0 bg-midnight-graphite" aria-hidden="true"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-bone-black/90 via-bone-black/40 to-transparent" aria-hidden="true"></div>
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

---

## FILE: src/components/sections/PortfolioGrid.astro

```
---
import { getCollection } from 'astro:content';

const projects = (await getCollection('projects'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

// First project is featured (full-width), rest go in the 3-column row
const featured = projects[0];
const rest = projects.slice(1);

// Signs gallery is a separate page, included as a manual entry in the grid
const signsEntry = {
  title: 'Hand-Painted Signs',
  description: 'Lettering, gold leaf, and restoration work for businesses across Richmond.',
  cover: '/images/signs/signs-cover.jpg',
  tags: ['signs', 'lettering', 'gold leaf'],
  href: '/work/signs',
};
---

<section id="work" class="px-6 lg:px-12">
  <div data-animate>
    <p class="font-sans text-[var(--text-fluid-xs)] text-shadow-gray uppercase tracking-[var(--tracking-wider)] mb-12">
      Selected Work
    </p>
  </div>

  <!-- Featured project — full width -->
  {featured && (
    <a
      href={`/work/${featured.id}`}
      class="group block mb-6 overflow-hidden"
      data-animate
    >
      <div class="relative aspect-[16/9] overflow-hidden bg-midnight-graphite">
        <img
          src={featured.data.cover}
          alt={featured.data.title}
          class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          loading="eager"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-bone-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div class="mt-4 flex items-baseline justify-between gap-4">
        <h3 class="font-heading text-[var(--text-fluid-2xl)] text-titanium-white group-hover:text-soft-gray transition-colors">
          {featured.data.title}
        </h3>
        <div class="hidden sm:flex gap-3 shrink-0">
          {featured.data.tags.map((tag: string) => (
            <span class="font-mono text-[var(--text-fluid-xs)] text-smoke-gray uppercase tracking-[var(--tracking-wider)]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )}

  <!-- Remaining projects — 3-column grid -->
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {rest.map((project) => (
      <a
        href={`/work/${project.id}`}
        class="group block overflow-hidden"
        data-animate
      >
        <div class="relative aspect-[4/3] overflow-hidden bg-midnight-graphite">
          <img
            src={project.data.cover}
            alt={project.data.title}
            class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </div>
        <div class="mt-4">
          <h3 class="font-heading text-[var(--text-fluid-lg)] text-titanium-white group-hover:text-soft-gray transition-colors">
            {project.data.title}
          </h3>
          <div class="flex gap-2 mt-1">
            {project.data.tags.map((tag: string) => (
              <span class="font-mono text-[var(--text-fluid-xs)] text-smoke-gray uppercase tracking-[var(--tracking-wider)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    ))}

    <!-- Signs gallery card -->
    <a
      href={signsEntry.href}
      class="group block overflow-hidden"
      data-animate
    >
      <div class="relative aspect-[4/3] overflow-hidden bg-midnight-graphite">
        <img
          src={signsEntry.cover}
          alt={signsEntry.title}
          class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>
      <div class="mt-4">
        <h3 class="font-heading text-[var(--text-fluid-lg)] text-titanium-white group-hover:text-soft-gray transition-colors">
          {signsEntry.title}
        </h3>
        <div class="flex gap-2 mt-1">
          {signsEntry.tags.map((tag) => (
            <span class="font-mono text-[var(--text-fluid-xs)] text-smoke-gray uppercase tracking-[var(--tracking-wider)]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  </div>
</section>
```

---

## FILE: src/components/sections/PortfolioPreview.astro

```
---
import { getCollection } from 'astro:content';
import SectionWrapper from '../SectionWrapper.astro';
import ProjectCard from '../ProjectCard.astro';

const projects = (await getCollection('projects'))
  .filter((p) => p.data.featured)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);
---

<SectionWrapper id="work" background="elevated">
  <div data-animate>
    <h2 class="font-heading text-[var(--text-fluid-3xl)] text-titanium-white mb-16">
      Recent work
    </h2>
  </div>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {projects.map((project) => (
      <div data-animate>
        <ProjectCard project={project} />
      </div>
    ))}
  </div>
</SectionWrapper>
```

---

## FILE: src/components/JournalCard.astro

```
---
interface Props {
  title: string;
  description: string;
  href: string;
  date: Date;
  tags?: string[];
}

const { title, description, href, date, tags } = Astro.props;

const formattedDate = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---

<a
  href={href}
  class="group block"
>
  <div class="flex items-baseline gap-4 mb-3">
    <time
      datetime={date.toISOString().split('T')[0]}
      class="font-mono text-smoke-gray uppercase shrink-0"
      style="font-size: var(--text-fluid-xs);"
    >
      {formattedDate}
    </time>
    {tags && tags.length > 0 && (
      <div class="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <span
            class="font-mono text-smoke-gray/60 uppercase"
            style="font-size: var(--text-fluid-xs);"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>

  <h3
    class="font-heading text-titanium-white group-hover:text-soft-gray transition-colors duration-200 mb-3"
    style="font-size: var(--text-fluid-xl);"
  >
    {title}
  </h3>

  <p
    class="font-body text-shadow-gray"
    style="font-size: var(--text-fluid-base);"
  >
    {description}
  </p>

  <span
    class="inline-block font-mono text-smoke-gray uppercase mt-4 group-hover:text-titanium-white transition-colors duration-200"
    style="font-size: var(--text-fluid-xs);"
  >
    Read &rarr;
  </span>
</a>
```

---

## FILE: src/components/CTABlock.astro

```
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

---

## FILE: src/components/Footer.astro

```
---

---

<footer class="border-t border-slate-gray mt-auto" role="contentinfo">
  <div class="mx-auto max-w-7xl px-6 lg:px-12 py-16">
    <!-- Link Columns -->
    <nav aria-label="Footer navigation" class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      <!-- Services -->
      <div>
        <p class="font-mono text-smoke-gray uppercase tracking-[0.08em] mb-6" style="font-size: var(--text-fluid-xs);">Services</p>
        <ul>
          <li class="mb-3"><a href="/murals" class="font-body text-shadow-gray hover:text-titanium-white transition-colors block" style="font-size: var(--text-fluid-sm);">Murals</a></li>
          <li class="mb-3"><a href="/hand-painted-signs" class="font-body text-shadow-gray hover:text-titanium-white transition-colors block" style="font-size: var(--text-fluid-sm);">Hand-Painted Signs</a></li>
          <li class="mb-3"><a href="/hand-painted-signs/sign-restoration" class="font-body text-shadow-gray hover:text-titanium-white transition-colors block" style="font-size: var(--text-fluid-sm);">Sign Restoration</a></li>
          <li class="mb-3"><a href="/price-estimator" class="font-body text-shadow-gray hover:text-titanium-white transition-colors block" style="font-size: var(--text-fluid-sm);">Price Estimator</a></li>
        </ul>
      </div>

      <!-- Learn More -->
      <div>
        <p class="font-mono text-smoke-gray uppercase tracking-[0.08em] mb-6" style="font-size: var(--text-fluid-xs);">Learn More</p>
        <ul>
          <li class="mb-3"><a href="/journal" class="font-body text-shadow-gray hover:text-titanium-white transition-colors block" style="font-size: var(--text-fluid-sm);">Journal</a></li>
          <li class="mb-3"><a href="/murals/mural-cost-richmond-va" class="font-body text-shadow-gray hover:text-titanium-white transition-colors block" style="font-size: var(--text-fluid-sm);">Mural Cost Guide</a></li>
          <li class="mb-3"><a href="/hand-painted-signs/hand-painted-vs-vinyl" class="font-body text-shadow-gray hover:text-titanium-white transition-colors block" style="font-size: var(--text-fluid-sm);">Hand-Painted vs Vinyl</a></li>
          <li class="mb-3"><a href="/hand-painted-signs/sign-restoration/ghost-signs-richmond-va" class="font-body text-shadow-gray hover:text-titanium-white transition-colors block" style="font-size: var(--text-fluid-sm);">Ghost Signs Richmond</a></li>
        </ul>
      </div>

      <!-- Company -->
      <div>
        <p class="font-mono text-smoke-gray uppercase tracking-[0.08em] mb-6" style="font-size: var(--text-fluid-xs);">Company</p>
        <ul>
          <li class="mb-3"><a href="/about" class="font-body text-shadow-gray hover:text-titanium-white transition-colors block" style="font-size: var(--text-fluid-sm);">About</a></li>
          <li class="mb-3"><a href="/about/process" class="font-body text-shadow-gray hover:text-titanium-white transition-colors block" style="font-size: var(--text-fluid-sm);">Process</a></li>
          <li class="mb-3"><a href="/about/philosophy" class="font-body text-shadow-gray hover:text-titanium-white transition-colors block" style="font-size: var(--text-fluid-sm);">Philosophy</a></li>
          <li class="mb-3"><a href="/about/insurance-and-licensing" class="font-body text-shadow-gray hover:text-titanium-white transition-colors block" style="font-size: var(--text-fluid-sm);">Insurance & Licensing</a></li>
        </ul>
      </div>

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
    </nav>

    <!-- Philosophy -->
    <div class="max-w-2xl mb-12">
      <p class="font-heading text-titanium-white mb-4 italic" style="font-size: var(--text-fluid-lg);">
        Meaning discovered, not imposed.
      </p>
      <p class="font-body text-shadow-gray leading-relaxed" style="font-size: var(--text-fluid-sm);">
        Places become distinctive landmarks when meaning is discovered from them, not imposed on them.
        We discover the meaning already present in your place and transform it into distinctive public art.
      </p>
    </div>

    <!-- Info Row -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-8 border-t border-slate-gray">
      <div class="font-sans text-shadow-gray tracking-wide" style="font-size: var(--text-fluid-xs);">
        <p>Based in Richmond, Virginia</p>
        <p>
          <a href="mailto:hello@untitledmixedmedia.com" class="hover:text-titanium-white transition-colors">
            hello@untitledmixedmedia.com
          </a>
        </p>
      </div>

      <!-- Social -->
      <div class="flex items-center gap-6">
        <a
          href="https://www.instagram.com/untitledmixedmedia/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-shadow-gray hover:text-titanium-white transition-colors"
          aria-label="Untitled Mixed Media on Instagram"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </a>
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
      </div>
    </div>

    <!-- Copyright -->
    <p class="font-sans text-smoke-gray tracking-wide mt-8" style="font-size: var(--text-fluid-xs);">
      &copy; 2026 Untitled Mixed Media LLC. All rights reserved.
    </p>
  </div>
</footer>
```

---

## FILE: src/components/Nav.astro

```
---
const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];
---

<a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-titanium-white focus:text-bone-black focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-medium focus:tracking-[0.15em] focus:uppercase">
  Skip to content
</a>
<header class="fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter] duration-300" id="main-nav">
  <nav aria-label="Main navigation" class="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
    <!-- Logo -->
    <a href="/" class="text-titanium-white font-blackletter text-xl tracking-wide hover:opacity-80 transition-opacity">
      untitled<span class="font-heading font-normal"> mixed media</span>
    </a>

    <!-- Desktop Nav -->
    <ul class="hidden md:flex items-center gap-8">
      {navLinks.map((link) => (
        <li>
          <a
            href={link.href}
            class="font-sans text-soft-gray text-sm tracking-[0.15em] uppercase hover:text-titanium-white transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>

    <!-- Desktop CTA -->
    <a href="/price-estimator" class="hidden md:inline-block bg-titanium-white text-bone-black font-sans px-6 py-2.5 text-sm font-medium tracking-[0.15em] uppercase hover:bg-light-ash transition-colors">
      Get an Estimate
    </a>

    <!-- Mobile Menu Button -->
    <button
      class="md:hidden text-titanium-white p-2"
      id="mobile-menu-btn"
      aria-label="Toggle menu"
      aria-expanded="false"
      aria-controls="mobile-menu"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="menu-icon" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="close-icon" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </nav>

  <!-- Mobile Menu -->
  <div class="hidden md:hidden bg-bone-black/95 backdrop-blur-md border-t border-slate-gray" id="mobile-menu" role="region" aria-label="Mobile navigation">
    <ul class="flex flex-col items-center gap-6 py-8">
      {navLinks.map((link) => (
        <li>
          <a
            href={link.href}
            class="font-sans text-soft-gray text-base tracking-[0.15em] uppercase hover:text-titanium-white transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
    <div class="flex justify-center pb-8">
      <a href="/price-estimator" class="inline-block bg-titanium-white text-bone-black font-sans px-8 py-3.5 text-sm font-medium tracking-[0.15em] uppercase hover:bg-light-ash transition-colors">
        Get an Estimate
      </a>
    </div>
  </div>
</header>

<script>
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const nav = document.getElementById('main-nav');

  btn?.addEventListener('click', () => {
    const isOpen = menu?.classList.toggle('hidden') === false;
    menuIcon?.classList.toggle('hidden', isOpen);
    closeIcon?.classList.toggle('hidden', !isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  function closeMenu() {
    menu?.classList.add('hidden');
    menuIcon?.classList.remove('hidden');
    closeIcon?.classList.add('hidden');
    btn?.setAttribute('aria-expanded', 'false');
    btn?.focus();
  }

  // Close mobile menu on link click
  menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu?.classList.contains('hidden')) {
      closeMenu();
    }
  });

  // Nav background on scroll — passive listener, classList toggle is compositor-friendly
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          nav?.classList.add('bg-bone-black/90', 'backdrop-blur-md');
        } else {
          nav?.classList.remove('bg-bone-black/90', 'backdrop-blur-md');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
</script>
```

---

## FILE: src/components/Button.astro

```
---
interface Props {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  class?: string;
}

const {
  href = 'mailto:hello@untitledmixedmedia.com',
  variant = 'primary',
  class: className = '',
} = Astro.props;

const variants = {
  primary: 'bg-titanium-white text-bone-black hover:bg-light-ash',
  secondary: 'border border-soft-gray text-soft-gray hover:border-titanium-white hover:text-titanium-white',
  ghost: 'text-soft-gray hover:text-titanium-white underline underline-offset-4',
};
---

<a
  href={href}
  class:list={[
    'font-sans inline-block px-8 py-3.5 text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-200',
    variants[variant],
    className,
  ]}
>
  <slot />
</a>
```

---

## FILE: src/components/Breadcrumb.astro

```
---
interface Props {
  items: { label: string; href?: string }[];
}

const { items } = Astro.props;
---

<nav aria-label="Breadcrumb" class="mb-8">
  <ol class="flex items-center gap-2 font-mono uppercase" style={`font-size: var(--text-fluid-xs);`}>
    {items.map((item, i) => (
      <li class="flex items-center gap-2">
        {i > 0 && <span class="text-smoke-gray" aria-hidden="true">/</span>}
        {item.href ? (
          <a href={item.href} class="text-smoke-gray hover:text-soft-gray transition-colors duration-200">
            {item.label}
          </a>
        ) : (
          <span class="text-soft-gray" aria-current="page">{item.label}</span>
        )}
      </li>
    ))}
  </ol>
</nav>
```

---

## FILE: src/components/RelatedPages.astro

```
---
interface Props {
  pages: { title: string; href: string; description?: string }[];
  heading?: string;
}

const { pages, heading = 'Related' } = Astro.props;
---

<section class="py-[var(--spacing-section)] px-6 lg:px-12 border-t border-slate-gray">
  <h2 class="font-mono text-smoke-gray uppercase mb-8" style={`font-size: var(--text-fluid-xs);`}>
    {heading}
  </h2>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
    {pages.map((page) => (
      <a
        href={page.href}
        class="group block border border-slate-gray p-6 hover:border-soft-gray transition-colors duration-200"
      >
        <h3 class="font-heading text-titanium-white mb-2" style={`font-size: var(--text-fluid-lg);`}>
          {page.title}
        </h3>
        {page.description && (
          <p class="font-body text-smoke-gray" style={`font-size: var(--text-fluid-sm);`}>
            {page.description}
          </p>
        )}
      </a>
    ))}
  </div>
</section>
```

---

## FILE: src/components/FAQSection.astro

```
---
interface Props {
  items: { question: string; answer: string }[];
  heading?: string;
}

const { items, heading = 'Frequently asked questions' } = Astro.props;
---

<section class="py-[var(--spacing-section)] px-6 lg:px-12">
  <h2 class="font-heading text-titanium-white mb-12" style={`font-size: var(--text-fluid-2xl);`}>
    {heading}
  </h2>
  <dl class="max-w-3xl divide-y divide-slate-gray">
    {items.map((item) => (
      <div class="py-8 first:pt-0 last:pb-0">
        <dt class="font-heading text-titanium-white mb-3" style={`font-size: var(--text-fluid-lg);`}>
          {item.question}
        </dt>
        <dd class="font-body text-shadow-gray" style={`font-size: var(--text-fluid-base);`}>
          {item.answer}
        </dd>
      </div>
    ))}
  </dl>
</section>
```

---

## FILE: src/layouts/BaseLayout.astro

```
---
interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
}

const {
  title = 'Untitled Mixed Media — Hand-Painted Murals & Signs | Richmond, VA',
  description = 'Hand-painted murals and signs built from your actual location. Landmarks, not lookalikes. Richmond, Virginia.',
  ogImage = '/og-image.png',
  ogType = 'website',
  noindex = false,
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);

import '../styles/global.css';
---

<!doctype html>
<html lang="en" data-theme="umm">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="generator" content={Astro.generator} />

    <title>{title}</title>
    <meta name="description" content={description} />
    {noindex && <meta name="robots" content="noindex,nofollow" />}
    <link rel="canonical" href={canonicalURL} />

    <!-- Open Graph -->
    <meta property="og:type" content={ogType} />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(ogImage, Astro.site)} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL(ogImage, Astro.site)} />

    <!-- Fonts — preload critical paths -->
    <link rel="preload" href="/fonts/woff2/LyonText-Regular.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/woff2/Canela-Regular.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/woff2/Gotham-Book.woff2" as="font" type="font/woff2" crossorigin />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <slot name="head" />
  </head>
  <body class="min-h-screen flex flex-col" id="main-content">
    <slot />

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
  </body>
</html>
```

---

## FILE: src/content.config.ts

```
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string(),
    images: z.array(z.string()).optional(),
    tags: z.array(z.string()),
    date: z.date(),
    featured: z.boolean().default(false),
    client: z.string().optional(),
    location: z.string().optional(),
    materials: z.string().optional(),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    author: z.string().default('Spencer Bennett'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects, journal };
```

---

## FILE: src/pages/about/index.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import ServiceCard from '../../components/ServiceCard.astro';
---

<BaseLayout
  title="About — Untitled Mixed Media"
  description="Hand-painted murals and signs in Richmond, Virginia. We start with your building's story, not a template."
>
  <Nav />
  <main class="pt-24 pb-16 px-6 lg:px-12">
    <div class="max-w-7xl mx-auto">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'About' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-4" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">
        About
      </p>

      <!-- NOTE TO COPYWRITER: This page is NOT Spencer's biography. It's about the client's transformation.
           The headline should make the visitor feel understood — then establish UMM as the guide.
           StoryBrand: Open with empathy, then authority. The visitor is the hero, not UMM. -->
      <h1 class="font-heading text-titanium-white mb-6 text-balance" data-animate>
        [Placeholder: Write an empathy-first headline. NOT "About Spencer Bennett."
        Something like: "We know what it looks like when a great business has a forgettable building."]
      </h1>

      <!-- PLACEHOLDER COPY: StoryBrand structure for the About page.
           Paragraph 1 — Empathy: "We know what it feels like to pour everything into your work,
           only to watch people walk right past the front door." Show you understand the problem.
           Paragraph 2 — Authority: Establish credentials without making it about you. Years of experience,
           materials expertise, completed projects, insurance, licensing. Facts, not feelings.
           Paragraph 3 — Bridge to subpages: "Here's how we work and what we believe." -->
      <div class="font-body text-shadow-gray mb-16 max-w-2xl space-y-6" style="font-size: var(--text-fluid-lg);" data-animate>
        <p>
          [Placeholder — Empathy paragraph: Open with the client's frustration. They've invested in their
          business but the building doesn't reflect it. People drive past. The exterior doesn't match the
          interior experience. Start here — make them feel seen before you talk about yourself.]
        </p>
        <p>
          [Placeholder — Authority paragraph: Establish UMM's credibility. Years painting, number of
          completed projects, materials knowledge (KEIM mineral paint, gold leaf, One Shot enamel),
          insurance coverage, historic district experience. Facts that build trust without bragging.]
        </p>
      </div>

      <div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
        <div data-animate="fade" data-animate-delay="1">
          <ServiceCard
            title="Process"
            description="How we discover the story your building already holds."
            href="/about/process"
          />
        </div>
        <div data-animate="fade" data-animate-delay="2">
          <ServiceCard
            title="Philosophy"
            description="Why we start with discovery, not design."
            href="/about/philosophy"
          />
        </div>
        <div data-animate="fade" data-animate-delay="3">
          <ServiceCard
            title="Insurance & Licensing"
            description="Credentials, coverage, and compliance."
            href="/about/insurance-and-licensing"
          />
        </div>
      </div>
    </div>
  </main>

  <CTABlock />

  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/about/process.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Our Process — The Provenance Method | Untitled Mixed Media" description="Discovery, design, execution, completion. The four phases of every Untitled Mixed Media project, from site visit to Certificate of Provenance.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Process' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        About
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Our Process — The Provenance Method
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          Every project begins with the place itself. We do not start with a mood board or a Pinterest collection. We start with your building, your neighborhood, your story. The design comes from the site, not from a template. This is the Provenance Method: discovery first, design second, execution third, proof always.
        </p>
      </div>

      <!-- Phase 1: Discovery -->
      <div class="space-y-10 mb-16">
        <div>
          <p class="font-mono text-smoke-gray uppercase mb-2" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Phase 1</p>
          <h2 class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-2xl); line-height: 1.2;">
            Discovery
          </h2>
          <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
            We visit the site in person. This is not a quick measurement trip. We photograph the wall with RealityCapture photogrammetry. We study the neighborhood context, the building materials, the light at different times of day. We talk with you about the building's history and what the space means to the people who use it. The design starts here, rooted in real observation.
          </p>
        </div>

        <div>
          <p class="font-mono text-smoke-gray uppercase mb-2" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Phase 2</p>
          <h2 class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-2xl); line-height: 1.2;">
            Design — Blender Pre-Visualization
          </h2>
          <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
            Using the photogrammetry data from the site visit, we build a photorealistic 3D render of the mural or sign on your actual wall. Camera matching with fSpy, dual UV paint system in Blender, Magnific upscaling, and DaVinci Resolve color grading produce an image that shows you exactly what the finished piece will look like on your building. You approve the design before any paint is mixed.
          </p>
        </div>

        <div>
          <p class="font-mono text-smoke-gray uppercase mb-2" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Phase 3</p>
          <h2 class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-2xl); line-height: 1.2;">
            Execution — Hand-Painting
          </h2>
          <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
            The approved design is transferred to the wall and painted by hand. Professional-grade materials selected for the specific surface and exposure conditions. Every phase is documented with process photography. No shortcuts, no vinyl wraps, no projector tracing of stock images. The work is done the way it was done for a hundred years, with better materials.
          </p>
        </div>

        <div>
          <p class="font-mono text-smoke-gray uppercase mb-2" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Phase 4</p>
          <h2 class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-2xl); line-height: 1.2;">
            Completion
          </h2>
          <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
            The finished work receives a protective clear coat system appropriate to the surface and exposure. You receive a Certificate of Provenance documenting the work's origin, materials, creation timeline, GPS-stamped photographs, spectrophotometer color readings, and signed artist authentication. The certificate supports insurance documentation, preservation board requirements, and creates a permanent historical record.
          </p>
        </div>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a photo or rendering showing the Blender pre-visualization process alongside the finished painted wall. The before/after comparison is the visual proof of the methodology. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <RelatedPages heading="Related" pages={[
      { title: 'Philosophy', href: '/about/philosophy', description: 'Why we start with discovery, not design.' },
      { title: 'Insurance & Licensing', href: '/about/insurance-and-licensing', description: 'Credentials, coverage, and compliance.' },
      { title: 'Murals', href: '/murals', description: 'Hand-painted murals in Richmond, VA.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/about/philosophy.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Philosophy — Meaning Discovered, Not Imposed | Untitled Mixed Media" description="Places become distinctive when meaning is discovered from them, not imposed on them. The philosophy behind every Untitled Mixed Media project.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Philosophy' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        About
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Meaning Discovered, Not Imposed
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          Every building has a story it is already telling. The brickwork, the neighborhood, the light, the people who pass by every day. Most muralists arrive with a portfolio of designs and look for a wall to put them on. We arrive with questions and look for the answers the place already holds.
        </p>
      </div>

      <!-- Discovery Over Imposition -->
      <div class="space-y-10 mb-16">
        <div>
          <h2 class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-2xl); line-height: 1.2;">
            Discovery Over Imposition
          </h2>
          <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
            The difference between a mural that belongs and one that merely occupies space is where the idea came from. When the concept is discovered from the site itself, from the history of the building, the character of the street, the materials underfoot, the work becomes inseparable from its location. It could not exist anywhere else. That specificity is what makes public art meaningful rather than decorative.
          </p>
        </div>

        <div>
          <h2 class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-2xl); line-height: 1.2;">
            Craft Over Production
          </h2>
          <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
            Hand-painting is slower than printing. It is more expensive than vinyl. It requires years of training that cannot be automated or outsourced. That is exactly the point. A hand-painted sign or mural carries evidence of human decision-making in every brushstroke. The slight variations in letterforms, the way pigment sits differently on textured brick versus smooth plaster, the subtle shifts in density where the painter adjusted pressure. These are not imperfections. They are proof that a human being made this, here, for this place.
          </p>
        </div>

        <div>
          <h2 class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-2xl); line-height: 1.2;">
            Landmarks, Not Lookalikes
          </h2>
          <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
            A landmark is something people navigate by. It is the mural on the corner that tells you where to turn, the sign that has been there so long it has become part of the neighborhood's identity. A lookalike is something you scroll past because you have seen it in every other city. We build landmarks. Work that is so rooted in its location that removing it would leave a visible gap in the streetscape.
          </p>
        </div>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a photo that captures the relationship between a finished piece and its surroundings. The image should show context, not just the mural in isolation. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <RelatedPages heading="Related" pages={[
      { title: 'Our Process', href: '/about/process', description: 'The Provenance Method from discovery to completion.' },
      { title: 'About', href: '/about', description: 'Untitled Mixed Media — hand-painted murals and signs in Richmond, VA.' },
      { title: 'Murals', href: '/murals', description: 'Hand-painted murals in Richmond, VA.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/about/insurance-and-licensing.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Insurance & Licensing | Untitled Mixed Media" description="General liability insurance, commercial auto coverage, Virginia contractor licensing, and workers compensation. The professional credentials behind every project.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Insurance & Licensing' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        About
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Insurance & Licensing
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          Hiring someone to work on your building is a liability decision as much as a creative one. You need to know the person on the scaffolding is insured, licensed, and operating legally. Here is what we carry and why it matters.
        </p>
      </div>

      <!-- Why It Matters -->
      <div class="space-y-10 mb-16">
        <div>
          <h2 class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-2xl); line-height: 1.2;">
            Why It Matters
          </h2>
          <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
            Mural and sign work happens on other people's property, often at height, often in public spaces. If the painter is uninsured and something goes wrong, the property owner absorbs the liability. An unlicensed contractor can void your building's insurance coverage entirely. These are not edge cases. Property managers, commercial landlords, and municipal clients require proof of coverage before work begins, and they should.
          </p>
        </div>

        <!-- What We Carry -->
        <div>
          <h2 class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-2xl); line-height: 1.2;">
            What We Carry
          </h2>
          <div class="space-y-4">
            <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
              <strong class="text-titanium-white">General Liability Insurance</strong> — Covers property damage, bodily injury, and completed operations. If paint drips on a car, if a passerby is injured near the work site, if a completed mural causes damage after the project is done, the policy responds. Certificates of insurance are provided to every client before work begins.
            </p>
            <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
              <strong class="text-titanium-white">Commercial Auto Insurance</strong> — Covers the vehicle used to transport equipment, scaffolding, and materials to job sites. Standard personal auto policies exclude commercial use.
            </p>
            <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
              <strong class="text-titanium-white">Virginia Contractor License</strong> — Untitled Mixed Media LLC is a registered Virginia contractor. This matters for commercial and government projects where licensing is a prerequisite for bidding.
            </p>
            <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
              <strong class="text-titanium-white">Workers Compensation</strong> — Carried when subcontractors are engaged on a project. Required by Virginia law for employers, and required by most commercial property managers regardless.
            </p>
          </div>
        </div>

        <!-- Working With Property Managers -->
        <div>
          <h2 class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-2xl); line-height: 1.2;">
            Working With Property Managers
          </h2>
          <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
            If you manage commercial property, you already know the drill. We provide certificates of insurance naming your entity as additional insured. We carry the coverage limits your management company requires. We coordinate access schedules, comply with site safety requirements, and maintain clean work areas. The administrative side of the project should be as professional as the creative side.
          </p>
        </div>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a photo of professional site setup: scaffolding, drop cloths, safety equipment. The image should communicate professionalism and preparedness. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <RelatedPages heading="Related" pages={[
      { title: 'Our Process', href: '/about/process', description: 'The Provenance Method from discovery to completion.' },
      { title: 'Philosophy', href: '/about/philosophy', description: 'Why we start with discovery, not design.' },
      { title: 'Contact', href: '/contact', description: 'Get in touch to discuss your project.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/murals/index.astro

```
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import ServiceCard from '../../components/ServiceCard.astro';

const muralProjects = (await getCollection('projects'))
  .filter((p) => p.data.tags.some((t: string) => t.toLowerCase().includes('mural')))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<BaseLayout
  title="Murals — Untitled Mixed Media | Richmond VA Mural Painter"
  description="Hand-painted murals for businesses, property owners, and public spaces in Richmond, Virginia. Every mural starts with your building's story."
>
  <Nav />
  <main class="pt-24 pb-16 px-6 lg:px-12">
    <div class="max-w-7xl mx-auto">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Murals' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-4" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">
        Murals
      </p>

      <!-- TODO: Write the identity-transformation headline for murals.
           StoryBrand: Character = business or property owner. Problem = their building looks anonymous,
           blends into the block, doesn't stop anyone. Guide = UMM with the provenance methodology —
           we study the building, the neighborhood, and the history before we ever sketch.
           Plan = site visit → discovery → render → paint. Success = a building people photograph,
           remember, and use as a landmark. -->
      <h1 class="font-heading text-titanium-white mb-6 text-balance" data-animate>
        [Placeholder: Write the identity-transformation headline for murals here.
        Not "We paint murals." Something that speaks to the outcome — the building becomes a landmark.]
      </h1>

      <!-- PLACEHOLDER COPY: 2-3 sentences about the mural service.
           Character: business/property owner who has invested in their space but the exterior doesn't match.
           External problem: the building looks like every other building on the block.
           Internal problem: it feels like the business is invisible.
           Philosophical problem: a great business deserves a building that reflects it.
           Guide: UMM discovers the mural from the building's own story — neighborhood, history, architecture.
           Plan: Site visit → discovery → photorealistic Blender render → paint.
           Success: People photograph your building. They use it as a landmark. They remember it. -->
      <p class="font-body text-shadow-gray mb-16 max-w-2xl" style="font-size: var(--text-fluid-lg);" data-animate>
        [Placeholder: Write 2-3 sentences that make the building owner feel understood, then introduce
        UMM's provenance approach — we start with your building, not a catalog of designs.]
      </p>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-[var(--spacing-section)]">
        <div data-animate="fade" data-animate-delay="1">
          <ServiceCard
            title="Business Murals Richmond VA"
            description="[Placeholder: Exterior and interior murals that turn storefronts into destinations.]"
            href="/murals/business-murals-richmond-va"
          />
        </div>
        <div data-animate="fade" data-animate-delay="2">
          <ServiceCard
            title="Outdoor Murals Richmond VA"
            description="[Placeholder: Weather-resistant exterior murals built for Virginia's four-season climate.]"
            href="/murals/outdoor-murals-richmond-va"
          />
        </div>
        <div data-animate="fade" data-animate-delay="3">
          <ServiceCard
            title="Property Owner Murals"
            description="[Placeholder: Murals that increase property value and attract quality tenants.]"
            href="/murals/property-owner-murals-richmond-va"
          />
        </div>
        <div data-animate="fade" data-animate-delay="1">
          <ServiceCard
            title="Mural Cost Richmond VA"
            description="[Placeholder: Transparent pricing — what determines cost and what to expect.]"
            href="/murals/mural-cost-richmond-va"
          />
        </div>
        <div data-animate="fade" data-animate-delay="2">
          <ServiceCard
            title="Indoor Murals Richmond VA"
            description="[Placeholder: Interior murals for restaurants, offices, lobbies, and retail.]"
            href="/murals/indoor-murals-richmond-va"
          />
        </div>
        <div data-animate="fade" data-animate-delay="3">
          <ServiceCard
            title="Real Estate Developer Murals"
            description="[Placeholder: Large-scale murals for mixed-use, multifamily, and commercial developments.]"
            href="/murals/real-estate-developer-murals"
          />
        </div>
        <div data-animate="fade" data-animate-delay="1">
          <ServiceCard
            title="Public Art Murals Richmond VA"
            description="[Placeholder: Community murals, percent-for-art commissions, and civic installations.]"
            href="/murals/public-art-murals-richmond-va"
          />
        </div>
        <div data-animate="fade" data-animate-delay="2">
          <ServiceCard
            title="Mural Maintenance"
            description="[Placeholder: How to protect your investment — cleaning, sealing, and touch-up schedules.]"
            href="/murals/mural-maintenance"
          />
        </div>
      </div>

      <!-- Featured Projects -->
      {muralProjects.length > 0 && (
        <section class="border-t border-slate-gray pt-[var(--spacing-section)] mb-[var(--spacing-section)]">
          <h2 class="font-mono text-smoke-gray uppercase mb-8" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">
            Featured Projects
          </h2>
          <div class="grid sm:grid-cols-2 gap-6">
            {muralProjects.map((project) => (
              <a href={`/murals/${project.id}`} class="group block overflow-hidden" data-animate>
                <div class="aspect-[4/3] overflow-hidden bg-midnight-graphite">
                  <img
                    src={project.data.cover}
                    alt={project.data.title}
                    class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
                <div class="mt-4 mb-8">
                  <h3 class="font-heading text-titanium-white group-hover:text-soft-gray transition-colors" style="font-size: var(--text-fluid-xl);">
                    {project.data.title}
                  </h3>
                  <div class="flex gap-2 mt-1">
                    {project.data.tags.map((tag: string) => (
                      <span class="font-mono text-smoke-gray uppercase" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <!-- Cross-hub link -->
      <p class="font-body text-shadow-gray mb-16" style="font-size: var(--text-fluid-lg);">
        We also paint <a href="/hand-painted-signs" class="text-titanium-white underline underline-offset-4 hover:text-soft-gray transition-colors duration-200">hand-painted signs</a>.
      </p>
    </div>
  </main>

  <CTABlock />

  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/murals/business-murals-richmond-va.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Business Murals in Richmond, VA | Untitled Mixed Media" description="Hand-painted business murals in Richmond, VA. Custom exterior and interior murals that drive foot traffic, build brand identity, and transform commercial spaces.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Murals', href: '/murals' },
        { label: 'Business Murals' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Murals
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Business Murals in Richmond, VA
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> Write 2-3 sentences identifying the business owner in Richmond who wants their storefront, restaurant, brewery, or retail space to stand out. They want more foot traffic, stronger brand recognition, and a space that customers photograph and share. They are tired of blending in with every other business on the block.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> Their building exterior is forgettable. Pedestrians and drivers pass by without stopping. There is nothing visually compelling to draw people in or make the location memorable.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They feel invisible in a competitive market. They worry their space does not reflect the quality of what they actually offer inside.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> A great business deserves to be seen. The exterior should match the effort and care that goes into everything inside.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> Express empathy for how hard it is to differentiate a physical location in a crowded market. Demonstrate authority through completed commercial mural projects, knowledge of commercial paint systems, and the Blender pre-visualization process that lets the owner see the mural on their actual wall before any paint is applied.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> A landmark location that attracts foot traffic, generates social media content from customers, and becomes synonymous with the brand. The mural pays for itself in visibility.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> Another year of blending in. Competitors with bolder visual presence continue to capture attention and customers. The building remains forgettable.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a project photo here showing a completed commercial mural on a business exterior — restaurant, brewery, or retail storefront. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'How much does a business mural cost?', answer: 'Commercial mural pricing depends on wall size, complexity, surface condition, and access requirements. Simple brand murals start around $18-28 per square foot, while detailed illustrative work ranges from $45-70 per square foot. Visit our pricing page for a detailed breakdown or use our free price estimator.' },
      { question: 'How long does it take to paint a business mural?', answer: 'Most commercial murals take 1-3 weeks from first paint to final seal, depending on scale and complexity. We schedule around your business hours when possible to minimize disruption. The full process — from site visit through design approval to completed mural — typically runs 4-8 weeks.' },
      { question: 'Will the mural process disrupt my business?', answer: 'We coordinate scheduling to minimize impact on your operations. Exterior murals rarely affect interior business at all. For interior murals, we can work during off-hours or closed days. We handle all equipment setup and cleanup so your team can focus on running the business.' },
      { question: 'How does the design process work?', answer: 'After a site visit and discovery conversation, we create a photorealistic 3D mockup showing the mural on your actual wall using our Blender pre-visualization process. You see exactly what the finished piece will look like before we start painting. Revisions happen in the digital phase, not on the wall.' },
    ]} />
    <RelatedPages heading="Related" pages={[
      { title: 'Outdoor Murals', href: '/murals/outdoor-murals-richmond-va', description: 'Weather-durable exterior murals built to last.' },
      { title: 'Indoor Murals', href: '/murals/indoor-murals-richmond-va', description: 'Interior murals for restaurants, offices, and retail.' },
      { title: 'Mural Cost', href: '/murals/mural-cost-richmond-va', description: 'Transparent pricing for every scale and style.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/murals/mural-cost-richmond-va.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
import Button from '../../components/Button.astro';
---

<BaseLayout title="How Much Does a Mural Cost in Richmond, VA? | Untitled Mixed Media" description="Transparent mural pricing in Richmond, VA. From simple graphics at $18/sqft to archival heritage murals at $110/sqft. Get a free estimate with our price calculator.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Murals', href: '/murals' },
        { label: 'Mural Cost' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Murals
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        How Much Does a Mural Cost in Richmond, VA?
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> Write 2-3 sentences identifying anyone researching mural pricing in Richmond — business owners, property owners, developers, community organizers. They want a straight answer on what a mural costs so they can budget and make a decision. They are frustrated by "call for a quote" pages that tell them nothing.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> They cannot find clear pricing information for murals. Most muralists do not publish rates. They have no frame of reference for budgeting.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They feel uncertain and anxious about being overcharged or underpaying for quality. The lack of transparency makes them distrust the process before it even starts.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> People deserve to know what things cost before they commit. Pricing should be transparent, not a negotiation tactic.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> Express understanding that pricing opacity is a legitimate frustration in the mural industry. Demonstrate authority by being the muralist who actually publishes clear pricing tiers, explains what drives cost, and provides a free estimator tool. Transparency is the authority signal here.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> They get a clear budget number, make an informed decision, and hire a muralist they trust. No surprises. No hidden costs. The project stays on budget.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> They remain paralyzed by uncertainty, never pull the trigger, or worse — hire someone cheap who delivers something they regret.
        </p>
      </div>

      <!-- Pricing Tiers -->
      <div class="mb-16">
        <h2 class="font-heading text-titanium-white mb-8" style="font-size: var(--text-fluid-2xl); line-height: 1.2;">
          Pricing Tiers
        </h2>
        <div class="grid gap-6 sm:grid-cols-2">
          <div class="border border-slate-gray p-6">
            <p class="font-mono text-smoke-gray uppercase mb-2" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Simple</p>
            <p class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-xl);">$18 – $28 / sq ft</p>
            <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm); line-height: 1.6;">
              Bold graphics, geometric patterns, brand logos, lettering, and simple illustrative work. Flat color fields with clean edges. Ideal for high-impact, budget-conscious projects.
            </p>
          </div>
          <div class="border border-slate-gray p-6">
            <p class="font-mono text-smoke-gray uppercase mb-2" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Moderate</p>
            <p class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-xl);">$28 – $45 / sq ft</p>
            <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm); line-height: 1.6;">
              Multi-color illustrations, scenic work, stylized portraits, and detailed brand murals. Includes shading, gradients, and layered compositions. Most commercial murals fall here.
            </p>
          </div>
          <div class="border border-slate-gray p-6">
            <p class="font-mono text-smoke-gray uppercase mb-2" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Detailed</p>
            <p class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-xl);">$45 – $70 / sq ft</p>
            <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm); line-height: 1.6;">
              Photorealistic work, complex multi-figure compositions, trompe l'oeil, and highly detailed narrative scenes. Requires extensive design time and precision execution.
            </p>
          </div>
          <div class="border border-slate-gray p-6">
            <p class="font-mono text-smoke-gray uppercase mb-2" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Archival</p>
            <p class="font-heading text-titanium-white mb-3" style="font-size: var(--text-fluid-xl);">$70 – $110 / sq ft</p>
            <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm); line-height: 1.6;">
              Heritage murals, public art commissions, and museum-grade work using KEIM mineral paint or equivalent archival systems. Built to last decades. Includes community engagement and documentation.
            </p>
          </div>
        </div>
      </div>

      <!-- Price Estimator CTA -->
      <div class="border border-slate-gray p-8 mb-16 text-center">
        <h2 class="font-heading text-titanium-white mb-4" style="font-size: var(--text-fluid-xl); line-height: 1.2;">
          Get an instant estimate
        </h2>
        <p class="font-body text-shadow-gray mb-6" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          Use our free price estimator to get a ballpark cost for your mural project in under 2 minutes.
        </p>
        <Button href="/price-estimator" variant="primary">Price Estimator</Button>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a project photo showing the range of complexity — ideally a side-by-side or collage showing simple vs. detailed work. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'What factors affect mural pricing?', answer: 'The main cost drivers are wall size (square footage), design complexity, surface condition (does it need repair or priming), access requirements (scaffolding, lifts, or ladder-accessible), paint system (standard acrylic vs. archival mineral paint), and timeline. A simple 200 sq ft logo mural on a clean, accessible wall costs far less than a 2,000 sq ft photorealistic mural on damaged brick requiring scaffolding.' },
      { question: 'Do you require a deposit?', answer: 'Yes. We require a 50% deposit before work begins, with the remaining balance due upon completion. For large-scale projects over $10,000, we can arrange milestone-based payment schedules. The deposit covers materials, surface preparation, and design development.' },
      { question: 'What is the payment schedule?', answer: 'Standard projects: 50% deposit to start, 50% upon completion. Large projects ($10K+): we can structure payments around milestones — deposit, design approval, mid-project, and completion. We send invoices through our standard billing system with clear payment terms.' },
      { question: 'Are there hidden costs I should know about?', answer: 'We quote all-inclusive pricing that covers design, materials, paint, surface prep, equipment rental, and labor. The only variables that can change a quote are scope changes you request after approval, or unexpected surface damage discovered during prep (we document and discuss before proceeding). No hidden fees. The price we quote is the price you pay.' },
    ]} />
    <RelatedPages heading="Related" pages={[
      { title: 'Business Murals', href: '/murals/business-murals-richmond-va', description: 'Commercial murals that drive foot traffic and identity.' },
      { title: 'Outdoor Murals', href: '/murals/outdoor-murals-richmond-va', description: 'Weather-durable exterior murals built to last.' },
      { title: 'Indoor Murals', href: '/murals/indoor-murals-richmond-va', description: 'Interior murals for restaurants, offices, and retail.' },
    ]} />
    <CTABlock headline="Ready to get your estimate?" description="Use our free price estimator or contact us directly to discuss your project." />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/murals/outdoor-murals-richmond-va.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Outdoor Murals in Richmond, VA | Untitled Mixed Media" description="Hand-painted outdoor murals in Richmond, VA. Weather-durable exterior murals using archival-grade paint systems designed to withstand Virginia's climate for years.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Murals', href: '/murals' },
        { label: 'Outdoor Murals' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Murals
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Outdoor Murals in Richmond, VA
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> Write 2-3 sentences identifying the property owner, business operator, or community leader in Richmond who wants to transform a blank or deteriorating exterior wall into something remarkable. They want a mural that survives Virginia summers, freezing winters, and UV exposure without fading or peeling.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> The exterior wall is blank, stained, tagged, or visually neglected. It detracts from the property and the surrounding streetscape.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They worry about investing in outdoor art that will fade, peel, or look worn within a few years. They have seen cheap murals deteriorate and do not want that for their property.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> Public-facing walls should contribute to the community, not detract from it. Art that cannot withstand its environment is not built with integrity.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> Express understanding of the legitimate concern about durability — outdoor murals face real environmental stress. Demonstrate authority through knowledge of paint systems (KEIM mineral paint, Nova Color acrylics, UV-resistant clear coats), surface preparation methods, and completed exterior projects that have held up over time.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> A weather-durable mural that transforms the property, attracts positive attention, and holds its color and clarity for years. The wall becomes a landmark rather than an eyesore.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> The wall continues to deteriorate or remains blank. Graffiti fills the void. The property loses curb appeal and the neighborhood loses a potential point of pride.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a project photo here showing a large-scale exterior mural on brick, concrete, or stucco — ideally showing the scale of the wall and the surrounding environment. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'How long do outdoor murals last?', answer: 'With proper surface preparation, archival-grade paints, and UV-resistant clear coats, exterior murals in Richmond typically last 7-15 years before needing significant touch-up. KEIM mineral paint systems can last even longer — they bond chemically with masonry and become part of the wall itself.' },
      { question: 'What type of paint do you use for outdoor murals?', answer: 'We select paint systems based on the surface material and exposure conditions. For masonry walls, KEIM mineral silicate paint is the gold standard — it is breathable, UV-stable, and bonds permanently with the substrate. For other surfaces, we use high-grade acrylic systems with UV-resistant top coats. Every project gets a paint specification matched to its environment.' },
      { question: 'Do I need a permit for an outdoor mural in Richmond?', answer: 'Richmond mural permits depend on the district, wall visibility from public right-of-way, and whether the mural includes signage or branding. We help navigate the permitting process and can advise on what your specific location requires before we start.' },
      { question: 'How do you maintain an outdoor mural?', answer: 'We provide a maintenance guide with every completed exterior mural. Most outdoor murals need only periodic cleaning with mild detergent and water. We offer scheduled touch-up services and can apply anti-graffiti coatings for walls in high-traffic areas.' },
    ]} />
    <RelatedPages heading="Related" pages={[
      { title: 'Business Murals', href: '/murals/business-murals-richmond-va', description: 'Commercial murals that drive foot traffic and brand identity.' },
      { title: 'Mural Maintenance', href: '/murals/mural-maintenance', description: 'Keep your mural looking sharp for years.' },
      { title: 'Public Art Murals', href: '/murals/public-art-murals-richmond-va', description: 'Community-scale public art and heritage murals.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/murals/indoor-murals-richmond-va.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Indoor Murals in Richmond, VA | Untitled Mixed Media" description="Hand-painted indoor murals in Richmond, VA. Low-VOC interior murals for restaurants, offices, retail spaces, and homes that transform walls into immersive experiences.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Murals', href: '/murals' },
        { label: 'Indoor Murals' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Murals
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Indoor Murals in Richmond, VA
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> Write 2-3 sentences identifying the business owner or homeowner in Richmond who wants to transform an interior space. They want a restaurant dining room that feels immersive, an office lobby that makes a statement, a retail space that gets photographed, or a home with a feature wall that is genuinely original.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> The interior walls are flat, generic, and forgettable. The space does not reflect the personality or quality of what happens inside it. Paint colors and framed prints are not enough.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They feel their space is uninspired. They know a great interior creates an emotional response — they just have not found the right way to achieve it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> People spend most of their time indoors. Those spaces should inspire, not bore. A hand-painted wall tells a different story than mass-produced decor.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> Express understanding of the unique challenges of interior mural work — ventilation concerns, working around furniture and fixtures, paint fumes in occupied spaces. Demonstrate authority through experience with low-VOC paint systems, interior surface preparation, and completed indoor projects in restaurants, offices, and homes.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> An interior space that stops people in their tracks, generates social media posts from visitors, and creates an atmosphere that elevates the entire experience. The mural becomes the room.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> The space remains generic. Customers walk in and out without remembering the environment. Another coat of neutral paint does not solve the problem.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a project photo here showing a completed indoor mural — restaurant interior, office lobby, or residential feature wall. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'Are the paint fumes safe for indoor spaces?', answer: 'We use low-VOC and zero-VOC paint systems for all interior mural work. These paints produce minimal odor and are safe for occupied spaces. For sensitive environments like restaurants or medical offices, we can schedule painting during closed hours and ensure proper ventilation throughout the process.' },
      { question: 'How long does an indoor mural take?', answer: 'Interior murals typically take 3-10 days of painting depending on wall size and complexity. The total project timeline from site visit through completion is usually 3-6 weeks. We can work around your operating hours — evenings, weekends, or closed days — to minimize disruption.' },
      { question: 'How do you prepare interior wall surfaces?', answer: 'Surface prep depends on the existing wall condition. We clean, repair any damage, prime as needed, and ensure proper adhesion before painting. For drywall, we use compatible primer systems. For textured walls, we discuss whether to smooth the surface or incorporate the texture into the design. All prep work is included in our pricing.' },
      { question: 'How does lighting affect an indoor mural?', answer: 'Lighting is a critical consideration for indoor murals. We evaluate your existing lighting during the site visit and design the mural to work with it — accounting for natural light sources, artificial lighting direction, and how the colors will read under your specific conditions. We can also recommend lighting adjustments to enhance the mural after installation.' },
    ]} />
    <RelatedPages heading="Related" pages={[
      { title: 'Business Murals', href: '/murals/business-murals-richmond-va', description: 'Commercial murals for storefronts, restaurants, and retail.' },
      { title: 'Outdoor Murals', href: '/murals/outdoor-murals-richmond-va', description: 'Weather-durable exterior murals built to last.' },
      { title: 'Mural Cost', href: '/murals/mural-cost-richmond-va', description: 'Transparent pricing for every scale and style.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/murals/property-owner-murals-richmond-va.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Murals for Property Owners in Richmond, VA | Untitled Mixed Media" description="Hand-painted murals for property owners in Richmond, VA. Increase property value, attract tenants, and transform blank walls into neighborhood landmarks.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Murals', href: '/murals' },
        { label: 'Property Owner Murals' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Murals
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Murals for Property Owners in Richmond, VA
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> Write 2-3 sentences identifying the property owner or landlord in Richmond who wants to increase the value of their building, attract better tenants, or revitalize a property that has been sitting underutilized. They see blank walls as wasted potential and want to invest in something that pays dividends in curb appeal and tenant demand.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> The property has blank or deteriorating exterior walls. It does not stand out in a competitive rental or commercial real estate market. The building looks dated or neglected from the street.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They feel the property is not living up to its potential. They worry that cosmetic neglect signals broader neglect to prospective tenants, buyers, and the community.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> Property owners have a responsibility to the streetscape. Buildings that contribute visually to the neighborhood are worth more — to tenants, to the community, and as assets.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> Express understanding that property improvements need to justify their cost. Demonstrate authority through knowledge of how murals affect property values, tenant attraction, and neighborhood perception. Reference the Blender pre-visualization process that lets owners see exactly what the mural will look like before committing.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> A property that commands higher rents, attracts quality tenants faster, and becomes a recognized landmark in the neighborhood. The mural is an investment with measurable returns.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> The property continues to underperform. Blank walls attract graffiti and signal neglect. Better tenants choose buildings with more character and curb appeal.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a project photo here showing a mural on a commercial or mixed-use property — ideally a before/after or a shot that conveys the property improvement angle. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'Do murals increase property value?', answer: 'Studies in cities with active mural programs show measurable increases in property values and rental rates in areas with public art. In Richmond specifically, murals have become a draw for tenants, visitors, and foot traffic. The exact impact depends on location, visibility, and quality — but a well-executed mural is a capital improvement that enhances curb appeal.' },
      { question: 'Do tenants need to approve the mural?', answer: 'That depends on your lease agreements. We recommend coordinating with existing tenants, especially if the mural will change the appearance of their storefront. Many tenants welcome murals because they increase visibility and foot traffic. We can help facilitate the conversation if needed.' },
      { question: 'Is the mural covered by my property insurance?', answer: 'Most commercial property insurance policies cover murals as part of the building exterior once completed. We recommend notifying your insurance provider before the project begins to confirm coverage. We also provide documentation of materials and process for your records.' },
      { question: 'How long does a property mural project take?', answer: 'From initial site visit through completed mural, most projects take 4-8 weeks total. The painting phase itself typically runs 1-3 weeks depending on scale and complexity. We work around tenant schedules and can phase the work to minimize disruption to the property.' },
    ]} />
    <RelatedPages heading="Related" pages={[
      { title: 'Real Estate Developer Murals', href: '/murals/real-estate-developer-murals', description: 'Murals as a development strategy for new and renovated properties.' },
      { title: 'Business Murals', href: '/murals/business-murals-richmond-va', description: 'Commercial murals that drive foot traffic and identity.' },
      { title: 'Outdoor Murals', href: '/murals/outdoor-murals-richmond-va', description: 'Weather-durable exterior murals built to last.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/murals/real-estate-developer-murals.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Murals for Real Estate Developers | Untitled Mixed Media" description="Hand-painted murals for real estate developers. Differentiate new developments, increase property value, and create visual anchors that attract tenants and buyers.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Murals', href: '/murals' },
        { label: 'Real Estate Developer Murals' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Murals
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Murals for Real Estate Developers
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> Write 2-3 sentences identifying the real estate developer who wants to differentiate a new construction, adaptive reuse, or renovation project. They think in terms of ROI, lease-up velocity, and competitive positioning. They want art that functions as a marketing asset — not decoration, but a strategic investment that makes the property memorable and desirable.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> New developments look identical to every other new development. Mixed-use projects and apartment complexes lack character and identity. There is nothing distinctive to anchor marketing materials or attract attention from the street.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They know differentiation drives lease-up speed and premium pricing, but they are not sure how to achieve it beyond standard finishes and amenities. They see competitors using murals effectively and want the same edge.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> Development should contribute to the character of a neighborhood, not homogenize it. Buildings that look like everywhere could be anywhere.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> Express understanding of the developer's timeline pressures, budget constraints, and ROI-driven decision-making. Demonstrate authority through experience coordinating with construction schedules, knowledge of surface prep for new construction, VARA compliance awareness, and the ability to deliver within development timelines.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> A development that stands out in the market, leases faster, commands premium pricing, and generates organic social media attention. The mural becomes a marketing asset that pays for itself.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> Another generic development that competes solely on price and location. Slower lease-up. Lower rents. The property is forgettable from day one.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a project photo here showing a mural on a new development or renovated property — ideally showing the scale and context within a development project. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'What is the ROI on a mural for a development project?', answer: 'Murals drive measurable value for developments: faster lease-up through increased visibility and social media exposure, premium positioning that supports higher rental rates, and long-term neighborhood identity that anchors the property. The cost of a mural is a fraction of a typical marketing budget and generates organic, ongoing attention that paid advertising cannot replicate.' },
      { question: 'Can you coordinate with our construction timeline?', answer: 'Yes. We are experienced working within construction schedules and can phase our work around other trades. We need the wall surface to be complete and cured — typically 28 days for new concrete or masonry. We can begin design development while construction is in progress so the mural is ready to paint as soon as the surface is available.' },
      { question: 'Do you offer volume pricing for multi-building projects?', answer: 'For developments with multiple mural locations, we offer project-rate pricing that accounts for the efficiencies of working across a single site. We can scope and quote the full package or phase deliverables across the development timeline. Contact us to discuss your specific project.' },
      { question: 'What about VARA compliance?', answer: 'The Visual Artists Rights Act (VARA) gives muralists certain rights over their work, including the right to prevent destruction or modification. We address VARA proactively in every contract — defining ownership, modification rights, and removal procedures upfront so there are no legal surprises down the road.' },
    ]} />
    <RelatedPages heading="Related" pages={[
      { title: 'Property Owner Murals', href: '/murals/property-owner-murals-richmond-va', description: 'Murals that increase property value and tenant demand.' },
      { title: 'Public Art Murals', href: '/murals/public-art-murals-richmond-va', description: 'Community-scale public art and heritage murals.' },
      { title: 'Mural Maintenance', href: '/murals/mural-maintenance', description: 'Protecting your mural investment for the long term.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/murals/public-art-murals-richmond-va.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Public Art Murals in Richmond, VA | Untitled Mixed Media" description="Public art murals in Richmond, VA. Community murals, heritage projects, and percent-for-art commissions. RFP-experienced with archival paint systems built to last decades.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Murals', href: '/murals' },
        { label: 'Public Art Murals' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Murals
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Public Art Murals in Richmond, VA
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> You are a municipality official, arts organization director, or community group leader who wants to commission public art that genuinely represents your community. You want a mural that tells a story, honors local history, celebrates identity, and becomes a lasting point of pride — not a trendy installation that fades in two years.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> The community needs public art but navigating the process — RFPs, budgets, community engagement, permits, archival materials — is complex. Many muralists cannot handle the administrative and logistical demands of public commissions.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They worry about choosing the wrong artist and ending up with art that does not represent the community, deteriorates prematurely, or creates controversy instead of pride.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> Public art should serve the public. It should be created with community input, executed with archival integrity, and maintained for future generations.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> We understand the unique accountability that comes with public commissions — community stakeholders, government oversight, and long-term maintenance obligations. We have navigated RFP processes, led community engagement sessions, and executed heritage projects like the Short Pump Park murals using KEIM mineral paint systems built to last decades.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> A mural that the community claims as its own — photographed, celebrated, and maintained for decades. A public investment that generates civic pride and becomes part of the community's identity.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> Public funds spent on art that fades, cracks, or fails to resonate with the community. A cautionary tale instead of a point of pride.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a project photo here showing a public art mural — ideally the Short Pump Park heritage mural or a similar community-scale project. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'Do you respond to RFPs for public art commissions?', answer: 'Yes. We are experienced with the RFP process for public art commissions at the municipal, county, and state levels. We can provide proposals with detailed design concepts, material specifications, timelines, budgets, community engagement plans, and maintenance schedules. We are familiar with Virginia Commission for the Arts and percent-for-art program requirements.' },
      { question: 'How do you incorporate community input into mural design?', answer: 'Our community engagement process is tailored to each project. It can include stakeholder interviews, community meetings, design presentations with feedback rounds, and historical research. For the Short Pump Park project, we researched Native American heritage, local growth patterns, and educational themes through community input and historical documentation. The goal is art that the community recognizes as theirs.' },
      { question: 'Can public art murals be funded through grants?', answer: 'Many public murals are funded through grants from organizations like the Virginia Commission for the Arts, NEA Our Town grants, local arts councils, and percent-for-art programs tied to development projects. We can help identify applicable funding sources and provide the documentation and project plans that grant applications require.' },
      { question: 'What is your approach to long-term maintenance of public murals?', answer: 'Every public art project includes a written maintenance plan specifying inspection intervals, cleaning procedures, touch-up protocols, and expected material lifespan. We use KEIM mineral paint for heritage projects — it bonds chemically with masonry and can last 50+ years. We also offer maintenance service agreements for ongoing care.' },
    ]} />
    <RelatedPages heading="Related" pages={[
      { title: 'Mural Maintenance', href: '/murals/mural-maintenance', description: 'How to protect your public art investment for decades.' },
      { title: 'Property Owner Murals', href: '/murals/property-owner-murals-richmond-va', description: 'Murals that increase property value and curb appeal.' },
      { title: 'Business Murals', href: '/murals/business-murals-richmond-va', description: 'Branded murals for storefronts, restaurants, and commercial spaces.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/murals/mural-maintenance.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Mural Maintenance and Protection | Untitled Mixed Media" description="Mural maintenance, cleaning, UV protection, anti-graffiti coatings, and touch-up services. Keep your mural looking sharp for years with proper care and protection.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Murals', href: '/murals' },
        { label: 'Mural Maintenance' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Murals
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Mural Maintenance and Protection
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> You are a property owner, business operator, or facilities manager with a mural on your wall. You invested real money in that artwork and you want it to stay vibrant for years, not fade into a washed-out ghost of itself. Whether you are dealing with UV damage, graffiti, peeling clear coat, or just want to know the right way to clean it, you need a plan that protects the investment you already made.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> The mural is showing signs of wear — fading from UV exposure, dirt accumulation, graffiti tags, or surface damage. They do not know how to clean or repair it without making things worse.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They feel helpless watching their investment deteriorate. They worry that improper cleaning or touch-up will damage the mural further.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> Art that is worth creating is worth maintaining. A mural should not be abandoned to the elements after the last coat of paint dries.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> Mural maintenance is not something most people know how to do — and doing it wrong can cause more damage than neglect. We know the correct cleaning methods for different paint systems, which UV-protective coatings work best for your wall orientation, and how to apply touch-ups that match the original work exactly.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> A mural that continues to look vibrant and well-maintained for years. The investment is protected. The property continues to benefit from the visual impact.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> The mural fades, cracks, or gets tagged and the property owner gives up on it. A former point of pride becomes an eyesore. The investment is lost.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a project photo here showing mural maintenance in action — touch-up work, cleaning, or a well-preserved mural that demonstrates the result of proper care. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'How should I clean my mural?', answer: 'For most exterior murals, gentle cleaning with a soft brush or cloth and mild detergent diluted in water is sufficient. Never use pressure washers, abrasive cleaners, or solvents on a painted mural — they will strip the finish. For interior murals, a damp microfiber cloth is usually all that is needed. If the mural has a clear coat, the cleaning process is even simpler. We provide specific cleaning instructions with every completed project.' },
      { question: 'How often does a mural need touch-ups?', answer: 'Exterior murals in Richmond typically benefit from a professional inspection every 2-3 years, with minor touch-ups as needed. Interior murals may go 5-10 years without any attention. The timeline depends on sun exposure, weather conditions, surface material, and paint system. KEIM mineral paint murals require the least maintenance of any system.' },
      { question: 'What is UV protection and do I need it?', answer: 'UV-resistant clear coats act as a shield against ultraviolet radiation, which is the primary cause of color fading in exterior murals. We apply UV-protective finishes to all exterior murals as part of the standard process. For south-facing and west-facing walls with heavy sun exposure, we use the highest-grade UV coatings available. This is included in our pricing — not an add-on.' },
      { question: 'What are anti-graffiti coatings?', answer: 'Anti-graffiti coatings create a sacrificial or non-stick layer over the mural surface. If the mural gets tagged, the graffiti can be removed without damaging the mural underneath. Sacrificial coatings are removed along with the graffiti and then reapplied. Non-stick coatings allow graffiti to be wiped off and last longer. We recommend anti-graffiti coatings for any mural in a high-traffic urban area.' },
    ]} />
    <RelatedPages heading="Related" pages={[
      { title: 'Outdoor Murals', href: '/murals/outdoor-murals-richmond-va', description: 'Weather-durable exterior murals built to last.' },
      { title: 'Business Murals', href: '/murals/business-murals-richmond-va', description: 'Exterior and interior murals that turn storefronts into destinations.' },
      { title: 'Mural Cost', href: '/murals/mural-cost-richmond-va', description: 'Transparent pricing for every scale and style.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/index.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import ServiceCard from '../../components/ServiceCard.astro';
---

<BaseLayout
  title="Hand-Painted Signs — Untitled Mixed Media | Richmond VA Sign Painter"
  description="Hand-painted signs, gold leaf lettering, window lettering, and sign restoration in Richmond, Virginia. Craft that outlasts vinyl."
>
  <Nav />
  <main class="pt-24 pb-16 px-6 lg:px-12">
    <div class="max-w-7xl mx-auto">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-4" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">
        Hand-Painted Signs
      </p>

      <!-- TODO: Write headline from Brand Book.
           StoryBrand: Character = business owner who needs signage. Problem = vinyl peels, fades,
           and looks like every other sign on the block. Guide = UMM with hand-painting craft.
           Success = a sign that weathers into character instead of deteriorating. -->
      <h1 class="font-heading text-titanium-white mb-6 text-balance" data-animate>
        [Placeholder: Write an identity/longevity headline for hand-painted signs.
        Not "We paint signs." Something about craft that outlasts vinyl and ages into the building.]
      </h1>

      <!-- PLACEHOLDER COPY: 2-3 sentences about the sign painting service.
           External problem: vinyl signs peel, crack, and fade within 3-5 years.
           Internal problem: a cheap-looking sign makes the business feel cheap.
           Philosophical problem: a business that cares about quality deserves signage that reflects it.
           Guide: UMM hand-paints every letter. Gold leaf, enamel, window lettering — techniques
           that have lasted centuries. Plan: consultation → design → paint → seal.
           Success: A sign that gets better with age, not worse. -->
      <p class="font-body text-shadow-gray mb-16 max-w-2xl" style="font-size: var(--text-fluid-lg);" data-animate>
        [Placeholder: Write 2-3 sentences. Open with the problem — vinyl signs that peel and fade.
        Then introduce the alternative: hand-painted lettering that weathers into the building's character.
        Gold leaf, enamel, window lettering — techniques that have lasted centuries.]
      </p>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-[var(--spacing-section)]">
        <div data-animate="fade" data-animate-delay="1">
          <ServiceCard
            title="Storefront Signs Richmond VA"
            description="[Placeholder: Exterior storefront signs — the first thing customers see.]"
            href="/hand-painted-signs/storefront-signs-richmond-va"
          />
        </div>
        <div data-animate="fade" data-animate-delay="2">
          <ServiceCard
            title="Gold Leaf Signs"
            description="[Placeholder: 23-karat gold leaf lettering — the highest standard in sign painting.]"
            href="/hand-painted-signs/gold-leaf-signs"
          />
        </div>
        <div data-animate="fade" data-animate-delay="3">
          <ServiceCard
            title="Window Lettering"
            description="[Placeholder: Reverse-glass lettering and window gilding for storefronts.]"
            href="/hand-painted-signs/window-lettering"
          />
        </div>
        <div data-animate="fade" data-animate-delay="1">
          <ServiceCard
            title="Bar & Restaurant Signs"
            description="[Placeholder: Signage for hospitality — menus, chalkboards, exterior identity.]"
            href="/hand-painted-signs/bar-and-restaurant-signs"
          />
        </div>
        <div data-animate="fade" data-animate-delay="2">
          <ServiceCard
            title="Interior Signs"
            description="[Placeholder: Lobby lettering, wayfinding, and branded interior walls.]"
            href="/hand-painted-signs/interior-signs"
          />
        </div>
        <div data-animate="fade" data-animate-delay="3">
          <ServiceCard
            title="Hand-Painted Menus"
            description="[Placeholder: Menu boards, specials boards, and price lists painted to last.]"
            href="/hand-painted-signs/hand-painted-menus"
          />
        </div>
        <div data-animate="fade" data-animate-delay="1">
          <ServiceCard
            title="Hand-Painted vs Vinyl"
            description="[Placeholder: Why hand-painted signs outlast and outperform vinyl — a direct comparison.]"
            href="/hand-painted-signs/hand-painted-vs-vinyl"
          />
        </div>
        <div data-animate="fade" data-animate-delay="2">
          <ServiceCard
            title="Cost Per Year Comparison"
            description="[Placeholder: The math on longevity — why hand-painted costs less over 10 years.]"
            href="/hand-painted-signs/cost-per-year-comparison"
          />
        </div>
        <div data-animate="fade" data-animate-delay="3">
          <ServiceCard
            title="Why Hand-Painted Signs Last Longer"
            description="[Placeholder: Materials science — enamel, gold leaf, and proper surface preparation.]"
            href="/hand-painted-signs/why-hand-painted-signs-last-longer"
          />
        </div>
      </div>

      <!-- Sign Restoration -->
      <section class="border-t border-slate-gray pt-[var(--spacing-section)] mb-[var(--spacing-section)]">
        <h2 class="font-mono text-smoke-gray uppercase mb-8" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">
          Restoration
        </h2>
        <div class="max-w-lg">
          <ServiceCard
            title="Sign Restoration"
            description="[Placeholder: Restoring faded, damaged, and historic signs — ghost signs, gilded lettering, and century-old painted advertisements brought back to life.]"
            href="/hand-painted-signs/sign-restoration"
          />
        </div>
      </section>

      <!-- Cross-hub link -->
      <p class="font-body text-shadow-gray mb-16" style="font-size: var(--text-fluid-lg);">
        We also paint <a href="/murals" class="text-titanium-white underline underline-offset-4 hover:text-soft-gray transition-colors duration-200">murals</a>.
      </p>
    </div>
  </main>

  <CTABlock />

  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/gold-leaf-signs.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Gold Leaf Signs | Untitled Mixed Media" description="Hand-applied gold leaf signs and gilded lettering in Richmond, Virginia. 23-karat gold leaf that catches light like nothing else.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Gold Leaf Signs' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Hand-Painted Signs
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Gold Leaf Signs
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> A business owner &mdash; law firm, upscale restaurant, jeweler, heritage brand &mdash; who wants their sign to communicate permanence and premium quality. They want the kind of lettering that makes people assume the business has been there for decades.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> Printed or vinyl gold looks flat. It does not catch light. It peels. It screams "budget" instead of "established."
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They worry their signage undermines the credibility they have worked to build. The sign says one thing; the business says another.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> Real materials communicate real quality. There is no shortcut to the way gold leaf reflects light.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> UMM hand-applies gold leaf using traditional oil-size and water-size gilding techniques. We have gilded glass, wood, and metal &mdash; and we know which technique matches your surface, your environment, and your budget.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> A sign that glows at golden hour. Lettering that ages with dignity. A first impression that matches the quality inside.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> Flat metallic vinyl that fades in two summers. A first impression that says "we tried" instead of "we arrived."
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">Add photo showing gold leaf lettering catching light &mdash; close-up detail shot showing the texture and reflectivity that distinguishes real gold from printed metallic.</p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'What is the difference between real gold leaf and imitation gold?', answer: '23-karat gold leaf is real gold &mdash; it will never tarnish or oxidize. Imitation gold (composition leaf) is a brass alloy that costs less but can darken over time without a clear coat. We recommend real gold for exterior applications and high-visibility locations.' },
      { question: 'How long does gold leaf lettering last?', answer: 'Properly applied and sealed gold leaf on glass can last 50 years or more. On exterior wood or metal surfaces, expect 15 to 25 years depending on weather exposure. Both far outlast any vinyl alternative.' },
      { question: 'How much more does gold leaf cost than painted lettering?', answer: 'Gold leaf typically adds 30 to 50 percent to the cost of a painted sign, depending on the amount of gilding. The material cost is real &mdash; gold is gold &mdash; but the visual impact and longevity justify it for businesses that want to project permanence.' },
      { question: 'Can gold leaf be used outdoors?', answer: 'Yes. Real 23-karat gold leaf is naturally weather-resistant because gold does not oxidize. We seal exterior gold leaf work with UV-resistant clear coats for additional protection against physical wear.' },
    ]} />

    <RelatedPages heading="Related" pages={[
      { title: 'Storefront Signs', href: '/hand-painted-signs/storefront-signs-richmond-va', description: 'Full storefront signage for Richmond businesses.' },
      { title: 'Window Lettering', href: '/hand-painted-signs/window-lettering', description: 'Hand-painted and gilded glass for storefronts and doors.' },
      { title: 'Bar & Restaurant Signs', href: '/hand-painted-signs/bar-and-restaurant-signs', description: 'Signage that builds atmosphere before guests walk in.' },
    ]} />

    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/storefront-signs-richmond-va.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Hand-Painted Storefront Signs in Richmond, VA | Untitled Mixed Media" description="Custom hand-painted storefront signs in Richmond, Virginia. Gold leaf, reverse glass, and traditional lettering that gives your business real street presence.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Storefront Signs Richmond VA' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Hand-Painted Signs
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Hand-Painted Storefront Signs in Richmond, VA
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> A retail shop owner, restaurant operator, or boutique proprietor in Richmond who wants their storefront to stop foot traffic and pull people inside. They want real street presence &mdash; the kind that makes someone cross the road to look closer.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> Their current signage is vinyl, faded, generic, or nonexistent. It looks like every other storefront on the block.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They feel invisible. Customers walk past without noticing, and the storefront doesn't reflect the quality of what's inside.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> A business that takes pride in its product deserves a sign that shows it. Craft should be visible from the street.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> UMM has painted storefronts across Richmond &mdash; from Carytown boutiques to Scott's Addition restaurants. We know the city's architecture, its sign codes, and how to make lettering that belongs on the building.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> A storefront that people photograph. A sign that weathers into character. Foot traffic that starts before the door opens.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> Another year blending in. Another vinyl sign peeling at the corners while the business across the street gets the Instagram photos.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">Add photo of a completed Richmond storefront sign &mdash; ideally showing the full facade with the business name visible and the street context.</p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'What size options are available for storefront signs?', answer: 'Every storefront is different. We design to your specific facade &mdash; whether that is a 2-foot transom window or a 20-foot brick wall. The site visit determines what the building can support and what will read best from the street.' },
      { question: 'Is gold leaf available for storefront lettering?', answer: 'Yes. We offer 23-karat gold leaf, 12-karat white gold, and imitation gold depending on your budget and the look you want. Gold leaf catches light in a way no paint or vinyl can replicate.' },
      { question: 'How long does a storefront sign take?', answer: 'Most storefront signs take 1 to 3 weeks from design approval to completion, depending on size, detail level, and weather. We will give you a specific timeline after the site visit.' },
      { question: 'Can you paint double-sided or projecting signs?', answer: 'Yes. We paint hanging blade signs, projecting signs, and A-frame sidewalk boards. If it has a paintable surface, we can letter it.' },
    ]} />

    <RelatedPages heading="Related" pages={[
      { title: 'Bar & Restaurant Signs', href: '/hand-painted-signs/bar-and-restaurant-signs', description: 'Signage that builds atmosphere before guests walk in.' },
      { title: 'Gold Leaf Signs', href: '/hand-painted-signs/gold-leaf-signs', description: 'Real gold lettering for a premium, classic appearance.' },
      { title: 'Window Lettering', href: '/hand-painted-signs/window-lettering', description: 'Hand-painted and gilded glass for storefronts and doors.' },
    ]} />

    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/window-lettering.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Hand-Painted Window Lettering | Untitled Mixed Media" description="Hand-painted window lettering and reverse glass gilding in Richmond, Virginia. Professional window signage that outlasts vinyl decals.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Window Lettering' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Hand-Painted Signs
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Hand-Painted Window Lettering
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> A business owner who wants professional, distinctive lettering on their glass &mdash; storefront windows, entry doors, transoms. They want signage that looks like it belongs to the building, not stuck on top of it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> Vinyl window decals bubble, peel at the edges, and turn cloudy within a few years. They look temporary because they are temporary.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They are embarrassed by peeling decals or bare glass. The window is prime real estate and it is wasted.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> Glass is the most visible surface on any storefront. It deserves lettering applied with the same care as the business behind it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> UMM paints window lettering by hand using one-shot enamel and traditional reverse-glass gilding techniques. We have lettered doors, transoms, and full window displays &mdash; and we know how to work with your existing architecture.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> Lettering that looks like it was always part of the building. Hours, name, and branding visible from the sidewalk &mdash; permanent and professional.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> Bare glass or peeling vinyl. Potential customers who walk past because nothing told them to stop.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">Add photo of hand-painted window lettering &mdash; ideally showing the lettering from the street with interior light behind it, demonstrating how painted glass reads differently than vinyl.</p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'What is reverse glass gilding?', answer: 'Reverse glass gilding is gold leaf applied to the back side of the glass, then backed with paint. The gold is protected by the glass itself, making it extremely durable. It produces a deep, luminous effect that front-surface applications cannot match.' },
      { question: 'What kind of paint do you use on glass?', answer: 'We use one-shot enamel lettering paint &mdash; the industry standard for sign painters. It bonds permanently to glass, resists UV fading, and holds crisp edges for decades. For interior windows, we can also use low-odor alternatives.' },
      { question: 'Can window lettering be removed later?', answer: 'Painted lettering can be scraped off glass cleanly with a razor blade without damaging the glass. This is actually easier than removing old vinyl adhesive residue. Gold leaf on glass can be removed the same way.' },
      { question: 'Can you paint business hours and other details on the door?', answer: 'Yes. Hours, suite numbers, phone numbers, logos, and regulatory text are all common door and window lettering jobs. We match your brand typography and lay everything out for maximum readability at pedestrian distance.' },
    ]} />

    <RelatedPages heading="Related" pages={[
      { title: 'Storefront Signs', href: '/hand-painted-signs/storefront-signs-richmond-va', description: 'Full storefront signage for Richmond businesses.' },
      { title: 'Gold Leaf Signs', href: '/hand-painted-signs/gold-leaf-signs', description: 'Real gold lettering for a premium, classic appearance.' },
      { title: 'Interior Signs', href: '/hand-painted-signs/interior-signs', description: 'Branded interiors &mdash; wayfinding, feature walls, and lettering.' },
    ]} />

    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/bar-and-restaurant-signs.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Hand-Painted Bar and Restaurant Signs | Untitled Mixed Media" description="Hand-painted signs for bars, restaurants, and hospitality venues in Richmond, Virginia. Menu boards, exterior signage, and interior lettering that builds atmosphere.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Bar & Restaurant Signs' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Hand-Painted Signs
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Hand-Painted Bar and Restaurant Signs
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> A bar or restaurant owner who understands that atmosphere starts before the first drink is poured. They want signage that is part of the experience &mdash; not a corporate afterthought bolted to the wall.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> Their current signage is generic, inconsistent, or missing entirely. Printed menu boards look cheap. Vinyl logos peel in kitchen humidity.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They have invested in the food, the drinks, the design of the space &mdash; but the signage does not match. It feels unfinished.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> Hospitality is about every detail. A hand-painted sign says "we care about this place" in a way that mass-produced signage never will.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> UMM has painted signs for bars, breweries, and restaurants across Richmond. We understand the hospitality environment &mdash; humidity, grease, foot traffic &mdash; and we use materials that hold up to it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> Guests photograph the sign before they photograph the food. The signage becomes part of the brand &mdash; mentioned in reviews, shared on social media, remembered after the meal.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> A beautifully designed space with forgettable signage. Guests who cannot find the restroom, do not know the specials, and never think about the place again.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">Add photo of a hand-painted bar or restaurant sign &mdash; showing the sign in context within the venue, capturing the atmosphere it creates.</p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'Can you paint menu boards that we can update?', answer: 'Yes. We paint permanent menu board frames and headers, then leave designated areas as chalkboard surfaces for rotating items. You get the look of a hand-painted board with the flexibility to change daily specials.' },
      { question: 'Do you paint specials boards and daily menus?', answer: 'We can paint permanent specials boards with a chalkboard or dry-erase area for changing items. For fully permanent menus, we paint every item &mdash; these work best for restaurants with a fixed menu.' },
      { question: 'What about exterior signage for restaurants?', answer: 'Exterior signs get our most durable treatment &mdash; marine-grade enamel, UV-resistant clear coats, and weather-sealed edges. We design for readability from the street and compliance with local sign ordinances.' },
      { question: 'Can you match our existing brand style?', answer: 'Yes. Send us your brand guidelines, and we will match your typefaces, colors, and visual language. If you do not have formal guidelines, we can work from your logo, menus, or website to create signage that feels cohesive.' },
    ]} />

    <RelatedPages heading="Related" pages={[
      { title: 'Hand-Painted Menus', href: '/hand-painted-signs/hand-painted-menus', description: 'Menu boards and displays painted by hand.' },
      { title: 'Storefront Signs', href: '/hand-painted-signs/storefront-signs-richmond-va', description: 'Full storefront signage for Richmond businesses.' },
      { title: 'Interior Signs', href: '/hand-painted-signs/interior-signs', description: 'Branded interiors &mdash; wayfinding, feature walls, and lettering.' },
    ]} />

    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/interior-signs.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Hand-Painted Interior Signs | Untitled Mixed Media" description="Hand-painted interior signage, wayfinding, and feature wall lettering in Richmond, Virginia. Branded environments that feel intentional.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Interior Signs' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Hand-Painted Signs
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Hand-Painted Interior Signs
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> A business owner, office manager, or venue operator who wants their interior to feel branded and intentional &mdash; not like a space filled with printed signs from an office supply store.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> Their interior signage is an afterthought &mdash; printed paper taped to walls, mismatched vinyl decals, or nothing at all. Wayfinding is confusing. The brand disappears once people walk through the door.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They know the space could feel more polished, but generic sign solutions feel wrong for a business that cares about its environment.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> The interior of a business is a promise kept. If the outside says "premium," the inside should too &mdash; all the way down to the lettering on the wall.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> UMM paints interior signs for offices, restaurants, retail stores, and event venues. We work with your existing finishes &mdash; exposed brick, drywall, wood paneling &mdash; and we know which paints and techniques work on each surface.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> An interior that photographs well, guides people intuitively, and reinforces the brand at every turn. Clients, customers, and employees feel the difference.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> A space that feels unfinished. Visitors who get lost. A brand that evaporates the moment someone steps inside.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">Add photo of hand-painted interior signage &mdash; a feature wall, wayfinding sign, or branded lettering inside a commercial space.</p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'What types of interior wayfinding can you paint?', answer: 'Room numbers, directional signs, restroom indicators, department labels, floor directories &mdash; anything that helps people navigate your space. We design these to match your brand instead of defaulting to generic signage.' },
      { question: 'Can you paint feature walls and large-scale lettering?', answer: 'Yes. Feature walls with brand statements, mission text, or large-scale typography are one of our most requested interior projects. We work at any scale &mdash; from a single word to a full wall mural.' },
      { question: 'Do you use low-VOC paint for interior work?', answer: 'Yes. For interior projects, we use low-VOC and zero-VOC paints whenever possible. We coordinate timing to minimize disruption &mdash; painting after hours or before a space opens when ventilation is a concern.' },
      { question: 'How long does interior sign painting take?', answer: 'Most interior sign projects take 2 to 5 days on site, depending on scope. Simple wayfinding can be done in a day. Large feature walls or multi-room projects take longer. We work around your business hours.' },
    ]} />

    <RelatedPages heading="Related" pages={[
      { title: 'Bar & Restaurant Signs', href: '/hand-painted-signs/bar-and-restaurant-signs', description: 'Signage that builds atmosphere before guests walk in.' },
      { title: 'Window Lettering', href: '/hand-painted-signs/window-lettering', description: 'Hand-painted and gilded glass for storefronts and doors.' },
      { title: 'Hand-Painted Menus', href: '/hand-painted-signs/hand-painted-menus', description: 'Menu boards and displays painted by hand.' },
    ]} />

    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/hand-painted-menus.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Hand-Painted Menus and Menu Boards | Untitled Mixed Media" description="Hand-painted menu boards, chalkboard menus, and permanent menu displays for restaurants and bars in Richmond, Virginia.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Hand-Painted Menus' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Hand-Painted Signs
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Hand-Painted Menus and Menu Boards
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> A restaurant or bar owner who wants their menu to be part of the experience &mdash; not a laminated sheet or a TV screen. They want guests to look up at the board and feel something about the place before they order.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> Printed menus look corporate. Digital screens feel cold. The menu board behind the counter is either a whiteboard with dry-erase markers or a cluttered chalkboard nobody can read.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They have put real thought into the food and drink, but the menu presentation does not reflect it. It feels like a missed opportunity.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> The menu is the first thing guests read in a restaurant. It should be crafted with the same care as the food it describes.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> UMM paints menu boards for restaurants, coffee shops, breweries, and bars. We design for readability at ordering distance, and we know how to balance permanent branding with updatable sections for rotating items.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> A menu board that guests photograph and share. Clear, beautiful presentation that makes ordering easy and makes the food sound as good as it tastes.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> A menu nobody can read from the counter. A wall that could be a feature but is wasted on a whiteboard. Guests who order the safe option because the specials were illegible.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">Add photo of a hand-painted menu board in a restaurant or bar setting &mdash; showing the full board with legible text and the surrounding environment.</p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'Can menu items be updated after the board is painted?', answer: 'Yes. We design boards with permanent header sections and designated chalkboard or dry-erase areas for rotating items. For fully permanent menus, we can repaint individual items when your menu changes &mdash; this is a quick, low-cost update.' },
      { question: 'What materials do you paint menu boards on?', answer: 'We paint on wood panels, MDO board, chalkboard-painted surfaces, directly on walls, and pre-built frames. We can build the board from scratch or paint on a surface you provide. The material depends on your space and whether you need portability.' },
      { question: 'What sizes work for menu boards?', answer: 'Size depends on viewing distance and menu length. A coffee shop counter board might be 3 by 4 feet. A full restaurant menu wall can be 4 by 8 feet or larger. We measure your space and design to fit.' },
      { question: 'What is the difference between chalkboard and permanent menu boards?', answer: 'Chalkboard menus are written in chalk or chalk markers and can be erased and rewritten. Permanent menus are painted in enamel and last for years. Most restaurants benefit from a hybrid &mdash; permanent branding and categories with chalkboard areas for changing items.' },
    ]} />

    <RelatedPages heading="Related" pages={[
      { title: 'Bar & Restaurant Signs', href: '/hand-painted-signs/bar-and-restaurant-signs', description: 'Signage that builds atmosphere before guests walk in.' },
      { title: 'Interior Signs', href: '/hand-painted-signs/interior-signs', description: 'Branded interiors &mdash; wayfinding, feature walls, and lettering.' },
      { title: 'Storefront Signs', href: '/hand-painted-signs/storefront-signs-richmond-va', description: 'Full storefront signage for Richmond businesses.' },
    ]} />

    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/hand-painted-vs-vinyl.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Hand-Painted Signs vs Vinyl: Which Lasts Longer? | Untitled Mixed Media" description="An honest comparison of hand-painted signs versus vinyl lettering. Lifespan, maintenance, weather resistance, and long-term appearance.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Hand-Painted vs Vinyl' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Hand-Painted Signs
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Hand-Painted Signs vs Vinyl: Which Lasts Longer?
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> A business owner deciding between hand-painted signage and vinyl lettering. They want the honest answer &mdash; not a sales pitch. They want to spend their money on something that lasts and looks right.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> Vinyl is cheaper upfront but fails within 3 to 7 years &mdash; peeling edges, UV fading, adhesive residue. They have seen it happen to other businesses and do not want to repeat it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They are not sure the higher cost of hand-painted signage is justified. They need proof, not promises.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> A business should not have to choose between looking good now and looking good in ten years. The right sign does both.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> UMM has seen both sides. We have painted over peeling vinyl and we have maintained hand-painted signs that are 15 years old and still sharp. This page lays out the facts so you can decide for yourself.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> A sign that looks better at year 10 than vinyl looks at year 3. A single investment instead of a recurring replacement cost.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> Choosing the cheaper option and paying twice &mdash; once for the vinyl, once to remove it and start over.
        </p>
      </div>

      <!-- 12-Year Cost Breakdown Table Placeholder -->
      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Table placeholder: 12-Year Cost Breakdown</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">Build a comparison table with columns for: Year (1 through 12), Vinyl cumulative cost (initial install plus replacements every 3 to 5 years plus removal labor), Hand-painted cumulative cost (initial install plus minor touch-ups at year 7 to 8), and Appearance rating (vinyl degrades while hand-painted weathers gracefully). Show the crossover point where hand-painted becomes cheaper per year.</p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">Add side-by-side comparison photo: a 5-year-old vinyl sign showing edge peeling and UV fade next to a 10-year-old hand-painted sign still holding its color and edges.</p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'How long do vinyl signs actually last?', answer: 'Most exterior vinyl lettering lasts 3 to 7 years depending on sun exposure, temperature swings, and surface prep. Premium cast vinyl can last longer, but adhesive failure and edge lifting are inevitable on most surfaces.' },
      { question: 'How long do hand-painted signs last?', answer: 'A properly painted sign on a well-prepared surface lasts 15 to 25 years or more. Marine-grade enamel bonds into the surface rather than sitting on top of it, which is why hand-painted signs weather rather than peel.' },
      { question: 'What about maintenance?', answer: 'Vinyl cannot be repaired. Once it starts peeling, the whole sign needs replacing. Hand-painted signs can be touched up in place. A minor touch-up at year 8 or 10 costs a fraction of a full replacement.' },
      { question: 'How do they compare in different weather?', answer: 'Vinyl adhesive weakens in heat and becomes brittle in cold. Hand-painted enamel flexes with temperature changes because it is bonded to the substrate. In Richmond hot summers and occasional ice storms, paint outlasts adhesive every time.' },
    ]} />

    <RelatedPages heading="Related" pages={[
      { title: 'Cost Per Year Comparison', href: '/hand-painted-signs/cost-per-year-comparison', description: 'The real numbers behind hand-painted vs vinyl pricing.' },
      { title: 'Why Hand-Painted Signs Last Longer', href: '/hand-painted-signs/why-hand-painted-signs-last-longer', description: 'The science of paint bonding vs adhesive failure.' },
      { title: 'Storefront Signs', href: '/hand-painted-signs/storefront-signs-richmond-va', description: 'Full storefront signage for Richmond businesses.' },
    ]} />

    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/cost-per-year-comparison.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Hand-Painted vs Vinyl: Cost Per Year | Untitled Mixed Media" description="A cost-per-year breakdown comparing hand-painted signs to vinyl lettering. See which option actually costs less over 5, 10, and 15 years.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Cost Per Year Comparison' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Hand-Painted Signs
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Hand-Painted vs Vinyl: Cost Per Year
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> A cost-conscious business owner who evaluates purchases on total cost of ownership, not sticker price. They want to know which sign option is actually cheaper when you factor in replacements, maintenance, and removal labor over 10 to 15 years.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> Vinyl looks cheaper on the quote, but the quote only covers the first installation. Nobody tells you about the second installation in 4 years, or the third one in 8.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They feel tricked by the upfront pricing of vinyl. They suspect hand-painted is the better deal but need the numbers to confirm it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> Honest pricing means showing the full picture &mdash; not just the first invoice.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> UMM does not compete on first-day price. We compete on cost per year. This page shows the math so you can see for yourself where the real savings are.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> One investment that pays for itself by year 6. No recurring replacement costs. No downtime with a bare wall while waiting for the next installation.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> Paying for the same sign three times and still ending up with something that looks worse each round.
        </p>
      </div>

      <!-- Detailed Cost Comparison Placeholder -->
      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Table placeholder &mdash; Detailed Cost Comparison</p>
        <p class="font-body text-shadow-gray mb-4" style="font-size: var(--text-fluid-sm);">Build a detailed cost comparison with real numbers. Structure:</p>
        <ul class="font-body text-shadow-gray space-y-2" style="font-size: var(--text-fluid-sm);">
          <li>- Vinyl scenario: Initial install ($X) + removal at year 4 ($X) + reinstall ($X) + removal at year 8 ($X) + reinstall ($X) = total over 12 years</li>
          <li>- Hand-painted scenario: Initial install ($X) + touch-up at year 8 ($X) = total over 12 years</li>
          <li>- Cost per year: vinyl total / years vs hand-painted total / years</li>
          <li>- Break-even point: the year when hand-painted becomes cheaper cumulatively</li>
          <li>- Include notes on hidden costs: removal labor, adhesive damage repair, business downtime during replacement</li>
        </ul>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">Add a simple chart or infographic showing the cost crossover point &mdash; the moment hand-painted becomes the cheaper option on a per-year basis.</p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'How often does vinyl need to be replaced?', answer: 'Exterior vinyl typically needs full replacement every 3 to 5 years. In direct sun or extreme temperatures, it can fail sooner. Each replacement includes removal, surface cleaning, and new installation &mdash; all billable.' },
      { question: 'What does vinyl removal cost?', answer: 'Vinyl removal runs $150 to $500 depending on the size of the sign and how badly the adhesive has bonded. If the adhesive damages the surface underneath, repair costs add more. This is a cost that never appears on the original vinyl quote.' },
      { question: 'What is the total cost of ownership for each option over 10 years?', answer: 'Placeholder: insert specific numbers here based on a typical Richmond storefront sign (approximately 3 by 6 feet). The key insight is that hand-painted costs more on day one but less per year by year 5 or 6.' },
      { question: 'At what point does hand-painted break even with vinyl?', answer: 'For most sign sizes, hand-painted breaks even with vinyl at the 5 to 7 year mark &mdash; right around when the second vinyl replacement is needed. After that, every year is pure savings.' },
    ]} />

    <RelatedPages heading="Related" pages={[
      { title: 'Hand-Painted vs Vinyl', href: '/hand-painted-signs/hand-painted-vs-vinyl', description: 'The full comparison &mdash; lifespan, maintenance, and appearance.' },
      { title: 'Why Hand-Painted Signs Last Longer', href: '/hand-painted-signs/why-hand-painted-signs-last-longer', description: 'The science of paint bonding vs adhesive failure.' },
      { title: 'Storefront Signs', href: '/hand-painted-signs/storefront-signs-richmond-va', description: 'Full storefront signage for Richmond businesses.' },
    ]} />

    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/why-hand-painted-signs-last-longer.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import FAQSection from '../../components/FAQSection.astro';
import RelatedPages from '../../components/RelatedPages.astro';
---

<BaseLayout title="Why Hand-Painted Signs Last Longer | Untitled Mixed Media" description="The science behind hand-painted sign durability. How paint bonding, UV resistance, and repairability make hand-painted signs outlast vinyl by decades.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Why Hand-Painted Signs Last Longer' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Hand-Painted Signs
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Why Hand-Painted Signs Last Longer
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> Anyone who has heard that hand-painted signs outlast vinyl but wants to understand why. They are skeptical of marketing claims and want the technical explanation &mdash; how the materials actually work and why one fails before the other.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> Vinyl sign companies claim their product lasts "up to 10 years," but the signs on the street tell a different story. Nobody explains the actual failure mechanism.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They do not trust marketing claims from either side. They want facts &mdash; material science, not slogans.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> Durability claims should be backed by how materials actually behave, not by how long the warranty lasts.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> UMM works with both paint and surface preparation every day. We know how enamel bonds to wood, metal, and masonry at a molecular level &mdash; and we know exactly why vinyl adhesive fails. This page explains the difference in plain language.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> Understanding that gives you confidence in the investment. A decision based on science, not salesmanship.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> Choosing vinyl because the durability claim sounded similar and finding out the hard way that "up to 10 years" means "probably 4."
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">Add close-up comparison photos: vinyl adhesive failure (edge lifting, bubbling, UV yellowing) next to aged hand-painted enamel showing graceful patina without structural failure.</p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'How does paint bond differently than vinyl adhesive?', answer: 'Paint penetrates the surface and forms a chemical bond as it cures &mdash; it becomes part of the substrate. Vinyl sits on top of the surface held by pressure-sensitive adhesive. When that adhesive weakens from heat, UV, or moisture, the vinyl lifts. Paint does not lift because there is no adhesive layer to fail.' },
      { question: 'How does UV light affect each material?', answer: 'UV radiation breaks down vinyl polymers and adhesive bonds over time, causing yellowing, brittleness, and edge failure. Sign-grade enamel paint contains UV-stabilizing pigments that resist fading for decades. Marine-grade enamel &mdash; what we use &mdash; is formulated specifically for years of direct sun exposure.' },
      { question: 'Can a hand-painted sign be repaired instead of replaced?', answer: 'Yes. A damaged section of a hand-painted sign can be sanded, primed, and repainted in place without redoing the entire sign. Vinyl cannot be partially repaired &mdash; once a section fails, the whole sign comes off because you cannot match the faded color of the remaining vinyl.' },
      { question: 'Does climate affect which option lasts longer?', answer: 'Climate amplifies the difference. Richmond gets hot, humid summers and occasional ice. Heat softens vinyl adhesive. Cold makes vinyl brittle. Moisture gets under lifted edges and accelerates failure. Paint handles all of these because it is bonded to the surface, not stuck on top of it.' },
    ]} />

    <RelatedPages heading="Related" pages={[
      { title: 'Hand-Painted vs Vinyl', href: '/hand-painted-signs/hand-painted-vs-vinyl', description: 'The full comparison &mdash; lifespan, maintenance, and appearance.' },
      { title: 'Cost Per Year Comparison', href: '/hand-painted-signs/cost-per-year-comparison', description: 'The real numbers behind hand-painted vs vinyl pricing.' },
      { title: 'Gold Leaf Signs', href: '/hand-painted-signs/gold-leaf-signs', description: 'Real gold lettering for a premium, classic appearance.' },
    ]} />

    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/sign-restoration/index.astro

```
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Nav from '../../../components/Nav.astro';
import Footer from '../../../components/Footer.astro';
import Breadcrumb from '../../../components/Breadcrumb.astro';
import CTABlock from '../../../components/CTABlock.astro';
import ServiceCard from '../../../components/ServiceCard.astro';
---

<BaseLayout
  title="Sign Restoration — Untitled Mixed Media | Richmond VA"
  description="Restoring faded, damaged, and historic hand-painted signs in Richmond, Virginia. Ghost signs, gilded lettering, and century-old advertisements brought back to life."
>
  <Nav />
  <main class="pt-24 pb-16 px-6 lg:px-12">
    <div class="max-w-7xl mx-auto">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Sign Restoration' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-4" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">
        Sign Restoration
      </p>

      <!-- TODO: Write headline from Brand Book.
           This page is about restoring OLD signs that are fading — not murals.
           Ghost signs, historic gilded lettering, painted advertisements from decades past.
           The headline should honor the original craftsmanship while promising faithful restoration. -->
      <h1 class="font-heading text-titanium-white mb-6 text-balance" data-animate>
        [Placeholder: Write a headline about restoring old signs that are fading.
        Not about murals. About bringing back the craft that was already there —
        ghost signs, gold leaf, century-old painted advertisements.]
      </h1>

      <!-- PLACEHOLDER COPY: 2-3 sentences about sign restoration.
           Problem: historic and vintage signs are fading, flaking, and disappearing.
           Internal: it feels like losing a piece of the building's identity and the neighborhood's history.
           Guide: UMM restores signs using the same techniques the original sign painters used.
           We match materials, study the original lettering, and bring it back faithfully.
           Success: the sign looks the way it did when it was first painted — or better. -->
      <p class="font-body text-shadow-gray mb-16 max-w-2xl" style="font-size: var(--text-fluid-lg);" data-animate>
        [Placeholder: Write 2-3 sentences about sign restoration. Open with what's being lost —
        the ghost signs and gilded lettering fading off Richmond's buildings. Then introduce the
        restoration approach: matching original materials and techniques, faithful to the original craft.]
      </p>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-[var(--spacing-section)]">
        <div data-animate="fade" data-animate-delay="1">
          <ServiceCard
            title="Ghost Signs Richmond VA"
            description="[Placeholder: Faded painted advertisements on brick — preserving or restoring Richmond's ghost signs.]"
            href="/hand-painted-signs/sign-restoration/ghost-signs-richmond-va"
          />
        </div>
        <div data-animate="fade" data-animate-delay="2">
          <ServiceCard
            title="Historic Sign Restoration"
            description="[Placeholder: Restoring signs on historic buildings — matching original materials and techniques.]"
            href="/hand-painted-signs/sign-restoration/historic-sign-restoration"
          />
        </div>
        <div data-animate="fade" data-animate-delay="3">
          <ServiceCard
            title="Secretary of Interior Standards"
            description="[Placeholder: Restoration work that meets the Secretary of the Interior's Standards for historic preservation.]"
            href="/hand-painted-signs/sign-restoration/secretary-of-interior-standards"
          />
        </div>
        <div data-animate="fade" data-animate-delay="1">
          <ServiceCard
            title="Sign Restoration Cost"
            description="[Placeholder: What determines restoration cost — condition, materials, size, and historic requirements.]"
            href="/hand-painted-signs/sign-restoration/sign-restoration-cost"
          />
        </div>
        <div data-animate="fade" data-animate-delay="2">
          <ServiceCard
            title="How It Works"
            description="[Placeholder: The restoration process — assessment, documentation, materials matching, restoration, sealing.]"
            href="/hand-painted-signs/sign-restoration/how-it-works"
          />
        </div>
      </div>

      <!-- Parent link -->
      <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg);">
        <a href="/hand-painted-signs" class="text-titanium-white underline underline-offset-4 hover:text-soft-gray transition-colors duration-200">
          &larr; Back to Hand-Painted Signs
        </a>
      </p>
    </div>
  </main>

  <CTABlock />

  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/sign-restoration/ghost-signs-richmond-va.astro

```
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Nav from '../../../components/Nav.astro';
import Footer from '../../../components/Footer.astro';
import Breadcrumb from '../../../components/Breadcrumb.astro';
import CTABlock from '../../../components/CTABlock.astro';
import FAQSection from '../../../components/FAQSection.astro';
import RelatedPages from '../../../components/RelatedPages.astro';
---

<BaseLayout title="Ghost Signs in Richmond, VA | Untitled Mixed Media" description="A guide to Richmond's ghost signs — fading hand-painted advertisements from the 19th and 20th centuries. Documenting, preserving, and restoring Richmond's painted history.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Sign Restoration', href: '/hand-painted-signs/sign-restoration' },
        { label: 'Ghost Signs' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Sign Restoration
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Ghost Signs in Richmond, VA
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> Write 2-3 sentences for the history enthusiast, property owner, or preservation organization in Richmond who values the fading hand-painted advertisements on their building or in their neighborhood. They want to understand what they have, whether it can be saved, and what responsible stewardship looks like. This page will become a comprehensive photographed guide to Richmond's ghost signs — a backlink magnet for local history searches.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> The ghost sign on their building is fading, flaking, or being painted over. They do not know whether it has historical significance or if anything can be done to protect it before it disappears entirely.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They feel a sense of responsibility toward something they did not create but now own. They worry about making the wrong decision — restoring too aggressively or neglecting it until it is gone.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> A city's visual history should not vanish through indifference. These signs are public artifacts — they deserve documentation and informed care.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> Express genuine enthusiasm for Richmond's painted advertising history. Demonstrate authority through knowledge of sign-painting techniques, paint chemistry, and local history. Position UMM as the guide who documents and preserves — not someone who paints over the past.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> The ghost sign is documented, stabilized, and preserved for future generations. The property gains character, historical credibility, and a story worth telling. The building becomes a landmark, not just an address.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> Another year of weathering and neglect. The sign fades beyond recognition, is painted over during a renovation, or crumbles when the building is repointed. Once it is gone, it is gone.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a high-quality photograph of a notable Richmond ghost sign. This page will eventually feature a curated gallery of ghost signs across the city with locations, dates, and historical context. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'What is a ghost sign?', answer: 'A ghost sign is a hand-painted advertisement — typically on a brick building exterior — that has survived from an earlier era. Most date from the late 1800s through the mid-1900s, before vinyl signage and digital printing replaced brush-and-paint lettering. They are called ghost signs because they appear to fade in and out of visibility depending on light and weather conditions.' },
      { question: 'Can ghost signs be restored?', answer: 'Many can, but the approach depends on the sign\'s condition, the paint layers involved, and the building owner\'s goals. Some signs respond well to careful stabilization and inpainting. Others are better left alone with a protective coating to slow further deterioration. A professional assessment determines what is possible and responsible.' },
      { question: 'What is the difference between preservation and restoration?', answer: 'Preservation focuses on stopping further damage — stabilizing the surface, applying protective coatings, and documenting the sign as it exists. Restoration goes further, matching original colors and repainting faded areas to bring the sign closer to its original appearance. The right approach depends on the sign\'s historical significance and the owner\'s intent.' },
      { question: 'How much does ghost sign restoration cost?', answer: 'Cost varies based on sign size, wall condition, accessibility, and the level of intervention required. A condition assessment is the first step — it identifies what is feasible and provides a clear scope of work and pricing. Visit our sign restoration cost page for a detailed breakdown of factors that influence pricing.' },
    ]} />
    <RelatedPages heading="Related" pages={[
      { title: 'Historic Sign Restoration', href: '/hand-painted-signs/sign-restoration/historic-sign-restoration', description: 'Full restoration for deteriorating historic signs.' },
      { title: 'Secretary of the Interior Standards', href: '/hand-painted-signs/sign-restoration/secretary-of-interior-standards', description: 'Federal standards for historic sign restoration.' },
      { title: 'Sign Restoration Cost', href: '/hand-painted-signs/sign-restoration/sign-restoration-cost', description: 'What drives the cost of restoring a sign.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/sign-restoration/historic-sign-restoration.astro

```
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Nav from '../../../components/Nav.astro';
import Footer from '../../../components/Footer.astro';
import Breadcrumb from '../../../components/Breadcrumb.astro';
import CTABlock from '../../../components/CTABlock.astro';
import FAQSection from '../../../components/FAQSection.astro';
import RelatedPages from '../../../components/RelatedPages.astro';
---

<BaseLayout title="Historic Sign Restoration | Untitled Mixed Media" description="Professional historic sign restoration in Richmond, VA. Color matching, structural repair, and documentation for deteriorating hand-painted signs on historic buildings.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Sign Restoration', href: '/hand-painted-signs/sign-restoration' },
        { label: 'Historic Sign Restoration' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Sign Restoration
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Historic Sign Restoration
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> Write 2-3 sentences for the property owner whose historic building has a deteriorating hand-painted sign. They may be in a historic district, renovating a commercial building, or have inherited a property with significant signage. They want the sign restored correctly — not covered up, not approximated, but brought back with accuracy and care.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> The sign is flaking, fading, or structurally compromised. Paint is delaminating from the substrate. Letters are illegible. The sign may be at risk during upcoming building work.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They do not know who to trust with this work. Most sign companies install vinyl or digital prints. They need someone who understands traditional materials and techniques — and who will not cut corners on a piece that cannot be replaced.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> Historic signs are irreplaceable cultural artifacts. Restoration should honor the original craftsmanship, not erase it with modern shortcuts.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> Show deep knowledge of traditional sign-painting materials — lead-based paints, gold leaf sizing, enamel systems. Demonstrate familiarity with historic color matching using spectrophotometry. Emphasize documentation as part of the process: before, during, and after photography, material analysis, and a written report.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> The sign is restored to its documented historic appearance. The building gains character, meets preservation requirements, and tells a story that connects the present to the past. Documentation provides a permanent record of the work.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> The sign continues to deteriorate until it is beyond saving. Or worse — it is painted over during a renovation by someone who does not understand what they are covering. Either way, the original is lost permanently.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a before-and-after photo of a historic sign restoration project. Show the deteriorated state alongside the completed restoration. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'How do you assess a historic sign before restoration?', answer: 'The assessment begins with a site visit to examine the sign\'s condition, substrate integrity, paint layers, and structural attachment. We photograph the sign in detail, take paint samples for color analysis, and document any areas of loss or damage. The assessment report includes a condition summary, recommended scope of work, and cost estimate.' },
      { question: 'How do you match original colors on a historic sign?', answer: 'We use spectrophotometer readings on surviving paint to identify the original pigments and color values. Where original paint is too deteriorated, we cross-reference with historical paint catalogs and period-appropriate color systems. The goal is an accurate match to the original — not a modern reinterpretation.' },
      { question: 'Can you repair structural damage to historic signs?', answer: 'Yes. Structural issues — cracked substrates, detached mounting hardware, water-damaged wood panels — are addressed before any paint restoration begins. We stabilize the physical structure using period-appropriate materials and techniques whenever possible, ensuring the repair is durable without compromising the sign\'s historic character.' },
      { question: 'Do you document the restoration process?', answer: 'Every restoration is documented with before, during, and after photography. We record material analysis, color matching data, and the methods used at each stage. The final documentation package serves as a permanent record for the property owner, preservation boards, and future maintenance planning.' },
    ]} />
    <RelatedPages heading="Related" pages={[
      { title: 'Ghost Signs in Richmond', href: '/hand-painted-signs/sign-restoration/ghost-signs-richmond-va', description: 'A guide to Richmond\'s fading painted advertisements.' },
      { title: 'Secretary of the Interior Standards', href: '/hand-painted-signs/sign-restoration/secretary-of-interior-standards', description: 'Federal standards for historic sign restoration.' },
      { title: 'Sign Restoration Cost', href: '/hand-painted-signs/sign-restoration/sign-restoration-cost', description: 'What drives the cost of restoring a sign.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/sign-restoration/secretary-of-interior-standards.astro

```
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Nav from '../../../components/Nav.astro';
import Footer from '../../../components/Footer.astro';
import Breadcrumb from '../../../components/Breadcrumb.astro';
import CTABlock from '../../../components/CTABlock.astro';
import FAQSection from '../../../components/FAQSection.astro';
import RelatedPages from '../../../components/RelatedPages.astro';
---

<BaseLayout title="Secretary of the Interior Standards for Sign Restoration | Untitled Mixed Media" description="How the Secretary of the Interior's Standards for Rehabilitation apply to historic sign restoration. Compliance guidance for property owners in historic districts.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Sign Restoration', href: '/hand-painted-signs/sign-restoration' },
        { label: 'Secretary of Interior Standards' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Sign Restoration
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        Secretary of the Interior Standards for Sign Restoration
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> Write 2-3 sentences for the property owner in a historic district or the preservation board member who needs sign restoration work that complies with the Secretary of the Interior's Standards for the Treatment of Historic Properties. They want to restore a sign correctly — meeting federal preservation guidelines — without navigating the regulatory language alone.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> The sign needs restoration, but the property is in a historic district. Any work must comply with the Secretary of the Interior's Standards or risk losing tax credits, violating local ordinances, or triggering enforcement from the preservation review board.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They feel overwhelmed by the regulatory requirements. The standards are written in federal bureaucratic language. They do not know what is actually required versus recommended, or how to document compliance.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> Historic preservation standards exist to protect cultural heritage — but they should enable responsible restoration, not paralyze property owners with confusion.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> Demonstrate working knowledge of the Secretary of the Interior's Standards for Rehabilitation — particularly Standards 2, 5, 6, and 9 as they apply to historic signage. Show familiarity with documentation requirements, the distinction between preservation and rehabilitation, and how to coordinate with State Historic Preservation Officers (SHPOs). Position UMM as the contractor who handles the regulatory side so the owner does not have to.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> The sign is restored in full compliance with federal standards. Documentation supports tax credit applications. The preservation board approves the work. The property owner has a clear record proving responsible stewardship.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> Non-compliant work triggers enforcement, jeopardizes tax credits, or requires costly re-work. The property owner faces fines, delays, or a damaged relationship with the preservation board.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a photo of a sign restoration project in a recognized historic district. Ideally show the documentation process — condition assessment photography, paint sampling, or the completed restoration with the historic building context visible. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'What do the Secretary of the Interior Standards require for sign restoration?', answer: 'The Standards for Rehabilitation require that character-defining features — including historic signs — be retained and repaired rather than replaced. New materials should match the original in design, color, texture, and material. Work should not destroy historic materials or alter features that characterize the property. The standards prioritize minimal intervention and reversible treatments.' },
      { question: 'How do I comply with the standards for my sign project?', answer: 'Compliance starts with documentation: photographing the existing condition, analyzing original materials, and developing a scope of work that follows the standards\' hierarchy of preservation treatments. We prepare the documentation package and can coordinate with your local preservation office or State Historic Preservation Officer to ensure the proposed work meets requirements before any paint is applied.' },
      { question: 'Can sign restoration qualify for historic tax credits?', answer: 'Yes. Work on a certified historic structure that follows the Secretary of the Interior Standards may qualify for the federal Historic Rehabilitation Tax Credit (20% of qualified rehabilitation expenditures). Sign restoration can be part of a larger rehabilitation project. Proper documentation is essential — the tax credit application requires before-and-after photos, material descriptions, and proof of standards compliance.' },
      { question: 'What documentation is required for standards-compliant restoration?', answer: 'Documentation typically includes: pre-restoration condition photographs, material analysis (paint samples, substrate assessment), a written scope of work describing proposed treatments, progress photography during restoration, and final documentation of the completed work. This package supports tax credit applications, satisfies preservation board requirements, and creates a permanent record for the property.' },
    ]} />
    <RelatedPages heading="Related" pages={[
      { title: 'Historic Sign Restoration', href: '/hand-painted-signs/sign-restoration/historic-sign-restoration', description: 'Full restoration for deteriorating historic signs.' },
      { title: 'Ghost Signs in Richmond', href: '/hand-painted-signs/sign-restoration/ghost-signs-richmond-va', description: 'A guide to Richmond\'s fading painted advertisements.' },
      { title: 'Sign Restoration', href: '/hand-painted-signs/sign-restoration', description: 'Full sign restoration services for historic and commercial signage.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/sign-restoration/sign-restoration-cost.astro

```
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Nav from '../../../components/Nav.astro';
import Footer from '../../../components/Footer.astro';
import Breadcrumb from '../../../components/Breadcrumb.astro';
import CTABlock from '../../../components/CTABlock.astro';
import FAQSection from '../../../components/FAQSection.astro';
import RelatedPages from '../../../components/RelatedPages.astro';
---

<BaseLayout title="How Much Does Sign Restoration Cost? | Untitled Mixed Media" description="Transparent breakdown of sign restoration pricing. What drives cost, what to expect from an assessment, and how restoration compares to replacement.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Sign Restoration', href: '/hand-painted-signs/sign-restoration' },
        { label: 'Sign Restoration Cost' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Sign Restoration
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        How Much Does Sign Restoration Cost?
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> Write 2-3 sentences for anyone researching sign restoration pricing. They may be a property owner, a business operator, or a preservation organization with a budget to manage. They want to understand what drives cost before they reach out — not be surprised by a number they cannot contextualize.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> They have a sign that needs restoration but no frame of reference for what it should cost. Online pricing information is vague or nonexistent. Every sign company says "it depends" without explaining what it depends on.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> They feel anxious about being overcharged or underserved. They do not want to commit to a conversation with a contractor without understanding the general pricing landscape first.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> Pricing should be transparent. People researching restoration deserve honest information, not a sales funnel.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> Be transparent about what drives restoration costs. Break down the factors clearly: sign size, condition severity, substrate type, access requirements, material complexity (gold leaf vs. enamel vs. latex), and whether historic compliance documentation is needed. Show that pricing is based on scope, not guesswork.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> They understand what they are paying for before they commit. The assessment gives them a clear scope, a defensible budget, and confidence that the work will be done correctly. No surprises.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> They delay the decision because the cost is unknown. The sign deteriorates further, making eventual restoration more expensive — or impossible. Or they hire the cheapest option and get work that does not last.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add a photo showing the restoration process at a stage that communicates craftsmanship — close-up of color matching, detail work, or material preparation. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'Is there a fee for the initial assessment?', answer: 'Yes. A professional condition assessment is the foundation of accurate pricing. It includes a site visit, detailed photography, paint and substrate analysis, and a written report with scope of work and cost estimate. The assessment fee is applied toward the project cost if you proceed with restoration.' },
      { question: 'What factors affect sign restoration cost?', answer: 'The primary cost drivers are: sign dimensions, severity of deterioration, substrate type and condition (wood, metal, brick, stone), height and access requirements (scaffolding or lift rental), material complexity (gold leaf, enamel, specialty pigments), and whether historic compliance documentation is required. Each factor is itemized in the assessment report so you see exactly what you are paying for.' },
      { question: 'Is restoration more expensive than replacement?', answer: 'Not always. A new hand-painted sign requires design, fabrication, and installation from scratch. Restoration works with what already exists. For signs with historical value, restoration preserves irreplaceable character that no replacement can replicate. For signs with no historical significance, replacement may be more cost-effective — we will tell you honestly which approach makes more sense.' },
      { question: 'How long does a typical sign restoration take?', answer: 'Timeline depends on the sign\'s condition and the scope of work. Minor stabilization and touch-up may take a few days on-site. Full restoration of a large, severely deteriorated sign can take several weeks. The assessment report includes a projected timeline so you can plan accordingly.' },
    ]} />
    <RelatedPages heading="Related" pages={[
      { title: 'Historic Sign Restoration', href: '/hand-painted-signs/sign-restoration/historic-sign-restoration', description: 'Full restoration for deteriorating historic signs.' },
      { title: 'Ghost Signs in Richmond', href: '/hand-painted-signs/sign-restoration/ghost-signs-richmond-va', description: 'A guide to Richmond\'s fading painted advertisements.' },
      { title: 'Hand-Painted Signs', href: '/hand-painted-signs', description: 'All hand-painted sign services.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/hand-painted-signs/sign-restoration/how-it-works.astro

```
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Nav from '../../../components/Nav.astro';
import Footer from '../../../components/Footer.astro';
import Breadcrumb from '../../../components/Breadcrumb.astro';
import CTABlock from '../../../components/CTABlock.astro';
import FAQSection from '../../../components/FAQSection.astro';
import RelatedPages from '../../../components/RelatedPages.astro';
---

<BaseLayout title="How Sign Restoration Works | Untitled Mixed Media" description="The sign restoration process from assessment to protective coating. Five steps that bring a deteriorating historic sign back to life.">
  <Nav />
  <main class="pt-32 pb-16">
    <div class="px-6 lg:px-12 max-w-4xl">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Hand-Painted Signs', href: '/hand-painted-signs' },
        { label: 'Sign Restoration', href: '/hand-painted-signs/sign-restoration' },
        { label: 'How It Works' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-6" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        Sign Restoration
      </p>

      <h1 class="font-heading text-titanium-white mb-6" style="font-size: var(--text-fluid-4xl); line-height: 1.1; letter-spacing: -0.03em;">
        How Sign Restoration Works
      </h1>

      <div class="space-y-6 mb-16">
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-lg); line-height: 1.6;">
          <strong class="text-titanium-white">CHARACTER & DESIRE:</strong> You own a building with a painted sign that is fading, peeling, or barely legible. You want to know what is actually involved in bringing it back before you commit to anything. You are researching, not buying yet. You need enough information to evaluate whether restoration makes sense for your sign.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (External):</strong> The sign is deteriorating and you do not understand the restoration process. Is it just repainting? Do you need to remove the sign? How long will it take? Without understanding the steps, you cannot evaluate proposals or make an informed decision.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Internal):</strong> You feel uninformed and do not want to agree to something you do not fully understand. You want to be an educated buyer who asks the right questions.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PROBLEM (Philosophical):</strong> A craft process should be transparent. The person paying for the work deserves to understand every step and why it matters.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">GUIDE:</strong> We walk you through each phase with clarity and zero jargon. Every step has a purpose. Nothing is done arbitrarily. The process protects the sign and your investment.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">PLAN:</strong> 1. We visit your site. 2. You see the design before we start. 3. We paint it and prove it.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Success):</strong> A restored sign that looks the way it was meant to look, protected against further deterioration, with full documentation of the work performed and materials used.
        </p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-base); line-height: 1.6;">
          <strong class="text-titanium-white">STAKES (Failure):</strong> Without proper restoration, the sign continues to fade until it is gone entirely. Once the original letterforms and design are lost, they cannot be recovered. Every year of delay narrows the window for responsible restoration.
        </p>
      </div>

      <div class="bg-midnight-graphite p-8 mb-16 border border-slate-gray">
        <p class="font-mono text-smoke-gray uppercase mb-3" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">Image placeholder</p>
        <p class="font-body text-shadow-gray" style="font-size: var(--text-fluid-sm);">
          Add process photos showing different stages of restoration: assessment documentation, stabilization work, color matching, and the completed result. A multi-image series works well here. Use Astro Image component when real photos are available.
        </p>
      </div>
    </div>

    <FAQSection items={[
      { question: 'How long does the full restoration process take?', answer: 'From initial assessment to completed protective coating, most sign restorations take 4-8 weeks. The assessment and material analysis phase takes 1-2 weeks. Stabilization and restoration timelines vary based on the sign\'s size and condition. We provide a detailed timeline in the assessment report so you can plan around the work.' },
      { question: 'Can all signs be saved?', answer: 'Not always. Some signs have deteriorated beyond the point where responsible restoration is possible. The substrate may be too damaged, too much original material may be lost, or the cost of restoration may exceed the value of the result. The assessment is honest about what is feasible. If a sign cannot be saved, we document it thoroughly before it is lost.' },
      { question: 'What if the sign is too damaged to restore?', answer: 'If the original sign is beyond saving, we discuss alternatives: full documentation and archival photography of the remaining elements, creation of a historically informed reproduction, or a new sign designed in the spirit of the original. The assessment report lays out the options clearly.' },
      { question: 'What maintenance is needed after restoration?', answer: 'Every completed restoration includes a maintenance guide specific to the sign\'s materials, exposure, and protective coating system. Typical recommendations include annual inspection for coating integrity, gentle cleaning as needed, and reapplication of protective coating every 5-10 years depending on exposure.' },
    ]} />
    <RelatedPages heading="Related" pages={[
      { title: 'Ghost Signs in Richmond', href: '/hand-painted-signs/sign-restoration/ghost-signs-richmond-va', description: 'A guide to Richmond\'s fading painted advertisements.' },
      { title: 'Historic Sign Restoration', href: '/hand-painted-signs/sign-restoration/historic-sign-restoration', description: 'Full restoration for deteriorating historic signs.' },
      { title: 'Sign Restoration Cost', href: '/hand-painted-signs/sign-restoration/sign-restoration-cost', description: 'What drives the cost of restoring a sign.' },
    ]} />
    <CTABlock />
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/work/index.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import ServiceCard from '../../components/ServiceCard.astro';
---

<BaseLayout
  title="Work — Untitled Mixed Media"
  description="Hand-painted murals and signs for businesses across Richmond, Virginia. Two service lines, one craft — built from your actual location."
>
  <Nav />
  <main class="pt-24 pb-16 px-6 lg:px-12">
    <div class="max-w-7xl mx-auto">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Work' },
      ]} />

      <p class="font-mono text-smoke-gray uppercase mb-4" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">
        What we do
      </p>

      <!-- TODO: Replace with identity-transformation headline from Brand Book.
           This headline should position the visitor's building as the character
           and UMM's craft as the guide that transforms anonymous walls into landmarks. -->
      <h1 class="font-heading text-titanium-white mb-6 text-balance" data-animate>
        Murals and hand-painted signs built from your actual location.
      </h1>

      <!-- PLACEHOLDER COPY: This paragraph introduces UMM's two service lines — murals and hand-painted signs.
           StoryBrand structure: The visitor is the character. Their problem is that their building looks
           anonymous, blends in, or fails to communicate what happens inside. UMM is the guide who starts
           with the building itself — its history, its neighborhood, its architecture — and paints something
           that can only exist in that one place. Write 2-3 sentences that make the visitor feel understood
           before introducing the services below. -->
      <p class="font-body text-shadow-gray mb-16 max-w-2xl" style="font-size: var(--text-fluid-lg);" data-animate>
        [Placeholder: Write 2-3 sentences introducing both service lines. Open with empathy for the problem —
        a building that doesn't reflect what happens inside it. Then bridge to the two ways UMM solves it:
        murals that transform identity and signs that outlast vinyl.]
      </p>

      <div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
        <div data-animate="fade" data-animate-delay="1">
          <ServiceCard
            title="Murals"
            description="[Placeholder: Write 1-2 sentences about murals as identity transformation, not decoration. The mural is discovered from the building's own story — its neighborhood, its history, its architecture. It can only exist in that one place.]"
            href="/murals"
          />
        </div>
        <div data-animate="fade" data-animate-delay="2">
          <ServiceCard
            title="Hand-Painted Signs"
            description="[Placeholder: Write 1-2 sentences about signs as craft that outlasts vinyl. Hand-painted lettering weathers into a building's character instead of peeling off in three years. Gold leaf, window lettering, menu boards — every letter placed by hand.]"
            href="/hand-painted-signs"
          />
        </div>
      </div>
    </div>
  </main>

  <CTABlock />

  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/work/signs.astro

```
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';

// Sign photos — add images to public/images/signs/ as they become available
const signs: { src: string; alt: string; client?: string }[] = [
  // { src: '/images/signs/example-1.jpg', alt: 'Handpainted sign for Example Business', client: 'Example Business' },
];
---

<BaseLayout
  title="Hand-Painted Signs — Untitled Mixed Media"
  description="Lettering, gold leaf, and sign restoration work for businesses across Richmond, Virginia."
>
  <Nav />
  <main class="pt-24 pb-16 px-6 lg:px-12">
    <div class="max-w-4xl mb-12">
      <h1 class="font-heading text-titanium-white mb-6 text-balance" data-animate>
        Hand-Painted Signs
      </h1>
      <p class="font-body text-[var(--text-fluid-lg)] text-shadow-gray text-balance" data-animate>
        Lettering, gold leaf, and restoration work for businesses across Richmond.
        Every sign is painted by hand — no vinyl, no prints, no shortcuts.
      </p>
    </div>

    {signs.length > 0 ? (
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {signs.map((sign) => (
          <div class="group overflow-hidden" data-animate>
            <div class="aspect-[4/3] overflow-hidden bg-midnight-graphite">
              <img
                src={sign.src}
                alt={sign.alt}
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {sign.client && (
              <p class="font-sans text-[var(--text-fluid-xs)] text-smoke-gray tracking-wide mt-2">
                {sign.client}
              </p>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div class="border border-slate-gray py-24 text-center" data-animate>
        <p class="font-body text-[var(--text-fluid-lg)] text-shadow-gray mb-2">
          Sign portfolio coming soon.
        </p>
        <p class="font-sans text-[var(--text-fluid-sm)] text-smoke-gray">
          In the meantime, reach out at{' '}
          <a href="mailto:hello@untitledmixedmedia.com" class="text-titanium-white hover:underline underline-offset-4">
            hello@untitledmixedmedia.com
          </a>
        </p>
      </div>
    )}

    <!-- Back to work -->
    <div class="mt-16 border-t border-slate-gray pt-8">
      <a
        href="/work"
        class="font-sans text-[var(--text-fluid-sm)] text-shadow-gray uppercase tracking-[0.15em] hover:text-titanium-white transition-colors"
      >
        &larr; All Work
      </a>
    </div>
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/murals/[...slug].astro

```
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import CTABlock from '../../components/CTABlock.astro';
import Button from '../../components/Button.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await render(project);
const { title, description, cover, tags, client, location, materials, date } = project.data;
const year = date.getFullYear();

// Prev/Next navigation within mural projects
const allProjects = (await getCollection('projects'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
const currentIndex = allProjects.findIndex((p) => p.id === project.id);
const prevProject = allProjects[currentIndex - 1] ?? allProjects[allProjects.length - 1];
const nextProject = allProjects[currentIndex + 1] ?? allProjects[0];
---

<BaseLayout
  title={`${title} — Untitled Mixed Media`}
  description={description}
  ogImage={cover}
>
  <Nav />
  <main class="pt-24">
    <!-- Breadcrumb + Title -->
    <div class="px-6 lg:px-12 mb-8">
      <div class="max-w-7xl mx-auto">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Work', href: '/work' },
          { label: 'Murals', href: '/murals' },
          { label: title },
        ]} />

        <h1 class="font-heading text-titanium-white mb-3 text-balance">
          {title}
        </h1>
        <p class="font-sans text-shadow-gray tracking-wide" style="font-size: var(--text-fluid-sm);">
          {[client, location, year].filter(Boolean).join(' · ')}
        </p>
      </div>
    </div>

    <!-- Hero image -->
    <div class="px-6 lg:px-12 mb-16">
      <div class="max-w-7xl mx-auto">
        <div class="aspect-[21/9] overflow-hidden">
          <img
            src={cover}
            alt={title}
            class="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      </div>
    </div>

    <!-- About This Project -->
    <div class="px-6 lg:px-12 mb-20">
      <div class="max-w-7xl mx-auto">
        <p class="font-sans text-shadow-gray uppercase mb-8" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">
          About This Project
        </p>

        <div class="grid lg:grid-cols-[1fr_280px] gap-12">
          <p class="font-body text-shadow-gray text-balance" style="font-size: var(--text-fluid-lg); max-width: var(--measure-wide);">
            {description}
          </p>

          <aside class="lg:border-l lg:border-slate-gray lg:pl-8 space-y-5">
            {client && (
              <div>
                <span class="font-sans text-smoke-gray uppercase mb-1 block" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">Client</span>
                <p class="font-body text-titanium-white">{client}</p>
              </div>
            )}
            {location && (
              <div>
                <span class="font-sans text-smoke-gray uppercase mb-1 block" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">Location</span>
                <p class="font-body text-titanium-white">{location}</p>
              </div>
            )}
            {materials && (
              <div>
                <span class="font-sans text-smoke-gray uppercase mb-1 block" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">Materials</span>
                <p class="font-body text-titanium-white">{materials}</p>
              </div>
            )}
            <div>
              <span class="font-sans text-smoke-gray uppercase mb-1 block" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">Year</span>
              <p class="font-body text-titanium-white">{year}</p>
            </div>
            <div>
              <span class="font-sans text-smoke-gray uppercase mb-2 block" style="font-size: var(--text-fluid-xs); letter-spacing: var(--tracking-wider);">Tags</span>
              <div class="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span class="font-mono text-smoke-gray border border-slate-gray px-2.5 py-0.5 uppercase tracking-wider" style="font-size: var(--text-fluid-xs);">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>

    <!-- Rendered markdown content -->
    <div class="case-study-content px-6 lg:px-12 pb-16">
      <div class="max-w-7xl mx-auto">
        <div class="case-study-prose">
          <Content />
        </div>
      </div>
    </div>

    <CTABlock />

    <!-- Prev / Next Navigation -->
    <nav class="px-6 lg:px-12 border-t border-slate-gray">
      <div class="max-w-7xl mx-auto py-12 grid grid-cols-2 gap-8">
        <a href={`/murals/${prevProject.id}`} class="group">
          <span class="font-sans text-smoke-gray uppercase block mb-2" style="font-size: var(--text-fluid-xs); letter-spacing: 0.15em;">
            Previous
          </span>
          <span class="font-heading text-titanium-white group-hover:text-soft-gray transition-colors" style="font-size: var(--text-fluid-lg);">
            {prevProject.data.title}
          </span>
        </a>
        <a href={`/murals/${nextProject.id}`} class="group text-right">
          <span class="font-sans text-smoke-gray uppercase block mb-2" style="font-size: var(--text-fluid-xs); letter-spacing: 0.15em;">
            Next
          </span>
          <span class="font-heading text-titanium-white group-hover:text-soft-gray transition-colors" style="font-size: var(--text-fluid-lg);">
            {nextProject.data.title}
          </span>
        </a>
      </div>
    </nav>
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/pages/404.astro

```
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import Button from '../components/Button.astro';
---

<BaseLayout title="Page Not Found | Untitled Mixed Media" description="The page you're looking for doesn't exist. Head back to the homepage." noindex={true}>
  <Nav />
  <main class="pt-24 pb-16 px-6 lg:px-12 flex items-center min-h-[60vh]">
    <div>
      <p class="font-mono text-smoke-gray uppercase mb-4" style="font-size: var(--text-fluid-xs); letter-spacing: 0.08em;">
        404
      </p>
      <h1 class="font-heading text-titanium-white mb-6 text-balance" style="font-size: var(--text-fluid-4xl); line-height: 1.1;">
        This page doesn't exist.
      </h1>
      <Button href="/" variant="ghost">
        Back to Home
      </Button>
    </div>
  </main>
  <Footer />
</BaseLayout>
```

---

## FILE: src/content/journal/choosing-a-muralist-richmond-va.md

```
---
title: "How to Choose a Muralist in Richmond, VA"
description: "What to look for when hiring a mural painter in Richmond — portfolio depth, insurance, process transparency, and materials knowledge. A practical guide for property owners and businesses."
date: 2025-01-06
tags: ["murals", "richmond", "hiring"]
author: "Spencer Bennett"
featured: false
---

## COPYWRITING GUIDE — This is a placeholder post

**Target keyword:** "how to choose a muralist Richmond VA"
**Search intent:** Commercial investigation — someone ready to hire but unsure how to vet candidates
**Word count target:** 1,400–1,800 words

### What this post covers

A practical checklist for business owners, property managers, and organizations in Richmond who want to commission a mural but have never hired a muralist before. The post positions Untitled Mixed Media as the obvious choice by educating the reader on what separates professional mural painters from hobbyists.

---

## Why Hiring a Muralist Is Different from Hiring a Painter

Explain that mural work is not house painting. It requires fine art skill, architectural awareness, surface chemistry knowledge, and project management ability. Set the stakes: a bad mural is expensive to fix and visible to everyone. Tone should be informative without being alarmist — the goal is to help, not scare.

## Check the Portfolio — But Know What You're Looking For

Tell the reader what to evaluate beyond "does it look nice." Look for range of scale, variety of surfaces (brick, stucco, metal, wood), indoor vs. outdoor experience, and evidence of longevity (photos of work that still looks good years later). Mention that phone photos from a moving car are not a portfolio — professional documentation matters.

## Ask About Insurance and Licensing

Explain why general liability insurance matters for mural work (ladders, scaffolding, public spaces, property damage risk). Mention that not all muralists carry it. This is a quiet differentiator for UMM. Link to the insurance and licensing page to show transparency.

## Understand Their Process Before You Sign

Walk through what a professional mural process looks like: site visit, measurements, design concepts, revision rounds, surface prep, painting, sealing. Red flags: no site visit, no written proposal, no revision policy, no timeline. Green flags: photogrammetry, pre-visualization renders, written contracts with clear deliverables.

## Ask About Materials

Explain why paint choice matters for longevity. Exterior murals need UV-resistant, breathable paint (mineral paint like KEIM, or high-quality exterior acrylics like Nova Color). Ask about primers, sealants, and anti-graffiti coatings. A muralist who cannot name their materials is a risk.

## Get a Written Contract

Brief section on what should be in a mural contract: scope, timeline, payment schedule, revision policy, VARA rights, maintenance guidance. This protects both sides. Tie into the VARA blog post when it publishes.

## Richmond-Specific Considerations

Mention Richmond's mural culture (the Mural Project, the arts district, public art programs). Note that Richmond's humidity, UV exposure, and brick surfaces create specific material requirements. A muralist who works here should know these conditions intimately.

---

### Key internal links to include

- [Our Process](/about/process) — reference when discussing the professional mural process
- [Insurance & Licensing](/about/insurance-and-licensing) — link when discussing insurance requirements
- [Murals](/murals) — link as the primary service page for mural work
```

---

## FILE: src/content/journal/hand-painted-sign-care-guide.md

```
---
title: "How to Care for a Hand-Painted Sign"
description: "A sign painter's guide to maintaining hand-painted signs — cleaning methods, resealing schedules, sun damage prevention, and the mistakes that shorten a sign's life."
date: 2025-09-15
tags: ["signs", "maintenance", "care"]
author: "Spencer Bennett"
featured: false
---

## COPYWRITING GUIDE — This is a placeholder post

**Target keyword:** "hand-painted sign maintenance" / "how to care for painted signs"
**Search intent:** Informational — someone who already owns a hand-painted sign and wants to protect their investment
**Word count target:** 1,000–1,400 words

### What this post covers

A practical maintenance guide for owners of hand-painted signs. This post serves two purposes: it helps existing clients extend the life of their signs (building loyalty and referrals), and it positions UMM as the expert resource for anyone searching for sign care advice (top-of-funnel SEO). Tone: helpful, specific, no-nonsense. Give actionable instructions, not vague advice.

---

## Why Maintenance Matters

Brief opener establishing that hand-painted signs are built to last, but they are not maintenance-free. A sign that gets basic care will outlast a neglected one by years. The good news: maintenance is simple, infrequent, and inexpensive compared to replacement. Frame this as protecting an investment, not doing chores.

## Cleaning: What to Use and What to Avoid

Specific instructions. Use a soft cloth or sponge with mild soap and water. Rinse gently. For stubborn grime, a diluted all-purpose cleaner is fine. What NOT to do: never pressure wash a painted sign (it strips paint and drives moisture into wood grain), never use abrasive scrubbers or steel wool, never use acetone or harsh solvents near lettering. Be direct about the pressure washing warning — it is the most common mistake.

## When to Reseal

Explain that clear coats (spar varnish, marine-grade polyurethane, or UV-protective clear coat) degrade over time from sun exposure. Exterior signs should be inspected annually and resealed every 2–4 years depending on sun exposure and weather. Signs under awnings or on north-facing walls need less frequent resealing. Interior signs may never need resealing. Explain what to look for: the finish appears chalky, dull, or rough to the touch.

## Sun Damage Prevention

Discuss UV degradation honestly. All paints fade over time in direct sun — but some pigments fade faster than others (reds and yellows fade before blues and blacks). UV-protective clear coats slow this process significantly. If a client is choosing a sign location, recommend a spot that gets morning sun rather than harsh afternoon western exposure. For existing signs, the reseal schedule is the primary defense.

## When It's Time for a Touch-Up

Explain the signs that indicate touch-up is needed: visible color fading, hairline cracks in the paint film, minor chipping at edges. Touch-ups are a normal part of a sign's lifecycle, not a sign of failure. A professional touch-up at year 5–8 can extend a sign's appearance by another 5+ years. Encourage readers to contact the original painter for touch-ups to ensure color matching.

## Common Mistakes That Shorten Sign Life

A quick list format works here. Pressure washing (strips paint). Mounting without standoffs (traps moisture behind the sign, causes rot). Ignoring resealing (UV damage accelerates). Cleaning with harsh chemicals (dissolves paint binder). Hanging in a location with no air circulation (moisture problems). Each mistake should have a one-sentence explanation of why it is harmful.

---

### Key internal links to include

- [Hand-Painted Signs](/hand-painted-signs) — primary service page for sign work
- [Why Hand-Painted Signs Last Longer](/hand-painted-signs/why-hand-painted-signs-last-longer) — deeper dive on longevity
```

---

## FILE: src/content/journal/hand-painted-vs-vinyl.md

```
---
title: "Hand-Painted Signs vs Vinyl: A 12-Year Cost Breakdown"
description: "Vinyl signs cost less upfront. Hand-painted signs cost less per year. Here's the math over 12 years, and why the difference matters more than you think."
date: 2026-02-21
tags: ["signs", "vinyl", "cost comparison"]
author: "Spencer Bennett"
featured: false
---

## COPYWRITING GUIDE — This is a placeholder post

**Target keyword:** "hand-painted signs vs vinyl signs"
**Search intent:** Commercial comparison — someone deciding between options
**Word count target:** 1,200-1,500 words

### Structure

**Opening (hook):**
Start with the 12-year total cost comparison as a bold claim. "A hand-painted sign costs more on day one. It costs less by year three. By year twelve, it's not even close."

**The math:**
Build a real cost comparison table:
- Vinyl sign: $X upfront, replacement every 3-4 years (UV fade, peeling, cracking), total over 12 years
- Hand-painted sign: $X upfront, maintenance touch-up at year 6-8, total over 12 years
- Show cost-per-year for each

**Why vinyl fails:**
- UV degradation timeline
- Adhesive failure in Virginia humidity
- Edge peeling and bubbling
- Color fade progression
- The "cheap look" accumulation over time

**Why hand-painted lasts:**
- Paint bonded to substrate (not adhesive film)
- Touch-up and maintenance possible (vinyl must be fully replaced)
- Develops patina that vinyl can't replicate
- The craftsmanship premium is real and documented (17% handmade premium research)

**The identity argument:**
"What does your sign say about how you run your business?" Link back to the controlling idea.

### Internal links to include
- [Hand-Painted vs Vinyl](/hand-painted-signs/hand-painted-vs-vinyl) — detailed comparison service page
- [Cost Per Year Comparison](/hand-painted-signs/cost-per-year-comparison) — the numbers page
- [Why Hand-Painted Signs Last Longer](/hand-painted-signs/why-hand-painted-signs-last-longer) — durability page
- [Storefront Signs Richmond VA](/hand-painted-signs/storefront-signs-richmond-va) — if they need a storefront sign

### CTA
Primary: "Get a quote for a hand-painted sign" → /contact
Transitional: "See our sign work" → /hand-painted-signs
```

---

## FILE: src/content/journal/interior-murals-vs-wallpaper.md

```
---
title: "Interior Murals vs. Wallpaper: Which Is Right for Your Space?"
description: "Cost, longevity, customization, and maintenance — a side-by-side comparison of interior murals and wallpaper to help you decide which is the better investment for your space."
date: 2025-12-04
tags: ["murals", "interior design", "comparison"]
author: "Spencer Bennett"
featured: false
---

## COPYWRITING GUIDE — This is a placeholder post

**Target keyword:** "interior mural vs wallpaper" / "painted mural or wallpaper"
**Search intent:** Commercial comparison — someone in the design phase of a renovation or buildout
**Word count target:** 1,200–1,600 words

### What this post covers

An honest, balanced comparison of interior murals and wallpaper. The reader is a restaurant owner planning a renovation, an interior designer evaluating options for a client, or a homeowner deciding between the two. The post should be genuinely balanced — wallpaper is the right choice in some situations — but by the end, the reader should understand the specific scenarios where a painted mural is the superior investment. Tone: practical, comparative, not preachy.

---

## The Quick Comparison

Open with a comparison table or summary that gives the reader the key differences at a glance. Cover: upfront cost, lifespan, customization level, installation time, maintenance requirements, removal difficulty, and environmental impact. This gives scanners the answer immediately and encourages them to read the detail below.

## Cost: Upfront vs. Lifetime

Be honest about upfront cost. Custom wallpaper murals (not standard patterned wallpaper) range from $X–$X per square foot installed. Hand-painted murals range from $X–$X per square foot. The painted mural costs more upfront in most cases. But wallpaper in high-traffic or high-humidity environments (restaurants, bathrooms, lobbies) often needs replacement every 5–8 years. A painted mural in the same space can last 15–20+ years with minimal maintenance. Calculate the lifetime cost for each.

## Customization: Infinite vs. Catalog

Wallpaper — even custom-printed wallpaper — starts from a digital file. It is limited by print resolution, repeat patterns, and seam placement. A painted mural is truly one-of-one: it responds to the specific architecture of the room, wraps around corners and obstacles, and can incorporate textures and techniques (metallic leaf, dimensional brushwork) that print cannot replicate. For spaces where uniqueness matters — a restaurant dining room, a hotel lobby, a branded retail environment — a painted mural is in a different category.

## Longevity and Durability

Cover the failure modes of each. Wallpaper: seam lifting, moisture bubbling (especially in humid environments like kitchens and bathrooms), fading from sun exposure, and physical damage from contact. A torn section often requires replacing the entire panel. Painted murals: more resistant to humidity, can be touched up locally without affecting the surrounding area, and sealed surfaces are cleanable. Be fair: in low-traffic, controlled environments (a bedroom, a home office), high-quality wallpaper performs well.

## Installation Impact

Discuss the practical differences. Wallpaper installation is faster (hours to a day for most rooms) but requires perfectly smooth, primed walls. Textured walls, brick, or uneven surfaces are wallpaper killers. A painted mural can be applied to almost any surface — textured walls, brick, concrete, curved surfaces — with proper preparation. For spaces with imperfect walls, a mural may actually be simpler.

## Maintenance and Repairs

Wallpaper maintenance: gentle cleaning with a damp cloth, no harsh chemicals, avoid pulling at seams. Repairs often require panel replacement. Mural maintenance: washable with mild soap, local touch-ups for any damage, resealable. The repair story favors murals — a small scratch or scuff can be painted over in minutes without affecting the rest of the wall.

## When Wallpaper Is the Right Choice

Be honest and build trust. Wallpaper makes sense for: standard residential bedrooms, spaces where the occupant will want to change the look in 5–10 years, pattern-based designs that benefit from perfect repeatability, and tight budgets where custom painting is not feasible. Do not dismiss wallpaper — acknowledge its strengths so the mural recommendation carries more weight.

## When a Painted Mural Is the Better Investment

Summarize the scenarios where a mural wins: commercial spaces designed to last (restaurants, hotels, offices), high-humidity environments, imperfect wall surfaces, spaces where uniqueness is a business asset, and any project where the client wants something that cannot be printed from a catalog.

---

### Key internal links to include

- [Indoor Murals in Richmond](/murals/indoor-murals-richmond-va) — primary service page for interior mural work
- [Mural Cost in Richmond](/murals/mural-cost-richmond-va) — link when discussing pricing and cost comparison
```

---

## FILE: src/content/journal/public-art-funding-virginia.md

```
---
title: "How Public Art Gets Funded in Virginia"
description: "Percent-for-art programs, Virginia Commission for the Arts grants, NEA funding, and community fundraising — a practical guide to how public murals and art installations get funded in Virginia."
date: 2026-01-13
tags: ["public art", "funding", "virginia", "grants"]
author: "Spencer Bennett"
featured: false
---

## COPYWRITING GUIDE — This is a placeholder post

**Target keyword:** "public art funding Virginia" / "how to fund a mural" / "Virginia arts grants"
**Search intent:** Informational / transactional — someone exploring how to make a public art project happen (municipal staff, nonprofit directors, community organizers, or artists)
**Word count target:** 1,400–1,800 words

### What this post covers

A practical overview of how public art gets funded in Virginia, written for the people who actually need to figure out the money: municipal arts coordinators, nonprofit leaders, business improvement districts, community groups, and property owners. This is not an art theory post — it is a funding mechanics post. The reader should finish it knowing exactly which funding sources to pursue and how to combine them. Tone: knowledgeable, practical, encouraging. Untitled Mixed Media has experience with publicly funded projects (Short Pump Mural, Henrico County) and this post demonstrates that expertise.

---

## Percent-for-Art Programs

Explain how percent-for-art ordinances work. A municipality requires that a percentage (typically 1–2%) of the construction budget for public buildings or capital projects be allocated to public art. Virginia does not have a statewide percent-for-art law, but several Virginia localities have adopted their own. List the ones that apply (research needed: Arlington County, Alexandria, Charlottesville, and others). Explain how artists and organizations can access these funds — usually through an RFQ/RFP process managed by the locality's arts commission.

## Virginia Commission for the Arts (VCA) Grants

Detail the VCA's grant programs relevant to public art. The VCA distributes state and federal (NEA pass-through) funds to arts organizations and projects across Virginia. Cover the main grant categories: Project Grants for Organizations, Local Government Challenge Grants, and any individual artist grants that apply to mural or public art work. Include practical details: typical grant amounts, application timelines, matching requirements. Note that VCA grants are competitive and require a strong narrative about community impact.

## National Endowment for the Arts (NEA) Direct Funding

Explain NEA grant programs that fund public art directly: Our Town (creative placemaking), Art Works, and Challenge America. These are federal grants with larger award amounts but also more competitive application processes. Mention that NEA funding often requires partnerships between artists, nonprofits, and local governments. Provide context on typical award sizes and timelines.

## Community Fundraising and Crowdfunding

Cover the grassroots approach. Many community murals are funded through a combination of local business sponsorship, individual donations, and crowdfunding platforms (GoFundMe, Kickstarter). Discuss what makes community-funded projects successful: a compelling story, visible community support, clear budgets, and named artists. Mention that matching donations from local businesses or foundations can significantly boost campaign momentum.

## Municipal Budgets and Capital Improvement Plans

Explain that some public art is funded directly through municipal budgets, parks and recreation departments, or capital improvement plans — not through arts-specific programs. This is how projects like streetscape improvements, park installations, and community center murals often get funded. The key is getting public art written into the budget during the planning phase. Encourage readers to attend budget hearings and advocate for arts line items.

## Combining Funding Sources

The practical reality: most public art projects are funded from multiple sources. A typical funding stack might look like: 40% percent-for-art allocation + 30% VCA grant + 20% local business sponsorship + 10% community fundraising. Walk through how to assemble a funding plan and sequence the applications (government grants often take 6–12 months). Emphasize that this is normal and expected — public art projects are rarely single-source funded.

## How Untitled Mixed Media Works with Funded Projects

Brief section explaining that UMM has experience navigating public funding processes, including RFP responses, community engagement requirements, and the documentation that government-funded projects require. This is not a sales pitch — it is a statement of capability. For organizations with approved funding looking for a muralist, link to the contact page.

---

### Key internal links to include

- [Public Art Murals in Richmond](/murals/public-art-murals-richmond-va) — primary service page for public and community art
- [Contact](/contact) — CTA for organizations ready to discuss a funded project
```

---

## FILE: src/content/journal/richmond-ghost-signs-history.md

```
---
title: "A Brief History of Richmond's Ghost Signs"
description: "Richmond's fading painted advertisements tell the story of a city's commercial past. A look at the ghost sign tradition, notable surviving examples, and the line between preservation and restoration."
date: 2025-04-02
tags: ["ghost signs", "richmond", "history", "preservation"]
author: "Spencer Bennett"
featured: false
---

## COPYWRITING GUIDE — This is a placeholder post

**Target keyword:** "Richmond VA ghost signs" / "ghost signs Richmond history"
**Search intent:** Informational / cultural interest — history buffs, preservation advocates, and local pride
**Word count target:** 1,500–2,000 words
**Link-building potential:** High — this is a backlink magnet post. History blogs, Richmond local media, and preservation organizations may link to it.

### What this post covers

A love letter to Richmond's painted advertising heritage, written by someone who paints signs for a living. The post traces the ghost sign tradition from the late 1800s through the mid-20th century, highlights notable surviving examples around Richmond, and explores the ethical tension between preservation and restoration. The underlying message: hand-painted signs are not dead — they are the oldest and most enduring form of commercial signage.

---

## What Is a Ghost Sign?

Define the term for readers who may not know it. A ghost sign is a hand-painted advertisement on a building's exterior that has faded over decades but remains partially visible. They are artifacts of an era when every business sign was painted by hand. Tone: appreciative, not nostalgic — these are craft objects, not quaint relics.

## The Painted Advertising Era (1880s–1960s)

Brief history of commercial sign painting in America. Wall dogs (itinerant sign painters who traveled city to city), the standardization of lettering styles, the role of lead-based paint in their longevity. Explain why so many ghost signs survived: lead paint adheres tenaciously, brick is porous enough to absorb pigment, and the signs were often covered by later signage that protected them from weathering.

## Why Richmond Has So Many Ghost Signs

Richmond's specific history: tobacco industry signage, Cary Street and Shockoe Bottom commercial districts, the city's relatively gentle approach to demolition compared to other cities that bulldozed their downtowns. Mention specific neighborhoods where ghost signs cluster. If possible, reference 3–5 specific signs by location and what they advertised.

## Notable Surviving Examples

Describe 4–6 ghost signs that are still visible in Richmond today. Include the building address or cross streets, what the sign originally advertised, approximate era, and current condition. This section should feel like a walking tour — something a reader could actually go find. Photographs would strengthen this section significantly (note for Spencer to shoot these).

## Preservation vs. Restoration: Where's the Line?

Explore the ethical debate. Some preservationists argue ghost signs should be left to fade naturally as historical artifacts. Others support careful restoration. A third camp supports painting new signs in the ghost sign tradition. Present all three positions fairly. UMM's stance: we respect the originals and specialize in restoration work that honors the original craft. Link to the sign restoration and ghost signs service pages.

## The Craft Lives On

Close by connecting the ghost sign tradition to contemporary hand-painted sign work. The same techniques — hand lettering, mineral-based paints, direct-to-wall application — are still practiced by a small number of sign painters. Position UMM as carrying this tradition forward in Richmond.

---

### Key internal links to include

- [Ghost Signs in Richmond](/hand-painted-signs/sign-restoration/ghost-signs-richmond-va) — primary service page for ghost sign restoration
- [Sign Restoration](/hand-painted-signs/sign-restoration) — broader restoration service page
```

---

## FILE: src/content/journal/vara-what-property-owners-need-to-know.md

```
---
title: "VARA and Your Mural: What Property Owners Need to Know"
description: "The Visual Artists Rights Act gives muralists legal protections that property owners need to understand. Here is what VARA covers, what triggers it, and how a good contract protects everyone."
date: 2025-10-25
tags: ["murals", "VARA", "legal", "property owners"]
author: "Spencer Bennett"
featured: false
---

## COPYWRITING GUIDE — This is a placeholder post

**Target keyword:** "VARA murals" / "Visual Artists Rights Act mural" / "mural removal legal"
**Search intent:** Informational / legal research — property owners, developers, or business owners who want to understand their obligations
**Word count target:** 1,200–1,600 words
**Disclaimer:** Include a note that this is educational content, not legal advice. Recommend consulting an attorney for specific situations.

### What this post covers

A plain-language explanation of the Visual Artists Rights Act (VARA) as it applies to murals. This post addresses a real anxiety for property owners: "If I commission a mural, can I ever remove it?" The answer is nuanced, and this post walks through it clearly. The underlying message: a well-drafted contract resolves most VARA concerns before they become problems. Tone: informative, balanced, not alarmist. This post serves property owners AND artists.

---

## What Is VARA?

Explain the Visual Artists Rights Act of 1990 in plain language. It is a federal law that grants visual artists two specific rights: the right of attribution (to be credited as the author) and the right of integrity (to prevent intentional destruction or modification of a work of recognized stature). Emphasize that VARA applies automatically — it does not require registration or a contract.

## What Triggers VARA Protection for a Mural?

This is the section most readers came for. Explain the key legal test: "recognized stature." Not every mural qualifies. A mural must have achieved a level of recognition among art experts, the community, or the media to be considered a work of recognized stature. Explain that this is a factual determination, not a clear bright line, which is exactly why contracts matter. Mention key cases briefly (the 5Pointz decision in New York) to illustrate real-world consequences.

## What VARA Does NOT Cover

Clarify the boundaries. VARA does not apply to works made for hire (if the muralist is an employee, not an independent contractor). VARA does not prevent natural deterioration. VARA does not cover works that are not of recognized stature. VARA rights cannot be transferred, but they can be waived in writing. This section should relieve some anxiety while making clear that waivers must be handled carefully.

## How Mural Removal Works Under VARA

Walk through the practical scenarios. If the mural can be removed without destruction (e.g., painted on removable panels), the property owner must give the artist 90 days' written notice to remove it at the artist's expense. If the mural cannot be removed without destruction and it has recognized stature, VARA may prevent removal. If the artist has signed a written waiver, the property owner has more flexibility. Be specific and practical.

## Why Contracts Solve Most VARA Problems

This is the key takeaway. A properly drafted mural contract addresses VARA rights upfront: whether the artist waives VARA rights, under what conditions the mural may be modified or removed, and what notice is required. When both parties agree to these terms before the mural is painted, VARA disputes rarely arise. Position this as standard professional practice, not a red flag.

## UMM's Approach

Briefly explain how Untitled Mixed Media handles VARA in its contracts. Transparent, fair, and professional. Every mural contract includes clear VARA provisions so the property owner knows their rights and obligations from day one. Link to the VARA compliance page and the property owner mural page.

---

### Key internal links to include

- [Property Owner Murals](/murals/property-owner-murals-richmond-va) — service page for property owners commissioning murals
```

---

## FILE: src/content/journal/what-makes-a-mural-last.md

```
---
title: "What Makes a Mural Last? Materials, Prep, and Maintenance"
description: "UV-resistant paints, proper surface preparation, protective sealants, and a maintenance schedule — the four factors that determine whether a mural lasts 5 years or 25."
date: 2025-02-18
tags: ["murals", "maintenance", "materials"]
author: "Spencer Bennett"
featured: false
---

## COPYWRITING GUIDE — This is a placeholder post

**Target keyword:** "how long do murals last" / "mural maintenance"
**Search intent:** Informational — someone researching mural longevity before committing to a project
**Word count target:** 1,200–1,600 words

### What this post covers

A technical but accessible explanation of the four pillars of mural longevity: paint selection, surface preparation, protective coatings, and ongoing maintenance. Written from the perspective of someone who paints murals for a living and has seen what works and what fails in Virginia's climate.

---

## The Four Factors That Determine Mural Lifespan

Brief overview paragraph establishing the framework: materials, prep, protection, and maintenance. Mention that a well-executed exterior mural in Richmond should last 10–25 years depending on exposure, while a poorly executed one can fade noticeably in 2–3 years. Set expectations honestly.

## Paint Selection: Not All Exterior Paint Is Equal

Explain the difference between standard exterior house paint and mural-grade coatings. Cover KEIM mineral silicate paint (bonds chemically to masite, essentially becomes part of the wall), Nova Color acrylics (artist-grade pigment density), and why cheap latex fails outdoors. Discuss lightfastness ratings and UV resistance. Tone: technical but not academic — the reader is a property owner, not a chemist.

## Surface Preparation: The Invisible Foundation

Walk through what proper prep looks like: pressure washing, efflorescence treatment, crack repair, primer selection based on substrate (masonry conditioner for brick, bonding primer for smooth surfaces). Explain that 60% of mural failures trace back to inadequate prep. This is the unsexy part of the work that separates professionals from amateurs.

## Sealants and Protective Coatings

Cover clear coat options: anti-graffiti coatings (sacrificial vs. permanent), UV-protective varnish, breathable vs. non-breathable sealants. Explain why breathability matters on masonry (trapped moisture causes paint delamination). Mention that anti-graffiti coating is especially relevant for street-facing murals in urban Richmond.

## The Maintenance Schedule No One Talks About

Provide a realistic maintenance timeline: annual visual inspection, gentle cleaning every 1–2 years, sealant reapplication every 3–5 years, touch-up painting at year 7–10 for high-exposure walls. Emphasize that maintenance is far cheaper than replacement. Link to the mural maintenance service page.

## Climate Factors in Richmond, VA

Discuss Richmond-specific conditions: high humidity, summer UV intensity, freeze-thaw cycles in winter, pollen buildup in spring. Explain how each affects paint adhesion and color retention. This section makes the post locally relevant and harder for national competitors to replicate.

---

### Key internal links to include

- [Mural Maintenance](/murals/mural-maintenance) — link as the primary service page for maintenance work
- [Outdoor Murals in Richmond](/murals/outdoor-murals-richmond-va) — link when discussing exterior mural considerations
```

---

## FILE: src/content/journal/why-businesses-invest-in-murals.md

```
---
title: "Why Businesses Invest in Murals (And What They Get Back)"
description: "Murals drive foot traffic, generate social media content, strengthen neighborhood identity, and increase property value. Here is the case for treating a mural as a business investment, not an expense."
date: 2025-08-05
tags: ["murals", "business", "ROI"]
author: "Spencer Bennett"
featured: false
---

## COPYWRITING GUIDE — This is a placeholder post

**Target keyword:** "why businesses get murals" / "mural ROI" / "murals for business"
**Search intent:** Commercial investigation — a business owner weighing the decision
**Word count target:** 1,200–1,600 words

### What this post covers

The business case for mural investment. This is not an art post — it is a marketing and real estate post that happens to be about murals. The reader is a restaurant owner, a brewery founder, a retail shop manager, or a property developer who needs to justify the spend. Give them the data and the examples. Tone: direct, business-minded, grounded in results rather than aesthetics.

---

## Murals Are Marketing That Doesn't Expire

Open with the comparison: a digital ad campaign runs for a month and disappears. A mural stays for 10–25 years. Calculate the cost-per-impression over the life of a mural compared to equivalent digital ad spend. Even conservative foot traffic estimates make murals one of the cheapest per-impression marketing channels available. The key insight: a mural works 24 hours a day, 365 days a year, with zero ongoing ad spend.

## Foot Traffic and the Instagram Effect

Discuss how murals become destinations. People seek out photogenic walls for social media content. Every photo posted is free advertising with the business tagged in the background. Reference studies or data points on foot traffic increases near public art installations (the Philadelphia Mural Arts Program, the Wynwood Walls effect in Miami). If Richmond-specific data exists, use it. If not, use national data and localize the argument.

## Neighborhood Identity and Community Goodwill

Explain the softer ROI: murals signal that a business is invested in its neighborhood. They contribute to the street-level character that makes areas walkable and interesting. This matters for businesses in Richmond's arts district, Scott's Addition, Carytown, and Church Hill where neighborhood identity drives economic activity. A mural says "we are part of this place" in a way a vinyl banner never can.

## Property Value and Curb Appeal

Reference available data on public art's effect on property values. Murals transform blank walls (which read as neglect) into visual assets. For property owners with multi-tenant buildings, a mural on the exterior can increase the desirability of the entire property. Link to the property owner mural service page.

## Real Examples

Include 2–3 case study sketches — either UMM projects or well-documented public examples. For each: what the business was, what the mural depicted, and what measurable results followed (increased social mentions, foot traffic anecdotes, press coverage). If UMM's portfolio does not yet have strong ROI case studies, use placeholder structure and note that these should be filled in as data becomes available.

## What a Mural Costs vs. What It Returns

Close with a practical cost framework. Reference the price estimator. Frame the investment in terms of monthly cost over the mural's lifespan. A $6,000 mural that lasts 15 years costs $33/month — less than a single day of Google Ads for most small businesses.

---

### Key internal links to include

- [Business Murals in Richmond](/murals/business-murals-richmond-va) — primary service page for commercial mural clients
- [Property Owner Murals](/murals/property-owner-murals-richmond-va) — service page for property developers and landlords
```

---
