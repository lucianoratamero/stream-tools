<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	type BaseProps = {
		palette: string[];
		name: string;
		i: number;
		bookmarks: { name: string; colorPalette: string[] }[];
		colorPalette?: string[];
		colorPalettes: string[][];
		isPlaceholder?: boolean;
	};

	type Props =
		| (BaseProps & {
				isBookmark: boolean;
				history?: undefined;
		  })
		| (BaseProps & {
				history: { name?: string; colorPalette: string[] }[];
				isBookmark?: boolean;
		  });

	let {
		history = $bindable(),
		bookmarks = $bindable(),
		colorPalette = $bindable(),
		name = $bindable(),
		palette,
		i,
		colorPalettes,
		isBookmark,
		isPlaceholder
	}: Props = $props();

	let slugRegex = new RegExp('^[a-z0-9]+(?:-[a-z0-9]+)*$');
</script>

<div class="flex items-center justify-between gap-2 rounded border p-2 shadow">
	<div>
		{#if isBookmark}
			<input
				class="mb-2 rounded border p-1"
				pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
				placeholder="Name"
				bind:value={bookmarks[i].name}
			/>
		{:else if isPlaceholder}
			<input
				class="mb-2 rounded border p-1"
				pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
				placeholder="Name"
				bind:value={name}
			/>
		{:else if history}
			<input
				class="mb-2 rounded border p-1"
				pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
				placeholder="Name"
				bind:value={history[i].name}
			/>
		{/if}
		<div class="flex items-center gap-1">
			{#each palette as color}
				<span class="inline-block h-4 w-4 rounded-full" style="background-color: {color}"></span>
			{/each}
			<div class="px-2 text-center">
				<p class="text-sm text-gray-500">Id</p>
				<p>
					{isBookmark
						? i
						: colorPalettes.findIndex((p) => JSON.stringify(p) === JSON.stringify(palette))}
				</p>
			</div>
		</div>
	</div>
	<div>
		{#key name}
			{#if !isPlaceholder}
				<Button onclick={() => (colorPalette = palette)}>Preview</Button>
			{/if}
			{#if name?.length && bookmarks.find((i) => i.name === name)}
				<Button onclick={() => (bookmarks = bookmarks.filter((i) => i.name !== name))}>
					Remove bookmark
				</Button>
			{:else}
				<Button
					disabled={!name?.length || !slugRegex.test(name)}
					title="To add to bookmarks, please provide a name"
					onclick={() => bookmarks.push({ colorPalette: palette, name })}
				>
					Add to bookmarks
				</Button>
			{/if}
		{/key}
	</div>
</div>
