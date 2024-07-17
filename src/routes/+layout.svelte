<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="flex flex-col min-h-screen relative overflow-hidden overflow-y-auto bg-slate-950">
	<Header />

	<main class="flex-1 flex flex-col w-screen relative">
		<slot />
	</main>
</div>

<Footer />
