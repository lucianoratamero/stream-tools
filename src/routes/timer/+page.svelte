<script lang="ts">
	import { page } from '$app/stores';
	import confetti_audio from '$lib/audio/confetti.mp3';
	import metal_pipe_falling from '$lib/audio/metal-pipe-falling.mp3';
	import toc_toc from '$lib/audio/toc-toc.mp3';
	import mario_party_finish from '$lib/audio/mario-party-finish.mp3';
	import { onMount } from 'svelte';
	import { Confetti } from 'svelte-confetti';

	let countdown_time: number | undefined = $state();
	let no_audio = $state(false);
	let show_timer = $state(false);
	let invisible_timer = $state(false);
	let audio: 'finish' | 'toctoc' | 'pipe' = $state('finish');
	let video: string | undefined = $state();
	let show_error = $state();
	let formatted_time = $derived.by(() => formatTime(countdown_time));

	function formatTime(time?: number) {
		if (time === undefined) {
			return '00:00:00';
		}
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor(time / 60) % 60;
		const seconds = time % 60;

		if (time < 0) {
			return '00:00:00';
		}

		const formatted_time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
		document.title = `${formatted_time} - stream-tools: timer`;
		return formatted_time;
	}

	onMount(() => {
		const searchParams = $page.url.searchParams;

		if (searchParams.has('noAudio')) {
			no_audio = true;
		}

		if (searchParams.has('invisible')) {
			invisible_timer = true;
		}

		if (searchParams.has('audio')) {
			audio = searchParams.get('audio') as 'finish' | 'toctoc' | 'pipe';
		}

		if (searchParams.has('video')) {
			const yt_url = new URL(searchParams.get('video') as string);
			video = `https://www.youtube.com/embed/${yt_url.searchParams.get('v') as string}?autoplay=1&amp;controls=0`;
		}

		countdown_time = Number(searchParams.get('timeInSeconds'));
		show_error =
			!Number(searchParams?.get('timeInSeconds')) ||
			Number.isNaN(Number(searchParams?.get('timeInSeconds')));

		const interval = setInterval(() => {
			if (!countdown_time || countdown_time <= 0) {
				clearInterval(interval);
				return;
			}
			countdown_time = countdown_time - 1;
		}, 1000);

		show_timer = true;
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>stream-tools: timer</title>
</svelte:head>

{#if show_timer}
	<div class="flex h-screen flex-col items-center justify-center text-white" class:opacity-0={invisible_timer}>
		<div class="relative rounded-sm bg-slate-600 bg-opacity-20 px-6 py-3 tabular-nums">
			{#if show_error}
				<p>Invalid time</p>
			{:else if countdown_time && countdown_time > 0}
				<p class="text-9xl font-bold">{formatted_time}</p>
			{:else}
				<p class="inline-block text-9xl font-bold text-green-600">
					{formatted_time}
				</p>
				{#if !no_audio}
					{#if audio === 'pipe'}
						<audio src={metal_pipe_falling} autoplay></audio>
					{:else if audio === 'toctoc'}
						<audio src={toc_toc} autoplay></audio>
					{:else if !video}
						<audio src={confetti_audio} autoplay></audio>
						<audio src={mario_party_finish} autoplay></audio>
					{/if}

					{#if video}
						<iframe
							title="youtube video"
							class="absolute top-0 left-0 w-full h-full"
							src={video}
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					{/if}
				{/if}
				<div class="absolute left-1/2 top-[95%]">
					<Confetti
						rounded
						x={[-1.6, 1.6]}
						y={[0, 0.7]}
						amount={250}
						fallDistance="100%"
						infinite
					/>
				</div>
			{/if}
		</div>
	</div>
{/if}
