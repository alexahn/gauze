import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM } from "./../../../controllers/a543731262804f64adcc0eae1a225acc.js";

const SERIALIZER__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.TYPE__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	sql_primary_key: $structure.entities.a543731262804f64adcc0eae1a225acc.database.sql.PRIMARY_KEY__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const SOURCE__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Query__Source",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Source",
	fields: () => $structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.SOURCE_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const ATTRIBUTES__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Query__Attributes",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Query Attributes",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const ATTRIBUTES_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Query__Attributes_Array",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Query Attributes Array",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const ATTRIBUTES_STRING__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Query__Attributes_String",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Query Attributes String",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const WHERE__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Query__Where",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Query Where",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.WHERE_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Query__Where_Array",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Query Where Array",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const WHERE_STRING__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Query__Where_String",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Query Where String",
	fields: $structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.WHERE_FIELDS_STRING__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const READ__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.entities.a543731262804f64adcc0eae1a225acc.system.graphql.QUERY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	),
	args: {
		source: {
			description: "source",
			type: SOURCE__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_like: {
			description: "where like",
			type: WHERE__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"source",
			source,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		return CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM.read(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
				"1",
				__RELATIVE_FILEPATH,
				"READ__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success",
				"data",
				data,
			);
			return data.map(SERIALIZER__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const COUNT__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		count: {
			description: "count",
			type: WHERE_STRING__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_like: {
			description: "where like",
			type: WHERE__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	resolve: (source, query_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"source",
			source,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		return CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM.count(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
				"1",
				__RELATIVE_FILEPATH,
				"COUNT__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success",
				"data",
				data,
			);
			return data;
		});
	},
};
export {
	// export types to allow type composition
	SOURCE__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	ATTRIBUTES__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	ATTRIBUTES_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	ATTRIBUTES_STRING__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	WHERE__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	WHERE_ARRAY__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	WHERE_STRING__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	// top level
	READ__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	COUNT__caf5342ac38d41a6a02bb81d2d2b21a4__QUERY__GRAPHQL__INTERFACE__SYSTEM,
};
