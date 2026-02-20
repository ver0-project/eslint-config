import {describe, it, expect} from 'vitest';
import {checkDependencies} from './check-dependencies.js';

describe('checkDependencies', () => {
	it('resolves when all packages are installed', async () => {
		await expect(checkDependencies('globals', '@eslint/js')).resolves.toBeUndefined();
	});

	it('resolves when called with no arguments', async () => {
		await expect(checkDependencies()).resolves.toBeUndefined();
	});

	it('throws listing a single missing package', async () => {
		await expect(checkDependencies('@nonexistent/pkg-a')).rejects.toThrow(
			'[@ver0/eslint-config] The following packages are required but not installed:\n  - @nonexistent/pkg-a',
		);
	});

	it('throws listing all missing packages at once', async () => {
		await expect(checkDependencies('@nonexistent/pkg-a', '@nonexistent/pkg-b')).rejects.toThrow(
			'[@ver0/eslint-config] The following packages are required but not installed:\n' +
				'  - @nonexistent/pkg-a\n' +
				'  - @nonexistent/pkg-b',
		);
	});

	it('throws listing only the missing packages when some are installed', async () => {
		await expect(
			checkDependencies('globals', '@nonexistent/pkg-a', '@eslint/js', '@nonexistent/pkg-b'),
		).rejects.toThrow(
			'[@ver0/eslint-config] The following packages are required but not installed:\n' +
				'  - @nonexistent/pkg-a\n' +
				'  - @nonexistent/pkg-b',
		);
	});
});
