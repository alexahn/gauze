import * as $structure from "./../structure/index.js";

import { GraphQLString, GraphQLBoolean, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

const STEP__TYPE__ENVIRONMENT = new GraphQLObjectType({
	name: "Step",
	fields: {
		success: {
			type: GraphQLBoolean,
		},
	},
});

const INPUT_CODE__TYPE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Code",
	fields: {
		code: {
			type: GraphQLString,
		},
	},
});

const SESSION__TYPE__ENVIRONMENT = new GraphQLObjectType({
	name: "Environment_Mutation__Session",
	fields: $structure.entities.session.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
});

const INPUT_PROXY__TYPE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Environment_Mutation__Proxy",
	fields: $structure.entities.proxy.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__PROXY__STRUCTURE,
});

const INPUT_AGENT_ROOT__TYPE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Environment_Mutation__Agent_Root",
	fields: $structure.entities.agent_root.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_ROOT__STRUCTURE,
});

const INPUT_AGENT_ACCOUNT__TYPE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Environment_Mutation__Agent_Account",
	fields: $structure.entities.agent_account.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_ACCOUNT__STRUCTURE,
});

const INPUT_AGENT_USER__TYPE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Environment_Mutation__Agent_User",
	fields: $structure.entities.agent_user.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
});

const INPUT_AGENT_PERSON__TYPE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Environment_Mutation__Agent_Person",
	fields: $structure.entities.agent_person.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const INPUT_AGENT_CHARACTER__TYPE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Environment_Mutation__Agent_Character",
	fields: $structure.entities.agent_character.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
});

export {
	STEP__TYPE__ENVIRONMENT,
	INPUT_CODE__TYPE__ENVIRONMENT,
	SESSION__TYPE__ENVIRONMENT,
	INPUT_PROXY__TYPE__ENVIRONMENT,
	INPUT_AGENT_ROOT__TYPE__ENVIRONMENT,
	INPUT_AGENT_ACCOUNT__TYPE__ENVIRONMENT,
	INPUT_AGENT_USER__TYPE__ENVIRONMENT,
	INPUT_AGENT_PERSON__TYPE__ENVIRONMENT,
	INPUT_AGENT_CHARACTER__TYPE__ENVIRONMENT,
};
