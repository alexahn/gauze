import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $structure from "./../../../../structure/index.js";
import * as $kernel from "./../../../../kernel/index.js";

import { CONTROLLER__GAUZE__CONTROLLER__SYSTEM } from "./../../../controllers/gauze.js";

const SERIALIZER__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.gauze.system.graphql.TYPE__GRAPHQL__SYSTEM__GAUZE__STRUCTURE,
	sql_primary_key: $structure.entities.gauze.database.sql.PRIMARY_KEY__SQL__DATABASE__GAUZE__STRUCTURE,
});

const SOURCE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Mutation__Source",
	description: "Gauze Source",
	fields: () => $structure.entities.gauze.system.graphql.SOURCE_FIELDS__GRAPHQL__SYSTEM__GAUZE__STRUCTURE,
});

const ATTRIBUTES__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Mutation__Attributes",
	description: "Gauze Mutation Attributes",
	fields: $structure.entities.gauze.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__GAUZE__STRUCTURE,
});

const ATTRIBUTES_ARRAY__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Mutation__Attributes_Array",
	description: "Gauze Mutation Attributes Array",
	fields: $structure.entities.gauze.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__GAUZE__STRUCTURE,
});

const WHERE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Mutation__Where",
	description: "Gauze Mutation Where",
	fields: $structure.entities.gauze.system.graphql.WHERE_FIELDS__GRAPHQL__SYSTEM__GAUZE__STRUCTURE,
});

const WHERE_ARRAY__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Mutation__Where_Array",
	description: "Gauze Mutation Where Array",
	fields: $structure.entities.gauze.system.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__GAUZE__STRUCTURE,
});

const CREATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.gauze.system.graphql.MUTATION__GRAPHQL__SYSTEM__GAUZE__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	resolve: (source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "CREATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		return CONTROLLER__GAUZE__CONTROLLER__SYSTEM.create(
			{
				source: source,
				project: context.project,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "CREATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const UPDATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.gauze.system.graphql.MUTATION__GRAPHQL__SYSTEM__GAUZE__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "UPDATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		if (!mutation_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__GAUZE__CONTROLLER__SYSTEM.update(
			{
				source: source,
				project: context.project,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "UPDATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const DELETE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.gauze.system.graphql.MUTATION__GRAPHQL__SYSTEM__GAUZE__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "DELETE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__GAUZE__CONTROLLER__SYSTEM.delete(
			{
				source: source,
				project: context.project,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "DELETE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

export { CREATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM, UPDATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM, DELETE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM };
