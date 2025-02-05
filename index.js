import globals from 'globals';
import promisePlugin from 'eslint-plugin-promise';
import unicornPlugin from 'eslint-plugin-unicorn';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import commentsPlugin from '@eslint-community/eslint-plugin-eslint-comments/configs';
import jsConfig from '@eslint/js';
import nodePlugin from 'eslint-plugin-n';
import eslintPluginNoUseExtendNative from 'eslint-plugin-no-use-extend-native';

/** @typedef {keyof import('globals')} Globals */

/**
 * @typedef {Object} Options
 * @property {Globals} globals - Which globals to use.
 * @property {boolean} [react] - Whether to use the React plugin.
 * @property {boolean} [prettier] - Whether to use the React plugin.
 * @property {boolean} [typescript] - Whether to use the TypeScript plugin.
 * @property {boolean} [vitest] - Whether to use the vitest config.
 */

/** @typedef {import('eslint').Linter} Linter */

/** @type {Options} */
const defaultOptions = {
	globals: 'node',
	react: false,
	prettier: true,
	typescript: true,
	vitest: false,
};

/** @type {Linter.Config[]} */
const defaultConfig = [
	jsConfig.configs.recommended,
	commentsPlugin.recommended,
	importPlugin.flatConfigs.recommended,
	promisePlugin.configs['flat/recommended'],
	nodePlugin.configs['flat/recommended-module'],
	unicornPlugin.configs['flat/recommended'],
	eslintPluginNoUseExtendNative.configs.recommended,

	{
		rules: {
			'no-use-extend-native/no-use-extend-native': 'error',

			// nulls are fine!
			'unicorn/no-null': 'off',

			// the only case when ternaries are okay.
			'unicorn/prefer-ternary': ['error', 'only-single-line'],

			// too much FPs.
			'unicorn/consistent-function-scoping': 'off',

			// opinionated.
			'unicorn/no-useless-undefined': 'off',
			'unicorn/prefer-string-raw': 'off',
			'function-call-argument-newline': 'off',

			'eslint-comments/disable-enable-pair': ['error', {allowWholeFile: true}],
			'eslint-comments/no-aggregating-enable': 'error',
			'eslint-comments/no-duplicate-disable': 'error',

			'eslint-comments/no-unused-disable': 'error',
			'eslint-comments/no-unused-enable': 'error',

			'import/first': 'error',
			'import/no-unassigned-import': 'off',
			'import/default': 'error',
			'import/export': 'error',
			'import/extensions': ['error', 'always', {ignorePackages: true}],
			// breaks with modern `import with` syntax + ts is there for that.
			'import/namespace': 'off',
			'import/no-absolute-path': 'error',
			'import/no-anonymous-default-export': 'error',
			'import/no-named-default': 'error',
			'import/no-webpack-loader-syntax': 'error',
			'import/no-self-import': 'error',
			'import/no-cycle': ['error', {ignoreExternal: true}],
			'import/no-useless-path-segments': 'error',
			'import/newline-after-import': 'error',
			'import/no-amd': 'error',
			'import/no-duplicates': ['error', {'prefer-inline': false}],
			'import/no-empty-named-blocks': 'error',
			'import/no-extraneous-dependencies': ['error', {includeTypes: true}],
			'import/no-mutable-exports': 'error',
			'import/no-named-as-default-member': 'error',
			'import/no-named-as-default': 'error',
			'import/order': [
				'error',
				{
					groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
					'newlines-between': 'never',
				},
			],

			'n/file-extension-in-import': ['error', 'always'],
			'n/no-mixed-requires': ['error', {grouping: true, allowCall: true}],
			'n/no-new-require': 'error',
			'n/no-path-concat': 'error',
			'n/no-deprecated-api': 'error',
			'n/process-exit-as-throw': 'error',
			'n/prefer-global/console': ['error', 'always'],
			'n/prefer-global/process': ['error', 'never'],
			'n/prefer-global/text-decoder': ['error', 'always'],
			'n/prefer-global/text-encoder': ['error', 'always'],
			'n/prefer-global/url-search-params': ['error', 'always'],
			'n/prefer-global/url': ['error', 'always'],
			'n/prefer-promises/dns': 'error',
			'n/prefer-promises/fs': 'error',

			'promise/prefer-await-to-then': 'error',
			'promise/param-names': 'error',
			'promise/no-return-wrap': ['error', {allowReject: true}],
			'promise/no-new-statics': 'error',
			'promise/no-return-in-finally': 'error',
			'promise/valid-params': 'error',
		},
	},
];

/**
 * @param {Options} [options]
 * @return {Linter.Config[]}
 */
export function buildConfig(options) {
	options = {...defaultOptions, ...options};

	/** @type {Linter.Config[]} */
	const result = [
		{
			languageOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
		},
	];

	if (options.globals) {
		result.push({languageOptions: {globals: globals[options.globals]}});
	}

	result.push(...defaultConfig);

	if (options.prettier) {
		result.push(prettierPlugin);
	}

	if (options.typescript) {
		result.push(importPlugin.flatConfigs.typescript);
	}

	if (options.react) {
		result.push(importPlugin.flatConfigs.react);
	}

	return result;
}
