import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $structure from "./../../../../structure/index.js";
import * as $kernel from "./../../../../kernel/index.js";

import { CONTROLLER__BLACKLIST__CONTROLLER__DATABASE } from "./../../../controllers/blacklist.js";

const SERIALIZER__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.blacklist.database.graphql.TYPE__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	sql_primary_key: $structure.entities.blacklist.database.sql.PRIMARY_KEY__SQL__DATABASE__BLACKLIST__STRUCTURE,
});

const SOURCE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Mutation__Source",
	description: "Blacklist Source",
	fields: () => $structure.entities.blacklist.database.graphql.SOURCE_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const ATTRIBUTES__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Mutation__Attributes",
	description: "Blacklist Mutation Attributes",
	fields: $structure.entities.blacklist.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const ATTRIBUTES_ARRAY__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Mutation__Attributes_Array",
	description: "Blacklist Mutation Attributes Array",
	fields: $structure.entities.blacklist.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const ATTRIBUTES_STRING__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Mutation__Attributes_String",
	description: "Blacklist Mutation Attributes String",
	fields: $structure.entities.blacklist.database.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const WHERE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Mutation__Where",
	description: "Blacklist Mutation Where",
	fields: $structure.entities.blacklist.database.graphql.WHERE_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const WHERE_ARRAY__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Mutation__Where_Array",
	description: "Blacklist Mutation Where Array",
	fields: $structure.entities.blacklist.database.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const WHERE_STRING__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Mutation__Where_String",
	description: "Blacklist Mutation Where String",
	fields: $structure.entities.blacklist.database.graphql.WHERE_FIELDS_STRING__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const CREATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.blacklist.database.graphql.MUTATION__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	resolve: (source, mutation_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "CREATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		return CONTROLLER__BLACKLIST__CONTROLLER__DATABASE.create(
			context,
			{
				source,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "CREATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const UPDATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.blacklist.database.graphql.MUTATION__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_like: {
			description: "where like",
			type: WHERE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		limit: {
			description: "limit",
			type: $abstract.gauze.types.graphql.graphql.INT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		offset: {
			description: "offset",
			type: $abstract.gauze.types.graphql.graphql.INT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		order: {
			description: "order",
			type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		order_direction: {
			description: "order direction",
			type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		order_nulls: {
			description: "order nulls",
			type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
	},
	resolve: (source, mutation_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "UPDATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		if (!mutation_arguments.where && !mutation_arguments.where_in && !mutation_arguments.where_not_in && !mutation_arguments.where_like && !mutation_arguments.where_between) {
			throw new Error(
				"Field 'where' is required or field 'where_in' is required or field 'where_not_in' is required or field 'where_like' is required or field 'where_between' is required",
			);
		}
		return CONTROLLER__BLACKLIST__CONTROLLER__DATABASE.update(
			context,
			{
				source,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "UPDATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const DELETE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.blacklist.database.graphql.MUTATION__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_like: {
			description: "where like",
			type: WHERE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		limit: {
			description: "limit",
			type: $abstract.gauze.types.graphql.graphql.INT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		offset: {
			description: "offset",
			type: $abstract.gauze.types.graphql.graphql.INT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		order: {
			description: "order",
			type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		order_direction: {
			description: "order direction",
			type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		order_nulls: {
			description: "order nulls",
			type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
	},
	resolve: (source, mutation_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "DELETE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.where && !mutation_arguments.where_in && !mutation_arguments.where_not_in && !mutation_arguments.where_like && !mutation_arguments.where_between) {
			throw new Error(
				"Field 'where' is required or field 'where_in' is required or field 'where_not_in' is required or field 'where_like' is required or field 'where_between' is required",
			);
		}
		return CONTROLLER__BLACKLIST__CONTROLLER__DATABASE.delete(
			context,
			{
				source,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "DELETE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

export { CREATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE, UPDATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE, DELETE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE };
