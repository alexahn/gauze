import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInputObjectType, GraphQLInterfaceType } from "graphql";

import { RELATIONSHIP_CONTROLLER_SYSTEM } from "./../../../controllers/relationship.js";

const RELATIONSHIP_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.relationship.system.graphql.TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	sql_primary_key: $structure.relationship.abstract.PRIMARY_KEY__ABSTRACT__RELATIONSHIP__STRUCTURE,
});

const RELATIONSHIP_MUTATION_ATTRIBUTES = new GraphQLInputObjectType({
	name: "Relationship_Mutation__Attributes",
	description: "Relationship Mutation Attributes",
	fields: $structure.relationship.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
});

const CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new GraphQLList($structure.relationship.system.graphql.MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE),
	args: {
		attributes: {
			description: "attributes",
			type: RELATIONSHIP_MUTATION_ATTRIBUTES,
		},
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return RELATIONSHIP_CONTROLLER_SYSTEM.create(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(RELATIONSHIP_SERIALIZER.serialize);
		});
	},
};

const UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new GraphQLList($structure.relationship.system.graphql.MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE),
	args: {
		where: {
			description: "where",
			type: RELATIONSHIP_MUTATION_ATTRIBUTES,
		},
		attributes: {
			description: "attributes",
			type: RELATIONSHIP_MUTATION_ATTRIBUTES,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return RELATIONSHIP_CONTROLLER_SYSTEM.update(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(RELATIONSHIP_SERIALIZER.serialize);
		});
	},
};

const DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new GraphQLList($structure.relationship.system.graphql.MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE),
	args: {
		where: {
			description: "where",
			type: RELATIONSHIP_MUTATION_ATTRIBUTES,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return RELATIONSHIP_CONTROLLER_SYSTEM.delete(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(RELATIONSHIP_SERIALIZER.serialize);
		});
	},
};

export { CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM, UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM, DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM };
