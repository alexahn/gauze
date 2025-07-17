import { GraphQLSchema } from "graphql";

import * as $abstract from "./../../../abstract/index.js";
import * as $structure from "./../../../structure/index.js";
import * as $kernel from "./../../../kernel/index.js";

// ezuag
import { CONNECTION__EZUAG__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__EZUAG__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/ezuag.js";

// ytitne
import { CONNECTION__YTITNE__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__YTITNE__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/ytitne.js";

// relationship
import { CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/relationship.js";

// whitelist
import { CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/whitelist.js";

// blacklist
import { CONNECTION__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/blacklist.js";

// entity
import { CONNECTION__ENTITY__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__ENTITY__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/entity.js";

const ENTITIES = {
	[$structure.entities.ezuag.system.graphql.TYPE__GRAPHQL__SYSTEM__EZUAG__STRUCTURE]: CONNECTION__EZUAG__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.ytitne.system.graphql.TYPE__GRAPHQL__SYSTEM__YTITNE__STRUCTURE]: CONNECTION__YTITNE__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.relationship.system.graphql.TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE]: CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.whitelist.system.graphql.TYPE__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE]: CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.blacklist.system.graphql.TYPE__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE]: CONNECTION__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.entity.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY__STRUCTURE]: CONNECTION__ENTITY__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
};

const METHODS = {
	[$structure.entities.ezuag.system.graphql.TYPE__GRAPHQL__SYSTEM__EZUAG__STRUCTURE]: METHODS__EZUAG__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.ytitne.system.graphql.TYPE__GRAPHQL__SYSTEM__YTITNE__STRUCTURE]: METHODS__YTITNE__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.relationship.system.graphql.TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE]: METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.whitelist.system.graphql.TYPE__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE]: METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.blacklist.system.graphql.TYPE__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE]: METHODS__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.entity.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY__STRUCTURE]: METHODS__ENTITY__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
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

$kernel.src.linker.HEADER__LINKER__SRC__KERNEL("system", QUERY_FIELDS, ENTITIES);
$kernel.src.linker.LINK_RELATIONSHIPS__LINKER__SRC__KERNEL(ENTITIES, METHODS, $structure.relationships.SYSTEM_RELATIONSHIPS__RELATIONSHIP__STRUCTURE);
$kernel.src.linker.LINK_ROOT__LINKER__SRC__KERNEL(QUERY_FIELDS, MUTATION_FIELDS, METHODS);

const SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM = new GraphQLSchema({
	query: QUERY_TYPE,
	mutation: MUTATION_TYPE,
});

export { SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM };
