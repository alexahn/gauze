import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__SECRET__CONTROLLER__SYSTEM } from "./../../../controllers/secret.js";

const SERIALIZER__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.secret.system.graphql.TYPE__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
	sql_primary_key: $structure.entities.secret.database.sql.PRIMARY_KEY__SQL__DATABASE__SECRET__STRUCTURE,
});

const PARENT__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Query__Parent",
	description: "Secret Parent",
	fields: () => $structure.entities.secret.system.graphql.METADATA_FIELDS__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
});

const ATTRIBUTES__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Query__Attributes",
	description: "Secret Query Attributes",
	fields: $structure.entities.secret.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
});

const ATTRIBUTES_ARRAY__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Query__Attributes_Array",
	description: "Secret Query Attributes Array",
	fields: $structure.entities.secret.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
});

const ATTRIBUTES_STRING__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Query__Attributes_String",
	description: "Secret Query Attributes String",
	fields: $structure.entities.secret.system.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
});

const WHERE__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Query__Where",
	description: "Secret Query Where",
	fields: $structure.entities.secret.system.graphql.WHERE_FIELDS__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
});

const WHERE_ARRAY__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Query__Where_Array",
	description: "Secret Query Where Array",
	fields: $structure.entities.secret.system.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
});

const WHERE_STRING__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Query__Where_String",
	description: "Secret Query Where String",
	fields: $structure.entities.secret.system.graphql.WHERE_FIELDS_STRING__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
});

const READ__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.secret.system.graphql.QUERY__GRAPHQL__SYSTEM__SECRET__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "query_arguments", query_arguments);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "access:agent_id", context.agent_id);
		return CONTROLLER__SECRET__CONTROLLER__SYSTEM.read(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const COUNT__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		count: {
			description: "count",
			type: WHERE_STRING__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	resolve: (_source, query_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "query_arguments", query_arguments);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "access:agent_id", context.agent_id);
		return CONTROLLER__SECRET__CONTROLLER__SYSTEM.count(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "COUNT__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data;
		});
	},
};
export { READ__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM, COUNT__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM };
