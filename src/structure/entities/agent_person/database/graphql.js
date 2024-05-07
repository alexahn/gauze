import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE = $abstract.entities.agent_person.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person__Metadata",
	description: "Agent_Person Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE = $abstract.entities.agent_person.default($abstract).graphql_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE);

const ATTRIBUTES__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person__Attributes",
	description: "Agent_Person Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Query__Query",
	description: "Agent_Person Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Mutation__Mutation",
	description: "Agent_Person Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const QUERY__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Query",
	description: "Agent_Person",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Person_Mutation",
	description: "Agent_Person",
	fields: () => ({
		_metadata: {
			type: METADATA__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	QUERY__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	MUTATION__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	METADATA__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	ATTRIBUTES__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	QUERY_QUERY__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
};
