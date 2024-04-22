import {
	DatabaseController
} from './class.js'
import {
	ENTITY2_MODEL_DATABASE
} from './../models/entity2.js'

const ENTITY2_CONTROLLER_DATABASE_CONFIG = {}
const ENTITY2_CONTROLLER_DATABASE = new DatabaseController(ENTITY2_CONTROLLER_DATABASE_CONFIG, ENTITY2_MODEL_DATABASE)

export {
	ENTITY2_CONTROLLER_DATABASE
}