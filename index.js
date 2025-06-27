import {defineConfig} from 'eslint/config';
import globals from 'globals';
import confusingBrowserGlobals from 'confusing-browser-globals';
import {newJsonConfigs} from './configs/json.js';
import {newMarkdownConfig} from './configs/markdown.js';
import {newPrettierConfig} from './configs/prettier.js';
import {newVitestConfig} from './configs/vitest.js';
import {newNodeConfig} from './configs/node.js';
import {newJavaScriptConfig} from './configs/javascript.js';
import {newTypeScriptConfig} from './configs/typescript.js';
import {GLOBS} from './configs/constants.js';
import {newReactConfig} from './configs/react.js';

/** @typedef {keyof import('globals')} Globals */

/**
 * @typedef {Object} Options
 * @property {Globals} globals - Which globals to use.
 * @property {boolean} [react] - Whether to use the React plugin.
 * @property {boolean} [prettier] - Whether to use the React plugin.
 * @property {boolean} [typescript] - Whether to use the TypeScript plugin.
 * @property {boolean} [vitest] - Whether to use the vitest config.
 * @property {boolean} [json] - Whether to use the JSON config.
 * @property {boolean} [markdown] - Whether to use the Markdown config.
 */

/** @typedef {import("eslint").Linter.Config} LinterConfig */

/** @type {Options} */
const defaultOptions = {
	globals: 'node',
	prettier: true,
	typescript: true,
	typescriptUnsafe: false,
	json: true,
	markdown: true,
	react: false,
	vitest: false,
};

/**
 * @param {Options} [options]
 * @return {LinterConfig[]}
 */
export function buildConfig(options) {
	if (options.globals === undefined) {
		throw new Error('options.globals must be set');
	}

	options = {...defaultOptions, ...options};

	/** @type {LinterConfig[]} */
	const result = [
		newJavaScriptConfig(),
		{
			files: [GLOBS.JS, GLOBS.TS],
			languageOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest',
				globals: {
					...globals.es2025,
					...globals[options.globals],
				},
			},
			rules: {
				...(options.globals === 'browser'
					? {
							'no-restricted-globals': ['error', ...confusingBrowserGlobals],
						}
					: {}),
			},
		},
	];

	if (options.typescript) {
		result.push(newTypeScriptConfig(options));
	}

	if (options.react) {
		result.push(newReactConfig());
	}

	if (options.globals === 'node') {
		result.push(newNodeConfig());
	}

	if (options.json) {
		result.push(...newJsonConfigs());
	}

	if (options.markdown) {
		result.push(newMarkdownConfig());
	}

	if (options.vitest) {
		result.push(newVitestConfig());
	}

	if (options.prettier) {
		result.push(newPrettierConfig(options));
	}

	return defineConfig(...result);
}
