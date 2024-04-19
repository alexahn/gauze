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
	GRAPHQL_SYSTEM_ENTITY2_MUTATION_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE
} from './../../../structure/entity2/system/graphql.js'

import {
	ENTITY2_CONTROLLER_SYSTEM
} from './../../controllers/entity2.js'

const ENTITY2_MUTATION_ATTRIBUTES = new GraphQLInputObjectType({
	name: 'Entity2_Mutation_Attributes',
	description: 'Entity2 Mutation Attributes',
	fields: GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE
})

function format (record) {
	const metadata = {
		id: record.id,
		type: GRAPHQL_SYSTEM_ENTITY2_TYPE_STRUCTURE
	}
	const model = {
		metadata: metadata,
		attributes: record,
		relationships: {
			_metadata: metadata,
			entity2: {
				_metadata: metadata
			}
		}
	}
	return model
}

const ENTITY2_CREATE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_ENTITY2_MUTATION_STRUCTURE),
	args: {
		attributes: {
			description: 'attributes',
			type: ENTITY2_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		console.log('entity2 create controller')
		return ENTITY2_CONTROLLER_SYSTEM.Create(context, mutation_arguments).then(function (data) {
			return data.map(format)
		})
	}
}

const ENTITY2_UPDATE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_ENTITY2_MUTATION_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY2_MUTATION_ATTRIBUTES
		},
		attributes: {
			description: 'attributes',
			type: ENTITY2_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		return ENTITY2_CONTROLLER_SYSTEM.Update(context, mutation_arguments).then(function (data) {
			return data.map(format)
		})
	}
}

const ENTITY2_DELETE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_ENTITY2_MUTATION_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY2_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		return ENTITY2_CONTROLLER_SYSTEM.Delete(context, mutation_arguments).then(function (data) {
			return data.map(format)
		})
	}
}

/*
const ENTITY2_MUTATION = new GraphQLObjectType({
	name: 'Entity2_Mutation',
	description: 'Entity2 Mutation',
	fields: {
		create: ENTITY2_CREATE_MUTATION_INTERFACE_SYSTEM,
		update: ENTITY2_UPDATE_MUTATION_INTERFACE_SYSTEM,
		delete: ENTITY2_DELETE_MUTATION_INTERFACE_SYSTEM
	}
})

const ENTITY2_MUTATION_INTERFACE_SYSTEM = {
	type: ENTITY2_MUTATION,
	resolve: (_source, {}) => {
		return {}
	}
}
*/

export {
	ENTITY2_CREATE_MUTATION_INTERFACE_SYSTEM,
	ENTITY2_UPDATE_MUTATION_INTERFACE_SYSTEM,
	ENTITY2_DELETE_MUTATION_INTERFACE_SYSTEM
}