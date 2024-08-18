<script lang="ts">
	let { children } = $props();
</script>

<div class="prose mx-auto py-8 px-4 text-2xl">
	{@render children()}
</div>
