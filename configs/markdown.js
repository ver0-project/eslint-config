import {checkDependencies} from '../utils/check-dependencies.js';
import {GLOBS} from '../utils/globs.js';

await checkDependencies('@eslint/markdown');

const {default: markdownPlugin} = await import('@eslint/markdown');

/** @type {import("eslint").Linter.Config} */
const markdown = {
	name: 'Markdown config',
	files: [GLOBS.MD],
	extends: [markdownPlugin.configs.recommended],
};

export default markdown;
