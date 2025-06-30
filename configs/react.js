import xoReactConfig from 'eslint-config-xo-react';
import importPlugin from 'eslint-plugin-import';
import {GLOBS} from './constants.js';

/**
 * @description Create a new react config.
 *
 * @returns {import("eslint").Linter.Config}
 */
export function newReactConfig() {
	return {
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
}
