<script lang="to">
	import { GithubLogo, LinkedinLogo, XLogo, EnvelopeSimple } from 'phosphor-svelte'
	import { user } from '$lib/config';
</script>

<footer class="md:max-h-[50px] md:flex-row gap-y-1 flex-col-reverse flex items-center justify-between w-full md:h-[50px] p-8 md:px-16 bg-slate-950">
	
	<div>			
		<span class="text-xs text-slate-300 flex items-center font-extrabold gap-2">
			&copy; {new Date().getFullYear()} <span class="text-2xl puzzled">{user?.first_name} {user?.last_name}</span>
		</span>
	</div>

	<nav>
		<a href="/#about">About</a>

		<span class="text-2xl block font-extralight">/</span>

		<a href="/projects">Projects</a>

		<span class="text-2xl block font-extralight">/</span>

		<a href="/blog">Blog</a>
	</nav>

	{#if user.socials.email || user.socials.github || user.socials.x || user.socials.linkedin }
	<nav class="flex items-center">
		{#if user.socials.email}
		<a href="mailto:{user?.email}" target="_blank">
			<EnvelopeSimple weight="fill" size={28} />
		</a>
		{/if}

		{#if user.socials.github}
		<a href="{user?.socials?.github}" target="_blank">
			<GithubLogo weight="fill" size={24} />
		</a>
		{/if}
		
		{#if user.socials.x}		
		<a href="{user?.socials?.x}" target="_blank">
			<XLogo weight="fill" size={24} />
		</a>
		{/if}

		{#if user.socials.linkedin}		
		<a href="{user?.socials?.linkedin}" target="_blank">
			<LinkedinLogo weight="fill" size={24} />
		</a>
		{/if}
	</nav>
	{/if}
</footer>

<style>
	nav{
		display: flex;
		align-items: center;
	}
	nav a{
		display: block;
		margin: 4px 8px;
	}
</style>