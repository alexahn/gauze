import * as $kernel from "./../../kernel/index.js";

import { BLACKLIST_MODEL_DATABASE } from "./../models/blacklist.js";

const BLACKLIST_CONTROLLER_DATABASE_CONFIG = {};
const BLACKLIST_CONTROLLER_DATABASE = new $kernel.controllers.database.DatabaseController(BLACKLIST_CONTROLLER_DATABASE_CONFIG, BLACKLIST_MODEL_DATABASE);

export { BLACKLIST_CONTROLLER_DATABASE };
