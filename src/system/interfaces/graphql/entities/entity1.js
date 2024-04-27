import * as $structure from "./../../../../structure/index.js";

import { READ__ENTITY1__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/entity1.js";
import {
    CREATE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
    UPDATE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
    DELETE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/entity1.js";

const CONNECTION__ENTITY1__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.entity1.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	mutation_relationships: $structure.entity1.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	query_query: $structure.entity1.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	mutation_mutation: $structure.entity1.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
}

const METHODS__ENTITY1__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_entity1: READ__ENTITY1__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_entity1: CREATE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_entity1: UPDATE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_entity1: DELETE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
}

export {
	CONNECTION__ENTITY1__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	METHODS__ENTITY1__ENTITY__GRAPHQL__INTERFACE__SYSTEM
}
