import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__WHITELIST__CONTROLLER__SYSTEM } from "./../../../controllers/whitelist.js";

const SERIALIZER__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.whitelist.system.graphql.TYPE__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE,
	sql_primary_key: $structure.whitelist.database.sql.PRIMARY_KEY__SQL__DATABASE__WHITELIST__STRUCTURE,
});

const PARENT__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Parent",
	description: "Whitelist Parent",
	fields: () => $structure.whitelist.system.graphql.METADATA_FIELDS__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE,
});

const ATTRIBUTES__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Attributes",
	description: "Whitelist Query Attributes",
	fields: $structure.whitelist.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE,
});

const ATTRIBUTES_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Attributes_Array",
	description: "Whitelist Query Attributes Array",
	fields: $structure.whitelist.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE,
});

const READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.whitelist.system.graphql.QUERY__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE),
	args: {
		// note: this is temporary so we can test the access control logic without maintaining a session
		// todo: remove this once we set up user authentication
		agent_id: {
			description: "agent_id",
			type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		parent: {
			description: "parent",
			type: PARENT__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: ATTRIBUTES__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: ATTRIBUTES_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: ATTRIBUTES_ARRAY__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "query_arguments", query_arguments);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "access:agent_id", context.agent_id);
		return CONTROLLER__WHITELIST__CONTROLLER__SYSTEM.read(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
				agent_id: context.agent_id,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

export { READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM };
