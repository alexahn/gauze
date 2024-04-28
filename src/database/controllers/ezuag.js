import * as $kernel from "./../../kernel/index.js";

import { EZUAG_MODEL_DATABASE } from "./../models/ezuag.js";

const EZUAG_CONTROLLER_ROOT_CONFIG = {};
const EZUAG_CONTROLLER_DATABASE_CONFIG = {
	model: EZUAG_MODEL_DATABASE,
	model_name: "EZUAG_MODEL_DATABASE",
};
const EZUAG_CONTROLLER_DATABASE = new $kernel.controllers.database.DatabaseController(EZUAG_CONTROLLER_ROOT_CONFIG, EZUAG_CONTROLLER_DATABASE_CONFIG);

export { EZUAG_CONTROLLER_DATABASE };
