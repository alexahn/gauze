import * as $abstract from "./../../../abstract/index.js";

import { create_fields_array } from "./../../utility.js";

const TYPE__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = "ENTITY1";

const METADATA_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity1__Metadata",
	description: "Entity1 Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = $abstract.entities.entity1.default($abstract).graphql_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE);

const ATTRIBUTES__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity1__Attributes",
	description: "Entity1 Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
});

const QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
		description: "Entity1 Query Metadata",
	},
	//read_entity2: ENTITY2_READ_QUERY
};

const QUERY_RELATIONSHIPS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity1_Query__Relationships",
	description: "Entity1 Query Relationships",
	fields: () => QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity1_Query__Query",
	description: "Entity1 Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
});

const MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
		description: "Entity1 Mutation Metadata",
	},
	//create_entity2: ENTITY2_CREATE_MUTATION
};

const MUTATION_RELATIONSHIPS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity1_Mutation__Relationships",
	description: "Entity1 Mutation Relationships",
	fields: () => MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity1_Mutation__Mutation",
	description: "Entity1 Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
});

const FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
		description: "_metadata",
	},
	attributes: {
		type: ATTRIBUTES__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
		description: "attributes",
	},
};

const QUERY__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity1_Query",
	description: "Entity1 Query",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE.attributes,
		relationships: {
			type: QUERY_RELATIONSHIPS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
			description: "relationships",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity1_Mutation",
	description: "Entity1 Mutation",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE.attributes,
		relationships: {
			type: MUTATION_RELATIONSHIPS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
			description: "relationships",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	QUERY__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	MUTATION__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	METADATA__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	ATTRIBUTES__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	QUERY_RELATIONSHIPS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	MUTATION_RELATIONSHIPS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	QUERY_QUERY__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
};
