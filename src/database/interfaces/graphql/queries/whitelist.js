import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__WHITELIST__CONTROLLER__DATABASE } from "./../../../controllers/whitelist.js";

const SERIALIZER__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.whitelist.database.graphql.TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	sql_primary_key: $structure.entities.whitelist.database.sql.PRIMARY_KEY__SQL__DATABASE__WHITELIST__STRUCTURE,
});

const SOURCE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Source",
	description: "Whitelist Source",
	fields: () => $structure.entities.whitelist.database.graphql.SOURCE_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const ATTRIBUTES__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Attributes",
	description: "Whitelist Query Attributes",
	fields: $structure.entities.whitelist.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const ATTRIBUTES_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Attributes_Array",
	description: "Whitelist Query Attributes Array",
	fields: $structure.entities.whitelist.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const ATTRIBUTES_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Attributes_String",
	description: "Whitelist Query Attributes String",
	fields: $structure.entities.whitelist.database.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const WHERE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Where",
	description: "Whitelist Query Where",
	fields: $structure.entities.whitelist.database.graphql.WHERE_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Where_Array",
	description: "Whitelist Query Where Array",
	fields: $structure.entities.whitelist.database.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const WHERE_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Where_String",
	description: "Whitelist Query Where String",
	fields: $structure.entities.whitelist.database.graphql.WHERE_FIELDS_STRING__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.whitelist.database.graphql.QUERY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		if (!query_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__WHITELIST__CONTROLLER__DATABASE.read(
			{
				source: source,
				database: context.database,
				transaction: context.transaction,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(function (record) {
				return SERIALIZER__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.serialize(source, record);
			});
		});
	},
};

const COUNT__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		count: {
			description: "count",
			type: WHERE_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	resolve: (source, query_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		if (!query_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__WHITELIST__CONTROLLER__DATABASE.count(
			{
				source: source,
				database: context.database,
				transaction: context.transaction,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "COUNT__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data;
		});
	},
};

export { READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE };
