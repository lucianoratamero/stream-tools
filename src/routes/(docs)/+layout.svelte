<script lang="ts">
	let { children } = $props();
</script>

<div class="prose mx-auto p-4 text-2xl">
	{@render children()}
</div>
