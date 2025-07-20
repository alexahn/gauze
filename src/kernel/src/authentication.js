function VALIDATE_REQUIREMENTS (dependencies, data, requirements, depth) {
	const { session_model } = dependencies
	const asserted = session_model.get_data_field(data, "assert")
	depth = depth || 0
	if (Array.isArray(requirements)) {
		if (depth % 2) {
			return requirements.reduce(function (accum, current) {
				return accum || VALIDATE_REQUIREMENTS(dependencies, data, current, depth + 1)
			}, false)
		} else {
			return requirements.reduce(function (accum, current) {
				return accum && VALIDATE_REQUIREMENTS(dependencies, data, current, depth + 1)
			}, true)
		}
	} else {
		const value = session_model.get_data_field(data, requirements)
		return value && value === asserted
	}
}

export {
	VALIDATE_REQUIREMENTS
}
