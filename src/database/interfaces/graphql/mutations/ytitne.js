import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $abstract from "./../../../../abstract/index.js";
import * as $structure from "./../../../../structure/index.js";
import * as $kernel from "./../../../../kernel/index.js";

import { YTITNE_CONTROLLER_DATABASE } from "./../../../controllers/ytitne.js";

const YTITNE_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.ytitne.database.graphql.TYPE__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	sql_primary_key: $structure.ytitne.database.sql.PRIMARY_KEY__SQL__DATABASE__YTITNE__STRUCTURE,
});

const YTITNE_ATTRIBUTES_MUTATION_INTERFACE_DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Attributes",
	description: "Ytitne Mutation Attributes",
	fields: $structure.ytitne.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const YTITNE_ATTRIBUTES_ARRAY_MUTATION_INTERFACE_DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Attributes_Array",
	description: "Ytitne Mutation Attributes Array",
	fields: $structure.ytitne.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.ytitne.database.graphql.MUTATION__GRAPHQL__DATABASE__YTITNE__STRUCTURE),
	args: {
		attributes: {
			description: "attributes",
			type: YTITNE_ATTRIBUTES_MUTATION_INTERFACE_DATABASE,
		},
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return YTITNE_CONTROLLER_DATABASE.create(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(YTITNE_SERIALIZER.serialize);
		});
	},
};

const UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.ytitne.database.graphql.MUTATION__GRAPHQL__DATABASE__YTITNE__STRUCTURE),
	args: {
		where: {
			description: "where",
			type: YTITNE_ATTRIBUTES_MUTATION_INTERFACE_DATABASE,
		},
		where_in: {
			description: "where in",
			type: YTITNE_ATTRIBUTES_ARRAY_MUTATION_INTERFACE_DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: YTITNE_ATTRIBUTES_ARRAY_MUTATION_INTERFACE_DATABASE,
		},
		attributes: {
			description: "attributes",
			type: YTITNE_ATTRIBUTES_MUTATION_INTERFACE_DATABASE,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return YTITNE_CONTROLLER_DATABASE.update(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(YTITNE_SERIALIZER.serialize);
		});
	},
};

const DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.ytitne.database.graphql.MUTATION__GRAPHQL__DATABASE__YTITNE__STRUCTURE),
	args: {
		where: {
			description: "where",
			type: YTITNE_ATTRIBUTES_MUTATION_INTERFACE_DATABASE,
		},
		where_in: {
			description: "where in",
			type: YTITNE_ATTRIBUTES_ARRAY_MUTATION_INTERFACE_DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: YTITNE_ATTRIBUTES_ARRAY_MUTATION_INTERFACE_DATABASE,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return YTITNE_CONTROLLER_DATABASE.delete(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(YTITNE_SERIALIZER.serialize);
		});
	},
};

export { CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE, UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE, DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE };
