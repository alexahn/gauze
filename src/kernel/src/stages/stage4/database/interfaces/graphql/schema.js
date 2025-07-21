import { GraphQLSchema } from "graphql";

import * as $abstract from "./../../../abstract/index.js";
import * as $structure from "./../../../structure/index.js";
import * as $kernel from "./../../../kernel/index.js";

// relationship
import { CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/relationship.js";

// whitelist
import { CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/whitelist.js";

// blacklist
import { CONNECTION__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/blacklist.js";

// ezuag
import { CONNECTION__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/ezuag.js";

const ENTITIES = {
	[$structure.entities.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.whitelist.database.graphql.TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE]: CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.blacklist.database.graphql.TYPE__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE]: CONNECTION__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.ezuag.database.graphql.TYPE__GRAPHQL__DATABASE__EZUAG__STRUCTURE]: CONNECTION__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE,
};

const METHODS = {
	[$structure.entities.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.whitelist.database.graphql.TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE]: METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.blacklist.database.graphql.TYPE__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE]: METHODS__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.ezuag.database.graphql.TYPE__GRAPHQL__DATABASE__EZUAG__STRUCTURE]: METHODS__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE,
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
