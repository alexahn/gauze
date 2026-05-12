import path from "path";
import url from "url";

import * as $abstract from "./../abstract/index.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEVELOPMENT_ENVIRONMENT = "development"

import DEVELOPMENT_ENVIRONMENT_CONFIG from "./environment_development_config.js";

const CONFIG__DATABASE = {
	[DEVELOPMENT_ENVIRONMENT]: DEVELOPMENT_ENVIRONMENT_CONFIG,
};

export default CONFIG__DATABASE;
