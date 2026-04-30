import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__WHITELIST__CONTROLLER__DATABASE } from "./../../../controllers/whitelist.js";

const SERIALIZER__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.whitelist.database.graphql.TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	sql_primary_key: $structure.entities.whitelist.database.sql.PRIMARY_KEY__SQL__DATABASE__WHITELIST__STRUCTURE,
});

const SOURCE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Source",
	description: "Whitelist Source",
	fields: () => $structure.entities.whitelist.database.graphql.SOURCE_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const ATTRIBUTES__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Attributes",
	description: "Whitelist Query Attributes",
	fields: $structure.entities.whitelist.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const ATTRIBUTES_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Attributes_Array",
	description: "Whitelist Query Attributes Array",
	fields: $structure.entities.whitelist.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const ATTRIBUTES_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Attributes_String",
	description: "Whitelist Query Attributes String",
	fields: $structure.entities.whitelist.database.graphql.ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const WHERE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Where",
	description: "Whitelist Query Where",
	fields: $structure.entities.whitelist.database.graphql.WHERE_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Where_Array",
	description: "Whitelist Query Where Array",
	fields: $structure.entities.whitelist.database.graphql.WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const WHERE_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Where_String",
	description: "Whitelist Query Where String",
	fields: $structure.entities.whitelist.database.graphql.WHERE_FIELDS_STRING__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const CURSOR_PAGE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Cursor_Page",
	description: "Whitelist Query Cursor Page",
	fields: () => ({
		nodes: {
			type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT(
				new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.whitelist.database.graphql.QUERY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE),
			),
		},
		page_info: {
			type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.cursor.TYPE__CURSOR_PAGE_INFO__DATABASE__STRUCTURE),
		},
	}),
});

const READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.whitelist.database.graphql.QUERY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_like: {
			description: "where like",
			type: WHERE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
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
			type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.order.TYPE__ORDER__STRUCTURE),
		},
	},
	resolve: (source, query_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		if (!query_arguments.where && !query_arguments.where_in && !query_arguments.where_not_in && !query_arguments.where_like && !query_arguments.where_between) {
			throw new Error(
				"Field 'where' is required or field 'where_in' is required or field 'where_not_in' is required or field 'where_like' is required or field 'where_between' is required",
			);
		}
		return CONTROLLER__WHITELIST__CONTROLLER__DATABASE.read(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

const CURSOR_READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: CURSOR_PAGE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
	args: {
		cursor: {
			description: "cursor",
			type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		source: {
			description: "source",
			type: SOURCE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_like: {
			description: "where like",
			type: WHERE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		limit: {
			description: "limit",
			type: $abstract.gauze.types.graphql.graphql.INT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		order: {
			description: "order",
			type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.order.TYPE__ORDER__STRUCTURE),
		},
	},
	resolve: (source, query_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "CURSOR_READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"CURSOR_READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		if (
			!query_arguments.cursor &&
			!query_arguments.where &&
			!query_arguments.where_in &&
			!query_arguments.where_not_in &&
			!query_arguments.where_like &&
			!query_arguments.where_between
		) {
			throw new Error(
				"Field 'cursor' is required or field 'where' is required or field 'where_in' is required or field 'where_not_in' is required or field 'where_like' is required or field 'where_between' is required",
			);
		}
		return CONTROLLER__WHITELIST__CONTROLLER__DATABASE.cursor_read(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (page) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
				"1",
				__RELATIVE_FILEPATH,
				"CURSOR_READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success",
				"page",
				page,
			);
			return {
				nodes: page.nodes.map(SERIALIZER__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.serialize),
				page_info: page.page_info,
			};
		});
	},
};

const COUNT__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: SOURCE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		count: {
			description: "count",
			type: WHERE_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: WHERE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_in: {
			description: "cache where in",
			type: WHERE_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		cache_where_not_in: {
			description: "cache where not in",
			type: WHERE_STRING__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_like: {
			description: "where like",
			type: WHERE__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_between: {
			description: "where between",
			type: WHERE_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		order: {
			description: "order",
			type: new $abstract.gauze.types.graphql.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.order.TYPE__ORDER__STRUCTURE),
		},
	},
	resolve: (source, query_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "source", source);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		if (!query_arguments.where && !query_arguments.where_in && !query_arguments.where_not_in && !query_arguments.where_like && !query_arguments.where_between) {
			throw new Error(
				"Field 'where' is required or field 'where_in' is required or field 'where_not_in' is required or field 'where_like' is required or field 'where_between' is required",
			);
		}
		return CONTROLLER__WHITELIST__CONTROLLER__DATABASE.count(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, "COUNT__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data;
		});
	},
};

export { READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE, CURSOR_READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE };
