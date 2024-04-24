import { DatabaseController } from "./class.js";
import { ENTITY1_MODEL_DATABASE } from "./../models/entity1.js";

const ENTITY1_CONTROLLER_DATABASE_CONFIG = {};
const ENTITY1_CONTROLLER_DATABASE = new DatabaseController(ENTITY1_CONTROLLER_DATABASE_CONFIG, ENTITY1_MODEL_DATABASE);

export { ENTITY1_CONTROLLER_DATABASE };
