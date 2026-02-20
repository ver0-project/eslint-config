import {checkDependencies} from '../utils/check-dependencies.js';
import {GLOBS} from '../utils/globs.js';

await checkDependencies('@vitest/eslint-plugin');

const {default: vitestPlugin} = await import('@vitest/eslint-plugin');

/** @type {import("eslint").Linter.Config} */
const vitest = {
	name: 'vitest config',
	files: [GLOBS.TEST],
	extends: [vitestPlugin.configs.recommended],
};

export default vitest;
