import url from 'url'
import path from 'path'
const __FILEPATH = url.fileURLToPath(import.meta.url)
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH)

import * as $kernel from './../../../../kernel/index.js'

import {
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLInputObjectType
} from 'graphql';

import {
	Serializer
} from './../../../../structure/serializer.js'

import {
	GRAPHQL_SYSTEM_RELATIONSHIP_QUERY_STRUCTURE,
	GRAPHQL_SYSTEM_RELATIONSHIP_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE
} from './../../../../structure/relationship/system/graphql.js'

import {
	RELATIONSHIP_CONTROLLER_SYSTEM,
} from './../../../controllers/relationship.js'

const RELATIONSHIP_SERIALIZER = new Serializer({
	graphql_type: GRAPHQL_SYSTEM_RELATIONSHIP_TYPE_STRUCTURE
})

const RELATIONSHIP_ATTRIBUTES_QUERY_INTERFACE_SYSTEM = new GraphQLInputObjectType({
	name: 'Relationship_Query__Attributes',
	description: 'Relationship Query Attributes',
	fields: GRAPHQL_SYSTEM_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE
})

const RELATIONSHIP_READ_QUERY_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_RELATIONSHIP_QUERY_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: RELATIONSHIP_ATTRIBUTES_QUERY_INTERFACE_SYSTEM,
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
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'RELATIONSHIP_READ_QUERY_INTERFACE_SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, 'RELATIONSHIP_READ_QUERY_INTERFACE_SYSTEM.resolve:enter', 'query_arguments', query_arguments)
		return RELATIONSHIP_CONTROLLER_SYSTEM.Read({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, query_arguments)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, 'RELATIONSHIP_READ_QUERY_INTERFACE_SYSTEM.resolve:success', 'data', data)
				return data.map(RELATIONSHIP_SERIALIZER.serialize)
			})
	}
}

export {
	RELATIONSHIP_READ_QUERY_INTERFACE_SYSTEM
}