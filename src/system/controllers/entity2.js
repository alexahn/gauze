import {
	SystemModelSystemController
} from './common.js'
import {
	ENTITY2_MODEL
} from './../models/entity2.js'

const ENTITY2_SYSTEM_CONTROLLER_CONFIG = {}
const ENTITY2_SYSTEM_CONTROLLER = new SystemModelSystemController(ENTITY2_SYSTEM_CONTROLLER_CONFIG, ENTITY2_MODEL)

export {
	ENTITY2_SYSTEM_CONTROLLER
}