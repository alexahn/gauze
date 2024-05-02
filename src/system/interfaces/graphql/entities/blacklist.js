import * as $structure from "./../../../../structure/index.js";

import { READ__BLACKLIST__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/blacklist.js";
import {
	CREATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/blacklist.js";

const CONNECTION__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.entities.blacklist.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	mutation_relationships: $structure.entities.blacklist.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	query_query: $structure.entities.blacklist.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	mutation_mutation: $structure.entities.blacklist.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
};

const METHODS__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_blacklist: READ__BLACKLIST__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_blacklist: CREATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_blacklist: UPDATE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_blacklist: DELETE__BLACKLIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
};

export { CONNECTION__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM };
