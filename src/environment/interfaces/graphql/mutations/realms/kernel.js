import { GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

import { SESSION__TYPE__ENVIRONMENT, INPUT_PROXY__TYPE__ENVIRONMENT } from "./../../../../types.js";

import { CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT } from "./../../../../controllers/environment.js";

import { CONTROLLER__KERNEL__REALM__CONTROLLER__ENVIRONMENT } from "./../../../../controllers/realms/kernel.js";

const MUTATION__KERNEL__REALM__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Realm_Kernel",
	fields: {
		enter_session: {
			type: SESSION__TYPE__ENVIRONMENT,
			args: {
				proxy: {
					type: INPUT_PROXY__TYPE__ENVIRONMENT,
					description: "proxy",
				},
			},
			resolve: function (source, args, context) {
				return CONTROLLER__KERNEL__REALM__CONTROLLER__ENVIRONMENT.enter_session(
					context,
					{
						source,
					},
					args,
				);
			},
		},
		exit_session: {
			type: new GraphQLList(SESSION__TYPE__ENVIRONMENT),
			args: {
				proxy: {
					type: INPUT_PROXY__TYPE__ENVIRONMENT,
					description: "proxy",
				},
			},
			resolve: function (source, args, context) {
				return CONTROLLER__KERNEL__REALM__CONTROLLER__ENVIRONMENT.exit_session(
					context,
					{
						source,
					},
					args,
				);
			},
		},
	},
});

export { MUTATION__KERNEL__REALM__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
