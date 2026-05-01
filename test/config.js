import assert from "node:assert/strict";
import test from "node:test";

import * as $gauze from "./../src/index.js";
import * as $project from "./../src/gauze.js";
import * as $kernel_realm from "./../src/kernel/gauze.js";
import * as $database_realm from "./../src/database/gauze.js";
import * as $system_realm from "./../src/system/gauze.js";
import * as $environment_realm from "./../src/environment/gauze.js";

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
});
