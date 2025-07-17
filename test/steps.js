import path from "path";
import assert from "node:assert/strict";

import fs from "node:fs/promises";

import * as $gauze from "./../src/index.js";

function validate_module(module) {
	if (typeof module.step !== "number") throw new TypeError(`Step module must have a 'step' attribute that is of type 'number': ${module.step}`);
	if (typeof module.description !== "string") throw new TypeError(`Step module must have a 'description' attribute that is of type 'string': ${module.description}`);
	if (typeof module.context !== "object") throw new TypeError(`Step module must have a 'context' attribute that is of type 'object': ${module.context}`);
	if (typeof module.operation !== "object") throw new TypeError(`Step module must have an 'operation' attribute that is of type 'object': ${module.operation}`);
	if (typeof module.operation.name !== "string") throw new TypeError(`Step module must have an 'operation.name' attribute that is of type 'string': ${module.operation.name}`);
	if (typeof module.operation.source !== "string") throw new TypeError(`Step module must have an 'operation.source' attribute that is of type 'string': ${module.operation.source}`);
	if (typeof module.operation.variables !== "object")
		throw new TypeError(`Step module must have an 'operation.variables' attribute that is of type 'object': ${module.operation.variables}`);
	if (typeof module.expected !== "string") throw new TypeError(`Step module must have an 'expected' attribute that is of type 'string': ${module.expected}`);
}

function load_steps(base_path, directory) {
	const directory_path = path.resolve(base_path, directory);
	return fs
		.readdir(directory_path)
		.then(function (files) {
			return Promise.all(
				files
					.filter(function (file) {
						return path.extname(file) === ".js";
					})
					.map(function (file) {
						const file_path = path.resolve(base_path, directory, file);
						return import(file_path).then(function (module) {
							// check that the filename is prefixed with the step number
							const file_split = file.split(".");
							const prefix = parseInt(file_split[0]);
							if (prefix !== module.default.step)
								throw new Error(`Step file must be prefixed with the step number followed by a '.', step is ${module.default.step} but prefix is: ${file_split[0]}`);
							module.default.file_path = file_path;
							return module.default;
						});
					}),
			);
		})
		.then(function (modules) {
			// group modules into arrays based on step attribute
			const steps = [];
			var max_step = null;
			modules.forEach(function (module) {
				validate_module(module);
				if (typeof steps[module.step] === "object") {
					// assume it is an array
					steps[module.step].push(module);
				} else {
					steps[module.step] = [module];
				}
				if (module.step <= max_step) {
					max_step = module.step;
				}
			});
			// sanity check: run through array and make sure there are no holes
			for (var i = 0, l = max_step; i < l; i += 1) {
				if (typeof steps[i] === "undefined") {
					throw new Error(`Steps has a hole at step ${i}`);
				}
			}
			return steps;
		});
}

function make_step_error(step) {
	const message = `Step ${step.step} failed at: ${step.file_path}:
Error: Step description: ${step.description}`;
	return new Error(message);
}

function run_step(environment, step) {
	const { database, schema, transaction } = environment;
	const context = {
		database,
		transaction,
	};
	Object.keys(step.context).forEach(function (key) {
		context[key] = step.context[key];
	});
	// schema, context, operation, operation_name, operation_variables
	return $gauze.kernel.src.shell.graphql
		.EXECUTE__GRAPHQL__SHELL__SRC__KERNEL({
			schema,
			context,
			operation: step.operation.source,
			operation_name: step.operation.name,
			operation_variables: step.operation.variables,
		})
		.then(function (data) {
			if (data.errors && data.errors.length) {
				const result = JSON.stringify(data, null, 4);
				try {
					assert.strictEqual(result, step.expected);
				} catch (err) {
					console.log("actual:");
					console.log(result);
					console.log("expected:");
					console.log(step.expected);
					console.log("error:");
					console.log(data.errors);
					throw make_step_error(step);
				}
				return data;
			} else {
				const result = JSON.stringify(data, null, 4);
				try {
					// assert that data.data is the same as the expecation
					// actual, expected
					assert.strictEqual(result, step.expected);
				} catch (err) {
					console.log("actual:");
					console.log(result);
					console.log("expected:");
					console.log(step.expected);
					//console.error(err)
					throw make_step_error(step);
				}
				return data;
			}
		});
}

function run_steps(environment, steps) {
	// make transaction here
	// augment context with database and transaction
	const { database, schema } = environment;
	return database.transaction(function (transaction) {
		return steps
			.reduce(function (prev, next) {
				return prev.then(function () {
					return Promise.all(
						next.map(function (step) {
							return run_step(
								{
									database,
									schema,
									transaction,
								},
								step,
							);
						}),
					);
				});
			}, Promise.resolve([]))
			.then(function () {
				return transaction.rollback();
			})
			.catch(function (err) {
				return transaction
					.rollback(err)
					.then(function () {
						throw err;
					})
					.catch(function (err) {
						throw err;
					});
			});
	});
}

function run_layers(environment, layers) {
	const { database } = environment;
	return database.transaction(function (transaction) {
		return layers
			.reduce(function (prev, next) {
				return prev.then(function () {
					const { schema, steps } = next;
					return steps.reduce(function (prev, next) {
						return prev.then(function () {
							return Promise.all(
								next.map(function (step) {
									return run_step(
										{
											database,
											schema,
											transaction,
										},
										step,
									);
								}),
							);
						});
					}, Promise.resolve([]));
				});
			}, Promise.resolve(true))
			.then(function () {
				return transaction.rollback();
			})
			.catch(function (err) {
				return transaction
					.rollback(err)
					.then(function () {
						throw err;
					})
					.catch(function (err) {
						throw err;
					});
			});
	});
}

export { load_steps, run_steps, run_layers };
