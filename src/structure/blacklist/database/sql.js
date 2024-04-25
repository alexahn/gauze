import { SERIALIZER_CREATED_AT_STRUCTURE, SERIALIZER_UPDATED_AT_STRUCTURE, SERIALIZER_DELETED_AT_STRUCTURE } from "./../../serializers.js";

import { PRIMARY_KEY__ABSTRACT__BLACKLIST__STRUCTURE } from "./../abstract.js";

const TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE = "gauze__blacklist";
const PRIMARY_KEY__SQL__DATABASE__BLACKLIST__STRUCTURE = PRIMARY_KEY__ABSTRACT__BLACKLIST__STRUCTURE;
const FIELDS__SQL__DATABASE__BLACKLIST__STRUCTURE = {
	gauze__blacklist__id: true,
	gauze__blacklist__created_at: true,
	gauze__blacklist__updated_at: true,
	gauze__blacklist__deleted_at: true,
	gauze__blacklist__realm: true,
	gauze__blacklist__agent_role: true,
	gauze__blacklist__agent_type: true,
	gauze__blacklist__agent_id: true,
	gauze__blacklist__entity_type: true,
	gauze__blacklist__entity_id: true,
};
const PROTECTED_FIELDS__SQL__DATABASE__BLACKLIST__STRUCTURE = ["gauze__blacklist__id", "gauze__blacklist__created_at", "gauze__blacklist__updated_at", "gauze__blacklist__deleted_at"];
const FIELD_SERIALIZERS__SQL__DATABASE__BLACKLIST__STRUCTURE = {
	gauze__blacklist__created_at: SERIALIZER_CREATED_AT_STRUCTURE("gauze__blacklist__created_at"),
	gauze__blacklist__updated_at: SERIALIZER_UPDATED_AT_STRUCTURE("gauze__blacklist__updated_at"),
	gauze__blacklist__deleted_at: SERIALIZER_DELETED_AT_STRUCTURE("gauze__blacklist__deleted_at"),
};

export {
	TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE,
	PRIMARY_KEY__SQL__DATABASE__BLACKLIST__STRUCTURE,
	FIELDS__SQL__DATABASE__BLACKLIST__STRUCTURE,
	PROTECTED_FIELDS__SQL__DATABASE__BLACKLIST__STRUCTURE,
	FIELD_SERIALIZERS__SQL__DATABASE__BLACKLIST__STRUCTURE,
};
