<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="flex h-screen flex-col items-center justify-center gap-4 text-white">
	<h1 class="text-4xl">Tools</h1>
	<ul class="text-xl">
		<li>
			<a href={`${base}/bokeh`}>Bokeh</a>
		</li>
		<li>
			<a href={`${base}/effects`}>Effects</a>
		</li>
		<li>
			<a href={`${base}/timer?timeInSeconds=120`}>Timer</a>
		</li>
	</ul>
</div>
