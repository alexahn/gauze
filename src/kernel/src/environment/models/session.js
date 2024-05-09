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
		const path = key.split('.')
		path.reduce(function (prev, next, index) {
			if (typeof prev[next] === 'undefined') {
				if (index === (path.length - 1)) {
					prev[next] = value
				} else {
					prev[next] = {}
				}
				return prev[next]
			} else {
				if (index === (path.length - 1)) {
					prev[next] = value
					return prev[next]
				} else {
					return prev[next]
				}
			}
		}, data)
		return data
	}
	get_data_field(data, key) {
		const path = key.split('.')
		return path.reduce(function (prev, next) {
			if (typeof prev === 'undefined') {
				return prev
			} else {
				return prev[next]
			}
		}, data)
	}
	delete_data_field(data, key) {
		const path = key.split('.')
		path.reduce(function (prev, next, index) {
			if (index === (path.length - 1)) {
				delete prev[next]
			} else {
				if (typeof prev === 'undefined') {
					return prev
				} else {
					return prev[next]
				}
			}
		}, data)
		return data
	}
	validate_environment_data(serialized) {
		const self = this;
		var data = self.parse_data(serialized);
		Object.keys(data).forEach(function (key) {
			const value = data[key];
			if (key === "assert") {
				if (typeof value !== "string") throw new Error("Session data field 'assert' must be of type string");
			} else if (key === "request") {
				if (typeof value !== "object") throw new Error("Session data field 'request' must be of type object");
				if (typeof value.length !== "number") throw new Error("Session data field 'request' must be of type array");
				value.forEach(function (item) {
					Object.keys(item).forEach(function (subkey) {
						const subvalue = item[subkey];
						if (subkey === "source") {
							if (typeof subvalue !== "string") throw new Error("Session data field 'request.source' must be of type string");
						} else if (subkey === "code") {
							if (typeof subvalue !== "string") throw new Error("Session data field 'request.code' must be of type string");
						} else {
							throw new Error(`Session data field 'request.${subkey}' is not an allowed field, must be either 'request.source' or 'request.code'`);
						}
					});
				});
			} else if (key === "verify") {
				if (typeof value !== "object") throw new Error("Session data field 'verify' must be of type object");
				if (typeof value.length !== "number") throw new Error("Session data field 'verify' must be of type array");
				value.forEach(function (item) {
					Object.keys(item).forEach(function (subkey) {
						const subvalue = item[subkey];
						if (subkey === "source") {
							if (typeof subvalue !== "string") throw new Error("Session data field 'verify.source' must be of type string");
						} else {
							throw new Error(`Session data field 'verify.${subkey}' is not an allowed field, must be 'verify.source'`);
						}
					});
				});
			} else {
				throw new Error(`Session data field '${key}' is not an allowed field, must be either 'assert', 'request', or 'verify'`);
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
