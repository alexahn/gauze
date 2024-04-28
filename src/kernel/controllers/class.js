import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import { LOGGER__IO__LOGGER__KERNEL } from "./../logger/io.js";

class Controller {
	constructor(config) {
		const self = this;
		self.config = config;
		this.name = this._name();
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
	}
	static _class_name() {
		return `Controller`;
	}
	_name() {
		const self = this;
		return Controller._class_name();
	}
}

export { Controller };
