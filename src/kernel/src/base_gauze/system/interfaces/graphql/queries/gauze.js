import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

import { caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_SYSTEM } from "./../../../controllers/a543731262804f64adcc0eae1a225acc.js";

const caf5342ac38d41a6a02bb81d2d2b21a4_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.a543731262804f64adcc0eae1a225acc.system.graphql.TYPE__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	sql_primary_key: $structure.a543731262804f64adcc0eae1a225acc.abstract.PRIMARY_KEY__ABSTRACT__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const caf5342ac38d41a6a02bb81d2d2b21a4_ATTRIBUTES_QUERY_INTERFACE_SYSTEM = new GraphQLInputObjectType({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Query__Attributes",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Query Attributes",
	fields: $structure.a543731262804f64adcc0eae1a225acc.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const caf5342ac38d41a6a02bb81d2d2b21a4_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM = new GraphQLInputObjectType({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Query__Attributes_Array",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Query Attributes Array",
	fields: $structure.a543731262804f64adcc0eae1a225acc.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const READ__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new GraphQLList($structure.a543731262804f64adcc0eae1a225acc.system.graphql.QUERY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE),
	args: {
		where: {
			description: "where",
			type: caf5342ac38d41a6a02bb81d2d2b21a4_ATTRIBUTES_QUERY_INTERFACE_SYSTEM,
		},
		where_in: {
			description: "where in",
			type: caf5342ac38d41a6a02bb81d2d2b21a4_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: caf5342ac38d41a6a02bb81d2d2b21a4_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM,
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
			"READ__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"_source",
			_source,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		return caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_SYSTEM
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
					"READ__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success",
					"data",
					data,
				);
				return data.map(caf5342ac38d41a6a02bb81d2d2b21a4_SERIALIZER.serialize);
			});
	},
};

export { READ__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM };
