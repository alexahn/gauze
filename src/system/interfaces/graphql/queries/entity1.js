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
	GRAPHQL_SYSTEM_ENTITY1_QUERY_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY1_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY1_ATTRIBUTES_FIELDS_STRUCTURE
} from './../../../../structure/entity1/system/graphql.js'

import {
	ENTITY1_CONTROLLER_SYSTEM,
} from './../../../controllers/entity1.js'

const ENTITY1_SERIALIZER = new Serializer({
	graphql_type: GRAPHQL_SYSTEM_ENTITY1_TYPE_STRUCTURE
})

const ENTITY1_WHERE_QUERY_INTERFACE_SYSYTEM = new GraphQLInputObjectType({
	name: 'Entity1_Query_Where',
	description: 'Entity1 Query Where',
	fields: GRAPHQL_SYSTEM_ENTITY1_ATTRIBUTES_FIELDS_STRUCTURE
})

const ENTITY1_READ_QUERY_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_ENTITY1_QUERY_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY1_WHERE_QUERY_INTERFACE_SYSYTEM,
		},
		limit: {
			description: 'limit',
			type: GraphQLInt
		},
		skip: {
			description: 'skip',
			type: GraphQLInt
		},
		sort: {
			description: 'sort',
			type: GraphQLString
		}
	},
	resolve: (_source, query_arguments, context) => {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_READ_QUERY_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'ENTITY1_READ_QUERY_INTERFACE_SYSTEM.resolve:enter', 'query_arguments', query_arguments)
		return ENTITY1_CONTROLLER_SYSTEM.Read({
			database: context.database,
			transaction: context.transaction
		}, query_arguments).then(function (data) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, 'ENTITY1_READ_QUERY_INTERFACE_SYSTEM.resolve:success', 'data', data)
			return data.map(ENTITY1_SERIALIZER.serialize)
		})
	}
}

export {
	ENTITY1_READ_QUERY_INTERFACE_SYSTEM
}