import {
	LRUCache
} from './class.js'

// stores large items, size is small
const LARGE_CACHE__LRU__CACHE__KERNEL = new LRUCache({
	size: 2 << 4
})

// stores medium items, size is medium
const MEDIUM_CACHE__LRU__CACHE__KERNEL = new LRUCache({
	size: 2 << 8
})

// stores small items, size is large
const SMALL_CACHE__LRU__CACHE__KERNEL = new LRUCache({
	size: 2 << 12
})

class TieredLRUCache {
	constructor ({
		minimum_small,
		minimum_medium,
		minimum_large
	}) {
		this.minimum_small = minimum_small
		this.minimum_medium = minimum_medium
		this.minimum_large = minimum_large
	}
	get (key) {
		var small_result = SMALL_CACHE__LRU__CACHE__KERNEL.get(key)
		if (small_result !== undefined) return small_result
		var medium_result = MEDIUM_CACHE__LRU__CACHE__KERNEL.get(key)
		if (medium_result !== undefined) return medium_result
		var large_result = LARGE_CACHE__LRU__CACHE__KERNEL.get(key)
		if (large_result !== undefined) return large_result
		return undefined
	}
	put (key, val, size) {
		if (this.minimum_small <= size && size < this.minimum_medium) {
			return SMALL_CACHE__LRU__CACHE__KERNEL.put(key, val)
		} else if (this.minimum_medium <= size && size < this.minimum_large) {
			return MEDIUM_CACHE__LRU__CACHE__KERNEL.put(key, val)
		} else {
			return LARGE_CACHE__LRU__CACHE__KERNEL.put(key, val)
		}
	}
	del (key) {
		SMALL_CACHE__LRU__CACHE__KERNEL.del(key)
		MEDIUM_CACHE__LRU__CACHE__KERNEL.del(key)
		LARGE_CACHE__LRU__CACHE__KERNEL.del(key)
	}
}

const TIERED_CACHE__LRU__CACHE__KERNEL = new TieredLRUCache({
	minimum_small: 0,
	minimum_medium: 2 << 16,
	minimum_large: 2 << 20
})

export {
	LARGE_CACHE__LRU__CACHE__KERNEL,
	MEDIUM_CACHE__LRU__CACHE__KERNEL,
	SMALL_CACHE__LRU__CACHE__KERNEL,
	TIERED_CACHE__LRU__CACHE__KERNEL
}
