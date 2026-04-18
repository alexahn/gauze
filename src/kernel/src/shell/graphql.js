import { graphql } from "graphql";

// use this to execute graphql queries throughout the rest of the codebase
const EXECUTE__GRAPHQL__SHELL__SRC__KERNEL = function ({ schema, context, operation, operation_name, operation_variables }) {
	context.operation = JSON.stringify({
		operation,
		operation_name,
		operation_variables,
	});
	return graphql({
		schema: schema,
		contextValue: context,
		source: operation,
		operationName: operation_name,
		variableValues: operation_variables,
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
