import * as $kernel from "./../../kernel/index.js";

import { BLACKLIST_MODEL_SYSTEM } from "./../models/blacklist.js";

const BLACKLIST_CONTROLLER_ROOT_CONFIG = {};
const BLACKLIST_CONTROLLER_SYSTEM_CONFIG = {
	model: BLACKLIST_MODEL_SYSTEM,
	model_name: "BLACKLIST_MODEL_SYSTEM",
};
const BLACKLIST_CONTROLLER_SYSTEM = new $kernel.controllers.system.SystemController(BLACKLIST_CONTROLLER_ROOT_CONFIG, BLACKLIST_CONTROLLER_SYSTEM_CONFIG);

export { BLACKLIST_CONTROLLER_SYSTEM };
