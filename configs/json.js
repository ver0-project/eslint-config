import {checkDependencies} from '../utils/check-dependencies.js';
import {GLOBS} from '../utils/globs.js';

await checkDependencies('@eslint/json');

const {default: jsonPlugin} = await import('@eslint/json');

const rules = {
	'json/no-duplicate-keys': 'error',
	'json/no-empty-keys': 'error',
};

/** @type {import("eslint").Linter.Config[]} */
const json = [
	{
		name: 'JSON config',
		files: [GLOBS.JSON],
		language: 'json/json',
		plugins: {json: jsonPlugin},
		rules: {...rules},
	},
	{
		name: 'JSONC config',
		files: [GLOBS.JSONC],
		language: 'json/jsonc',
		plugins: {json: jsonPlugin},
		rules: {...rules},
	},
	{
		name: 'JSON5 config',
		files: [GLOBS.JSON5],
		language: 'json/json5',
		plugins: {json: jsonPlugin},
		rules: {...rules},
	},
];

export default json;
