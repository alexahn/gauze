import { LRUCache } from "./class.js";

// stores large items, size is small
const LARGE_CACHE__LRU__CACHE__SRC__KERNEL = new LRUCache({
	size: 2 << 4,
});

// stores medium items, size is medium
const MEDIUM_CACHE__LRU__CACHE__SRC__KERNEL = new LRUCache({
	size: 2 << 8,
});

// stores small items, size is large
const SMALL_CACHE__LRU__CACHE__SRC__KERNEL = new LRUCache({
	size: 2 << 12,
});

class TieredLRUCache {
	constructor({ maximum_small, maximum_medium, maximum_large }) {
		this.maximum_small = maximum_small;
		this.maximum_medium = maximum_medium;
		this.maximum_large = maximum_large;
	}
	get(key) {
		var small_result = SMALL_CACHE__LRU__CACHE__SRC__KERNEL.get(key);
		if (small_result !== undefined) return small_result;
		var medium_result = MEDIUM_CACHE__LRU__CACHE__SRC__KERNEL.get(key);
		if (medium_result !== undefined) return medium_result;
		var large_result = LARGE_CACHE__LRU__CACHE__SRC__KERNEL.get(key);
		if (large_result !== undefined) return large_result;
		return undefined;
	}
	set(key, val, size) {
		if (typeof size !== "number") throw new Error("size argument must be a number");
		if (0 <= size && size <= this.maximum_small) {
			return SMALL_CACHE__LRU__CACHE__SRC__KERNEL.set(key, val);
		} else if (this.maximum_small < size && size <= this.maximum_medium) {
			return MEDIUM_CACHE__LRU__CACHE__SRC__KERNEL.set(key, val);
		} else if (this.maximum_medium < size && size <= this.maximum_large) {
			return LARGE_CACHE__LRU__CACHE__SRC__KERNEL.set(key, val);
		} else {
			// size is too large, discard
			return undefined;
		}
	}
	delete(key) {
		SMALL_CACHE__LRU__CACHE__SRC__KERNEL.delete(key);
		MEDIUM_CACHE__LRU__CACHE__SRC__KERNEL.delete(key);
		LARGE_CACHE__LRU__CACHE__SRC__KERNEL.delete(key);
	}
}

const TIERED_CACHE__LRU__CACHE__SRC__KERNEL = new TieredLRUCache({
	maximum_small: 2 << 12,
	maximum_medium: 2 << 16,
	maximum_large: 2 << 20,
});

export { LARGE_CACHE__LRU__CACHE__SRC__KERNEL, MEDIUM_CACHE__LRU__CACHE__SRC__KERNEL, SMALL_CACHE__LRU__CACHE__SRC__KERNEL, TIERED_CACHE__LRU__CACHE__SRC__KERNEL };
