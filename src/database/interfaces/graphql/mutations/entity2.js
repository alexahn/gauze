import url from 'url'
import path from 'path'
const __FILEPATH = url.fileURLToPath(import.meta.url)
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH)

import * as $kernel from './../../../../kernel/index.js'
import * as $structure from './../../../../structure/index.js'

import {
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLInterfaceType
} from 'graphql';

import {
	ENTITY2_CONTROLLER_DATABASE
} from './../../../controllers/entity2.js'

const ENTITY2_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.entity2.database.graphql.GRAPHQL_DATABASE_ENTITY2_TYPE_STRUCTURE
})

const ENTITY2_MUTATION_ATTRIBUTES = new GraphQLInputObjectType({
	name: 'Entity2_Mutation__Attributes',
	description: 'Entity2 Mutation Attributes',
	fields: $structure.entity2.database.graphql.GRAPHQL_DATABASE_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE
})

const ENTITY2_CREATE_MUTATION_INTERFACE_DATABASE = {
	type: new GraphQLList($structure.entity2.database.graphql.GRAPHQL_DATABASE_ENTITY2_MUTATION_STRUCTURE),
	args: {
		attributes: {
			description: 'attributes',
			type: ENTITY2_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_CREATE_MUTATION_INTERFACE_DATABASE.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_CREATE_MUTATION_INTERFACE_DATABASE.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY2_CONTROLLER_DATABASE.create({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('2', __RELATIVE_FILEPATH, 'ENTITY2_CREATE_MUTATION_INTERFACE_DATABASE.resolve:success', 'data', data)
				return data.map(ENTITY2_SERIALIZER.serialize)
			})
	}
}

const ENTITY2_UPDATE_MUTATION_INTERFACE_DATABASE = {
	type: new GraphQLList($structure.entity2.database.graphql.GRAPHQL_DATABASE_ENTITY2_MUTATION_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY2_MUTATION_ATTRIBUTES
		},
		attributes: {
			description: 'attributes',
			type: ENTITY2_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_UPDATE_MUTATION_INTERFACE_DATABASE.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_UPDATE_MUTATION_INTERFACE_DATABASE.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY2_CONTROLLER_DATABASE.update({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('2', __RELATIVE_FILEPATH, 'ENTITY2_UPDATE_MUTATION_INTERFACE_DATABASE.resolve:success', 'data', data)
				return data.map(ENTITY2_SERIALIZER.serialize)
			})
	}
}

const ENTITY2_DELETE_MUTATION_INTERFACE_DATABASE = {
	type: new GraphQLList($structure.entity2.database.graphql.GRAPHQL_DATABASE_ENTITY2_MUTATION_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY2_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_DELETE_MUTATION_INTERFACE_DATABASE.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_DELETE_MUTATION_INTERFACE_DATABASE.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY2_CONTROLLER_DATABASE.delete({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('2', __RELATIVE_FILEPATH, 'ENTITY2_DELETE_MUTATION_INTERFACE_DATABASE.resolve:success', 'data', data)
				return data.map(ENTITY2_SERIALIZER.serialize)
			})
	}
}

export {
	ENTITY2_CREATE_MUTATION_INTERFACE_DATABASE,
	ENTITY2_UPDATE_MUTATION_INTERFACE_DATABASE,
	ENTITY2_DELETE_MUTATION_INTERFACE_DATABASE
}