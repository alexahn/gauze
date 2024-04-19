import {
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInputObjectType
} from 'graphql';

import {
	GRAPHQL_SYSTEM_ENTITY1_QUERY_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY1_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY1_ATTRIBUTES_FIELDS_STRUCTURE
} from './../../../structure/entity1/system/graphql.js'

import {
	ENTITY1_CONTROLLER_SYSTEM,
} from './../../controllers/entity1.js'

function format (record) {
	const metadata = {
		id: record.id,
		type: GRAPHQL_SYSTEM_ENTITY1_TYPE_STRUCTURE
	}
	const model = {
		_metadata: metadata,
		attributes: record,
		relationships: {
			_metadata: metadata
		},
		query: {}
	}
	return model
}

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
		console.log('entity1 query _source', _source)
		console.log('entity1 args', query_arguments)
		return ENTITY1_CONTROLLER_SYSTEM.Read({
			database: context.database,
			transaction: context.transaction
		}, query_arguments).then(function (data) {
			return data.map(format)
		})
	}
}

export {
	ENTITY1_READ_QUERY_INTERFACE_SYSTEM
}