import * as $kernel from "./../../kernel/index.js";

import { ENTITY2_MODEL_SYSTEM } from "./../models/entity2.js";

const ENTITY2_CONTROLLER_ROOT_CONFIG = {};
const ENTITY2_CONTROLLER_SYSTEM_CONFIG = {
	model: ENTITY2_MODEL_SYSTEM,
	model_name: "ENTITY2_MODEL_SYSTEM",
};
const ENTITY2_CONTROLLER_SYSTEM = new $kernel.controllers.system.SystemController(ENTITY2_CONTROLLER_ROOT_CONFIG, ENTITY2_CONTROLLER_SYSTEM_CONFIG);

export { ENTITY2_CONTROLLER_SYSTEM };
