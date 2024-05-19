import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array, create_fields_string } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = $abstract.entities.a2b8dbc3427b41a9899e11671c2422c7.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96__Metadata",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = $abstract.entities.a2b8dbc3427b41a9899e11671c2422c7.default($abstract).graphql_attributes_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = create_fields_array(
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
);

const ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = create_fields_string(
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
);

const ATTRIBUTES__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96__Attributes",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const WHERE_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = $abstract.entities.a2b8dbc3427b41a9899e11671c2422c7.default($abstract).graphql_where_fields;

const WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = create_fields_array(WHERE_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE);

const WHERE_FIELDS_STRING__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = create_fields_string(
	WHERE_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
);

const WHERE__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96__Where",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Where",
	fields: () => WHERE_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
		description: "ba381b0cc764c4c9a187b716ae94ed96 Query Relationships Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "ba381b0cc764c4c9a187b716ae94ed96 Query Relationships Direction",
	},
	//read_entity: ENTITY_READ_QUERY
};

const QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query__Relationships",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Query Relationships",
	fields: () => QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const QUERY_SOURCE_METADATA__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query__Source_Metadata",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Query Source Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const QUERY_SOURCE_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = {
	_metadata: {
		type: QUERY_SOURCE_METADATA__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
		description: "ba381b0cc764c4c9a187b716ae94ed96 Query Source Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "ba381b0cc764c4c9a187b716ae94ed96 Query Source Direction",
	},
};

const QUERY_SOURCE__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query__Source",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Query Source",
	fields: () => QUERY_SOURCE_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query__Query",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
		description: "ba381b0cc764c4c9a187b716ae94ed96 Mutation Metadata",
	},
	//create_entity: ENTITY_CREATE_MUTATION
};

const MUTATION_RELATIONSHIPS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Mutation__Relationships",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Mutation Relationships",
	fields: () => MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Mutation__Mutation",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
});

const FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
		description: "_metadata",
	},
	attributes: {
		type: ATTRIBUTES__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
		description: "attributes",
	},
};

const QUERY__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Query",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Query",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE.attributes,
		relationships: {
			type: QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
			description: "relationships",
		},
		relationships_to: {
			type: QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
			description: "relationships to",
		},
		relationships_from: {
			type: QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
			description: "relationships from",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "ba381b0cc764c4c9a187b716ae94ed96_Mutation",
	description: "ba381b0cc764c4c9a187b716ae94ed96 Mutation",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE.attributes,
		relationships: {
			type: MUTATION_RELATIONSHIPS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
			description: "relationships",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	QUERY__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	MUTATION__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	METADATA__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	ATTRIBUTES__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	WHERE__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	WHERE_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	WHERE_FIELDS_STRING__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	QUERY_RELATIONSHIPS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	QUERY_SOURCE__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	QUERY_SOURCE_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	MUTATION_RELATIONSHIPS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	QUERY_QUERY__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
};
