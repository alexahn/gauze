import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__AGENT_PERSON__CONTROLLER__SYSTEM } from "./../../../controllers/agent_person.js";

const SERIALIZER__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.agent_person.system.graphql.TYPE__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
	sql_primary_key: $structure.entities.agent_person.database.sql.PRIMARY_KEY__SQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const SOURCE__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Query__Source",
	description: "Agent_Person Source",
	fields: () => $structure.entities.agent_person.system.graphql.SOURCE_FIELDS__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
});

const ATTRIBUTES__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Query__Attributes",
	description: "Agent_Person Query Attributes",
	fields: $structure.entities.agent_person.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
});

const ATTRIBUTES_ARRAY__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Query__Attributes_Array",
	description: "Agent_Person Query Attributes Array",
	fields: $structure.entities.agent_person.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
});

const ATTRIBUTES_STRING__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Query__Attributes_String",
	description: "Agent_Person Query Attributes String",
	fields: $structure.entities.agent_person.system.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
});

const WHERE__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Query__Where",
	description: "Agent_Person Query Where",
	fields: $structure.entities.agent_person.system.graphql.WHERE_FIELDS__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
});

const WHERE_ARRAY__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Query__Where_Array",
	description: "Agent_Person Query Where Array",
	fields: $structure.entities.agent_person.system.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
});

const WHERE_STRING__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Query__Where_String",
	description: "Agent_Person Query Where String",
	fields: $structure.entities.agent_person.system.graphql.WHERE_FIELDS_STRING__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
});

const READ__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.agent_person.system.graphql.QUERY__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_like: {
			description: "where like",
			type: WHERE__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
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
	resolve: (source, query_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		return CONTROLLER__AGENT_PERSON__CONTROLLER__SYSTEM.read(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const COUNT__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		count: {
			description: "count",
			type: WHERE_STRING__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_like: {
			description: "where like",
			type: WHERE__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	resolve: (source, query_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		return CONTROLLER__AGENT_PERSON__CONTROLLER__SYSTEM.count(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, "COUNT__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data;
		});
	},
};
export {
	// export types to allow type composition
	SOURCE__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	ATTRIBUTES__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	ATTRIBUTES_ARRAY__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	ATTRIBUTES_STRING__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	WHERE__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	WHERE_ARRAY__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	WHERE_STRING__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	// top level
	READ__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	COUNT__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
};
