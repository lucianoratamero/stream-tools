<script lang="ts">
	import { onMount } from 'svelte';
	import './Particle.scss';

	type Props = { context: CanvasRenderingContext2D; yPosition: number; size: number };
	let { context, yPosition, size }: Props = $props();

	let width: number;
	let xPosition: number | undefined = $state();
	let animationDuration;

	function setup() {
		width = Math.floor(size / 6);
		xPosition = Math.random() * window.innerWidth;
		animationDuration = Math.random() * (3000 - 1200) + 1200;
	}

	$effect(() => {
		if (xPosition === undefined) return;
		context.strokeStyle = 'rgba(173, 216, 230, 0.52)';
		context.lineWidth = width;
		context.beginPath();
		context.moveTo(xPosition, yPosition);
		context.lineTo(xPosition, yPosition + size);
		context.closePath();
		context.stroke();
	});

	onMount(() => {
		setup();
	});
</script>

<div class="particle"></div>
