import * as $kernel from "./../../kernel/index.js";

import { YTITNE_MODEL_DATABASE } from "./../models/ytitne.js";

const YTITNE_CONTROLLER_DATABASE_CONFIG = {};
const YTITNE_CONTROLLER_DATABASE = new $kernel.controllers.database.DatabaseController(YTITNE_CONTROLLER_DATABASE_CONFIG, YTITNE_MODEL_DATABASE);

export { YTITNE_CONTROLLER_DATABASE };
