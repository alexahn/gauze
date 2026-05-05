import { execute, GraphQLError, Kind, parse, specifiedRules, validate, validateSchema } from "graphql";

function MAX_DEPTH_RULE__GRAPHQL__SHELL__SRC__KERNEL(max_depth) {
	return function MaxDepthRule(context) {
		function check_depth(node, visited_fragments, depth) {
			if (node.kind === Kind.FRAGMENT_SPREAD) {
				const fragment_name = node.name.value;
				if (visited_fragments[fragment_name] === true) {
					return null;
				} else {
					const fragment = context.getFragment(fragment_name);
					if (!fragment) {
						return null;
					} else {
						try {
							visited_fragments[fragment_name] = true;
							return check_depth(fragment, visited_fragments, depth);
						} finally {
							visited_fragments[fragment_name] = false;
						}
					}
				}
			} else {
				let next_depth = depth;
				if (node.kind === Kind.FIELD) {
					next_depth = depth + 1;
					if (next_depth > max_depth) {
						return {
							node,
							depth: next_depth,
						};
					} else {
						// ok
					}
				} else {
					// inline fragments and fragment definitions do not add field depth by themselves
				}

				if ("selectionSet" in node && node.selectionSet) {
					for (const selection of node.selectionSet.selections) {
						const result = check_depth(selection, visited_fragments, next_depth);
						if (result) {
							return result;
						} else {
							// ok
						}
					}
				} else {
					// ok
				}
				return null;
			}
		}

		return {
			OperationDefinition(node) {
				const visited_fragments = Object.create(null);
				// The root field selects a Gauze operation; count only the nested response shape below it.
				const result = check_depth(node, visited_fragments, -1);
				if (result) {
					context.reportError(
						new GraphQLError(`Maximum GraphQL operation depth exceeded: ${result.depth} > ${max_depth}`, {
							nodes: [result.node],
						}),
					);
					return false;
				} else {
					// ok
				}
			},
		};
	};
}

function GRAPHQL_VALIDATION_RULES__GRAPHQL__SHELL__SRC__KERNEL(max_depth) {
	return [...specifiedRules, MAX_DEPTH_RULE__GRAPHQL__SHELL__SRC__KERNEL(max_depth)];
}

function GRAPHQL_EXEC__GRAPHQL__SHELL__SRC__KERNEL({ schema, context, operation, operation_name, operation_variables }) {
	const schema_validation_errors = validateSchema(schema);
	if (schema_validation_errors.length > 0) {
		return {
			errors: schema_validation_errors,
		};
	} else {
		let document;
		try {
			document = parse(operation);
		} catch (syntax_error) {
			return {
				errors: [syntax_error],
			};
		}

		const max_depth = parseInt(process.env.GAUZE_GRAPHQL_MAX_DEPTH, 10) || 16;
		const validation_errors = validate(schema, document, GRAPHQL_VALIDATION_RULES__GRAPHQL__SHELL__SRC__KERNEL(max_depth));
		if (validation_errors.length > 0) {
			return {
				errors: validation_errors,
			};
		} else {
			return execute({
				schema: schema,
				contextValue: context,
				document: document,
				operationName: operation_name,
				variableValues: operation_variables,
			});
		}
	}
}

// use this to execute graphql queries throughout the rest of the codebase
const EXECUTE__GRAPHQL__SHELL__SRC__KERNEL = function ({ schema, context, operation, operation_name, operation_variables }) {
	context.operation = JSON.stringify({
		operation,
		operation_name,
		operation_variables,
	});
	return Promise.resolve().then(function () {
		return GRAPHQL_EXEC__GRAPHQL__SHELL__SRC__KERNEL({
			schema,
			context,
			operation,
			operation_name,
			operation_variables,
		});
	});
};

// connection is a knex database connection
const TRANSACTION_EXECUTE__GRAPHQL__SHELL__SRC__KERNEL = function (database_manager, config) {
	const context = config.context || {};
	context.database_manager = database_manager;
	context.transactions = {};
	config.context = context;
	return EXECUTE__GRAPHQL__SHELL__SRC__KERNEL(config)
		.then(function (data) {
			if (data.errors && data.errors.length) {
				throw data.errors;
			}
			return database_manager.commit_context_transactions(context).then(function () {
				return Promise.resolve(data);
			});
		})
		.catch(function (err) {
			return database_manager.rollback_context_transactions(context).then(function () {
				throw err;
			});
		});
};

export { EXECUTE__GRAPHQL__SHELL__SRC__KERNEL, TRANSACTION_EXECUTE__GRAPHQL__SHELL__SRC__KERNEL };
