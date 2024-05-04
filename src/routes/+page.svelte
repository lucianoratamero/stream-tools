<script lang="ts">
	import colorPalettes from 'nice-color-palettes/1000.json';
	import BokehPage from '$lib/components/BokehPage.svelte';
	import { onMount } from 'svelte';
	import { isEqual } from 'lodash-es';
	import Button from '$lib/components/Button.svelte';

	let history = $state<{ colorPalette: string[] }[]>([]);
	let colorPalette = $state(colorPalettes[Math.floor(Math.random() * 1000)]);
	let showForm = $state(false);
	let decay = $state(0.4);

	const changePallette = () => {
		colorPalette = colorPalettes[Math.floor(Math.random() * 1000)];
	};

	const goFullscreen = () => {
		const el = document.documentElement;
		const requestFullscreen = el.requestFullscreen;
		requestFullscreen.call(el);
	};

	const syncHistory = () => {
		if (!isEqual(history[history.length - 1]?.colorPalette, colorPalette)) {
			while (history.length >= 100) {
				history.shift();
			}
			history.push({ colorPalette });
			localStorage.setItem('history', JSON.stringify(history));
		}
	};

	onMount(() => {
		history = JSON.parse(localStorage.getItem('history') || '[]');
		syncHistory();
	});

	$effect(() => {
		syncHistory();
	});
</script>

<form
	class="fixed right-4 top-4 z-10 flex flex-col gap-2 rounded-lg bg-white p-4 shadow-xl"
	class:hidden={!showForm}
>
	<p>Click on the canvas to hide the form :]</p>
	<p>
		Decay (recommended: between 0.2 and 1.8):
		<input class="border p-1" bind:value={decay} />
	</p>
	<div>
		<Button onclick={changePallette}>Change color palette</Button>
		<Button onclick={goFullscreen}>Go fullscreen</Button>
	</div>
</form>

<BokehPage {colorPalette} {decay} bind:showForm />
