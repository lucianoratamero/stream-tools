<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Confetti from 'svelte-confetti';
	import { ScreenEffect, initGUI } from './crt/index';
	import './crt/main.scss';

	let crt_effect_enabled = $state(false);
	let crt_root: HTMLElement | undefined = $state();
	let crt_effect: ScreenEffect | undefined = $state();
	let crt_open_gui = $state(false);

	let confetti_effect_enabled = $state(false);

	let bokeh_effect_enabled = $state(false);
	let bokeh_options: { transparentBg?: string; bookmark?: string; decay?: string } = {};
	let bokeh_options_string = $derived(new URLSearchParams(bokeh_options).toString());

	onMount(() => {
		const search_params = $page.url.searchParams;

		if (search_params.has('crt')) {
			crt_effect_enabled = true;

			if (search_params.has('openGUI')) {
				crt_open_gui = true;
			}
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

	$effect(() => {
		document.querySelector('.dg.ac')?.remove();
		if (crt_effect_enabled && crt_root && !crt_effect) {
			crt_effect = new ScreenEffect('#screen', {
				effects: {
					vignette: { enabled: true },
					vcr: {
						enabled: true,
						options: {
							opacity: 1,
							miny: 220,
							miny2: 220,
							num: 70,
							fps: 60
						}
					},
					wobbley: { enabled: true },
					snow: {
						enabled: true,
						options: {
							opacity: 0.2
						}
					}
				}
			});
			crt_effect.start();
			if (crt_open_gui) {
				initGUI(crt_effect, crt_effect.config);
			} else {
				document.querySelector('.dg.ac')?.remove();
			}
		}
	});
</script>

{#if crt_effect_enabled}
	<div id="screen" bind:this={crt_root}></div>
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
