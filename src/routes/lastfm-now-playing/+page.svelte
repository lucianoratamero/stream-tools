<script lang="ts">
	import { page } from '$app/state';
	import type { NowPlayingData } from '#lib/components/NowPlaying.svelte';
	import NowPlaying from '#lib/components/NowPlaying.svelte';
	import { onMount } from 'svelte';

	interface Artist {
		url: string;
		name: string;
		image: Image[];
		mbid: string;
	}

	interface Image {
		size: string;
		'#text': string;
	}

	interface Album {
		mbid: string;
		'#text': string;
	}

	interface Track {
		artist: Artist;
		mbid: string;
		name: string;
		image: Image[];
		streamable: string;
		album: Album;
		url: string;
		'@attr': {
			nowplaying: string;
		};
		loved: string;
	}

	let show_error = $state(false);
	let data: { recenttracks: { track: Track[] } } | null = $state(null);
	let interval: number | null = $state(null);
	let theme: string | null = $state(null);

	let formatted_data: NowPlayingData | undefined = $derived.by(() => {
		if (data === null) return undefined;

		const track: Track | undefined = data.recenttracks.track.find(
			(track: any) => track['@attr']?.nowplaying === 'true'
		);
		if (!track) return undefined;

		return {
			artist: track.artist.name,
			track: track.name,
			album: track.album['#text'],
			image: track.image.find((image: Image) => image.size === 'large')?.['#text']
		};
	});

	const get_url = (api_key: string, username: string) =>
		`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&format=json&extended=true&api_key=${api_key}&limit=1&user=${username}`;

	const get_now_playing = async (api_key: string, username: string) => {
		const response = await fetch(get_url(api_key, username));
		data = await response.json();
	};

	onMount(() => {
		theme = page.url.searchParams.get('theme');
		const api_key = page.url.searchParams.get('api_key');
		const username = page.url.searchParams.get('username');

		if (!api_key || !username) {
			show_error = true;
			return;
		}
		get_now_playing(api_key, username);

		interval = setInterval(async () => {
			get_now_playing(api_key, username);
		}, 5000);

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	});
</script>

{#if show_error}
	<h1>Please pass the api_key and username search parameters</h1>
{/if}

<NowPlaying now_playing={formatted_data} {theme} />
