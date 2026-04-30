import { createHmac, timingSafeEqual } from "crypto";

function JSON_REPLACER__CURSOR__SRC__KERNEL(key, value) {
	if (typeof value === "bigint") {
		return value.toString();
	}
	if (value instanceof Uint8Array) {
		return Array.from(value);
	}
	return value;
}

function ENCODE_BASE64URL__CURSOR__SRC__KERNEL(value) {
	return Buffer.from(value, "utf8").toString("base64url");
}

function DECODE_BASE64URL__CURSOR__SRC__KERNEL(value) {
	return Buffer.from(value, "base64url").toString("utf8");
}

function SECRET__CURSOR__SRC__KERNEL() {
	return process.env.GAUZE_CURSOR_SECRET || "GAUZE_CURSOR_SECRET";
}

function SIGN_PAYLOAD__CURSOR__SRC__KERNEL(payload_json) {
	return createHmac("sha256", SECRET__CURSOR__SRC__KERNEL()).update(payload_json).digest("base64url");
}

function ENCODE_PAYLOAD__CURSOR__SRC__KERNEL(payload) {
	const payload_json = JSON.stringify(payload, JSON_REPLACER__CURSOR__SRC__KERNEL);
	const signature = SIGN_PAYLOAD__CURSOR__SRC__KERNEL(payload_json);
	return `${ENCODE_BASE64URL__CURSOR__SRC__KERNEL(payload_json)}.${signature}`;
}

function DECODE_PAYLOAD__CURSOR__SRC__KERNEL(cursor) {
	if (typeof cursor !== "string" || !cursor.includes(".")) {
		throw new Error("Invalid cursor");
	}
	const [encoded_payload, signature, ...rest] = cursor.split(".");
	if (rest.length || !encoded_payload || !signature) {
		throw new Error("Invalid cursor");
	}
	const payload_json = DECODE_BASE64URL__CURSOR__SRC__KERNEL(encoded_payload);
	const expected_signature = SIGN_PAYLOAD__CURSOR__SRC__KERNEL(payload_json);
	const provided = Buffer.from(signature, "base64url");
	const expected = Buffer.from(expected_signature, "base64url");
	if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
		throw new Error("Invalid cursor signature");
	}
	return JSON.parse(payload_json);
}

export {
	JSON_REPLACER__CURSOR__SRC__KERNEL,
	ENCODE_BASE64URL__CURSOR__SRC__KERNEL,
	DECODE_BASE64URL__CURSOR__SRC__KERNEL,
	SECRET__CURSOR__SRC__KERNEL,
	SIGN_PAYLOAD__CURSOR__SRC__KERNEL,
	ENCODE_PAYLOAD__CURSOR__SRC__KERNEL,
	DECODE_PAYLOAD__CURSOR__SRC__KERNEL,
};
