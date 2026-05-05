import assert from "node:assert/strict";
import test from "node:test";

import { BODY_OPTIONS__SERVE__APPLICATION__COMMAND } from "./../../../src/command/application/serve.js";

test.describe("application serve command", async function () {
	await test.it("applies the configured HTTP max size to body parser limits", function () {
		const previous_value = process.env.GAUZE_HTTP_MAX_SIZE;
		process.env.GAUZE_HTTP_MAX_SIZE = "2048";

		try {
			assert.deepEqual(BODY_OPTIONS__SERVE__APPLICATION__COMMAND(), {
				jsonLimit: 2048,
				formLimit: 2048,
				textLimit: 2048,
				formidable: {
					maxFieldsSize: 2048,
					maxFileSize: 2048,
				},
			});
		} finally {
			if (previous_value === undefined) {
				delete process.env.GAUZE_HTTP_MAX_SIZE;
			} else {
				process.env.GAUZE_HTTP_MAX_SIZE = previous_value;
			}
		}
	});
});
