<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Confetti } from 'svelte-confetti';

	let countdown_time = $state(Number($page.url.searchParams.get('timeInSeconds')));
	const formatted_time = $derived.by(() => formatTime(countdown_time));
	const show_error =
		!Number($page.url.searchParams.get('timeInSeconds')) ||
		Number.isNaN(Number($page.url.searchParams.get('timeInSeconds')));

	function formatTime(time: number) {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor(time / 60) % 60;
		const seconds = time % 60;

		if (time < 0) {
			return '00:00:00';
		}

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	onMount(() => {
		const interval = setInterval(() => {
			countdown_time = countdown_time - 1;
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<div class="relative tabular-nums">
		{#if show_error}
			<p>Invalid time</p>
		{:else if countdown_time > 0}
			<p class="text-9xl font-bold">{formatted_time}</p>
		{:else}
			<p class="inline-block text-9xl font-bold text-green-600">
				{formatted_time}
			</p>
			<div class="absolute left-1/2 top-full">
				<Confetti rounded x={[-1.6, 1.6]} y={[0, 0.7]} amount={250} fallDistance="100%" infinite />
			</div>
		{/if}
	</div>
</div>
