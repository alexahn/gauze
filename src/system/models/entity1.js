import {
	DatabaseModelSystemModel
} from './common.js'
import {
	ENTITY1_DATABASE_MODEL
} from './../../database/models/entity1.js'

const ENTITY1_SYSTEM_MODEL_CONFIG = {}
const ENTITY1_SYSTEM_MODEL = new DatabaseModelSystemModel(ENTITY1_SYSTEM_MODEL_CONFIG, ENTITY1_DATABASE_MODEL)

export {
	ENTITY1_SYSTEM_MODEL
}