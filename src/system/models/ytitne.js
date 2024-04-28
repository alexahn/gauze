import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class YtitneSystemModel extends $kernel.models.system.GraphQLOperationSystemModel {
	constructor(root_config, parent_config, config) {
		super(root_config, parent_config);
		this.entity = $abstract.entities.ytitne.default($abstract);
	}
	create(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.ytitne.CREATE__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ytitne.CREATE_NAME__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		// check abstract entity method privacy
		if (this.entity.methods["create"].privacy === "public") {
			return this.execute(context, operation, input).then(function (data) {
				return data.data.create_ytitne.map(function (row) {
					return row.attributes;
				});
			});
		} else {
			return Promise.reject(new Error("Agent does not have access to this method"));
		}
	}
	read(context, input) {
		const self = this;
		const { source, database, transaction } = context;
		const operation = {
			operation: $database.interfaces.graphql.operations.ytitne.READ__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ytitne.READ_NAME__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
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
				entity_type: $structure.ytitne.database.sql.TABLE_NAME__SQL__DATABASE__YTITNE__STRUCTURE,
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
					return data.data.read_ytitne.map(function (row) {
						return row.attributes;
					});
				});
			})
		} else if (this.entity.methods["create"].public === "public") {
			return self.read_blacklist(context, {
				entity_type: $structure.ytitne.database.sql.TABLE_NAME__SQL__DATABASE__YTITNE__STRUCTURE,
				agent_id: "1"
			}).then(function (invalid_ids) {
				input.where_not_in = {
					id: valid_ids
				}
				return this.execute(context, operation, input).then(function (data) {
					return data.data.read_ytitne.map(function (row) {
						return row.attributes;
					});
				});
			})
		} else {
			return Promise.reject(new Error("Privacy policy does not exist for this method"))
		}
		*/
		return this.execute(context, operation, input).then(function (data) {
			return data.data.read_ytitne.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.ytitne.UPDATE__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ytitne.UPDATE_NAME__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.update_ytitne.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.ytitne.DELETE__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ytitne.DELETE_NAME__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.delete_ytitne.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const YTITNE_MODEL_SYSTEM_ROOT_CONFIG = $abstract.entities.ytitne.default($abstract);
const YTITNE_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
};
const YTITNE_MODEL_SYSTEM_CONFIG = {};
const YTITNE_MODEL_SYSTEM = new YtitneSystemModel(YTITNE_MODEL_SYSTEM_ROOT_CONFIG, YTITNE_MODEL_SYSTEM_PARENT_CONFIG, YTITNE_MODEL_SYSTEM_CONFIG);

export { YTITNE_MODEL_SYSTEM };
