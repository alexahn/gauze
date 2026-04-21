const SCHEMA_FIELDS__SCHEMA__STRUCTURE = {
	name: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "schema name",
	},
	definition: {
		type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		description: "schema definition",
	},
};

const SCHEMA_TYPE__SCHEMA__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "GraphQL_Schema",
	description: "graphql schema",
	fields: () => SCHEMA_FIELDS__HEADER__STRUCTURE,
});

export { SCHEMA_TYPE__SCHEMA__STRUCTURE, SCHEMA_FIELDS__SCHEMA__STRUCTURE };
