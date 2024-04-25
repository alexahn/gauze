import { SERIALIZER_CREATED_AT_STRUCTURE, SERIALIZER_UPDATED_AT_STRUCTURE, SERIALIZER_DELETED_AT_STRUCTURE } from "./../../serializers.js";

import { PRIMARY_KEY__ABSTRACT__WHITELIST__STRUCTURE } from "./../abstract.js";

const TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE = "gauze__whitelist";
const PRIMARY_KEY__SQL__DATABASE__WHITELIST__STRUCTURE = PRIMARY_KEY__ABSTRACT__WHITELIST__STRUCTURE;
const FIELDS__SQL__DATABASE__WHITELIST__STRUCTURE = {
	gauze__whitelist__id: true,
	gauze__whitelist__created_at: true,
	gauze__whitelist__updated_at: true,
	gauze__whitelist__deleted_at: true,
	gauze__whitelist__realm: true,
	gauze__whitelist__agent_role: true,
	gauze__whitelist__agent_type: true,
	gauze__whitelist__agent_id: true,
	gauze__whitelist__entity_type: true,
	gauze__whitelist__entity_id: true,
};
const PROTECTED_FIELDS__SQL__DATABASE__WHITELIST__STRUCTURE = ["gauze__whitelist__id", "gauze__whitelist__created_at", "gauze__whitelist__updated_at", "gauze__whitelist__deleted_at"];
const FIELD_SERIALIZERS__SQL__DATABASE__WHITELIST__STRUCTURE = {
	gauze__whitelist__created_at: SERIALIZER_CREATED_AT_STRUCTURE("gauze__whitelist__created_at"),
	gauze__whitelist__updated_at: SERIALIZER_UPDATED_AT_STRUCTURE("gauze__whitelist__updated_at"),
	gauze__whitelist__deleted_at: SERIALIZER_DELETED_AT_STRUCTURE("gauze__whitelist__deleted_at"),
};

export {
	TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE,
	PRIMARY_KEY__SQL__DATABASE__WHITELIST__STRUCTURE,
	FIELDS__SQL__DATABASE__WHITELIST__STRUCTURE,
	PROTECTED_FIELDS__SQL__DATABASE__WHITELIST__STRUCTURE,
	FIELD_SERIALIZERS__SQL__DATABASE__WHITELIST__STRUCTURE,
};
