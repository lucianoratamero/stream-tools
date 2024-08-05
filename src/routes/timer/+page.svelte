<script lang="ts">
	import { page } from '$app/stores';
	import confetti_audio from '$lib/audio/confetti.mp3';
	import mario_party_finish from '$lib/audio/mario-party-finish.mp3';
	import { onMount } from 'svelte';
	import { Confetti } from 'svelte-confetti';

	let countdown_time: number | undefined = $state();
	let show_timer = $state(false);
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

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	onMount(() => {
		const searchParams = $page.url.searchParams;
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

{#if show_timer}
	<div class="flex h-screen flex-col items-center justify-center text-white">
		<div class="relative rounded-sm bg-slate-600 bg-opacity-20 px-6 py-3 tabular-nums">
			{#if show_error}
				<p>Invalid time</p>
			{:else if countdown_time && countdown_time > 0}
				<p class="text-9xl font-bold">{formatted_time}</p>
			{:else}
				<p class="inline-block text-9xl font-bold text-green-600">
					{formatted_time}
				</p>
				<audio src={confetti_audio} autoplay></audio>
				<audio src={mario_party_finish} autoplay></audio>
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
