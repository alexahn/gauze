import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array, create_fields_string } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__DATABASE__SESSION__STRUCTURE = $abstract.entities.session.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__DATABASE__SESSION__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Session__Metadata",
	description: "Session Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE = $abstract.entities.session.default($abstract).graphql_attributes_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__SESSION__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE);

const ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__SESSION__STRUCTURE = create_fields_string(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE);

const ATTRIBUTES__GRAPHQL__DATABASE__SESSION__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Session__Attributes",
	description: "Session Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
});

const SOURCE_METADATA__GRAPHQL__DATABASE__SESSION__STRUCTURE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Session__Source_Metadata",
	description: "Session Source Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
});

const SOURCE_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE = {
	_metadata: {
		type: SOURCE_METADATA__GRAPHQL__DATABASE__SESSION__STRUCTURE,
		description: "Session Source Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Session Source Direction",
	},
};

const SOURCE__GRAPHQL__DATABASE__SESSION__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Session__Source",
	description: "Session Source",
	fields: () => SOURCE_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
});

const WHERE_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE = $abstract.entities.session.default($abstract).graphql_where_fields;

const WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__SESSION__STRUCTURE = create_fields_array(WHERE_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE);

const WHERE_FIELDS_STRING__GRAPHQL__DATABASE__SESSION__STRUCTURE = create_fields_string(WHERE_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE);

const WHERE__GRAPHQL__DATABASE__SESSION__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Session__Where",
	description: "Session Where",
	fields: () => WHERE_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
});

const QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__SESSION__STRUCTURE,
		description: "Session Query Relationships To Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Session Query Relationships To Direction",
	},
	//read_entity: ENTITY_READ_QUERY
};

const QUERY_RELATIONSHIPS_TO__GRAPHQL__DATABASE__SESSION__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Session_Query__Relationships_To",
	description: "Session Query Relationships_To",
	fields: () => QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
});

const QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__SESSION__STRUCTURE,
		description: "Session Query Relationships From Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Session Query Relationships From Direction",
	},
	//read_entity: ENTITY_READ_QUERY
};

const QUERY_RELATIONSHIPS_FROM__GRAPHQL__DATABASE__SESSION__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Session_Query__Relationships_From",
	description: "Session Query Relationships_From",
	fields: () => QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__DATABASE__SESSION__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Session_Query__Query",
	description: "Session Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
});

const MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__SESSION__STRUCTURE,
		description: "Session Mutation Relationship To Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Session Mutation Relationship To Direction",
	},
	//create_entity: ENTITY_CREATE_MUTATION
};

const MUTATION_RELATIONSHIPS_TO__GRAPHQL__DATABASE__SESSION__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Session_Mutation__Relationships_To",
	description: "Session Mutation Relationships To",
	fields: () => MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
});

const MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__SESSION__STRUCTURE,
		description: "Session Mutation Relationship From Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Session Mutation Relationship From Direction",
	},
	//create_entity: ENTITY_CREATE_MUTATION
};

const MUTATION_RELATIONSHIPS_FROM__GRAPHQL__DATABASE__SESSION__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Session_Mutation__Relationships_From",
	description: "Session Mutation Relationships From",
	fields: () => MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__DATABASE__SESSION__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Session_Mutation__Mutation",
	description: "Session Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
});

const FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__DATABASE__SESSION__STRUCTURE,
		description: "_metadata",
	},
	attributes: {
		type: ATTRIBUTES__GRAPHQL__DATABASE__SESSION__STRUCTURE,
		description: "attributes",
	},
};

const QUERY__GRAPHQL__DATABASE__SESSION__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Session_Query",
	description: "Session Query",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE.attributes,
		relationships_to: {
			type: QUERY_RELATIONSHIPS_TO__GRAPHQL__DATABASE__SESSION__STRUCTURE,
			description: "relationships to",
		},
		relationships_from: {
			type: QUERY_RELATIONSHIPS_FROM__GRAPHQL__DATABASE__SESSION__STRUCTURE,
			description: "relationships from",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__DATABASE__SESSION__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__DATABASE__SESSION__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Session_Mutation",
	description: "Session Mutation",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE.attributes,
		relationships_to: {
			type: MUTATION_RELATIONSHIPS_TO__GRAPHQL__DATABASE__SESSION__STRUCTURE,
			description: "relationships to",
		},
		relationships_from: {
			type: MUTATION_RELATIONSHIPS_FROM__GRAPHQL__DATABASE__SESSION__STRUCTURE,
			description: "relationships from",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__DATABASE__SESSION__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	QUERY__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	MUTATION__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	METADATA__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	ATTRIBUTES__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	ATTRIBUTES_FIELDS_STRING__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	SOURCE__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	SOURCE_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	WHERE__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	WHERE_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	WHERE_FIELDS_ARRAY__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	WHERE_FIELDS_STRING__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	QUERY_RELATIONSHIPS_TO__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	QUERY_RELATIONSHIPS_FROM__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	MUTATION_RELATIONSHIPS_TO__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	MUTATION_RELATIONSHIPS_FROM__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	QUERY_QUERY__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
};
