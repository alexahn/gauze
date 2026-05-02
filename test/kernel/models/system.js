import assert from "node:assert/strict";
import test from "node:test";

import * as $gauze from "./../../../src/index.js";
import TTLLRUCache from "./../../../src/kernel/src/lru.js";

const SystemModel = $gauze.kernel.src.models.system.SystemModel;

function with_gauze_env(env, callback) {
	const previous_env = process.env.GAUZE_ENV;
	process.env.GAUZE_ENV = env;
	return Promise.resolve()
		.then(callback)
		.finally(function () {
			if (previous_env === undefined) {
				delete process.env.GAUZE_ENV;
			} else {
				process.env.GAUZE_ENV = previous_env;
			}
		});
}

function auth_key(agent, method = "authorization_filter") {
	return JSON.stringify({
		realm: "system",
		agent: agent,
		entity: {
			entity_type: "gauze__entity",
			entity_method: "read",
		},
		method: method,
	});
}

function model_key(agent, method) {
	return JSON.stringify({
		parameters: {
			where: {
				gauze__entity__id: "entity-1",
			},
		},
		realm: {
			agent: agent,
		},
		method: method,
	});
}

test.describe("system model field filtering", async function () {
	await test.it("merges wildcard and agent-specific allowed fields", function () {
		const model = {
			allowed_fields_agent_types: {
				"*": ["id", "created_at"],
				gauze__agent_user: ["text"],
			},
		};
		const agent = {
			agent_type: "gauze__agent_user",
		};
		const attributes = {
			id: "entity-id",
			created_at: "2026-05-01T00:00:00.000Z",
			text: "visible",
			hidden: "filtered",
		};

		assert.deepEqual(SystemModel.prototype.agent_filter.call(model, agent, attributes), {
			id: "entity-id",
			created_at: "2026-05-01T00:00:00.000Z",
			text: "visible",
		});
	});
});

test.describe("system model cache wiring", async function () {
	await test.it("uses dedicated ttl caches for auth and model dataloaders", function () {
		const model = $gauze.system.models.entity.MODEL__ENTITY__MODEL__SYSTEM;

		assert.equal(model.auth_loader._cacheMap, model.auth_cache);
		assert.equal(model.model_loader._cacheMap, model.model_cache);
	});
});

test.describe("ttl lru cache key ownership", async function () {
	await test.it("clears only the values owned by an agent or entity", function () {
		const cache = new TTLLRUCache(8, 8192);
		cache.set("agent-key", "agent-value");
		cache.set("entity-key", "entity-value");
		cache.set("other-key", "other-value");
		cache.add_agent_key("gauze__agent_user", "agent-1", "agent-key");
		cache.add_entity_key("gauze__entity", "entity-1", "entity-key");

		assert.deepEqual(
			cache.get_agent_keys("gauze__agent_user", "agent-1").map(function (entry) {
				return entry.key;
			}),
			["agent-key"],
		);
		assert.deepEqual(
			cache.get_entity_keys("gauze__entity", "entity-1").map(function (entry) {
				return entry.key;
			}),
			["entity-key"],
		);

		assert.deepEqual(cache.clear_agent_keys("gauze__agent_user", "agent-1"), [true]);
		assert.equal(cache.has("agent-key"), false);
		assert.equal(cache.has("entity-key"), true);
		assert.equal(cache.has("other-key"), true);

		assert.deepEqual(cache.clear_entity_keys("gauze__entity", "entity-1"), [true]);
		assert.equal(cache.has("entity-key"), false);
		assert.equal(cache.has("other-key"), true);
	});

	await test.it("clears ownership indexes when the cache is cleared", function () {
		const cache = new TTLLRUCache(8, 8192);
		cache.set("agent-key", "agent-value");
		cache.set("entity-key", "entity-value");
		cache.add_agent_key("gauze__agent_user", "agent-1", "agent-key");
		cache.add_entity_key("gauze__entity", "entity-1", "entity-key");

		cache.clear();

		assert.deepEqual(cache.get_agent_keys("gauze__agent_user", "agent-1"), []);
		assert.deepEqual(cache.get_entity_keys("gauze__entity", "entity-1"), []);
	});
});

