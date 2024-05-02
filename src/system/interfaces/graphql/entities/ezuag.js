import * as $structure from "./../../../../structure/index.js";

import { READ__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/ezuag.js";
import {
	CREATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__EZUAG__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/ezuag.js";

const CONNECTION__EZUAG__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.entities.ezuag.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__EZUAG__STRUCTURE,
	mutation_relationships: $structure.entities.ezuag.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__EZUAG__STRUCTURE,
	query_query: $structure.entities.ezuag.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__EZUAG__STRUCTURE,
	mutation_mutation: $structure.entities.ezuag.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__EZUAG__STRUCTURE,
};

const METHODS__EZUAG__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_ezuag: READ__EZUAG__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_ezuag: CREATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_ezuag: UPDATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_ezuag: DELETE__EZUAG__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
};

export { CONNECTION__EZUAG__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__EZUAG__ENTITY__GRAPHQL__INTERFACE__SYSTEM };
