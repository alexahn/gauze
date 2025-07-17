import { IOLogger } from "./class.js";

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

const LOGGER__IO__LOGGER__SRC__KERNEL = new IOLogger({
	LOG_LEVEL_MINIMUM: process.env.LOG_LEVEL_MINIMUM,
	LOG_LEVEL_MAXIMUM: process.env.LOG_LEVEL_MAXIMUM,
	LOG_LEVEL_REGEX: process.env.LOG_LEVEL_REGEX,
	LOG_TOPIC_REGEX: process.env.LOG_TOPIC_REGEX,
	LOG_MESSAGE_REGEX: process.env.LOG_MESSAGE_REGEX,
});

export { LOGGER__IO__LOGGER__SRC__KERNEL };
