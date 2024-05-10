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

const PARENT__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query__Parent",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Parent",
	fields: () => $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.graphql.METADATA_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
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

const READ__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.graphql.QUERY__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	),
	args: {
		parent: {
			description: "parent",
			type: PARENT__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: ATTRIBUTES__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: ATTRIBUTES_ARRAY__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: ATTRIBUTES_STRING__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: ATTRIBUTES_ARRAY__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: ATTRIBUTES_STRING__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"_source",
			_source,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		return CONTROLLER__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__DATABASE.read(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
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

export { READ__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__DATABASE };
