import {checkDependencies} from '../utils/check-dependencies.js';
import {GLOBS} from '../utils/globs.js';

await checkDependencies(
	'@eslint/js',
	'@eslint-community/eslint-plugin-eslint-comments',
	'eslint-plugin-import',
	'eslint-plugin-promise',
	'eslint-plugin-unicorn',
	'eslint-plugin-no-use-extend-native',
	'eslint-config-xo',
);

const {default: jsConfig} = await import('@eslint/js');
const {default: commentsPlugin} = await import('@eslint-community/eslint-plugin-eslint-comments/configs');
const {default: importPlugin} = await import('eslint-plugin-import');
const {default: promisePlugin} = await import('eslint-plugin-promise');
const {default: unicornPlugin} = await import('eslint-plugin-unicorn');
const {default: eslintPluginNoUseExtendNative} = await import('eslint-plugin-no-use-extend-native');
const {default: xoConfig} = await import('eslint-config-xo');

/** @type {import("eslint").Linter.Config} */
const javascript = {
	name: 'JavaScript config',
	files: [GLOBS.JS],
	extends: [
		jsConfig.configs.recommended,
		commentsPlugin.recommended,
		importPlugin.flatConfigs.recommended,
		promisePlugin.configs['flat/recommended'],
		unicornPlugin.configs.recommended,
		eslintPluginNoUseExtendNative.configs.recommended,
		xoConfig[0], // Kinda hardcode but we only need xo's JS rules
	],
	languageOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
	},
	rules: {
		'no-use-extend-native/no-use-extend-native': 'error',

		// It is a good rule in general, but dialects are project-dependant
		// in case some project had to restrict vocabulary, it should be done there.
		'unicorn/prevent-abbreviations': 'off',

		// Nulls are fine!
		'unicorn/no-null': 'off',

		// Too much FP.
		'unicorn/consistent-function-scoping': 'off',

		// Opinionated.
		'unicorn/prefer-ternary': 'off',
		'unicorn/no-useless-undefined': 'off',
		'unicorn/prefer-string-raw': 'off',
		'function-call-argument-newline': 'off',
		'capitalized-comments': 'off',

		'@eslint-community/eslint-comments/disable-enable-pair': ['error', {allowWholeFile: true}],
		'@eslint-community/eslint-comments/no-aggregating-enable': 'error',
		'@eslint-community/eslint-comments/no-duplicate-disable': 'error',

		'@eslint-community/eslint-comments/no-unused-disable': 'error',
		'@eslint-community/eslint-comments/no-unused-enable': 'error',

		'import/first': 'error',
		'import/no-unassigned-import': 'off',
		'import/default': 'error',
		'import/export': 'error',
		'import/extensions': ['error', 'always', {ignorePackages: true}],
		'import/no-absolute-path': 'error',
		'import/no-anonymous-default-export': 'off',
		'import/no-named-default': 'error',
		'import/no-webpack-loader-syntax': 'error',
		'import/no-self-import': 'error',
		// Disable since it is a VERY slow rule
		'import/no-cycle': 'off',
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

		// Disabled due to https://github.com/import-js/eslint-plugin-import/issues/3076
		'import/no-unresolved': 'off',

		'promise/prefer-await-to-then': 'error',
		'promise/param-names': 'error',
		'promise/no-return-wrap': ['error', {allowReject: true}],
		'promise/no-new-statics': 'error',
		'promise/no-return-in-finally': 'error',
		'promise/valid-params': 'error',

		'@stylistic/curly-newline': 'off',
	},
};

export default javascript;
