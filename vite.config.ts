import { anchors } from '@mdsvex/plugin-anchors';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, isPreview, mode }) => ({
	plugins: [
		mdsvex({
			extensions: ['.md'],
			heading_ids: true,
			// mdsvex 0.x had smartypants on by default
			smart_punctuation: true,
			plugins: [anchors()]
		}),
		sveltekit({
			preprocess: [vitePreprocess()],
			adapter: adapter({ fallback: '404.html' }),
			paths: {
				// BASE_PATH is set by .github/workflows/deploy.yml
				base:
					command === 'serve' && !isPreview
						? ''
						: (loadEnv(mode, '.', 'BASE_PATH').BASE_PATH as `/${string}` | undefined)
			}
		})
	]
}));
