import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

import fs from "fs";
import path from "path";

class SessionEnvironmentModel extends $kernel.models.environment.EnvironmentModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
		self.operation_create_environment_session = fs.readFileSync(path.resolve(import.meta.dirname, "./operations/create_environment_session.graphql"), {
			encoding: "utf8",
		});
		self.operation_create_environment_session_name = "CreateEnvironmentSession";
	}
	parse_data(data) {
		var parsed_data;
		try {
			parsed_data = JSON.parse(data);
		} catch (error) {
			// note: log?
			parsed_data = {};
		}
		return parsed_data || {};
	}
	set_data_field(data = {}, key, value) {
		const path = key.split(".");
		path.reduce(function (prev, next, index) {
			if (typeof prev[next] === "undefined") {
				if (index === path.length - 1) {
					prev[next] = value;
				} else {
					prev[next] = {};
				}
				return prev[next];
			} else {
				if (index === path.length - 1) {
					prev[next] = value;
					return prev[next];
				} else {
					return prev[next];
				}
			}
		}, data);
		return data;
	}
	get_data_field(data, key) {
		const path = key.split(".");
		return path.reduce(function (prev, next) {
			if (typeof prev === "undefined") {
				return prev;
			} else {
				return prev[next];
			}
		}, data);
	}
	delete_data_field(data, key) {
		const path = key.split(".");
		path.reduce(function (prev, next, index) {
			if (index === path.length - 1) {
				delete prev[next];
			} else {
				if (typeof prev === "undefined") {
					return prev;
				} else {
					return prev[next];
				}
			}
		}, data);
		return data;
	}
	validate_environment_data(serialized) {
		const self = this;
		const valid_sections = {
			assert: true,
			steps: true,
		};
		const valid_agents = {
			root: true,
			account: true,
			user: true,
			person: true,
			character: true,
		};
		const valid_actions = {
			assert: true,
			request: true,
			verify: true,
		};
		const valid_targets = {
			email: true,
			password: true,
			phone_number: true,
		};
		const valid_status = {
			success: true,
			code: true,
		};
		const valid_values = {
			success: "boolean",
			code: "string",
		};

		function validate_assert(assert, path) {
			if (typeof assert !== "string") throw new Error(`Session data field '${path}' must be of type 'string'`);
		}

		function validate_steps(steps, path) {
			Object.keys(steps).forEach(function (agent_key) {
				path = `${path}.${agent_key}`;
				const agent = steps[agent_key];
				if (valid_agents[agent_key]) {
					validate_agent(agent, path);
				} else {
					throw new Error(`Session data field '${path}' is invalid, ${agent_key} must be one of: ${Object.keys(valid_agents)}`);
				}
			});
		}

		function validate_agent(agent, path) {
			Object.keys(agent).forEach(function (action_key) {
				path = `${path}.${action_key}`;
				const action = agent[action_key];
				if (valid_actions[action_key]) {
					validate_action(action, path);
				} else {
					throw new Error(`Session data field '${path}' is invalid, ${action_key} must be one of: ${Object.keys(valid_actions)}`);
				}
			});
		}

		function validate_action(action, path) {
			Object.keys(action).forEach(function (target_key) {
				path = `${path}.${target_key}`;
				const target = action[target_key];
				if (valid_targets[target_key]) {
					validate_target(target, path);
				} else {
					throw new Error(`Session data field '${path}' is invalid, ${target_key} must be one of: ${Object.keys(valid_targets)}`);
				}
			});
		}

		function validate_target(target, path) {
			Object.keys(target).forEach(function (status_key) {
				path = `${path}.${status_key}`;
				const status = target[status_key];
				if (valid_status[status_key]) {
					validate_status(status, status_key, path);
				} else {
					throw new Error(`Session data field '${path}' is invalid, ${status_key} must be one of: ${Object.keys(valid_status)}`);
				}
			});
		}

		function validate_status(value, key, path) {
			if (typeof value === valid_values[key]) {
			} else {
				throw new Error(`Session data field '${path}' is invalid, ${key} must be of type '${valid_values[key]}'`);
			}
		}

		var path = "";
		var data = self.parse_data(serialized);

		Object.keys(data).forEach(function (key) {
			path = key;
			if (key === "steps") {
				const steps = data[key];
				validate_steps(steps, path);
			} else if (key === "assert") {
				const assert = data[key];
				validate_assert(assert, path);
			} else {
				throw new Error(`Session data field '${path}' is not an allowed field, ${key} must be one of '${Object.keys(valid_sections)}'`);
			}
		});
	}
	create_environment(context, parameters) {
		const self = this;
		var { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.session.database.sql.TABLE_NAME__SQL__DATABASE__SESSION__STRUCTURE,
			},
			operation: {
				operation: self.operation_create_environment_session,
				operation_name: self.operation_create_environment_session_name,
			},
		};
		self.validate_environment_data(parameters.attributes.gauze__session__data);
		return self._create(context, parameters, realm).then(function (data) {
			return data.data.create_session.map(function (row) {
				return row.attributes;
			});
		});
	}
	create(context, parameters) {
		const self = this;
		var { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.session.database.sql.TABLE_NAME__SQL__DATABASE__SESSION__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.session.CREATE__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.session.CREATE_NAME__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		self.validate_environment_data(parameters.attributes.gauze__session__data);
		return self._create(context, parameters, realm).then(function (data) {
			return data.data.create_session.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, parameters) {
		const self = this;
		var { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.session.database.sql.TABLE_NAME__SQL__DATABASE__SESSION__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.session.READ__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.session.READ_NAME__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, parameters, realm).then(function (data) {
			return data.data.read_session.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, parameters) {
		const self = this;
		var { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.session.database.sql.TABLE_NAME__SQL__DATABASE__SESSION__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.session.UPDATE__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.session.UPDATE_NAME__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		self.validate_environment_data(parameters.attributes.gauze__session__data);
		return self._update(context, parameters, realm).then(function (data) {
			return data.data.update_session.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, parameters) {
		const self = this;
		var { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.session.database.sql.TABLE_NAME__SQL__DATABASE__SESSION__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.session.DELETE__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.session.DELETE_NAME__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, parameters, realm).then(function (data) {
			return data.data.delete_session.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__SESSION__MODEL__ENVIRONMENT = {
	entity: $abstract.entities.session.default($abstract),
	entity_name: "$abstract.entities.session.default",
};
const CONFIG__SESSION__MODEL__ENVIRONMENT = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__SESSION__MODEL__ENVIRONMENT = new SessionEnvironmentModel(ROOT_CONFIG__SESSION__MODEL__ENVIRONMENT, CONFIG__SESSION__MODEL__ENVIRONMENT);

export { MODEL__SESSION__MODEL__ENVIRONMENT };
