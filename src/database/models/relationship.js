import {
	KnexDatabaseModel
} from './class.js'

const RELATIONSHIP_MODEL_DATABASE_CONFIG = {}
const RELATIONSHIP_MODEL_DATABASE = new KnexDatabaseModel(RELATIONSHIP_MODEL_DATABASE_CONFIG, 'gauze__relationship')

export {
	RELATIONSHIP_MODEL_DATABASE
}