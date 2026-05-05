import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { load_steps } from "./steps.js";

function step_source(step) {
	return `export default {
	step: ${step},
	description: "step ${step}",
	context: {},
	operation: {
		name: "Step${step}",
		source: "query Step${step} { __typename }",
		variables: {},
	},
	expected: "{}",
};
`;
}

async function with_steps(files, callback) {
	const directory = await fs.mkdtemp(path.join(os.tmpdir(), "gauze-steps-"));
	try {
		await Promise.all(
			files.map(function (file) {
				return fs.writeFile(path.join(directory, file.name), step_source(file.step));
			}),
		);
		return await callback(directory);
	} finally {
		await fs.rm(directory, {
			recursive: true,
			force: true,
		});
	}
}

test.describe("test step loader", async function () {
	await test.it("rejects missing numbered steps", async function () {
		return with_steps(
			[
				{
					name: "0.first.js",
					step: 0,
				},
				{
					name: "2.third.js",
					step: 2,
				},
			],
			async function (directory) {
				await assert.rejects(
					function () {
						return load_steps(directory, ".");
					},
					{
						message: "Steps has a hole at step 1",
					},
				);
			},
		);
	});

	await test.it("loads contiguous numbered steps", async function () {
		return with_steps(
			[
				{
					name: "0.first.js",
					step: 0,
				},
				{
					name: "1.second.js",
					step: 1,
				},
			],
			async function (directory) {
				const steps = await load_steps(directory, ".");

				assert.equal(steps.length, 2);
				assert.equal(steps[0][0].step, 0);
				assert.equal(steps[1][0].step, 1);
			},
		);
	});
});
