import * as $database from './../../database/index.js'

import {
	DatabaseModelSystemModel
} from './class.js'

const ENTITY1_MODEL_SYSTEM_CONFIG = {}
const ENTITY1_MODEL_SYSTEM = new DatabaseModelSystemModel(ENTITY1_MODEL_SYSTEM_CONFIG, $database.models.entity1.ENTITY1_MODEL_DATABASE)

export {
	ENTITY1_MODEL_SYSTEM
}