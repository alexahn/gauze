import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $project from "./../../../gauze.js";

const HANDLE_REALM_GRAPHQL__HTTP__SERVER__SRC__KERNEL = function ({ $gauze, $realm, database, authenticate, authenticators, schema }, ctx, next) {
	// 404 is the default response status
	return new Promise(function (resolve, reject) {
		const collection = {}
		return resolve(collection)
	}).then(function (collection) {
		return Promise.any(
			authenticators.map(function (authenticate) {
				return authenticate(ctx.get("authorization"));
			}),
		).then(function (agent) {
			return {
				...collection,
				agent
			}
		}).catch(function (err) {
			$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "authentications", err);
			ctx.response.status = 401;
			ctx.response.body = JSON.stringify({
				status: 401,
				message: "Unauthorized",
			});
			throw err
		})
	}).then(function (collection) {
		const { agent } = collection
		if (!agent) throw new Error("Missing agent dependency for creating context")
		return new Promise(function (resolve, reject) {
			database.transaction(function (transaction) {
				const context = {};
				context.project = $project;
				context.realm = $realm;
				context.database = database;
				context.transaction = transaction;
				context.agent = agent;
				return resolve({
					...collection,
					context
				})
			})
		})
	}).then(function (collection) {
		const { context } = collection
		if (!context)  throw new Error("Missing context dependency for verifying jwt")
		const { transaction } = context
		if (!transaction) throw new Error("Missing transaction dependency for verifying jwt")
		return $gauze.environment.authentication.VERIFY_JWT_PAYLOAD(context, context.agent).then(function (session) {
			return {
				...collection,
				session
			}
		}).catch(function (err) {
			// note: rollback can error
			$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "session", err);
			return transaction
				.rollback(err)
				.then(function () {
					$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNAUTHORIZED REVERTED");
					ctx.response.status = 401;
					ctx.response.body = JSON.stringify({
						status: 401,
						message: "Unauthorized",
					});
					return collection
				})
				.catch(function (rollback_err) {
					$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNAUTHORIZED FAILED TO REVERT", rollback_err);
					ctx.response.status = 500;
					ctx.response.body = JSON.stringify({
						status: 500,
						message: "Internal Server Error",
					});
					throw rollback_err
				}).then(function () {
					throw err
				})
		})
	}).then(function (collection) {
		const { context } = collection
		if (!context) throw new Error("Missing context dependency for executing graphql query")
		const { transaction } = context
		if (!transaction) throw new Error("Missing transaction dependency for executing graphql query")
		return $gauze.kernel.src.shell.graphql
			.EXECUTE__GRAPHQL__SHELL__SRC__KERNEL({
				schema: schema,
				context: context,
				operation: ctx.request.body.query,
				operation_name: ctx.request.body.operationName,
				operation_variables: ctx.request.body.variables,
			})
			.then(function (data) {
				// parse data here
				if (data.errors && data.errors.length) {
					$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "errors", data.errors);
					// note: rollback can error
					return transaction
						.rollback()
						.then(function () {
							$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION REVERTED");
							ctx.response.status = 400;
							ctx.response.body = JSON.stringify(data);
							return {
								...collection,
								rollback: data
							}
						})
						.catch(function (err) {
							$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION FAILED TO REVERT", err);
							ctx.response.status = 500;
							ctx.response.body = JSON.stringify({
								status: 500,
								message: "Internal Server Error",
							});
							throw err
						})
				} else {
					// note: commit can error
					return transaction
						.commit(data)
						.then(function () {
							$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION COMMITTED");
							//ctx.response.status = 200
							ctx.response.body = JSON.stringify(data);
							return {
								...collection,
								commit: data
							}
						})
						.catch(function (err) {
							$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION FAILED TO COMMIT", err);
							ctx.response.status = 500;
							ctx.response.body = JSON.stringify({
								status: 500,
								message: "Internal Server Error",
							});
							throw err
						});
				}
			}).catch(function (err) {
				$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "graphql", err);
				ctx.response.status = 500;
				ctx.response.body = JSON.stringify({
					status: 500,
					message: "Internal Server Error",
				});
				// note: rollback can error
				return transaction
					.rollback(err)
					.then(function () {
						$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNEXPECTED REVERTED");
						return collection
					})
					.catch(function (rollback_err) {
						$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNEXPECTED FAILED TO REVERT", rollback_err);
						throw rollback_err
					}).then(function () {
						throw err
					})
			})
	}).then(function (collection) {
		const { rollback } = collection
		if (rollback) {
			// handle error response from graphql query/mutation
			// rollback.errors is an array object
			if (process.env.GAUZE_ENV === "development") {
				// note: better to log instead of throwing a wrapped error becaused the wrapped error loses fidelity
				console.error(rollback.errors)
			}
			//throw new Error("GraphQL query/mutation error")
		}
		return collection
	}).catch(function (err) {
		if (process.env.GAUZE_ENV === "development") {
			console.error(err)
		}
	}).then(next).catch(function (err) {
		return next()
	})

	/*
	return Promise.any(
		authenticators.map(function (authenticate) {
			return authenticate(ctx.get("authorization"));
		}),
	)
		.then(function (agent) {
			return database
				.transaction(function (transaction) {
					const context = {};
					context.project = $project;
					context.realm = $realm;
					context.database = database;
					context.transaction = transaction;
					context.agent = agent;
					return $gauze.environment.authentication
						.VERIFY_JWT_PAYLOAD(context, context.agent)
						.then(function (session) {
							// valid session
							// todo: add check if the agent type is allowed to access this realm
							return $gauze.kernel.src.shell.graphql
								.EXECUTE__GRAPHQL__SHELL__SRC__KERNEL({
									schema: schema,
									context: context,
									operation: ctx.request.body.query,
									operation_name: ctx.request.body.operationName,
									operation_variables: ctx.request.body.variables,
								})
								.then(function (data) {
									if (data.errors && data.errors.length) {
										$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "errors", data.errors);
										// note: rollback can error
										return transaction
											.rollback()
											.then(function () {
												$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION REVERTED");
												ctx.response.status = 400;
												ctx.response.body = JSON.stringify(data);
											})
											.catch(function (err) {
												$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION FAILED TO REVERT", err);
												ctx.response.status = 500;
												ctx.response.body = JSON.stringify({
													status: 500,
													message: "Internal Server Error",
												});
											});
									} else {
										// note: commit can error
										return transaction
											.commit(data)
											.then(function () {
												$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION COMMITTED");
												//ctx.response.status = 200
												ctx.response.body = JSON.stringify(data);
											})
											.catch(function (err) {
												$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION FAILED TO COMMIT", err);
												ctx.response.status = 500;
												ctx.response.body = JSON.stringify({
													status: 500,
													message: "Internal Server Error",
												});
											});
									}
								})
								.catch(function (err) {
									ctx.response.status = 500;
									ctx.response.body = JSON.stringify({
										status: 500,
										message: "Internal Server Error",
									});
									// note: rollback can error
									return transaction
										.rollback(err)
										.then(function () {
											$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNEXPECTED REVERTED");
										})
										.catch(function (err) {
											$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNEXPECTED FAILED TO REVERT");
										});
								});
						})
						.catch(function (err) {
							ctx.response.status = 401;
							ctx.response.body = JSON.stringify({
								status: 401,
								message: "Unauthorized",
							});
							// note: rollback can error
							return transaction
								.rollback(err)
								.then(function () {
									$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNAUTHORIZED REVERTED");
								})
								.catch(function (err) {
									$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNAUTHORIZED FAILED TO REVERT");
									ctx.response.status = 500;
									ctx.response.body = JSON.stringify({
										status: 500,
										message: "Internal Server Error",
									});
								});
						});
				})
				.catch(function (err) {
					$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "unexpected", err);
					ctx.response.status = 500;
					ctx.response.body = JSON.stringify({
						status: 500,
						message: "Internal Server Error",
					});
				});
		})
		.catch(function (err) {
			ctx.response.status = 401;
			ctx.response.body = JSON.stringify({
				status: 401,
				message: "Unauthorized",
			});
		})
		.then(next);
	*/
};

