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
	RELATIONSHIP_CONTROLLER_DATABASE
} from './../../../controllers/relationship.js'

const RELATIONSHIP_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	sql_primary_key: $structure.relationship.abstract.PRIMARY_KEY__ABSTRACT__RELATIONSHIP__STRUCTURE
})

const RELATIONSHIP_ATTRIBUTES_MUTATION_INTERFACE_DATABASE = new GraphQLInputObjectType({
	name: 'Relationship_Mutation__Attributes',
	description: 'Relationship Mutation Attributes',
	fields: $structure.relationship.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE
})

const RELATIONSHIP_ATTRIBUTES_ARRAY_MUTATION_INTERFACE_DATABASE = new GraphQLInputObjectType({
	name: 'Relationship_Mutation__Attributes_Array',
	description: 'Relationship Mutation Attributes Array',
	fields: $structure.relationship.database.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE
})

const CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new GraphQLList($structure.relationship.database.graphql.MUTATION__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE),
	args: {
		attributes: {
			description: 'attributes',
			type: RELATIONSHIP_ATTRIBUTES_MUTATION_INTERFACE_DATABASE
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, 'CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter', '_source', _source)
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, 'CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter', 'mutation_arguments', mutation_arguments)
		return RELATIONSHIP_CONTROLLER_DATABASE.create({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('2', __RELATIVE_FILEPATH, 'CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success', 'data', data)
				return data.map(RELATIONSHIP_SERIALIZER.serialize)
			})
	}
}

const UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new GraphQLList($structure.relationship.database.graphql.MUTATION__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: RELATIONSHIP_ATTRIBUTES_MUTATION_INTERFACE_DATABASE
		},
		where_in: {
			description: 'where in',
			type: RELATIONSHIP_ATTRIBUTES_ARRAY_MUTATION_INTERFACE_DATABASE
		},
		where_not_in: {
			description: 'where not in',
			type: RELATIONSHIP_ATTRIBUTES_ARRAY_MUTATION_INTERFACE_DATABASE
		},
		attributes: {
			description: 'attributes',
			type: RELATIONSHIP_ATTRIBUTES_MUTATION_INTERFACE_DATABASE
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, 'UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter', '_source', _source)
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, 'UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter', 'mutation_arguments', mutation_arguments)
		return RELATIONSHIP_CONTROLLER_DATABASE.update({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('2', __RELATIVE_FILEPATH, 'UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success', 'data', data)
				return data.map(RELATIONSHIP_SERIALIZER.serialize)
			})
	}
}

const DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE = {
	type: new GraphQLList($structure.relationship.database.graphql.MUTATION__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: RELATIONSHIP_ATTRIBUTES_MUTATION_INTERFACE_DATABASE
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, 'DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter', '_source', _source)
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, 'DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:enter', 'mutation_arguments', mutation_arguments)
		return RELATIONSHIP_CONTROLLER_DATABASE.delete({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, mutation_arguments)
			.then(function (data) {
				$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('2', __RELATIVE_FILEPATH, 'DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE.resolve:success', 'data', data)
				return data.map(RELATIONSHIP_SERIALIZER.serialize)
			})
	}
}

export {
	CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE
}
