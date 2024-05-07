import { GraphQLObjectType, GraphQLString, GraphQLInputObjectType } from "graphql";

import { ROOT__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./agent_root.js";
/*
import {
	ACCOUNT__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT
} from "./agent_account.js"
import {
	USER__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT
} from "./agent_user.js"
import {
	PERSON__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT
} from "./agent_person.js"
import {
	CHARACTER__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT
} from "./agent_character.js"
*/

const AGENT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent",
	fields: {
		root: {
			type: ROOT__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
			/*
			type: GraphQLString,
			resolve: function (source, args, context) {
				return "hello"
			}
			*/
		},
		/*
		account: {
			type: ACCOUNT__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT
		},
		user: {
			type: USER__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT
		},
		person: {
			type: PERSON__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT
		},
		character: {
			type: CHARACTER__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT
		}
*/
	},
});

export { AGENT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
