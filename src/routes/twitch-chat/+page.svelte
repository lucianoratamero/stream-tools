<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { collection, init } from './lib.svelte';
	import './themes/base.scss';
	import './themes/pixel.scss';

	let error = $state(false);
	let tmi_client: any = $state();
	let theme: string | null | undefined = $state();
	let align: string | undefined = $state();

	$effect(() => {
		if (collection.messages.length && align !== 'top') {
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

		let { client } = init({ channel, twitch_id, message_screen_time });
		tmi_client = client;

		const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

		// reset the client every 3 minutes to prevent timeouts
		const timeout = setInterval(async () => {
			console.log('resetting client');
			tmi_client.disconnect();
			sleep(10); // just enough time to disconnect
			let { client } = init({ channel, twitch_id, message_screen_time });
			tmi_client = client;
		}, 1000 * 60 * 3);

		return () => {
			tmi_client.disconnect();
			clearTimeout(timeout);
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
	{#each collection.messages as item (item.id)}
		<div class="message" in:fade={{ duration: 150 }} out:slide>
			{@html item.processed}
		</div>
	{/each}
</div>
