# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Lint:** `yarn lint`
- **Lint with fix:** `yarn lint:fix`
- **Install dependencies:** `yarn`

There is no build step or test suite. The package ships plain JS.

## Project Overview

`@ver0/eslint-config` is a shared ESLint flat config package (ESLint 10+) used across all ver0 projects. It exports a
`buildConfig()` function that composes modular config objects based on an options object.

## Architecture

**Entry point:** `index.js` exports `buildConfig(options)` which returns an array of ESLint config objects wrapped in
`defineConfig()`.

**Config modules** live in `configs/` — each exports a factory function returning a `Linter.Config` (or array of configs
for JSON):

- `javascript.js` — base JS rules (always included)
- `typescript.js` — TS rules, accepts options for unsafe rule toggling
- `react.js` — React/JSX rules
- `node.js` — Node.js-specific rules (auto-included when `globals: 'node'`)
- `vitest.js` — test file rules
- `json.js` — JSON/JSONC/JSON5 (returns array of 3 configs)
- `markdown.js` — Markdown linting
- `prettier.js` — Prettier formatting integration
- `constants.js` — shared glob patterns (`GLOBS.JS`, `GLOBS.TS`, `GLOBS.TEST`, etc.)

**Composition order:** JS → globals/sourceType → TypeScript → React → Node → JSON → Markdown → Vitest → Prettier.

## Code Style

- Pure JavaScript with JSDoc type annotations (no TypeScript compilation)
- ES modules (`"type": "module"`)
- Tab indentation, single quotes, semicolons, 120 char line width
- Formatting enforced by Prettier (config in `.prettierrc.js`)

## Key Conventions

- Config factory functions are named `newXxxConfig()` and return `Linter.Config`
- `newJsonConfigs()` is the exception — returns an array
- The `buildConfig()` options all have defaults (see `defaultOptions` in `index.js`); only `globals` is required
- Base rule sets come from XO configs (`eslint-config-xo`, `eslint-config-xo-typescript`, `eslint-config-xo-react`) with
  per-rule overrides

## Release

Automated via semantic-release on the `master` branch. Commit messages must follow conventional commits (`fix:`,
`feat:`, etc.). Dependabot handles dependency updates with `fix(deps):` prefix.
