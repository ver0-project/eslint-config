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
import vitestPlugin from '@vitest/eslint-plugin';
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
	return cfgs.map((cfg) => {
		if (cfg.files === undefined) {
			return {...cfg, files};
		}

		return cfg;
	});
}

/**
 * @param {Linter.Config[]} cfgs
 *
 * @returns {Linter.Config[]}
 */
function clearStylisticRules(cfgs) {
	return cfgs.map((cfg) => {
		if (cfg.plugins) {
			delete cfg.plugins['@stylistic'];
		}

		if (cfg.rules) {
			for (const rule in cfg.rules) {
				if (rule.startsWith('@stylistic/')) {
					delete cfg.rules[rule];
				}
			}
		}

		return cfg;
	});
}

/** @type {Linter.RulesRecord} */
const jsRules = {
	'no-use-extend-native/no-use-extend-native': 'error',

	// it is a good rule in general, but dialects are project-dependant
	// in case some project hand to restrict vocabulary, it should be done there.
	'unicorn/prevent-abbreviations': 'off',

	// nulls are fine!
	'unicorn/no-null': 'off',

	// the only case when ternaries are okay.
	'unicorn/prefer-ternary': ['error', 'only-single-line'],

	// too much FP.
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
	// disable since it is a VERY slow rule
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

	// disabled due to https://github.com/import-js/eslint-plugin-import/issues/3076
	'import/no-unresolved': 'off',

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
	xoConfig[0],
	{
		rules: jsRules,
	},
];

/** @type {Linter.RulesRecord} */
const jsonRules = {
	'json/no-duplicate-keys': 'error',
	'json/no-empty-keys': 'error',
};

/** @type {Linter.RulesRecord} */
const tsRules = {
	...jsRules,

	// toplevel type imports can be wiped out completely.
	'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

	// it is defined per project.
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
};

/** @type {Linter.RulesRecord} */
const reactRules = {
	// While using ts with `react-jsx` preset - there
	// is no need in importing react in each file
	'react/react-in-jsx-scope': 'off',

	// There is no sense in using prop-types within ts projects
	'react/require-default-props': 'off',
	'react/no-unused-prop-types': 'off',
	'react/prop-types': 'off',

	// Not so convenient in significant amount of cases to
	// prefix boolean prop with `is` or `has`.
	'react/boolean-prop-naming': 'off',

	// name is taken from constant name or function name
	'react/display-name': 'off',
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
	let result = [
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
				[importPlugin.flatConfigs.typescript, ...xoTypescriptConfig, {rules: tsRules}],
				[`**/*.{${tsExtensions.join(',')}}`]
			)
		);
	}

	if (options.react) {
		result.push(
			...addFilesIfNotSet([importPlugin.flatConfigs.react, ...xoReactConfig, {rules: reactRules}], filesDefault)
		);
	}

	if (options.vitest) {
		result.push(...addFilesIfNotSet([vitestPlugin.configs.recommended], ['**/*.{test,benchmark}.*']));
	}

	result = clearStylisticRules(result);

	if (options.prettier) {
		result.push(createPrettierConfig(options));
	}

	return result;
}
