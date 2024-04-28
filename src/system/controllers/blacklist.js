import * as $kernel from "./../../kernel/index.js";

import { BLACKLIST_MODEL_SYSTEM } from "./../models/blacklist.js";

const BLACKLIST_CONTROLLER_SYSTEM_CONFIG = {};
const BLACKLIST_CONTROLLER_SYSTEM = new $kernel.controllers.system.SystemModelSystemController(BLACKLIST_CONTROLLER_SYSTEM_CONFIG, BLACKLIST_MODEL_SYSTEM);

export { BLACKLIST_CONTROLLER_SYSTEM };
