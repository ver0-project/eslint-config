<div align="center">
<h1>@ver0/eslint-config</h1>

[![NPM Version](https://img.shields.io/npm/v/%40ver0%2Feslint-config?style=flat-square)](https://www.npmjs.com/package/@ver0/eslint-config)
[![NPM Downloads](https://img.shields.io/npm/dm/%40ver0%2Feslint-config?style=flat-square)](https://www.npmjs.com/package/@ver0/eslint-config)
[![Dependents (via libraries.io), scoped npm package](https://img.shields.io/librariesio/dependents/npm/%40ver0/eslint-config?style=flat-square)](https://www.npmjs.com/package/@ver0/eslint-config)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/ver0-project/eslint-config/ci.yml?style=flat-square)](https://github.com/ver0-project/eslint-config/actions)

<br/>

<p>🔬 A modular ESLint configuration used across all ver0 projects</p>

</div>

## ✨ What's Included

A collection of modular ESLint configs — import only what you need and compose them with `defineConfig()`.

- **JavaScript** — base rules, import sorting, unicorn, promise, ESLint comments
- **TypeScript** — type-aware linting via XO TypeScript config
- **React** — JSX, hooks, and import rules
- **Node.js** — Node globals and `eslint-plugin-n` rules
- **Browser** — browser globals and restricted globals
- **JSON** — `.json`, `.jsonc`, `.json5` linting
- **Markdown** — Markdown linting
- **Svelte** — Svelte component and runes module linting
- **Vitest** — test file rules
- **Prettier** — formatting integration

## 🚀 Installation

```bash
yarn add -D @ver0/eslint-config eslint
```

Each config requires its own peer dependencies — see [Available Configs](#-available-configs) below.

## 📖 Usage

Import the configs you need and compose them with `defineConfig()`:

```js
// eslint.config.js
import {defineConfig} from 'eslint/config';
import javascript from '@ver0/eslint-config/javascript';
import node from '@ver0/eslint-config/node';
import json from '@ver0/eslint-config/json';
import markdown from '@ver0/eslint-config/markdown';
import prettier from '@ver0/eslint-config/prettier';

export default defineConfig(javascript, node, ...json, markdown, prettier);
```

> **Note:** The JSON config exports an array of 3 configs (JSON, JSONC, JSON5), so spread it with `...json`.

## 📦 Available Configs

Each config is a standalone module. Import it to enable, skip it to disable — no options object needed. If the required
peer dependencies are not installed, you'll get a clear error listing exactly what's missing.

- **JavaScript** — base rules, import sorting, unicorn, promise, ESLint comments. Always include this one — other
  configs build on top of it.

  ```bash
  yarn add -D @eslint/js @eslint-community/eslint-plugin-eslint-comments eslint-plugin-import eslint-plugin-promise eslint-plugin-unicorn eslint-plugin-no-use-extend-native eslint-config-xo
  ```

- **TypeScript** — type-aware linting rules. Also exports `typescriptUnsafe` to disable strict type-safety rules.

  ```bash
  yarn add -D eslint-config-xo-typescript typescript
  ```

- **React** — React, JSX, and hooks rules.

  ```bash
  yarn add -D eslint-plugin-import eslint-config-xo-react
  ```

- **Node.js** — Node.js globals and `eslint-plugin-n` rules.

  ```bash
  yarn add -D globals eslint-plugin-n
  ```

- **Browser** — browser globals and restricted globals (prevents accidental use of confusing browser globals like
  `event`, `name`, etc.).

  ```bash
  yarn add -D globals confusing-browser-globals
  ```

- **JSON** — linting for `.json`, `.jsonc`, and `.json5` files. Exports an array of 3 configs — spread it with `...json`
  in `defineConfig()`.

  ```bash
  yarn add -D @eslint/json
  ```

- **Markdown** — Markdown linting.

  ```bash
  yarn add -D @eslint/markdown
  ```

- **Svelte** — Svelte component and runes module linting via `eslint-plugin-svelte`. Exports an array of configs —
  spread it with `...svelte` in `defineConfig()`.

  ```bash
  yarn add -D eslint-plugin-svelte
  ```

- **Vitest** — rules for test and benchmark files (`*.test.*`, `*.benchmark.*`).

  ```bash
  yarn add -D @vitest/eslint-plugin
  ```

- **Prettier** — formatting integration. Include this last so it overrides conflicting rules.

  ```bash
  yarn add -D eslint-plugin-prettier eslint-config-prettier prettier
  ```

## 🌟 Common Configurations

**Node.js API project:**

```js
// eslint.config.js
import {defineConfig} from 'eslint/config';
import javascript from '@ver0/eslint-config/javascript';
import typescript from '@ver0/eslint-config/typescript';
import node from '@ver0/eslint-config/node';
import json from '@ver0/eslint-config/json';
import markdown from '@ver0/eslint-config/markdown';
import vitest from '@ver0/eslint-config/vitest';
import prettier from '@ver0/eslint-config/prettier';

export default defineConfig(javascript, typescript, node, ...json, markdown, vitest, prettier);
```

**React web application:**

```js
// eslint.config.js
import {defineConfig} from 'eslint/config';
import javascript from '@ver0/eslint-config/javascript';
import typescript from '@ver0/eslint-config/typescript';
import react from '@ver0/eslint-config/react';
import browser from '@ver0/eslint-config/browser';
import json from '@ver0/eslint-config/json';
import vitest from '@ver0/eslint-config/vitest';
import prettier from '@ver0/eslint-config/prettier';

export default defineConfig(javascript, typescript, react, browser, ...json, vitest, prettier);
```

**SvelteKit application:**

```js
// eslint.config.js
import {defineConfig} from 'eslint/config';
import javascript from '@ver0/eslint-config/javascript';
import typescript from '@ver0/eslint-config/typescript';
import svelte from '@ver0/eslint-config/svelte';
import browser from '@ver0/eslint-config/browser';
import json from '@ver0/eslint-config/json';
import vitest from '@ver0/eslint-config/vitest';
import prettier from '@ver0/eslint-config/prettier';

export default defineConfig(javascript, typescript, ...svelte, browser, ...json, vitest, prettier);
```

### 🎨 Prettier Configuration

This package also provides an opinionated default Prettier configuration that you can extend from.

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

**Rules conflicting with your existing setup?** You can override specific rules by adding a config after ours:

```js
// eslint.config.js
import {defineConfig} from 'eslint/config';
import javascript from '@ver0/eslint-config/javascript';
import node from '@ver0/eslint-config/node';
import prettier from '@ver0/eslint-config/prettier';

export default defineConfig(javascript, node, prettier, {
	rules: {
		'some-rule': 'off', // Override any rule
	},
});
```
