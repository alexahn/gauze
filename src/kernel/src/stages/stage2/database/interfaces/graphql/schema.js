import { GraphQLSchema } from "graphql";

import * as $abstract from "./../../../abstract/index.js";
import * as $structure from "./../../../structure/index.js";
import * as $kernel from "./../../../kernel/index.js";


// relationship
import { CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/relationship.js";

// whitelist
import { CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/whitelist.js";

const ENTITIES = {
	[$structure.entities.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.whitelist.database.graphql.TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE]: CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE,
};

const METHODS = {
	[$structure.entities.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.whitelist.database.graphql.TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE]: METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE,
};

const QUERY_FIELDS = {};
const MUTATION_FIELDS = {};

const QUERY_TYPE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Query",
	fields: () => QUERY_FIELDS,
});

const MUTATION_TYPE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Mutation",
	fields: () => MUTATION_FIELDS,
});

$kernel.linker.HEADER__LINKER__KERNEL("database", QUERY_FIELDS, ENTITIES);
$kernel.linker.LINK_RELATIONSHIPS__LINKER__KERNEL(ENTITIES, METHODS, $structure.relationships.DATABASE_RELATIONSHIPS__RELATIONSHIP__STRUCTURE);
$kernel.linker.LINK_ROOT__LINKER__KERNEL(QUERY_FIELDS, MUTATION_FIELDS, METHODS);

const SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE = new GraphQLSchema({
	query: QUERY_TYPE,
	mutation: MUTATION_TYPE,
});

export { SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE };
