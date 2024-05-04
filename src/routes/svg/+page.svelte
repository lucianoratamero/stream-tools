<script lang="ts">
	import BokehPage from '$lib/components/BokehPage.svelte';
	import Button from '$lib/components/Button.svelte';

	let showForm = $state(false);
	let decay = $state(0.8);
	let svgContent = $state(`
	<svg xmlns="http://www.w3.org/2000/svg" style="fill: red" viewBox="0 0 260 245">
		<path d="m56,237 74-228 74,228L10,96h240"/>
	</svg>
	`);

	const goFullscreen = () => {
		const el = document.documentElement;
		const requestFullscreen = el.requestFullscreen;
		requestFullscreen.call(el);
	};
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
	<textarea class="border p-1" rows="5" cols="30" bind:value={svgContent}></textarea>

	<div class="flex gap-2">
		<Button onclick={goFullscreen}>Go fullscreen</Button>
	</div>
</form>

<BokehPage type="svg" {svgContent} {decay} bind:showForm />
