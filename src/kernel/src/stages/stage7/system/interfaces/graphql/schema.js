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

// secret
import { CONNECTION__SECRET__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__SECRET__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/secret.js";

// session
import { CONNECTION__SESSION__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__SESSION__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/session.js";

// proxy
import { CONNECTION__PROXY__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__PROXY__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/proxy.js";

// agent_root
import { CONNECTION__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/agent_root.js";

// agent_account
import { CONNECTION__AGENT_ACCOUNT__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__AGENT_ACCOUNT__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/agent_account.js";

// agent_user
import { CONNECTION__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/agent_user.js";

// agent_person
import { CONNECTION__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/agent_person.js";

// agent_character
import { CONNECTION__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/agent_character.js";

// entity
import { CONNECTION__ENTITY__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__ENTITY__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/entity.js";

// gauze
import { CONNECTION__GAUZE__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__GAUZE__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/gauze.js";

const ENTITIES = {
	[$structure.entities.ezuag.system.graphql.TYPE__GRAPHQL__SYSTEM__EZUAG__STRUCTURE]: CONNECTION__EZUAG__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.ytitne.system.graphql.TYPE__GRAPHQL__SYSTEM__YTITNE__STRUCTURE]: CONNECTION__YTITNE__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.relationship.system.graphql.TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE]: CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.whitelist.system.graphql.TYPE__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE]: CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.blacklist.system.graphql.TYPE__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE]: CONNECTION__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.secret.system.graphql.TYPE__GRAPHQL__SYSTEM__SECRET__STRUCTURE]: CONNECTION__SECRET__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.session.system.graphql.TYPE__GRAPHQL__SYSTEM__SESSION__STRUCTURE]: CONNECTION__SESSION__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.proxy.system.graphql.TYPE__GRAPHQL__SYSTEM__PROXY__STRUCTURE]: CONNECTION__PROXY__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.agent_root.system.graphql.TYPE__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE]: CONNECTION__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.agent_account.system.graphql.TYPE__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE]: CONNECTION__AGENT_ACCOUNT__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.agent_user.system.graphql.TYPE__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE]: CONNECTION__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.agent_person.system.graphql.TYPE__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE]: CONNECTION__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.agent_character.system.graphql.TYPE__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE]: CONNECTION__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__SYSTEM,

	[$structure.entities.entity.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY__STRUCTURE]: CONNECTION__ENTITY__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.gauze.system.graphql.TYPE__GRAPHQL__SYSTEM__GAUZE__STRUCTURE]: CONNECTION__GAUZE__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
};

const METHODS = {
	[$structure.entities.ezuag.system.graphql.TYPE__GRAPHQL__SYSTEM__EZUAG__STRUCTURE]: METHODS__EZUAG__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.ytitne.system.graphql.TYPE__GRAPHQL__SYSTEM__YTITNE__STRUCTURE]: METHODS__YTITNE__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.relationship.system.graphql.TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE]: METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.whitelist.system.graphql.TYPE__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE]: METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.blacklist.system.graphql.TYPE__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE]: METHODS__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.secret.system.graphql.TYPE__GRAPHQL__SYSTEM__SECRET__STRUCTURE]: METHODS__SECRET__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.session.system.graphql.TYPE__GRAPHQL__SYSTEM__SESSION__STRUCTURE]: METHODS__SESSION__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.proxy.system.graphql.TYPE__GRAPHQL__SYSTEM__PROXY__STRUCTURE]: METHODS__PROXY__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.agent_root.system.graphql.TYPE__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE]: METHODS__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.agent_account.system.graphql.TYPE__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE]: METHODS__AGENT_ACCOUNT__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.agent_user.system.graphql.TYPE__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE]: METHODS__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.agent_person.system.graphql.TYPE__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE]: METHODS__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.agent_character.system.graphql.TYPE__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE]: METHODS__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.entity.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY__STRUCTURE]: METHODS__ENTITY__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entities.gauze.system.graphql.TYPE__GRAPHQL__SYSTEM__GAUZE__STRUCTURE]: METHODS__GAUZE__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
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

$kernel.linker.HEADER__LINKER__KERNEL(QUERY_FIELDS, ENTITIES);
$kernel.linker.LINK_RELATIONSHIPS__LINKER__KERNEL(ENTITIES, METHODS, $structure.relationships.SYSTEM_RELATIONSHIPS__RELATIONSHIP__STRUCTURE);
$kernel.linker.LINK_ROOT__LINKER__KERNEL(QUERY_FIELDS, MUTATION_FIELDS, METHODS);

const SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM = new GraphQLSchema({
	query: QUERY_TYPE,
	mutation: MUTATION_TYPE,
});

export { SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM };
