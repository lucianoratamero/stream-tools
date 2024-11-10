<script lang="ts">
	import { base } from '$app/paths';
	import BokehPage from '$lib/components/BokehPage.svelte';
	import PaletteCard from '$lib/components/PaletteCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import colorPalettes from 'nice-color-palettes/1000.json';
	import { onMount } from 'svelte';

	let history = $state<{ colorPalette: string[]; name?: string }[]>([]);
	let bookmarks = $state<{ colorPalette: string[]; name: string }[]>([]);
	let colorPalette = $state<string[]>();

	const generateColorPalette = () => {
		colorPalette = colorPalettes[Math.floor(Math.random() * 1000)];
		history.push({ colorPalette });
	};

	onMount(() => {
		history = JSON.parse(localStorage.getItem('history') || '[]');
		bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

		colorPalette =
			history[history.length - 1]?.colorPalette || colorPalettes[Math.floor(Math.random() * 1000)];
		if (!history.length) {
			history.push({ colorPalette });
		}
	});

	$effect(() => {
		localStorage.setItem('history', JSON.stringify(history));
	});

	$effect(() => {
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	});
</script>

<svelte:head>
	<title>stream-tools - bokeh - history</title>
</svelte:head>

<main class="grid h-screen grid-cols-2 gap-4 bg-white p-4">
	<div class="relative max-h-full overflow-hidden rounded shadow-lg">
		{#key colorPalette}
			{#if colorPalette}
				<BokehPage isWrapped showForm={false} decay={0.4} {colorPalette} />
			{/if}
		{/key}
	</div>
	<div class="relative flex max-h-full flex-col gap-8 overflow-y-auto rounded border p-4 shadow-lg">
		<section>
			<div class="flex items-center justify-between">
				<h1 class="mb-2 text-2xl font-bold">Bookmarks</h1>
				<a href={`${base}/bokeh`} class="text-blue-500"> Back to bokeh </a>
			</div>
			<div class="mt-2 flex flex-col-reverse gap-2">
				{#each bookmarks as { colorPalette: palette, name }, i}
					<PaletteCard
						isBookmark
						{palette}
						{name}
						{i}
						{colorPalettes}
						bind:history
						bind:bookmarks
						bind:colorPalette
					/>
				{:else}
					<p class="text-gray-500 py-2 text-center">No bookmarks yet</p>
				{/each}
			</div>
		</section>

		<section>
			<div class="flex justify-between">
				<h2 class="text-2xl font-bold">History</h2>
				<Button onclick={generateColorPalette}>Generate color palette</Button>
			</div>
			<div class="mt-2 flex flex-col-reverse gap-2">
				{#each history as { colorPalette: palette, name = '' }, i}
					<PaletteCard
						{palette}
						{name}
						{i}
						{colorPalettes}
						bind:history
						bind:bookmarks
						bind:colorPalette
					/>
				{/each}
			</div>
		</section>
	</div>
</main>
