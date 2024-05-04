<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	type Props = {
		colorPalette: string[];
		showForm: boolean;
		decay: number;
		isWrapped?: boolean;
	};
	type Circle = {
		opacity: number;
		size: number;
		position: { top: number; left: number };
		color: string;
	};

	let { colorPalette, showForm = $bindable(), decay, isWrapped }: Props = $props();
	let currentNodes: Circle[] = $state([]);
	let numberOfCircles = $state(0);
	let canvas: HTMLCanvasElement | null = $state(null);
	let windowSize: { width: number; height: number } | undefined = $state();

	const getColor = (node: Circle) => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(node.color) || [];
		return (
			String(parseInt(result[1] || '0', 16)) +
			', ' +
			String(parseInt(result[2], 16)) +
			', ' +
			String(parseInt(result[3], 16)) +
			', ' +
			node.opacity
		);
	};

	const render = () => {
		const context = canvas?.getContext('2d') as CanvasRenderingContext2D;
		context.clearRect(0, 0, window.innerWidth, window.innerHeight);

		currentNodes = currentNodes
			.filter((node: Circle) => node.opacity > 0)
			.map((node: Circle) => {
				context.fillStyle = `rgba(${getColor(node)})`;
				context.beginPath();
				context.arc(node.position.left, node.position.top, node.size, 0, 2 * Math.PI);
				context.fill();
				context.closePath();

				node.size = node.size + (window.innerWidth / window.innerHeight) * decay;
				node.opacity = 1 - (node.size * decay) / 200;
				return node;
			});

		if (currentNodes.length < numberOfCircles && Math.random() < (decay > 1 ? 1 : decay * 0.5)) {
			currentNodes.push({
				size: 1,
				opacity: 1,
				color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
				position: {
					top: Math.random() * window.innerHeight - 0.5,
					left: Math.random() * window.innerWidth - 0.5
				}
			});
		}
		requestAnimationFrame(render);
	};

	onMount(() => {
		let width = window.innerWidth;
		let height = window.innerHeight;

		if (isWrapped) {
			width = canvas?.parentElement?.clientWidth as number;
			height = canvas?.parentElement?.clientHeight as number;
		}

		numberOfCircles = width > height ? (width / height) * 200 : (height / width) * 200;
		windowSize = { width, height };

		window.onresize = () => {
			let width = window.innerWidth;
			let height = window.innerHeight;

			if (isWrapped) {
				width = canvas?.parentElement?.clientWidth as number;
				height = canvas?.parentElement?.clientHeight as number;
			}

			windowSize = { width, height };
			numberOfCircles = width > height ? (width / height) * 200 : (height / width) * 200;
		};
		requestAnimationFrame(render);
	});
</script>

{#if browser}
	<canvas
		class="absolute m-0 overflow-hidden bg-zinc-900"
		onclick={() => (showForm = !showForm)}
		style={!showForm ? 'cursor: none' : ''}
		bind:this={canvas}
		width={windowSize?.width || 0}
		height={windowSize?.height || 0}
	></canvas>
{/if}
