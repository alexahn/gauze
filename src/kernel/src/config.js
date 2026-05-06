const VALID_AGENT_TYPES__CONFIG__SRC__KERNEL = {
	gauze__proxy: true,
	gauze__agent_root: true,
	gauze__agent_account: true,
	gauze__agent_user: true,
	gauze__agent_person: true,
	gauze__agent_character: true,
};

const REQUIRED_PROJECT_KEYS__CONFIG__SRC__KERNEL = {
	name: true,
	type: true,
	version: true,
	environments: true,
	realms: true,
	steps: true,
	authentication: true,
};

const VALID_PROJECT_KEYS__CONFIG__SRC__KERNEL = {
	...REQUIRED_PROJECT_KEYS__CONFIG__SRC__KERNEL,
	process_middlewares: true,
	http_middlewares: true,
};

const VALID_PROJECT_REALM_KEYS__CONFIG__SRC__KERNEL = {
	mode: true,
};

const VALID_PROJECT_REALM_MODES__CONFIG__SRC__KERNEL = {
	open: true,
	closed: true,
	locked: true,
};

const REQUIRED_AUTHENTICATION_KEYS__CONFIG__SRC__KERNEL = {
	proxy: true,
	realms: true,
	agents: true,
};

const REQUIRED_PROJECT_ENVIRONMENT_KEYS__CONFIG__SRC__KERNEL = {
	admins: true,
};

const REQUIRED_ADMIN_KEYS__CONFIG__SRC__KERNEL = {
	name: true,
	email: true,
};

const REQUIRED_REALM_KEYS__CONFIG__SRC__KERNEL = {
	name: true,
	type: true,
	mode: true,
};

const VALID_REALM_KEYS__CONFIG__SRC__KERNEL = {
	...REQUIRED_REALM_KEYS__CONFIG__SRC__KERNEL,
};

const VALID_REALM_MODES__CONFIG__SRC__KERNEL = {
	open: true,
	closed: true,
	locked: true,
};

const MINIMUM_SECRET_BYTES__CONFIG__SRC__KERNEL = 32;

const REQUIRED_ENVIRONMENT_VARIABLES__CONFIG__SRC__KERNEL = {
	GAUZE_ENVIRONMENT_JWT_SECRET: true,
	GAUZE_SYSTEM_JWT_SECRET: true,
	GAUZE_DATABASE_JWT_SECRET: true,
	GAUZE_KERNEL_JWT_SECRET: true,
	GAUZE_PROXY_JWT_SECRET: true,
	GAUZE_CURSOR_SECRET: true,
};

const PLACEHOLDER_SECRET_VALUES__CONFIG__SRC__KERNEL = {
	ENVIRONMENT: true,
	SYSTEM: true,
	DATABASE: true,
	KERNEL: true,
	PROXY: true,
	GAUZE_CURSOR_SECRET: true,
};

function is_non_null_object(value) {
	if (value !== null && typeof value === "object" && !Array.isArray(value)) {
		return true;
	} else {
		return false;
	}
}

function validate_object(label, path, value) {
	if (is_non_null_object(value)) {
		return value;
	} else {
		throw new Error(`${label} property '${path}' must be of type 'object', ${value} is not of type 'object'`);
	}
}

function validate_array(label, path, value) {
	if (Array.isArray(value)) {
		return value;
	} else {
		throw new Error(`${label} property '${path}' must be of type 'Array', ${value} is not of type 'Array'`);
	}
}

function validate_string(label, path, value) {
	if (typeof value === "string") {
		return value;
	} else {
		throw new Error(`${label} property '${path}' must be of type 'string', ${value} is not of type 'string'`);
	}
}

function validate_required_keys(label, path, value, required_keys) {
	Object.keys(required_keys).forEach(function (key) {
		const required_path = path ? `${path}.${key}` : key;
		if (value[key] === undefined) {
			throw new Error(`${label} property '${required_path}' must be defined`);
		} else {
			// ok
		}
	});
}

function validate_allowed_key(label, path, key, valid_keys) {
	if (valid_keys[key]) {
		// ok
	} else {
		throw new Error(`${label} property '${path}' is invalid, property '${key}' must be one of: ${Object.keys(valid_keys)}`);
	}
}

