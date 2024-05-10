import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array, create_fields_string } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = $abstract.entities.entity.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity__Metadata",
	description: "Entity Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = $abstract.entities.entity.default($abstract).graphql_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE);

const ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = create_fields_string(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE);

const ATTRIBUTES__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity__Attributes",
	description: "Entity Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
		description: "Entity Query Metadata",
	},
	//read_entity2: ENTITY2_READ_QUERY
};

const QUERY_RELATIONSHIPS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Relationships",
	description: "Entity Query Relationships",
	fields: () => QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Query",
	description: "Entity Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
		description: "Entity Mutation Metadata",
	},
	//create_entity2: ENTITY2_CREATE_MUTATION
};

const MUTATION_RELATIONSHIPS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Mutation__Relationships",
	description: "Entity Mutation Relationships",
	fields: () => MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Mutation__Mutation",
	description: "Entity Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
		description: "_metadata",
	},
	attributes: {
		type: ATTRIBUTES__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
		description: "attributes",
	},
};

const QUERY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query",
	description: "Entity Query",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE.attributes,
		relationships: {
			type: QUERY_RELATIONSHIPS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
			description: "relationships",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Mutation",
	description: "Entity Mutation",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE.attributes,
		relationships: {
			type: MUTATION_RELATIONSHIPS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
			description: "relationships",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	QUERY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	MUTATION__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	METADATA__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	ATTRIBUTES__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	QUERY_RELATIONSHIPS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	MUTATION_RELATIONSHIPS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	QUERY_QUERY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
};
