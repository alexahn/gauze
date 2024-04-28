import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class EzuagSystemModel extends $kernel.models.system.GraphQLOperationSystemModel {
	constructor(root_config, parent_config, config) {
		super(root_config, parent_config);
		this.entity = $abstract.entities.ezuag.default($abstract);
	}
	create(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.ezuag.CREATE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ezuag.CREATE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		// check abstract entity method privacy
		if (this.entity.methods["create"].privacy === "public") {
			return this.execute(context, operation, input).then(function (data) {
				return data.data.create_ezuag.map(function (row) {
					return row.attributes;
				});
			});
		} else {
			return Promise.reject(new Error("Agent does not have access to this method"));
		}
		/*
		return this.execute(context, operation, input).then(function (data) {
			return data.data.create_ezuag.map(function (row) {
				return row.attributes;
			});
		});
		*/
	}
	read(context, input) {
		const self = this;
		const { source, database, transaction } = context;
		const operation = {
			operation: $database.interfaces.graphql.operations.ezuag.READ__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ezuag.READ_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		// check abstract entity method privacy
		// check whitelist if privacy is private, proceed with a list of entities the agent has access to
		// check blacklist if privacy is public, proceed with a list of entities the agent does not have access to
		// if privacy is private, then stitch together the where in by doing an intersection
		// if privacy is public, then stitch together the where not in by doing a union
		// (realm, agent_id, entity_type)
		/*
		if (this.entity.methods["create"].privacy === "private") {
			// note: tempted to construct a graphql query here to get the access list, but i think it would severely impact performance for large results
			return self.read_whitelist(context, {
				entity_type: $structure.ezuag.database.sql.TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE,
				agent_id: "1"
			}).then(function (valid_ids) {
				// construct a where in array
				// make a key and store the array in lru cache
				// send the key into the query as cached_where_in
				// replace input.where_in for now, but do intersection logic in the future
				input.where_in = {
					id: valid_ids
				}
				return this.execute(context, operation, input).then(function (data) {
					return data.data.read_ezuag.map(function (row) {
						return row.attributes;
					});
				});
			})
		} else if (this.entity.methods["create"].public === "public") {
			return self.read_blacklist(context, {
				entity_type: $structure.ezuag.database.sql.TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE,
				agent_id: "1"
			}).then(function (invalid_ids) {
				input.where_not_in = {
					id: valid_ids
				}
				return this.execute(context, operation, input).then(function (data) {
					return data.data.read_ezuag.map(function (row) {
						return row.attributes;
					});
				});
			})
		} else {
			return Promise.reject(new Error("Privacy policy does not exist for this method"))
		}
		*/
		return this.execute(context, operation, input).then(function (data) {
			return data.data.read_ezuag.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.ezuag.UPDATE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ezuag.UPDATE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.update_ezuag.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.ezuag.DELETE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ezuag.DELETE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.delete_ezuag.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const EZUAG_MODEL_SYSTEM_ROOT_CONFIG = $abstract.entities.ezuag.default($abstract);
const EZUAG_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
};
const EZUAG_MODEL_SYSTEM_CONFIG = {};
const EZUAG_MODEL_SYSTEM = new EzuagSystemModel(EZUAG_MODEL_SYSTEM_ROOT_CONFIG, EZUAG_MODEL_SYSTEM_PARENT_CONFIG, EZUAG_MODEL_SYSTEM_CONFIG);

export { EZUAG_MODEL_SYSTEM };
