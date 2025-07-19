function VALIDATE_REQUIREMENTS (requirements, input, depth) {
	depth = depth || 0
	// turn input into a hash map first
	const index = {}
	input.forEach(function (v) {
		index[v] = true
	})
	if (Array.isArray(requirements)) {
		if (depth % 2) {
			return requirements.reduce(function (accum, current) {
				return accum || VALIDATE_REQUIREMENTS(current, input, depth + 1)
			}, false)
		} else {
			return requirements.reduce(function (accum, current) {
				return accum && VALIDATE_REQUIREMENTS(current, input, depth + 1)
			}, true)
		}
	} else {
		return Boolean(index[requirements])
	}
}

const input = ["x", "y", "z", "a", "b", "c"]

const requirements = ["x", ["1", "2", "a"], "b"]

console.log(VALIDATE_REQUIREMENTS(requirements, input))

export {
	VALIDATE_REQUIREMENTS
}
