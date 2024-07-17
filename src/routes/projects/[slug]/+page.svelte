<script lang="ts">
import type { PageData } from './$types';
export let data: PageData;
const { metadata, content } = data;
</script>

<svelte:head>
    <title>{metadata.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content="{metadata.title}" />
</svelte:head>

<div class="p-8 md:px-16 mb-20 flex flex-col gap-4">
    <hgroup class="space-y-4 md:space-y-6">
        <h1 class="text-[clamp(1.5rem,20vmin,2.5rem)] font-extrabold whitespace-pre-line text-center">{metadata.title}</h1>
        <h1 class="text-center">
            <span class="text-indigo-500 font-bold">{metadata.date}</span>
        </h1>

        {#if metadata.cover}
        <section class="max-h-[150px] w-[80%] mx-auto md:max-h-[300px] shadow-2xl rounded-lg overflow-hidden">
            <img src="{metadata.cover}" alt="{metadata.title} cover image" class="w-full">                
        </section>
        {/if}
    </hgroup>

    <div class="min-h-screen prose prose-invert max-w-none w-full md:w-[80%] mx-auto
    prose-headings:text-indigo-500 prose-strong:text-red-500 prose-a:text-yellow-500 prose-p:text-white
    prose-headings:whitespace-pre-line prose-li:text-white prose-img:rounded-lg
    " role="document">
        <svelte:component this={content} />            
    </div>
</div>