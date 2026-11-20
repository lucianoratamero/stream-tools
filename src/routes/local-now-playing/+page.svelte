<script lang="ts">
	import { page } from '$app/state';
	import type { NowPlayingData } from '#lib/components/NowPlaying.svelte';
	import NowPlaying from '#lib/components/NowPlaying.svelte';
	import websocketState, { type WebSocketState } from '#lib/websocket.svelte.ts';
	import { onMount } from 'svelte';

	let web_socket_data = $state<WebSocketState>(undefined);
	let now_playing = $derived(web_socket_data?.state as NowPlayingData | undefined);
	let theme = $state<string | null>(null);

	onMount(() => {
		theme = page.url.searchParams.get('theme');
		web_socket_data = websocketState(page.url.searchParams.get('ws-url') ?? 'ws://localhost:12000');
	});
</script>

<NowPlaying {now_playing} {theme} />
