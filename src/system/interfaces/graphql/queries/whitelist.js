import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

import { WHITELIST_CONTROLLER_SYSTEM } from "./../../../controllers/whitelist.js";

const WHITELIST_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.whitelist.system.graphql.TYPE__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE,
	sql_primary_key: $structure.whitelist.database.sql.PRIMARY_KEY__SQL__DATABASE__WHITELIST__STRUCTURE,
});

const WHITELIST_ATTRIBUTES_QUERY_INTERFACE_SYSTEM = new GraphQLInputObjectType({
	name: "Whitelist_Query__Attributes",
	description: "Whitelist Query Attributes",
	fields: $structure.whitelist.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE,
});

const WHITELIST_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM = new GraphQLInputObjectType({
	name: "Whitelist_Query__Attributes_Array",
	description: "Whitelist Query Attributes Array",
	fields: $structure.whitelist.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE,
});

const READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new GraphQLList($structure.whitelist.system.graphql.QUERY__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE),
	args: {
		where: {
			description: "where",
			type: WHITELIST_ATTRIBUTES_QUERY_INTERFACE_SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHITELIST_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHITELIST_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "query_arguments", query_arguments);
		return WHITELIST_CONTROLLER_SYSTEM.read(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(WHITELIST_SERIALIZER.serialize);
		});
	},
};

export { READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM };
