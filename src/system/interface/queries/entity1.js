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
	Records as Entity1Records,
	Index as Entity1Index
} from './../../../data/entity1.js'

import {
	ENTITY1,
	ENTITY1_TYPE,
	ENTITY1_ATTRIBUTES_FIELDS
} from './../../../structure/graphql/entity1.js'

import {
	ENTITY1_SYSTEM_CONTROLLER,
	ROOT_ENTITY1_SYSTEM_CONTROLLER
} from './../../controllers/entity1.js'

function ReadEntity1 (where, limit, skip, sort) {
	if (!where.id) return []
	const record = Entity1Index[where.id]
	//console.log('ReadEntity1', record)
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
	return [model]
}

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
	name: 'Entity1_Query_where',
	description: 'Entity1 Query where',
	fields: ENTITY1_ATTRIBUTES_FIELDS
})

const ENTITY1_QUERY = {
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
		return ENTITY1_SYSTEM_CONTROLLER.Read({
			database: context.database,
			transaction: context.transaction
		}, query_arguments).then(function (data) {
			return data.map(format)
		})
	}
}

const ENTITY1_QUERY_ROOT = {
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
	resolve: (_source, {
		where,
		limit,
		skip,
		sort
	}, context) => {
		console.log('entity1 query _source', _source)
		//return connection.transaction(function (transaction) {
		//	context.transaction = transaction
		//	return 
		return ReadEntity1(where, limit, skip, sort)
	}
}

export {
	ENTITY1_QUERY,
	ENTITY1_QUERY_ROOT
}