import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $structure from "./../../../../structure/index.js";
import * as $kernel from "./../../../../kernel/index.js";

import { CONTROLLER__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__SYSTEM } from "./../../../controllers/a2b8dbc3427b41a9899e11671c2422c7.js";

const SERIALIZER__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.system.graphql.TYPE__GRAPHQL__SYSTEM__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	sql_primary_key: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.database.sql.PRIMARY_KEY__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const SOURCE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Mutation__Source",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Source",
	fields: () => $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.system.graphql.SOURCE_FIELDS__GRAPHQL__SYSTEM__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const ATTRIBUTES__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Mutation__Attributes",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Mutation Attributes",
	fields: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const ATTRIBUTES_ARRAY__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Mutation__Attributes_Array",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Mutation Attributes Array",
	fields: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const WHERE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Mutation__Where",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Mutation Where",
	fields: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.system.graphql.WHERE_FIELDS__GRAPHQL__SYSTEM__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const WHERE_ARRAY__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Mutation__Where_Array",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Mutation Where Array",
	fields: $structure.entities.a2b8dbc3427b41a9899e11671c2422c7.system.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const CREATE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.entities.a2b8dbc3427b41a9899e11671c2422c7.system.graphql.MUTATION__GRAPHQL__SYSTEM__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	),
	args: {
		source: {
			description: "source",
			type: SOURCE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	resolve: (source, mutation_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"source",
			source,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CREATE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		return CONTROLLER__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__SYSTEM.create(
			context,
			{
				source,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
				"2",
				__RELATIVE_FILEPATH,
				"CREATE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success",
				"data",
				data,
			);
			return data.map(SERIALIZER__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const UPDATE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.entities.a2b8dbc3427b41a9899e11671c2422c7.system.graphql.MUTATION__GRAPHQL__SYSTEM__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	),
	args: {
		source: {
			description: "source",
			type: SOURCE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_like: {
			description: "where like",
			type: WHERE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		attributes: {
			description: "attributes",
			type: ATTRIBUTES__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
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
			"UPDATE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"source",
			source,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"UPDATE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
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
		return CONTROLLER__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__SYSTEM.update(
			context,
			{
				source,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
				"2",
				__RELATIVE_FILEPATH,
				"UPDATE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success",
				"data",
				data,
			);
			return data.map(SERIALIZER__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

const DELETE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(
		$structure.entities.a2b8dbc3427b41a9899e11671c2422c7.system.graphql.MUTATION__GRAPHQL__SYSTEM__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	),
	args: {
		source: {
			description: "source",
			type: SOURCE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: WHERE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_like: {
			description: "where like",
			type: WHERE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
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
			"DELETE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"source",
			source,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"DELETE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:enter",
			"mutation_arguments",
			mutation_arguments,
		);
		if (!mutation_arguments.where && !mutation_arguments.where_in && !mutation_arguments.where_not_in && !mutation_arguments.where_like && !mutation_arguments.where_between) {
			throw new Error(
				"Field 'where' is required or field 'where_in' is required or field 'where_not_in' is required or field 'where_like' is required or field 'where_between' is required",
			);
		}
		return CONTROLLER__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__SYSTEM.delete(
			context,
			{
				source,
			},
			mutation_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
				"2",
				__RELATIVE_FILEPATH,
				"DELETE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.resolve:success",
				"data",
				data,
			);
			return data.map(SERIALIZER__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

export {
	CREATE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__cd637bc32c364580be5cc28396d3dee8__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
};
