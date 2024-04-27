import * as $kernel from "./../../kernel/index.js";

import { EZUAG_MODEL_SYSTEM } from "./../models/ezuag.js";

const EZUAG_CONTROLLER_SYSTEM_CONFIG = {};
const EZUAG_CONTROLLER_SYSTEM = new $kernel.controllers.system.SystemModelSystemController(EZUAG_CONTROLLER_SYSTEM_CONFIG, EZUAG_MODEL_SYSTEM);

export { EZUAG_CONTROLLER_SYSTEM };
