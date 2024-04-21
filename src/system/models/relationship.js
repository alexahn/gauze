import * as $database from './../../database/index.js'

import {
	DatabaseModelSystemModel
} from './class.js'

const RELATIONSHIP_MODEL_SYSTEM_CONFIG = {}
const RELATIONSHIP_MODEL_SYSTEM = new DatabaseModelSystemModel(RELATIONSHIP_MODEL_SYSTEM_CONFIG, $database.models.relationship.RELATIONSHIP_MODEL_DATABASE)

export {
	RELATIONSHIP_MODEL_SYSTEM
}