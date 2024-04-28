import * as $kernel from "./../../kernel/index.js";

import { WHITELIST_MODEL_DATABASE } from "./../models/whitelist.js";

const WHITELIST_CONTROLLER_ROOT_CONFIG = {};
const WHITELIST_CONTROLLER_DATABASE_CONFIG = {
	model: WHITELIST_MODEL_DATABASE,
	model_name: "WHITELIST_MODEL_DATABASE",
};
const WHITELIST_CONTROLLER_DATABASE = new $kernel.controllers.database.DatabaseController(WHITELIST_CONTROLLER_ROOT_CONFIG, WHITELIST_CONTROLLER_DATABASE_CONFIG);

export { WHITELIST_CONTROLLER_DATABASE };
