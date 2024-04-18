import {
	SystemModelSystemController
} from './common.js'
import {
	ENTITY1_MODEL
} from './../models/entity1.js'

const ENTITY1_SYSTEM_CONTROLLER_CONFIG = {}
const ENTITY1_SYSTEM_CONTROLLER = new SystemModelSystemController(ENTITY1_SYSTEM_CONTROLLER_CONFIG, ENTITY1_MODEL)

export {
	ENTITY1_SYSTEM_CONTROLLER
}