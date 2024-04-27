import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import assert from "node:assert/strict";
import child_process from "child_process";

const __FILEDIR = import.meta.dirname;
const GAUZE_BASE_DIR = path.resolve(__FILEDIR, "../../");

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
	validate_project_config(config) {}
	read_project_config(config_path) {}
	validate_entity_config(config) {
		function validate_reducers(reducers) {
			reducers.forEach(function (reducer) {
				if (typeof reducer !== "object") throw new Error(`Reducer must be of type 'object': ${reducer}`);
				if (typeof reducer.create !== "function") throw new Error(`Reducer for create method must be of type 'function': ${reducer.create}`);
				if (typeof reducer.read !== "function") throw new Error(`Reducer for read method must be of type 'function': ${reducer.read}`);
				if (typeof reducer.update !== "function") throw new Error(`Reducer for update method must be of type 'function': ${reducer.update}`);
				if (typeof reducer.delete !== "function") throw new Error(`Reducer for delete method must be of type 'function': ${reducer.delete}`);
			});
		}
		// should have a name attribute
		if (typeof config.name !== "string") throw new Error(`Entity must have a 'name' attribute of type 'string': ${config.name}`);
		// should have a primary_key attribute
		if (typeof config.primary_key !== "string") throw new Error(`Entity must have a 'primary_key' attribute of type 'string': ${config.primary_key}`);
		// should have a fields attribute
		if (typeof config.fields !== "object") throw new Error(`Entity must have a 'fields' attribute of type 'object': ${config.fields}`);
		Object.keys(config.fields).forEach(function (key) {
			const field = config.fields[key];
			// name
			if (typeof field.name !== "string") throw new Error(`Field must have a 'name' attribute of type 'string': ${field.name}`);
			if (field.name !== key) throw new Error(`Field 'name' attribute must align with the key in the 'fields' attribute: ${field.name} !== ${key}`);
			// sql_type
			if (typeof field.sql_type !== "string") throw new Error(`Field must have a 'sql_type' attribute of type 'string': ${field.sql_type}`);
			// graphql_type
			if (typeof field.graphql_type !== "object") throw new Error(`Field must have a 'graphql_type' attribute of type 'object': ${field.grapghql_type}`);
			// description
			if (typeof field.description !== "string") throw new Error(`Field must have a 'description' attribute of type 'string': ${field.description}`);
			// pre_serialize_middlewares
			if (typeof field.pre_serialize_middlewares !== "object")
				throw new Error(`Field must have a 'pre_serialize_middlewares' attribute of type 'object': ${field.pre_serialize_middlewares}`);
			if (typeof field.pre_serialize_middlewares.length !== "number")
				throw new Error(`Field 'pre_serialize_middlewares' attribute must have length attribute of type 'number': ${field.pre_serialize_middlewares.length}`);
			validate_reducers(field.pre_serialize_middlewares);
			// serializers
			if (typeof field.serializers !== "object") throw new Error(`Field must have a 'serializers' attribute of type 'object': ${field.serializers}`);
			if (typeof field.serializers.length !== "number") throw new Error(`Field 'serializers' attribute must have length attribute of type 'number': ${field.serializers.length}`);
			validate_reducers(field.serializers);
			// post_serialize_middlewares
			if (typeof field.post_serialize_middlewares !== "object")
				throw new Error(`Field must have a 'post_serialize_middlewares' attribute of type 'object': ${field.post_serialize_middlewares}`);
			if (typeof field.post_serialize_middlewares.length !== "number")
				throw new Error(`Field 'post_serialize_middlewares' attribute must have length attribute of type 'number': ${field.post_serialize_middlewares.length}`);
			validate_reducers(field.post_serialize_middlewares);
			// pre_deserialize_middlewares
			if (typeof field.pre_deserialize_middlewares !== "object")
				throw new Error(`Field must have a 'pre_deserialize_middlewares' attribute of type 'object': ${field.pre_deserialize_middlewares}`);
			if (typeof field.pre_deserialize_middlewares.length !== "number")
				throw new Error(`Field 'pre_deserialize_middlewares' attribute must have length attribute of type 'number': ${field.pre_deserialize_middlewares.length}`);
			validate_reducers(field.pre_deserialize_middlewares);
			// deserializers
			if (typeof field.deserializers !== "object") throw new Error(`Field must have a 'deserializers' attribute of type 'object': ${field.deserializers}`);
			if (typeof field.deserializers.length !== "number") throw new Error(`Field 'deserializers' attribute must have length attribute of type 'number': ${field.deserializers.length}`);
			validate_reducers(field.deserializers);
			// post_deserialize_middlewares
			if (typeof field.post_deserialize_middlewares !== "object")
				throw new Error(`Field must have a 'post_deserialize_middlewares' attribute of type 'object': ${field.post_deserialize_middlewares}`);
			if (typeof field.post_deserialize_middlewares.length !== "number")
				throw new Error(`Field 'post_deserialize_middlewares' attribute must have length attribute of type 'number': ${field.post_deserialize_middlewares.length}`);
			validate_reducers(field.post_deserialize_middlewares);
		});
		// methods
		if (typeof config.methods !== "object") throw new Error(`Entity must have a 'methods' attribute of type 'object': ${config.methods}`);
		Object.keys(config.methods).forEach(function (key) {
			const method = config.methods[key];
			// name
			if (typeof method.name !== "string") throw new Error(`Method must have a 'name' attribute of type 'string': ${method.name}`);
			if (method.name !== key) throw new Error(`Method 'name' attribute must align with the key in the 'methods' attribute: ${method.name} !== ${key}`);
			// privacy
			if (typeof method.privacy !== "string") throw new Error(`Method must have a 'privacy' attribute of type 'object': ${method.privacy}`);
		});
		// graphql_fields
		if (typeof config.graphql_fields !== "object") throw new Error(`Entity must have a 'graphql_fields' attribute of type 'object': ${config.graphql_fields}`);
		// graphql_attributes_string
		if (typeof config.graphql_attributes_string !== "string")
			throw new Error(`Entity must have a 'graphql_attributes_string' attribute of type 'string': ${config.graphql_attributes_string}`);
	}
	read_entity_config(config_path) {
		const self = this;
		return import(config_path).then(function (config) {
			const ENTITY = config.default(self.$gauze.abstract);
			self.validate_entity_config(ENTITY);
			return Promise.resolve(ENTITY);
		});
	}
	create_project(project_dir) {
		const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), project_dir);
		const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/manager_create_project");
		const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR}`;
		return this.execute(COMMAND).catch(function (err) {
			// do something here
		});
	}
	create_gauze(project_dir, entity_file) {
		const self = this;
		const ENTITY_CONFIG_FILE = path.resolve(process.cwd(), entity_file);
		self.read_entity_config(ENTITY_CONFIG_FILE)
			.then(function (entity) {
				const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), project_dir);
				const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/manager_create_gauze");
				const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR} ${entity.name}`;
				return self.execute(COMMAND).then(function () {
					const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), project_dir);
					const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/module_link");
					const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR} ${ENTITY_CONFIG_FILE} ${entity.name}`;
					return self.execute(COMMAND);
				});
			})
			.catch(function (err) {
				console.error(err);
			});
	}
	read_gauze(project_dir, entity_file) {
		const self = this;
		const ENTITY_CONFIG_FILE = path.resolve(process.cwd(), entity_file);
		self.read_entity_config(ENTITY_CONFIG_FILE)
			.then(function (entity) {
				const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), project_dir);
				const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/manager_read_gauze");
				const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR} ${entity.name}`;
				return self.execute(COMMAND);
			})
			.catch(function (err) {
				console.error(err);
			});
	}
	update_gauze(project_dir, entity_file) {
		const self = this;
		const ENTITY_CONFIG_FILE = path.resolve(process.cwd(), entity_file);
		self.read_entity_config(ENTITY_CONFIG_FILE)
			.then(function (entity) {
				const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), project_dir);
				const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/manager_update_gauze");
				const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR} ${entity.name}`;
				return self.execute(COMMAND);
			})
			.catch(function (err) {
				console.error(err);
			});
	}
	delete_gauze(project_dir, entity_file) {
		const self = this;
		const ENTITY_CONFIG_FILE = path.resolve(process.cwd(), entity_file);
		return self
			.read_entity_config(ENTITY_CONFIG_FILE)
			.then(function (entity) {
				const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), project_dir);
				const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/manager_delete_gauze");
				const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR} ${entity.name}`;
				return self.execute(COMMAND).then(function () {
					const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), project_dir);
					const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/module_unlink");
					const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR} ${ENTITY_CONFIG_FILE} ${entity.name}`;
					return self.execute(COMMAND);
				});
			})
			.catch(function (err) {
				console.error(err);
			});
	}
	create_entity(project_dir, entity_file) {
		const self = this;
		const ENTITY_CONFIG_FILE = path.resolve(process.cwd(), entity_file);
		return self
			.read_entity_config(ENTITY_CONFIG_FILE)
			.then(function (entity) {
				const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), project_dir);
				const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/manager_create_entity");
				const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR} ${entity.name}`;
				return self.execute(COMMAND).then(function () {
					const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), project_dir);
					const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/module_link");
					const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR} ${ENTITY_CONFIG_FILE} ${entity.name}`;
					return self.execute(COMMAND);
				});
			})
			.catch(function (err) {
				console.error(err);
			});
	}
	read_entity(project_dir, entity_file) {
		const self = this;
		const ENTITY_CONFIG_FILE = path.resolve(process.cwd(), entity_file);
		return self
			.read_entity_config(ENTITY_CONFIG_FILE)
			.then(function (entity) {
				const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), project_dir);
				const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/manager_read_entity");
				const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR} ${entity.name}`;
				return self.execute(COMMAND);
			})
			.catch(function (err) {
				console.error(err);
			});
	}
	update_entity(project_dir, entity_file) {
		const self = this;
		const ENTITY_CONFIG_FILE = path.resolve(process.cwd(), entity_file);
		return self
			.read_entity_config(ENTITY_CONFIG_FILE)
			.then(function (entity) {
				const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), project_dir);
				const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/manager_update_entity");
				const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR} ${entity.name}`;
				return self.execute(COMMAND);
			})
			.catch(function (err) {
				console.error(err);
			});
	}
	delete_entity(project_dir, entity_file) {
		const self = this;
		const ENTITY_CONFIG_FILE = path.resolve(process.cwd(), entity_file);
		return self
			.read_entity_config(ENTITY_CONFIG_FILE)
			.then(function (entity) {
				const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), project_dir);
				const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/manager_delete_entity");
				const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR} ${entity.name}`;
				return self.execute(COMMAND).then(function () {
					const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), project_dir);
					const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/module_unlink");
					const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${GAUZE_PROJECT_DIR} ${ENTITY_CONFIG_FILE} ${entity.name}`;
					return self.execute(COMMAND);
				});
			})
			.catch(function (err) {
				console.error(err);
			});
	}
	migrate_run() {
		const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/migrate_run");
		const COMMAND = `${GAUZE_SHELL_COMMAND}`;
		this.execute(COMMAND).catch(function (err) {
			// do something here
		});
	}
	migrate_make(name) {
		const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/migrate_make");
		const COMMAND = `${GAUZE_SHELL_COMMAND} ${name}`;
		this.execute(COMMAND).catch(function (err) {
			// do something here
		});
	}
	migrate_rollback() {
		const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/migrate_rollback");
		const COMMAND = `${GAUZE_SHELL_COMMAND}`;
		this.execute(COMMAND).catch(function (err) {
			// do something here
		});
	}
	seed_run() {
		const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/seed_run");
		const COMMAND = `${GAUZE_SHELL_COMMAND}`;
		this.execute(COMMAND).catch(function (err) {
			// do something here
		});
	}
	seed_make(name) {
		const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/seed_make");
		const COMMAND = `${GAUZE_SHELL_COMMAND} ${name}`;
		this.execute(COMMAND).catch(function (err) {
			// do something here
		});
	}
}

const GAUZE__MANAGER__APPLICATION__KERNEL = function (modules, argv) {
	return new GauzeManager(modules, argv);
};

export { GAUZE__MANAGER__APPLICATION__KERNEL };
