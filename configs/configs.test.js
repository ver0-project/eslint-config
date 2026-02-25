import {describe, it, expect} from 'vitest';
import {defineConfig} from 'eslint/config';
import {Linter} from 'eslint';

/**
 * Verifies a config against a code snippet and asserts no fatal errors occur.
 * Configs are passed through defineConfig() to resolve `extends` before linting.
 *
 * @param {import("eslint").Linter.Config | import("eslint").Linter.Config[]} config
 * @param {string} code
 * @param {string} filename
 */
function expectNoFatalErrors(config, code, filename) {
	const linter = new Linter();
	const resolved = defineConfig(config);
	const messages = linter.verify(code, resolved, {filename});
	const fatal = messages.filter((m) => m.fatal);
	expect(fatal).toEqual([]);
}

describe('javascript', () => {
	it('exports a valid config with rules', async () => {
		const {default: config} = await import('./javascript.js');
		expect(config.name).toBe('JavaScript config');
		expect(config.files).toContain('**/*.{js,jsx,mjs,cjs}');
		expect(config.rules).toBeDefined();
	});

	it('lints JS code without fatal errors', async () => {
		const {default: config} = await import('./javascript.js');
		expectNoFatalErrors(config, 'const x = 1;\nexport default x;\n', 'test.js');
	});
});

describe('typescript', () => {
	it('exports strict and unsafe configs', async () => {
		const {default: config, typescriptUnsafe} = await import('./typescript.js');
		expect(config.name).toBe('typescript config');
		expect(config.files).toContain('**/*.{ts,tsx,mts,cts}');
		expect(config.rules).toBeDefined();

		expect(typescriptUnsafe.name).toBe('typescript unsafe config');
		expect(typescriptUnsafe.rules['@typescript-eslint/no-unsafe-argument']).toBe('off');
	});

	// Linter.verify() cannot be used here because typescript-eslint's project
	// service requires the file to exist in a tsconfig. The structural test
	// above proves the config loads and resolves correctly.
});

describe('react', () => {
	it('exports a valid config with JSX rules', async () => {
		const {default: config} = await import('./react.js');
		expect(config.name).toBe('react config');
		expect(config.rules).toBeDefined();
		expect(config.rules['react/react-in-jsx-scope']).toBe('off');
	});

	// Linter.verify() cannot be used here because eslint-plugin-react bundled
	// with xo-react uses a legacy getFilename() API removed in ESLint 10's Linter.
	// The structural test above proves the config loads and resolves correctly.
});

describe('node', () => {
	it('exports a valid config with node globals and rules', async () => {
		const {default: config} = await import('./node.js');
		expect(config.name).toBe('node config');
		expect(config.languageOptions.globals).toHaveProperty('process');
		expect(config.rules).toHaveProperty('n/no-path-concat');
	});

	it('lints code without fatal errors', async () => {
		const {default: config} = await import('./node.js');
		expectNoFatalErrors(config, 'const x = 1;\n', 'test.js');
	});
});

describe('browser', () => {
	it('exports a valid config with browser globals', async () => {
		const {default: config} = await import('./browser.js');
		expect(config.name).toBe('browser config');
		expect(config.languageOptions.globals).toHaveProperty('window');
		expect(config.rules).toHaveProperty('no-restricted-globals');
	});

	it('lints code without fatal errors', async () => {
		const {default: config} = await import('./browser.js');
		expectNoFatalErrors(config, 'const x = 1;\n', 'test.js');
	});
});

describe('json', () => {
	it('exports an array of three configs for JSON variants', async () => {
		const {default: configs} = await import('./json.js');
		expect(configs).toHaveLength(3);
		expect(configs[0].name).toBe('JSON config');
		expect(configs[1].name).toBe('JSONC config');
		expect(configs[2].name).toBe('JSON5 config');
	});

	it('lints JSON without fatal errors', async () => {
		const {default: configs} = await import('./json.js');
		expectNoFatalErrors(configs[0], '{"key": "value"}\n', 'test.json');
	});

	it('lints JSONC without fatal errors', async () => {
		const {default: configs} = await import('./json.js');
		expectNoFatalErrors(configs[1], '{"key": "value" /* comment */}\n', 'test.jsonc');
	});

	it('lints JSON5 without fatal errors', async () => {
		const {default: configs} = await import('./json.js');
		expectNoFatalErrors(configs[2], '{key: "value"}\n', 'test.json5');
	});
});

describe('markdown', () => {
	it('exports a valid config', async () => {
		const {default: config} = await import('./markdown.js');
		expect(config.name).toBe('Markdown config');
		expect(config.files).toContain('**/*.md');
	});

	it('lints markdown without fatal errors', async () => {
		const {default: config} = await import('./markdown.js');
		expectNoFatalErrors(config, '# Title\n\nParagraph.\n', 'test.md');
	});
});

describe('vitest', () => {
	it('exports a valid config targeting test files', async () => {
		const {default: config} = await import('./vitest.js');
		expect(config.name).toBe('vitest config');
		expect(config.files).toContain('**/*.{test,benchmark}.*');
	});

	it('lints test code without fatal errors', async () => {
		const {default: config} = await import('./vitest.js');
		expectNoFatalErrors(config, 'const x = 1;\n', 'foo.test.js');
	});
});

describe('svelte', () => {
	it('exports an array of configs with parser and rules', async () => {
		const {default: configs} = await import('./svelte.js');
		expect(configs).toHaveLength(4);

		const names = configs.map((c) => c.name);
		expect(names).toContain('svelte:base:setup-plugin');
		expect(names).toContain('svelte:base:setup-for-svelte');
		expect(names).toContain('svelte:recommended:rules');

		const svelteFileConfig = configs.find((c) => c.name === 'svelte:base:setup-for-svelte');
		expect(svelteFileConfig.files).toContain('**/*.svelte');
		expect(svelteFileConfig.languageOptions.parser).toBeDefined();
	});

	// Linter.verify() cannot be used here because svelte-eslint-parser's scope
	// manager doesn't implement ESLint 10's addGlobals() API. The structural
	// test above proves the config loads and resolves correctly.
});

describe('prettier', () => {
	it('exports a valid config with prettier rule', async () => {
		const {default: config} = await import('./prettier.js');
		expect(config.name).toBe('prettier config');
		expect(config.rules['prettier/prettier']).toBe('error');
	});

	it('lints code without fatal errors', async () => {
		const {default: config} = await import('./prettier.js');
		expectNoFatalErrors(config, 'const x = 1;\n', 'test.js');
	});
});
