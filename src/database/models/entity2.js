import {
	KnexDatabaseModel
} from './class.js'

const ENTITY2_MODEL_DATABASE_CONFIG = {}
const ENTITY2_MODEL_DATABASE = new KnexDatabaseModel(ENTITY2_MODEL_DATABASE_CONFIG, 'gauze__entity2')

export {
	ENTITY2_MODEL_DATABASE
}