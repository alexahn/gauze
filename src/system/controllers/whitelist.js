import * as $kernel from "./../../kernel/index.js";

import { WHITELIST_MODEL_SYSTEM } from "./../models/whitelist.js";

const WHITELIST_CONTROLLER_ROOT_CONFIG = {};
const WHITELIST_CONTROLLER_SYSTEM_CONFIG = {
	model: WHITELIST_MODEL_SYSTEM,
	model_name: "WHITELIST_MODEL_SYSTEM",
};
const WHITELIST_CONTROLLER_SYSTEM = new $kernel.controllers.system.SystemController(WHITELIST_CONTROLLER_ROOT_CONFIG, WHITELIST_CONTROLLER_SYSTEM_CONFIG);

export { WHITELIST_CONTROLLER_SYSTEM };
