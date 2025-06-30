import jsConfig from '@eslint/js';
import commentsPlugin from '@eslint-community/eslint-plugin-eslint-comments/configs';
import importPlugin from 'eslint-plugin-import';
import promisePlugin from 'eslint-plugin-promise';
import unicornPlugin from 'eslint-plugin-unicorn';
import eslintPluginNoUseExtendNative from 'eslint-plugin-no-use-extend-native';
import xoConfig from 'eslint-config-xo';
import {GLOBS} from './constants.js';

/**
 * @description Create a new javascript config.
 *
 * @returns {import("eslint").Linter.Config}
 */
export function newJavaScriptConfig() {
	return {
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
		rules: {
			'no-use-extend-native/no-use-extend-native': 'error',

			// It is a good rule in general, but dialects are project-dependant
			// in case some project hand to restrict vocabulary, it should be done there.
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
}
