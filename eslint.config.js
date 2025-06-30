import {defineConfig} from 'eslint/config';
import {buildConfig} from './index.js';

export default defineConfig(
	...buildConfig({
		globals: 'node',
		json: true,
		markdown: true,
		typescript: false,
	}),
	{
		files: ['README.md'],
		language: 'markdown/gfm',
	},
	{
		files: ['index.js'],
		rules: {
			'n/no-unpublished-import': 'off', // supposedly it does not treat negation in .npmignore correctly
		},
	},
);
