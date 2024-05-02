import * as $structure from "./../../../../structure/index.js";

import { READ__BLACKLIST__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./../queries/blacklist.js";
import {
	CREATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./../mutations/blacklist.js";

const CONNECTION__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query_relationships: $structure.entities.blacklist.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	mutation_relationships: $structure.entities.blacklist.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	query_query: $structure.entities.blacklist.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
	mutation_mutation: $structure.entities.blacklist.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE,
};

const METHODS__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query: {
		read_blacklist: READ__BLACKLIST__QUERY__GRAPHQL__INTERFACE__DATABASE,
	},
	mutation: {
		create_blacklist: CREATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		update_blacklist: UPDATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		delete_blacklist: DELETE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	},
};

export { CONNECTION__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE };
