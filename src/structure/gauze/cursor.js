import { GraphQLBoolean } from "graphql";

import * as $abstract from "./../../abstract/index.js";

const FIELDS__CURSOR_PAGE_INFO__STRUCTURE = {
	has_previous_page: {
		type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT(GraphQLBoolean),
	},
	has_next_page: {
		type: new $abstract.gauze.types.graphql.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT(GraphQLBoolean),
	},
	previous_cursor: {
		type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	},
	current_cursor: {
		type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	},
	next_cursor: {
		type: $abstract.gauze.types.graphql.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
	},
};

const TYPE__CURSOR_PAGE_INFO__DATABASE__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Database_Cursor_Page_Info",
	description: "Cursor page info",
	fields: () => FIELDS__CURSOR_PAGE_INFO__STRUCTURE,
});

const TYPE__CURSOR_PAGE_INFO__SYSTEM__STRUCTURE = new $abstract.gauze.types.graphql.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "System_Cursor_Page_Info",
	description: "Cursor page info",
	fields: () => FIELDS__CURSOR_PAGE_INFO__STRUCTURE,
});

export { FIELDS__CURSOR_PAGE_INFO__STRUCTURE, TYPE__CURSOR_PAGE_INFO__DATABASE__STRUCTURE, TYPE__CURSOR_PAGE_INFO__SYSTEM__STRUCTURE };
