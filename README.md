<div align="center">
<h1>@ver0/eslint-config</h1>

[![NPM Version](https://img.shields.io/npm/v/%40ver0%2Feslint-config?style=flat-square)](https://www.npmjs.com/package/@ver0/eslint-config)
[![NPM Downloads](https://img.shields.io/npm/dm/%40ver0%2Feslint-config?style=flat-square)](https://www.npmjs.com/package/@ver0/eslint-config)
[![Dependents (via libraries.io), scoped npm package](https://img.shields.io/librariesio/dependents/npm/%40ver0/eslint-config?style=flat-square)](https://www.npmjs.com/package/@ver0/eslint-config)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/ver0-project/eslint-config/ci.yml?style=flat-square)](https://github.com/ver0-project/eslint-config/actions)

<br/>

<p>🔬 A comprehensive ESLint configuration used across all ver0 projects</p>

</div>

## ✨ What's Included

This config brings together the best ESLint rules and plugins to help you write clean, consistent code. Here's what you
get out of the box:

### 🎯 **Core Features**

- **JavaScript & TypeScript** - Full support for modern JS/TS syntax
- **React Support** - Optional React-specific linting rules
- **Node.js Integration** - Node-specific rules when targeting server environments
- **JSON Linting** - Support for `.json`, `.jsonc`, and `.json5` files
- **Markdown Linting** - Keep your documentation consistent
- **Vitest Testing** - Specialized rules for Vitest test files
- **Prettier Integration** - Seamlessly works with Prettier formatting

### 📦 **Supported File Types**

- **JavaScript**: `.js`, `.jsx`, `.mjs`, `.cjs`
- **TypeScript**: `.ts`, `.tsx`, `.mts`, `.cts`
- **JSON**: `.json`, `.jsonc`, `.json5`
- **Markdown**: `.md`
- **Tests**: `.test.*`, `.benchmark.*`

### 🔧 **Included Plugins & Configs**

- ESLint recommended rules
- XO configuration (both JS and TS)
- Import/export validation and sorting
- Unicorn (modern JS practices)
- Promise best practices
- ESLint comments management
- TypeScript-specific linting
- React hooks and JSX rules (when enabled)
- And many more quality-of-life improvements!

## 🚀 Installation

```bash
yarn add -D @ver0/eslint-config
```

## 📖 Usage

### ESLint Configuration

Setting up your ESLint config is straightforward! The configuration assumes you're using TypeScript and Prettier by
default (though you can disable specific features if needed).

```js
// eslint.config.js
import {defineConfig} from 'eslint/config';
import {buildConfig} from '@ver0/eslint-config';

export default defineConfig(
	...buildConfig({
		globals: 'node',
		typescript: true,
		typescriptUnsafe: true,
		vitest: true,
		json: true,
		markdown: true,
		react: true,
	}),
	{
		files: ['README.md'],
		language: 'markdown/gfm',
	}
	// ... any other configs on your taste...
);
```

### 🎛️ Configuration Options

| Option             | Type      | Default  | Description                                                     |
| ------------------ | --------- | -------- | --------------------------------------------------------------- |
| `globals`          | `string`  | `'node'` | **Required.** Environment globals (`'node'`, `'browser'`, etc.) |
| `prettier`         | `boolean` | `true`   | Enable Prettier integration and formatting rules                |
| `typescript`       | `boolean` | `true`   | Enable TypeScript-specific linting rules                        |
| `typescriptUnsafe` | `boolean` | `false`  | Disable TypeScript's strict safety rules                        |
| `json`             | `boolean` | `true`   | Enable JSON/JSONC/JSON5 file linting                            |
| `markdown`         | `boolean` | `true`   | Enable Markdown file linting                                    |
| `react`            | `boolean` | `false`  | Enable React and JSX-specific rules                             |
| `vitest`           | `boolean` | `false`  | Enable Vitest testing framework rules                           |

### 🌟 Common Configurations

**For a Node.js API project:**

```js
// eslint.config.js
import {defineConfig} from 'eslint/config';
import {buildConfig} from '@ver0/eslint-config';

export default defineConfig(
	...buildConfig({
		globals: 'node',
		vitest: true, // if you're using Vitest for testing
	})
	// ... any other configs on your taste...
);
```

**For a React web application:**

```js
export default buildConfig({
	globals: 'browser',
	react: true,
	vitest: true,
});
```

### 🎨 Prettier Configuration

This package also provides opininated default Prettier configuration, that you can extend from.

```js
// .prettierrc.js
import ver0Config from '@ver0/eslint-config/.prettierrc.js';

export default {
	...ver0Config,
	// Override any settings if needed
	// printWidth: 100,
};
```

### ⚙️ EditorConfig

For consistent formatting across different editors, you can copy our `.editorconfig` that is aligned with our Prettier
configuration:

```ini
# .editorconfig
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

## 🛠️ Troubleshooting

**Rules conflicting with your existing setup?** You can override specific rules by adding them after our config:

```js
// eslint.config.js
import {defineConfig} from 'eslint/config';
import {buildConfig} from '@ver0/eslint-config';

export default defineConfig(...buildConfig({globals: 'node'}), {
	rules: {
		'some-rule': 'off', // Override any rule
	},
});
```
