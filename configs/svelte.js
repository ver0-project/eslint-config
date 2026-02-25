import {checkDependencies} from '../utils/check-dependencies.js';

await checkDependencies('eslint-plugin-svelte');

const {default: svelte} = await import('eslint-plugin-svelte');

/** @type {import("eslint").Linter.Config[]} */
const svelteConfig = svelte.configs.recommended;

export default svelteConfig;
