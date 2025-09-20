# @ver0/eslint-config Project Overview

## Project Purpose

- Provides standardized ESLint configurations for all ver0 projects
- Enforces consistent code style and quality standards
- Simplifies setup with preconfigured rulesets for various environments
- Reduces configuration duplication across projects
- Centralizes linting policy decisions

## Project Structure

- `index.js` - Main entry point that exports the buildConfig function
- `.prettierrc.js` - Prettier configuration that can be extended
- `.editorconfig` - Editor configuration for consistent formatting

## Key Features

- Configurable through simple options object
- Provides various linter integrations:
  - Vanilla JS
  - TypeScript
  - React
  - Vitest
  - Markdown
  - JSON/JSON5/JSONC
  - Prettier formatting for supported languages

## Usage Pattern

- Import and use buildConfig function in eslint.config.js
- Pass configuration options to enable/disable specific rule sets
- Extend prettierrc.js in project's own Prettier config
- Copy .editorconfig for consistent editor behavior

## Implementation Details

- Based on ESLint flat config system
- Uses composition pattern to build configurations
- Leverages popular ESLint plugins and configs
- Provides sensible defaults while allowing customization
