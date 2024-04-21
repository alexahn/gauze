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
	ENTITY1_CONTROLLER_SYSTEM
} from './../../../controllers/entity1.js'

const ENTITY1_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.entity1.system.graphql.GRAPHQL_SYSTEM_ENTITY1_TYPE_STRUCTURE
})

const ENTITY1_MUTATION_ATTRIBUTES = new GraphQLInputObjectType({
	name: 'Entity1_Mutation__Attributes',
	description: 'Entity1 Mutation Attributes',
	fields: $structure.entity1.system.graphql.GRAPHQL_SYSTEM_ENTITY1_ATTRIBUTES_FIELDS_STRUCTURE
})

const ENTITY1_CREATE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList($structure.entity1.system.graphql.GRAPHQL_SYSTEM_ENTITY1_MUTATION_STRUCTURE),
	args: {
		attributes: {
			description: 'attributes',
			type: ENTITY1_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_CREATE_MUTATION_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_CREATE_MUTATION_INTERFACE_SYSTEM.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY1_CONTROLLER_SYSTEM.create({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, 'ENTITY1_CREATE_MUTATION_INTERFACE_SYSTEM.resolve:success', 'data', data)
				return data.map(ENTITY1_SERIALIZER.serialize)
			})
	}
}

const ENTITY1_UPDATE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList($structure.entity1.system.graphql.GRAPHQL_SYSTEM_ENTITY1_MUTATION_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY1_MUTATION_ATTRIBUTES
		},
		attributes: {
			description: 'attributes',
			type: ENTITY1_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_UPDATE_MUTATION_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_UPDATE_MUTATION_INTERFACE_SYSTEM.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY1_CONTROLLER_SYSTEM.update({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, 'ENTITY1_UPDATE_MUTATION_INTERFACE_SYSTEM.resolve:success', 'data', data)
				return data.map(ENTITY1_SERIALIZER.serialize)
			})
	}
}

const ENTITY1_DELETE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList($structure.entity1.system.graphql.GRAPHQL_SYSTEM_ENTITY1_MUTATION_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY1_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_DELETE_MUTATION_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_DELETE_MUTATION_INTERFACE_SYSTEM.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY1_CONTROLLER_SYSTEM.delete({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, 'ENTITY1_DELETE_MUTATION_INTERFACE_SYSTEM.resolve:success', 'data', data)
				return data.map(ENTITY1_SERIALIZER.serialize)
			})
	}
}

export {
	ENTITY1_CREATE_MUTATION_INTERFACE_SYSTEM,
	ENTITY1_UPDATE_MUTATION_INTERFACE_SYSTEM,
	ENTITY1_DELETE_MUTATION_INTERFACE_SYSTEM
}