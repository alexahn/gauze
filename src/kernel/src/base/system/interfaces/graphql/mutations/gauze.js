import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $structure from "./../../../../structure/index.js";
import * as $kernel from "./../../../../kernel/index.js";

import { CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM } from "./../../../controllers/a543731262804f64adcc0eae1a225acc.js";

const SERIALIZER__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.TYPE__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	sql_primary_key: $structure.entities.a543731262804f64adcc0eae1a225acc.database.sql.PRIMARY_KEY__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const SOURCE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation__Source",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Source",
	fields: () => $structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.SOURCE_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const ATTRIBUTES__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation__Attributes",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Mutation Attributes",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const ATTRIBUTES_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation__Attributes_Array",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Mutation Attributes Array",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const WHERE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation__Where",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Mutation Where",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.WHERE_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation__Where_Array",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Mutation Where Array",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.MUTATION__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	),
	args: {
		source: {
			description: "source",
			type: SOURCE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	resolve: (source, mutation_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"source",
			source,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		return CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM.create(
			context,
			{
				source,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
				"2",
				__RELATIVE_FILEPATH,
				"CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success",
				"data",
				data,
			);
			return data.map(SERIALIZER__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.MUTATION__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	),
	args: {
		source: {
			description: "source",
			type: SOURCE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_like: {
			description: "where like",
			type: WHERE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"source",
			source,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
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
		return CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM.update(
			context,
			{
				source,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
				"2",
				__RELATIVE_FILEPATH,
				"UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success",
				"data",
				data,
			);
			return data.map(SERIALIZER__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.MUTATION__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	),
	args: {
		source: {
			description: "source",
			type: SOURCE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_like: {
			description: "where like",
			type: WHERE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"source",
			source,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.where && !mutation_arguments.where_in && !mutation_arguments.where_not_in && !mutation_arguments.where_like && !mutation_arguments.where_between) {
			throw new Error(
				"Field 'where' is required or field 'where_in' is required or field 'where_not_in' is required or field 'where_like' is required or field 'where_between' is required",
			);
		}
		return CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM.delete(
			context,
			{
				source,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
				"2",
				__RELATIVE_FILEPATH,
				"DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success",
				"data",
				data,
			);
			return data.map(SERIALIZER__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

export {
	CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
};
