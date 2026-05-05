function parseSearchVariables(value) {
	if (typeof value !== "string" || value.length === 0) {
		return {};
	} else {
		try {
			const parsed = JSON.parse(value);
			if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
				return parsed;
			} else {
				return {};
			}
		} catch (err) {
			return {};
		}
	}
}

export { parseSearchVariables };
