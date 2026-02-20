import globals from 'globals';
import confusingBrowserGlobals from 'confusing-browser-globals';
import {GLOBS} from '../utils/globs.js';

/** @type {import("eslint").Linter.Config} */
const browser = {
	name: 'browser config',
	files: [GLOBS.JS, GLOBS.TS],
	languageOptions: {
		globals: {
			...globals.es2026,
			...globals.browser,
		},
	},
	rules: {
		'no-restricted-globals': ['error', ...confusingBrowserGlobals],
	},
};

export default browser;
