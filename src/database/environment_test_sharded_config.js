import path from "path";
import url from "url";

import * as $abstract from "./../abstract/index.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_MONOLITHIC_ENVIRONMENT = "test_monolithic";
const TEST_SHARDED_ENVIRONMENT = "test_sharded";
const DEVELOPMENT_MONOLITHIC_ENVIRONMENT = "development_monolithic";
const DEVELOPMENT_SHARDED_ENVIRONMENT = "development_sharded";
const STAGING_ENVIRONMENT = "staging";
const PRODUCTION_ENVIRONMENT = "production";

const relationship__table = $abstract.entities.relationship ? $abstract.entities.relationship.default($abstract).table_name : "undefined";
const whitelist__table = $abstract.entities.whitelist ? $abstract.entities.whitelist.default($abstract).table_name : "undefined";
const blacklist__table = $abstract.entities.blacklist ? $abstract.entities.blacklist.default($abstract).table_name : "undefined";
const proxy__table = $abstract.entities.proxy ? $abstract.entities.proxy.default($abstract).table_name : "undefined";
const secret__table = $abstract.entities.secret ? $abstract.entities.secret.default($abstract).table_name : "undefined";
const session__table = $abstract.entities.session ? $abstract.entities.session.default($abstract).table_name : "undefined";
const agent_root__table = $abstract.entities.agent_root ? $abstract.entities.agent_root.default($abstract).table_name : "undefined";
const agent_account__table = $abstract.entities.agent_account ? $abstract.entities.agent_account.default($abstract).table_name : "undefined";
const agent_user__table = $abstract.entities.agent_user ? $abstract.entities.agent_user.default($abstract).table_name : "undefined";
const agent_person__table = $abstract.entities.agent_person ? $abstract.entities.agent_person.default($abstract).table_name : "undefined";
const agent_character__table = $abstract.entities.agent_character ? $abstract.entities.agent_character.default($abstract).table_name : "undefined";
const ezuag__table = $abstract.entities.ezuag ? $abstract.entities.ezuag.default($abstract).table_name : "undefined";
const ytitne__table = $abstract.entities.ytitne ? $abstract.entities.ytitne.default($abstract).table_name : "undefined";
const entity__table = $abstract.entities.entity ? $abstract.entities.entity.default($abstract).table_name : "undefined";
const gauze__table = $abstract.entities.gauze ? $abstract.entities.gauze.default($abstract).table_name : "undefined";

const CONFIG__ENVIRONMENT = {
	[relationship__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${relationship__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
	[whitelist__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${whitelist__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
	[blacklist__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${blacklist__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
	[proxy__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${proxy__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
	[secret__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${secret__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
	[session__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${session__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
	[agent_root__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_root__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
	[agent_account__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_account__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
	[agent_user__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_user__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
	[agent_person__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_person__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
	[agent_character__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${agent_character__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
	[ezuag__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ezuag__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
	[ytitne__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${ytitne__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
	[entity__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${entity__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
	[gauze__table]: {
		previous: [],
		current: [
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.1`,
				start: 0n,
				end: 85070591730234615865843651857942052862n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.1.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.1.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.1.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.2`,
				start: 85070591730234615865843651857942052863n,
				end: 170141183460469231731687303715884105726n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.2.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.2.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.2.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.3`,
				start: 170141183460469231731687303715884105727n,
				end: 255211775190703847597530955573826158590n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.3.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.3.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.3.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
			{
				id: `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.4`,
				start: 255211775190703847597530955573826158591n,
				end: 340282366920938463463374607431768211455n,
				// read slaves
				read: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.4.read.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
				// write masters
				write: [
					{
						id: `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.4.write.1`,
						transaction_isolation_level: "serializable",
						config: {
							client: "better-sqlite3",
							connection: {
								filename: path.join(__dirname, "../../", `${TEST_SHARDED_ENVIRONMENT}.${gauze__table}.shard.4.sqlite3`),
							},
							migrations: {
								tableName: "knex_migrations",
								directory: path.join(__dirname, "migrations"),
							},
							seeds: {
								directory: path.join(__dirname, "seeds", "test"),
							},
							useNullAsDefault: true,
						},
					},
				],
			},
		],
		// empty for now
		next: [],
	},
};

export default CONFIG__ENVIRONMENT;
