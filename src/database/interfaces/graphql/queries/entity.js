import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__ENTITY__CONTROLLER__DATABASE } from "./../../../controllers/entity.js";

const SERIALIZER__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.entity.database.graphql.TYPE__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
	sql_primary_key: $structure.entities.entity.database.sql.PRIMARY_KEY__SQL__DATABASE__ENTITY__STRUCTURE,
});

const PARENT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Parent",
	description: "Entity Parent",
	fields: () => $structure.entities.entity.database.graphql.METADATA_FIELDS__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
});

const ATTRIBUTES__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Attributes",
	description: "Entity Query Attributes",
	fields: $structure.entities.entity.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
});

const ATTRIBUTES_ARRAY__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Attributes_Array",
	description: "Entity Query Attributes Array",
	fields: $structure.entities.entity.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
});

const ATTRIBUTES_STRING__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Attributes_String",
	description: "Entity Query Attributes String",
	fields: $structure.entities.entity.database.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
});

const READ__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.entity.database.graphql.QUERY__GRAPHQL__DATABASE__ENTITY__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: ATTRIBUTES__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: ATTRIBUTES_ARRAY__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: ATTRIBUTES_STRING__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: ATTRIBUTES_ARRAY__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: ATTRIBUTES_STRING__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "query_arguments", query_arguments);
		return CONTROLLER__ENTITY__CONTROLLER__DATABASE.read(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
				operation: context.operation,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const COUNT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		count: {
			description: "count",
			type: ATTRIBUTES_STRING__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: ATTRIBUTES__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: ATTRIBUTES_ARRAY__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: ATTRIBUTES_STRING__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: ATTRIBUTES_ARRAY__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: ATTRIBUTES_STRING__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	resolve: (_source, query_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "query_arguments", query_arguments);
		return CONTROLLER__ENTITY__CONTROLLER__DATABASE.count(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
				operation: context.operation,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "COUNT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data;
		});
	},
};
export { READ__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE };
