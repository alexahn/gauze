import * as $abstract from "./../../../abstract/index.js";

//import { SERIALIZER_CREATED_AT_STRUCTURE, SERIALIZER_UPDATED_AT_STRUCTURE, SERIALIZER_DELETED_AT_STRUCTURE } from "./../../serializers.js";

//import { PRIMARY_KEY__ABSTRACT__BLACKLIST__STRUCTURE } from "./../abstract.js";

const TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE = "gauze__blacklist";
const PRIMARY_KEY__SQL__DATABASE__BLACKLIST__STRUCTURE = $abstract.entities.blacklist.default($abstract).primary_key;
//const PRIMARY_KEY__SQL__DATABASE__BLACKLIST__STRUCTURE = PRIMARY_KEY__ABSTRACT__BLACKLIST__STRUCTURE;
/*
const FIELDS__SQL__DATABASE__BLACKLIST__STRUCTURE = {
	id: true,
	created_at: true,
	updated_at: true,
	deleted_at: true,
	text: true,
};
const PROTECTED_FIELDS__SQL__DATABASE__BLACKLIST__STRUCTURE = ["id", "created_at", "updated_at", "deleted_at"];
const FIELD_SERIALIZERS__SQL__DATABASE__BLACKLIST__STRUCTURE = {
	created_at: SERIALIZER_CREATED_AT_STRUCTURE("created_at"),
	updated_at: SERIALIZER_UPDATED_AT_STRUCTURE("updated_at"),
	deleted_at: SERIALIZER_DELETED_AT_STRUCTURE("deleted_at"),
};
*/

export {
	TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE,
	PRIMARY_KEY__SQL__DATABASE__BLACKLIST__STRUCTURE,
	/*
	FIELDS__SQL__DATABASE__BLACKLIST__STRUCTURE,
	PROTECTED_FIELDS__SQL__DATABASE__BLACKLIST__STRUCTURE,
	FIELD_SERIALIZERS__SQL__DATABASE__BLACKLIST__STRUCTURE,
	*/
};
