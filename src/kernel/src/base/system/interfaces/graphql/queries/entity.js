import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

import { cd637bc32c364580be5cc28396d3dee8_CONTROLLER_SYSTEM } from "./../../../controllers/a2b8dbc3427b41a9899e11671c2422c7.js";

const cd637bc32c364580be5cc28396d3dee8_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.a2b8dbc3427b41a9899e11671c2422c7.system.graphql.TYPE__GRAPHQL__SYSTEM__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	sql_primary_key: $structure.a2b8dbc3427b41a9899e11671c2422c7.abstract.PRIMARY_KEY__ABSTRACT__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const cd637bc32c364580be5cc28396d3dee8_ATTRIBUTES_QUERY_INTERFACE_SYSTEM = new GraphQLInputObjectType({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query__Attributes",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Query Attributes",
	fields: $structure.a2b8dbc3427b41a9899e11671c2422c7.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const cd637bc32c364580be5cc28396d3dee8_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM = new GraphQLInputObjectType({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query__Attributes_Array",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Query Attributes Array",
	fields: $structure.a2b8dbc3427b41a9899e11671c2422c7.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const READ__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new GraphQLList($structure.a2b8dbc3427b41a9899e11671c2422c7.system.graphql.QUERY__GRAPHQL__SYSTEM__cd637bc32c364580be5cc28396d3dee8__STRUCTURE),
	args: {
		where: {
			description: "where",
			type: cd637bc32c364580be5cc28396d3dee8_ATTRIBUTES_QUERY_INTERFACE_SYSTEM,
		},
		where_in: {
			description: "where in",
			type: cd637bc32c364580be5cc28396d3dee8_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: cd637bc32c364580be5cc28396d3dee8_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM,
		},
		limit: {
			description: "limit",
			type: GraphQLInt,
		},
		offset: {
			description: "offset",
			type: GraphQLInt,
		},
		order: {
			description: "order",
			type: GraphQLString,
		},
		order_direction: {
			description: "order direction",
			type: GraphQLString,
		},
		order_nulls: {
			description: "order nulls",
			type: GraphQLString,
		},
	},
	resolve: (_source, query_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"_source",
			_source,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		return cd637bc32c364580be5cc28396d3dee8_CONTROLLER_SYSTEM
			.read(
				{
					source: _source,
					database: context.database,
					transaction: context.transaction,
				},
				query_arguments,
			)
			.then(function (data) {
				$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
					"1",
					__RELATIVE_FILEPATH,
					"READ__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success",
					"data",
					data,
				);
				return data.map(cd637bc32c364580be5cc28396d3dee8_SERIALIZER.serialize);
			});
	},
};

export { READ__cd637bc32c364580be5cc28396d3dee8__QUERY__GRAPHQL__INTERFACE__SYSTEM };
