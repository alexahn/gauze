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

const SOURCE__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Source",
	description: "Entity Source",
	fields: () => $structure.entities.entity.database.graphql.SOURCE_FIELDS__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
});

const ATTRIBUTES__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Attributes",
	description: "Entity Query Attributes",
	fields: $structure.entities.entity.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
});

const ATTRIBUTES_ARRAY__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Attributes_Array",
	description: "Entity Query Attributes Array",
	fields: $structure.entities.entity.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
});

const ATTRIBUTES_STRING__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Attributes_String",
	description: "Entity Query Attributes String",
	fields: $structure.entities.entity.database.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
});

const WHERE__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Where",
	description: "Entity Query Where",
	fields: $structure.entities.entity.database.graphql.WHERE_FIELDS__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
});

const WHERE_ARRAY__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Where_Array",
	description: "Entity Query Where Array",
	fields: $structure.entities.entity.database.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
});

const WHERE_STRING__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Where_String",
	description: "Entity Query Where String",
	fields: $structure.entities.entity.database.graphql.WHERE_FIELDS_STRING__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
});

const READ__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.entity.database.graphql.QUERY__GRAPHQL__DATABASE__ENTITY__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_like: {
			description: "where like",
			type: WHERE__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		limit: {
			description: "limit",
			type: $abstract.gauze.types.graphql.graphql.INT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		offset: {
			description: "offset",
			type: $abstract.gauze.types.graphql.graphql.INT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		order: {
			description: "order",
			type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		order_direction: {
			description: "order direction",
			type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		order_nulls: {
			description: "order nulls",
			type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
	},
	resolve: (source, query_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		if (!query_arguments.where && !query_arguments.where_in && !query_arguments.where_not_in && !query_arguments.where_like && !query_arguments.where_between) {
			throw new Error(
				"Field 'where' is required or field 'where_in' is required or field 'where_not_in' is required or field 'where_like' is required or field 'where_between' is required",
			);
		}
		return CONTROLLER__ENTITY__CONTROLLER__DATABASE.read(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const COUNT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		count: {
			description: "count",
			type: WHERE_STRING__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_like: {
			description: "where like",
			type: WHERE__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	resolve: (source, query_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		if (!query_arguments.where && !query_arguments.where_in && !query_arguments.where_not_in && !query_arguments.where_like && !query_arguments.where_between) {
			throw new Error(
				"Field 'where' is required or field 'where_in' is required or field 'where_not_in' is required or field 'where_like' is required or field 'where_between' is required",
			);
		}
		return CONTROLLER__ENTITY__CONTROLLER__DATABASE.count(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, "COUNT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data;
		});
	},
};

export { READ__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE };
