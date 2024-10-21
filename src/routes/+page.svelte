<script lang="ts">
	import NavLinks from '$lib/components/NavLinks.svelte';
</script>

<svelte:head>
	<title>stream-tools - home</title>
</svelte:head>

<div class="flex h-screen flex-col gap-4 md:flex-row">
	<div class="flex flex-col">
		<h1 class="text-8xl leading-none md:text-[10rem]">Tools</h1>
		<ul class="flex gap-4">
			<li>
				<a
					href="https://github.com/lucianoratamero/stream-tools"
					target="_blank"
					aria-label="github"
				>
					<iconify-icon height="2rem" icon="mdi:github"></iconify-icon>
				</a>
			</li>
			<li>
				<a href="https://twitch.tv/luciano_ratamero" target="_blank" aria-label="Twitch link">
					<iconify-icon height="2rem" icon="mdi:twitch"></iconify-icon>
				</a>
			</li>
			<li>
				<a href="https://x.com/lucianoratamero" target="_blank" aria-label="Twitter">
					<iconify-icon height="2rem" icon="mdi:twitter"></iconify-icon>
				</a>
			</li>
		</ul>
	</div>
	<nav class="flex flex-col text-4xl md:text-8xl">
		<NavLinks />
	</nav>
</div>
