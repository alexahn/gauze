import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $structure from "./../../../../structure/index.js";
import * as $kernel from "./../../../../kernel/index.js";

import { CONTROLLER__YTITNE__CONTROLLER__SYSTEM } from "./../../../controllers/ytitne.js";

const SERIALIZER__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.ytitne.system.graphql.TYPE__GRAPHQL__SYSTEM__YTITNE__STRUCTURE,
	sql_primary_key: $structure.entities.ytitne.database.sql.PRIMARY_KEY__SQL__DATABASE__YTITNE__STRUCTURE,
});

const SOURCE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Source",
	description: "Ytitne Source",
	fields: () => $structure.entities.ytitne.system.graphql.SOURCE_FIELDS__GRAPHQL__SYSTEM__YTITNE__STRUCTURE,
});

const ATTRIBUTES__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Attributes",
	description: "Ytitne Mutation Attributes",
	fields: $structure.entities.ytitne.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__YTITNE__STRUCTURE,
});

const ATTRIBUTES_ARRAY__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Attributes_Array",
	description: "Ytitne Mutation Attributes Array",
	fields: $structure.entities.ytitne.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__YTITNE__STRUCTURE,
});

const WHERE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Where",
	description: "Ytitne Mutation Where",
	fields: $structure.entities.ytitne.system.graphql.WHERE_FIELDS__GRAPHQL__SYSTEM__YTITNE__STRUCTURE,
});

const WHERE_ARRAY__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Where_Array",
	description: "Ytitne Mutation Where Array",
	fields: $structure.entities.ytitne.system.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__YTITNE__STRUCTURE,
});

const CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.ytitne.system.graphql.MUTATION__GRAPHQL__SYSTEM__YTITNE__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	resolve: (source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		return CONTROLLER__YTITNE__CONTROLLER__SYSTEM.create(
			{
				source: source,
				project: context.project,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.ytitne.system.graphql.MUTATION__GRAPHQL__SYSTEM__YTITNE__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		if (!mutation_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__YTITNE__CONTROLLER__SYSTEM.update(
			{
				source: source,
				project: context.project,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.ytitne.system.graphql.MUTATION__GRAPHQL__SYSTEM__YTITNE__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__YTITNE__CONTROLLER__SYSTEM.delete(
			{
				source: source,
				project: context.project,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

export { CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM, UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM, DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM };
