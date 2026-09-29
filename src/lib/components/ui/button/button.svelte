<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { buttonVariants, type Props } from './index.js';

	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		...restProps
	}: Props = $props();
</script>

<ButtonPrimitive.Root
	bind:ref
	class={cn(buttonVariants({ variant, size }), className)}
	{...restProps}
/>
