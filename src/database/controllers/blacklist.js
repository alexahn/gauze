import * as $kernel from "./../../kernel/index.js";

import { BLACKLIST_MODEL_DATABASE } from "./../models/blacklist.js";

const BLACKLIST_CONTROLLER_ROOT_CONFIG = {};
const BLACKLIST_CONTROLLER_DATABASE_CONFIG = {
	model: BLACKLIST_MODEL_DATABASE,
	model_name: "BLACKLIST_MODEL_DATABASE",
};
const BLACKLIST_CONTROLLER_DATABASE = new $kernel.controllers.database.DatabaseController(BLACKLIST_CONTROLLER_ROOT_CONFIG, BLACKLIST_CONTROLLER_DATABASE_CONFIG);

export { BLACKLIST_CONTROLLER_DATABASE };
