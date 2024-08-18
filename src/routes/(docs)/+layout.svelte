<script lang="ts">
	let { children } = $props();
</script>

<div class="prose mx-auto break-words px-4 pb-8 md:text-2xl">
	{@render children()}
</div>