function validate_middleware_array(path, middlewares) {
	validate_array("Project config", path, middlewares);
	middlewares.forEach(function (middleware, index) {
		const middleware_path = `${path}.${index}`;
		if (typeof middleware === "function") {
			// ok
		} else {
			throw new Error(`Project config property '${middleware_path}' must be of type 'function', ${middleware} is not of type 'function'`);
		}
	});
}

function validate_requirement(path, requirement, valid_success_steps) {
	if (Array.isArray(requirement)) {
		requirement.forEach(function (nested_requirement, index) {
			const requirement_path = `${path}.${index}`;
			validate_requirement(requirement_path, nested_requirement, valid_success_steps);
		});
	} else if (typeof requirement === "string") {
		if (valid_success_steps[requirement]) {
			// ok
		} else {
			throw new Error(`Project config property '${path}' is invalid, requirement '${requirement}' must reference a configured success step`);
		}
	} else {
		throw new Error(`Project config property '${path}' must be of type 'string' or 'Array', ${requirement} is not of type 'string' or 'Array'`);
	}
}

function validate_requirements(path, requirements, valid_success_steps) {
	validate_array("Project config", path, requirements);
	requirements.forEach(function (requirement, index) {
		const requirement_path = `${path}.${index}`;
		validate_requirement(requirement_path, requirement, valid_success_steps);
	});
}

function validate_steps(path, steps) {
	validate_object("Project config", path, steps);
	const valid_success_steps = {};
	Object.keys(steps).forEach(function (key) {
		const step_path = `${path}.${key}`;
		if (key.endsWith(".success")) {
			throw new Error(`Project config property '${step_path}' is invalid, step names must not end with '.success'`);
		} else {
			valid_success_steps[`${key}.success`] = true;
		}
	});
	Object.keys(steps).forEach(function (key) {
		const step_path = `${path}.${key}`;
		validate_requirements(step_path, steps[key], valid_success_steps);
	});
	return valid_success_steps;
}

function validate_project_realm(path, realm) {
	validate_object("Project config", path, realm);
	validate_required_keys("Project config", path, realm, VALID_PROJECT_REALM_KEYS__CONFIG__SRC__KERNEL);
	Object.keys(realm).forEach(function (key) {
		const realm_path = `${path}.${key}`;
		if (key === "mode") {
			const mode = realm[key];
			validate_string("Project config", realm_path, mode);
			if (VALID_PROJECT_REALM_MODES__CONFIG__SRC__KERNEL[mode]) {
				// ok
			} else {
				throw new Error(
					`Project config property '${realm_path}' must contain string values from (${Object.keys(VALID_PROJECT_REALM_MODES__CONFIG__SRC__KERNEL)}): ${mode} is not contained`,
				);
			}
		} else {
			validate_allowed_key("Project config", path, key, VALID_PROJECT_REALM_KEYS__CONFIG__SRC__KERNEL);
		}
	});
}

function validate_project_realms(path, realms) {
	validate_object("Project config", path, realms);
	if (Object.keys(realms).length > 0) {
		// ok
	} else {
		throw new Error(`Project config property '${path}' must define at least one realm`);
	}
	Object.keys(realms).forEach(function (key) {
		const realm_path = `${path}.${key}`;
		validate_project_realm(realm_path, realms[key]);
	});
}

function validate_authentication_realms(path, authentication_realms, project_realms, valid_success_steps) {
	validate_object("Project config", path, authentication_realms);
	Object.keys(project_realms).forEach(function (key) {
		const authentication_realm_path = `${path}.${key}`;
		if (authentication_realms[key] === undefined) {
			throw new Error(`Project config property '${authentication_realm_path}' must be defined`);
		} else {
			// ok
		}
	});
	Object.keys(authentication_realms).forEach(function (key) {
		const authentication_realm_path = `${path}.${key}`;
		if (project_realms[key]) {
			validate_requirements(authentication_realm_path, authentication_realms[key], valid_success_steps);
		} else {
			throw new Error(`Project config property '${authentication_realm_path}' is invalid, realm '${key}' must be defined in project realms`);
		}
	});
}

function validate_authentication_agents(path, agents, valid_agent_types, valid_success_steps) {
	validate_object("Project config", path, agents);
	Object.keys(agents).forEach(function (key) {
		const agent_path = `${path}.${key}`;
		if (valid_agent_types[key]) {
			validate_requirements(agent_path, agents[key], valid_success_steps);
		} else {
			throw new Error(`Project config property '${agent_path}' is invalid, agent type '${key}' must be one of: ${Object.keys(valid_agent_types)}`);
		}
	});
}

function validate_authentication(path, authentication, project_realms, valid_agent_types, valid_success_steps) {
	validate_object("Project config", path, authentication);
	validate_required_keys("Project config", path, authentication, REQUIRED_AUTHENTICATION_KEYS__CONFIG__SRC__KERNEL);
	Object.keys(authentication).forEach(function (key) {
		const authentication_path = `${path}.${key}`;
		if (key === "proxy") {
			validate_requirements(authentication_path, authentication[key], valid_success_steps);
		} else if (key === "realms") {
			validate_authentication_realms(authentication_path, authentication[key], project_realms, valid_success_steps);
		} else if (key === "agents") {
			validate_authentication_agents(authentication_path, authentication[key], valid_agent_types, valid_success_steps);
		} else {
			validate_allowed_key("Project config", path, key, REQUIRED_AUTHENTICATION_KEYS__CONFIG__SRC__KERNEL);
		}
	});
}

function validate_admin(path, admin, valid_agent_types) {
	validate_object("Project config", path, admin);
	validate_required_keys("Project config", path, admin, REQUIRED_ADMIN_KEYS__CONFIG__SRC__KERNEL);
	let agent_value_count = 0;
	Object.keys(admin).forEach(function (key) {
		const admin_path = `${path}.${key}`;
		if (key === "name") {
			validate_string("Project config", admin_path, admin[key]);
		} else if (key === "email") {
			validate_string("Project config", admin_path, admin[key]);
		} else if (valid_agent_types[key]) {
			const agent_id = admin[key];
			if (agent_id === null) {
				// ok
			} else if (typeof agent_id === "string") {
				agent_value_count += 1;
			} else {
				throw new Error(`Project config property '${admin_path}' must be of type 'string' or 'null', ${agent_id} is not of type 'string' or 'null'`);
			}
		} else {
			throw new Error(
				`Project config property '${admin_path}' is invalid, property '${key}' must be one of: ${Object.keys({ ...REQUIRED_ADMIN_KEYS__CONFIG__SRC__KERNEL, ...valid_agent_types })}`,
			);
		}
	});
	if (agent_value_count > 0) {
		// ok
	} else {
		throw new Error(`Project config property '${path}' must define at least one admin agent id`);
	}
}

function validate_project_environment(path, environment, valid_agent_types) {
	validate_object("Project config", path, environment);
	validate_required_keys("Project config", path, environment, REQUIRED_PROJECT_ENVIRONMENT_KEYS__CONFIG__SRC__KERNEL);
	Object.keys(environment).forEach(function (key) {
		const environment_path = `${path}.${key}`;
		if (key === "admins") {
			const admins = environment[key];
			validate_array("Project config", environment_path, admins);
			admins.forEach(function (admin, index) {
				const admin_path = `${environment_path}.${index}`;
				validate_admin(admin_path, admin, valid_agent_types);
			});
		} else {
			validate_allowed_key("Project config", path, key, REQUIRED_PROJECT_ENVIRONMENT_KEYS__CONFIG__SRC__KERNEL);
		}
	});
}

function validate_project_environments(path, environments, valid_agent_types) {
	validate_object("Project config", path, environments);
	if (Object.keys(environments).length > 0) {
		// ok
	} else {
		throw new Error(`Project config property '${path}' must define at least one environment`);
	}
	Object.keys(environments).forEach(function (key) {
		const environment_path = `${path}.${key}`;
		validate_project_environment(environment_path, environments[key], valid_agent_types);
	});
}

function validate_realm_mode(path, mode) {
	validate_string("Realm config", path, mode);
	if (VALID_REALM_MODES__CONFIG__SRC__KERNEL[mode]) {
		// ok
	} else {
		throw new Error(`Realm config property '${path}' must contain string values from (${Object.keys(VALID_REALM_MODES__CONFIG__SRC__KERNEL)}): ${mode} is not contained`);
	}
}

function secret_byte_length(value) {
	return new TextEncoder().encode(value).length;
}

function is_placeholder_secret(key, value) {
	const trimmed = value.trim();
	if (trimmed === key) {
		return true;
	} else if (PLACEHOLDER_SECRET_VALUES__CONFIG__SRC__KERNEL[trimmed]) {
		return true;
	} else {
		return false;
	}
}

