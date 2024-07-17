<script>
	export let src = ''
	export let alt = ''
</script>

<img {src} {alt} {...$$restProps} loading="lazy">

<style>
	img{
		margin: 0 auto;
	}
</style>