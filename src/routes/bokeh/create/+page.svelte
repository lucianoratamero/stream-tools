<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import BokehPage from '$lib/components/BokehPage.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import colorPalettes from 'nice-color-palettes/1000.json';
	import { onMount } from 'svelte';

	let bookmarks = $state<{ colorPalette: string[]; name: string }[]>([]);
	let selectedBookmark = $state<string>('');
	let startFrom: 'id' | 'bookmark' | null = $state(null);

	let newColorPalette = $state<string[]>();
	let newColorPaletteName = $state<string>();
	let openPaletteDropdown = $state(false);

	let slugRegex = new RegExp('^[a-z0-9]+(?:-[a-z0-9]+)*$');

	onMount(() => {
		bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
	});

	$effect(() => {
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	});

	$effect(() => {
		if (selectedBookmark) {
			newColorPalette = [...bookmarks[parseInt(selectedBookmark)].colorPalette];
		}
	});
</script>

<svelte:head>
	<title>stream-tools - bokeh - create</title>
</svelte:head>

<main class="grid h-screen grid-cols-2 gap-4 bg-white p-4">
	<div class="relative max-h-full overflow-hidden rounded shadow-lg">
		{#key newColorPalette}
			{#if newColorPalette}
				<BokehPage isWrapped showForm={false} decay={0.4} colorPalette={newColorPalette} />
			{:else}
				<div class="absolute flex h-full w-full items-center justify-center bg-zinc-300">
					<p class="text-2xl text-gray-500">Select a palette to preview</p>
				</div>
			{/if}
		{/key}
	</div>
	<div class="relative flex max-h-full flex-col gap-8 overflow-y-auto rounded border p-4 shadow-lg">
		<section>
				<h1 class="mb-2 text-2xl font-bold">Palette</h1>
			{#if !startFrom}
				<div class="flex gap-2">
					<Button class="grow" onclick={() => (startFrom = 'id')}>Start from palette</Button>
					<Button class="grow" onclick={() => (startFrom = 'bookmark')}>Start from bookmark</Button>
				</div>
			{/if}

			{#if startFrom === 'id'}
				<div>
					<div class="flex justify-between text-black">
						<Button
							onclick={() => {
								startFrom = null;
								newColorPalette = undefined;
							}}
						>
							&lt; Back
						</Button>
						<div class="relative">
							<Button onclick={() => (openPaletteDropdown = !openPaletteDropdown)}>
								Select a palette
							</Button>
							{#if openPaletteDropdown}
								<div
									class="absolute right-0 z-10 flex max-h-64 flex-col gap-2 overflow-y-scroll rounded border bg-white p-2"
								>
									{#each colorPalettes as colors, i}
										<Button
											variant="outline"
											class="flex flex-col"
											onclick={() => {
												newColorPalette = colors;
												openPaletteDropdown = false;
											}}
										>
											<div class="flex justify-between gap-2">
												{#each colors as color}
													<span
														class="inline-block h-4 w-4 rounded-full"
														style="background-color: {color}"
													></span>
												{/each}
											</div>
										</Button>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</div>
			{:else if startFrom === 'bookmark'}
				<div>
					<div class="flex justify-between text-black">
						<Button
							onclick={() => {
								startFrom = null;
								newColorPalette = undefined;
							}}
						>
							&lt; Back
						</Button>
						<select class="rounded border p-1" bind:value={selectedBookmark}>
							<option class="text-black" value="">Select a bookmark</option>
							{#each bookmarks as { name }, i}
								<option class="text-black" value={i}>{name}</option>
							{/each}
						</select>
					</div>
				</div>
			{/if}
			{#if newColorPalette}
				<div class="mt-4 rounded border p-4">
					<div class="flex justify-between gap-2">
						<Input
							pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
							placeholder="Name"
							bind:value={newColorPaletteName}
						/>
						{#key newColorPaletteName}
							<Button
								title="To add to bookmarks, please provide a name as slug"
								disabled={!newColorPaletteName?.length || !slugRegex.test(newColorPaletteName)}
								onclick={() => {
									bookmarks.push({
										colorPalette: newColorPalette as string[],
										name: newColorPaletteName as string
									});
									goto(`${base}/?bookmark=${newColorPaletteName}`);
								}}
							>
								Save to bookmarks
							</Button>
						{/key}
					</div>
					<div class="grid w-full grid-cols-5 gap-2 pt-2">
						{#each newColorPalette as _, i}
							<div class="flex flex-col gap-1">
								<Input type="color" class="min-h-20" bind:value={newColorPalette[i]} />
								<Input type="text" class="w-full" bind:value={newColorPalette[i]} />
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</section>
	</div>
</main>
