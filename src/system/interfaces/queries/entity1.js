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
	ENTITY1,
	ENTITY1_TYPE,
	ENTITY1_ATTRIBUTES_FIELDS
} from './../../../structure/graphql/entity1.js'

import {
	ENTITY1_CONTROLLER_SYSTEM,
} from './../../controllers/entity1.js'

function format (record) {
	const metadata = {
		id: record.id,
		type: ENTITY1_TYPE
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

const ENTITY1_QUERY_WHERE = new GraphQLInputObjectType({
	name: 'Entity1_Query_Where',
	description: 'Entity1 Query where',
	fields: ENTITY1_ATTRIBUTES_FIELDS
})

const ENTITY1_QUERY_INTERFACE_SYSTEM = {
	type: new GraphQLList(ENTITY1),
	args: {
		where: {
			description: 'where',
			type: ENTITY1_QUERY_WHERE,
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
		console.log('context', context)
		//return ReadEntity1(where, limit, skip, sort)
		return ENTITY1_CONTROLLER_SYSTEM.Read({
			database: context.database,
			transaction: context.transaction
		}, query_arguments).then(function (data) {
			return data.map(format)
		})
	}
}

export {
	ENTITY1_QUERY_INTERFACE_SYSTEM
}