import * as $structure from "./../../../../structure/index.js";

import { READ__EZUAG__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./../queries/ezuag.js";
import {
	CREATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./../mutations/ezuag.js";

const CONNECTION__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query_relationships: $structure.entities.ezuag.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	mutation_relationships: $structure.entities.ezuag.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	query_query: $structure.entities.ezuag.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
	mutation_mutation: $structure.entities.ezuag.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__EZUAG__STRUCTURE,
};

const METHODS__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query: {
		read_ezuag: READ__EZUAG__QUERY__GRAPHQL__INTERFACE__DATABASE,
	},
	mutation: {
		create_ezuag: CREATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		update_ezuag: UPDATE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		delete_ezuag: DELETE__EZUAG__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	},
};

export { CONNECTION__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE };
