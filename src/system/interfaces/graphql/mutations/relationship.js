import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $abstract from "./../../../../abstract/index.js";
import * as $structure from "./../../../../structure/index.js";
import * as $kernel from "./../../../../kernel/index.js";

import { CONTROLLER__RELATIONSHIP__CONTROLLER__SYSTEM } from "./../../../controllers/relationship.js";

const SERIALIZER__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.relationship.system.graphql.TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	sql_primary_key: $structure.relationship.database.sql.PRIMARY_KEY__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const PARENT__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Mutation__Parent",
	description: "Relationship Parent",
	fields: () => $structure.relationship.system.graphql.METADATA_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
});

const ATTRIBUTES__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Mutation__Attributes",
	description: "Relationship Mutation Attributes",
	fields: $structure.relationship.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
});

const ATTRIBUTES_ARRAY__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Mutation__Attributes_Array",
	description: "Relationship Mutation Attributes Array",
	fields: $structure.relationship.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
});

const CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.relationship.system.graphql.MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE),
	args: {
		// note: this is temporary so we can test the access control logic without maintaining a session
		// todo: remove this once we set up user authentication
		agent_id: {
			description: "agent_id",
			type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		parent: {
			description: "parent",
			type: PARENT__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return CONTROLLER__RELATIONSHIP__CONTROLLER__SYSTEM.create(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
				agent_id: context.agent_id,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.relationship.system.graphql.MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE),
	args: {
		// note: this is temporary so we can test the access control logic without maintaining a session
		// todo: remove this once we set up user authentication
		agent_id: {
			description: "agent_id",
			type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		parent: {
			description: "parent",
			type: PARENT__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: ATTRIBUTES__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: ATTRIBUTES_ARRAY__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: ATTRIBUTES_ARRAY__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return CONTROLLER__RELATIONSHIP__CONTROLLER__SYSTEM.update(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
				agent_id: context.agent_id,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.relationship.system.graphql.MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE),
	args: {
		// note: this is temporary so we can test the access control logic without maintaining a session
		// todo: remove this once we set up user authentication
		agent_id: {
			description: "agent_id",
			type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		parent: {
			description: "parent",
			type: PARENT__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: ATTRIBUTES__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: ATTRIBUTES_ARRAY__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: ATTRIBUTES_ARRAY__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		return CONTROLLER__RELATIONSHIP__CONTROLLER__SYSTEM.delete(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
				agent_id: context.agent_id,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

export { CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM, UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM, DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM };
