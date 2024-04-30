// relationship base class

import {
	SystemModel
} from './system.js'

class RelationshipSystemModel {
    constructor(root_config, config) {
        super(root_config, config);
        const self = this;
		self.system_model = new SystemModel(root_config, config)
    }
	// need a mapping from sql table name to module name
	// gauze__entity1 -> $abstract.entities['entity1'].default($abstract).methods.create.privacy
	_create(context, input, access, operation) {
		// if method is private
			// ensure that both the to_id and from_id are accessable
			// ensure that create method whitelist entry exists for from entity
		// if method is public
			// ensure that both the to_id and from_id are accessable
			// ensure that create method blacklist entry does not exist for from entity
	}
	// note: this method will not be able to navigate relationships
	// note: for private methods, user will have to use the whitelist methods to see what entities they have read access to
	// note: for public methods, user will need to have exposure to an entity before they can explore its relationships
	// requires where.from_id and where.from_type
	_read(context, input, access, operation) {
		// if method is private
			// ensure that read method white entry exists for from entity
		// if method is public
			// ensure that read method black entry does not exist for from entity
	}
	// requires where.id
	_update(context, input, access, operation) {
		// if method is private
			// ensure that both the to_id and from_id are accesssable
			// ensure that update method white entry exists for from entity
		// if method is public
			// ensure that both the to_id and from_id are accessable
			// ensure that update method black entry does not exist for from entity
	}
	// requires where.id
	_delete(context, input, access, operation) {
		// if method is private
			// ensure that delete method white entry exists for from entity
		// if method is public
			// ensure that delete method black entry does not exist for from entity
	}
}

export {
	RelationshipSystemModel
}
