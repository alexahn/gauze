import * as $kernel from "./../../kernel/index.js";

//import { SystemModelSystemController } from "./class.js";
import { RELATIONSHIP_MODEL_SYSTEM } from "./../models/relationship.js";

const RELATIONSHIP_CONTROLLER_SYSTEM_CONFIG = {};
const RELATIONSHIP_CONTROLLER_SYSTEM = new $kernel.controllers.system.SystemModelSystemController(RELATIONSHIP_CONTROLLER_SYSTEM_CONFIG, RELATIONSHIP_MODEL_SYSTEM);

export { RELATIONSHIP_CONTROLLER_SYSTEM };
