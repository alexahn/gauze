import * as $abstract from "./../../../../abstract/index.js";

import { create_fields_array, create_fields_string } from "./../../../gauze/utility.js";

const TYPE__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = $abstract.entities.entity.default($abstract).graphql_meta_type;

const METADATA_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {
	id: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "id",
	},
	type: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "type",
	},
};

const METADATA__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity__Metadata",
	description: "Entity Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = $abstract.entities.entity.default($abstract).graphql_attributes_fields;

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE);

const ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = create_fields_string(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE);

const ATTRIBUTES__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity__Attributes",
	description: "Entity Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const SOURCE_METADATA__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity__Source_Metadata",
	description: "Entity Source Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const SOURCE_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {
	_metadata: {
		type: SOURCE_METADATA__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
		description: "Entity Source Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Entity Source Direction",
	},
};

const SOURCE__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity__Source",
	description: "Entity Source",
	fields: () => SOURCE_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const WHERE_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = $abstract.entities.entity.default($abstract).graphql_where_fields;

const WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = create_fields_array(WHERE_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE);

const WHERE_FIELDS_STRING__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = create_fields_string(WHERE_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE);

const WHERE__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity__Where",
	description: "Entity Where",
	fields: () => WHERE_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
		description: "Entity Query Relationships To Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Entity Query Relationships To Direction",
	},
	//read_entity: ENTITY_READ_QUERY
};

const QUERY_RELATIONSHIPS_TO__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Relationships_To",
	description: "Entity Query Relationships_To",
	fields: () => QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
		description: "Entity Query Relationships From Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Entity Query Relationships From Direction",
	},
	//read_entity: ENTITY_READ_QUERY
};

const QUERY_RELATIONSHIPS_FROM__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Relationships_From",
	description: "Entity Query Relationships_From",
	fields: () => QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query__Query",
	description: "Entity Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
		description: "Entity Mutation Relationship To Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Entity Mutation Relationship To Direction",
	},
	//create_entity: ENTITY_CREATE_MUTATION
};

const MUTATION_RELATIONSHIPS_TO__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Mutation__Relationships_To",
	description: "Entity Mutation Relationships To",
	fields: () => MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
		description: "Entity Mutation Relationship From Metadata",
	},
	_direction: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "Entity Mutation Relationship From Direction",
	},
	//create_entity: ENTITY_CREATE_MUTATION
};

const MUTATION_RELATIONSHIPS_FROM__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Mutation__Relationships_From",
	description: "Entity Mutation Relationships From",
	fields: () => MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Mutation__Mutation",
	description: "Entity Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
});

const FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = {
	_metadata: {
		type: METADATA__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
		description: "_metadata",
	},
	attributes: {
		type: ATTRIBUTES__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
		description: "attributes",
	},
};

const QUERY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Query",
	description: "Entity Query",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE.attributes,
		relationships_to: {
			type: QUERY_RELATIONSHIPS_TO__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
			description: "relationships to",
		},
		relationships_from: {
			type: QUERY_RELATIONSHIPS_FROM__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
			description: "relationships from",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__SYSTEM__ENTITY__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Entity_Mutation",
	description: "Entity Mutation",
	fields: () => ({
		_metadata: FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE._metadata,
		attributes: FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE.attributes,
		relationships_to: {
			type: MUTATION_RELATIONSHIPS_TO__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
			description: "relationships to",
		},
		relationships_from: {
			type: MUTATION_RELATIONSHIPS_FROM__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
			description: "relationships from",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	QUERY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	MUTATION__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	METADATA__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	ATTRIBUTES__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	ATTRIBUTES_FIELDS_STRING__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	SOURCE__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	SOURCE_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	WHERE__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	WHERE_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	WHERE_FIELDS_ARRAY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	WHERE_FIELDS_STRING__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	QUERY_RELATIONSHIPS_TO__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	QUERY_RELATIONSHIPS_FROM__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	MUTATION_RELATIONSHIPS_TO__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	MUTATION_RELATIONSHIPS_FROM__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	QUERY_QUERY__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
};
