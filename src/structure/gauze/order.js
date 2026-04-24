import * as $abstract from "./../../abstract/index.js";

const FIELDS__ORDER__STRUCTURE = {
	column: {
		type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT($abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT),
		description: "order column",
	},
	order: {
		type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		description: "order direction",
	},
	nulls: {
		type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
		description: "order nulls",
	},
};

const TYPE__ORDER__STRUCTURE = new $abstract.gauze.types.graphql.graphql.INPUT_OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Order",
	description: "order",
	fields: () => FIELDS__ORDER__STRUCTURE,
});

export { FIELDS__ORDER__STRUCTURE, TYPE__ORDER__STRUCTURE };
