<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>
		{$page.status} - {$page.error.message}
	</title>
</svelte:head>

<div class="text-center p-16 text-white">
	<h1 class="text-[clamp(3rem,20vmin,12rem)]">
		{$page.status}
	</h1>
	<p class="font-bold">
		{$page.error.message}
	</p>
</div>