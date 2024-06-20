import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__GAUZE__CONTROLLER__DATABASE } from "./../../../controllers/gauze.js";

const SERIALIZER__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.gauze.database.graphql.TYPE__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	sql_primary_key: $structure.entities.gauze.database.sql.PRIMARY_KEY__SQL__DATABASE__GAUZE__STRUCTURE,
});

const SOURCE__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Query__Source",
	description: "Gauze Source",
	fields: () => $structure.entities.gauze.database.graphql.SOURCE_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const ATTRIBUTES__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Query__Attributes",
	description: "Gauze Query Attributes",
	fields: $structure.entities.gauze.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const ATTRIBUTES_ARRAY__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Query__Attributes_Array",
	description: "Gauze Query Attributes Array",
	fields: $structure.entities.gauze.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const ATTRIBUTES_STRING__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Query__Attributes_String",
	description: "Gauze Query Attributes String",
	fields: $structure.entities.gauze.database.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const WHERE__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Query__Where",
	description: "Gauze Query Where",
	fields: $structure.entities.gauze.database.graphql.WHERE_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const WHERE_ARRAY__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Query__Where_Array",
	description: "Gauze Query Where Array",
	fields: $structure.entities.gauze.database.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const WHERE_STRING__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Query__Where_String",
	description: "Gauze Query Where String",
	fields: $structure.entities.gauze.database.graphql.WHERE_FIELDS_STRING__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const READ__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.gauze.database.graphql.QUERY__GRAPHQL__DATABASE__GAUZE__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_like: {
			description: "where like",
			type: WHERE__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "query_arguments", query_arguments);
		if (!query_arguments.where && !query_arguments.where_in && !query_arguments.where_not_in && !query_arguments.where_like && !query_arguments.where_between) {
			throw new Error(
				"Field 'where' is required or field 'where_in' is required or field 'where_not_in' is required or field 'where_like' is required or field 'where_between' is required",
			);
		}
		return CONTROLLER__GAUZE__CONTROLLER__DATABASE.read(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const COUNT__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		count: {
			description: "count",
			type: WHERE_STRING__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_like: {
			description: "where like",
			type: WHERE__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	resolve: (source, query_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "query_arguments", query_arguments);
		if (!query_arguments.where && !query_arguments.where_in && !query_arguments.where_not_in && !query_arguments.where_like && !query_arguments.where_between) {
			throw new Error(
				"Field 'where' is required or field 'where_in' is required or field 'where_not_in' is required or field 'where_like' is required or field 'where_between' is required",
			);
		}
		return CONTROLLER__GAUZE__CONTROLLER__DATABASE.count(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "COUNT__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data;
		});
	},
};

export { READ__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE };
