import * as cache from "./index.js";

console.log("cache", cache);

/*
import { LRUCache } from "./class.js"

const cache = new LRUCache({
	size: 2
})

console.log('cache', cache)

cache.put('hello', 1)

console.log(cache.get('hello'))

cache.put('wtf', 'cached value')

console.log(cache.get('wtf'))

console.log('cache', cache)

cache.put('anything', 'something')

console.log(cache.get('anything'))

console.log('cache', cache)
*/

cache.lru.TIERED_CACHE__LRU__CACHE__KERNEL.put("hello", [1, 2], 2);

console.log(cache.lru.TIERED_CACHE__LRU__CACHE__KERNEL.get("hello"));
