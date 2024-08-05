<script lang="ts">
	import { page } from '$app/stores';
	import scanlines from '$lib/img/scanlines.png';
	import { onMount } from 'svelte';

	let crt_effect_enabled = $state(false);

	onMount(() => {
		const searchParams = $page.url.searchParams;

		if (searchParams.has('crt')) {
			crt_effect_enabled = true;
		}
	});
</script>

{#if crt_effect_enabled}
	<img src={scanlines} class="crt size fixed h-full w-full bg-cover" alt="CRT background effect" />
{/if}

<style>
	.crt {
		background-size: 100% 1px;
	}
</style>
