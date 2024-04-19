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
	ENTITY1_SYSTEM_CONTROLLER
} from './../../controllers/entity1.js'

const ENTITY1_MUTATION_ATTRIBUTES = new GraphQLInputObjectType({
	name: 'Entity1_Mutation_Attributes',
	description: 'Entity1 Mutation Attributes',
	fields: ENTITY1_ATTRIBUTES_FIELDS
})

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

const ENTITY1_CREATE = {
	type: new GraphQLList(ENTITY1),
	args: {
		attributes: {
			description: 'attributes',
			type: ENTITY1_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		console.log('entity1 create controller')
		return ENTITY1_SYSTEM_CONTROLLER.Create(context, mutation_arguments).then(function (data) {
			return data.map(format)
		})
	}
}

const ENTITY1_UPDATE = {
	type: new GraphQLList(ENTITY1),
	args: {
		where: {
			description: 'where',
			type: ENTITY1_MUTATION_ATTRIBUTES
		},
		attributes: {
			description: 'attributes',
			type: ENTITY1_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		return ENTITY1_SYSTEM_CONTROLLER.Update(context, mutation_arguments).then(function (data) {
			return data.map(format)
		})
	}
}

const ENTITY1_DELETE = {
	type: new GraphQLList(ENTITY1),
	args: {
		where: {
			description: 'where',
			type: ENTITY1_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		return ENTITY1_SYSTEM_CONTROLLER.Delete(context, mutation_arguments).then(function (data) {
			return data.map(format)
		})
	}
}

const ENTITY1_MUTATION_ROOT = new GraphQLObjectType({
	name: 'Entity1_Mutation',
	description: 'Entity1 Mutation',
	fields: {
		create: ENTITY1_CREATE,
		update: ENTITY1_UPDATE,
		delete: ENTITY1_DELETE
	}
})

const ENTITY1_MUTATION = {
	type: ENTITY1_MUTATION_ROOT,
	resolve: (_source, {}) => {
		return {}
	}
}

export {
	ENTITY1_MUTATION
}