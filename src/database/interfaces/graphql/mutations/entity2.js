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
	graphql_type: $structure.entity2.database.graphql.TYPE__GRAPHQL__DATABASE__ENTITY2__STRUCTURE
})

const ENTITY2_ATTRIBUTES_MUTATION_INTERFACE_DATABASE = new GraphQLInputObjectType({
	name: 'Entity2_Mutation__Attributes',
	description: 'Entity2 Mutation Attributes',
	fields: $structure.entity2.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__ENTITY2__STRUCTURE
})

const ENTITY2_ATTRIBUTES_ARRAY_MUTATION_INTERFACE_DATABASE = new GraphQLInputObjectType({
	name: 'Entity2_Mutation__Attributes_Array',
	description: 'Entity2 Mutation Attributes Array',
	fields: $structure.entity2.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__ENTITY2__STRUCTURE
})

const CREATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new GraphQLList($structure.entity2.database.graphql.MUTATION__GRAPHQL__DATABASE__ENTITY2__STRUCTURE),
	args: {
		attributes: {
			description: 'attributes',
			type: ENTITY2_ATTRIBUTES_MUTATION_INTERFACE_DATABASE
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'CREATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'CREATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY2_CONTROLLER_DATABASE.create({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('2', __RELATIVE_FILEPATH, 'CREATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success', 'data', data)
				return data.map(ENTITY2_SERIALIZER.serialize)
			})
	}
}

const UPDATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new GraphQLList($structure.entity2.database.graphql.MUTATION__GRAPHQL__DATABASE__ENTITY2__STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY2_ATTRIBUTES_MUTATION_INTERFACE_DATABASE
		},
		where_in: {
			description: 'where in',
			type: ENTITY2_ATTRIBUTES_ARRAY_MUTATION_INTERFACE_DATABASE
		},
		where_not_in: {
			description: 'where not in',
			type: ENTITY2_ATTRIBUTES_ARRAY_MUTATION_INTERFACE_DATABASE
		},
		attributes: {
			description: 'attributes',
			type: ENTITY2_ATTRIBUTES_MUTATION_INTERFACE_DATABASE
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
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'UPDATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'UPDATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY2_CONTROLLER_DATABASE.update({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('2', __RELATIVE_FILEPATH, 'UPDATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success', 'data', data)
				return data.map(ENTITY2_SERIALIZER.serialize)
			})
	}
}

const DELETE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new GraphQLList($structure.entity2.database.graphql.MUTATION__GRAPHQL__DATABASE__ENTITY2__STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY2_ATTRIBUTES_MUTATION_INTERFACE_DATABASE
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
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'DELETE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'DELETE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter', 'mutation_arguments', mutation_arguments)
		return ENTITY2_CONTROLLER_DATABASE.delete({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('2', __RELATIVE_FILEPATH, 'DELETE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success', 'data', data)
				return data.map(ENTITY2_SERIALIZER.serialize)
			})
	}
}

export {
	CREATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE
}