function VALIDATE_SECRET_ENVIRONMENT_VARIABLE__CONFIG__SRC__KERNEL(key, environment = process.env, options = {}) {
	const minimum_secret_bytes = options.minimum_secret_bytes || MINIMUM_SECRET_BYTES__CONFIG__SRC__KERNEL;
	const value = environment[key];
	if (value === undefined) {
		throw new Error(`Environment variable '${key}' must be defined`);
	} else if (typeof value !== "string") {
		throw new Error(`Environment variable '${key}' must be of type 'string', ${value} is not of type 'string'`);
	} else if (!value.trim()) {
		throw new Error(`Environment variable '${key}' must not be empty`);
	} else if (is_placeholder_secret(key, value)) {
		throw new Error(`Environment variable '${key}' must not use a placeholder secret`);
	} else if (secret_byte_length(value) < minimum_secret_bytes) {
		throw new Error(`Environment variable '${key}' must be at least ${minimum_secret_bytes} bytes`);
	} else {
		return value;
	}
}

const ENVIRONMENT_VARIABLE_VALIDATORS__CONFIG__SRC__KERNEL = {
	GAUZE_ENVIRONMENT_JWT_SECRET: VALIDATE_SECRET_ENVIRONMENT_VARIABLE__CONFIG__SRC__KERNEL,
	GAUZE_SYSTEM_JWT_SECRET: VALIDATE_SECRET_ENVIRONMENT_VARIABLE__CONFIG__SRC__KERNEL,
	GAUZE_DATABASE_JWT_SECRET: VALIDATE_SECRET_ENVIRONMENT_VARIABLE__CONFIG__SRC__KERNEL,
	GAUZE_KERNEL_JWT_SECRET: VALIDATE_SECRET_ENVIRONMENT_VARIABLE__CONFIG__SRC__KERNEL,
	GAUZE_PROXY_JWT_SECRET: VALIDATE_SECRET_ENVIRONMENT_VARIABLE__CONFIG__SRC__KERNEL,
	GAUZE_CURSOR_SECRET: VALIDATE_SECRET_ENVIRONMENT_VARIABLE__CONFIG__SRC__KERNEL,
};

function ENVIRONMENT_VARIABLE__CONFIG__SRC__KERNEL(key, environment = process.env, options = {}) {
	const environment_variable_validators = options.environment_variable_validators || ENVIRONMENT_VARIABLE_VALIDATORS__CONFIG__SRC__KERNEL;
	const validator = environment_variable_validators[key];
	if (typeof key !== "string") {
		throw new Error(`Environment variable key must be of type 'string', ${key} is not of type 'string'`);
	} else if (validator) {
		return validator(key, environment, options);
	} else {
		throw new Error(`Environment variable '${key}' does not have a configured validator`);
	}
}

function VALIDATE_ENVIRONMENT_VARIABLES__CONFIG__SRC__KERNEL(environment = process.env, options = {}) {
	validate_object("Environment variables", "", environment);
	const required_environment_variables = options.required_environment_variables || REQUIRED_ENVIRONMENT_VARIABLES__CONFIG__SRC__KERNEL;
	Object.keys(required_environment_variables).forEach(function (key) {
		ENVIRONMENT_VARIABLE__CONFIG__SRC__KERNEL(key, environment, options);
	});
	return environment;
}

function VALIDATE_PROJECT_CONFIG__CONFIG__SRC__KERNEL(config, options = {}) {
	const valid_agent_types = options.valid_agent_types || VALID_AGENT_TYPES__CONFIG__SRC__KERNEL;
	validate_object("Project config", "", config);
	validate_required_keys("Project config", "", config, REQUIRED_PROJECT_KEYS__CONFIG__SRC__KERNEL);
	validate_project_realms("realms", config.realms);
	const valid_success_steps = validate_steps("steps", config.steps);
	Object.keys(config).forEach(function (key) {
		const path = key;
		if (key === "name") {
			const name = config[key];
			validate_string("Project config", path, name);
		} else if (key === "type") {
			const type = config[key];
			validate_string("Project config", path, type);
			if (type === "project") {
				// ok
			} else {
				throw new Error(`Project config property '${path}' must be 'project', ${type} !== project`);
			}
		} else if (key === "version") {
			const version = config[key];
			validate_string("Project config", path, version);
		} else if (key === "process_middlewares") {
			validate_middleware_array(path, config[key]);
		} else if (key === "http_middlewares") {
			validate_middleware_array(path, config[key]);
		} else if (key === "environments") {
			validate_project_environments(path, config[key], valid_agent_types);
		} else if (key === "realms") {
			// validated before authentication
		} else if (key === "steps") {
			// validated before authentication
		} else if (key === "authentication") {
			validate_authentication(path, config[key], config.realms, valid_agent_types, valid_success_steps);
		} else if (VALID_PROJECT_KEYS__CONFIG__SRC__KERNEL[key]) {
			// ok
		} else {
			throw new Error(`Project config property '${path}' is invalid, property '${key}' must be one of: ${Object.keys(VALID_PROJECT_KEYS__CONFIG__SRC__KERNEL)}`);
		}
	});
	return config;
}

