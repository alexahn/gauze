// ezuag
import { TYPE__GRAPHQL__DATABASE__EZUAG__STRUCTURE } from "./ezuag/database/graphql.js";
import { TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE } from "./ezuag/database/sql.js";
// ytitne
import { TYPE__GRAPHQL__DATABASE__YTITNE__STRUCTURE } from "./ytitne/database/graphql.js";
import { TABLE_NAME__SQL__DATABASE__YTITNE__STRUCTURE } from "./ytitne/database/sql.js";
// relationship
import { TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE } from "./relationship/database/graphql.js";
import { TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE } from "./relationship/database/sql.js";
// whitelist
import { TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE } from "./whitelist/database/graphql.js";
import { TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE } from "./whitelist/database/sql.js";
// blacklist
import { TYPE__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE } from "./whitelist/database/graphql.js";
import { TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE } from "./whitelist/database/sql.js";
// entity1
import { TYPE__GRAPHQL__DATABASE__ENTITY1__STRUCTURE } from "./entity1/database/graphql.js";
import { TABLE_NAME__SQL__DATABASE__ENTITY1__STRUCTURE } from "./entity1/database/sql.js";
// entity2
import { TYPE__GRAPHQL__DATABASE__ENTITY2__STRUCTURE } from "./entity2/database/graphql.js";
import { TABLE_NAME__SQL__DATABASE__ENTITY2__STRUCTURE } from "./entity2/database/sql.js";

function invert(obj) {
	const inverted = {};
	Object.keys(obj).forEach(function (key) {
		const val = obj[key];
		inverted[val] = key;
	});
	return inverted;
}

const DATABASE_GRAPHQL_TYPE_TO_SQL_TABLE = {
	[TYPE__GRAPHQL__DATABASE__EZUAG__STRUCTURE]: TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE,
	[TYPE__GRAPHQL__DATABASE__YTITNE__STRUCTURE]: TABLE_NAME__SQL__DATABASE__YTITNE__STRUCTURE,
	[TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
	[TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE]: TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE,
	[TYPE__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE]: TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE,
	[TYPE__GRAPHQL__DATABASE__ENTITY1__STRUCTURE]: TABLE_NAME__SQL__DATABASE__ENTITY1__STRUCTURE,
	[TYPE__GRAPHQL__DATABASE__ENTITY2__STRUCTURE]: TABLE_NAME__SQL__DATABASE__ENTITY2__STRUCTURE,
};
const DATABASE_SQL_TABLE_TO_GRAPHQL_TYPE = invert(DATABASE_GRAPHQL_TYPE_TO_SQL_TABLE);

const SYSTEM_GRAPHQL_TYPE_TO_SQL_TABLE = DATABASE_GRAPHQL_TYPE_TO_SQL_TABLE;
const SYSTEM_SQL_TABLE_TO_GRAPHQL_TYPE = DATABASE_SQL_TABLE_TO_GRAPHQL_TYPE;

export { DATABASE_GRAPHQL_TYPE_TO_SQL_TABLE, DATABASE_SQL_TABLE_TO_GRAPHQL_TYPE, SYSTEM_GRAPHQL_TYPE_TO_SQL_TABLE, SYSTEM_SQL_TABLE_TO_GRAPHQL_TYPE };
