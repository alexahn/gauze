import * as $structure from "./../../../../structure/index.js";

import { READ__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/gauze.js";
import {
	CREATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/gauze.js";

const CONNECTION__GAUZE__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.gauze.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__GAUZE__STRUCTURE,
	mutation_relationships: $structure.gauze.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__GAUZE__STRUCTURE,
	query_query: $structure.gauze.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__GAUZE__STRUCTURE,
	mutation_mutation: $structure.gauze.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__GAUZE__STRUCTURE,
};

const METHODS__GAUZE__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_gauze: READ__GAUZE__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_gauze: CREATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_gauze: UPDATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_gauze: DELETE__GAUZE__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
};

export { CONNECTION__GAUZE__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__GAUZE__ENTITY__GRAPHQL__INTERFACE__SYSTEM };
