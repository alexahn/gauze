#!/usr/bin/env node

import { config as load_dotenv } from "dotenv";
import find_config from "find-config";
import { validate as validate_uuid, v4 as uuidv4 } from "uuid";

const USAGE = `Usage:
  node ./scripts/grant_ytitne_create_permission.js <agent_id> <agent_type> [--agent-role root|trunk|leaf] [--permission-id <uuid>] [--verbose]

Examples:
  node ./scripts/grant_ytitne_create_permission.js 00000000-0000-0000-0000-000000000001 gauze__agent_user
  npm run grant-ytitne-create -- 00000000-0000-0000-0000-000000000001 gauze__agent_user`;

function usage_error(message) {
	const err = new Error(message);
	err.show_usage = true;
	return err;
}

function parse_args(argv) {
	const args = {
		agent_role: "root",
	};
	const positionals = [];
	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];
		if (arg === "--help" || arg === "-h") {
			args.help = true;
		} else if (arg === "--agent-role") {
			index += 1;
			args.agent_role = argv[index];
		} else if (arg === "--permission-id") {
			index += 1;
			args.permission_id = argv[index];
		} else if (arg.startsWith("--agent-role=")) {
			args.agent_role = arg.slice("--agent-role=".length);
		} else if (arg.startsWith("--permission-id=")) {
			args.permission_id = arg.slice("--permission-id=".length);
		} else if (arg === "--verbose") {
			args.verbose = true;
		} else if (arg.startsWith("-")) {
			throw usage_error(`Unknown option: ${arg}`);
		} else {
			positionals.push(arg);
		}
	}
	args.agent_id = positionals[0];
	args.agent_type = positionals[1];
	if (positionals.length > 2) {
		throw usage_error(`Too many positional arguments: ${positionals.slice(2).join(" ")}`);
	}
	return args;
}

function validate_args(args) {
	const valid_roles = new Set(["root", "trunk", "leaf"]);
	if (!args.agent_id) {
		throw usage_error("Missing required argument: agent_id");
	}
	if (!validate_uuid(args.agent_id)) {
		throw usage_error(`agent_id must be a UUID: ${args.agent_id}`);
	}
	if (!args.agent_type) {
		throw usage_error("Missing required argument: agent_type");
	}
	if (!valid_roles.has(args.agent_role)) {
		throw usage_error(`agent_role must be one of: ${Array.from(valid_roles).join(", ")}`);
	}
	if (args.permission_id && !validate_uuid(args.permission_id)) {
		throw usage_error(`permission_id must be a UUID: ${args.permission_id}`);
	}
}

function load_environment(args) {
	const env_path = find_config(".env");
	if (env_path) {
		load_dotenv({
			path: env_path,
		});
	}
	if (!args.verbose) {
		process.env.LOG_LEVEL_MINIMUM = "4";
	}
	if (!process.env.GAUZE_ENV) {
		throw new Error("GAUZE_ENV is not set. Set it directly or provide a .env file before running this script.");
	}
}

function quiet_known_warnings(args) {
	if (args.verbose) {
		return function () {};
	}
	const original_log = console.log;
	const original_warn = console.warn;
	function should_skip(messages) {
		const message = messages.join(" ");
		return message.includes("sqlite does not support inserting default values");
	}
	console.log = function (...messages) {
		if (should_skip(messages)) {
			return;
		}
		return original_log.apply(console, messages);
	};
	console.warn = function (...messages) {
		if (should_skip(messages)) {
			return;
		}
		return original_warn.apply(console, messages);
	};
	return function () {
		console.log = original_log;
		console.warn = original_warn;
	};
}

function create_context(database_manager) {
	return {
		database_manager,
		transactions: {},
		breadth_count: 0,
		transaction_count: 0,
	};
}

function permission_where(args) {
	return {
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_id: args.agent_id,
		gauze__whitelist__agent_type: args.agent_type,
		gauze__whitelist__entity_type: "gauze__ytitne",
		gauze__whitelist__method: "create",
	};
}

function permission_record(args) {
	const now = new Date();
	return {
		gauze__whitelist__id: args.permission_id || uuidv4(),
		gauze__whitelist__created_at: now,
		gauze__whitelist__updated_at: now,
		gauze__whitelist__deleted_at: null,
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_role: args.agent_role,
		gauze__whitelist__agent_id: args.agent_id,
		gauze__whitelist__agent_type: args.agent_type,
		gauze__whitelist__entity_id: null,
		gauze__whitelist__entity_type: "gauze__ytitne",
		gauze__whitelist__method: "create",
	};
}

async function read_existing_permission(database_manager, args) {
	const context = create_context(database_manager);
	const model = {
		table_name: "gauze__whitelist",
		primary_key: "gauze__whitelist__id",
	};
	const where = permission_where(args);
	try {
		const shards = await database_manager.route_transactions(
			context,
			{},
			{
				where,
			},
			model,
			"read",
		);
		const rows = await Promise.all(
			shards.map(function (shard) {
				return shard.connection("gauze__whitelist").where(where).whereNull("gauze__whitelist__entity_id").limit(16).transacting(shard.transaction);
			}),
		);
		await database_manager.commit_context_transactions(context);
		return rows.flat();
	} catch (err) {
		await database_manager.rollback_context_transactions(context);
		throw err;
	}
}

async function create_permission(database_manager, args) {
	const context = create_context(database_manager);
	const model = {
		table_name: "gauze__whitelist",
		primary_key: "gauze__whitelist__id",
	};
	const record = permission_record(args);
	try {
		const shards = await database_manager.route_transactions(
			context,
			{},
			{
				attributes: record,
			},
			model,
			"write",
		);
		await Promise.all(
			shards.map(function (shard) {
				return shard.connection("gauze__whitelist").insert(record).transacting(shard.transaction);
			}),
		);
		await database_manager.commit_context_transactions(context);
		return {
			record,
			shards_written: shards.length,
		};
	} catch (err) {
		await database_manager.rollback_context_transactions(context);
		throw err;
	}
}

function validate_ytitne_agent_type($gauze, agent_type) {
	const ytitne = $gauze.abstract.entities.ytitne.default($gauze.abstract);
	const allowed_agent_types = ytitne.methods.create.allowed_agent_types;
	if (!allowed_agent_types.includes("*") && !allowed_agent_types.includes(agent_type)) {
		throw new Error(`agent_type ${agent_type} cannot create gauze__ytitne. Allowed agent types: ${allowed_agent_types.join(", ")}`);
	}
}

async function main() {
	const args = parse_args(process.argv.slice(2));
	if (args.help) {
		console.log(USAGE);
		return;
	}
	validate_args(args);
	load_environment(args);

	const restore_warnings = quiet_known_warnings(args);
	let database_manager;
	try {
		const $gauze = await import("./../src/index.js");
		database_manager = $gauze.database.manager.default;
		validate_ytitne_agent_type($gauze, args.agent_type);
		const existing = await read_existing_permission(database_manager, args);
		if (existing.length) {
			console.log(
				JSON.stringify(
					{
						status: "exists",
						permission: existing[0],
					},
					null,
					4,
				),
			);
			return;
		}
		const created = await create_permission(database_manager, args);
		console.log(
			JSON.stringify(
				{
					status: "created",
					shards_written: created.shards_written,
					permission: created.record,
				},
				null,
				4,
			),
		);
	} finally {
		if (database_manager) {
			await database_manager.destroy_connections();
		}
		restore_warnings();
	}
}

main().catch(function (err) {
	console.error(err.message);
	if (err.show_usage) {
		console.error("");
		console.error(USAGE);
	}
	process.exitCode = 1;
});
