<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import BokehPage from '$lib/components/BokehPage.svelte';
	import Button from '$lib/components/Button.svelte';
	import { isEqual } from 'lodash-es';
	import colorPalettes from 'nice-color-palettes/1000.json';
	import { onMount } from 'svelte';
	import { Trash } from 'svelte-heros-v2';

	let history = $state<{ colorPalette: string[] }[]>([]);
	let bookmarks = $state<{ colorPalette: string[]; name?: string }[]>([]);
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

		bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
		if ($page.url.searchParams.has('bookmark')) {
			const name = $page.url.searchParams.get('bookmark');
			if (name && bookmarks.some((bookmark) => bookmark.name === name)) {
				colorPalette =
					bookmarks.find((bookmark) => bookmark.name === name)?.colorPalette || colorPalette;
			}
		}
	});

	$effect(() => {
		syncHistory();
	});

	$effect(() => {
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	});

	$effect(() => {
		const bookmarkFromUrl = $page.url.searchParams.get('bookmark');

		if (bookmarkFromUrl) {
			const name = $page.url.searchParams.get('bookmark');
			if (name && bookmarks.some((bookmark) => bookmark.name === name)) {
				colorPalette =
					bookmarks.find((bookmark) => bookmark.name === name)?.colorPalette || colorPalette;
			}
		}
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
	<div class="flex gap-2">
		<Button onclick={changePallette}>Change color palette</Button>
		<Button onclick={goFullscreen}>Go fullscreen</Button>
	</div>
	<div class="flex gap-2">
		<Button href={`${base}/history`}>See history</Button>
		<Button href={`${base}/create`}>Create palette</Button>
	</div>
	<h2 class="text-lg">Bookmarks</h2>
	<div class="grid grid-cols-3 gap-2">
		{#each bookmarks as { name }, i}
			<Button class="flex items-center justify-between gap-2" href={`${base}/?bookmark=${name}`}>
				{name || `Bookmark ${i + 1}`}
				<Button
					type="button"
					class="border-red-800 bg-red-300 !p-1"
					title="Remove bookmark"
					onclick={() => (bookmarks = bookmarks.filter((item) => item.name !== name))}
				>
					<Trash class=" stroke-white" />
				</Button>
			</Button>
		{/each}
	</div>
</form>

<BokehPage {colorPalette} {decay} bind:showForm />
