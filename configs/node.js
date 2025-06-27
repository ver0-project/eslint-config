import nodePlugin from 'eslint-plugin-n';
import {GLOBS} from './constants.js';

/**
 * @description Create a new node config.
 *
 * @returns {Linter.Config}
 */
export function newNodeConfig() {
	return {
		files: [GLOBS.JS, GLOBS.TS],
		extends: [nodePlugin.configs['flat/recommended-module']],
		rules: {
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
		},
	};
}
