import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE = $abstract.entities.agent_character.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character__Metadata",
	description: "Agent_Character Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE = $abstract.entities.agent_character.default($abstract).graphql_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE);

const ATTRIBUTES__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character__Attributes",
	description: "Agent_Character Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Query__Query",
	description: "Agent_Character Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Mutation__Mutation",
	description: "Agent_Character Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
});

const QUERY__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Query",
	description: "Agent_Character",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Character_Mutation",
	description: "Agent_Character",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	QUERY__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	MUTATION__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	METADATA__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	ATTRIBUTES__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	QUERY_QUERY__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
};
