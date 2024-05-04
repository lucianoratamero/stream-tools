<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	const {
		children,
		disabled = false,
		...rest
	}:
		| ({
				href: string;
				disabled?: boolean;
				children: Snippet;
		  } & HTMLAnchorAttributes)
		| ({ children: Snippet } & HTMLButtonAttributes) = $props();

	const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95';
</script>

{#if 'href' in rest}
	<a
		{...rest}
		class={`
      ${disabledClasses}
      ${rest.class}
      inline-block rounded border border-zinc-800 px-4 py-2 text-center shadow-lg transition-all
    `}
	>
		{@render children()}
	</a>
{:else}
	<button
		type={rest.type || 'button'}
		{disabled}
		{...rest}
		class={`
      ${disabledClasses}
      ${rest.class}
      inline-block rounded border border-zinc-800 px-4 py-2 text-center shadow-lg transition-all
    `}
	>
		{@render children()}
	</button>
{/if}
