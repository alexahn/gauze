import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $abstract from "./../../../../abstract/index.js";
import * as $structure from "./../../../../structure/index.js";
import * as $kernel from "./../../../../kernel/index.js";

import { CONTROLLER__EZUAG__CONTROLLER__DATABASE } from "./../../../controllers/ezuag.js";

const SERIALIZER__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.ezuag.database.graphql.TYPE__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	sql_primary_key: $structure.ezuag.database.sql.PRIMARY_KEY__SQL__DATABASE__EZUAG__STRUCTURE,
});

const ATTRIBUTES__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag_Mutation__Attributes",
	description: "Ezuag Mutation Attributes",
	fields: $structure.ezuag.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
});

const ATTRIBUTES_ARRAY__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag_Mutation__Attributes_Array",
	description: "Ezuag Mutation Attributes Array",
	fields: $structure.ezuag.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
});

const CREATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.ezuag.database.graphql.MUTATION__GRAPHQL__DATABASE__EZUAG__STRUCTURE),
	args: {
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "CREATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return CONTROLLER__EZUAG__CONTROLLER__DATABASE.create(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "CREATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const UPDATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.ezuag.database.graphql.MUTATION__GRAPHQL__DATABASE__EZUAG__STRUCTURE),
	args: {
		where: {
			description: "where",
			type: ATTRIBUTES__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: ATTRIBUTES_ARRAY__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: ATTRIBUTES_ARRAY__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE,
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
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "UPDATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return CONTROLLER__EZUAG__CONTROLLER__DATABASE.update(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "UPDATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const DELETE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.ezuag.database.graphql.MUTATION__GRAPHQL__DATABASE__EZUAG__STRUCTURE),
	args: {
		where: {
			description: "where",
			type: ATTRIBUTES__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: ATTRIBUTES_ARRAY__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: ATTRIBUTES_ARRAY__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE,
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
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "DELETE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return CONTROLLER__EZUAG__CONTROLLER__DATABASE.delete(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "DELETE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

export { CREATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE, UPDATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE, DELETE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE };
