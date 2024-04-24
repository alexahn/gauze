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
	RELATIONSHIP_CONTROLLER_SYSTEM,
} from './../../../controllers/relationship.js'

const RELATIONSHIP_SERIALIZER = new $structure.serializers.GraphQLSerializer({
	graphql_type: $structure.relationship.system.graphql.TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	sql_primary_key: $structure.relationship.abstract.PRIMARY_KEY__ABSTRACT__RELATIONSHIP__STRUCTURE
})

const RELATIONSHIP_ATTRIBUTES_QUERY_INTERFACE_SYSTEM = new GraphQLInputObjectType({
	name: 'Relationship_Query__Attributes',
	description: 'Relationship Query Attributes',
	fields: $structure.relationship.system.graphql.ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE
})

const RELATIONSHIP_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM = new GraphQLInputObjectType({
	name: 'Relationship_Query__Attributes_Array',
	description: 'Relationship Query Attributes Array',
	fields: $structure.relationship.system.graphql.ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE
})

const READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__SYSTEM = {
	type: new GraphQLList($structure.relationship.system.graphql.QUERY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: RELATIONSHIP_ATTRIBUTES_QUERY_INTERFACE_SYSTEM,
		},
		where_in: {
			description: 'where in',
			type: RELATIONSHIP_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM
		},
		where_not_in: {
			description: 'where not in',
			type: RELATIONSHIP_ATTRIBUTES_ARRAY_QUERY_INTERFACE_SYSTEM
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, 'READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter', '_source', _source)
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, 'READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:enter', 'query_arguments', query_arguments)
		return RELATIONSHIP_CONTROLLER_SYSTEM.read({
				source: _source,
				database: context.database,
				transaction: context.transaction
			}, query_arguments)
			.then(function (data) {
				$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('1', __RELATIVE_FILEPATH, 'READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__SYSTEM.resolve:success', 'data', data)
				return data.map(RELATIONSHIP_SERIALIZER.serialize)
			})
	}
}

export {
	READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__SYSTEM
}
