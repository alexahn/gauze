import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__ENTITY2__CONTROLLER__DATABASE } from "./../../../controllers/entity2.js";

const SERIALIZER__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.entity2.database.graphql.TYPE__GRAPHQL__DATABASE__ENTITY2__STRUCTURE,
	sql_primary_key: $structure.entity2.database.sql.PRIMARY_KEY__SQL__DATABASE__ENTITY2__STRUCTURE,
});

const PARENT__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity2_Query__Parent",
	description: "Entity2 Parent",
	fields: () => $structure.entity2.database.graphql.METADATA_FIELDS__GRAPHQL__DATABASE__ENTITY2__STRUCTURE,
});

const ATTRIBUTES__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity2_Query__Attributes",
	description: "Entity2 Query Attributes",
	fields: $structure.entity2.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__ENTITY2__STRUCTURE,
});

const ATTRIBUTES_ARRAY__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity2_Query__Attributes_Array",
	description: "Entity2 Query Attributes Array",
	fields: $structure.entity2.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__ENTITY2__STRUCTURE,
});

const READ__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.entity2.database.graphql.QUERY__GRAPHQL__DATABASE__ENTITY2__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: PARENT__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where: {
			description: "where",
			type: ATTRIBUTES__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_in: {
			description: "where in",
			type: ATTRIBUTES_ARRAY__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: ATTRIBUTES_ARRAY__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "query_arguments", query_arguments);
		return CONTROLLER__ENTITY2__CONTROLLER__DATABASE.read(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(SERIALIZER__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE.serialize);
		});
	},
};

export { READ__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE };
