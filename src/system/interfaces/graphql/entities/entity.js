import * as $structure from "./../../../../structure/index.js";

import { READ__ENTITY__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/entity.js";
import {
	CREATE__ENTITY__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__ENTITY__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__ENTITY__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/entity.js";

const CONNECTION__ENTITY__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.entities.entity.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	mutation_relationships: $structure.entities.entity.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	query_query: $structure.entities.entity.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
	mutation_mutation: $structure.entities.entity.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY__STRUCTURE,
};

const METHODS__ENTITY__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_entity: READ__ENTITY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_entity: CREATE__ENTITY__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_entity: UPDATE__ENTITY__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_entity: DELETE__ENTITY__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
};

export { CONNECTION__ENTITY__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__ENTITY__ENTITY__GRAPHQL__INTERFACE__SYSTEM };
