import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = $abstract.entities.agent_root.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Root__Metadata",
	description: "Agent_Root Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = $abstract.entities.agent_root.default($abstract).graphql_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE);

const ATTRIBUTES__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Root__Attributes",
	description: "Agent_Root Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Root_Query__Query",
	description: "Agent_Root Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Root_Mutation__Mutation",
	description: "Agent_Root Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
});

const QUERY__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Root_Query",
	description: "Agent_Root",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Root_Mutation",
	description: "Agent_Root",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	QUERY__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	MUTATION__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	METADATA__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	ATTRIBUTES__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	QUERY_QUERY__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
};
