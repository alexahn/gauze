// common methods here
class SystemController {
	constructor (config) {
		this.config = config
	}
}

// todo: authorization, rate limiting, etc
// input model is a system model
class SystemModelSystemController extends SystemController {
	constructor (config, model) {
		super(config)
		this.model = model
	}
	Create ({
		user,
		database,
		transaction
	}, input) {
		const context = {
			database,
			transaction
		}
		return this.model.Create(context, input)
	}
	Read ({
		user,
		database,
		transaction
	}, input) {
		const context = {
			database,
			transaction
		}
		return this.model.Read(context, input)
	}
	TrxUpdate ({
		user,
		database,
		transaction
	}, input) {
		const context = {
			database,
			transaction
		}
		return this.model.Update(context, input)
	}
	Delete ({
		user,
		database,
		transaction
	}, input) {
		const context = {
			database,
			transaction
		}
		return this.model.Delete(context, input)
	}
}

// todo: authorization, rate limiting, etc
// input model is a system model
class RootSystemModelSystemController extends SystemController {
	constructor (config, model) {
		super(config)
		this.model = model
	}
	TransactionCreate ({
		user,
		database
	}, input) {
		return database.transaction(function (transaction) {
			const context = {
				database,
				transaction
			}
			return this.model.Create(context, input).then(trx.commit).catch(trx.rollback)
		})
	}
	TransactionRead ({
		user,
		database
	}, input) {
		return database.transaction(function (transaction) {
			const context = {
				database,
				transaction
			}
			return this.model.Read(context, input).then(trx.commit).catch(trx.rollback)
		})
	}
	TransactionUpdate ({
		user,
		database
	}, input) {
		return database.transaction(function (transaction) {
			const context = {
				database,
				transaction
			}
			return this.model.Update(context, input).then(trx.commit).catch(trx.rollback)
		})
	}
	TransactionDelete ({
		user,
		database
	}, input) {
		return database.transaction(function (transaction) {
			const context = {
				database,
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