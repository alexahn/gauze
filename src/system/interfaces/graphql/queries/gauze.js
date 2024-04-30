import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__GAUZE__CONTROLLER__SYSTEM } from "./../../../controllers/gauze.js";

const SERIALIZER__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.gauze.system.graphql.TYPE__GRAPHQL__SYSTEM__GAUZE__STRUCTURE,
	sql_primary_key: $structure.gauze.database.sql.PRIMARY_KEY__SQL__DATABASE__GAUZE__STRUCTURE,
});

const PARENT__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Query__Parent",
	description: "Gauze Parent",
	fields: () => $structure.gauze.system.graphql.METADATA_FIELDS__GRAPHQL__SYSTEM__GAUZE__STRUCTURE,
});

const ATTRIBUTES__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Query__Attributes",
	description: "Gauze Query Attributes",
	fields: $structure.gauze.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__GAUZE__STRUCTURE,
});

const ATTRIBUTES_ARRAY__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Query__Attributes_Array",
	description: "Gauze Query Attributes Array",
	fields: $structure.gauze.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__GAUZE__STRUCTURE,
});

const READ__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.system.graphql.QUERY__GRAPHQL__SYSTEM__GAUZE__STRUCTURE),
	args: {
		// note: this is temporary so we can test the access control logic without maintaining a session
		// todo: remove this once we set up user authentication
		agent_id: {
			description: "agent_id",
			type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		},
		parent: {
			description: "parent",
			type: PARENT__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: ATTRIBUTES__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: ATTRIBUTES_ARRAY__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: ATTRIBUTES_ARRAY__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "query_arguments", query_arguments);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter", "access:agent_id", context.agent_id);
		return CONTROLLER__GAUZE__CONTROLLER__SYSTEM.read(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
				agent_id: context.agent_id,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success", "data", data);
			return data.map(SERIALIZER__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM.serialize);
		});
	},
};

export { READ__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM };
