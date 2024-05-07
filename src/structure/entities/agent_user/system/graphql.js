import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE = $abstract.entities.agent_user.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_User__Metadata",
	description: "Agent_User Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE = $abstract.entities.agent_user.default($abstract).graphql_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE);

const ATTRIBUTES__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_User__Attributes",
	description: "Agent_User Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_User_Query__Query",
	description: "Agent_User Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_User_Mutation__Mutation",
	description: "Agent_User Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
});

const QUERY__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_User_Query",
	description: "Agent_User",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_User_Mutation",
	description: "Agent_User",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	QUERY__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	MUTATION__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	METADATA__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	ATTRIBUTES__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	QUERY_QUERY__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
};
