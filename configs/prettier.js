import {checkDependencies} from '../utils/check-dependencies.js';
import {GLOBS} from '../utils/globs.js';

await checkDependencies('eslint-plugin-prettier');

const {default: prettierPlugin} = await import('eslint-plugin-prettier/recommended');

/** @type {import("eslint").Linter.Config} */
const prettier = {
	name: 'prettier config',
	files: [GLOBS.JS, GLOBS.TS, GLOBS.JSON, GLOBS.JSONC, GLOBS.JSON5, GLOBS.MD],
	extends: [prettierPlugin],
	rules: {
		'prettier/prettier': 'error',
	},
};

export default prettier;
