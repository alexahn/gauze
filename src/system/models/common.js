// common methods here
class SystemModel {
	constructor (config) {
		this.config = config
	}
}

// input model is a database model
class DatabaseModelSystemModel {
	constructor (config, model) {
		this.model = model
		super(config)
	}
	Create (context, input) {
		return this.model.Create(context, input)
	}
	Read (context, input) {
		return this.model.Read(context, input)
	}
	Update (context, input) {
		return this.model.Update(context, input)
	}
	Delete (context, input) {
		return this.model.Delete(context, input)
	}
}

export {
	SystemModel,
	DatabaseModelSystemModel
}