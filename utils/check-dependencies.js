/**
 * Checks that all passed packages are resolvable.
 * Attempts to import every package and throws a single comprehensive error
 * listing all missing ones.
 *
 * @param {...string} packages - Package specifiers to check (e.g. 'eslint-plugin-n').
 * @returns {Promise<void>}
 */
export async function checkDependencies(...packages) {
	const results = await Promise.allSettled(packages.map((pkg) => import(pkg)));
	const missing = packages.filter((_, i) => results[i].status === 'rejected');

	if (missing.length === 0) {
		return;
	}

	let msg = '[@ver0/eslint-config] The following packages are required but not installed:\n';

	for (const p of missing) {
		msg += `  - ${p}\n`;
	}

	throw new Error(msg);
}