test.describe("system model auth cache ownership", async function () {
	await test.it("indexes auth loader cache keys by the requesting agent", async function () {
		return with_gauze_env("development", function () {
			const agent = {
				agent_type: "gauze__agent_user",
				agent_id: "agent-1",
			};
			const key = auth_key(agent, "authorization_filter");
			const model = {
				auth_cache: new TTLLRUCache(8, 8192),
				_authorization_filter() {
					return Promise.resolve("authorized");
				},
			};
			const loader = {
				model: model,
				clearAll() {
					throw new Error("auth cache should remain inspectable outside test environments");
				},
			};

			return SystemModel.prototype._auth_batch.call(loader, [{}], [{}], [key]).then(function (results) {
				assert.deepEqual(results, ["authorized"]);
				assert.deepEqual(
					model.auth_cache.get_agent_keys("gauze__agent_user", "agent-1").map(function (entry) {
						return entry.key;
					}),
					[key],
				);
			});
		});
	});

	await test.it("clears auth cache entries for the acting agent after create and delete", async function () {
		return with_gauze_env("development", function () {
			const acting_agent = {
				agent_type: "gauze__agent_user",
				agent_id: "agent-1",
			};
			const other_agent = {
				agent_type: "gauze__agent_user",
				agent_id: "agent-2",
			};
			const cache = new TTLLRUCache(8, 8192);
			const acting_auth_key = auth_key(acting_agent);
			const other_auth_key = auth_key(other_agent);
			cache.set(acting_auth_key, Promise.resolve("acting-agent-auth"));
			cache.set(other_auth_key, Promise.resolve("other-agent-auth"));
			cache.add_agent_key(acting_agent.agent_type, acting_agent.agent_id, acting_auth_key);
			cache.add_agent_key(other_agent.agent_type, other_agent.agent_id, other_auth_key);

			const calls = [];
			const model = {
				auth_cache: cache,
				_root_create(context, scope, parameters, realm) {
					calls.push({
						method: "create",
						parameters: parameters,
						realm: realm,
					});
					return Promise.resolve("created");
				},
				_root_delete(context, scope, parameters, realm) {
					calls.push({
						method: "delete",
						parameters: parameters,
						realm: realm,
					});
					return Promise.resolve("deleted");
				},
			};
			const loader = {
				model: model,
				clear_count: 0,
				clearAll() {
					this.clear_count = this.clear_count + 1;
				},
			};

			return SystemModel.prototype._model_batch.call(loader, [{}, {}], [{}, {}], [model_key(acting_agent, "create"), model_key(acting_agent, "delete")]).then(function (results) {
				assert.deepEqual(results, ["created", "deleted"]);
				assert.deepEqual(
					calls.map(function (call) {
						return call.method;
					}),
					["create", "delete"],
				);
				assert.equal(loader.clear_count, 2);
				assert.equal(cache.has(acting_auth_key), false);
				assert.equal(cache.has(other_auth_key), true);
			});
		});
	});

	await test.it("does not clear auth cache entries for update", async function () {
		return with_gauze_env("development", function () {
			const acting_agent = {
				agent_type: "gauze__agent_user",
				agent_id: "agent-1",
			};
			const cache = new TTLLRUCache(8, 8192);
			const acting_auth_key = auth_key(acting_agent);
			cache.set(acting_auth_key, Promise.resolve("acting-agent-auth"));
			cache.add_agent_key(acting_agent.agent_type, acting_agent.agent_id, acting_auth_key);

			const model = {
				auth_cache: cache,
				_root_update() {
					return Promise.resolve("updated");
				},
			};
			const loader = {
				model: model,
				clear_count: 0,
				clearAll() {
					this.clear_count = this.clear_count + 1;
				},
			};

			return SystemModel.prototype._model_batch.call(loader, [{}], [{}], [model_key(acting_agent, "update")]).then(function (results) {
				assert.deepEqual(results, ["updated"]);
				assert.equal(loader.clear_count, 1);
				assert.equal(cache.has(acting_auth_key), true);
			});
		});
	});
});
