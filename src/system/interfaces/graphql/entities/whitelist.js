import * as $structure from "./../../../../structure/index.js";

import { READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/whitelist.js";
import {
	CREATE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/whitelist.js";

const CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.entities.whitelist.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE,
	mutation_relationships: $structure.entities.whitelist.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE,
	query_query: $structure.entities.whitelist.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE,
	mutation_mutation: $structure.entities.whitelist.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE,
};

const METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_whitelist: READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_whitelist: CREATE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_whitelist: UPDATE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_whitelist: DELETE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
};

export { CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM };
