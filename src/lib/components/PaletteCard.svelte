<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Input from '$lib/components/ui/input/input.svelte';

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

<Card.Root class="my-4">
	<Card.Content class="pt-6">
		<div>
			<div class="flex items-center justify-center gap-2 pb-2">
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
			{#if isBookmark}
				<Input
					class="mb-2 rounded border p-1"
					pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
					placeholder="Name"
					bind:value={bookmarks[i].name}
				/>
			{:else if isPlaceholder}
				<Input
					class="mb-2 rounded border p-1"
					pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
					placeholder="Name"
					bind:value={name}
				/>
			{:else if history}
				<Input
					class="mb-2 rounded border p-1"
					pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
					placeholder="Name"
					bind:value={history[i].name}
				/>
			{/if}
		</div>
		<div>
			{#key name}
				{#if !isPlaceholder}
					<Button class="mb-2 w-full" onclick={() => (colorPalette = palette)}>Preview</Button>
				{/if}
				{#if name?.length && bookmarks.find((i) => i.name === name)}
					<Button
						class="mb-2 w-full"
						onclick={() => (bookmarks = bookmarks.filter((i) => i.name !== name))}
					>
						Remove bookmark
					</Button>
				{:else}
					<Button
						class="mb-2 w-full"
						disabled={!name?.length || !slugRegex.test(name)}
						title="To add to bookmarks, please provide a name"
						onclick={() => bookmarks.push({ colorPalette: palette, name })}
					>
						Add to bookmarks
					</Button>
				{/if}
			{/key}
		</div>
	</Card.Content>
</Card.Root>
