import * as $structure from "./../../../../structure/index.js";

import { READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./../queries/whitelist.js";
import {
	CREATE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./../mutations/whitelist.js";

const CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query_relationships: $structure.whitelist.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	mutation_relationships: $structure.whitelist.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	query_query: $structure.whitelist.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	mutation_mutation: $structure.whitelist.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
};

const METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query: {
		read_whitelist: READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
	},
	mutation: {
		create_whitelist: CREATE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		update_whitelist: UPDATE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		delete_whitelist: DELETE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	},
};

export { CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE };
