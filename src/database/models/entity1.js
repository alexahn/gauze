import {
	KnexDatabaseModel
} from './class.js'

const ENTITY1_MODEL_DATABASE_CONFIG = {}
const ENTITY1_MODEL_DATABASE = new KnexDatabaseModel(ENTITY1_MODEL_DATABASE_CONFIG, 'gauze__entity1')

export {
	ENTITY1_MODEL_DATABASE
}