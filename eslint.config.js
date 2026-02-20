import {defineConfig} from 'eslint/config';
import javascript from './configs/javascript.js';
import node from './configs/node.js';
import json from './configs/json.js';
import markdown from './configs/markdown.js';
import prettier from './configs/prettier.js';

export default defineConfig(
	javascript,
	node,
	...json,
	markdown,
	prettier,
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
