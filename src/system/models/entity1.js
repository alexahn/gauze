import {
	DatabaseModelSystemModel
} from './class.js'
import {
	ENTITY1_MODEL_DATABASE
} from './../../database/models/entity1.js'

const ENTITY1_MODEL_SYSTEM_CONFIG = {}
const ENTITY1_MODEL_SYSTEM = new DatabaseModelSystemModel(ENTITY1_MODEL_SYSTEM_CONFIG, ENTITY1_MODEL_DATABASE)

export {
	ENTITY1_MODEL_SYSTEM
}