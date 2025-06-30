import markdownPlugin from '@eslint/markdown';
import {GLOBS} from './constants.js';

/**
 * @description Create a new markdown config.
 *
 * @returns {import("eslint").Linter.Config}
 */
export function newMarkdownConfig() {
	return {
		name: 'Markdown config',
		files: [GLOBS.MD],
		extends: [markdownPlugin.configs.recommended],
	};
}
