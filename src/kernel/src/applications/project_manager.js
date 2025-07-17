import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import child_process from "child_process";

const __FILEDIR = import.meta.dirname;
const GAUZE_BASE_DIR = path.resolve(__FILEDIR, "../../../../");

class GauzeProjectManager {
	constructor({ $gauze }, config) {
		this.$gauze = $gauze;
		this.config = config;

		process.on("SIGINT", function (val) {
			$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `process.SIGINT: ${val}`);
			process.exit(130);
		});

		process.on("SIGTERM", function (val) {
			$gauzekernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `process.SIGTEM: ${val}`);
			// https://tldp.org/LDP/abs/html/exitcodes.html
			// 128 + signal_constants from https://nodejs.org/dist/latest-v18.x/docs/api/os.html#signal-constants
			// in this case SIGTERM is 15 so we have 128 + 15
			process.exit(143);
		});

		// this is called once the exit trajectory has been set
		process.on("exit", function (val) {
			$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `process.exit: ${val}`);
		});
	}
	execute(command) {
		var self = this;
		return new Promise(function (resolve, reject) {
			const child = child_process.exec(command);
			child.stdout.on("data", function (data) {
				process.stdout.write(data);
			});
			child.stderr.on("data", function (data) {
				process.stderr.write(data);
			});
			child.on("close", function (code) {
				self.$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `child.exit: ${command}`);
				if (code === 0) {
					return resolve(code);
				} else {
					return reject(code);
				}
			});
		});
	}
	proxy(dir) {
		const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), dir);
		// slice argv here
		var sub_command_argv = [];
		process.argv.forEach((val, index) => {
			if (3 < index) {
				sub_command_argv.push(val);
			}
		});
		const GAUZE_SUB_COMMAND = sub_command_argv.join(" ");
		const COMMAND = `node ${GAUZE_PROJECT_DIR}/command/gauze.js ${GAUZE_SUB_COMMAND}`;
		return this.execute(COMMAND).catch(function (err) {
			console.error(err);
			process.exit(1);
		});
	}
}

const GAUZE__PROJECT_MANAGER__APPLICATION__KERNEL = function (modules, argv) {
	return new GauzeProjectManager(modules, argv);
};

export { GAUZE__PROJECT_MANAGER__APPLICATION__KERNEL };