// all this logic is complicated because we don't want to create a transaction unless we have a valid jwt
// the logic would be simpler if we created a transaction before verifying the jwt, because then all the authentication logic would be adjacent to each other
// but i dont want to allocate resources unless we absolutely need to. we can revisit this later and benchmark the difference with the simple version
const HANDLE_ENVIRONMENT_GRAPHQL__HTTP__SERVER__SRC__KERNEL = function ({ $gauze, database, authenticate, authenticators, schema }, ctx, next) {
	// 404 is the default response status
	return Promise.any(
		authenticators.map(function (authenticate) {
			if (ctx.get("authorization")) {
				return authenticate(ctx.get("authorization"));
			} else {
				return null;
			}
		}),
	)
		.then(function (agent) {
			return database
				.transaction(function (transaction) {
					const context = {};
					context.project = $project;
					context.database = database;
					context.transaction = transaction;
					context.agent = agent;
					if (agent) {
						return $gauze.environment.authentication
							.VERIFY_JWT_PAYLOAD(context, context.agent)
							.then(function (session) {
								// valid session
								return $gauze.kernel.src.shell.graphql
									.EXECUTE__GRAPHQL__SHELL__SRC__KERNEL({
										schema: schema,
										context: context,
										operation: ctx.request.body.query,
										operation_name: ctx.request.body.operationName,
										operation_variables: ctx.request.body.variables,
									})
									.then(function (data) {
										if (data.errors && data.errors.length) {
											$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "errors", data.errors);
											// note: rollback can error
											return transaction
												.rollback()
												.then(function () {
													$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION REVERTED");
													ctx.response.status = 400;
													ctx.response.body = JSON.stringify(data);
												})
												.catch(function (err) {
													$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
														"2",
														__RELATIVE_FILEPATH,
														"request",
														"TRANSACTION FAILED TO REVERT",
														err,
													);
													ctx.response.status = 500;
													ctx.response.body = JSON.stringify({
														status: 500,
														message: "Internal Server Error",
													});
												});
										} else {
											// note: commit can error
											return transaction
												.commit(data)
												.then(function () {
													$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION COMMITTED");
													//ctx.response.status = 200
													ctx.response.body = JSON.stringify(data);
												})
												.catch(function (err) {
													$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
														"2",
														__RELATIVE_FILEPATH,
														"request",
														"TRANSACTION FAILED TO COMMIT",
														err,
													);
													ctx.response.status = 500;
													ctx.response.body = JSON.stringify({
														status: 500,
														message: "Internal Server Error",
													});
												});
										}
									})
									.catch(function (err) {
										ctx.response.status = 500;
										ctx.response.body = JSON.stringify({
											status: 500,
											message: "Internal Server Error",
										});
										// note: rollback can error
										return transaction
											.rollback(err)
											.then(function () {
												$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNEXPECTED REVERTED");
											})
											.catch(function (err) {
												$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write(
													"2",
													__RELATIVE_FILEPATH,
													"request",
													"TRANSACTION UNEXPECTED FAILED TO REVERT",
												);
											});
									});
							})
							.catch(function (err) {
								ctx.response.status = 401;
								ctx.response.body = JSON.stringify({
									status: 401,
									message: "Unauthorized",
								});
								// note: rollback can error
								return transaction
									.rollback(err)
									.then(function () {
										$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNAUTHORIZED REVERTED");
									})
									.catch(function (err) {
										$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNAUTHORIZED FAILED TO REVERT");
										ctx.response.status = 500;
										ctx.response.body = JSON.stringify({
											status: 500,
											message: "Internal Server Error",
										});
									});
							});
					} else {
						// no session
						return $gauze.kernel.src.shell.graphql
							.EXECUTE__GRAPHQL__SHELL__SRC__KERNEL({
								schema: schema,
								context: context,
								operation: ctx.request.body.query,
								operation_name: ctx.request.body.operationName,
								operation_variables: ctx.request.body.variables,
							})
							.then(function (data) {
								if (data.errors && data.errors.length) {
									$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "errors", data.errors);
									// note: rollback can error
									return transaction
										.rollback()
										.then(function () {
											$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION REVERTED");
											ctx.response.status = 400;
											ctx.response.body = JSON.stringify(data);
										})
										.catch(function (err) {
											$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION FAILED TO REVERT", err);
											ctx.response.status = 500;
											ctx.response.body = JSON.stringify({
												status: 500,
												message: "Internal Server Error",
											});
										});
								} else {
									// note: commit can error
									return transaction
										.commit(data)
										.then(function () {
											$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION COMMITTED");
											//ctx.response.status = 200
											ctx.response.body = JSON.stringify(data);
										})
										.catch(function (err) {
											$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION FAILED TO COMMIT", err);
											ctx.response.status = 500;
											ctx.response.body = JSON.stringify({
												status: 500,
												message: "Internal Server Error",
											});
										});
								}
							})
							.catch(function (err) {
								ctx.response.status = 500;
								ctx.response.body = JSON.stringify({
									status: 500,
									message: "Internal Server Error",
								});
								// note: rollback can error
								return transaction
									.rollback(err)
									.then(function () {
										$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNEXPECTED REVERTED");
									})
									.catch(function (err) {
										$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNEXPECTED FAILED TO REVERT");
									});
							});
					}
				})
				.catch(function (err) {
					$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "unexpected", err);
					ctx.response.status = 500;
					ctx.response.body = JSON.stringify({
						status: 500,
						message: "Internal Server Error",
					});
				});
		})
		.catch(function (err) {
			ctx.response.status = 401;
			ctx.response.body = JSON.stringify({
				status: 401,
				message: "Unauthorized",
			});
		})
		.then(next);
};

export { HANDLE_REALM_GRAPHQL__HTTP__SERVER__SRC__KERNEL, HANDLE_ENVIRONMENT_GRAPHQL__HTTP__SERVER__SRC__KERNEL };
