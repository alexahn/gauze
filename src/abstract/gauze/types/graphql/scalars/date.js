// inhouse simple scalars so we don't depend on packages for atoms
// taken from https://github.com/tjmehta/graphql-date/blob/master/index.js (MIT license)

import { GraphQLScalarType, GraphQLError, Kind } from "graphql";

const DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT = new GraphQLScalarType({
	name: "Date",
	/**
	 * Serialize date value into string
	 * @param  {Date} value date value
	 * @return {String} date as string
	 */
	serialize: function (value) {
		if (!(value instanceof Date)) throw new TypeError("Field error: value is not an instance of Date");
		if (isNaN(value.getTime())) throw new TypeError("Field error: value is an invalid Date");
		return value.toJSON();
	},
	/**
	 * Parse value into date
	 * @param  {*} value serialized date value
	 * @return {Date} date value
	 */
	parseValue: function (value) {
		var date = new Date(value);
		if (isNaN(date.getTime())) throw new TypeError("Field error: value is an invalid Date");
		return date;
	},
	/**
	 * Parse ast literal to date
	 * @param  {Object} ast graphql ast
	 * @return {Date} date value
	 */
	parseLiteral: function (ast) {
		if (ast.kind !== Kind.STRING) throw new GraphQLError("Query error: Can only parse strings to dates but got a: " + ast.kind, [ast]);
		//assertErr(ast.kind === Kind.STRING,
		//  GraphQLError, 'Query error: Can only parse strings to dates but got a: ' + ast.kind, [ast])

		var result = new Date(ast.value);
		if (isNaN(result.getTime())) throw new GraphQLError("Query error: Invalid date", [ast]);
		if (ast.value !== result.toJSON()) throw new GraphQLError("Query error: Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ", [ast]);

		return result;
	},
});

// should return true or false to specify if a javascript type represents this scalar type
DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT.match_value = function (value) {
	return value instanceof Date;
};

// should return true or false to specify if an ast type represents this scalar type
DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT.match_ast = function (ast) {
	var result = new Date(ast.value);
	if (isNaN(result.getTime())) return false;
	if (ast.value !== result.toJSON()) return false;
	return true;
}

function SCALAR__DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT (params) {
	return DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT
}

export { DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT, SCALAR__DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT };
