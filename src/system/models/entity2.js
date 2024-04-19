import {
	DatabaseModelSystemModel
} from './class.js'
import {
	ENTITY2_MODEL_DATABASE
} from './../../database/models/entity2.js'

const ENTITY2_MODEL_SYSTEM_CONFIG = {}
const ENTITY2_MODEL_SYSTEM = new DatabaseModelSystemModel(ENTITY2_MODEL_SYSTEM_CONFIG, ENTITY2_MODEL_DATABASE)

export {
	ENTITY2_MODEL_SYSTEM
}