import { GraphQLObjectType, GraphQLString, GraphQLInputObjectType } from "graphql";

import { MUTATION__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./agent_root.js";
import { MUTATION__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./agent_account.js";
/*
import {
	USER__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT
} from "./agent_user.js"
*/
import { MUTATION__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./agent_person.js";
/*
import {
	CHARACTER__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT
} from "./agent_character.js"
*/

const AGENT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent",
	fields: {
		root: {
			type: MUTATION__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		account: {
			type: MUTATION__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		/*
		user: {
			type: USER__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT
		},
		*/
		person: {
			type: MUTATION__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		/*
		character: {
			type: CHARACTER__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT
		}
		*/
	},
});

export { AGENT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
