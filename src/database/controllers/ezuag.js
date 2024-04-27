import * as $kernel from "./../../kernel/index.js";

import { EZUAG_MODEL_DATABASE } from "./../models/ezuag.js";

const EZUAG_CONTROLLER_DATABASE_CONFIG = {};
const EZUAG_CONTROLLER_DATABASE = new $kernel.controllers.database.DatabaseController(EZUAG_CONTROLLER_DATABASE_CONFIG, EZUAG_MODEL_DATABASE);

export { EZUAG_CONTROLLER_DATABASE };
