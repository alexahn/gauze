import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $structure from "./../../../../structure/index.js";
import * as $kernel from "./../../../../kernel/index.js";

import { CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE } from "./../../../controllers/a543731262804f64adcc0eae1a225acc.js";

const SERIALIZER__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.a543731262804f64adcc0eae1a225acc.database.graphql.TYPE__GRAPHQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	sql_primary_key: $structure.entities.a543731262804f64adcc0eae1a225acc.database.sql.PRIMARY_KEY__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const SOURCE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation__Source",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Source",
	fields: () => $structure.entities.a543731262804f64adcc0eae1a225acc.database.graphql.SOURCE_FIELDS__GRAPHQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const ATTRIBUTES__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation__Attributes",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Mutation Attributes",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const ATTRIBUTES_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation__Attributes_Array",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Mutation Attributes Array",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const ATTRIBUTES_STRING__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation__Attributes_String",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Mutation Attributes String",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.database.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const WHERE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation__Where",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Mutation Where",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.database.graphql.WHERE_FIELDS__GRAPHQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation__Where_Array",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Mutation Where Array",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.database.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const WHERE_STRING__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation__Where_String",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Mutation Where String",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.database.graphql.WHERE_FIELDS_STRING__GRAPHQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.entities.a543731262804f64adcc0eae1a225acc.database.graphql.MUTATION__GRAPHQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	),
	args: {
		source: {
			description: "source",
			type: SOURCE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	resolve: (source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"source",
			source,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		return CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE.create(
			{
				source: source,
				database: context.database,
				transaction: context.transaction,
				breadth: context.breadth,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
				"2",
				__RELATIVE_FILEPATH,
				"CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success",
				"data",
				data,
			);
			return data.map(SERIALIZER__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.entities.a543731262804f64adcc0eae1a225acc.database.graphql.MUTATION__GRAPHQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	),
	args: {
		source: {
			description: "source",
			type: SOURCE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
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
	resolve: (source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"source",
			source,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		if (!mutation_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE.update(
			{
				source: source,
				database: context.database,
				transaction: context.transaction,
				breadth: context.breadth,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
				"2",
				__RELATIVE_FILEPATH,
				"UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success",
				"data",
				data,
			);
			return data.map(SERIALIZER__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.entities.a543731262804f64adcc0eae1a225acc.database.graphql.MUTATION__GRAPHQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	),
	args: {
		source: {
			description: "source",
			type: SOURCE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
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
	resolve: (source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"source",
			source,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE.delete(
			{
				source: source,
				database: context.database,
				transaction: context.transaction,
				breadth: context.breadth,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
				"2",
				__RELATIVE_FILEPATH,
				"DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success",
				"data",
				data,
			);
			return data.map(SERIALIZER__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

export {
	CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__DATABASE,
};
