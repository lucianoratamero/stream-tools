<script lang="ts">
	import colorPalettes from 'nice-color-palettes/1000.json';
	import BokehPage from '$lib/components/BokehPage.svelte';

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
</script>

<form class:hidden={!showForm}>
	<p>Click on the canvas to hide the form :]</p>
	<p>
		Decay (recommended: between 0.2 and 1.8):
		<input bind:value={decay} type="number" />
	</p>
	<p><button type="button" onclick={changePallette}> Change color palette</button></p>
	<p><button type="button" onclick={goFullscreen}>fullscreen</button></p>
</form>

<BokehPage
  {colorPalette}
  {decay}
  bind:showForm={showForm}
 />

<style>
	:global {
		form {
			position: fixed;
			right: 1em;
			top: 1em;
			z-index: 99999;
			padding: 1em;
			background: white;
		}

		.hidden {
			display: none !important;
		}
	}
</style>
