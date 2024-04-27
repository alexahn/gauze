import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_SYSTEM } from "./../../../controllers/a543731262804f64adcc0eae1a225acc.js";

const caf5342ac38d41a6a02bb81d2d2b21a4_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.a543731262804f64adcc0eae1a225acc.system.graphql.TYPE__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	sql_primary_key: $structure.a543731262804f64adcc0eae1a225acc.database.sql.PRIMARY_KEY__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const caf5342ac38d41a6a02bb81d2d2b21a4_MUTATION_ATTRIBUTES = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation__Attributes",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Mutation Attributes",
	fields: $structure.a543731262804f64adcc0eae1a225acc.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.a543731262804f64adcc0eae1a225acc.system.graphql.MUTATION__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	),
	args: {
		attributes: {
			description: "attributes",
			type: caf5342ac38d41a6a02bb81d2d2b21a4_MUTATION_ATTRIBUTES,
		},
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"_source",
			_source,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_SYSTEM
			.create(
				{
					source: _source,
					database: context.database,
					transaction: context.transaction,
				},
				mutation_arguments,
			)
			.then(function (data) {
				$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
					"2",
					__RELATIVE_FILEPATH,
					"CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success",
					"data",
					data,
				);
				return data.map(caf5342ac38d41a6a02bb81d2d2b21a4_SERIALIZER.serialize);
			});
	},
};

const UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.a543731262804f64adcc0eae1a225acc.system.graphql.MUTATION__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	),
	args: {
		where: {
			description: "where",
			type: caf5342ac38d41a6a02bb81d2d2b21a4_MUTATION_ATTRIBUTES,
		},
		attributes: {
			description: "attributes",
			type: caf5342ac38d41a6a02bb81d2d2b21a4_MUTATION_ATTRIBUTES,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"_source",
			_source,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_SYSTEM
			.update(
				{
					source: _source,
					database: context.database,
					transaction: context.transaction,
				},
				mutation_arguments,
			)
			.then(function (data) {
				$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
					"2",
					__RELATIVE_FILEPATH,
					"UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success",
					"data",
					data,
				);
				return data.map(caf5342ac38d41a6a02bb81d2d2b21a4_SERIALIZER.serialize);
			});
	},
};

const DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.a543731262804f64adcc0eae1a225acc.system.graphql.MUTATION__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	),
	args: {
		where: {
			description: "where",
			type: caf5342ac38d41a6a02bb81d2d2b21a4_MUTATION_ATTRIBUTES,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"_source",
			_source,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_SYSTEM
			.delete(
				{
					source: _source,
					database: context.database,
					transaction: context.transaction,
				},
				mutation_arguments,
			)
			.then(function (data) {
				$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
					"2",
					__RELATIVE_FILEPATH,
					"DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success",
					"data",
					data,
				);
				return data.map(caf5342ac38d41a6a02bb81d2d2b21a4_SERIALIZER.serialize);
			});
	},
};

export {
	CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
};
