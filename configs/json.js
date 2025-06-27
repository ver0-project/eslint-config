import jsonPlugin from '@eslint/json';
import {GLOBS} from './constants.js';

/**
 * @description Create a new json configs.
 *
 * @return {Linter.Config[]}
 */
export function newJsonConfigs() {
	const rules = {
		'json/no-duplicate-keys': 'error',
		'json/no-empty-keys': 'error',
	};

	return [
		{
			files: [GLOBS.JSON],
			language: 'json/json',
			plugins: {json: jsonPlugin},
			rules: {...rules},
		},
		{
			files: [GLOBS.JSONC],
			language: 'json/jsonc',
			plugins: {
				json: jsonPlugin,
			},
			rules: {...rules},
		},
		{
			files: [GLOBS.JSON5],
			language: 'json/json5',
			plugins: {
				json: jsonPlugin,
			},
			rules: {...rules},
		},
	];
}
