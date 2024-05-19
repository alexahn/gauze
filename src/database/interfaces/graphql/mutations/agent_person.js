import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $structure from "./../../../../structure/index.js";
import * as $kernel from "./../../../../kernel/index.js";

import { CONTROLLER__AGENT_PERSON__CONTROLLER__DATABASE } from "./../../../controllers/agent_person.js";

const SERIALIZER__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.agent_person.database.graphql.TYPE__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	sql_primary_key: $structure.entities.agent_person.database.sql.PRIMARY_KEY__SQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const PARENT__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Mutation__Parent",
	description: "Agent_Person Parent",
	fields: () => $structure.entities.agent_person.database.graphql.METADATA_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const SOURCE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Mutation__Source",
	description: "Agent_Person Source",
	fields: () => $structure.entities.agent_person.database.graphql.QUERY_SOURCE_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const ATTRIBUTES__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Mutation__Attributes",
	description: "Agent_Person Mutation Attributes",
	fields: $structure.entities.agent_person.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const ATTRIBUTES_ARRAY__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Mutation__Attributes_Array",
	description: "Agent_Person Mutation Attributes Array",
	fields: $structure.entities.agent_person.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const ATTRIBUTES_STRING__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Mutation__Attributes_String",
	description: "Agent_Person Mutation Attributes String",
	fields: $structure.entities.agent_person.database.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const WHERE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Mutation__Where",
	description: "Agent_Person Mutation Where",
	fields: $structure.entities.agent_person.database.graphql.WHERE_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const WHERE_ARRAY__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Mutation__Where_Array",
	description: "Agent_Person Mutation Where Array",
	fields: $structure.entities.agent_person.database.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const WHERE_STRING__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Mutation__Where_String",
	description: "Agent_Person Mutation Where String",
	fields: $structure.entities.agent_person.database.graphql.WHERE_FIELDS_STRING__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const CREATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.agent_person.database.graphql.MUTATION__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		source: {
			description: "source",
			type: SOURCE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	resolve: (source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "CREATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		return CONTROLLER__AGENT_PERSON__CONTROLLER__DATABASE.create(
			{
				source: source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "CREATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const UPDATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.agent_person.database.graphql.MUTATION__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		source: {
			description: "source",
			type: SOURCE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "UPDATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		if (!mutation_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__AGENT_PERSON__CONTROLLER__DATABASE.update(
			{
				source: source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "UPDATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const DELETE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.agent_person.database.graphql.MUTATION__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		source: {
			description: "source",
			type: SOURCE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "DELETE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__AGENT_PERSON__CONTROLLER__DATABASE.delete(
			{
				source: source,
				database: context.database,
				transaction: context.transaction,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "DELETE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

export {
	CREATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
};
