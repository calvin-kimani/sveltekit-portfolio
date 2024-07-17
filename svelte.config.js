import adapter from '@sveltejs/adapter-auto';
import { sveltePreprocess } from 'svelte-preprocess'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte, mdsvex } from "mdsvex"
import { createHighlighter, codeToHtml } from 'shiki'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".md"],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: [".md"],
			layout: {
				_: './src/mdsvex.svelte'
			},
			highlight: {
				highlighter: async (code, lang = 'text') => {

					const html = escapeSvelte(
						await codeToHtml(
							code,
							{
							 lang: lang,
							 theme: 'catppuccin-mocha'
							}
						)
					)

					return `{@html \`${html}\`}`;
				}
			}
		}),
		],

	kit: {
		adapter: adapter()
	}
};

export default config;
