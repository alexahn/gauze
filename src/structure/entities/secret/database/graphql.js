import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array, create_fields_string } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__DATABASE__SECRET__STRUCTURE = $abstract.entities.secret.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__DATABASE__SECRET__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret__Metadata",
	description: "Secret Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE = $abstract.entities.secret.default($abstract).graphql_attributes_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__SECRET__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE);

const ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__SECRET__STRUCTURE = create_fields_string(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE);

const ATTRIBUTES__GRAPHQL__DATABASE__SECRET__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret__Attributes",
	description: "Secret Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
});

const WHERE_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE = $abstract.entities.secret.default($abstract).graphql_where_fields;

const WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__SECRET__STRUCTURE = create_fields_array(WHERE_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE);

const WHERE_FIELDS_STRING__GRAPHQL__DATABASE__SECRET__STRUCTURE = create_fields_string(WHERE_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE);

const WHERE__GRAPHQL__DATABASE__SECRET__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret__Where",
	description: "Secret Where",
	fields: () => WHERE_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
});

const QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__SECRET__STRUCTURE,
		description: "Secret Query Relationships Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Secret Query Relationships Direction",
	},
	//read_entity: ENTITY_READ_QUERY
};

const QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__SECRET__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Query__Relationships",
	description: "Secret Query Relationships",
	fields: () => QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
});

const QUERY_SOURCE_METADATA__GRAPHQL__DATABASE__SECRET__STRUCTURE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Query__Source_Metadata",
	description: "Secret Query Source Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
});

const QUERY_SOURCE_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE = {
	_metadata: {
		type: QUERY_SOURCE_METADATA__GRAPHQL__DATABASE__SECRET__STRUCTURE,
		description: "Secret Query Source Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Secret Query Source Direction",
	},
};

const QUERY_SOURCE__GRAPHQL__DATABASE__SECRET__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Query__Source",
	description: "Secret Query Source",
	fields: () => QUERY_SOURCE_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__DATABASE__SECRET__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Query__Query",
	description: "Secret Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
});

const MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__SECRET__STRUCTURE,
		description: "Secret Mutation Metadata",
	},
	//create_entity: ENTITY_CREATE_MUTATION
};

const MUTATION_RELATIONSHIPS__GRAPHQL__DATABASE__SECRET__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Mutation__Relationships",
	description: "Secret Mutation Relationships",
	fields: () => MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__DATABASE__SECRET__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Mutation__Mutation",
	description: "Secret Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
});

const FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__SECRET__STRUCTURE,
		description: "_metadata",
	},
	attributes: {
		type: ATTRIBUTES__GRAPHQL__DATABASE__SECRET__STRUCTURE,
		description: "attributes",
	},
};

const QUERY__GRAPHQL__DATABASE__SECRET__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Query",
	description: "Secret Query",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE.attributes,
		relationships: {
			type: QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
			description: "relationships",
		},
		relationships_to: {
			type: QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
			description: "relationships to",
		},
		relationships_from: {
			type: QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
			description: "relationships from",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__DATABASE__SECRET__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__DATABASE__SECRET__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Secret_Mutation",
	description: "Secret Mutation",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE.attributes,
		relationships: {
			type: MUTATION_RELATIONSHIPS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
			description: "relationships",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__DATABASE__SECRET__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	QUERY__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	MUTATION__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	METADATA__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	ATTRIBUTES__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	WHERE__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	WHERE_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	WHERE_FIELDS_STRING__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	QUERY_SOURCE__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	QUERY_SOURCE_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	MUTATION_RELATIONSHIPS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	QUERY_QUERY__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
};
