import {
	DatabaseModelSystemModel
} from './common.js'
import {
	ENTITY2_DATABASE_MODEL
} from './../../database/models/entity2.js'

const ENTITY2_SYSTEM_MODEL_CONFIG = {}
const ENTITY2_SYSTEM_MODEL = new DatabaseModelSystemModel(ENTITY2_SYSTEM_MODEL_CONFIG, ENTITY2_DATABASE_MODEL)

export {
	ENTITY2_SYSTEM_MODEL
}