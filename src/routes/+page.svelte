<script lang="ts">
import { gsap } from 'gsap'
import { Circle } from 'phosphor-svelte';
import { onMount } from 'svelte'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { user } from '$lib/config';

gsap.registerPlugin(ScrollTrigger);

const first_name = user?.first_name.split("");
const last_name = user?.last_name.split("");

let techStackComponent: HTMLElement;


onMount(() => {
  const tl = gsap.timeline();

  tl.fromTo(".name_animation",
    {
      x: -100,
      opacity: 0,
      rotate: -10,
    },
    {
      x: 0,
      opacity: 1,
      rotate: 0,
      ease: 'elastic.out(1,0.3)',
      duration: 2,
      delay: 0.2,
      transformOrigin: 'left top',
      stagger: {
        each: .1,
        from: 'random',
      }
    }
  );

  tl.fromTo(".tagline",
    {
      y: 10,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      y: 0,
      ease: 'elastic.out(1,0.3)'
    }
  );

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: techStackComponent,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 4,
    }
  });

  tl2.fromTo(".tech-row",
    {
      x: (index) => {
        return index % 2 === 0 ? gsap.utils.random(200, 100) : gsap.utils.random(-200, -100)
      }
    },
    {
      x: (index) => {
        return index % 2 === 0 ? gsap.utils.random(-200, -100) : gsap.utils.random(200, 100)
      },
      ease: 'power1.inOut'
    }
  );
});
</script>

<svelte:head>
  <title>{user?.first_name} {user?.last_name}</title>
</svelte:head>

<div class="bg-[url(/bg.webp)] bg-cover bg-origin bg-norepeat">
  <div class="my-auto w-full h-screen gap-8 grid grid-cols-1 md:grid-cols-2 px-4 md:px-8">
    <section class="col-span-1 md:col-start-2 row-start-1"></section>

    <section class="col-span-1 row-start-2 md:row-start-1 py-16 px-4 md:px-8">
      <h1 class="mb-2 md:mb-4 text-[clamp(3rem,20vmin,13rem)] leading-none font-extrabold text-nowrap my-auto" aria-label="{user?.first_name} {user?.last_name}">
        <span class="block text-slate-300">
          {#each first_name as letter}
            <span class="name_animation inline-block opacity-0">
              {letter}
            </span>
          {/each}
        </span>
        <span class="block text-slate-500">
          {#each last_name as letter}
            <span class="name_animation inline-block opacity-0">
              {letter}
            </span>
          {/each}
        </span>
      </h1>

      <h1 class="tagline block bg-gradient-to-tr from-purple-500 to-purple-950 bg-clip-text text-transparent text-xl font-bold uppercase tracking-[.2em] md:text-2xl opacity-0" aria-label="Fullstack Developer">
        {user?.tagline}
      </h1>
    </section>
  </div>

  {#if user.about}
  <section class="px-4 md:px-8 min-h-screen mb-20 sm:mb-0" id="about">
    <div class="h-full px-4 md:px-8">
      <h1 aria-label="About" class="mb-2 md:mb-4 text-[clamp(1.5rem,20vmin,3rem)] font-extrabold h1">
        About Me
      </h1>

      <div class="prose prose-invert prose-slate font-bold">
        {@html user.about}        
      </div>
    </div>
  </section>
  {/if}

  {#if user.techstack}
  <section class="min-h-screen">
    <div bind:this={techStackComponent}>
      <h1 aria-label="Tech Stack py-16" class="mb-4 md:mb-8 text-[clamp(1.5rem,20vmin,3rem)] font-extrabold px-4 md:px-8 h1">
        What I Use
      </h1>

      <section class="overflow-hidden">
        {#each user.techstack as { name, color }, i}
          <div class="tech-row flex items-center justify-center gap-2 text-slate-700 mb-4" aria-label="{name}">
            {#each Array(14) as _, index}
              <span class="tech-item text-3xl font-extrabold uppercase"
                style="color: {index === 6 && color ? color : 'inherit'};">
                {name}
              </span>
              <span>
                <Circle weight="fill" />
              </span>
            {/each}
          </div>
        {/each}
      </section>
    </div>
  </section>
  {/if}
</div>
