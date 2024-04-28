import * as $kernel from "./../../kernel/index.js";

import { cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE } from "./../models/a2b8dbc3427b41a9899e11671c2422c7.js";

const cd637bc32c364580be5cc28396d3dee8_CONTROLLER_ROOT_CONFIG = {};
const cd637bc32c364580be5cc28396d3dee8_CONTROLLER_DATABASE_CONFIG = {
	model: cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE,
	model_name: "cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE",
};
const cd637bc32c364580be5cc28396d3dee8_CONTROLLER_DATABASE = new $kernel.controllers.database.DatabaseController(
	cd637bc32c364580be5cc28396d3dee8_CONTROLLER_ROOT_CONFIG,
	cd637bc32c364580be5cc28396d3dee8_CONTROLLER_DATABASE_CONFIG,
);

export { cd637bc32c364580be5cc28396d3dee8_CONTROLLER_DATABASE };
