import {checkDependencies} from '../utils/check-dependencies.js';
import {GLOBS} from '../utils/globs.js';

await checkDependencies('eslint-plugin-import', 'eslint-config-xo-react');

const {default: importPlugin} = await import('eslint-plugin-import');
const {default: xoReactConfig} = await import('eslint-config-xo-react');

/** @type {import("eslint").Linter.Config} */
const react = {
	name: 'react config',
	files: [GLOBS.JS, GLOBS.TS],
	extends: [importPlugin.flatConfigs.react, xoReactConfig],
	rules: {
		// While using ts with `react-jsx` preset - there
		// is no need in importing react in each file
		'react/react-in-jsx-scope': 'off',

		// There is no sense in using prop-types within ts projects
		'react/require-default-props': 'off',
		'react/no-unused-prop-types': 'off',
		'react/prop-types': 'off',

		// Not so convenient in significant amount of cases to
		// prefix boolean prop with `is` or `has`.
		'react/boolean-prop-naming': 'off',

		// Name is taken from constant name or function name
		'react/display-name': 'off',
	},
};

export default react;
