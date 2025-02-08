<script lang="ts">
	import { browser } from '$app/environment';
	import { range } from '$lib/utils';
	import { onMount } from 'svelte';
	import Particle from './Particle.svelte';

	let framesPerSecond = $state(60);
	let currentNodes: { yPosition: number; size: number }[] = $state([]);
	let canvas: HTMLCanvasElement | null = $state(null);
	let context: CanvasRenderingContext2D | null = $state(null);

	function build() {
		let baseNumberofParticles = window.innerWidth;
		let particlesRange = range(baseNumberofParticles * Math.random());

		for (let _ of particlesRange) {
			currentNodes.unshift(setupNode());
		}

		window.addEventListener('resize', onresize, false);
	}

	function onresize() {
		currentNodes = [];
		build();
	}

	function setupNode() {
		let size = Math.ceil(Math.random() * 20);
		let delay = Math.random() * 100 * size;
		return { yPosition: -delay, size: size };
	}

	function tick() {
		if (!canvas) return;
		context = context || canvas.getContext('2d');
		if (!context) return;
		context.clearRect(0, 0, window.innerWidth, window.innerHeight);

		for (let i = 0; i < currentNodes.length; i++) {
			let node = currentNodes[i];
			if (node.yPosition < window.innerHeight) {
				node.yPosition += node.size * 1.2;
			} else {
				currentNodes[i] = setupNode();
			}
		}
	}

	let interval: number;
	onMount(() => {
		build();
		interval = setInterval(tick, 1000 / framesPerSecond);
		return () => clearInterval(interval);
	});
</script>

{#if browser}
	<canvas bind:this={canvas} width={window.innerWidth} height={window.innerHeight}></canvas>

	{#if !context}
		<p>Canvas not supported</p>
	{:else}
		{#each currentNodes as { yPosition, size }, i}
			<Particle {context} {yPosition} {size} />
		{/each}
	{/if}
{/if}
