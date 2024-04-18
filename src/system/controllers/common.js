// common methods here
class SystemController {
	constructor (config) {
		this.config = config
	}
}

// todo: authorization, rate limiting, etc
// input model is a system model
class SystemModelSystemController extends Controller {
	constructor (config, model) {
		this.model = model
		super(config)
	}
	Create ({
		user,
		connection,
		transaction
	}, input) {
		const context = {
			connection,
			transaction
		}
		return this.model.Create(context, input)
	}
	Read ({
		user,
		connection,
		transaction
	}, input) {
		const context = {
			connection,
			transaction
		}
		return this.model.Read(context, input)
	}
	TrxUpdate ({
		user,
		connection,
		transaction
	}, input) {
		const context = {
			connection,
			transaction
		}
		return this.model.Update(context, input)
	}
	Delete ({
		user,
		connection,
		transaction
	}, input) {
		const context = {
			connection,
			transaction
		}
		return this.model.Delete(context, input)
	}
}

// todo: authorization, rate limiting, etc
// input model is a system model
class RootSystemModelSystemController extends Controller {
	constructor (config, model) {
		this.model = model
		super(config)
	}
	TransactionCreate ({
		user,
		connection
	}, input) {
		return connection.transaction(function (transaction) {
			const context = {
				connection,
				transaction
			}
			return this.model.Create(context, input).then(trx.commit).catch(trx.rollback)
		})
	}
	TransactionRead ({
		user,
		connection
	}, input) {
		return connection.transaction(function (transaction) {
			const context = {
				connection,
				transaction
			}
			return this.model.Read(context, input).then(trx.commit).catch(trx.rollback)
		})
	}
	TransactionUpdate ({
		user,
		connection
	}, input) {
		return connection.transaction(function (transaction) {
			const context = {
				connection,
				transaction
			}
			return this.model.Update(context, input).then(trx.commit).catch(trx.rollback)
		})
	}
	TransactionDelete ({
		user,
		connection
	}, input) {
		return connection.transaction(function (transaction) {
			const context = {
				connection,
				transaction
			}
			return this.model.Delete(context, input).then(trx.commit).catch(trx.rollback)
		})
	}
}

export {
	SystemController,
	SystemModelSystemController,
	RootSystemModelSystemController
}