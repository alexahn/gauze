import { GraphQLObjectType, GraphQLString, GraphQLInputObjectType } from "graphql";

import { MUTATION__KERNEL__REALM__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./realms/kernel.js";
import { MUTATION__DATABASE__REALM__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./realms/database.js";
import { MUTATION__SYSTEM__REALM__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./realms/system.js";

const MUTATION__REALM__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Realm",
	fields: {
		kernel: {
			type: MUTATION__KERNEL__REALM__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		database: {
			type: MUTATION__DATABASE__REALM__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		system: {
			type: MUTATION__SYSTEM__REALM__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (scooe, args, context) {
				return {};
			},
		},
	},
});

export { MUTATION__REALM__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
