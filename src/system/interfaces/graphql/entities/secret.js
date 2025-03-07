import * as $structure from "./../../../../structure/index.js";

import { READ__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM, COUNT__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/secret.js";
import {
	CREATE__SECRET__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__SECRET__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__SECRET__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/secret.js";

const CONNECTION__SECRET__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.entities.secret.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
	query_relationships_to: $structure.entities.secret.system.graphql.QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
	query_relationships_from: $structure.entities.secret.system.graphql.QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
	mutation_relationships: $structure.entities.secret.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
	mutation_relationships_to: $structure.entities.secret.system.graphql.MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
	mutation_relationships_from: $structure.entities.secret.system.graphql.MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
	query_query: $structure.entities.secret.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
	mutation_mutation: $structure.entities.secret.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__SECRET__STRUCTURE,
};

const METHODS__SECRET__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_secret: READ__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		count_secret: COUNT__SECRET__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_secret: CREATE__SECRET__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_secret: UPDATE__SECRET__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_secret: DELETE__SECRET__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
};

export { CONNECTION__SECRET__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__SECRET__ENTITY__GRAPHQL__INTERFACE__SYSTEM };
