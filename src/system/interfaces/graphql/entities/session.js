import * as $structure from "./../../../../structure/index.js";

import { READ__SESSION__QUERY__GRAPHQL__INTERFACE__SYSTEM, COUNT__SESSION__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/session.js";
import {
	CREATE__SESSION__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__SESSION__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__SESSION__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/session.js";

const CONNECTION__SESSION__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.entities.session.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__SESSION__STRUCTURE,
	query_relationships_to: $structure.entities.session.system.graphql.QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__SESSION__STRUCTURE,
	query_relationships_from: $structure.entities.session.system.graphql.QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__SESSION__STRUCTURE,
	mutation_relationships: $structure.entities.session.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__SESSION__STRUCTURE,
	mutation_relationships_to: $structure.entities.session.system.graphql.MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__SESSION__STRUCTURE,
	mutation_relationships_from: $structure.entities.session.system.graphql.MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__SESSION__STRUCTURE,
	query_query: $structure.entities.session.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__SESSION__STRUCTURE,
	mutation_mutation: $structure.entities.session.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__SESSION__STRUCTURE,
};

const METHODS__SESSION__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_session: READ__SESSION__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		count_session: COUNT__SESSION__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_session: CREATE__SESSION__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_session: UPDATE__SESSION__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_session: DELETE__SESSION__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
};

export { CONNECTION__SESSION__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__SESSION__ENTITY__GRAPHQL__INTERFACE__SYSTEM };
