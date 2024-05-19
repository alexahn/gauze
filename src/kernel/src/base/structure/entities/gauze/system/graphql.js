import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array, create_fields_string } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = $abstract.entities.a543731262804f64adcc0eae1a225acc.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc__Metadata",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = $abstract.entities.a543731262804f64adcc0eae1a225acc.default($abstract).graphql_attributes_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = create_fields_array(
	ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
);

const ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = create_fields_string(
	ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
);

const ATTRIBUTES__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc__Attributes",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const WHERE_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = $abstract.entities.a543731262804f64adcc0eae1a225acc.default($abstract).graphql_where_fields;

const WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = create_fields_array(WHERE_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE);

const WHERE_FIELDS_STRING__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = create_fields_string(WHERE_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE);

const WHERE__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc__Where",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Where",
	fields: () => WHERE_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const QUERY_SOURCE_METADATA__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Query__Source_Metadata",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Query Source Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const QUERY_SOURCE_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = {
	_metadata: {
		type: QUERY_SOURCE_METADATA__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
		description: "bb95d174a16f4ddd935ff3a802f7c7bc Query Source Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "bb95d174a16f4ddd935ff3a802f7c7bc Query Source Direction",
	},
};

const QUERY_SOURCE__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Query__Source",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Query Source",
	fields: () => QUERY_SOURCE_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Query__Query",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation__Mutation",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const QUERY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Query",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "bb95d174a16f4ddd935ff3a802f7c7bc_Mutation",
	description: "bb95d174a16f4ddd935ff3a802f7c7bc",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	QUERY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	MUTATION__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	METADATA__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	ATTRIBUTES__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	WHERE__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	WHERE_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	WHERE_FIELDS_STRING__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	QUERY_SOURCE__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	QUERY_SOURCE_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	QUERY_QUERY__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
};
