<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { collection, init } from './lib.svelte';
	import './themes/base.scss';
	import './themes/pixel.scss';

	let error = $state(false);
	let theme: string | null | undefined = $state();
	let align: string | undefined = $state();

	$effect(() => {
		if (collection.messages.length) {
			window.scrollTo(0, document.body.scrollHeight);
		}
	});

	onMount(() => {
		const searchParams = new URLSearchParams(window.location.search);
		let channel = searchParams.get('channel');
		let twitch_id = searchParams.get('twitch_id');
		let message_screen_time = searchParams.get('messageScreenTime');
		align = searchParams.get('align') || 'bottom';
		theme = searchParams.get('theme');

		if (!channel) {
			error = true;
			return;
		}

		const { client } = init({ channel, twitch_id, message_screen_time });

		return () => {
			client.disconnect();
		};
	});
</script>

<svelte:head>
	<title>stream-tools: twitch chat</title>
</svelte:head>

{#if error}
	<div>Channel not found :\ Please put the channel name as the `channel` search parameter.</div>
{/if}

<div
	id="chat"
	class={`${theme || ''} ${align === 'top' ? 'flex-col-reverse justify-start' : 'flex-col justify-end'} flex h-screen`}
>
	{#each collection.messages as item (item.message)}
		<div class="message" in:fade={{ duration: 150 }} out:slide>
			{@html item.processed}
		</div>
	{/each}
</div>
