<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="flex h-screen gap-4">
	<h1 class="text-8xl">Tools</h1>
	<ul class="text-4xl">
		<li>
			<a href={`${base}/docs`}>Docs</a>
		</li>
		<li>
			<a href={`${base}/bokeh`}>Bokeh</a>
		</li>
		<li>
			<a href={`${base}/effects`}>Effects</a>
		</li>
		<li>
			<a href={`${base}/timer?timeInSeconds=120`}>Timer</a>
		</li>
		<li>
			<a href={`${base}/twitch-chat?channel=luciano_ratamero`}>Twitch Chat</a>
		</li>
	</ul>
</div>
