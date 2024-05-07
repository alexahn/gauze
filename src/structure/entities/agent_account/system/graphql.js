import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE = $abstract.entities.agent_account.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Account__Metadata",
	description: "Agent_Account Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE = $abstract.entities.agent_account.default($abstract).graphql_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE);

const ATTRIBUTES__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Account__Attributes",
	description: "Agent_Account Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Account_Query__Query",
	description: "Agent_Account Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Account_Mutation__Mutation",
	description: "Agent_Account Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
});

const QUERY__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Account_Query",
	description: "Agent_Account",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Account_Mutation",
	description: "Agent_Account",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	QUERY__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	MUTATION__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	METADATA__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	ATTRIBUTES__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	QUERY_QUERY__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
};
