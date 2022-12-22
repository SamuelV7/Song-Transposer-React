import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	extensions: ['.svelte', '.md'],
	// for more information about preprocessors
	kit: {
		adapter: adapter()
	},
	preprocess: [vitePreprocess(), mdsvex({extensions: ['.md']})]
	
};

export default config;
