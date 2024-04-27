import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $abstract from "./../../../../abstract/index.js";
import * as $kernel from "./../../../../kernel/index.js";
import * as $structure from "./../../../../structure/index.js";

import { RELATIONSHIP_CONTROLLER_DATABASE } from "./../../../controllers/relationship.js";

const RELATIONSHIP_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	sql_primary_key: $structure.relationship.database.sql.PRIMARY_KEY__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const RELATIONSHIP_PARENT_QUERY_INTERFACE_DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship__Parent",
	description: "Relationship Parent",
	fields: () => $structure.relationship.database.graphql.METADATA_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const RELATIONSHIP_ATTRIBUTES_QUERY_INTERFACE_DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Query__Attributes",
	description: "Relationship Query Attributes",
	fields: $structure.relationship.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const RELATIONSHIP_ATTRIBUTES_ARRAY_QUERY_INTERFACE_DATABASE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Query__Attributes_Array",
	description: "Relationship Query Attributes Array",
	fields: $structure.relationship.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE = {
	type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.relationship.database.graphql.QUERY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE),
	args: {
		parent: {
			description: "parent",
			type: RELATIONSHIP_PARENT_QUERY_INTERFACE_DATABASE,
		},
		where: {
			description: "where",
			type: RELATIONSHIP_ATTRIBUTES_QUERY_INTERFACE_DATABASE,
		},
		where_in: {
			description: "where in",
			type: RELATIONSHIP_ATTRIBUTES_ARRAY_QUERY_INTERFACE_DATABASE,
		},
		where_not_in: {
			description: "where not in",
			type: RELATIONSHIP_ATTRIBUTES_ARRAY_QUERY_INTERFACE_DATABASE,
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter", "_source", _source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write(
			"0",
			__RELATIVE_FILEPATH,
			"READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:enter",
			"query_arguments",
			query_arguments,
		);
		return RELATIONSHIP_CONTROLLER_DATABASE.read(
			{
				source: _source,
				database: context.database,
				transaction: context.transaction,
			},
			query_arguments,
		).then(function (data) {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, "READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE.resolve:success", "data", data);
			return data.map(RELATIONSHIP_SERIALIZER.serialize);
		});
	},
};

export { READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE };
