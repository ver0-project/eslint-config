# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command         | Description          |
| --------------- | -------------------- |
| `yarn`          | Install dependencies |
| `yarn lint`     | Lint the project     |
| `yarn lint:fix` | Lint with auto-fix   |
| `yarn test`     | Run tests (vitest)   |

**Package manager:** Yarn v4+ (Berry). All commands should be run with `yarn`.

No build step. The package ships plain JS.

## Project Overview

`@ver0/eslint-config` is a shared ESLint flat config package (ESLint 10+) used across all ver0 projects. Each config
module is imported individually by consumers — there is no central `buildConfig()` entry point.

**Exports map:** `"./*": "./configs/*.js"` — consumers import configs directly:

```js
import javascript from '@ver0/eslint-config/javascript';
import typescript from '@ver0/eslint-config/typescript';
```

## Architecture

```text
configs/          # ESLint config modules (one per concern)
  javascript.js   # Base JS rules (always included)
  typescript.js   # TS rules + typescriptUnsafe named export
  react.js        # React/JSX rules
  node.js         # Node.js globals and rules
  browser.js      # Browser globals and restricted globals
  json.js         # JSON/JSONC/JSON5 (exports array of 3 configs)
  markdown.js     # Markdown linting
  vitest.js       # Test file rules
  prettier.js     # Prettier formatting integration
utils/
  globs.js        # Shared glob patterns (GLOBS.JS, GLOBS.TS, GLOBS.TEST, etc.)
  check-dependencies.js  # Runtime checker for optional peer deps
```

Each config module exports a pre-built `Linter.Config` object (or array for JSON). Modules use top-level `await` to:

1. Call `checkDependencies(...packages)` — throws listing missing peer deps
2. Dynamically `import()` the required plugins/configs

## Code Style

- Pure JavaScript with JSDoc type annotations (no TypeScript compilation)
- ES modules (`"type": "module"`)
- Tab indentation, single quotes, semicolons, 120 char line width
- Formatting enforced by Prettier (config in `.prettierrc.js`)

## Key Conventions

- Config modules export pre-built config objects as default exports, not factory functions
- `json.js` is the exception — exports an array of 3 configs (JSON, JSONC, JSON5)
- `typescript.js` has an additional named export `typescriptUnsafe` that disables strict type-safety rules
- `checkDependencies(...packages)` takes variadic string args (no config name — stack trace identifies the caller)
- Base rule sets come from XO configs (`eslint-config-xo`, `eslint-config-xo-typescript`, `eslint-config-xo-react`) with
  per-rule overrides
- All plugin dependencies are optional peer deps — `checkDependencies` validates them at import time

## Testing

Tests live next to source files (`*.test.js`). Two test suites:

- `utils/check-dependencies.test.js` — unit tests for the dependency checker
- `configs/configs.test.js` — feasibility tests proving each config loads and lints code via `Linter.verify()`

Configs using `extends` must be passed through `defineConfig()` before `Linter.verify()` can process them.

TypeScript and React configs cannot be verified via `Linter.verify()` due to third-party limitations (TS needs a
tsconfig project, React plugin uses a legacy API). Structural tests cover those instead.

## Gotchas

- `.npmignore` uses a deny-all + allowlist pattern (`*` then `!dir/`). You must also add `!dir/**` alongside `!dir/` or
  npm silently excludes directory contents while keeping the empty directory.

## Release

Automated via semantic-release on the `master` branch. Commit messages must follow conventional commits (`fix:`,
`feat:`, etc.). Dependabot handles dependency updates with `fix(deps):` prefix.
