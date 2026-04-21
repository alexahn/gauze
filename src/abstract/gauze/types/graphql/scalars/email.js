// inhouse simple scalars so we don't depend on packages for atoms

import { GraphQLScalarType } from "graphql";
import { v4 as uuidv4 } from "uuid";

import { STRING_MINIMUM_LENGTH__ERROR__GAUZE__ABSTRACT, STRING_MAXIMUM_LENGTH__ERROR__GAUZE__ABSTRACT, EMAIL_REGEX__ERROR__GAUZE__ABSTRACT } from "./../../../errors.js";

function SCALAR__EMAIL__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT(entity, field, params = {}) {
	const { minimum_length = 3, maximum_length = 320 } = params;
	const id = String(uuidv4()).replaceAll("-", "");
	const scalar = new GraphQLScalarType({
		name: ["SCALAR__EMAIL__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT", id].join("___"),
		description: "Gauze Email Scalar",
		serialize: function (value) {
			return value;
		},
		parseValue: function (value) {
			if (value.length < minimum_length) {
				const err = STRING_MINIMUM_LENGTH__ERROR__GAUZE__ABSTRACT(entity, field, value, minimum_length);
				throw err;
			}
			if (maximum_length < value.length) {
				const err = STRING_MAXIMUM_LENGTH__ERROR__GAUZE__ABSTRACT(entity, field, value, maximum_length);
				throw err;
			}
			const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			const valid_email = typeof value === "string" && value.match(email_regex);
			if (valid_email) {
				return value;
			}
			const err = EMAIL_REGEX__ERROR__GAUZE__ABSTRACT(entity, field, value, email_regex);
			throw err;
		},
		parseLiteral: function (ast) {
			return ast.value;
		},
	});
	scalar.match_value = function (value) {
		return typeof value === "string";
	};

	scalar.match_ast = function (ast) {
		return true;
	};

	scalar.params = params;
	return scalar;
}

export { SCALAR__EMAIL__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT };
