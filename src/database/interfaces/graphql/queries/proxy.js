import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__PROXY__CONTROLLER__DATABASE } from "./../../../controllers/proxy.js";

const SERIALIZER__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.proxy.database.graphql.TYPE__GRAPHQL__DATABASE__PROXY__STRUCTURE,
	sql_primary_key: $structure.entities.proxy.database.sql.PRIMARY_KEY__SQL__DATABASE__PROXY__STRUCTURE,
});

const PARENT__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Proxy_Query__Parent",
	description: "Proxy Parent",
	fields: () => $structure.entities.proxy.database.graphql.METADATA_FIELDS__GRAPHQL__DATABASE__PROXY__STRUCTURE,
});

const ATTRIBUTES__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Proxy_Query__Attributes",
	description: "Proxy Query Attributes",
	fields: $structure.entities.proxy.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__PROXY__STRUCTURE,
});

const ATTRIBUTES_ARRAY__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Proxy_Query__Attributes_Array",
	description: "Proxy Query Attributes Array",
	fields: $structure.entities.proxy.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__PROXY__STRUCTURE,
});

const ATTRIBUTES_STRING__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Proxy_Query__Attributes_String",
	description: "Proxy Query Attributes String",
	fields: $structure.entities.proxy.database.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__PROXY__STRUCTURE,
});

const READ__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.proxy.database.graphql.QUERY__GRAPHQL__DATABASE__PROXY__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: ATTRIBUTES__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: ATTRIBUTES_ARRAY__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: ATTRIBUTES_STRING__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: ATTRIBUTES_ARRAY__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: ATTRIBUTES_STRING__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "query_arguments", query_arguments);
		return CONTROLLER__PROXY__CONTROLLER__DATABASE.read(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const COUNT__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		count: {
			description: "count",
			type: ATTRIBUTES_STRING__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: ATTRIBUTES__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: ATTRIBUTES_ARRAY__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: ATTRIBUTES_STRING__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: ATTRIBUTES_ARRAY__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: ATTRIBUTES_STRING__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	resolve: (_source, query_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "query_arguments", query_arguments);
		return CONTROLLER__PROXY__CONTROLLER__DATABASE.count(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "COUNT__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data;
		});
	},
};
export { READ__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE };
