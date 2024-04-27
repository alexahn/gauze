import * as $structure from "./../../../../structure/index.js";

import { READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/relationship.js";
import {
    CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
    UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
    DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/relationship.js";

const CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.relationship.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	mutation_relationships: $structure.relationship.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	query_query: $structure.relationship.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	mutation_mutation: $structure.relationship.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
}

const METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_relationship: READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_relationship: CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_relationship: UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_relationship: DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
}

export {
	CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__SYSTEM
}
