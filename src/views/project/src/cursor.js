function decodeBase64URL(value) {
	const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
	const paddingLength = (4 - (base64.length % 4)) % 4;
	const padded = base64 + "=".repeat(paddingLength);
	const binary = atob(padded);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i += 1) {
		bytes[i] = binary.charCodeAt(i);
	}
	return new TextDecoder().decode(bytes);
}

function decodeCursorPayload(cursor) {
	try {
		if (typeof cursor !== "string" || !cursor.includes(".")) {
			return null;
		}
		const parts = cursor.split(".");
		if (parts.length !== 2 || !parts[0] || !parts[1]) {
			return null;
		}
		const payload = JSON.parse(decodeBase64URL(parts[0]));
		if (!payload || payload.v !== 1) {
			return null;
		}
		return payload;
	} catch (err) {
		return null;
	}
}

function cursorPayloadFromPageInfo(pageInfo, variables = {}) {
	const cursor = (pageInfo && pageInfo.current_cursor) || variables.cursor;
	return decodeCursorPayload(cursor);
}

function cursorParametersFromPayload(payload) {
	if (payload && payload.parameters && typeof payload.parameters === "object") {
		return payload.parameters;
	} else {
		return {};
	}
}

function cursorEffectiveVariables(variables = {}, pageInfo = null) {
	const payload = cursorPayloadFromPageInfo(pageInfo, variables);
	if (payload) {
		return {
			...cursorParametersFromPayload(payload),
		};
	} else {
		const copied = {
			...variables,
		};
		delete copied.cursor;
		delete copied.offset;
		return copied;
	}
}

function cursorReadVariables(variables = {}) {
	if (variables.cursor) {
		return {
			cursor: variables.cursor,
		};
	} else {
		const copied = {
			...variables,
		};
		delete copied.offset;
		return copied;
	}
}

function cursorRouteVariables(variables = {}, pageInfo = null) {
	const cursor = (pageInfo && pageInfo.current_cursor) || variables.cursor;
	if (cursor) {
		return {
			cursor,
		};
	} else {
		return cursorReadVariables(variables);
	}
}

function cursorCountVariables(header, variables = {}, pageInfo = null) {
	const parameters = cursorEffectiveVariables(variables, pageInfo);
	return {
		source: parameters.source,
		count: {
			[header.primary_key]: header.primary_key,
		},
		where: parameters.where,
		where_in: parameters.where_in,
		where_not_in: parameters.where_not_in,
		where_like: parameters.where_like,
		where_between: parameters.where_between,
		order: parameters.order,
	};
}

function cursorCurrentPage(payload) {
	if (payload && payload.page && payload[payload.page]) {
		return payload[payload.page];
	} else if (payload && payload.current) {
		return payload.current;
	} else {
		return null;
	}
}

export { decodeCursorPayload, cursorPayloadFromPageInfo, cursorEffectiveVariables, cursorReadVariables, cursorRouteVariables, cursorCountVariables, cursorCurrentPage };
