import * as $kernel from "./../../kernel/index.js";

import { YTITNE_MODEL_SYSTEM } from "./../models/ytitne.js";

const YTITNE_CONTROLLER_ROOT_CONFIG = {};
const YTITNE_CONTROLLER_SYSTEM_CONFIG = {
	model: YTITNE_MODEL_SYSTEM,
	model_name: "YTITNE_MODEL_SYSTEM",
};
const YTITNE_CONTROLLER_SYSTEM = new $kernel.controllers.system.SystemController(YTITNE_CONTROLLER_ROOT_CONFIG, YTITNE_CONTROLLER_SYSTEM_CONFIG);

export { YTITNE_CONTROLLER_SYSTEM };
