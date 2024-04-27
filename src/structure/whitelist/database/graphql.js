import * as $abstract from "./../../../abstract/index.js";

import { create_fields_array } from "./../../utility.js";

const TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = "WHITELIST";

const METADATA_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist__Metadata",
	description: "Whitelist Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = $abstract.entities.whitelist.default($abstract).graphql_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE);

const ATTRIBUTES__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist__Attributes",
	description: "Whitelist Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query__Query",
	description: "Whitelist Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Mutation__Mutation",
	description: "Whitelist Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const QUERY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Query",
	description: "Whitelist",
	fields: () => ({
		metadata: {
			type: METADATA__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Whitelist_Mutation",
	description: "Whitelist",
	fields: () => ({
		metadata: {
			type: METADATA__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	QUERY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	MUTATION__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	METADATA__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	ATTRIBUTES__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	QUERY_QUERY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
};
