import * as $kernel from "./../../kernel/index.js";

import { WHITELIST_MODEL_DATABASE } from "./../models/whitelist.js";

const WHITELIST_CONTROLLER_DATABASE_CONFIG = {};
const WHITELIST_CONTROLLER_DATABASE = new $kernel.controllers.database.DatabaseController(WHITELIST_CONTROLLER_DATABASE_CONFIG, WHITELIST_MODEL_DATABASE);

export { WHITELIST_CONTROLLER_DATABASE };
