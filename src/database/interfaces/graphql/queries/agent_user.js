import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__AGENT_USER__CONTROLLER__DATABASE } from "./../../../controllers/agent_user.js";

const SERIALIZER__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.agent_user.database.graphql.TYPE__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
	sql_primary_key: $structure.entities.agent_user.database.sql.PRIMARY_KEY__SQL__DATABASE__AGENT_USER__STRUCTURE,
});

const PARENT__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_User_Query__Parent",
	description: "Agent_User Parent",
	fields: () => $structure.entities.agent_user.database.graphql.METADATA_FIELDS__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
});

const ATTRIBUTES__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_User_Query__Attributes",
	description: "Agent_User Query Attributes",
	fields: $structure.entities.agent_user.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
});

const ATTRIBUTES_ARRAY__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_User_Query__Attributes_Array",
	description: "Agent_User Query Attributes Array",
	fields: $structure.entities.agent_user.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
});

const ATTRIBUTES_STRING__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_User_Query__Attributes_String",
	description: "Agent_User Query Attributes String",
	fields: $structure.entities.agent_user.database.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
});

const READ__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.agent_user.database.graphql.QUERY__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: ATTRIBUTES__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: ATTRIBUTES_ARRAY__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: ATTRIBUTES_STRING__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: ATTRIBUTES_ARRAY__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: ATTRIBUTES_STRING__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		limit: {
			description: "limit",
			type: $abstract.gauze.types.graphql.INT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		offset: {
			description: "offset",
			type: $abstract.gauze.types.graphql.INT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		order: {
			description: "order",
			type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		order_direction: {
			description: "order direction",
			type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		order_nulls: {
			description: "order nulls",
			type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
	},
	resolve: (_source, query_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		if (!query_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__AGENT_USER__CONTROLLER__DATABASE.read(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const COUNT__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		count: {
			description: "count",
			type: ATTRIBUTES_STRING__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: ATTRIBUTES__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: ATTRIBUTES_ARRAY__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: ATTRIBUTES_STRING__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: ATTRIBUTES_ARRAY__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: ATTRIBUTES_STRING__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	resolve: (_source, query_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		if (!query_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__AGENT_USER__CONTROLLER__DATABASE.count(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "COUNT__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data;
		});
	},
};
export { READ__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE };
