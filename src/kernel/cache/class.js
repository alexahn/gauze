class LRUCache {
	constructor ({
		size
	}) {
		this.size = size
		this.cursor = 0
		this.buffer = Array(size).fill(undefined)
		this.values = {}
		this.timestamps = {}
		this.index = {}
	}
	get (key) {
		return {
			value: this.values[key],
			timestamp: this.timestamp[key],
			index: this.index[key]
		}
	}
	put (key, value) {
		var oldest_index = cursor + 1
		var oldest_key = this.buffer[oldest_index]
		if (oldest_key !== undefined) {
			delete this.values[oldest_key]
			delete this.timestamps[oldest_key]
			delete this.index[oldest_key]
		}
		cursor = cursor + 1
		cursor = cursor % this.size
		this.buffer[cursor] = key
		this.values[key] = value
		this.timestamps[key] = new Date().getTime()
		this.index[key] = cursor
	}
	// note: this is necessary to avoid flushing the expired key when traversing the buffer
	del (key) {
		if (this.index[key] !== undefined) {
			this.buffer[this.index[key]] = undefined
			delete this.values[key]
			delete this.timestamps[key]
			delete this.index[key]
		}
	}
}

export {
	LRUCache
}