import * as $abstract from "./../../abstract/index.js";

const FIELDS__COUNT__STRUCTURE = {
	select: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "select",
	},
	count: {
		type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.INT__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "count",
	},
};

const TYPE__COUNT__STRUCTURE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Count",
	description: "count",
	fields: () => FIELDS__COUNT__STRUCTURE,
});

export { FIELDS__COUNT__STRUCTURE, TYPE__COUNT__STRUCTURE };
