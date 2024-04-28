import * as $kernel from "./../../kernel/index.js";

import { EZUAG_MODEL_SYSTEM } from "./../models/ezuag.js";

const EZUAG_CONTROLLER_ROOT_CONFIG = {};
const EZUAG_CONTROLLER_SYSTEM_CONFIG = {
	model: EZUAG_MODEL_SYSTEM,
	model_name: "EZUAG_MODEL_SYSTEM",
};
const EZUAG_CONTROLLER_SYSTEM = new $kernel.controllers.system.SystemController(EZUAG_CONTROLLER_ROOT_CONFIG, EZUAG_CONTROLLER_SYSTEM_CONFIG);

export { EZUAG_CONTROLLER_SYSTEM };
