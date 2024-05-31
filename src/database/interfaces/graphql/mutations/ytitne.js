import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $structure from "./../../../../structure/index.js";
import * as $kernel from "./../../../../kernel/index.js";

import { CONTROLLER__YTITNE__CONTROLLER__DATABASE } from "./../../../controllers/ytitne.js";

const SERIALIZER__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.ytitne.database.graphql.TYPE__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	sql_primary_key: $structure.entities.ytitne.database.sql.PRIMARY_KEY__SQL__DATABASE__YTITNE__STRUCTURE,
});

const SOURCE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Source",
	description: "Ytitne Source",
	fields: () => $structure.entities.ytitne.database.graphql.SOURCE_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const ATTRIBUTES__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Attributes",
	description: "Ytitne Mutation Attributes",
	fields: $structure.entities.ytitne.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const ATTRIBUTES_ARRAY__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Attributes_Array",
	description: "Ytitne Mutation Attributes Array",
	fields: $structure.entities.ytitne.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const ATTRIBUTES_STRING__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Attributes_String",
	description: "Ytitne Mutation Attributes String",
	fields: $structure.entities.ytitne.database.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const WHERE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Where",
	description: "Ytitne Mutation Where",
	fields: $structure.entities.ytitne.database.graphql.WHERE_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const WHERE_ARRAY__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Where_Array",
	description: "Ytitne Mutation Where Array",
	fields: $structure.entities.ytitne.database.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const WHERE_STRING__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Where_String",
	description: "Ytitne Mutation Where String",
	fields: $structure.entities.ytitne.database.graphql.WHERE_FIELDS_STRING__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.ytitne.database.graphql.MUTATION__GRAPHQL__DATABASE__YTITNE__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	resolve: (source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		return CONTROLLER__YTITNE__CONTROLLER__DATABASE.create(
			{
				source: source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.ytitne.database.graphql.MUTATION__GRAPHQL__DATABASE__YTITNE__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		if (!mutation_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__YTITNE__CONTROLLER__DATABASE.update(
			{
				source: source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.ytitne.database.graphql.MUTATION__GRAPHQL__DATABASE__YTITNE__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__YTITNE__CONTROLLER__DATABASE.delete(
			{
				source: source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

export { CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE, UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE, DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE };
