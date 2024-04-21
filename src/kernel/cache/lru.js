import {
	LRUCache
} from './class.js'

// stores large items, size is small
const LRU_LARGE_CACHE_KERNEL = new LRUCache({
	size: 2 << 4
})

// stores medium items, size is medium
const LRU_MEDIUM_CACHE_KERNEL = new LRUCache({
	size: 2 << 8
})

// stores small items, size is large
const LRU_SMALL_CACHE_KERNEL = new LRUCache({
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
		var small_result = LRU_SMALL_CACHE_KERNEL.get(key)
		if (small_result !== undefined) return small_result
		var medium_result = LRU_MEDIUM_CACHE_KERNEL.get(key)
		if (medium_result !== undefined) return medium_result
		var large_result = LRU_LARGE_CACHE_KERNEL.get(key)
		if (large_result !== undefined) return large_result
		return undefined
	}
	put (key, val, size) {
		if (this.minimum_small <= size && size < this.minimum_medium) {
			return LRU_SMALL_CACHE_KERNEL.put(key, val)
		} else if (this.minimum_medium <= size && size < this.minimum_large) {
			return LRU_MEDIUM_CACHE_KERNEL.put(key, val)
		} else {
			return LRU_LARGE_CACHE_KERNEL.put(key, val)
		}
	}
	del (key) {
		LRU_SMALL_CACHE_KERNEL.del(key)
		LRU_MEDIUM_CACHE_KERNEL.del(key)
		LRU_LARGE_CACHE_KERNEL.del(key)
	}
}

const LRU_TIERED_CACHE_KERNEL = new TieredLRUCache({
	minimum_small: 0,
	minimum_medium: 2 << 16,
	minimum_large: 2 << 20
})

export {
	LRU_LARGE_CACHE_KERNEL,
	LRU_MEDIUM_CACHE_KERNEL,
	LRU_SMALL_CACHE_KERNEL,
	LRU_TIERED_CACHE_KERNEL
}