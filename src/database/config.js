import path from "path";
import url from "url";

import * as $abstract from "./../abstract/index.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_MONOLITHIC_ENVIRONMENT = "test_monolithic";
const TEST_SHARDED_ENVIRONMENT = "test_sharded";
const DEVELOPMENT_MONOLITHIC_ENVIRONMENT = "development_monolithic";
const DEVELOPMENT_SHARDED_ENVIRONMENT = "development_sharded";
const STAGING_ENVIRONMENT = "staging";
const PRODUCTION_ENVIRONMENT = "production";

import TEST_MONOLITHIC_ENVIRONMENT_CONFIG from "./environment_test_monolithic_config.js";
import TEST_SHARDED_ENVIRONMENT_CONFIG from "./environment_test_sharded_config.js";
import DEVELOPMENT_MONOLITHIC_ENVIRONMENT_CONFIG from "./environment_development_monolithic_config.js";
import DEVELOPMENT_SHARDED_ENVIRONMENT_CONFIG from "./environment_development_sharded_config.js";

const relationship__table = $abstract.entities.relationship ? $abstract.entities.relationship.default($abstract).table_name : "undefined";
const whitelist__table = $abstract.entities.whitelist ? $abstract.entities.whitelist.default($abstract).table_name : "undefined";
const blacklist__table = $abstract.entities.blacklist ? $abstract.entities.blacklist.default($abstract).table_name : "undefined";
const proxy__table = $abstract.entities.proxy ? $abstract.entities.proxy.default($abstract).table_name : "undefined";
const secret__table = $abstract.entities.secret ? $abstract.entities.secret.default($abstract).table_name : "undefined";
const session__table = $abstract.entities.session ? $abstract.entities.session.default($abstract).table_name : "undefined";
const agent_root__table = $abstract.entities.agent_root ? $abstract.entities.agent_root.default($abstract).table_name : "undefined";
const agent_account__table = $abstract.entities.agent_account ? $abstract.entities.agent_account.default($abstract).table_name : "undefined";
const agent_user__table = $abstract.entities.agent_user ? $abstract.entities.agent_user.default($abstract).table_name : "undefined";
const agent_person__table = $abstract.entities.agent_person ? $abstract.entities.agent_person.default($abstract).table_name : "undefined";
const agent_character__table = $abstract.entities.agent_character ? $abstract.entities.agent_character.default($abstract).table_name : "undefined";
const ezuag__table = $abstract.entities.ezuag ? $abstract.entities.ezuag.default($abstract).table_name : "undefined";
const ytitne__table = $abstract.entities.ytitne ? $abstract.entities.ytitne.default($abstract).table_name : "undefined";
const entity__table = $abstract.entities.entity ? $abstract.entities.entity.default($abstract).table_name : "undefined";
const gauze__table = $abstract.entities.gauze ? $abstract.entities.gauze.default($abstract).table_name : "undefined";

const CONFIG__DATABASE = {
	[DEVELOPMENT_MONOLITHIC_ENVIRONMENT]: DEVELOPMENT_MONOLITHIC_ENVIRONMENT_CONFIG,
	[DEVELOPMENT_SHARDED_ENVIRONMENT]: DEVELOPMENT_SHARDED_ENVIRONMENT_CONFIG,
	[TEST_MONOLITHIC_ENVIRONMENT]: TEST_MONOLITHIC_ENVIRONMENT_CONFIG,
	[TEST_SHARDED_ENVIRONMENT]: TEST_SHARDED_ENVIRONMENT_CONFIG,
};

export default CONFIG__DATABASE;
