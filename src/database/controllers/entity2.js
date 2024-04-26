import * as $kernel from "./../../kernel/index.js"

import { ENTITY2_MODEL_DATABASE } from "./../models/entity2.js";

const ENTITY2_CONTROLLER_DATABASE_CONFIG = {};
const ENTITY2_CONTROLLER_DATABASE = new $kernel.controllers.database.DatabaseController(ENTITY2_CONTROLLER_DATABASE_CONFIG, ENTITY2_MODEL_DATABASE);

export { ENTITY2_CONTROLLER_DATABASE };
