
# stream-tools

this is a set of pages with effects that I use on my twitch streams. you don't need to redeploy the app, since they can be accessed on https://lucianoratamero.github.io/stream-tools/ and added to your OBS (or whatever you use) as a browser source.

they may work on any setup, as long as you follow the docs ;]

if you have any questions, just open an issue and I'll answer it when I can :)

## Getting started

```bash
# install dependencies - while svelte 5 is not released, we need to force the install
npm install --force
# start the dev server
npm run dev
# build to production
npm run build
```
## pages

### bokeh-experiments

this was the first effect, previously implemented in Imba, now in Svelte 5 + canvas. it randomly selects a color palette and renders colored blobs that fade out with time.

#### paths

##### `/bokeh/`

if you click the background, a form appears with settings that are saved on the localStorage.

this page accepts a `bookmark` search parameter, that loads a previously saved bookmark. it also accepts a `decay` param, that changes how fast the circles disappear (it makes the animation faster).

example: [https://lucianoratamero.github.io/stream-tools/bokeh/?bookmark=dark-pink&decay=1.5](https://lucianoratamero.github.io/stream-tools/bokeh/?bookmark=dark-pink&decay=1.5)

##### `/bokeh/create/`

this page gives you the tools to create your own color palettes.

##### `/bokeh/history/`

this page allows you to view the previously selected color palettes. useful for when you find a palette you really like, but you forgot to bookmark.

### effects

this page offers an overlay with effects. each effect is enabled by its own search parameter.

#### paths

##### `/effects/`

###### `CRT`

this effect is enabled by passing the `crt` search param. it loads a CRT texture, emulating old computer monitors/tvs.

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
