import {
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInputObjectType
} from 'graphql';

import {
	GRAPHQL_SYSTEM_ENTITY2_QUERY_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_METADATA_STRUCTURE
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
		_metadata: metadata,
		attributes: record,
		relationships: {
			_metadata: metadata
		}
	}
	return model
}

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
		//console.log('context', context)
		return ENTITY2_CONTROLLER_SYSTEM.Read({
			database: context.database,
			transaction: context.transaction
		}, query_arguments).then(function (data) {
			return data.map(format)
		})
	}
}

/*
const ENTITY2_METADATA_QUERY_INTERFACE_SYSTEM = {
	type: GRAPHQL_SYSTEM_ENTITY2_METADATA_STRUCTURE,
	description: 'Entity2 Metadata'
}

const ENTITY2_ROOT_QUERY_INTERFACE_SYSTEM = new GraphQLObjectType({
	name: 'Entity2_Query',
	description: 'Entity2 Query',
	fields: {
		_metadata: ENTITY2_METADATA_QUERY_INTERFACE_SYSTEM,
		read: ENTITY2_READ_QUERY_INTERFACE_SYSTEM
	}
})

const ENTITY2_QUERY_INTERFACE_SYSTEM = {
	type: ENTITY2_ROOT_QUERY_INTERFACE_SYSTEM,
	resolve: (_source, {}) => {
		return {}
	}
}
*/

export {
	ENTITY2_READ_QUERY_INTERFACE_SYSTEM
}