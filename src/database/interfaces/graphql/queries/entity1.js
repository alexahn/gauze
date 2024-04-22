import url from 'url'
import path from 'path'
const __FILEPATH = url.fileURLToPath(import.meta.url)
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH)

import * as $kernel from './../../../../kernel/index.js'
import * as $structure from './../../../../structure/index.js'

import {
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInputObjectType
} from 'graphql';

import {
	ENTITY1_CONTROLLER_DATABASE,
} from './../../../controllers/entity1.js'

const ENTITY1_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.entity1.database.graphql.GRAPHQL_DATABASE_ENTITY1_TYPE_STRUCTURE
})

const ENTITY1_ATTRIBUTES_QUERY_INTERFACE_DATABASE = new GraphQLInputObjectType({
	name: 'Entity1_Query__Attributes',
	description: 'Entity1 Query Attributes',
	fields: $structure.entity1.database.graphql.GRAPHQL_DATABASE_ENTITY1_ATTRIBUTES_FIELDS_STRUCTURE
})

const ENTITY1_READ_QUERY_INTERFACE_DATABASE = {
	type: new GraphQLList($structure.entity1.database.graphql.GRAPHQL_DATABASE_ENTITY1_QUERY_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY1_ATTRIBUTES_QUERY_INTERFACE_DATABASE,
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
	resolve: (_source, query_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_READ_QUERY_INTERFACE_DATABASE.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_READ_QUERY_INTERFACE_DATABASE.resolve:enter', 'query_arguments', query_arguments)
		return ENTITY1_CONTROLLER_DATABASE.read({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, query_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, 'ENTITY1_READ_QUERY_INTERFACE_DATABASE.resolve:success', 'data', data)
				return data.map(ENTITY1_SERIALIZER.serialize)
			})
	}
}

export {
	ENTITY1_READ_QUERY_INTERFACE_DATABASE
}