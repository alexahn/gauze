import { GraphQLSchema } from "graphql";

import * as $abstract from "./../../../abstract/index.js";
import * as $structure from "./../../../structure/index.js";
import * as $kernel from "./../../../kernel/index.js";

// ezuag
import { CONNECTION__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/ezuag.js";

// ytitne
import { CONNECTION__YTITNE__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__YTITNE__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/ytitne.js";

// relationship
import { CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/relationship.js";

const ENTITIES = {
	[$structure.entities.ezuag.database.graphql.TYPE__GRAPHQL__DATABASE__EZUAG__STRUCTURE]: CONNECTION__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.ytitne.database.graphql.TYPE__GRAPHQL__DATABASE__YTITNE__STRUCTURE]: CONNECTION__YTITNE__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE,
};

const METHODS = {
	[$structure.entities.ezuag.database.graphql.TYPE__GRAPHQL__DATABASE__EZUAG__STRUCTURE]: METHODS__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.ytitne.database.graphql.TYPE__GRAPHQL__DATABASE__YTITNE__STRUCTURE]: METHODS__YTITNE__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE,
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
