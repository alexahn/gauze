import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array, create_fields_string } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = $abstract.entities.relationship.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship__Metadata",
	description: "Relationship Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = $abstract.entities.relationship.default($abstract).graphql_attributes_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE);

const ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = create_fields_string(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE);

const ATTRIBUTES__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship__Attributes",
	description: "Relationship Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const SOURCE_METADATA__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship__Source_Metadata",
	description: "Relationship Source Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const SOURCE_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = {
	_metadata: {
		type: SOURCE_METADATA__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
		description: "Relationship Source Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Relationship Source Direction",
	},
};

const SOURCE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship__Source",
	description: "Relationship Source",
	fields: () => SOURCE_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const WHERE_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = $abstract.entities.relationship.default($abstract).graphql_where_fields;

const WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = create_fields_array(WHERE_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE);

const WHERE_FIELDS_STRING__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = create_fields_string(WHERE_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE);

const WHERE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship__Where",
	description: "Relationship Where",
	fields: () => WHERE_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Query__Query",
	description: "Relationship Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Mutation__Mutation",
	description: "Relationship Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
});

const QUERY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Query",
	description: "Relationship",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Mutation",
	description: "Relationship",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	QUERY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	MUTATION__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	METADATA__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	ATTRIBUTES__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	SOURCE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	SOURCE_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	WHERE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	WHERE_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	WHERE_FIELDS_STRING__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	QUERY_QUERY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
};
