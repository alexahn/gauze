import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__DATABASE__YTITNE__STRUCTURE = $abstract.entities.ytitne.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__DATABASE__YTITNE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne__Metadata",
	description: "Ytitne Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE = $abstract.entities.ytitne.default($abstract).graphql_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__YTITNE__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE);

const ATTRIBUTES__GRAPHQL__DATABASE__YTITNE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne__Attributes",
	description: "Ytitne Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
		description: "Ytitne Query Metadata",
	},
	//read_entity2: ENTITY2_READ_QUERY
};

const QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__YTITNE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Query__Relationships",
	description: "Ytitne Query Relationships",
	fields: () => QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__DATABASE__YTITNE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Query__Query",
	description: "Ytitne Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
		description: "Ytitne Mutation Metadata",
	},
	//create_entity2: ENTITY2_CREATE_MUTATION
};

const MUTATION_RELATIONSHIPS__GRAPHQL__DATABASE__YTITNE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Relationships",
	description: "Ytitne Mutation Relationships",
	fields: () => MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__DATABASE__YTITNE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation__Mutation",
	description: "Ytitne Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
});

const FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
		description: "_metadata",
	},
	attributes: {
		type: ATTRIBUTES__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
		description: "attributes",
	},
};

const QUERY__GRAPHQL__DATABASE__YTITNE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Query",
	description: "Ytitne Query",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE.attributes,
		relationships: {
			type: QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
			description: "relationships",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__DATABASE__YTITNE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ytitne_Mutation",
	description: "Ytitne Mutation",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE.attributes,
		relationships: {
			type: MUTATION_RELATIONSHIPS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
			description: "relationships",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	QUERY__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	MUTATION__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	METADATA__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	ATTRIBUTES__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	MUTATION_RELATIONSHIPS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	QUERY_QUERY__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
};
