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
	ENTITY2,
	ENTITY2_TYPE,
	ENTITY2_ATTRIBUTES_FIELDS
} from './../../../structure/graphql/entity2.js'

import {
	ENTITY2_CONTROLLER_SYSTEM,
} from './../../controllers/entity2.js'

function format (record) {
	const metadata = {
		id: record.id,
		type: ENTITY2_TYPE
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
	fields: ENTITY2_ATTRIBUTES_FIELDS
})

const ENTITY2_QUERY_INTERFACE_SYSTEM = {
	type: new GraphQLList(ENTITY2),
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
		//return ReadEntity2(where, limit, skip, sort)
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