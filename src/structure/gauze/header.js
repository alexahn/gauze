import * as $abstract from "./../../abstract/index.js";

const GRAPHQL_TYPE_FIELDS__HEADER__STRUCTURE = {
	name: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "graphql type name",
	},
	description: {
		type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		description: "graphql type description",
	},
};

const GRAPHQL_TYPE_TYPE__HEADER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "GraphQL_Type",
	description: "graphql type",
	fields: () => GRAPHQL_TYPE_FIELDS__HEADER__STRUCTURE,
});

const HEADER_FIELD_FIELDS__HEADER__STRUCTURE = {
	name: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "field name",
	},
	sql_type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "field sql_type",
	},
	graphql_type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT(GRAPHQL_TYPE_TYPE__HEADER__STRUCTURE),
		description: "field graphql_type",
	},
	description: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "field description",
	},
};

const HEADER_FIELD_TYPE__HEADER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Header_Field",
	description: "header",
	fields: () => HEADER_FIELD_FIELDS__HEADER__STRUCTURE,
});

const HEADER_METHOD_FIELDS__HEADER__STRUCTURE = {
	name: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "method name",
	},
	privacy: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "method privacy",
	},
	valid_agent_types: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT(
			new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		),
		description: "method valid_agent_types",
	},
};

const HEADER_METHOD_TYPE__HEADER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Header_Method",
	description: "method",
	fields: () => HEADER_METHOD_FIELDS__HEADER__STRUCTURE,
});

const HEADER_FIELDS__HEADER__STRUCTURE = {
	name: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "name",
	},
	table_name: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "table name",
	},
	primary_key: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "primary key",
	},
	graphql_meta_type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "graphql meta type",
	},
	fields: {
		type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(HEADER_FIELD_TYPE__HEADER__STRUCTURE),
		description: "fields",
	},
	methods: {
		type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(HEADER_METHOD_TYPE__HEADER__STRUCTURE),
		description: "methods",
	},
	attributes: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "graphql attributes",
	},
	attributes_query_type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "graphql attributes query type",
	},
	attributes_mutation_type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "graphql attributes mutation type",
	},
	attributes_string_query_type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "graphql attributes string query type",
	},
	relationships: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT(
			new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		),
		description: "graphql relationships",
	},
};

const HEADER_TYPE__HEADER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Header",
	description: "header",
	fields: () => HEADER_FIELDS__HEADER__STRUCTURE,
});

export {
	GRAPHQL_TYPE_FIELDS__HEADER__STRUCTURE,
	GRAPHQL_TYPE_TYPE__HEADER__STRUCTURE,
	HEADER_FIELD_FIELDS__HEADER__STRUCTURE,
	HEADER_FIELD_TYPE__HEADER__STRUCTURE,
	HEADER_FIELDS__HEADER__STRUCTURE,
	HEADER_TYPE__HEADER__STRUCTURE,
};
