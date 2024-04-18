function create_index (obj, arr, key) {
	arr.forEach((v) => {
		obj[v[key]] = v
	})
	return obj
}

export {
	create_index
}