import {
	KnexDatabaseModel
} from './common.js'

const ENTITY1_DATABASE_MODEL_CONFIG = {}
const ENTITY1_DATABASE_MODEL = new KnexDatabaseModel(ENTITY1_DATABASE_MODEL_CONFIG, 'gauze__entity1')

export {
	ENTITY1_DATABASE_MODEL
}