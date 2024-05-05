import { GraphQLEnumType } from "graphql";

const AGENT_ROLE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT = new GraphQLEnumType({
	name: "Agent Role",
	values: {
		AGENT_ROLE__ROOT: {
			value: "root",
		},
		AGENT_ROLE__TRUNK: {
			value: "trunk",
		},
		AGENT_ROLE__LEAF: {
			value: "leaf",
		},
	},
});

export { AGENT_ROLE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT };
