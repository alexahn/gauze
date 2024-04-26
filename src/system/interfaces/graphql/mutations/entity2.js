import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInputObjectType, GraphQLInterfaceType } from "graphql";

import { ENTITY2_CONTROLLER_SYSTEM } from "./../../../controllers/entity2.js";

const ENTITY2_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.entity2.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE,
	sql_primary_key: $structure.entity2.database.sql.PRIMARY_KEY__SQL__DATABASE__ENTITY2__STRUCTURE,
});

const ENTITY2_MUTATION_ATTRIBUTES = new GraphQLInputObjectType({
	name: "Entity2_Mutation__Attributes",
	description: "Entity2 Mutation Attributes",
	fields: $structure.entity2.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE,
});

const CREATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new GraphQLList($structure.entity2.system.graphql.MUTATION__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE),
	args: {
		attributes: {
			description: "attributes",
			type: ENTITY2_MUTATION_ATTRIBUTES,
		},
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "CREATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return ENTITY2_CONTROLLER_SYSTEM.create(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "CREATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(ENTITY2_SERIALIZER.serialize);
		});
	},
};

const UPDATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new GraphQLList($structure.entity2.system.graphql.MUTATION__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE),
	args: {
		where: {
			description: "where",
			type: ENTITY2_MUTATION_ATTRIBUTES,
		},
		attributes: {
			description: "attributes",
			type: ENTITY2_MUTATION_ATTRIBUTES,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "UPDATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return ENTITY2_CONTROLLER_SYSTEM.update(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "UPDATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(ENTITY2_SERIALIZER.serialize);
		});
	},
};

const DELETE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new GraphQLList($structure.entity2.system.graphql.MUTATION__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE),
	args: {
		where: {
			description: "where",
			type: ENTITY2_MUTATION_ATTRIBUTES,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "DELETE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return ENTITY2_CONTROLLER_SYSTEM.delete(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "DELETE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(ENTITY2_SERIALIZER.serialize);
		});
	},
};

export { CREATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM, UPDATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM, DELETE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM };
