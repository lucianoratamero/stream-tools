<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import scanlines from '$lib/img/scanlines.png';
	import { onMount } from 'svelte';
	import Confetti from 'svelte-confetti';

	let crt_effect_enabled = $state(false);
	let confetti_effect_enabled = $state(false);
	let bokeh_effect_enabled = $state(false);
	let bokeh_options: { transparentBg?: string; bookmark?: string; decay?: string } = {};
	let bokeh_options_string = $derived(new URLSearchParams(bokeh_options).toString());

	onMount(() => {
		const search_params = $page.url.searchParams;

		if (search_params.has('crt')) {
			crt_effect_enabled = true;
		}
		if (search_params.has('confetti')) {
			confetti_effect_enabled = true;
		}
		if (search_params.has('bokeh')) {
			bokeh_effect_enabled = true;
			if (search_params.has('transparentBg')) {
				bokeh_options.transparentBg = search_params.get('transparentBg') as string;
			}
			if (search_params.has('bookmark')) {
				bokeh_options.bookmark = search_params.get('bookmark') as string;
			}
			if (search_params.has('decay')) {
				bokeh_options.decay = search_params.get('decay') as string;
			}
		}
	});
</script>

{#if crt_effect_enabled}
	<img src={scanlines} class="crt size fixed h-full w-full bg-cover" alt="CRT background effect" />
{/if}

{#if confetti_effect_enabled}
	<div class="absolute left-1/2 top-[-1rem] z-10">
		<Confetti
			size={20}
			amount={200}
			duration={6000}
			y={[1, 2]}
			x={[-6, 6]}
			fallDistance="120vh"
			infinite
		/>
	</div>
{/if}

{#if bokeh_effect_enabled}
	<iframe
		title="bokeh"
		src={`${base}/bokeh?${bokeh_options_string}`}
		class="fixed h-full w-full bg-cover"
	></iframe>
{/if}

<style>
	.crt {
		background-size: 100% 1px;
	}
</style>
