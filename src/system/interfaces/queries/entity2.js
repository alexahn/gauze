import {
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInputObjectType
} from 'graphql';

import {
	Serializer
} from './../../../structure/serializer.js'

import {
	GRAPHQL_SYSTEM_ENTITY2_QUERY_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE
} from './../../../structure/entity2/system/graphql.js'

import {
	ENTITY2_CONTROLLER_SYSTEM,
} from './../../controllers/entity2.js'

const ENTITY2_SERIALIZER = new Serializer({
	graphql_type: GRAPHQL_SYSTEM_ENTITY2_TYPE_STRUCTURE
})

const ENTITY2_WHERE_QUERY_INTERFACE_SYSYTEM = new GraphQLInputObjectType({
	name: 'Entity2_Query_Where',
	description: 'Entity2 Query Where',
	fields: GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE
})

const ENTITY2_READ_QUERY_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_ENTITY2_QUERY_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY2_WHERE_QUERY_INTERFACE_SYSYTEM,
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
		console.log('entity2 query _source', _source)
		console.log('entity2 args', query_arguments)
		return ENTITY2_CONTROLLER_SYSTEM.Read({
			database: context.database,
			transaction: context.transaction
		}, query_arguments).then(function (data) {
			return data.map(ENTITY2_SERIALIZER.serialize)
		})
	}
}

export {
	ENTITY2_READ_QUERY_INTERFACE_SYSTEM
}