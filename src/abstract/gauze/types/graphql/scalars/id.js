// inhouse simple scalars so we don't depend on packages for atoms

import { GraphQLScalarType, GraphQLError, Kind } from "graphql";
import { v4 as uuidv4 } from "uuid";

import { ID_REGEX__ERROR__GAUZE__ABSTRACT, STRING_MINIMUM_LENGTH__ERROR__GAUZE__ABSTRACT, STRING_MAXIMUM_LENGTH__ERROR__GAUZE__ABSTRACT } from "./../../../errors.js";

function SCALAR__ID__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT(entity, field, params = {}) {
	const { minimum_length = 36, maximum_length = 36 } = params;
	const id = String(uuidv4()).replaceAll("-", "");
	const scalar = new GraphQLScalarType({
		name: ["SCALAR__ID__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT", id].join("___"),
		description: "Gauze ID Scalar",
		// serialize from graphql value into json value
		serialize: function (value) {
			return value;
		},
		// parse from json value to grapqhl value
		parseValue: function (value) {
			console.log("value", value)
			if (value.length < minimum_length) {
				const err = STRING_MINIMUM_LENGTH__ERROR__GAUZE__ABSTRACT(entity, field, value, 36);
				throw err;
			}
			if (maximum_length < value.length) {
				const err = STRING_MAXIMUM_LENGTH__ERROR__GAUZE__ABSTRACT(entity, field, value, 36);
				throw err;
			}
			// add constraint that id must be of the form 8-4-4-12
			var uuid_regex = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$");
			var valid_uuid = value.match(uuid_regex);
			if (valid_uuid) {
				return value;
			} else {
				const err = ID_REGEX__ERROR__GAUZE__ABSTRACT(entity, field, value, uuid_regex);
				throw err;
			}
		},
		// parse from ast literal value to graphql value
		parseLiteral: function (ast) {
			//if (ast.kind !== Kind.STRING) throw new GraphQLError("Query error: Can only parse strings to dates but got a: " + ast.kind, [ast]);
			return ast.value;
		},
	});
	scalar.match_value = function (value) {
		return typeof value === "string";
	};

	// should return true or false to specify if an ast type represents this scalar type
	scalar.match_ast = function (ast) {
		return true;
	};

	scalar.params = params;
	return scalar;
}

export { SCALAR__ID__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT };
