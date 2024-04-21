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
	GRAPHQL_SYSTEM_RELATIONSHIP_MUTATION_STRUCTURE,
	GRAPHQL_SYSTEM_RELATIONSHIP_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE
} from './../../../../structure/relationship/system/graphql.js'

import {
	RELATIONSHIP_CONTROLLER_SYSTEM
} from './../../../controllers/relationship.js'

const RELATIONSHIP_MUTATION_ATTRIBUTES = new GraphQLInputObjectType({
	name: 'Relationship_Mutation__Attributes',
	description: 'Relationship Mutation Attributes',
	fields: GRAPHQL_SYSTEM_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE
})

const RELATIONSHIP_SERIALIZER = new Serializer({
	graphql_type: GRAPHQL_SYSTEM_RELATIONSHIP_TYPE_STRUCTURE
})

const RELATIONSHIP_CREATE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_RELATIONSHIP_MUTATION_STRUCTURE),
	args: {
		attributes: {
			description: 'attributes',
			type: RELATIONSHIP_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'RELATIONSHIP_CREATE_MUTATION_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'RELATIONSHIP_CREATE_MUTATION_INTERFACE_SYSTEM.resolve:enter', 'mutation_arguments', mutation_arguments)
		return RELATIONSHIP_CONTROLLER_SYSTEM.Create({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, 'RELATIONSHIP_CREATE_MUTATION_INTERFACE_SYSTEM.resolve:success', 'data', data)
				return data.map(RELATIONSHIP_SERIALIZER.serialize)
			})
	}
}

const RELATIONSHIP_UPDATE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_RELATIONSHIP_MUTATION_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: RELATIONSHIP_MUTATION_ATTRIBUTES
		},
		attributes: {
			description: 'attributes',
			type: RELATIONSHIP_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'RELATIONSHIP_UPDATE_MUTATION_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'RELATIONSHIP_UPDATE_MUTATION_INTERFACE_SYSTEM.resolve:enter', 'mutation_arguments', mutation_arguments)
		return RELATIONSHIP_CONTROLLER_SYSTEM.Update({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, 'RELATIONSHIP_UPDATE_MUTATION_INTERFACE_SYSTEM.resolve:success', 'data', data)
				return data.map(RELATIONSHIP_SERIALIZER.serialize)
			})
	}
}

const RELATIONSHIP_DELETE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_RELATIONSHIP_MUTATION_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: RELATIONSHIP_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'RELATIONSHIP_DELETE_MUTATION_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'RELATIONSHIP_DELETE_MUTATION_INTERFACE_SYSTEM.resolve:enter', 'mutation_arguments', mutation_arguments)
		return RELATIONSHIP_CONTROLLER_SYSTEM.Delete({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, 'RELATIONSHIP_DELETE_MUTATION_INTERFACE_SYSTEM.resolve:success', 'data', data)
				return data.map(RELATIONSHIP_SERIALIZER.serialize)
			})
	}
}

export {
	RELATIONSHIP_CREATE_MUTATION_INTERFACE_SYSTEM,
	RELATIONSHIP_UPDATE_MUTATION_INTERFACE_SYSTEM,
	RELATIONSHIP_DELETE_MUTATION_INTERFACE_SYSTEM
}