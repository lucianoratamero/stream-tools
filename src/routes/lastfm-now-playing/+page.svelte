<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

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

	let formatted_data: any = $derived.by(() => {
		if (data === null) return null;

		const track: Track | undefined = data.recenttracks.track.find((track: any) => track['@attr']?.nowplaying === 'true');
		if (!track) return null;

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
		const api_key = $page.url.searchParams.get('api_key');
		const username = $page.url.searchParams.get('username');

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

{#if formatted_data}
	<div class="flex items-center text-lg gap-4 p-4 bg-slate-800 text-white bg-opacity-80 rounded-xl w-[400px]">
		<img class="h-24 w-24" src="{formatted_data.image}" alt="{formatted_data.track} by {formatted_data.artist}" />
		<div class="flex flex-col justify-center overflow-hidden">
			<h1 class="font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">{formatted_data.track}</h1>
			<h2 class="whitespace-nowrap overflow-hidden overflow-ellipsis">{formatted_data.artist}</h2>
			<h3 class="whitespace-nowrap overflow-hidden overflow-ellipsis">{formatted_data.album}</h3>
		</div>
	</div>
{/if}
