import * as $database from './../../database/index.js'

import {
	DatabaseModelSystemModel
} from './class.js'

const ENTITY2_MODEL_SYSTEM_CONFIG = {}
const ENTITY2_MODEL_SYSTEM = new DatabaseModelSystemModel(ENTITY2_MODEL_SYSTEM_CONFIG, $database.models.entity2.ENTITY2_MODEL_DATABASE)

export {
	ENTITY2_MODEL_SYSTEM
}