import {
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLInputObjectType
} from 'graphql';

import {
	Serializer
} from './../../../structure/serializer.js'

import {
	GRAPHQL_SYSTEM_RELATIONSHIP_QUERY_STRUCTURE,
	GRAPHQL_SYSTEM_RELATIONSHIP_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE
} from './../../../structure/relationship/system/graphql.js'

import {
	RELATIONSHIP_CONTROLLER_SYSTEM,
} from './../../controllers/relationship.js'

const RELATIONSHIP_SERIALIZER = new Serializer({
	graphql_type: GRAPHQL_SYSTEM_RELATIONSHIP_TYPE_STRUCTURE
})

const RELATIONSHIP_QUERY_WHERE = new GraphQLInputObjectType({
	name: 'Relationship_Query_Where',
	description: 'Relationship Query Where',
	fields: GRAPHQL_SYSTEM_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE
})

const RELATIONSHIP_READ_QUERY_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_RELATIONSHIP_QUERY_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: RELATIONSHIP_QUERY_WHERE,
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
		console.log('relationship query _source', _source)
		console.log('relationship args', query_arguments)
		return RELATIONSHIP_CONTROLLER_SYSTEM.Read({
			database: context.database,
			transaction: context.transaction
		}, query_arguments).then(function (data) {
			return data.map(RELATIONSHIP_SERIALIZER.serialize)
		})
	}
}

export {
	RELATIONSHIP_READ_QUERY_INTERFACE_SYSTEM
}