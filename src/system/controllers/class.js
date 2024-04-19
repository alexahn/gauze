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
	Update ({
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

export {
	SystemController,
	SystemModelSystemController
}