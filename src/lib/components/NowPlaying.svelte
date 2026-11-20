<script lang="ts" module>
	export interface NowPlayingData {
		image?: string;
		track: string;
		artist: string;
	}
</script>

<script lang="ts">
	let { now_playing, theme }: { now_playing: NowPlayingData | undefined; theme?: string | null } =
		$props();
</script>

{#if now_playing}
	<div
		class="flex w-100 items-center gap-4 rounded-xl bg-blue-950/70 p-4 text-xl text-white"
		class:pixel={theme === 'pixel'}
	>
		{#if now_playing.image}
			<img
				class="h-24 w-24 rounded"
				src={now_playing.image}
				alt="{now_playing.track} by {now_playing.artist}"
			/>
		{:else}
			<div
				class="flex h-24 w-24 shrink-0 items-center justify-center"
				role="img"
				aria-label="Loading album art"
			>
				<iconify-icon class="animate-spin" icon="mdi:loading" height="3rem"></iconify-icon>
			</div>
		{/if}
		<div class="flex flex-col justify-center">
			<h1 class="font-bold">
				{now_playing.track}
			</h1>
			<h2>{now_playing.artist}</h2>
		</div>
	</div>
{/if}

<style lang="scss">
	@use '../css/pixel-mixins';

	.pixel {
		background-color: #000;
		font-family: 'Pixeloid Mono', ui-monospace, monospace;

		@include pixel-mixins.pixel-borders($corner-size: 3, $border-size: 4px, $border-color: #fff);

		img {
			border-radius: 0;
		}
	}
</style>
