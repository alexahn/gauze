import * as $gauze from "./../src/index.js";

import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";

const DatabaseManager = $gauze.kernel.src.database.manager.DATABASE_MANAGER__MANAGER__DATABASE__SRC__KERNEL;
const EXECUTE_GRAPHQL = $gauze.kernel.src.shell.graphql.EXECUTE__GRAPHQL__SHELL__SRC__KERNEL;
const DATABASE_SCHEMA = $gauze.database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE;
const SYSTEM_SCHEMA = $gauze.system.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM;

function transaction_manager() {
	return Object.create(DatabaseManager.prototype);
}

async function execute_request(database_manager, schema, context, operation, operation_name, operation_variables) {
	context.database_manager = database_manager;
	context.transactions = {};
	const result = await EXECUTE_GRAPHQL({
		schema,
		context,
		operation,
		operation_name,
		operation_variables,
	});
	if (result.errors && result.errors.length) {
		await database_manager.rollback_context_transactions(context);
	} else {
		await database_manager.commit_context_transactions(context);
	}
	return result;
}

test.describe("database transaction cleanup", async function () {
	await test.it("rejects new transaction routes after context cleanup starts", async function () {
		const manager = transaction_manager();
		const context = {};
		let route_connections_called = false;
		manager.route_connections = function () {
			route_connections_called = true;
			return [];
		};

		manager._mark_context_transaction_cleanup(context, "rollback");

		assert.throws(function () {
			manager.route_transactions(context, {}, {}, { table_name: "gauze__ytitne" }, "read");
		}, /Cannot route transactions after rollback started/);
		assert.equal(route_connections_called, false);
	});

	await test.it("recovers after duplicate whitelist create rolls back", async function () {
		const database_manager = new DatabaseManager($gauze.database.config.default);
		const agent = {
			agent_id: "00000000-0000-0000-0000-000000000001",
			agent_type: "gauze__agent_user",
		};
		const create_operation = `
mutation CreateWhitelist($whitelist: Whitelist_Mutation__Attributes) {
	create_whitelist(attributes: $whitelist) {
		attributes {
			gauze__whitelist__id
			gauze__whitelist__method
		}
	}
}
`;
		const read_operation = `
query ReadWhitelist($where: Whitelist_Query__Where) {
	read_whitelist(where: $where) {
		attributes {
			gauze__whitelist__id
			gauze__whitelist__method
		}
	}
}
`;
		const environment_operation = `
mutation CreateWhitelistEnvironment($read: Whitelist_Mutation__Attributes, $count: Whitelist_Mutation__Attributes) {
	read: create_whitelist(attributes: $read) {
		_metadata {
			id
		}
	}
	count: create_whitelist(attributes: $count) {
		_metadata {
			id
		}
	}
}
`;
		const base_whitelist = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_type: "gauze__agent_user",
			gauze__whitelist__agent_role: "leaf",
			gauze__whitelist__agent_id: randomUUID(),
			gauze__whitelist__entity_type: "gauze__ytitne",
			gauze__whitelist__entity_id: randomUUID(),
		};

		try {
			await database_manager.migrate_latest();
			await database_manager.seed_run();

			const environment = await execute_request(database_manager, DATABASE_SCHEMA, { agent }, environment_operation, "CreateWhitelistEnvironment", {
				read: {
					gauze__whitelist__id: randomUUID(),
					gauze__whitelist__realm: "system",
					gauze__whitelist__agent_type: "gauze__agent_user",
					gauze__whitelist__agent_role: "root",
					gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000001",
					gauze__whitelist__entity_type: "gauze__ytitne",
					gauze__whitelist__entity_id: base_whitelist.gauze__whitelist__entity_id,
					gauze__whitelist__method: "read",
				},
				count: {
					gauze__whitelist__id: randomUUID(),
					gauze__whitelist__realm: "system",
					gauze__whitelist__agent_type: "gauze__agent_user",
					gauze__whitelist__agent_role: "root",
					gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000001",
					gauze__whitelist__entity_type: "gauze__ytitne",
					gauze__whitelist__entity_id: base_whitelist.gauze__whitelist__entity_id,
					gauze__whitelist__method: "count",
				},
			});
			assert.equal(environment.errors, undefined);

			const original = await execute_request(database_manager, SYSTEM_SCHEMA, { agent }, create_operation, "CreateWhitelist", {
				whitelist: {
					...base_whitelist,
					gauze__whitelist__id: randomUUID(),
					gauze__whitelist__method: "read",
				},
			});
			assert.equal(original.errors, undefined);

			const duplicate = await execute_request(database_manager, SYSTEM_SCHEMA, { agent }, create_operation, "CreateWhitelist", {
				whitelist: {
					...base_whitelist,
					gauze__whitelist__id: randomUUID(),
					gauze__whitelist__method: "read",
				},
			});
			assert.equal(duplicate.errors.length, 1);

			const legitimate_id = randomUUID();
			const legitimate = await execute_request(database_manager, SYSTEM_SCHEMA, { agent }, create_operation, "CreateWhitelist", {
				whitelist: {
					...base_whitelist,
					gauze__whitelist__id: legitimate_id,
					gauze__whitelist__method: "count",
				},
			});
			assert.equal(legitimate.errors, undefined);
			assert.equal(legitimate.data.create_whitelist[0].attributes.gauze__whitelist__id, legitimate_id);

			const subsequent = await execute_request(database_manager, SYSTEM_SCHEMA, { agent }, read_operation, "ReadWhitelist", {
				where: {
					gauze__whitelist__id: legitimate_id,
				},
			});
			assert.equal(subsequent.errors, undefined);
			assert.equal(subsequent.data.read_whitelist[0].attributes.gauze__whitelist__id, legitimate_id);
		} finally {
			await database_manager.destroy_connections();
		}
	});
});
