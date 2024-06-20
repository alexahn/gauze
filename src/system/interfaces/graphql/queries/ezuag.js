import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__EZUAG__CONTROLLER__SYSTEM } from "./../../../controllers/ezuag.js";

const SERIALIZER__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.ezuag.system.graphql.TYPE__GRAPHQL__SYSTEM__EZUAG__STRUCTURE,
	sql_primary_key: $structure.entities.ezuag.database.sql.PRIMARY_KEY__SQL__DATABASE__EZUAG__STRUCTURE,
});

const SOURCE__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag_Query__Source",
	description: "Ezuag Source",
	fields: () => $structure.entities.ezuag.system.graphql.SOURCE_FIELDS__GRAPHQL__SYSTEM__EZUAG__STRUCTURE,
});

const ATTRIBUTES__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag_Query__Attributes",
	description: "Ezuag Query Attributes",
	fields: $structure.entities.ezuag.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__EZUAG__STRUCTURE,
});

const ATTRIBUTES_ARRAY__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag_Query__Attributes_Array",
	description: "Ezuag Query Attributes Array",
	fields: $structure.entities.ezuag.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__EZUAG__STRUCTURE,
});

const ATTRIBUTES_STRING__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag_Query__Attributes_String",
	description: "Ezuag Query Attributes String",
	fields: $structure.entities.ezuag.system.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__EZUAG__STRUCTURE,
});

const WHERE__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag_Query__Where",
	description: "Ezuag Query Where",
	fields: $structure.entities.ezuag.system.graphql.WHERE_FIELDS__GRAPHQL__SYSTEM__EZUAG__STRUCTURE,
});

const WHERE_ARRAY__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag_Query__Where_Array",
	description: "Ezuag Query Where Array",
	fields: $structure.entities.ezuag.system.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__EZUAG__STRUCTURE,
});

const WHERE_STRING__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag_Query__Where_String",
	description: "Ezuag Query Where String",
	fields: $structure.entities.ezuag.system.graphql.WHERE_FIELDS_STRING__GRAPHQL__SYSTEM__EZUAG__STRUCTURE,
});

const READ__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.ezuag.system.graphql.QUERY__GRAPHQL__SYSTEM__EZUAG__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_like: {
			description: "where like",
			type: WHERE__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM,
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
	resolve: (source, query_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "query_arguments", query_arguments);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "access:agent_id", context.agent_id);
		return CONTROLLER__EZUAG__CONTROLLER__SYSTEM.read(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const COUNT__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		count: {
			description: "count",
			type: WHERE_STRING__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_like: {
			description: "where like",
			type: WHERE__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	resolve: (source, query_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "query_arguments", query_arguments);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "access:agent_id", context.agent_id);
		return CONTROLLER__EZUAG__CONTROLLER__SYSTEM.count(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "COUNT__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data;
		});
	},
};
export { READ__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM, COUNT__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM };
