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
	ENTITY1_CONTROLLER_DATABASE
} from './../../../controllers/entity1.js'

const ENTITY1_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.entity1.database.graphql.GRAPHQL_DATABASE_ENTITY1_TYPE_STRUCTURE
})

const ENTITY1_ATTRIBUTES_MUTATION_INTERFACE_DATABASE = new GraphQLInputObjectType({
	name: 'Entity1_Mutation__Attributes',
	description: 'Entity1 Mutation Attributes',
	fields: $structure.entity1.database.graphql.GRAPHQL_DATABASE_ENTITY1_ATTRIBUTES_FIELDS_STRUCTURE
})

const ENTITY1_ATTRIBUTES_ARRAY_MUTATION_INTERFACE_DATABASE = new GraphQLInputObjectType({
	name: 'Entity1_Mutation__Attributes_Array',
	description: 'Entity1 Mutation Attributes Array',
	fields: $structure.entity1.database.graphql.GRAPHQL_DATABASE_ENTITY1_ATTRIBUTES_FIELDS_ARRAY_STRUCTURE
})

const ENTITY1_CREATE_MUTATION_GRAPHQL_INTERFACE_DATABASE = {
	type: new GraphQLList($structure.entity1.database.graphql.GRAPHQL_DATABASE_ENTITY1_MUTATION_STRUCTURE),
	args: {
		attributes: {
			description: 'attributes',
			type: ENTITY1_ATTRIBUTES_MUTATION_INTERFACE_DATABASE
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_CREATE_MUTATION_GRAPHQL_INTERFACE_DATABASE.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_CREATE_MUTATION_GRAPHQL_INTERFACE_DATABASE.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY1_CONTROLLER_DATABASE.create({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('2', __RELATIVE_FILEPATH, 'ENTITY1_CREATE_MUTATION_GRAPHQL_INTERFACE_DATABASE.resolve:success', 'data', data)
				return data.map(ENTITY1_SERIALIZER.serialize)
			})
	}
}

const ENTITY1_UPDATE_MUTATION_GRAPHQL_INTERFACE_DATABASE = {
	type: new GraphQLList($structure.entity1.database.graphql.GRAPHQL_DATABASE_ENTITY1_MUTATION_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY1_ATTRIBUTES_MUTATION_INTERFACE_DATABASE
		},
		where_in: {
			description: 'where in',
			type: ENTITY1_ATTRIBUTES_ARRAY_MUTATION_INTERFACE_DATABASE
		},
		where_not_in: {
			description: 'where not in',
			type: ENTITY1_ATTRIBUTES_ARRAY_MUTATION_INTERFACE_DATABASE
		},
		attributes: {
			description: 'attributes',
			type: ENTITY1_ATTRIBUTES_MUTATION_INTERFACE_DATABASE
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
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_UPDATE_MUTATION_GRAPHQL_INTERFACE_DATABASE.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_UPDATE_MUTATION_GRAPHQL_INTERFACE_DATABASE.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY1_CONTROLLER_DATABASE.update({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('2', __RELATIVE_FILEPATH, 'ENTITY1_UPDATE_MUTATION_GRAPHQL_INTERFACE_DATABASE.resolve:success', 'data', data)
				return data.map(ENTITY1_SERIALIZER.serialize)
			})
	}
}

const ENTITY1_DELETE_MUTATION_GRAPHQL_INTERFACE_DATABASE = {
	type: new GraphQLList($structure.entity1.database.graphql.GRAPHQL_DATABASE_ENTITY1_MUTATION_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY1_ATTRIBUTES_MUTATION_INTERFACE_DATABASE
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
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_DELETE_MUTATION_GRAPHQL_INTERFACE_DATABASE.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_DELETE_MUTATION_GRAPHQL_INTERFACE_DATABASE.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY1_CONTROLLER_DATABASE.delete({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('2', __RELATIVE_FILEPATH, 'ENTITY1_DELETE_MUTATION_GRAPHQL_INTERFACE_DATABASE.resolve:success', 'data', data)
				return data.map(ENTITY1_SERIALIZER.serialize)
			})
	}
}

export {
	ENTITY1_CREATE_MUTATION_GRAPHQL_INTERFACE_DATABASE,
	ENTITY1_UPDATE_MUTATION_GRAPHQL_INTERFACE_DATABASE,
	ENTITY1_DELETE_MUTATION_GRAPHQL_INTERFACE_DATABASE
}