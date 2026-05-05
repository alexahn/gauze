import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import child_process from "node:child_process";

const __FILEDIR = import.meta.dirname;
const GAUZE_BASE_DIR = path.resolve(__FILEDIR, "../../../../");

class GauzeProjectManager {
	constructor({ $gauze }, config) {
		this.$gauze = $gauze;
		this.config = config;

		process.on("SIGINT", function (val) {
			$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `process.SIGINT: ${val}`);
			process.exit(130);
		});

		process.on("SIGTERM", function (val) {
			$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `process.SIGTERM: ${val}`);
			// https://tldp.org/LDP/abs/html/exitcodes.html
			// 128 + signal_constants from https://nodejs.org/dist/latest-v18.x/docs/api/os.html#signal-constants
			// in this case SIGTERM is 15 so we have 128 + 15
			process.exit(143);
		});

		// this is called once the exit trajectory has been set
		process.on("exit", function (val) {
			$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `process.exit: ${val}`);
		});
	}
	execute(file, args = []) {
		var self = this;
		return new Promise(function (resolve, reject) {
			const child = child_process.spawn(file, args, {
				stdio: "inherit",
				shell: false,
			});
			child.on("error", reject);
			child.on("close", function (code) {
				self.$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "child.exit", file, args, code);
				if (code === 0) {
					return resolve(code);
				} else {
					return reject(new Error(`Command failed with exit code ${code}: ${file}`));
				}
			});
		});
	}
	proxy(dir) {
		const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), dir);
		const GAUZE_PROJECT_CLI = path.resolve(GAUZE_PROJECT_DIR, "./command/gauze.js");
		const sub_command_argv = process.argv.slice(4);
		/*
			// todo: runtime check
			let runtime = "unknown";

			if (typeof Deno !== "undefined") {
			  runtime = "deno";
			} else if (typeof Bun !== "undefined") {
			  runtime = "bun";
			} else if (typeof process !== "undefined" && process.versions?.node) {
			  runtime = "node";
			}

			console.log(`Current runtime: ${runtime}`);
		*/
		return this.execute(process.execPath, [GAUZE_PROJECT_CLI, ...sub_command_argv]).catch(function (err) {
			console.error(err);
			process.exit(1);
		});
	}
}

const GAUZE__PROJECT_MANAGER__APPLICATION__SRC__KERNEL = function (modules, argv) {
	return new GauzeProjectManager(modules, argv);
};

export { GAUZE__PROJECT_MANAGER__APPLICATION__SRC__KERNEL };
