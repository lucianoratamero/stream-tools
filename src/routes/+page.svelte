<script lang="ts">
	import { GithubLogo, TwitterLogo } from '@steeze-ui/radix-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import NavLinks from '$lib/components/NavLinks.svelte';
</script>

<div class="flex h-screen flex-col gap-4 md:flex-row">
	<div class="flex flex-col">
		<h1 class="text-8xl md:text-[10rem] leading-none">Tools</h1>
		<ul class="flex gap-4">
			<li>
				<a href="https://github.com/lucianoratamero/stream-tools" target="_blank">
					<Icon src={GithubLogo} class="h-8" />
				</a>
			</li>
			<li>
				<a href="https://twitch.tv/luciano_ratamero" target="_blank" title="Twitch link">
					<svg
						class="h-8 w-8"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						width="800px"
						height="800px"
						viewBox="-0.5 0 20 20"
						version="1.1"
						data-afd-extension-id="meojnmfhjkahlfcecpdcdgjclcilmaij"
					>
						<title>twitch [#182]</title>
						<desc>Created with Sketch.</desc>
						<defs></defs>
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g
								id="Dribbble-Light-Preview"
								transform="translate(-141.000000, -7399.000000)"
								fill="#000000"
							>
								<g id="icons" transform="translate(56.000000, 160.000000)">
									<path
										d="M97,7249 L99,7249 L99,7244 L97,7244 L97,7249 Z M92,7249 L94,7249 L94,7244 L92,7244 L92,7249 Z M102,7250.307 L102,7241 L88,7241 L88,7253 L92,7253 L92,7255.953 L94.56,7253 L99.34,7253 L102,7250.307 Z M98.907,7256 L94.993,7256 L92.387,7259 L90,7259 L90,7256 L85,7256 L85,7242.48 L86.3,7239 L104,7239 L104,7251.173 L98.907,7256 Z"
										id="twitch-[#182]"
									>
									</path>
								</g>
							</g>
						</g>
					</svg>
				</a>
			</li>
			<li>
				<a href="https://x.com/lucianoratamero" target="_blank">
					<Icon src={TwitterLogo} class="h-8" />
				</a>
			</li>
		</ul>
	</div>
	<nav class="text-4xl md:text-8xl flex flex-col">
		<NavLinks />
	</nav>
</div>
