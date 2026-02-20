import {checkDependencies} from '../utils/check-dependencies.js';
import {GLOBS} from '../utils/globs.js';
import javascript from './javascript.js';

await checkDependencies('eslint-config-xo-typescript');

const {default: xoTypescriptConfig} = await import('eslint-config-xo-typescript');

/** @type {import("eslint").Linter.Config} */
const typescript = {
	name: 'typescript config',
	files: [GLOBS.TS],
	extends: [...javascript.extends, xoTypescriptConfig],
	rules: {
		...javascript.rules,

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

		// Use TS-aware version instead of base rule (upcoming in xo-typescript)
		'no-unused-private-class-members': 'off',
		'@typescript-eslint/no-unused-private-class-members': 'error',
		'@typescript-eslint/no-useless-default-assignment': 'error',
		'@typescript-eslint/strict-void-return': 'error',
	},
};

/** @type {import("eslint").Linter.Config} */
export const typescriptUnsafe = {
	name: 'typescript unsafe config',
	files: [GLOBS.TS],
	rules: {
		'@typescript-eslint/no-unsafe-argument': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-declaration-merging': 'off',
		'@typescript-eslint/no-unsafe-enum-comparison': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/no-unsafe-type-assertion': 'off',
	},
};

export default typescript;
