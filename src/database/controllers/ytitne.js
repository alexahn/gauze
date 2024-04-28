import * as $kernel from "./../../kernel/index.js";

import { YTITNE_MODEL_DATABASE } from "./../models/ytitne.js";

const YTITNE_CONTROLLER_ROOT_CONFIG = {};
const YTITNE_CONTROLLER_DATABASE_CONFIG = {
	model: YTITNE_MODEL_DATABASE,
	model_name: "YTITNE_MODEL_DATABASE",
};
const YTITNE_CONTROLLER_DATABASE = new $kernel.controllers.database.DatabaseController(YTITNE_CONTROLLER_ROOT_CONFIG, YTITNE_CONTROLLER_DATABASE_CONFIG);

export { YTITNE_CONTROLLER_DATABASE };
