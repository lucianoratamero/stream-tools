<script lang="ts">
	import { browser } from '$app/environment';
	import { emptyNode, renderFunctions, type Node } from '$lib/renderers';
	import { onMount } from 'svelte';

	type BaseProps = {
		showForm: boolean;
		decay: number;
		numberOfCircles?: number;
		transparentBg?: boolean;
		isWrapped?: boolean;
	};

	type Props =
		| (BaseProps & {
				type?: 'circle';
				svgContent?: undefined;
				colorPalette: string[];
		  })
		| (BaseProps & {
				type: 'svg';
				svgContent: string;
				colorPalette?: undefined;
		  });

	let {
		type = 'circle',
		colorPalette,
		showForm = $bindable(),
		svgContent,
		decay,
		transparentBg,
		numberOfCircles,
		isWrapped
	}: Props = $props();
	let currentNodes: Node[] = $state([]);
	let numberOfNodes = $state(numberOfCircles || 0);
	let canvas: HTMLCanvasElement | null = $state(null);
	let windowSize: { width: number; height: number } | undefined = $state();

	$effect(() => {
		if (numberOfCircles) {
			numberOfNodes = numberOfCircles;
		}
	});

	const render = () => {
		const context = canvas?.getContext('2d') as CanvasRenderingContext2D;
		if (context) {
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);

			currentNodes = currentNodes
				.filter((node: Node) => node.opacity > 0)
				.map((node) => renderFunctions[type]({ node, context, decay }));

			if (
				currentNodes.length < numberOfNodes &&
				Math.random() * 2 < (decay > 1 ? 1 : decay * 0.5)
			) {
				if (type === 'svg' && svgContent) {
					currentNodes.push(emptyNode[type](svgContent));
				} else if (type === 'circle' && colorPalette) {
					currentNodes.push(emptyNode[type](colorPalette));
				}
			}
		}
		requestAnimationFrame(render);
	};

	onMount(() => {
		const NODES_MULTIPLIER = 600;
		let width = window.innerWidth;
		let height = window.innerHeight;

		if (isWrapped) {
			width = canvas?.parentElement?.clientWidth as number;
			height = canvas?.parentElement?.clientHeight as number;
		}

		if (!numberOfCircles) {
			numberOfNodes =
				width > height ? (width / height) * NODES_MULTIPLIER : (height / width) * NODES_MULTIPLIER;
		}
		windowSize = { width, height };

		window.onresize = () => {
			let width = window.innerWidth;
			let height = window.innerHeight;

			if (isWrapped) {
				width = canvas?.parentElement?.clientWidth as number;
				height = canvas?.parentElement?.clientHeight as number;
			}

			windowSize = { width, height };
			if (!numberOfCircles) {
				numberOfNodes =
					width > height
						? (width / height) * NODES_MULTIPLIER
						: (height / width) * NODES_MULTIPLIER;
			}
		};
		requestAnimationFrame(render);
	});
</script>

{#if browser}
	<canvas
		class="absolute m-0 overflow-hidden"
		class:bg-zinc-900={!transparentBg}
		class:opacity-50={transparentBg}
		onclick={() => (showForm = !showForm)}
		style={!showForm ? 'cursor: none' : ''}
		bind:this={canvas}
		width={windowSize?.width || 0}
		height={windowSize?.height || 0}
	></canvas>
{/if}
