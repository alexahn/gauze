// inhouse simple scalars so we don't depend on packages for atoms
// taken from https://github.com/tjmehta/graphql-date/blob/master/index.js (MIT license)

import { GraphQLScalarType, GraphQLError, Kind } from "graphql";

// note: not sure how this will work
// i need to wrap this into a higher order function but i'm not sure how graphql deals with scalar types
// usually graphql complains if two types have the same name
// and it would be very inefficient to create a custom type for each combination of parameters
// but i suppose i could do that by adding a hash to the name

function StringScalar(params) {
	const scalar = new GraphQLScalarType({
		name: "GauzeString",
		// serialize from graphql value into json value
		serialize: function (value) {
			return value
		},
		// parse from json value to grapqhl value
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
		// parse from ast literal value to graphql value
		parseLiteral: function (ast) {
			if (ast.kind !== Kind.STRING) throw new GraphQLError("Query error: Can only parse strings to dates but got a: " + ast.kind, [ast]);
			//assertErr(ast.kind === Kind.STRING,
			//  GraphQLError, 'Query error: Can only parse strings to dates but got a: ' + ast.kind, [ast])

			var result = new Date(ast.value);
			if (isNaN(result.getTime())) throw new GraphQLError("Query error: Invalid date", [ast]);
			if (ast.value !== result.toJSON()) throw new GraphQLError("Query error: Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ", [ast]);

			return result;
		},
	})
	return scalar
}

const STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT = new GraphQLScalarType({
	name: "Date",
	/**
	 * Serialize date value into string
	 * @param  {Date} value date value
	 * @return {String} date as string
	 */
	serialize: function (value) {
		return value
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
STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT.match_value = function (value) {
	return value instanceof Date;
};

// should return true or false to specify if an ast type represents this scalar type
STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT.match_ast = function (ast) {
	var result = new Date(ast.value);
	if (isNaN(result.getTime())) return false;
	if (ast.value !== result.toJSON()) return false;
	return true;
};

function SCALAR__STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT (params) {
    const id = String(uuidv4()).replaceAll("-", "")
    const scalar = new GraphQLScalarType({
        name: "GauzeString_" + id,
        // serialize from graphql value into json value
        serialize: function (value) {
            return value
        },
        // parse from json value to grapqhl value
        parseValue: function (value) {
            if (value.length > 1024) {
                throw new Error("Field length is larger than 64")
            }
            return value
        },
        /**
         * Parse ast literal to date
         * @param  {Object} ast graphql ast
         * @return {Date} date value
         */
        // parse from ast literal value to graphql value
        parseLiteral: function (ast) {
            //if (ast.kind !== Kind.STRING) throw new GraphQLError("Query error: Can only parse strings to dates but got a: " + ast.kind, [ast]);
            return ast.value
        },
    })
    return scalar
    //return GraphQLString
}

export { STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT, SCALAR__STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT};
