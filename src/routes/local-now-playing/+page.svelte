<script lang="ts">
	import { page } from '$app/state';
	import type { NowPlayingData } from '#lib/components/NowPlaying.svelte';
	import NowPlaying from '#lib/components/NowPlaying.svelte';
	import websocketState, { type WebSocketState } from '#lib/websocket.svelte.ts';
	import { onMount } from 'svelte';

	interface RawNowPlaying {
		kMRMediaRemoteNowPlayingInfoTitle?: string;
		kMRMediaRemoteNowPlayingInfoArtist?: string;
		kMRMediaRemoteNowPlayingInfoArtworkData?: string;
		kMRMediaRemoteNowPlayingInfoArtworkMIMEType?: string;
		kMRMediaRemoteNowPlayingInfoPlaybackRate?: number;
	}

	let webSocketData = $state<WebSocketState>(undefined);
	let nowPlayingData: NowPlayingData | undefined = $derived.by(() => {
		const raw: RawNowPlaying | undefined = webSocketData?.state;
		if (
			!raw?.kMRMediaRemoteNowPlayingInfoTitle ||
			raw.kMRMediaRemoteNowPlayingInfoPlaybackRate === 0
		)
			return undefined;

		const artwork = raw.kMRMediaRemoteNowPlayingInfoArtworkData;
		const mimeType = raw.kMRMediaRemoteNowPlayingInfoArtworkMIMEType ?? 'image/jpeg';

		return {
			track: raw.kMRMediaRemoteNowPlayingInfoTitle,
			artist: raw.kMRMediaRemoteNowPlayingInfoArtist ?? '',
			image: artwork ? `data:${mimeType};base64,${artwork}` : undefined
		};
	});

	let theme = $state<string | null>(null);

	onMount(() => {
		theme = page.url.searchParams.get('theme');
		const wsUrl = page.url.searchParams.get('ws-url');
		if (wsUrl) {
			webSocketData = websocketState(wsUrl);
		}
	});
</script>

<NowPlaying now_playing={nowPlayingData} {theme} />
