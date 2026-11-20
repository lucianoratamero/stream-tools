<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<a href={resolve('/')}>home</a>
<a href={resolve('docs')}>docs</a>
<a href={resolve('bokeh?bookmark=dark-pink&decay=0.6')}>bokeh</a>
<a href={resolve('effects?crt')}>effects</a>
<a href={resolve('lastfm-now-playing')}>lastfm now playing</a>
<a href={resolve('local-now-playing?theme=pixel')}>local now playing</a>
<a href={resolve('twitch-chat?channel=looshigooshi&theme=pixel&messageScreenTime=6000')}>
	twitch chat
</a>
<a href={resolve('timer?timeInSeconds=5')}>timer</a>
