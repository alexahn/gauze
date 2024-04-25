import child_process from "child_process";

import path from "path";
const __FILEDIR = import.meta.dirname;
const GAUZE_BASE_DIR = path.resolve(__FILEDIR, "../../../");

class GauzeManager {
	// note: config takes the command argv structure (src/command/commands/create/project.js)
	constructor({ $gauze }, config) {
		this.$gauze = $gauze;
		this.config = config;

		process.on("SIGINT", (val) => {
			console.log("SIGINT", val);
			process.exit(130);
		});

		process.on("SIGTERM", (val) => {
			console.log("SIGTERM", val);
			// https://tldp.org/LDP/abs/html/exitcodes.html
			// 128 + signal_constants from https://nodejs.org/dist/latest-v18.x/docs/api/os.html#signal-constants
			// in this case SIGTERM is 15 so we have 128 + 15
			process.exit(143);
		});

		// this is called once the exit trajectory has been set
		process.on("exit", function (v) {
			console.log("terminating", v);
		});
	}
	execute(command) {
		return new Promise(function (resolve, reject) {
			const child = child_process.exec(command);
			child.stdout.on("data", function (data) {
				console.log(data);
			});
			child.stderr.on("data", function (data) {
				console.error(data);
			});
			child.on("close", function (code) {
				console.log(`child process closed: ${command}`);
				if (code === 0) {
					return resolve(code);
				} else {
					return reject(code);
				}
			});
		});
	}
	create_project(dir) {
		const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), dir);
		const GAUZE_CREATE_PROJECT_COMMAND = path.resolve(GAUZE_BASE_DIR, "./bin/manager_create_project");
		this.execute(`${GAUZE_CREATE_PROJECT_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR}`);
	}
}

const GAUZE__MANAGER__APPLICATION__KERNEL = function (modules, argv) {
	return new GauzeManager(modules, argv);
};

export { GAUZE__MANAGER__APPLICATION__KERNEL };
