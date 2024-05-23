import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array, create_fields_string } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = $abstract.entities.blacklist.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist__Metadata",
	description: "Blacklist Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = $abstract.entities.blacklist.default($abstract).graphql_attributes_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE);

const ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = create_fields_string(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE);

const ATTRIBUTES__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist__Attributes",
	description: "Blacklist Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
});

const WHERE_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = $abstract.entities.blacklist.default($abstract).graphql_where_fields;

const WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = create_fields_array(WHERE_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE);

const WHERE_FIELDS_STRING__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = create_fields_string(WHERE_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE);

const WHERE__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist__Where",
	description: "Blacklist Where",
	fields: () => WHERE_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
});

const QUERY_SOURCE_METADATA__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Query__Source_Metadata",
	description: "Blacklist Query Source Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
});

const QUERY_SOURCE_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = {
	_metadata: {
		type: QUERY_SOURCE_METADATA__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
		description: "Blacklist Query Source Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Blacklist Query Source Direction",
	},
};

const QUERY_SOURCE__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Query__Source",
	description: "Blacklist Query Source",
	fields: () => QUERY_SOURCE_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
});

const SOURCE_METADATA__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist__Source_Metadata",
	description: "Blacklist Source Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
});

const SOURCE_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = {
	_metadata: {
		type: SOURCE_METADATA__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
		description: "Blacklist Source Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Blacklist Source Direction",
	},
};

const SOURCE__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist__Source",
	description: "Blacklist Source",
	fields: () => SOURCE_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Query__Query",
	description: "Blacklist Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Mutation__Mutation",
	description: "Blacklist Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
});

const QUERY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Query",
	description: "Blacklist",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Blacklist_Mutation",
	description: "Blacklist",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	QUERY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	MUTATION__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	METADATA__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	ATTRIBUTES__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	WHERE__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	WHERE_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	WHERE_FIELDS_STRING__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	SOURCE__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	SOURCE_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	QUERY_SOURCE__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	QUERY_SOURCE_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	QUERY_QUERY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
};
