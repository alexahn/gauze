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

export {
	LRU_LARGE_CACHE_KERNEL,
	LRU_MEDIUM_CACHE_KERNEL,
	LRU_SMALL_CACHE_KERNEL
}