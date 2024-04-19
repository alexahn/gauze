import {
	DatabaseModelSystemModel
} from './class.js'
import {
	RELATIONSHIP_MODEL_DATABASE
} from './../../database/models/relationship.js'

const RELATIONSHIP_MODEL_SYSTEM_CONFIG = {}
const RELATIONSHIP_MODEL_SYSTEM = new DatabaseModelSystemModel(RELATIONSHIP_MODEL_SYSTEM_CONFIG, RELATIONSHIP_MODEL_DATABASE)

export {
	RELATIONSHIP_MODEL_SYSTEM
}