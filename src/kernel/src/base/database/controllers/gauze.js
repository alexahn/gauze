import * as $kernel from "./../../kernel/index.js";

import { caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE } from "./../models/a543731262804f64adcc0eae1a225acc.js";

const caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_ROOT_CONFIG = {};
const caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_DATABASE_CONFIG = {
	model: caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE,
	model_name: "caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE",
};
const caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_DATABASE = new $kernel.controllers.database.DatabaseController(
	caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_ROOT_CONFIG,
	caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_DATABASE_CONFIG,
);

export { caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_DATABASE };
