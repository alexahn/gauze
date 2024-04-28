import * as $kernel from "./../../kernel/index.js";

import { ENTITY2_MODEL_DATABASE } from "./../models/entity2.js";

const ENTITY2_CONTROLLER_ROOT_CONFIG = {};
const ENTITY2_CONTROLLER_DATABASE_CONFIG = {
	model: ENTITY2_MODEL_DATABASE,
	model_name: "ENTITY2_MODEL_DATABASE",
};
const ENTITY2_CONTROLLER_DATABASE = new $kernel.controllers.database.DatabaseController(ENTITY2_CONTROLLER_ROOT_CONFIG, ENTITY2_CONTROLLER_DATABASE_CONFIG);

export { ENTITY2_CONTROLLER_DATABASE };
