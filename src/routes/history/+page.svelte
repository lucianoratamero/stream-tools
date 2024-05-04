<script lang="ts">
	import BokehPage from '$lib/components/BokehPage.svelte';
	import Button from '$lib/components/Button.svelte';
	import colorPalettes from 'nice-color-palettes/1000.json';
	import { onMount } from 'svelte';

	let history = $state<{ colorPalette: string[]; name?: string }[]>([]);
	let colorPalette = $state<string[]>();

	const generateColorPalette = () => {
		colorPalette = colorPalettes[Math.floor(Math.random() * 1000)];
		history.push({ colorPalette });
	};

	onMount(() => {
		history = JSON.parse(localStorage.getItem('history') || '[]');
		colorPalette =
			history[history.length - 1]?.colorPalette || colorPalettes[Math.floor(Math.random() * 1000)];
		if (!history.length) {
			history.push({ colorPalette });
		}
	});

	$effect(() => {
		localStorage.setItem('history', JSON.stringify(history));
	});
</script>

<main class="grid h-screen grid-cols-2 gap-4 p-4">
	<div class="relative max-h-full overflow-hidden rounded shadow-lg">
		{#key colorPalette}
			{#if colorPalette}
				<BokehPage isWrapped showForm={false} decay={0.4} {colorPalette} />
			{/if}
		{/key}
	</div>
	<div class="relative max-h-full overflow-y-auto rounded border p-4 shadow-lg">
		<section class="flex justify-between">
			<h2 class="text-2xl font-bold">History</h2>
			<Button onclick={generateColorPalette}>Generate color palette</Button>
		</section>
		<section class="mt-2 flex flex-col-reverse gap-2">
			{#each history as { colorPalette: palette, name = '' }, i}
				<div class="flex items-center gap-2">
					<div class="grow">
						<input
							class="border p-1"
							placeholder="Name"
							oninput={(e) => (history[i] = { colorPalette: palette, name: e.currentTarget.value })}
							value={name}
						/>
					</div>
					<div class="flex gap-1">
						{#each palette as color}
							<span class="inline-block h-4 w-4 rounded-full" style="background-color: {color}"
							></span>
						{/each}
					</div>
					<div><Button onclick={() => (colorPalette = palette)}>Preview</Button></div>
				</div>
			{/each}
		</section>
	</div>
</main>
