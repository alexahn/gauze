import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__RELATIONSHIP__CONTROLLER__DATABASE } from "./../../../controllers/relationship.js";

const SERIALIZER__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	sql_primary_key: $structure.entities.relationship.database.sql.PRIMARY_KEY__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const SOURCE__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Query__Source",
	description: "Relationship Source",
	fields: () => $structure.entities.relationship.database.graphql.SOURCE_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const ATTRIBUTES__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Query__Attributes",
	description: "Relationship Query Attributes",
	fields: $structure.entities.relationship.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const ATTRIBUTES_ARRAY__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Query__Attributes_Array",
	description: "Relationship Query Attributes Array",
	fields: $structure.entities.relationship.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const ATTRIBUTES_STRING__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Query__Attributes_String",
	description: "Relationship Query Attributes String",
	fields: $structure.entities.relationship.database.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const WHERE__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Query__Where",
	description: "Relationship Query Where",
	fields: $structure.entities.relationship.database.graphql.WHERE_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const WHERE_ARRAY__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Query__Where_Array",
	description: "Relationship Query Where Array",
	fields: $structure.entities.relationship.database.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const WHERE_STRING__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Query__Where_String",
	description: "Relationship Query Where String",
	fields: $structure.entities.relationship.database.graphql.WHERE_FIELDS_STRING__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.relationship.database.graphql.QUERY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_like: {
			description: "where like",
			type: WHERE__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		if (!query_arguments.where && !query_arguments.where_in && !query_arguments.where_not_in) {
			throw new Error("Field 'where' is required or field 'where_in' is required or field 'where_not_in' is required");
		}
		return CONTROLLER__RELATIONSHIP__CONTROLLER__DATABASE.read(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const COUNT__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		count: {
			description: "count",
			type: WHERE_STRING__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_like: {
			description: "where like",
			type: WHERE__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	resolve: (source, query_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		if (!query_arguments.where && !query_arguments.where_in && !query_arguments.where_not_in) {
			throw new Error("Field 'where' is required or field 'where_in' is required or field 'where_not_in' is required");
		}
		return CONTROLLER__RELATIONSHIP__CONTROLLER__DATABASE.count(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "COUNT__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data;
		});
	},
};

export { READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE };
