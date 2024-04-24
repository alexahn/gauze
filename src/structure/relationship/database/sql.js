import {
	SERIALIZER_CREATED_AT_STRUCTURE,
	SERIALIZER_UPDATED_AT_STRUCTURE,
	SERIALIZER_DELETED_AT_STRUCTURE
} from './../../serializers.js'

import {
	PRIMARY_KEY__ABSTRACT__RELATIONSHIP__STRUCTURE
} from './../abstract.js'

const TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE = 'gauze__relationship'
const PRIMARY_KEY__SQL__DATABASE__RELATIONSHIP__STRUCTURE = PRIMARY_KEY__ABSTRACT__RELATIONSHIP__STRUCTURE
const FIELDS__SQL__DATABASE__RELATIONSHIP__STRUCTURE = {
	gauze__relationship__id: true,
	gauze__relationship__created_at: true,
	gauze__relationship__updated_at: true,
	gauze__relationship__deleted_at: true,
	gauze__relationship__from_type: true,
	gauze__relationship__from_id: true,
	gauze__relationship__to_type: true,
	gauze__relationship__to_id: true
}
const PROTECTED_FIELDS__SQL__DATABASE__RELATIONSHIP__STRUCTURE = [
	'gauze__relationship__id',
	'gauze__relationship__created_at',
	'gauze__relationship__updated_at',
	'gauze__relationship__deleted_at'
]
const FIELD_SERIALIZERS__SQL__DATABASE__RELATIONSHIP__STRUCTURE = {
	gauze__relationship__created_at: SERIALIZER_CREATED_AT_STRUCTURE('gauze__relationship__created_at'),
	gauze__relationship__updated_at: SERIALIZER_UPDATED_AT_STRUCTURE('gauze__relationship__updated_at'),
	gauze__relationship__deleted_at: SERIALIZER_DELETED_AT_STRUCTURE('gauze__relationship__deleted_at')
}

export {
	TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
	PRIMARY_KEY__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
	FIELDS__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
	PROTECTED_FIELDS__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
	FIELD_SERIALIZERS__SQL__DATABASE__RELATIONSHIP__STRUCTURE
}