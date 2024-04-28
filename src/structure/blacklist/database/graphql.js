import * as $abstract from "./../../../abstract/index.js";

import { create_fields_array } from "./../../utility.js";

const TYPE__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = "BLACKLIST";

const METADATA_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist__Metadata",
	description: "Blacklist Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = {
	id: {
		type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		description: "id",
	},
	created_at: {
		type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		description: "created_at",
	},
	updated_at: {
		type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		description: "updated_at",
	},
	deleted_at: {
		type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		description: "updated_at",
	},
	text: {
		type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		description: "text",
	},
};

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE);

const ATTRIBUTES__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist__Attributes",
	description: "Blacklist Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
		description: "Blacklist Query Metadata",
	},
	//read_entity2: ENTITY2_READ_QUERY
};

const QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Query__Relationships",
	description: "Blacklist Query Relationships",
	fields: () => QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Query__Query",
	description: "Blacklist Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
		description: "Blacklist Mutation Metadata",
	},
	//create_entity2: ENTITY2_CREATE_MUTATION
};

const MUTATION_RELATIONSHIPS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Mutation__Relationships",
	description: "Blacklist Mutation Relationships",
	fields: () => MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Mutation__Mutation",
	description: "Blacklist Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
});

const FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
		description: "_metadata",
	},
	attributes: {
		type: ATTRIBUTES__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
		description: "attributes",
	},
};

const QUERY__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Query",
	description: "Blacklist Query",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE.attributes,
		relationships: {
			type: QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
			description: "relationships",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Mutation",
	description: "Blacklist Mutation",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE.attributes,
		relationships: {
			type: MUTATION_RELATIONSHIPS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
			description: "relationships",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	QUERY__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	MUTATION__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	METADATA__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	ATTRIBUTES__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	MUTATION_RELATIONSHIPS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	QUERY_QUERY__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
};
