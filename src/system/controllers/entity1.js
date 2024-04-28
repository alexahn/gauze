import * as $kernel from "./../../kernel/index.js";

import { ENTITY1_MODEL_SYSTEM } from "./../models/entity1.js";

const ENTITY1_CONTROLLER_ROOT_CONFIG = {};
const ENTITY1_CONTROLLER_SYSTEM_CONFIG = {
	model: ENTITY1_MODEL_SYSTEM,
	model_name: "ENTITY1_MODEL_SYSTEM",
};
const ENTITY1_CONTROLLER_SYSTEM = new $kernel.controllers.system.SystemController(ENTITY1_CONTROLLER_ROOT_CONFIG, ENTITY1_CONTROLLER_SYSTEM_CONFIG);

export { ENTITY1_CONTROLLER_SYSTEM };
