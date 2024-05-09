import fs from "fs";
import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import assert from "node:assert/strict";
import child_process from "child_process";

const __FILEDIR = import.meta.dirname;
const GAUZE_BASE_DIR = path.resolve(__FILEDIR, "../../");
// GAUZE_ROOT_DIR is only used when we need to reference the src directory from outside of it
const GAUZE_ROOT_DIR = path.resolve(__FILEDIR, "../../../");

// only allows one underscore per word
function to_snake_case(string) {
	string = string.replace(" ", "_");
	string = string.replace("-", "_");
	var split = string
		.split("_")
		.map(function (part) {
			return part.toLowerCase();
		})
		.filter(function (x) {
			return x;
		});
	return split.join("_");
}

class GauzeManager {
	// note: config takes the command argv structure (src/command/commands/create/project.js)
	constructor({ $gauze }, config) {
		const self = this;
		self.$gauze = $gauze;
		self.config = config;

		self.valid_agent_types = {};
		if ($gauze.abstract.entities.agent_root) {
			const agent_root = $gauze.abstract.entities.agent_root.default($gauze.abstract);
			self.valid_agent_types[agent_root.table_name] = true;
		}
		if ($gauze.abstract.entities.agent_account) {
			const agent_account = $gauze.abstract.entities.agent_account.default($gauze.abstract);
			self.valid_agent_types[agent_account.table_name] = true;
		}
		if ($gauze.abstract.entities.agent_user) {
			const agent_user = $gauze.abstract.entities.agent_user.default($gauze.abstract);
			self.valid_agent_types[agent_user.table_name] = true;
		}
		if ($gauze.abstract.entities.agent_person) {
			const agent_person = $gauze.abstract.entities.agent_person.default($gauze.abstract);
			self.valid_agent_types[agent_person.table_name] = true;
		}
		if ($gauze.abstract.entities.agent_character) {
			const agent_character = $gauze.abstract.entities.agent_character.default($gauze.abstract);
			self.valid_agent_types[agent_character.table_name] = true;
		}
		if ($gauze.abstract.entities.proxy) {
			const proxy = $gauze.abstract.entities.proxy.default($gauze.abstract);
			self.valid_agent_types[proxy.table_name] = true;
		}

		self.valid_agent_type_exceptions = {
			gauze__proxy: true,
			gauze__agent_root: true,
			gauze__agent_account: true,
			gauze__agent_user: true,
			gauze__agent_person: true,
			gauze__agent_character: true,
		};

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
		const self = this;
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
		if (to_snake_case(config.name) !== config.name) throw new Error(`Entity must have a 'name' attribute in lower snake case: ${config.name} !== ${to_snake_case(config.name)}`);
		// should have a table_name attribute
		if (typeof config.table_name !== "string") throw new Error(`Entity must have a 'table_name' attribute of type 'string': ${config.table_name}`);
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
			if (typeof method.valid_agent_types !== "object") throw new Error(`Method must have a 'valid_agent_types' attribute of type 'array': ${method.valid_agent_types}`);
			if (typeof method.valid_agent_types.length !== "number") throw new Error(`Method must have a 'valid_agent_types' attribute of type 'array': ${method.valid_agent_types}`);
			method.valid_agent_types.forEach(function (agent_type) {
				if (typeof agent_type !== "string") throw new Error(`Method attribute 'valid_agent_types' must contain only string values`);
				if (agent_type === config.table_name) {
					if (!self.valid_agent_type_exceptions[agent_type])
						throw new Error(`Method attribute 'valid_agent_types' must contain string values from (${Object.keys(self.valid_agent_type_exceptions)}): ${agent_type}`);
				} else {
					if (!self.valid_agent_types[agent_type])
						throw new Error(`Method attribute 'valid_agent_types' must contain string values from (${Object.keys(self.valid_agent_types)}): ${agent_type}`);
				}
			});
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
	// note: very basic interpolation that will just look for a line ending with "attributes {" and delete all the lines until a line ends with "}"
	interpolate_operation(operation_file, substitute) {
		const SOURCE = fs.readFileSync(operation_file, { encoding: "utf8" });
		const SPLIT = SOURCE.split("\n");
		const START_PATTERN = new RegExp("attributes {$");
		const END_PATTERN = new RegExp("}$");
		var matched = false;
		var matched_start = null;
		var matched_end = null;
		const FILTERED = SPLIT.map(function (line, index) {
			if (matched) {
				if (END_PATTERN.test(line)) {
					matched = false;
					matched_end = index;
					return line;
				} else {
					return null;
				}
			}
			{
				if (START_PATTERN.test(line)) {
					matched = true;
					matched_start = index;
					return line;
				} else {
					return line;
				}
			}
		}).filter(function (x) {
			return x;
		});
		if (typeof matched_start === "number") {
			// splice SPLIT here with the substitute
			FILTERED.splice(matched_start + 1, 0, substitute);
		}
		const JOINED = FILTERED.join("\n");
		fs.writeFileSync(operation_file, JOINED, { encoding: "utf8" });
		return Promise.resolve(JOINED);
	}
	interpolate_operations(project_dir, entity) {
		const self = this;
		// use entity.graphql_attributes_string as the substitution
		const OPERATIONS = [
			path.resolve(project_dir, `./database/interfaces/graphql/operations/${entity.name}/create.graphql`),
			path.resolve(project_dir, `./database/interfaces/graphql/operations/${entity.name}/read.graphql`),
			path.resolve(project_dir, `./database/interfaces/graphql/operations/${entity.name}/update.graphql`),
			path.resolve(project_dir, `./database/interfaces/graphql/operations/${entity.name}/delete.graphql`),
		];
		return Promise.all(
			OPERATIONS.map(function (operation) {
				return self.interpolate_operation(operation, entity.graphql_attributes_string);
			}),
		);
	}
	// =========================
	create_project(project_dir) {
		const GAUZE_PROJECT_DIR = path.resolve(process.cwd(), project_dir);
		const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/manager_create_project");
		const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_ROOT_DIR} ${GAUZE_PROJECT_DIR}`;
		return this.execute(COMMAND).catch(function (err) {
			console.error(err);
			process.exit(1);
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
					return self.execute(COMMAND).then(function () {
						return self.interpolate_operations(GAUZE_PROJECT_DIR, entity);
					});
				});
			})
			.catch(function (err) {
				console.error(err);
				process.exit(1);
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
				process.exit(1);
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
				return self.execute(COMMAND).then(function () {
					return self.interpolate_operations(GAUZE_PROJECT_DIR, entity);
				});
			})
			.catch(function (err) {
				console.error(err);
				process.exit(1);
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
				process.exit(1);
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
					return self.execute(COMMAND).then(function () {
						return self.interpolate_operations(GAUZE_PROJECT_DIR, entity);
					});
				});
			})
			.catch(function (err) {
				console.error(err);
				process.exit(1);
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
				process.exit(1);
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
				return self.execute(COMMAND).then(function () {
					return self.interpolate_operations(GAUZE_PROJECT_DIR, entity);
				});
			})
			.catch(function (err) {
				console.error(err);
				process.exit(1);
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
				process.exit(1);
			});
	}
	migrate_run() {
		const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/migrate_run");
		const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR}`;
		this.execute(COMMAND).catch(function (err) {
			console.error(err);
			process.exit(1);
		});
	}
	migrate_make(name) {
		const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/migrate_make");
		const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${name}`;
		this.execute(COMMAND).catch(function (err) {
			console.error(err);
			process.exit(1);
		});
	}
	migrate_rollback() {
		const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/migrate_rollback");
		const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR}`;
		this.execute(COMMAND).catch(function (err) {
			console.error(err);
			process.exit(1);
		});
	}
	seed_run() {
		const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/seed_run");
		const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR}`;
		this.execute(COMMAND).catch(function (err) {
			console.error(err);
			process.exit(1);
		});
	}
	seed_make(name) {
		const GAUZE_SHELL_COMMAND = path.resolve(GAUZE_BASE_DIR, "./kernel/bin/seed_make");
		const COMMAND = `${GAUZE_SHELL_COMMAND} ${GAUZE_BASE_DIR} ${name}`;
		this.execute(COMMAND).catch(function (err) {
			console.error(err);
			process.exit(1);
		});
	}
}

const GAUZE__MANAGER__APPLICATION__KERNEL = function (modules, argv) {
	return new GauzeManager(modules, argv);
};

export { GAUZE__MANAGER__APPLICATION__KERNEL };
