import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

import { ENTITY1_CONTROLLER_SYSTEM } from "./../../../controllers/entity1.js";

const ENTITY1_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.entity1.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	sql_primary_key: $structure.entity1.database.sql.PRIMARY_KEY__SQL__DATABASE__ENTITY1__STRUCTURE,
});

const ENTITY1_ATTRIBUTES_QUERY_INTERFACE_SYSTEM = new GraphQLInputObjectType({
	name: "Entity1_Query__Attributes",
	description: "Entity1 Query Attributes",
	fields: $structure.entity1.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
});

const ENTITY1_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM = new GraphQLInputObjectType({
	name: "Entity1_Query__Attributes_Array",
	description: "Entity1 Query Attributes Array",
	fields: $structure.entity1.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
});

const READ__ENTITY1__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new GraphQLList($structure.entity1.system.graphql.QUERY__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE),
	args: {
		where: {
			description: "where",
			type: ENTITY1_ATTRIBUTES_QUERY_INTERFACE_SYSTEM,
		},
		where_in: {
			description: "where in",
			type: ENTITY1_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: ENTITY1_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__ENTITY1__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__ENTITY1__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "query_arguments", query_arguments);
		return ENTITY1_CONTROLLER_SYSTEM.read(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__ENTITY1__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(ENTITY1_SERIALIZER.serialize);
		});
	},
};

export { READ__ENTITY1__QUERY__GRAPHQL__INTERFACE__SYSTEM };
