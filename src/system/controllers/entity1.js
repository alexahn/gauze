import * as $kernel from "./../../kernel/index.js";

import { ENTITY1_MODEL_SYSTEM } from "./../models/entity1.js";

const ENTITY1_CONTROLLER_SYSTEM_CONFIG = {};
const ENTITY1_CONTROLLER_SYSTEM = new $kernel.controllers.system.SystemModelSystemController(ENTITY1_CONTROLLER_SYSTEM_CONFIG, ENTITY1_MODEL_SYSTEM);

export { ENTITY1_CONTROLLER_SYSTEM };
