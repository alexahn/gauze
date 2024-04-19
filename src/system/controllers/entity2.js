import {
	SystemModelSystemController
} from './class.js'
import {
	ENTITY2_MODEL_SYSTEM
} from './../models/entity2.js'

const ENTITY2_CONTROLLER_SYSTEM_CONFIG = {}
const ENTITY2_CONTROLLER_SYSTEM = new SystemModelSystemController(ENTITY2_CONTROLLER_SYSTEM_CONFIG, ENTITY2_MODEL_SYSTEM)

export {
	ENTITY2_CONTROLLER_SYSTEM
}