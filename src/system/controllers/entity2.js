import * as $kernel from "./../../kernel/index.js";

import { ENTITY2_MODEL_SYSTEM } from "./../models/entity2.js";

const ENTITY2_CONTROLLER_SYSTEM_CONFIG = {};
const ENTITY2_CONTROLLER_SYSTEM = new $kernel.controllers.system.SystemModelSystemController(ENTITY2_CONTROLLER_SYSTEM_CONFIG, ENTITY2_MODEL_SYSTEM);

export { ENTITY2_CONTROLLER_SYSTEM };
