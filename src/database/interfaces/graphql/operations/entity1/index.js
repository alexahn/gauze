import fs from 'fs'
import path from 'path'

const CREATE_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE = 'CreateEntity1'
const CREATE__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, './create.graphql'), {
	encoding: 'utf8'
})
const READ_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE = 'ReadEntity1'
const READ__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, './read.graphql'), {
	encoding: 'utf8'
})
const UPDATE_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE = 'UpdateEntity1'
const UPDATE__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, './update.graphql'), {
	encoding: 'utf8'
})
const DELETE_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE = 'DeleteEntity1'
const DELETE__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, './delete.graphql'), {
	encoding: 'utf8'
})

export {
	CREATE_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	CREATE__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	READ_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	READ__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE
}