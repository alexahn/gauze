import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array, create_fields_string } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__DATABASE__GAUZE__STRUCTURE = $abstract.entities.gauze.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__DATABASE__GAUZE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze__Metadata",
	description: "Gauze Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE = $abstract.entities.gauze.default($abstract).graphql_attributes_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__GAUZE__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE);

const ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__GAUZE__STRUCTURE = create_fields_string(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE);

const ATTRIBUTES__GRAPHQL__DATABASE__GAUZE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze__Attributes",
	description: "Gauze Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const WHERE_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE = $abstract.entities.gauze.default($abstract).graphql_where_fields;

const WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__GAUZE__STRUCTURE = create_fields_array(WHERE_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE);

const WHERE_FIELDS_STRING__GRAPHQL__DATABASE__GAUZE__STRUCTURE = create_fields_string(WHERE_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE);

const WHERE__GRAPHQL__DATABASE__GAUZE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze__Where",
	description: "Gauze Where",
	fields: () => WHERE_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const QUERY_SOURCE_METADATA__GRAPHQL__DATABASE__GAUZE__STRUCTURE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Query__Source_Metadata",
	description: "Gauze Query Source Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const QUERY_SOURCE_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE = {
	_metadata: {
		type: QUERY_SOURCE_METADATA__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
		description: "Gauze Query Source Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Gauze Query Source Direction",
	},
};

const QUERY_SOURCE__GRAPHQL__DATABASE__GAUZE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Query__Source",
	description: "Gauze Query Source",
	fields: () => QUERY_SOURCE_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const SOURCE_METADATA__GRAPHQL__DATABASE__GAUZE__STRUCTURE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze__Source_Metadata",
	description: "Gauze Source Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const SOURCE_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE = {
	_metadata: {
		type: SOURCE_METADATA__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
		description: "Gauze Source Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Gauze Source Direction",
	},
};

const SOURCE__GRAPHQL__DATABASE__GAUZE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze__Source",
	description: "Gauze Source",
	fields: () => SOURCE_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__DATABASE__GAUZE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Query__Query",
	description: "Gauze Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__DATABASE__GAUZE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Mutation__Mutation",
	description: "Gauze Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
});

const QUERY__GRAPHQL__DATABASE__GAUZE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Query",
	description: "Gauze",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__DATABASE__GAUZE__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Gauze_Mutation",
	description: "Gauze",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	QUERY__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	MUTATION__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	METADATA__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	ATTRIBUTES__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	WHERE__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	WHERE_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	WHERE_FIELDS_STRING__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	SOURCE__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	SOURCE_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	QUERY_SOURCE__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	QUERY_SOURCE_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	QUERY_QUERY__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
};
