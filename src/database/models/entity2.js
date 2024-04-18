import {
	KnexDatabaseModel
} from './common.js'

const ENTITY2_DATABASE_MODEL_CONFIG = {}
const ENTITY2_DATABASE_MODEL = new KnexDatabaseModel(ENTITY2_DATABASE_MODEL_CONFIG, 'entity2')

export {
	ENTITY2_DATABASE_MODEL
}