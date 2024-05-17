import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array, create_fields_string } from "./../../../gauze/utility.js";

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

const ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = $abstract.entities.agent_root.default($abstract).graphql_attributes_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE);

const ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = create_fields_string(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE);

const ATTRIBUTES__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Root__Attributes",
	description: "Agent_Root Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
});

const WHERE_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = $abstract.entities.agent_root.default($abstract).graphql_where_fields;

const WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = create_fields_array(WHERE_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE);

const WHERE_FIELDS_STRING__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = create_fields_string(WHERE_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE);

const WHERE__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Root__Where",
	description: "Agent_Root Where",
	fields: () => WHERE_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
});

const QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
		description: "Agent_Root Query Metadata",
	},
	//read_entity2: ENTITY2_READ_QUERY
};

const QUERY_RELATIONSHIPS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Root_Query__Relationships",
	description: "Agent_Root Query Relationships",
	fields: () => QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Root_Query__Query",
	description: "Agent_Root Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
});

const MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
		description: "Agent_Root Mutation Metadata",
	},
	//create_entity2: ENTITY2_CREATE_MUTATION
};

const MUTATION_RELATIONSHIPS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Root_Mutation__Relationships",
	description: "Agent_Root Mutation Relationships",
	fields: () => MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Root_Mutation__Mutation",
	description: "Agent_Root Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
});

const FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
		description: "_metadata",
	},
	attributes: {
		type: ATTRIBUTES__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
		description: "attributes",
	},
};

const QUERY__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Root_Query",
	description: "Agent_Root Query",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE.attributes,
		relationships: {
			type: QUERY_RELATIONSHIPS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
			description: "relationships",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Agent_Root_Mutation",
	description: "Agent_Root Mutation",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE.attributes,
		relationships: {
			type: MUTATION_RELATIONSHIPS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
			description: "relationships",
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
	ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	WHERE__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	WHERE_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	WHERE_FIELDS_STRING__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	QUERY_RELATIONSHIPS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	MUTATION_RELATIONSHIPS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	QUERY_QUERY__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
};
