import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInputObjectType, GraphQLInterfaceType } from "graphql";

import { 6d637bc32c364580be5cc28396d3dee8_CONTROLLER_SYSTEM } from "./../../../controllers/62b8dbc3427b41a9899e11671c2422c7.js";

const 6d637bc32c364580be5cc28396d3dee8_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.62b8dbc3427b41a9899e11671c2422c7.system.graphql.TYPE__GRAPHQL__SYSTEM__6d637bc32c364580be5cc28396d3dee8__STRUCTURE,
	sql_primary_key: $structure.62b8dbc3427b41a9899e11671c2422c7.abstract.PRIMARY_KEY__ABSTRACT__6d637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const 6d637bc32c364580be5cc28396d3dee8_MUTATION_ATTRIBUTES = new GraphQLInputObjectType({
	name: "ca381b0cc764c4c9a187b716ae94ed9_Mutation__Attributes",
	description: "ca381b0cc764c4c9a187b716ae94ed9 Mutation Attributes",
	fields: $structure.62b8dbc3427b41a9899e11671c2422c7.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__6d637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const CREATE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new GraphQLList($structure.62b8dbc3427b41a9899e11671c2422c7.system.graphql.MUTATION__GRAPHQL__SYSTEM__6d637bc32c364580be5cc28396d3dee8__STRUCTURE),
	args: {
		attributes: {
			description: "attributes",
			type: 6d637bc32c364580be5cc28396d3dee8_MUTATION_ATTRIBUTES,
		},
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "CREATE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return 6d637bc32c364580be5cc28396d3dee8_CONTROLLER_SYSTEM.create(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "CREATE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(6d637bc32c364580be5cc28396d3dee8_SERIALIZER.serialize);
		});
	},
};

const UPDATE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new GraphQLList($structure.62b8dbc3427b41a9899e11671c2422c7.system.graphql.MUTATION__GRAPHQL__SYSTEM__6d637bc32c364580be5cc28396d3dee8__STRUCTURE),
	args: {
		where: {
			description: "where",
			type: 6d637bc32c364580be5cc28396d3dee8_MUTATION_ATTRIBUTES,
		},
		attributes: {
			description: "attributes",
			type: 6d637bc32c364580be5cc28396d3dee8_MUTATION_ATTRIBUTES,
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
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "UPDATE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return 6d637bc32c364580be5cc28396d3dee8_CONTROLLER_SYSTEM.update(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "UPDATE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(6d637bc32c364580be5cc28396d3dee8_SERIALIZER.serialize);
		});
	},
};

const DELETE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new GraphQLList($structure.62b8dbc3427b41a9899e11671c2422c7.system.graphql.MUTATION__GRAPHQL__SYSTEM__6d637bc32c364580be5cc28396d3dee8__STRUCTURE),
	args: {
		where: {
			description: "where",
			type: 6d637bc32c364580be5cc28396d3dee8_MUTATION_ATTRIBUTES,
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
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "DELETE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return 6d637bc32c364580be5cc28396d3dee8_CONTROLLER_SYSTEM.delete(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "DELETE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(6d637bc32c364580be5cc28396d3dee8_SERIALIZER.serialize);
		});
	},
};

export { CREATE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM, UPDATE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM, DELETE__6d637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM };
