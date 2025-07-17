import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__DATABASE } from "./../../../controllers/a2b8dbc3427b41a9899e11671c2422c7.js";

const SERIALIZER__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.graphql.TYPE__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	sql_primary_key: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.sql.PRIMARY_KEY__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const SOURCE__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query__Source",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Source",
	fields: () => $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.graphql.SOURCE_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const ATTRIBUTES__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query__Attributes",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Query Attributes",
	fields: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const ATTRIBUTES_ARRAY__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query__Attributes_Array",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Query Attributes Array",
	fields: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const ATTRIBUTES_STRING__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query__Attributes_String",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Query Attributes String",
	fields: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const WHERE__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query__Where",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Query Where",
	fields: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.graphql.WHERE_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const WHERE_ARRAY__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query__Where_Array",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Query Where Array",
	fields: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const WHERE_STRING__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query__Where_String",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Query Where String",
	fields: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.graphql.WHERE_FIELDS_STRING__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const READ__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.graphql.QUERY__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	),
	args: {
		source: {
			description: "source",
			type: SOURCE__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_like: {
			description: "where like",
			type: WHERE__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
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
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"source",
			source,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		if (!query_arguments.where && !query_arguments.where_in && !query_arguments.where_not_in && !query_arguments.where_like && !query_arguments.where_between) {
			throw new Error(
				"Field 'where' is required or field 'where_in' is required or field 'where_not_in' is required or field 'where_like' is required or field 'where_between' is required",
			);
		}
		return CONTROLLER__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__DATABASE.read(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
				"1",
				__RELATIVE_FILEPATH,
				"READ__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success",
				"data",
				data,
			);
			return data.map(SERIALIZER__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const COUNT__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		count: {
			description: "count",
			type: WHERE_STRING__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_like: {
			description: "where like",
			type: WHERE__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	resolve: (source, query_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"source",
			source,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		if (!query_arguments.where && !query_arguments.where_in && !query_arguments.where_not_in && !query_arguments.where_like && !query_arguments.where_between) {
			throw new Error(
				"Field 'where' is required or field 'where_in' is required or field 'where_not_in' is required or field 'where_like' is required or field 'where_between' is required",
			);
		}
		return CONTROLLER__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__DATABASE.count(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
				"1",
				__RELATIVE_FILEPATH,
				"COUNT__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success",
				"data",
				data,
			);
			return data;
		});
	},
};

export { READ__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE };
