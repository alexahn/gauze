import {
	graphql
} from 'graphql';

// use this to execute graphql queries throughout the rest of the codebase
const GRAPHQL_EXECUTE_SHELL_KERNEL = function ({
	schema,
	context,
	operation,
	operation_name,
	operation_variables
}) {
	return graphql({
		schema: schema,
		contextValue: context,
		source: operation,
		operationName: operation_name,
		variableValues: operation_variables
	})
}

// connection is a knex database connection
const GRAPHQL_TRANSACTION_EXECUTE_SHELL_KERNEL = function (connection, config) {
	return connection.transaction(function (transaction) {
		const context = config.context || {}
		context.database = connection
		context.transaction = transaction
		config.context = context
		return GRAPHQL_EXECUTE_SHELL_KERNEL(config).then(function (data) {
			if (data.errors && data.errors.length) {
				throw data.errors
			}
			return transaction.commit(data).then(function () {
				return Promise.resolve(data)
			})
		}).catch(function (err) {
			return transaction.rollback(err).then(function () {
				throw err
			})
		})

	})
}

export {
	GRAPHQL_EXECUTE_SHELL_KERNEL,
	GRAPHQL_TRANSACTION_EXECUTE_SHELL_KERNEL
}