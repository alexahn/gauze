import {
	graphql
} from 'graphql';

// use this to execute graphql queries throughout the rest of the codebase
const EXECUTE__GRAPHQL__SHELL__KERNEL = function ({
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
const TRANSACTION_EXECUTE__GRAPHQL__SHELL__KERNEL = function (connection, config) {
	return connection.transaction(function (transaction) {
		const context = config.context || {}
		context.database = connection
		context.transaction = transaction
		config.context = context
		return EXECUTE__GRAPHQL__SHELL__KERNEL(config).then(function (data) {
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
	EXECUTE__GRAPHQL__SHELL__KERNEL,
	TRANSACTION_EXECUTE__GRAPHQL__SHELL__KERNEL
}