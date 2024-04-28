import * as $kernel from "./../../kernel/index.js";

import { ENTITY1_MODEL_DATABASE } from "./../models/entity1.js";

const ENTITY1_CONTROLLER_ROOT_CONFIG = {};
const ENTITY1_CONTROLLER_DATABASE_CONFIG = {
	model: ENTITY1_MODEL_DATABASE,
	model_name: "ENTITY1_MODEL_DATABASE",
};
const ENTITY1_CONTROLLER_DATABASE = new $kernel.controllers.database.DatabaseController(ENTITY1_CONTROLLER_ROOT_CONFIG, ENTITY1_CONTROLLER_DATABASE_CONFIG);

export { ENTITY1_CONTROLLER_DATABASE };
