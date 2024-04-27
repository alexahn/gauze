import * as $kernel from "./../../kernel/index.js";

import { WHITELIST_MODEL_SYSTEM } from "./../models/whitelist.js";

const WHITELIST_CONTROLLER_SYSTEM_CONFIG = {};
const WHITELIST_CONTROLLER_SYSTEM = new $kernel.controllers.system.SystemModelSystemController(WHITELIST_CONTROLLER_SYSTEM_CONFIG, WHITELIST_MODEL_SYSTEM);

export { WHITELIST_CONTROLLER_SYSTEM };
