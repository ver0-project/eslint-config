import prettierPlugin from 'eslint-plugin-prettier/recommended';
import {GLOBS} from './constants.js';

/**
 * @typedef {Object} PrettierConfigOptions
 * @property {boolean} [typescript] - Whether to use the TypeScript plugin.
 * @property {boolean} [json] - Whether to use the JSON config.
 * @property {boolean} [markdown] - Whether to use the Markdown config.
 */

/**
 * @description Create a new prettier config, with the given options.
 *
 * @param options {PrettierConfigOptions}
 * @returns {Linter.Config}
 */
export function newPrettierConfig(options) {
	/** @type {string[]} */
	const files = [GLOBS.JS];

	if (options.markdown) {
		files.push(GLOBS.MD);
	}

	if (options.json) {
		files.push(GLOBS.JSON, GLOBS.JSONC, GLOBS.JSON5);
	}

	if (options.typescript) {
		files.push(GLOBS.TS);
	}

	return {
		files,
		extends: [prettierPlugin],
		rules: {
			'prettier/prettier': 'error',
		},
	};
}
