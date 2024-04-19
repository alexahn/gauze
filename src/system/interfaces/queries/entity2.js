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
	GRAPHQL_SYSTEM_ENTITY2_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE
} from './../../../structure/entity2/system/graphql.js'

import {
	ENTITY2_CONTROLLER_SYSTEM,
} from './../../controllers/entity2.js'

function format (record) {
	const metadata = {
		id: record.id,
		type: GRAPHQL_SYSTEM_ENTITY2_TYPE_STRUCTURE
	}
	const model = {
		metadata: metadata,
		attributes: record,
		relationships: {
			_metadata: metadata
		}
	}
	return model
}

const ENTITY2_QUERY_WHERE = new GraphQLInputObjectType({
	name: 'Entity2_Query_Where',
	description: 'Entity2 Query Where',
	fields: GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE
})

const ENTITY2_QUERY_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_ENTITY2_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY2_QUERY_WHERE,
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
		console.log('context', context)
		return ENTITY2_CONTROLLER_SYSTEM.Read({
			database: context.database,
			transaction: context.transaction
		}, query_arguments).then(function (data) {
			return data.map(format)
		})
	}
}

export {
	ENTITY2_QUERY_INTERFACE_SYSTEM
}