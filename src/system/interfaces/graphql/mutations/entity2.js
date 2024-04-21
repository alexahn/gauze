import url from 'url'
import path from 'path'
const __FILEPATH = url.fileURLToPath(import.meta.url)
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH)

import * as $kernel from './../../../../kernel/index.js'

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
	Serializer
} from './../../../../structure/serializer.js'

import {
	GRAPHQL_SYSTEM_ENTITY2_MUTATION_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE
} from './../../../../structure/entity2/system/graphql.js'

import {
	ENTITY2_CONTROLLER_SYSTEM
} from './../../../controllers/entity2.js'

const ENTITY2_MUTATION_ATTRIBUTES = new GraphQLInputObjectType({
	name: 'Entity2_Mutation__Attributes',
	description: 'Entity2 Mutation Attributes',
	fields: GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE
})

const ENTITY2_SERIALIZER = new Serializer({
	graphql_type: GRAPHQL_SYSTEM_ENTITY2_TYPE_STRUCTURE
})

const ENTITY2_CREATE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_ENTITY2_MUTATION_STRUCTURE),
	args: {
		attributes: {
			description: 'attributes',
			type: ENTITY2_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_CREATE_MUTATION_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_CREATE_MUTATION_INTERFACE_SYSTEM.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY2_CONTROLLER_SYSTEM.Create({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, 'ENTITY2_CREATE_MUTATION_INTERFACE_SYSTEM.resolve:success', 'data', data)
				return data.map(ENTITY2_SERIALIZER.serialize)
			})
	}
}

const ENTITY2_UPDATE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_ENTITY2_MUTATION_STRUCTURE),
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
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_UPDATE_MUTATION_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_UPDATE_MUTATION_INTERFACE_SYSTEM.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY2_CONTROLLER_SYSTEM.Update({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, 'ENTITY2_UPDATE_MUTATION_INTERFACE_SYSTEM.resolve:success', 'data', data)
				return data.map(ENTITY2_SERIALIZER.serialize)
			})
	}
}

const ENTITY2_DELETE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_ENTITY2_MUTATION_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY2_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_DELETE_MUTATION_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_DELETE_MUTATION_INTERFACE_SYSTEM.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY2_CONTROLLER_SYSTEM.Delete({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, 'ENTITY2_DELETE_MUTATION_INTERFACE_SYSTEM.resolve:success', 'data', data)
				return data.map(ENTITY2_SERIALIZER.serialize)
			})
	}
}

export {
	ENTITY2_CREATE_MUTATION_INTERFACE_SYSTEM,
	ENTITY2_UPDATE_MUTATION_INTERFACE_SYSTEM,
	ENTITY2_DELETE_MUTATION_INTERFACE_SYSTEM
}