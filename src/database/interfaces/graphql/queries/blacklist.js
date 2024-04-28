import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { BLACKLIST_CONTROLLER_DATABASE } from "./../../../controllers/blacklist.js";

const BLACKLIST_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.blacklist.database.graphql.TYPE__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	sql_primary_key: $structure.blacklist.database.sql.PRIMARY_KEY__SQL__DATABASE__BLACKLIST__STRUCTURE,
});

const BLACKLIST_PARENT_QUERY_INTERFACE_DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist__Parent",
	description: "Blacklist Parent",
	fields: () => $structure.blacklist.database.graphql.METADATA_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const BLACKLIST_ATTRIBUTES_QUERY_INTERFACE_DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Query__Attributes",
	description: "Blacklist Query Attributes",
	fields: $structure.blacklist.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const BLACKLIST_ATTRIBUTES_ARRAY_QUERY_INTERFACE_DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Query__Attributes_Array",
	description: "Blacklist Query Attributes Array",
	fields: $structure.blacklist.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const READ__BLACKLIST__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.blacklist.database.graphql.QUERY__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: BLACKLIST_PARENT_QUERY_INTERFACE_DATABASE,
		},
		where: {
			description: "where",
			type: BLACKLIST_ATTRIBUTES_QUERY_INTERFACE_DATABASE,
		},
		where_in: {
			description: "where in",
			type: BLACKLIST_ATTRIBUTES_ARRAY_QUERY_INTERFACE_DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: BLACKLIST_ATTRIBUTES_ARRAY_QUERY_INTERFACE_DATABASE,
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
	resolve: (_source, query_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__BLACKLIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__BLACKLIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		return BLACKLIST_CONTROLLER_DATABASE.read(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__BLACKLIST__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(BLACKLIST_SERIALIZER.serialize);
		});
	},
};

export { READ__BLACKLIST__QUERY__GRAPHQL__INTERFACE__DATABASE };
