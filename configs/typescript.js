import xoTypescriptConfig from 'eslint-config-xo-typescript';
import {GLOBS} from './constants.js';
import {newJavaScriptConfig} from './javascript.js';

/** @typedef {Object} TypeScriptConfig */

/** @type {boolean} typescriptUnsafe */

/**
 * @description Create a new typescript config.
 *
 * @param {TypeScriptConfig} options
 * @returns {Linter.Config}
 */
export function newTypeScriptConfig(options) {
	const jsConfig = newJavaScriptConfig();

	return {
		files: [GLOBS.TS],
		extends: [...jsConfig.extends, xoTypescriptConfig],
		rules: {
			...jsConfig.rules,

			// Toplevel type imports can be wiped out completely.
			'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

			// It is defined per project.
			'@typescript-eslint/naming-convention': 'off',
			'@typescript-eslint/no-restricted-types': [
				'error',
				{
					types: {
						object: {
							message:
								'The `object` type is hard to use. Use `Record<string, unknown>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848',
							fixWith: 'Record<string, unknown>',
						},
						Buffer: {
							message: 'Use Uint8Array instead. See: https://sindresorhus.com/blog/goodbye-nodejs-buffer',
							suggest: ['Uint8Array'],
						},
						'[]': "Don't use the empty array type `[]`. It only allows empty arrays. Use `SomeType[]` instead.",
						'[[]]':
							"Don't use `[[]]`. It only allows an array with a single element which is an empty array. Use `SomeType[][]` instead.",
						'[[[]]]': "Don't use `[[[]]]`. Use `SomeType[][][]` instead.",
						'[[[[]]]]': 'ur drunk 🤡',
						'[[[[[]]]]]': '🦄💥',
					},
				},
			],

			...(options.typescriptUnsafe
				? {
						'@typescript-eslint/no-unsafe-argument': 'off',
						'@typescript-eslint/no-unsafe-assignment': 'off',
						'@typescript-eslint/no-unsafe-call': 'off',
						'@typescript-eslint/no-unsafe-declaration-merging': 'off',
						'@typescript-eslint/no-unsafe-enum-comparison': 'off',
						'@typescript-eslint/no-unsafe-member-access': 'off',
						'@typescript-eslint/no-unsafe-return': 'off',
					}
				: {}),
		},
	};
}
