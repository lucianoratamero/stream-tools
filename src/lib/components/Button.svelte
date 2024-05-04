<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const {
		children,
		type = 'button',
		disabled,
		...rest
	}: HTMLButtonAttributes & { children: Snippet } = $props();

	const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95';
</script>

<button
	{type}
	{disabled}
	{...rest}
	class={`
    ${disabledClasses}
    rounded border border-zinc-800 px-4 py-2 shadow-lg transition-all
  `}
>
	{@render children()}
</button>
