import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $structure from "./../../structure/index.js";

import { Model } from "./class.js";

import { LOGGER__IO__LOGGER__KERNEL } from "./../logger/io.js";

import { EXECUTE__GRAPHQL__SHELL__KERNEL } from "./../shell/graphql.js";

class SystemModel extends Model {
	constructor(config) {
		super(config);
		if ($structure.whitelist) {
			this.whitelist_table = $structure.whitelist.database.sql.TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE;
		} else {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("5", __RELATIVE_FILEPATH, `${this.name}.constructor:WARNING`, new Error("Whitelist structure not found"));
		}
		if ($structure.blacklist) {
			this.blacklist_table = $structure.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE;
		} else {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("5", __RELATIVE_FILEPATH, `${this.name}.constructor:WARNING`, new Error("Blacklist structure not found"));
		}
		this.name = this.__name();
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
	}
	__name() {
		return this.constructor.name;
	}
	// should return a list of ids
	read_whitelist(context, input) {
		const { database } = context;
		const { entity_type, agent_id } = input;
		const sql = database(self.whitelist_table)
			.where({
				realm: "system",
				agent_id: agent_id,
				entity_type: entity_type,
			})
			.limit(4294967296)
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.create:debug_sql`, sql.toString());
		}
		return sql.then(function (rows) {
			return rows.map(function (row) {
				return row.entity_id;
			});
		});
	}
	// should return a list of ids
	read_blacklist(context, input) {
		const { database } = context;
		const { entity_type, agent_id } = input;
		const sql = database(self.blacklist_table)
			.where({
				realm: "system",
				agent_id: agent_id,
				entity_type: entity_type,
			})
			.limit(4294967296)
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.create:debug_sql`, sql.toString());
		}
		return sql.then(function (rows) {
			return rows.map(function (row) {
				return row.entity_id;
			});
		});
	}
}

class GraphQLOperationSystemModel extends SystemModel {
	constructor(config, { schema, schema_name }) {
		super(config);
		this.schema = schema;
		this.name = this._name();
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
	}
	_name() {
		return this.constructor.name;
	}
	execute(context, { operation, operation_name }, operation_variables) {
		return EXECUTE__GRAPHQL__SHELL__KERNEL({
			schema: this.schema,
			context,
			operation,
			operation_name,
			operation_variables,
		}).then(function (data) {
			if (data.errors && data.errors.length) {
				// should we make a new error here?
				// todo: figure out if we need to log here or not
				console.log(data.errors);
				throw data.errors;
			} else {
				return Promise.resolve(data);
			}
		});
	}
}

export { SystemModel, GraphQLOperationSystemModel };
