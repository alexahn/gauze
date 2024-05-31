import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { v4 as uuidv4 } from "uuid";

import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";

import DataLoader from "./../dataloader.js";
import TTLLRUCache from "./../lru.js";

import { Model } from "./class.js";

import { LOGGER__IO__LOGGER__KERNEL } from "./../logger/io.js";

import { EXECUTE__GRAPHQL__SHELL__KERNEL } from "./../shell/graphql.js";

// note: we need to write tests to make sure using dataloader here doesn't cause any data ownership issues
// note: this is especially critical because this is where agents get created
// note: from a brief overview of the environment controller logic, it seems like it shouldn't be a problem because we are generating unique ids for every entity
// note: but we should probably write the tests to make sure we didn't miss anything
// note: we need dataloader for session verification because we don't want to hit the database for every authenticated session
class EnvironmentModel extends Model {
	constructor(root_config, graphql_config) {
		super(root_config);
		const self = this;
		const { schema, schema_name } = graphql_config;
		self.schema = schema;
		self.schema_name = schema_name;
		self.name = self.__name();
		self.model_loader = new DataLoader(self._model_batch, {
			cacheMap: new TTLLRUCache(1024, 8192),
		});
		self.model_loader.model = self;
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.constructor:exit`);
	}
	static _class_name(schema_name) {
		return schema_name ? `(${schema_name})[${super._class_name()}]EnvironmentModel` : `[${super._class_name()}]EnvironmentModel`;
	}
	__name() {
		const self = this;
		return EnvironmentModel._class_name(self.schema_name);
	}
	_model_batch_key(parameters, realm, method) {
		// only take operation_name from operation
		return JSON.stringify({
			parameters: parameters,
			realm: realm,
			method: method,
		});
	}
	_model_batch(contexts, scopes, keys) {
		const self = this;
		return Promise.all(
			keys.map(function (key, index) {
				const parsed = JSON.parse(key);
				if (parsed.method === "create") {
					return self.model._root_create(contexts[index], scopes[index], parsed.parameters, parsed.realm).then(function (data) {
						self.clearAll();
						return data;
					});
				} else if (parsed.method === "read") {
					return self.model._root_read(contexts[index], scopes[index], parsed.parameters, parsed.realm);
				} else if (parsed.method === "update") {
					return self.model._root_update(contexts[index], scopes[index], parsed.parameters, parsed.realm).then(function (data) {
						self.clearAll();
						return data;
					});
				} else if (parsed.method === "delete") {
					return self.model._root_delete(contexts[index], scopes[index], parsed.parameters, parsed.realm).then(function (data) {
						self.clearAll();
						return data;
					});
				} else {
					throw new Error("Internal error: invalid batch operation");
				}
			}),
		).then(function (results) {
			if (process.env.GAUZE_ENV === "TEST") {
				self.clearAll();
			}
			return results;
		});
	}
	_execute(context, operation_source, operation_variables) {
		const self = this;
		const { operation, operation_name } = operation_source;
		return EXECUTE__GRAPHQL__SHELL__KERNEL({
			schema: self.schema,
			context,
			operation,
			operation_name,
			operation_variables,
		}).then(function (data) {
			if (data.errors && data.errors.length) {
				// should we make a new error here?
				// todo: figure out if we need to log here or not
				console.log(data.errors);
				// throw the first error
				throw data.errors[0];
			} else {
				return Promise.resolve(data);
			}
		});
	}
	_root_create(context, scope, parameters, realm) {
		const self = this;
		const { operation } = realm;
		return self._execute(context, operation, parameters);
	}
	_create(context, scope, parameters, realm) {
		const self = this;
		const key = self._model_batch_key(parameters, realm, "create");
		return self.model_loader.load(context, scope, key);
	}
	_root_read(context, scope, parameters, realm) {
		const self = this;
		const { operation } = realm;
		return self._execute(context, operation, parameters);
	}
	_read(context, scope, parameters, realm) {
		const self = this;
		const key = self._model_batch_key(parameters, realm, "read");
		return self.model_loader.load(context, scope, key);
	}
	_root_update(context, scope, parameters, realm) {
		const self = this;
		const { operation } = realm;
		return self._execute(context, operation, parameters);
	}
	_update(context, scope, parameters, realm) {
		const self = this;
		const key = self._model_batch_key(parameters, realm, "update");
		return self.model_loader.load(context, scope, key);
	}
	_root_delete(context, scope, parameters, realm) {
		const self = this;
		const { operation } = realm;
		return self._execute(context, operation, parameters);
	}
	_delete(context, scope, parameters, realm) {
		const self = this;
		const key = self._model_batch_key(parameters, realm, "delete");
		return self.model_loader.load(context, scope, key);
	}
}

export { EnvironmentModel };
