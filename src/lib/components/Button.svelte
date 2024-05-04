<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const {
		children,
		type = 'button',
		...rest
	}: HTMLButtonAttributes & { children: Snippet } = $props();
</script>

<button
	{type}
	{...rest}
	class="rounded border border-zinc-800 px-4 py-2 shadow-lg transition-all active:scale-95"
>
	{@render children()}
</button>
