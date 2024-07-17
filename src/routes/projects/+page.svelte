<script lang="ts">
import IntersectionObserver from "svelte-intersection-observer";
import InfiniteLoading from 'svelte-infinite-loading';
import { GithubLogo } from 'phosphor-svelte'

const api = 'api/projects';
let element;
let intersecting;


let projects = [];
let page = 1;

function infiniteHandler({ detail: { loaded, complete } }) {
    fetch(`${api}?page=${page}`)
    .then(response => response.json())
    .then(({ projects: newPosts, totalPosts }) => {
        if (newPosts.length > 0) {
            page += 1;
            projects = [...projects, ...newPosts];
            loaded();
        } else {
            complete();
        }
    });
}

function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

</script>

<svelte:head>
    <title>Projects</title>
</svelte:head>

<div class="px-8 md:px-16 mb-20 min-h-screen">
    <h1 aria-label="About" class="mb-4 md:mb-8 text-center text-[clamp(1.5rem,20vmin,6rem)] font-extrabold" >
        Projects
    </h1>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {#each projects as project, index}
        <div class="shadow-2xl rounded-lg min-h-[300px] border border-neutral-50/5">
            <section class="h-[150px] overflow-hidden">
                <img src="{project.cover ?? '/favicon.png'}" alt="" class="w-full">
            </section>

            <section class="relative flex-1 p-4 flex gap-2 overflow-hidden flex-col justify-end z-10">
                <header class="space-y-2">
                    <h6 class="text-xs font-bold">{formatDate(project.date)}</h6>
                    <a  href="/projects/{project.slug}" class="font-extrabold text-sm md:text-xl whitespace-pre-line break-words hyphens-auto line-clamp-2 flex items-center justify-between underline">
                        {project.title}
                    </a>
                </header>
                <p class="prose prose-invert prose-sm line-clamp-4">
                    {project.description}
                </p>
                
                {#if project.links}
                    <footer class="flex items-center gap-2 mt-4">
                        <a href={project?.links?.github}>
                            <GithubLogo weight="fill" size={24} />                        
                        </a>                                    
                    </footer>
                {/if}
            </section>
        </div>    
        {/each}
    </div>

    <IntersectionObserver {element} bind:intersecting>
        <div bind:this={element} class="mt-16">
            <InfiniteLoading spinner="" on:infinite={infiniteHandler}>
                <svelte:fragment slot="noMore" >
                    <div>
                    </div>
                </svelte:fragment>

                <svelte:fragment slot="noResults" >
                    <div>
                    </div>
                </svelte:fragment>      

            </InfiniteLoading>        
        </div>
    </IntersectionObserver>
</div>