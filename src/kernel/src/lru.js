// map interface ttl lru
// todo: use map under the hood instead of an object
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

//const ttllru_undefined = Symbol("TTLLRU_UNDEFINED")

class TTLLRUCache {
	constructor(maximum_size, maximum_duration) {
		const self = this;
		self.maximum_size = maximum_size;
		self.maximum_duration = maximum_duration;
		self.agents = {};
		self.entities = {};
		self.initialize();
	}
	initialize() {
		const self = this;
		self.size = 0;
		self.cursor = 0;
		self.buffer = Array(self.maximum_size).fill(undefined);
		self.values = {};
		self.index = {};
		self.timestamps = {};
	}
	clear() {
		const self = this;
		self.initialize();
	}
	delete(key) {
		const self = this;
		if (self.has(key)) {
			self.buffer[self.index[key]] = undefined;
			delete self.values[key];
			delete self.timestamps[key];
			delete self.index[key];
			self.size = self.size - 1;
			return true;
		} else {
			return false;
		}
	}
	get(key) {
		const self = this;
		if (self.has(key)) {
			return self.values[key];
		} else {
			return undefined;
		}
	}
	has(key) {
		const self = this;
		if (self.index[key] !== undefined) {
			if (new Date().getTime() - self.timestamps[key] <= self.maximum_duration) {
				return true;
			} else {
				self.buffer[self.index[key]] = undefined;
				delete self.values[key];
				delete self.timestamps[key];
				delete self.index[key];
				self.size = self.size - 1;
				return false;
			}
		} else {
			return false;
		}
	}
	set(key, value) {
		const self = this;
		if (self.has(key)) {
			self.buffer[self.index[key]] = undefined;
		}
		const next_position = (self.cursor + 1) % self.maximum_size;
		const next_key = self.buffer[next_position];
		if (next_key !== undefined) {
			self.delete(next_key);
		}
		self.cursor = self.cursor + 1;
		self.cursor = self.cursor % self.maximum_size;
		self.buffer[self.cursor] = key;
		self.values[key] = value;
		self.timestamps[key] = new Date().getTime();
		self.index[key] = self.cursor;
		self.size = Object.keys(self.index).length;
		return this;
	}
	keys() {
		return new KeyIterator(Object.keys(this.values));
	}
	values() {
		return new ValueIterator(Object.values(this.values));
	}
	entries() {
		return new EntryIterator(Object.keys(this.values), Object.values(this.values));
	}
	forEach(f) {
		const self = this;
		Object.keys(self.values).forEach(function (k) {
			f(self.values[k], k);
		});
	}
	get_keys(index, type, id) {
		const self = this;
		if (type in self[index]) {
			if (id in self[index][type]) {
				self[index][type][id] = self[index][type][id].filter(function (entry) {
					return new Date().getTime() - entry.timestamp <= self.maximum_duration;
				});
				return self[index][type][id];
			} else {
				return [];
			}
		} else {
			return [];
		}
	}
	add_key(index, type, id, key) {
		const self = this;
		const entry = {
			key,
			timestamp: new Date().getTime(),
		};
		if (type in self[index]) {
			if (id in self[index][type]) {
				self[index][type][id].push(entry);
				self[index][type][id] = self[index][type][id].filter(function (entry) {
					return new Date().getTime() - entry.timestamp <= self.maximum_duration;
				});
			} else {
				self[index][type][id] = [entry];
			}
		} else {
			self[index][type] = {
				[id]: [entry],
			};
		}
	}
	prune_keys(index) {
		const self = this;
		Object.keys(self[index]).forEach(function (type) {
			Object.keys(self[index][type]).forEach(function (id) {
				self[index][type][id] = self[index][type][id].filter(function (entry) {
					return new Date().getTime() - entry.timestamp <= self.maximum_duration;
				});
			});
		});
	}
	clear_keys(index, type, id) {
		const self = this;
		const entries = self.get_keys(index, type, id);
		return entries.map(function (entry) {
			return self.delete(entry.key);
		});
	}
	get_agent_keys(agent_type, agent_id) {
		const self = this;
		return self.get_keys("agents", agent_type, agent_id);
	}
	add_agent_key(agent_type, agent_id, key) {
		const self = this;
		return self.add_key("agents", agent_type, agent_id, key);
	}
	clear_agent_keys(agent_type, agent_id) {
		const self = this;
		return self.clear_keys("agents", agent_type, agent_id);
	}
	prune_agent_keys() {
		const self = this;
		return self.prune_keys("agents");
	}
	get_entity_keys(entity_type, entity_id) {
		const self = this;
		return self.get_keys("entities", entity_type, entity_id);
	}
	add_entity_key(entity_type, entity_id, key) {
		const self = this;
		return self.add_key("entities", entity_type, entity_id, key);
	}
	clear_entity_keys(entity_type, entity_id) {
		const self = this;
		return self.clear_keys("entities", entity_type, entity_id);
	}
	prune_entity_keys() {
		const self = this;
		return self.prune_keys("entities");
	}
}

function EntryIterator(keys, values) {
	this.index = 0;
	this.keys = keys;
	this.values = values;
	this.size = this.keys.length;
}
EntryIterator.prototype[Symbol.iterator] = function () {
	return this;
};
EntryIterator.prototype.next = function () {
	if (this.index < this.size) {
		const result = {
			done: false,
			value: [this.keys[this.index], this.values[this.index]],
		};
		this.index = this.index + 1;
		return result;
	} else {
		return {
			done: true,
			value: undefined,
		};
	}
};

function KeyIterator(keys) {
	this.index = 0;
	this.keys = keys;
	this.size = this.keys.length;
}
KeyIterator.prototype[Symbol.iterator] = function () {
	return this;
};
KeyIterator.prototype.next = function () {
	if (this.index < this.size) {
		const result = {
			done: false,
			value: this.keys[this.index],
		};
		this.index = this.index + 1;
		return result;
	} else {
		return {
			done: true,
			value: undefined,
		};
	}
};

function ValueIterator(values) {
	this.index = 0;
	this.values = values;
	this.size = this.values.length;
}
ValueIterator.prototype[Symbol.iterator] = function () {
	return this;
};
ValueIterator.prototype.next = function () {
	if (this.index < this.size) {
		const result = {
			done: false,
			value: this.values[this.index],
		};
		this.index = this.index + 1;
		return result;
	} else {
		return {
			done: true,
			value: undefined,
		};
	}
};

export default TTLLRUCache;
