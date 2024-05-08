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

// whitelist
import { CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/whitelist.js";

// blacklist
import { CONNECTION__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/blacklist.js";

// secret
import { CONNECTION__SECRET__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__SECRET__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/secret.js";

// session
import { CONNECTION__SESSION__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__SESSION__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/session.js";

// proxy
import { CONNECTION__PROXY__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__PROXY__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/proxy.js";

// agent_root
import { CONNECTION__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/agent_root.js";

// agent_account
import { CONNECTION__AGENT_ACCOUNT__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__AGENT_ACCOUNT__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/agent_account.js";

// agent_user
import { CONNECTION__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/agent_user.js";

// agent_person
import { CONNECTION__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/agent_person.js";

// agent_character
import { CONNECTION__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/agent_character.js";

// entity
import { CONNECTION__ENTITY__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__ENTITY__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/entity.js";

// gauze
import { CONNECTION__GAUZE__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__GAUZE__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/gauze.js";

const ENTITIES = {
	[$structure.entities.ezuag.database.graphql.TYPE__GRAPHQL__DATABASE__EZUAG__STRUCTURE]: CONNECTION__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.ytitne.database.graphql.TYPE__GRAPHQL__DATABASE__YTITNE__STRUCTURE]: CONNECTION__YTITNE__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.whitelist.database.graphql.TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE]: CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.blacklist.database.graphql.TYPE__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE]: CONNECTION__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.secret.database.graphql.TYPE__GRAPHQL__DATABASE__SECRET__STRUCTURE]: CONNECTION__SECRET__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.session.database.graphql.TYPE__GRAPHQL__DATABASE__SESSION__STRUCTURE]: CONNECTION__SESSION__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.proxy.database.graphql.TYPE__GRAPHQL__DATABASE__PROXY__STRUCTURE]: CONNECTION__PROXY__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.agent_root.database.graphql.TYPE__GRAPHQL__DATABASE__AGENT_ROOT__STRUCTURE]: CONNECTION__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.agent_account.database.graphql.TYPE__GRAPHQL__DATABASE__AGENT_ACCOUNT__STRUCTURE]: CONNECTION__AGENT_ACCOUNT__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.agent_user.database.graphql.TYPE__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE]: CONNECTION__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.agent_person.database.graphql.TYPE__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE]: CONNECTION__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.agent_character.database.graphql.TYPE__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE]: CONNECTION__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__DATABASE,

	[$structure.entities.entity.database.graphql.TYPE__GRAPHQL__DATABASE__ENTITY__STRUCTURE]: CONNECTION__ENTITY__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.gauze.database.graphql.TYPE__GRAPHQL__DATABASE__GAUZE__STRUCTURE]: CONNECTION__GAUZE__ENTITY__GRAPHQL__INTERFACE__DATABASE,
};

const METHODS = {
	[$structure.entities.ezuag.database.graphql.TYPE__GRAPHQL__DATABASE__EZUAG__STRUCTURE]: METHODS__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.ytitne.database.graphql.TYPE__GRAPHQL__DATABASE__YTITNE__STRUCTURE]: METHODS__YTITNE__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.whitelist.database.graphql.TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE]: METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.blacklist.database.graphql.TYPE__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE]: METHODS__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.secret.database.graphql.TYPE__GRAPHQL__DATABASE__SECRET__STRUCTURE]: METHODS__SECRET__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.session.database.graphql.TYPE__GRAPHQL__DATABASE__SESSION__STRUCTURE]: METHODS__SESSION__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.proxy.database.graphql.TYPE__GRAPHQL__DATABASE__PROXY__STRUCTURE]: METHODS__PROXY__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.agent_root.database.graphql.TYPE__GRAPHQL__DATABASE__AGENT_ROOT__STRUCTURE]: METHODS__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.agent_account.database.graphql.TYPE__GRAPHQL__DATABASE__AGENT_ACCOUNT__STRUCTURE]: METHODS__AGENT_ACCOUNT__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.agent_user.database.graphql.TYPE__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE]: METHODS__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.agent_person.database.graphql.TYPE__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE]: METHODS__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.agent_character.database.graphql.TYPE__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE]: METHODS__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.entity.database.graphql.TYPE__GRAPHQL__DATABASE__ENTITY__STRUCTURE]: METHODS__ENTITY__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.gauze.database.graphql.TYPE__GRAPHQL__DATABASE__GAUZE__STRUCTURE]: METHODS__GAUZE__ENTITY__GRAPHQL__INTERFACE__DATABASE,
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

$kernel.linker.LINK_RELATIONSHIPS__LINKER__KERNEL(ENTITIES, METHODS, $structure.relationships.DATABASE_RELATIONSHIPS__RELATIONSHIP__STRUCTURE);
$kernel.linker.LINK_ROOT__LINKER__KERNEL(QUERY_FIELDS, MUTATION_FIELDS, METHODS);

const SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE = new GraphQLSchema({
	query: QUERY_TYPE,
	mutation: MUTATION_TYPE,
});

export { SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE };
