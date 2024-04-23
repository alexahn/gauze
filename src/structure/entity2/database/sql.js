import {
	SERIALIZER_CREATED_AT_STRUCTURE,
	SERIALIZER_UPDATED_AT_STRUCTURE,
	SERIALIZER_DELETED_AT_STRUCTURE
} from './../../serializers.js'

const TABLE_NAME__SQL__DATABASE__ENTITY2__STRUCTURE = 'gauze__entity2'
const PRIMARY_KEY__SQL__DATABASE__ENTITY2__STRUCTURE = 'id'
const FIELDS__SQL__DATABASE__ENTITY2__STRUCTURE = {
	id: true,
	created_at: true,
	updated_at: true,
	deleted_at: true,
	text: true
}
const PROTECTED_FIELDS__SQL__DATABASE__ENTITY2__STRUCTURE = ['id', 'created_at', 'updated_at', 'deleted_at']
const FIELD_SERIALIZERS__SQL__DATABASE__ENTITY2__STRUCTURE = {
	created_at: SERIALIZER_CREATED_AT_STRUCTURE('created_at'),
	updated_at: SERIALIZER_UPDATED_AT_STRUCTURE('updated_at'),
	deleted_at: SERIALIZER_DELETED_AT_STRUCTURE('deleted_at')
}

export {
	TABLE_NAME__SQL__DATABASE__ENTITY2__STRUCTURE,
	PRIMARY_KEY__SQL__DATABASE__ENTITY2__STRUCTURE,
	FIELDS__SQL__DATABASE__ENTITY2__STRUCTURE,
	PROTECTED_FIELDS__SQL__DATABASE__ENTITY2__STRUCTURE,
	FIELD_SERIALIZERS__SQL__DATABASE__ENTITY2__STRUCTURE
}