function VALIDATE_REALM_CONFIG__CONFIG__SRC__KERNEL(config, options = {}) {
	const expected_name = options.expected_name;
	validate_object("Realm config", "", config);
	validate_required_keys("Realm config", "", config, REQUIRED_REALM_KEYS__CONFIG__SRC__KERNEL);
	Object.keys(config).forEach(function (key) {
		const path = key;
		if (key === "name") {
			const name = config[key];
			validate_string("Realm config", path, name);
			if (expected_name === undefined) {
				// ok
			} else if (name === expected_name) {
				// ok
			} else {
				throw new Error(`Realm config property '${path}' must align with expected realm name ${expected_name}, ${name} !== ${expected_name}`);
			}
		} else if (key === "type") {
			const type = config[key];
			validate_string("Realm config", path, type);
			if (type === "realm") {
				// ok
			} else {
				throw new Error(`Realm config property '${path}' must be 'realm', ${type} !== realm`);
			}
		} else if (key === "mode") {
			validate_realm_mode(path, config[key]);
		} else {
			validate_allowed_key("Realm config", "", key, VALID_REALM_KEYS__CONFIG__SRC__KERNEL);
		}
	});
	return config;
}

function VALIDATE_CONFIG_TREE__CONFIG__SRC__KERNEL(config_tree, options = {}) {
	validate_object("Config tree", "", config_tree);
	validate_required_keys("Config tree", "", config_tree, {
		project: true,
		realms: true,
	});
	const valid_agent_types = options.valid_agent_types || VALID_AGENT_TYPES__CONFIG__SRC__KERNEL;
	const project = config_tree.project;
	const realms = config_tree.realms;
	VALIDATE_PROJECT_CONFIG__CONFIG__SRC__KERNEL(project, {
		valid_agent_types,
	});
	validate_object("Config tree", "realms", realms);
	Object.keys(realms).forEach(function (key) {
		const realm_path = `realms.${key}`;
		VALIDATE_REALM_CONFIG__CONFIG__SRC__KERNEL(realms[key], {
			expected_name: key,
		});
		if (realms[key].name === key) {
			// ok
		} else {
			throw new Error(`Config tree property '${realm_path}.name' must align with realm key ${key}, ${realms[key].name} !== ${key}`);
		}
	});
	// verify that every realm passed into the config tree exists on the project configuration
	Object.keys(realms).forEach(function (key) {
		const project_realm_path = `project.realms.${key}`;
		if (project.realms[key]) {
			// ok
		} else {
			throw new Error(`Config tree property '${project_realm_path}' must be defined because realms.${key} is defined`);
		}
	});
	// verify that the realm mode is the same in the realm config as the project config
	Object.keys(project.realms).forEach(function (key) {
		const realm_path = `realms.${key}`;
		if (realms[key]) {
			if (project.realms[key].mode === realms[key].mode) {
				// ok
			} else {
				throw new Error(
					`Config tree property 'project.realms.${key}.mode' must match realm config property '${realm_path}.mode', ${project.realms[key].mode} !== ${realms[key].mode}`,
				);
			}
		} else {
			throw new Error(`Config tree property '${realm_path}' must be defined because project.realms.${key} is defined`);
		}
	});
	return config_tree;
}

export {
	ENVIRONMENT_VARIABLE__CONFIG__SRC__KERNEL,
	VALIDATE_CONFIG_TREE__CONFIG__SRC__KERNEL,
	VALIDATE_ENVIRONMENT_VARIABLES__CONFIG__SRC__KERNEL,
	VALIDATE_PROJECT_CONFIG__CONFIG__SRC__KERNEL,
	VALIDATE_REALM_CONFIG__CONFIG__SRC__KERNEL,
	VALIDATE_SECRET_ENVIRONMENT_VARIABLE__CONFIG__SRC__KERNEL,
};
