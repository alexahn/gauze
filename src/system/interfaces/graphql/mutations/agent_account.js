import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $structure from "./../../../../structure/index.js";
import * as $kernel from "./../../../../kernel/index.js";

import { CONTROLLER__AGENT_ACCOUNT__CONTROLLER__SYSTEM } from "./../../../controllers/agent_account.js";

const SERIALIZER__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.agent_account.system.graphql.TYPE__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	sql_primary_key: $structure.entities.agent_account.database.sql.PRIMARY_KEY__SQL__DATABASE__AGENT_ACCOUNT__STRUCTURE,
});

const SOURCE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Account_Mutation__Source",
	description: "Agent_Account Source",
	fields: () => $structure.entities.agent_account.system.graphql.SOURCE_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
});

const ATTRIBUTES__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Account_Mutation__Attributes",
	description: "Agent_Account Mutation Attributes",
	fields: $structure.entities.agent_account.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
});

const ATTRIBUTES_ARRAY__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Account_Mutation__Attributes_Array",
	description: "Agent_Account Mutation Attributes Array",
	fields: $structure.entities.agent_account.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
});

const WHERE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Account_Mutation__Where",
	description: "Agent_Account Mutation Where",
	fields: $structure.entities.agent_account.system.graphql.WHERE_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
});

const WHERE_ARRAY__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Account_Mutation__Where_Array",
	description: "Agent_Account Mutation Where Array",
	fields: $structure.entities.agent_account.system.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
});

const CREATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.agent_account.system.graphql.MUTATION__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	resolve: (source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "CREATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		return CONTROLLER__AGENT_ACCOUNT__CONTROLLER__SYSTEM.create(
			{
				source: source,
				project: context.project,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "CREATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const UPDATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.agent_account.system.graphql.MUTATION__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "UPDATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		if (!mutation_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__AGENT_ACCOUNT__CONTROLLER__SYSTEM.update(
			{
				source: source,
				project: context.project,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "UPDATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const DELETE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.agent_account.system.graphql.MUTATION__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "DELETE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.where) {
			throw new Error("Field 'where' is required");
		}
		return CONTROLLER__AGENT_ACCOUNT__CONTROLLER__SYSTEM.delete(
			{
				source: source,
				project: context.project,
				database: context.database,
				transaction: context.transaction,
				agent: context.agent,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "DELETE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

export {
	CREATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
};
