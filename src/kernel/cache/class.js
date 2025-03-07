class LRUCache {
	constructor({ size }) {
		this.size = size;
		this.cursor = 0;
		this.buffer = Array(size).fill(undefined);
		this.values = {};
		this.timestamps = {};
		this.index = {};
	}
	get(key) {
		if (typeof this.index[key] === "number") {
			return {
				value: this.values[key],
				timestamp: this.timestamps[key],
				index: this.index[key],
			};
		} else {
			return undefined;
		}
	}
	set(key, value) {
		var oldest_index = this.cursor + 1;
		var oldest_key = this.buffer[oldest_index];
		if (oldest_key !== undefined) {
			delete this.values[oldest_key];
			delete this.timestamps[oldest_key];
			delete this.index[oldest_key];
		}
		this.cursor = this.cursor + 1;
		this.cursor = this.cursor % this.size;
		this.buffer[this.cursor] = key;
		this.values[key] = value;
		this.timestamps[key] = new Date().getTime();
		this.index[key] = this.cursor;
	}
	// note: this is necessary to avoid flushing the expired key when traversing the buffer
	delete(key) {
		if (this.index[key] !== undefined) {
			this.buffer[this.index[key]] = undefined;
			delete this.values[key];
			delete this.timestamps[key];
			delete this.index[key];
		}
	}
}

export { LRUCache };
