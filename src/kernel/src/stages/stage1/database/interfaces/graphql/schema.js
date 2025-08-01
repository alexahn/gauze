import { GraphQLSchema } from "graphql";

import * as $abstract from "./../../../abstract/index.js";
import * as $structure from "./../../../structure/index.js";
import * as $kernel from "./../../../kernel/index.js";

// relationship
import { CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/relationship.js";

const ENTITIES = {
	[$structure.entities.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE,
};

const METHODS = {
	[$structure.entities.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE,
};

const QUERY_FIELDS = {};
const MUTATION_FIELDS = {};

const QUERY_TYPE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Query",
	fields: () => QUERY_FIELDS,
});

const MUTATION_TYPE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Mutation",
	fields: () => MUTATION_FIELDS,
});

$kernel.src.linker.HEADER__LINKER__SRC__KERNEL("database", QUERY_FIELDS, ENTITIES);
$kernel.src.linker.LINK_RELATIONSHIPS__LINKER__SRC__KERNEL(ENTITIES, METHODS, $structure.relationships.DATABASE_RELATIONSHIPS__RELATIONSHIP__STRUCTURE);
$kernel.src.linker.LINK_ROOT__LINKER__SRC__KERNEL(QUERY_FIELDS, MUTATION_FIELDS, METHODS);

const SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE = new GraphQLSchema({
	query: QUERY_TYPE,
	mutation: MUTATION_TYPE,
});

export { SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE };
