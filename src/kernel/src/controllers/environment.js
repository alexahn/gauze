import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { DatabaseController } from "./database.js";

import { LOGGER__IO__LOGGER__SRC__KERNEL } from "./../logger/io.js";

class EnvironmentController extends DatabaseController {
	constructor(root_config, system_config) {
		super(root_config, system_config)
	}
}

export { EnvironmentController };
