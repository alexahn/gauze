import * as $kernel from "./../../kernel/index.js"

import { DatabaseController } from "./class.js";
import { RELATIONSHIP_MODEL_DATABASE } from "./../models/relationship.js";

const RELATIONSHIP_CONTROLLER_DATABASE_CONFIG = {};
const RELATIONSHIP_CONTROLLER_DATABASE = new $kernel.controllers.database.DatabaseController(RELATIONSHIP_CONTROLLER_DATABASE_CONFIG, RELATIONSHIP_MODEL_DATABASE);

export { RELATIONSHIP_CONTROLLER_DATABASE };
