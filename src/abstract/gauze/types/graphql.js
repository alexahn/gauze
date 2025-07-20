import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

import { DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT } from "./scalars/date.js";

function GAUZE_NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT (params) {
	return GraphQLNonNull
}

function GAUZE_INT__GRAPHQL__TYPE__GAUZE__ABSTRACT (params) {
	return GraphQLInt
}

function GAUZE_LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT (params) {
	return GraphQLList
}

function GAUZE_STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT (params) {
	return GraphQLString
}

function GAUZE_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT (params) {
	return GraphQLObjectType
}

function GAUZE_INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT (params) {
	return GraphQLInputObjectType
}

function GAUZE_DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT (params) {
	return DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT
}

export {
	// builtin graphql types
	GraphQLNonNull as NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GraphQLInt as INT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GraphQLList as LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GraphQLString as STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GraphQLObjectType as OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GraphQLInputObjectType as INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	// constructors
	GAUZE_NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GAUZE_INT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GAUZE_LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GAUZE_STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GAUZE_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GAUZE_INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT,

	// custom field types here

	// custom types here
	DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT as DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	// constructors
	GAUZE_DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
};
