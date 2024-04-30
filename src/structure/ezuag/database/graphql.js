import * as $abstract from "./../../../abstract/index.js";

import { create_fields_array } from "./../../utility.js";

const TYPE__GRAPHQL__DATABASE__EZUAG__STRUCTURE = $abstract.entities.ezuag.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__DATABASE__EZUAG__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag__Metadata",
	description: "Ezuag Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE = $abstract.entities.ezuag.default($abstract).graphql_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__EZUAG__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE);

const ATTRIBUTES__GRAPHQL__DATABASE__EZUAG__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag__Attributes",
	description: "Ezuag Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__DATABASE__EZUAG__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag_Query__Query",
	description: "Ezuag Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__DATABASE__EZUAG__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag_Mutation__Mutation",
	description: "Ezuag Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
});

const QUERY__GRAPHQL__DATABASE__EZUAG__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag_Query",
	description: "Ezuag",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__DATABASE__EZUAG__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Ezuag_Mutation",
	description: "Ezuag",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	QUERY__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	MUTATION__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	METADATA__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	ATTRIBUTES__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	QUERY_QUERY__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
};
