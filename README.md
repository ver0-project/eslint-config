<div align="center">
<h1>@ver0/eslint-config</h1>

[![NPM Version](https://img.shields.io/npm/v/%40ver0%2Feslint-config?style=flat-square)](https://www.npmjs.com/package/@ver0/eslint-config)
[![NPM Downloads](https://img.shields.io/npm/dm/%40ver0%2Feslint-config?style=flat-square)](https://www.npmjs.com/package/@ver0/eslint-config)
[![Dependents (via libraries.io), scoped npm package](https://img.shields.io/librariesio/dependents/npm/%40ver0/eslint-config?style=flat-square)](https://www.npmjs.com/package/@ver0/eslint-config)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/ver0-project/eslint-config/ci.yml?style=flat-square)](https://github.com/ver0-project/eslint-config/actions)

<p><br/>🔬 ESLint configs used in all ver0 projects</p>
</div>

### Installation

```bash
yarn add -D @ver0/eslint-config
```

### Usage

### ESLint configuration

This configuration implies usage of `typescript` and `prettier` by default, even though it is possible to disable
respective lint rules -- these packages will be installed anyways.

```js filename="eslint.config.js"
import {buildConfig} from '@ver0/eslint-config';

/** @typedef {import('eslint').Linter} Linter */

/** @type {Linter.Config[]} */
const cfg = [
	...buildConfig({
		globals: 'node',
		prettier: true,
		typescript: true,
		json: true,
		markdown: true,
		react: false,
		vitest: false,
	}),
	{
		files: ['README.md'],
		language: 'markdown/gfm',
	},
];

export default cfg;
```

Array returned from `buildConfig` function is a list of ESLint configurations that should be spreaded into the final
configuration.

### Prettier configuration

In order to sync configuration of prettier with ESLint, it is recommended to extend the configuration from this package.

```js filename=".prettierrc.js"
import ver0Cfg from '@ver0/eslint-config/prettierrc.js';

/**
 * @type {import("prettier").Config}
 */
export default {
	...ver0Cfg,
};
```

`.editorconfig` with according configuration can also be copied from this repo.

```.editorconfig
[*]
indent_style = tab
tab_width = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 120

[*.yml]
indent_style = space
indent_size = 2
```
