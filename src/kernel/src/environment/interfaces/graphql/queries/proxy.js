import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";
import * as $system from "./../../../../system/index.js";

import { CONTROLLER__PROXY__CONTROLLER__ENVIRONMENT } from "./../../../controllers/proxy.js";

const SERIALIZER__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT = new $structure.gauze.serializers.GraphQLSerializer({
	graphql_type: $structure.entities.proxy.system.graphql.TYPE__GRAPHQL__SYSTEM__PROXY__STRUCTURE,
	sql_primary_key: $structure.entities.proxy.database.sql.PRIMARY_KEY__SQL__DATABASE__PROXY__STRUCTURE,
});

const READ__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entities.proxy.system.graphql.QUERY__GRAPHQL__SYSTEM__PROXY__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: $system.interfaces.graphql.queries.proxy.SOURCE__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: $system.interfaces.graphql.queries.proxy.WHERE__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: $system.interfaces.graphql.queries.proxy.WHERE_ARRAY__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: $system.interfaces.graphql.queries.proxy.WHERE_ARRAY__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_like: {
			description: "where like",
			type: $system.interfaces.graphql.queries.proxy.WHERE__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_between: {
			description: "where between",
			type: $system.interfaces.graphql.queries.proxy.WHERE_ARRAY__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
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
	resolve: (source, query_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT.resolve:enter", "source", source);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		return CONTROLLER__PROXY__CONTROLLER__ENVIRONMENT.read(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT.resolve:success", "data", data);
			return data.map(SERIALIZER__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT.serialize);
		});
	},
};

const COUNT__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.count.TYPE__COUNT__STRUCTURE),
	args: {
		source: {
			description: "source",
			type: $system.interfaces.graphql.queries.proxy.SOURCE__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		count: {
			description: "count",
			type: $system.interfaces.graphql.queries.proxy.WHERE_STRING__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where: {
			description: "where",
			type: $system.interfaces.graphql.queries.proxy.WHERE__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_in: {
			description: "where in",
			type: $system.interfaces.graphql.queries.proxy.WHERE_ARRAY__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_not_in: {
			description: "where not in",
			type: $system.interfaces.graphql.queries.proxy.WHERE_ARRAY__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_like: {
			description: "where like",
			type: $system.interfaces.graphql.queries.proxy.WHERE__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		where_between: {
			description: "where between",
			type: $system.interfaces.graphql.queries.proxy.WHERE_ARRAY__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	resolve: (source, query_arguments, context) => {
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "COUNT__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT.resolve:enter", "source", source);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"COUNT__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT.resolve:enter",
			"access:agent_id",
			context.agent_id,
		);
		return CONTROLLER__PROXY__CONTROLLER__ENVIRONMENT.count(
			context,
			{
				source,
			},
			query_arguments,
		).then(function (data) {
			$kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, "COUNT__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT.resolve:success", "data", data);
			return data;
		});
	},
};
export { READ__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT, COUNT__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT };
