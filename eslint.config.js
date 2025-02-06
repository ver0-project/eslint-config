import {buildConfig} from './index.js';

/** @typedef {import('eslint').Linter} Linter */

/** @type {Linter.Config[]} */
const cfg = [
	...buildConfig({
		globals: 'node',
		typescript: false,
	}),
	{
		files: ['README.md'],
		language: 'markdown/gfm',
	},
];

export default cfg;
