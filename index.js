import globals from 'globals';
import promisePlugin from 'eslint-plugin-promise';
import unicornPlugin from 'eslint-plugin-unicorn';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import commentsPlugin from '@eslint-community/eslint-plugin-eslint-comments/configs';
import jsConfig from '@eslint/js';
import nodePlugin from 'eslint-plugin-n';
import eslintPluginNoUseExtendNative from 'eslint-plugin-no-use-extend-native';
import jsonPlugin from '@eslint/json';
import markdownPlugin from '@eslint/markdown';
import confusingBrowserGlobals from 'confusing-browser-globals';
import xoConfig from 'eslint-config-xo';
import xoTypescriptConfig from 'eslint-config-xo-typescript';
import xoReactConfig from 'eslint-config-xo-react';

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

/** @typedef {import('eslint').Linter} Linter */

/** @type {Options} */
const defaultOptions = {
	globals: 'node',
	prettier: true,
	typescript: true,
	json: true,
	markdown: true,
	react: false,
	vitest: false,
};

const tsExtensions = ['ts', 'tsx', 'mts', 'cts'];

const jsExtensions = ['js', 'jsx', 'mjs', 'cjs'];

const defaultExtensions = [...jsExtensions, ...tsExtensions];

/**
 * Sets files directive to configs that don't have it.
 *
 * @param {Linter.Config[]} cfgs
 * @param {Array<string | string[]>} files
 *
 * @returns {Linter.Config[]}
 * */
export function addFilesIfNotSet(cfgs, files) {
	/** @type {Linter.Config[]} */
	const result = [];

	for (let cfg of cfgs) {
		if (cfg.files === undefined) {
			cfg = {...cfg, files};
		}

		result.push(cfg);
	}
	return result;
}

const xoMinusStylistic = xoConfig[0];
delete xoMinusStylistic.plugins['@stylistic'];
for (const rule in xoMinusStylistic.rules) {
	if (rule.startsWith('@stylistic/')) {
		delete xoMinusStylistic.rules[rule];
	}
}

/** @type {Linter.Config[]} */
const defaultConfig = [
	jsConfig.configs.recommended,
	commentsPlugin.recommended,
	importPlugin.flatConfigs.recommended,
	promisePlugin.configs['flat/recommended'],
	nodePlugin.configs['flat/recommended-module'],
	unicornPlugin.configs['flat/recommended'],
	eslintPluginNoUseExtendNative.configs.recommended,
	xoMinusStylistic,
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

/** @type {Linter.RulesRecord} */
const jsonRules = {
	'json/no-duplicate-keys': 'error',
	'json/no-empty-keys': 'error',
};

/** @returns {Linter.Config[]} */
function createJSONConfigs() {
	return [
		{
			plugins: {
				json: jsonPlugin,
			},
			files: ['**/*.json'],
			language: 'json/json',
			rules: jsonRules,
		},
		{
			plugins: {
				json: jsonPlugin,
			},
			files: ['**/*.jsonc'],
			language: 'json/jsonc',
			rules: jsonRules,
		},
		{
			plugins: {
				json: jsonPlugin,
			},
			files: ['**/*.json5'],
			language: 'json/json5',
			rules: jsonRules,
		},
	];
}

/**
 * @param {Options} [options]
 */
function createPrettierConfig(options) {
	/** @type {string[]} */
	const prettierFiles = [`**/*.{${jsExtensions.join(',')}}`];

	if (options.markdown) {
		prettierFiles.push('**/*.md');
	}

	if (options.json) {
		prettierFiles.push('**/*.json', '**/*.jsonc', '**/*.json5');
	}

	if (options.typescript) {
		prettierFiles.push(`**/*.{${tsExtensions.join(',')}}`);
	}

	/** @type {Linter.Config} */
	return {...prettierPlugin, files: prettierFiles};
}

/**
 * @param {Options} [options]
 * @return {Linter.Config[]}
 */
export function buildConfig(options) {
	options = {...defaultOptions, ...options};

	const filesDefault = [`**/*.{${defaultExtensions.join(',')}}`];

	/** @type {Linter.Config[]} */
	const result = [
		...addFilesIfNotSet(defaultConfig, filesDefault),
		{
			languageOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest',
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
				},
			},
		},
	];

	if (options.globals === undefined) {
		throw new Error('globals options is required');
	}

	/** @type {Linter.Config} */
	const globalsCfg = {
		files: filesDefault,
		languageOptions: {
			globals: {
				...globals.es2025,
				...globals[options.globals],
			},
		},
	};

	if (options.globals === 'browser') {
		globalsCfg.rules = {
			'no-restricted-globals': ['error', ...confusingBrowserGlobals],
		};
	}
	result.push(globalsCfg);

	if (options.json) {
		result.push(...createJSONConfigs());
	}

	if (options.markdown) {
		result.push(...addFilesIfNotSet(markdownPlugin.configs.recommended, ['**/*.md']));
	}

	if (options.typescript) {
		result.push(
			...addFilesIfNotSet(
				[importPlugin.flatConfigs.typescript, ...xoTypescriptConfig],
				[`**/*.{${tsExtensions.join(',')}}`]
			)
		);
	}

	if (options.react) {
		result.push(...addFilesIfNotSet([importPlugin.flatConfigs.react, ...xoReactConfig], filesDefault));
	}

	if (options.prettier) {
		result.push(createPrettierConfig(options));
	}

	return result;
}
