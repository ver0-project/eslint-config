import vitestPlugin from '@vitest/eslint-plugin';
import {GLOBS} from './constants.js';

/**
 * @description Create a new vitest config.
 *
 * @returns {import("eslint").Linter.Config}
 */
export function newVitestConfig() {
	return {
		name: 'vitest config',
		files: [GLOBS.TEST],
		extends: [vitestPlugin.configs.recommended],
	};
}
