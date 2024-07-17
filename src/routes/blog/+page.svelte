<script lang="ts">
import IntersectionObserver from "svelte-intersection-observer";
import InfiniteLoading from 'svelte-infinite-loading';
import { user } from '$lib/config'

const api = 'api/posts';
let element;
let intersecting;


let posts = [];
let page = 1;

function infiniteHandler({ detail: { loaded, complete } }) {
    fetch(`${api}?page=${page}`)
    .then(response => response.json())
    .then(({ posts: newPosts, totalPosts }) => {
        console.log(totalPosts)
        if (newPosts.length > 0) {
            page += 1;
            posts = [...posts, ...newPosts];
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
    <title>Blog</title>
</svelte:head>

<div class="px-8 md:px-16 mb-20 min-h-screen">
    <h1 aria-label="About" class="mb-4 md:mb-8 text-center text-[clamp(1.5rem,20vmin,6rem)] font-extrabold" >
        BLOG
    </h1>

    <nav class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {#each posts as post, index}
            <a href="/blog/{post.slug}" class="relative w-full min-h-[300px] max-h-[400px] shadow-2xl flex p-4 rounded-lg
            bg-no-repeat bg-center bg-cover overflow-hidden group border border-neutral-50/5">
            <div class="absolute inset-0 bg-slate-950 opacity-50"></div>
            <div class="flex-1 flex gap-2 overflow-hidden flex-col justify-end z-10">
                <header class="space-y-2">
                    <h6 class="text-xs font-bold">{formatDate(post.date)}</h6>
                    <h1 class="font-extrabold text-lg md:text-xl whitespace-pre-line break-words hyphens-auto line-clamp-2">
                        {post.title}
                    </h1>
                </header>
                <p class="prose prose-invert prose-sm">
                    {post.description}
                </p>
                <footer class="flex items-center gap-2">
                    <img src={ user.avatar.strip ?? '/favicon.png'} alt="" class="w-10 h-10 rounded-full border border-neutral-50/5">
                    <span class="text-xs font-bold">{user?.first_name} {user?.last_name} </span>
                </footer>
            </div>
        </a>     
    {/each}
</nav>

<IntersectionObserver {element} bind:intersecting>
    <div bind:this={element} class="mt-16">
        <InfiniteLoading spinner="" on:infinite={infiniteHandler}>
            <svelte:fragment slot="noMore" >
                <div>
                </div>
            </svelte:fragment>

            <svelte:fragment slot="noResults" >
                <div>
                    This blog took a break to search for its missing posts. Please enjoy the soothing silence while we whip up some new tales!
                </div>
            </svelte:fragment>      

        </InfiniteLoading>        
    </div>
</IntersectionObserver>
</div>

<style>
    .group {
        position: relative;
        overflow: hidden;
    }
    .group::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url(https://images.unsplash.com/photo-1718027808460-7069cf0ca9ae?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) no-repeat center center / cover;
        transition: transform 1s ease;
    }
    .group:hover::before {
        transform: scale(1.3);
    }
</style>