import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $structure from "./../../../../structure/index.js";
import * as $kernel from "./../../../../kernel/index.js";

import { CONTROLLER__AGENT_CHARACTER__CONTROLLER__SYSTEM } from "./../../../controllers/agent_character.js";

const SERIALIZER__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.agent_character.system.graphql.TYPE__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
	sql_primary_key: $structure.entities.agent_character.database.sql.PRIMARY_KEY__SQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
});

const PARENT__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Mutation__Parent",
	description: "Agent_Character Parent",
	fields: () => $structure.entities.agent_character.system.graphql.METADATA_FIELDS__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
});

const ATTRIBUTES__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Mutation__Attributes",
	description: "Agent_Character Mutation Attributes",
	fields: $structure.entities.agent_character.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
});

const ATTRIBUTES_ARRAY__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Mutation__Attributes_Array",
	description: "Agent_Character Mutation Attributes Array",
	fields: $structure.entities.agent_character.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
});

const WHERE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Mutation__Where",
	description: "Agent_Character Mutation Where",
	fields: $structure.entities.agent_character.system.graphql.WHERE_FIELDS__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
});

const WHERE_ARRAY__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Mutation__Where_Array",
	description: "Agent_Character Mutation Where Array",
	fields: $structure.entities.agent_character.system.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
});

const CREATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.agent_character.system.graphql.MUTATION__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "CREATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		return CONTROLLER__AGENT_CHARACTER__CONTROLLER__SYSTEM.create(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "CREATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const UPDATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.agent_character.system.graphql.MUTATION__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "UPDATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		if (!mutation_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__AGENT_CHARACTER__CONTROLLER__SYSTEM.update(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "UPDATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const DELETE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.agent_character.system.graphql.MUTATION__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "DELETE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__AGENT_CHARACTER__CONTROLLER__SYSTEM.delete(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "DELETE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

export {
	CREATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
};
