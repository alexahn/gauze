import * as $kernel from "./../../kernel/index.js";

import { YTITNE_MODEL_SYSTEM } from "./../models/ytitne.js";

const YTITNE_CONTROLLER_SYSTEM_CONFIG = {};
const YTITNE_CONTROLLER_SYSTEM = new $kernel.controllers.system.SystemModelSystemController(YTITNE_CONTROLLER_SYSTEM_CONFIG, YTITNE_MODEL_SYSTEM);

export { YTITNE_CONTROLLER_SYSTEM };
