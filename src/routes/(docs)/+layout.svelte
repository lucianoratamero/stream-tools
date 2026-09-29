<script lang="ts">
	let { children } = $props();
</script>

<div class="prose mx-auto px-4 pb-8 break-words md:text-2xl">
	{@render children()}
</div>
