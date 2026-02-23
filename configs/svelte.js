import {checkDependencies} from '../utils/check-dependencies.js';
import {GLOBS} from '../utils/globs.js';

await checkDependencies('eslint-plugin-svelte');

const {default: svelte} = await import('eslint-plugin-svelte');

/** @type {import("eslint").Linter.Config} */
const svelteConfig = {
	name: 'svelte config',
	files: [GLOBS.SVELTE, GLOBS.SVELTE_MODULES],
	extends: [...svelte.configs.recommended],
};

export default svelteConfig;
