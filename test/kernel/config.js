import assert from "node:assert/strict";
import test from "node:test";

import * as $gauze from "./../../src/index.js";
import * as $project from "./../../src/gauze.js";
import * as $kernel_realm from "./../../src/kernel/gauze.js";
import * as $database_realm from "./../../src/database/gauze.js";
import * as $system_realm from "./../../src/system/gauze.js";
import * as $environment_realm from "./../../src/environment/gauze.js";

const $config = $gauze.kernel.src.config;

function project_config() {
	return structuredClone($project.default);
}

function config_tree(project = $project.default) {
	return {
		project,
		realms: {
			kernel: $kernel_realm.default,
			database: $database_realm.default,
			system: $system_realm.default,
			environment: $environment_realm.default,
		},
	};
}

function secret_environment(overrides = {}) {
	return {
		GAUZE_ENVIRONMENT_JWT_SECRET: "0123456789abcdef0123456789abcdef",
		GAUZE_SYSTEM_JWT_SECRET: "0123456789abcdef0123456789abcdef",
		GAUZE_DATABASE_JWT_SECRET: "0123456789abcdef0123456789abcdef",
		GAUZE_KERNEL_JWT_SECRET: "0123456789abcdef0123456789abcdef",
		GAUZE_PROXY_JWT_SECRET: "0123456789abcdef0123456789abcdef",
		GAUZE_CURSOR_SECRET: "0123456789abcdef0123456789abcdef",
		...overrides,
	};
}

test.describe("kernel config validation", async function () {
	await test.it("accepts the current project and realm config tree", function () {
		const tree = config_tree();
		const validated = $config.VALIDATE_CONFIG_TREE__CONFIG__SRC__KERNEL(tree);
		assert.equal(validated, tree);
	});

	await test.it("rejects a project config with an invalid type", function () {
		const config = project_config();
		config.type = "realm";
		assert.throws(function () {
			$config.VALIDATE_PROJECT_CONFIG__CONFIG__SRC__KERNEL(config);
		}, /must be 'project'/);
	});

	await test.it("rejects authentication realms missing a configured project realm", function () {
		const config = project_config();
		delete config.authentication.realms.system;
		assert.throws(function () {
			$config.VALIDATE_PROJECT_CONFIG__CONFIG__SRC__KERNEL(config);
		}, /authentication\.realms\.system/);
	});

	await test.it("rejects top-level environment config blocks", function () {
		const config = project_config();
		config.development_monolithic = config.environments.development_monolithic;
		delete config.environments;
		assert.throws(function () {
			$config.VALIDATE_PROJECT_CONFIG__CONFIG__SRC__KERNEL(config);
		}, /environments/);
	});

	await test.it("rejects authentication requirements that do not reference configured success steps", function () {
		const config = project_config();
		config.authentication.proxy.push("steps.missing.success");
		assert.throws(function () {
			$config.VALIDATE_PROJECT_CONFIG__CONFIG__SRC__KERNEL(config);
		}, /steps\.missing\.success/);
	});

	await test.it("rejects mismatched project and realm modes", function () {
		const config = project_config();
		config.realms.database.mode = "open";
		assert.throws(function () {
			$config.VALIDATE_CONFIG_TREE__CONFIG__SRC__KERNEL(config_tree(config));
		}, /project\.realms\.database\.mode/);
	});

	await test.it("rejects realm configs missing from project realms", function () {
		const config = project_config();
		delete config.realms.environment;
		delete config.authentication.realms.environment;
		assert.throws(function () {
			$config.VALIDATE_CONFIG_TREE__CONFIG__SRC__KERNEL(config_tree(config));
		}, /project\.realms\.environment/);
	});

	await test.it("accepts locked as a normal realm mode", function () {
		const realm = {
			name: "kernel",
			type: "realm",
			mode: "locked",
		};
		const validated = $config.VALIDATE_REALM_CONFIG__CONFIG__SRC__KERNEL(realm, {
			expected_name: "kernel",
		});
		assert.equal(validated, realm);
	});

	await test.it("accepts configured signing secrets", function () {
		const environment = secret_environment();
		const validated = $config.VALIDATE_ENVIRONMENT_VARIABLES__CONFIG__SRC__KERNEL(environment);
		assert.equal(validated, environment);
	});

	await test.it("reads configured environment variables through the validation dispatcher", function () {
		const environment = secret_environment();
		const value = $config.ENVIRONMENT_VARIABLE__CONFIG__SRC__KERNEL("GAUZE_PROXY_JWT_SECRET", environment);
		assert.equal(value, environment.GAUZE_PROXY_JWT_SECRET);
	});

	await test.it("rejects environment variables without configured validators", function () {
		assert.throws(function () {
			$config.ENVIRONMENT_VARIABLE__CONFIG__SRC__KERNEL("GAUZE_UNKNOWN_SECRET", secret_environment());
		}, /GAUZE_UNKNOWN_SECRET.*configured validator/);
	});

	await test.it("rejects missing signing secrets", function () {
		const environment = secret_environment();
		delete environment.GAUZE_SYSTEM_JWT_SECRET;
		assert.throws(function () {
			$config.VALIDATE_ENVIRONMENT_VARIABLES__CONFIG__SRC__KERNEL(environment);
		}, /GAUZE_SYSTEM_JWT_SECRET.*must be defined/);
	});

	await test.it("rejects placeholder signing secrets", function () {
		assert.throws(function () {
			$config.VALIDATE_ENVIRONMENT_VARIABLES__CONFIG__SRC__KERNEL(
				secret_environment({
					GAUZE_ENVIRONMENT_JWT_SECRET: "REPLACE_ME_ENVIRONMENT",
				}),
			);
		}, /GAUZE_ENVIRONMENT_JWT_SECRET.*placeholder/);
		assert.throws(function () {
			$config.VALIDATE_ENVIRONMENT_VARIABLES__CONFIG__SRC__KERNEL(
				secret_environment({
					GAUZE_CURSOR_SECRET: "GAUZE_CURSOR_SECRET",
				}),
			);
		}, /GAUZE_CURSOR_SECRET.*placeholder/);
	});

	await test.it("rejects too-short signing secrets", function () {
		assert.throws(function () {
			$config.VALIDATE_ENVIRONMENT_VARIABLES__CONFIG__SRC__KERNEL(
				secret_environment({
					GAUZE_DATABASE_JWT_SECRET: "short-secret",
				}),
			);
		}, /GAUZE_DATABASE_JWT_SECRET.*at least 32 bytes/);
	});
});
