<script>
	import { MenuIcon } from "lucide-svelte";
	import { X } from "phosphor-svelte";
	import { page } from "$app/stores"
	import { user } from '$lib/config';
		
	let menuOpen = false;
</script>

<header class="max-h-[50px] flex items-center justify-between w-full h-[50px] p-8 md:px-16">	
	<a href="/" aria-label="homepage" class="font-bold text-5xl puzzled"> {user?.first_name} {user?.last_name}
	</a>
	
	<nav class="hidden sm:flex items-center gap-8">
		<a href="/#about">About</a>
		<a href="/projects">Projects</a>
		<a href="/blog">Blog</a>
	</nav>

	<section class="sm:hidden">
		<button aria-expanded="{menuOpen}" aria-label="open menu" on:click={() => menuOpen = true} class="p-0 bg-inherit m-0 outline-none">
			<MenuIcon />
		</button>

		<nav class={
			`font-bold fixed inset-0 z-50 flex flex-col gap-4 bg-slate-50 items-end text-black p-4  transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-[100%]'}`}>

			<button aria-expanded="{menuOpen}" aria-label="open menu" on:click={() => menuOpen = false} class="p-0 m-0 outline-none">
				<X size={28} weight="bold" />
			</button>

			<a on:click={()=> menuOpen = false} href="/projects" class="text-xl">
				Projects
			</a>

			<a on:click={()=> menuOpen = false} href="/blog" class="text-xl">
				Blog
			</a>
		</nav>
	</section>
</header>


<style>
	nav a:hover{
		color: white;
	}
</style>