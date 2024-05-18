import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__AGENT_CHARACTER__CONTROLLER__SYSTEM } from "./../../../controllers/agent_character.js";

const SERIALIZER__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.agent_character.system.graphql.TYPE__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
	sql_primary_key: $structure.entities.agent_character.database.sql.PRIMARY_KEY__SQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
});

const PARENT__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Query__Parent",
	description: "Agent_Character Parent",
	fields: () => $structure.entities.agent_character.system.graphql.METADATA_FIELDS__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
});

const ATTRIBUTES__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Query__Attributes",
	description: "Agent_Character Query Attributes",
	fields: $structure.entities.agent_character.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
});

const ATTRIBUTES_ARRAY__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Query__Attributes_Array",
	description: "Agent_Character Query Attributes Array",
	fields: $structure.entities.agent_character.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
});

const ATTRIBUTES_STRING__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Query__Attributes_String",
	description: "Agent_Character Query Attributes String",
	fields: $structure.entities.agent_character.system.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
});

const WHERE__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Query__Where",
	description: "Agent_Character Query Where",
	fields: $structure.entities.agent_character.system.graphql.WHERE_FIELDS__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
});

const WHERE_ARRAY__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Query__Where_Array",
	description: "Agent_Character Query Where Array",
	fields: $structure.entities.agent_character.system.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
});

const WHERE_STRING__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Query__Where_String",
	description: "Agent_Character Query Where String",
	fields: $structure.entities.agent_character.system.graphql.WHERE_FIELDS_STRING__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
});

const READ__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.agent_character.system.graphql.QUERY__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM,
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
	resolve: (source, query_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		return CONTROLLER__AGENT_CHARACTER__CONTROLLER__SYSTEM.read(
			{
				source: source,
				project: context.project,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const COUNT__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		count: {
			description: "count",
			type: WHERE_STRING__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	resolve: (source, query_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		return CONTROLLER__AGENT_CHARACTER__CONTROLLER__SYSTEM.count(
			{
				source: source,
				project: context.project,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "COUNT__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data;
		});
	},
};
export { READ__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM, COUNT__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM };
