<svelte:head>
	<title>stream-tools: docs</title>
</svelte:head>

<script lang="ts">
	import NavLinks from '$lib/components/NavLinks.svelte';
</script>

<div
	class="fixed md:sticky md:top-0 md:block w-full flex left-0 flex-col justify-center items-center bottom-0 py-4 bg-white">
	<h1 class="mb-2">stream-tools</h1>
	<nav class="flex md:justify-start md:gap-4 flex-wrap justify-center items-center gap-2">
		<NavLinks />
	</nav>
</div>

this is a set of pages with effects that I use on my twitch streams. you don't need to redeploy the app, since they can be accessed on https://lucianoratamero.github.io/stream-tools/ and added to your OBS (or whatever you use) as a browser source.

they may work on any setup, as long as you follow the docs ;]

if you have any questions, just open an issue and I'll answer it when I can :)

## options

all options for the pages are passed as search parameters. you don't really need to know what search parameters are - they are just options passed in the URL. but if you want to know more about them, you can read [this](https://en.wikipedia.org/wiki/Query_string).

a good example of a search parameter is `?channel=luciano_ratamero`. this is a search parameter that tells the page to load the chat from the `luciano_ratamero` channel. if you needed to pass more options, you could do it like this: `?channel=luciano_ratamero&theme=pixel`, by adding a `&` character before each one of them.

## pages

### bokeh-experiments

this was the first effect, previously implemented in Imba, now in Svelte 5 + canvas. it randomly selects a color palette and renders colored blobs that fade out with time.

#### paths

##### `/bokeh/`

if you click the background, a form appears with settings that are saved on the localStorage.

this page accepts a `bookmark` search parameter, that loads a previously saved bookmark.

it also accepts a `decay` param, that changes how fast the circles disappear (it makes the animation faster).

this page also accepts a `numberOfCircles` search parameter, that changes the number limit of circles rendered.

it also accepts a `transparentBg` search parameter, that makes the background transparent.

example: [https://lucianoratamero.github.io/stream-tools/bokeh/?bookmark=dark-pink&decay=1.5](https://lucianoratamero.github.io/stream-tools/bokeh/?bookmark=dark-pink&decay=1.5)

##### `/bokeh/create/`

this page gives you the tools to create your own color palettes.

##### `/bokeh/history/`

this page allows you to view the previously selected color palettes. useful for when you find a palette you really like, but you forgot to bookmark.

### lastfm now playing

this page shows the currently playing song on last.fm. it's a simple page that uses the last.fm API to show the song in real-time.

if you don't know last.fm, it's compatible with all major music players, and it's a great way to keep track of what you're listening to.

#### paths

##### `/lastfm-now-playing/`

this page accepts a `username` search parameter, that is the last.fm username you want to watch the currently playing song from.

you also will need an `api_key` search parameter. to get one, you need to create an account on last.fm and then go to [this page](https://www.last.fm/api/account/create).

### twitch chat

this page shows the twitch chat. it's a simple page that uses the twitch chat API to show the chat in real-time.

there is only one available theme (`pixel`), but, if you want more, you can change the theme by editing the `src/routes/twitch-chat/TwitchChat.svelte` file. I'll be adding more themes soon.

#### paths

##### `/twitch-chat/`

this page accepts a `channel` search parameter, that is the channel you want to watch the chat from. if you have betterttv or frankerfacez emotes, they will be rendered as well. for betterttv emotes, you need to also pass the `twitch_id` search parameter, which you can find [here](https://www.streamweasels.com/tools/convert-twitch-username-to-user-id/).

it also accepts a `theme` search parameter, that changes the theme of the chat. the available themes are: `pixel`.

it also receives a `messageScreenTime` search parameter, that changes how long the messages are displayed on the screen.

it also receives an `align` search parameter, that changes the alignment of the chat. the available alignments are: `top`, `bottom`. defaults to `bottom`.

example: [https://lucianoratamero.github.io/stream-tools/twitch-chat/?channel=luciano_ratamero&theme=pixel&messageScreenTime=6000](https://lucianoratamero.github.io/stream-tools/twitch-chat/?channel=luciano_ratamero&theme=pixel&messageScreenTime=6000)

### effects

this page offers an overlay with effects. each effect is enabled by its own search parameter.

#### paths

##### `/effects/`

by default, the page doesn't have any effects enabled. you can enable them by passing search parameters.

###### `CRT`

this effect is enabled by passing the `crt` search param. it loads a CRT texture, emulating old computer monitors/tvs.

this effect also accepts a `openGUI` search param, that opens a form with settings.

example: [https://lucianoratamero.github.io/stream-tools/effects/?crt](https://lucianoratamero.github.io/stream-tools/effects/?crt)

###### `Confetti`

this effect is enabled by passing the `confetti` search param. it loads a confetti waterfall effect. we recommend using a 1920x1080 source for the best results.

example: [https://lucianoratamero.github.io/stream-tools/effects/?confetti](https://lucianoratamero.github.io/stream-tools/effects/?confetti)

###### `bokeh`

this is the same effect as the `/bokeh` path (in fact, it loads an iframe). it accepts the same search param options as `/bokeh`.

example: [https://lucianoratamero.github.io/stream-tools/effects/?bokeh&bookmark=dark-pink&decay=1.5](https://lucianoratamero.github.io/stream-tools/bokeh/?bookmark=dark-pink&decay=1.5)

### timer

this page gives you a countdown timer. by default, it also makes a sound effect when the countdown is done (it may spook you, but you can disable it :3).

#### paths

##### `/timer/`

the timer accepts two search params: `timeInSeconds` and `noAudio`.

`timeInSeconds` is literally how many seconds you want to start the countdown with.

`noAudio` disables the alert at the end of the timer.

example: [https://lucianoratamero.github.io/stream-tools/timer/?timeInSeconds=6](https://lucianoratamero.github.io/stream-tools/timer/?timeInSeconds=6)


## Developing/Contributing

```bash
# install dependencies - while svelte 5 is not released, we need to force the install
npm install --force
# start the dev server
npm run dev
# build to production
npm run build
```

<div class="pb-24 md:p-0"></div>
