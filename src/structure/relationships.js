// relationships are defined using the graphql type constant

// agent root
import { TYPE__GRAPHQL__DATABASE__AGENT_ROOT__STRUCTURE } from "./entities/agent_root/database/graphql.js";
// agent account
import { TYPE__GRAPHQL__DATABASE__AGENT_ACCOUNT__STRUCTURE } from "./entities/agent_account/database/graphql.js";
// agent user
import { TYPE__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE } from "./entities/agent_user/database/graphql.js";
// agent person
import { TYPE__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE } from "./entities/agent_person/database/graphql.js";
// agent character
import { TYPE__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE } from "./entities/agent_character/database/graphql.js";

// from -> to
const DATABASE_RELATIONSHIPS__RELATIONSHIP__STRUCTURE = {
	[TYPE__GRAPHQL__DATABASE__AGENT_ROOT__STRUCTURE]: [],
	[TYPE__GRAPHQL__DATABASE__AGENT_ACCOUNT__STRUCTURE]: [],
	[TYPE__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE]: [],
	[TYPE__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE]: [],
	[TYPE__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE]: [],
};

const SYSTEM_RELATIONSHIPS__RELATIONSHIP__STRUCTURE = DATABASE_RELATIONSHIPS__RELATIONSHIP__STRUCTURE;

export { DATABASE_RELATIONSHIPS__RELATIONSHIP__STRUCTURE, SYSTEM_RELATIONSHIPS__RELATIONSHIP__STRUCTURE };
