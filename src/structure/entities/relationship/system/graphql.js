import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = $abstract.entities.relationship.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship__Metadata",
	description: "Relationship Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = $abstract.entities.relationship.default($abstract).graphql_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE);

const ATTRIBUTES__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship__Attributes",
	description: "Relationship Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Query__Query",
	description: "Relationship Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Mutation__Mutation",
	description: "Relationship Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
});

const QUERY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Query",
	description: "Relationship",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Relationship_Mutation",
	description: "Relationship",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	QUERY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	METADATA__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	ATTRIBUTES__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	QUERY_QUERY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
};
