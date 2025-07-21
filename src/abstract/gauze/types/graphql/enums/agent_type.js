import { GraphQLEnumType } from "graphql";

const AGENT_TYPE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT = new GraphQLEnumType({
	name: "Agent Type",
	values: {
		AGENT_TYPE__ACCOUNT: {
			value: "gauze__agent_account",
		},
		AGENT_TYPE__USER: {
			value: "gauze__agent_user",
		},
		AGENT_TYPE__PERSON: {
			value: "gauze__agent_person",
		},
		AGENT_TYPE__CHARACTER: {
			value: "gauze__agent_character",
		},
	},
});

export { AGENT_TYPE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT };
