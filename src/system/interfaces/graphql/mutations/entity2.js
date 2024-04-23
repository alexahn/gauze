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
	ENTITY2_CONTROLLER_SYSTEM
} from './../../../controllers/entity2.js'

const ENTITY2_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.entity2.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE
})

const ENTITY2_MUTATION_ATTRIBUTES = new GraphQLInputObjectType({
	name: 'Entity2_Mutation__Attributes',
	description: 'Entity2 Mutation Attributes',
	fields: $structure.entity2.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE
})

const ENTITY2_CREATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM = {
	type: new GraphQLList($structure.entity2.system.graphql.MUTATION__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE),
	args: {
		attributes: {
			description: 'attributes',
			type: ENTITY2_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_CREATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_CREATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY2_CONTROLLER_SYSTEM.create({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('2', __RELATIVE_FILEPATH, 'ENTITY2_CREATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM.resolve:success', 'data', data)
				return data.map(ENTITY2_SERIALIZER.serialize)
			})
	}
}

const ENTITY2_UPDATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM = {
	type: new GraphQLList($structure.entity2.system.graphql.MUTATION__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY2_MUTATION_ATTRIBUTES
		},
		attributes: {
			description: 'attributes',
			type: ENTITY2_MUTATION_ATTRIBUTES
		},
		limit: {
			description: 'limit',
			type: GraphQLInt
		},
		offset: {
			description: 'offset',
			type: GraphQLInt
		},
		order: {
			description: 'order',
			type: GraphQLString
		},
		order_direction: {
			description: 'order direction',
			type: GraphQLString
		},
		order_nulls: {
			description: 'order nulls',
			type: GraphQLString
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_UPDATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_UPDATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY2_CONTROLLER_SYSTEM.update({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('2', __RELATIVE_FILEPATH, 'ENTITY2_UPDATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM.resolve:success', 'data', data)
				return data.map(ENTITY2_SERIALIZER.serialize)
			})
	}
}

const ENTITY2_DELETE_MUTATION_GRAPHQL_INTERFACE_SYSTEM = {
	type: new GraphQLList($structure.entity2.system.graphql.MUTATION__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY2_MUTATION_ATTRIBUTES
		},
		limit: {
			description: 'limit',
			type: GraphQLInt
		},
		offset: {
			description: 'offset',
			type: GraphQLInt
		},
		order: {
			description: 'order',
			type: GraphQLString
		},
		order_direction: {
			description: 'order direction',
			type: GraphQLString
		},
		order_nulls: {
			description: 'order nulls',
			type: GraphQLString
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_DELETE_MUTATION_GRAPHQL_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_DELETE_MUTATION_GRAPHQL_INTERFACE_SYSTEM.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY2_CONTROLLER_SYSTEM.delete({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('2', __RELATIVE_FILEPATH, 'ENTITY2_DELETE_MUTATION_GRAPHQL_INTERFACE_SYSTEM.resolve:success', 'data', data)
				return data.map(ENTITY2_SERIALIZER.serialize)
			})
	}
}

export {
	ENTITY2_CREATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM,
	ENTITY2_UPDATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM,
	ENTITY2_DELETE_MUTATION_GRAPHQL_INTERFACE_SYSTEM
}