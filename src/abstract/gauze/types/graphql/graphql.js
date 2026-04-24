import { GraphQLScalarType, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInputObjectType, Kind } from "graphql";
import { v4 as uuidv4 } from "uuid";

function serialize_count_value(value) {
	if (typeof value === "bigint") {
		return value.toString();
	}
	if (typeof value === "number") {
		if (!Number.isFinite(value) || !Number.isInteger(value)) {
			throw new TypeError(`CountValue must be an integer: ${value}`);
		}
		if (!Number.isSafeInteger(value)) {
			return String(value);
		}
		return value;
	}
	if (typeof value === "string") {
		if (!/^[0-9]+$/.test(value)) {
			throw new TypeError(`CountValue must be an integer string: ${value}`);
		}
		return value;
	}
	throw new TypeError(`CountValue must be a number, string, or bigint: ${value}`);
}

const COUNT_VALUE__GRAPHQL__TYPE__GAUZE__ABSTRACT = new GraphQLScalarType({
	name: "CountValue",
	description: "A count value serialized as an integer number or a bigint string.",
	serialize: serialize_count_value,
	parseValue: serialize_count_value,
	parseLiteral: function (ast) {
		if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
			return serialize_count_value(ast.value);
		}
		throw new TypeError(`CountValue must be an integer or integer string: ${ast.kind}`);
	},
});

function GAUZE_NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT(params) {
	return GraphQLNonNull;
}

function GAUZE_INT__GRAPHQL__TYPE__GAUZE__ABSTRACT(params) {
	return GraphQLInt;
}

function GAUZE_LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(params) {
	return GraphQLList;
}

function GAUZE_STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT(params) {
	const id = String(uuidv4()).replaceAll("-", "");
	const scalar = new GraphQLScalarType({
		name: "GauzeString_" + id,
		// serialize from graphql value into json value
		serialize: function (value) {
			return value;
		},
		// parse from json value to grapqhl value
		parseValue: function (value) {
			if (value.length > 1024) {
				throw new Error("Field length is larger than 64");
			}
			return value;
		},
		/**
		 * Parse ast literal to date
		 * @param  {Object} ast graphql ast
		 * @return {Date} date value
		 */
		// parse from ast literal value to graphql value
		parseLiteral: function (ast) {
			//if (ast.kind !== Kind.STRING) throw new GraphQLError("Query error: Can only parse strings to dates but got a: " + ast.kind, [ast]);
			return ast.value;
		},
	});
	return scalar;
	//return GraphQLString
}

function GAUZE_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT(params) {
	return GraphQLObjectType;
}

function GAUZE_INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT(params) {
	return GraphQLInputObjectType;
}

export {
	// builtin graphql types
	GraphQLNonNull as NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GraphQLInt as INT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GraphQLList as LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GraphQLString as STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GraphQLObjectType as OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GraphQLInputObjectType as INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	COUNT_VALUE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	// constructors
	/*
	GAUZE_NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GAUZE_INT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GAUZE_LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GAUZE_STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GAUZE_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	GAUZE_INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	*/
	// custom field types here
};
