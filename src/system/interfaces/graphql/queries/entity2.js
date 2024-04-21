import url from 'url'
import path from 'path'
const __FILEPATH = url.fileURLToPath(import.meta.url)
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH)

import * as $kernel from './../../../../kernel/index.js'

import {
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInputObjectType
} from 'graphql';

import {
	Serializer
} from './../../../../structure/serializer.js'

import {
	GRAPHQL_SYSTEM_ENTITY2_QUERY_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE
} from './../../../../structure/entity2/system/graphql.js'

import {
	ENTITY2_CONTROLLER_SYSTEM,
} from './../../../controllers/entity2.js'

const ENTITY2_SERIALIZER = new Serializer({
	graphql_type: GRAPHQL_SYSTEM_ENTITY2_TYPE_STRUCTURE
})

const ENTITY2_ATTRIBUTES_QUERY_INTERFACE_SYSYTEM = new GraphQLInputObjectType({
	name: 'Entity2_Query__Attributes',
	description: 'Entity2 Query Attributes',
	fields: GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE
})

const ENTITY2_READ_QUERY_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_ENTITY2_QUERY_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY2_ATTRIBUTES_QUERY_INTERFACE_SYSYTEM,
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
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_READ_QUERY_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY2_READ_QUERY_INTERFACE_SYSTEM.resolve:enter', 'query_arguments', query_arguments)
		return ENTITY2_CONTROLLER_SYSTEM.read({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, query_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('2', __RELATIVE_FILEPATH, 'ENTITY2_READ_QUERY_INTERFACE_SYSTEM.resolve:success', 'data', data)
				return data.map(ENTITY2_SERIALIZER.serialize)
			})
	}
}

export {
	ENTITY2_READ_QUERY_INTERFACE_SYSTEM
}