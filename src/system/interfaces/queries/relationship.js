import {
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLInputObjectType
} from 'graphql';

import {
	GRAPHQL_SYSTEM_RELATIONSHIP_STRUCTURE,
	GRAPHQL_SYSTEM_RELATIONSHIP_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE
} from './../../../structure/relationship/system/graphql.js'

import {
	RELATIONSHIP_CONTROLLER_SYSTEM,
} from './../../controllers/relationship.js'

function format (record) {
	const metadata = {
		id: record.id,
		type: GRAPHQL_SYSTEM_RELATIONSHIP_TYPE_STRUCTURE
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

const RELATIONSHIP_QUERY_WHERE = new GraphQLInputObjectType({
	name: 'Relationship_Query_Where',
	description: 'Relationship Query Where',
	fields: GRAPHQL_SYSTEM_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE
})

const RELATIONSHIP_READ_QUERY_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_RELATIONSHIP_STRUCTURE),
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
			return data.map(format)
		})
	}
}

export {
	RELATIONSHIP_READ_QUERY_INTERFACE_SYSTEM
}