import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import child_process from "child_process";

const __FILEDIR = import.meta.dirname;
const GAUZE_BASE_DIR = path.resolve(__FILEDIR, "../../../");

class GauzeManager {
	// note: config takes the command argv structure (src/command/commands/create/project.js)
	constructor({ $gauze }, config) {
		this.$gauze = $gauze;
		this.config = config;

		process.on("SIGINT", function (val) {
			$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `process.SIGINT: ${val}`);
			process.exit(130);
		});

		process.on("SIGTERM", function (val) {
			$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `process.SIGTERM: ${val}`);
			// https://tldp.org/LDP/abs/html/exitcodes.html
			// 128 + signal_constants from https://nodejs.org/dist/latest-v18.x/docs/api/os.html#signal-constants
			// in this case SIGTERM is 15 so we have 128 + 15
			process.exit(143);
		});

		// this is called once the exit trajectory has been set
		process.on("exit", function (val) {
			$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `process.exit: ${val}`);
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
				self.$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `child.close: ${command}`);
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
		this.execute(`${GAUZE_CREATE_PROJECT_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR}`).catch(function (err) {
			// do something here
		});
	}
	migrate_run() {
        const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./bin/migrate_run");
        this.execute(`${GAUZE_SHELL_COMMAND}`).catch(function (err) {
            // do something here
        });
	}
	migrate_make(name) {
        const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, `./bin/migrate_make ${name}`);
        this.execute(`${GAUZE_SHELL_COMMAND}`).catch(function (err) {
            // do something here
        });
	}
	migrate_rollback(){ 

	}
	seed_run() {

	}
	seed_make(name) {

	}
}

const GAUZE__MANAGER__APPLICATION__KERNEL = function (modules, argv) {
	return new GauzeManager(modules, argv);
};

export { GAUZE__MANAGER__APPLICATION__KERNEL };
