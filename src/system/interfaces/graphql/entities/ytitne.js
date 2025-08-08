import * as $structure from "./../../../../structure/index.js";

import { READ__YTITNE__QUERY__GRAPHQL__INTERFACE__SYSTEM, COUNT__YTITNE__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/ytitne.js";
import {
	CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/ytitne.js";

const CONNECTION__YTITNE__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.entities.ytitne.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__YTITNE__STRUCTURE,
	query_relationships_to: $structure.entities.ytitne.system.graphql.QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__YTITNE__STRUCTURE,
	query_relationships_from: $structure.entities.ytitne.system.graphql.QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__YTITNE__STRUCTURE,
	mutation_relationships: $structure.entities.ytitne.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__YTITNE__STRUCTURE,
	mutation_relationships_to: $structure.entities.ytitne.system.graphql.MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__YTITNE__STRUCTURE,
	mutation_relationships_from: $structure.entities.ytitne.system.graphql.MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__YTITNE__STRUCTURE,
	query_query: $structure.entities.ytitne.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__YTITNE__STRUCTURE,
	mutation_mutation: $structure.entities.ytitne.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__YTITNE__STRUCTURE,
};

const METHODS__YTITNE__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_ytitne: READ__YTITNE__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		count_ytitne: COUNT__YTITNE__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_ytitne: CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_ytitne: UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_ytitne: DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
};

export { CONNECTION__YTITNE__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__YTITNE__ENTITY__GRAPHQL__INTERFACE__SYSTEM };
