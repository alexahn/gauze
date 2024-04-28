import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $structure from "./../../structure/index.js";

import { Model } from "./class.js";

import { LOGGER__IO__LOGGER__KERNEL } from "./../logger/io.js";

import { EXECUTE__GRAPHQL__SHELL__KERNEL } from "./../shell/graphql.js";

class SystemModel extends Model {
	constructor(config, graphql_config) {
		super(config);
		// from graphql begin
		if (graphql_config) {
			const { schema, schema_name } = graphql_config;
			this.schema = schema;
		}
		// from graphql end
		if ($structure.whitelist) {
			this.whitelist_table = $structure.whitelist.database.sql.TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE;
		} else {
			LOGGER__IO__LOGGER__KERNEL.write("5", __RELATIVE_FILEPATH, `${this.name}.constructor:WARNING`, new Error("Whitelist structure not found"));
		}
		if ($structure.blacklist) {
			this.blacklist_table = $structure.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE;
		} else {
			LOGGER__IO__LOGGER__KERNEL.write("5", __RELATIVE_FILEPATH, `${this.name}.constructor:WARNING`, new Error("Blacklist structure not found"));
		}
		this.name = this.__name();
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
	}
	__name() {
		return this.constructor.name;
	}
	// should return a list of ids
	read_whitelist(context, input) {
		const self = this;
		const { database, transaction } = context;
		const { entity_type, agent_id } = input;
		const sql = database(self.whitelist_table)
			.where({
				gauze__whitelist__realm: "system",
				gauze__whitelist__agent_id: agent_id,
				gauze__whitelist__entity_type: entity_type,
			})
			.limit(4294967296)
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.create:debug_sql`, sql.toString());
		}
		return sql.then(function (rows) {
			return rows.map(function (row) {
				return row.gauze__whitelist__entity_id;
			});
		});
	}
	// should return a list of ids
	read_blacklist(context, input) {
		const self = this;
		const { database, transaction } = context;
		const { entity_type, agent_id } = input;
		const sql = database(self.blacklist_table)
			.where({
				gauze__blacklist__realm: "system",
				gauze__blacklist__agent_id: agent_id,
				gauze__blacklist__entity_type: entity_type,
			})
			.limit(4294967296)
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.create:debug_sql`, sql.toString());
		}
		return sql.then(function (rows) {
			return rows.map(function (row) {
				return row.gauze__blacklist__entity_id;
			});
		});
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
	_access_execute(context, input, access, operation) {
		const self = this;
		const { source, database, transaction } = context;
		if (self.entity.methods["read"].privacy === "private") {
			// note: tempted to construct a graphql query here to get the access list, but i think it would severely impact performance for large results
			return self.read_whitelist(context, access).then(function (valid_ids) {
				console.log("VALID_IDS", valid_ids);
				// construct a where in array
				// make a key and store the array in lru cache
				// send the key into the query as cached_where_in
				// replace input.where_in for now, but do intersection logic in the future
				input.where_in = {
					[self.entity.primary_key]: valid_ids,
				};
				return self.execute(context, operation, input);
			});
		} else if (this.entity.methods["read"].privacy === "public") {
			return self.read_blacklist(context, access).then(function (invalid_ids) {
				console.log("INVALID_IDS", invalid_ids);
				input.where_not_in = {
					[self.entity.primary_key]: invalid_ids,
				};
				return self.execute(context, operation, input);
			});
		} else {
			return Promise.reject(new Error("Privacy policy does not exist for this method"));
		}
	}
	_create(context, input, access, operation) {
		const self = this;
		// todo: set primary key if not set
		if (self.entity.methods["create"].privacy === "public") {
			return self.execute(context, operation, input);
		} else {
			return Promise.reject(new Error("Agent does not have access to this method"));
		}
	}
	_read(context, input, access, operation) {
		const self = this;
		return self._access_execute(context, input, access, operation);
	}
	_update(context, input, access, operation) {
		const self = this;
		return self._access_execute(context, input, access, operation);
	}
	_delete(context, input, access, operation) {
		const self = this;
		return self._access_execute(context, input, access, operation);
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
