import fs from 'fs'
import path from 'path'

const RELATIONSHIP_CREATE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE = 'CreateRelationship'
const RELATIONSHIP_CREATE_OPERATION_GRAPHQL_INTERFACE_DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, './create.graphql'), {
	encoding: 'utf8'
})
const RELATIONSHIP_READ_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE = 'ReadRelationship'
const RELATIONSHIP_READ_OPERATION_GRAPHQL_INTERFACE_DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, './read.graphql'), {
	encoding: 'utf8'
})
const RELATIONSHIP_UPDATE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE = 'UpdateRelationship'
const RELATIONSHIP_UPDATE_OPERATION_GRAPHQL_INTERFACE_DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, './update.graphql'), {
	encoding: 'utf8'
})
const RELATIONSHIP_DELETE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE = 'DeleteRelationship'
const RELATIONSHIP_DELETE_OPERATION_GRAPHQL_INTERFACE_DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, './delete.graphql'), {
	encoding: 'utf8'
})

export {
	RELATIONSHIP_CREATE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE,
	RELATIONSHIP_CREATE_OPERATION_GRAPHQL_INTERFACE_DATABASE,
	RELATIONSHIP_READ_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE,
	RELATIONSHIP_READ_OPERATION_GRAPHQL_INTERFACE_DATABASE,
	RELATIONSHIP_UPDATE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE,
	RELATIONSHIP_UPDATE_OPERATION_GRAPHQL_INTERFACE_DATABASE,
	RELATIONSHIP_DELETE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE,
	RELATIONSHIP_DELETE_OPERATION_GRAPHQL_INTERFACE_DATABASE
}