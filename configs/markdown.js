import markdownPlugin from '@eslint/markdown';
import {GLOBS} from './constants.js';

/**
 * @description Create a new markdown config.
 *
 * @returns {Linter.Config}
 */
export function newMarkdownConfig() {
	return {
		files: [GLOBS.MD],
		extends: [markdownPlugin.configs.recommended],
	};
}
