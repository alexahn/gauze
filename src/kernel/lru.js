// map interface ttl lru
// todo: use map under the hood instead of an object
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

//const ttllru_undefined = Symbol("TTLLRU_UNDEFINED")

class TTLLRUCache {
	constructor(maximum_size, maximum_duration) {
		const self = this;
		self.maximum_size = maximum_size;
		self.maximum_duration = maximum_duration;
		self.initialize();
	}
	initialize() {
		const self = this;
		self.size = 0;
		self.cursor = 0;
		self.buffer = Array(self.maximum_size).fill(undefined);
		self.value = {};
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
		const next_position = self.cursor + 1;
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
		self.size = self.size += 1;
		self.size = self.size % self.maximum_size;
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
		Object.keys(this.values).forEach(function (k) {
			f(k, this.values[k]);
		});
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
