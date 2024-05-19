import * as $structure from "./../../../../structure/index.js";

import { READ__SESSION__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__SESSION__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./../queries/session.js";
import {
	CREATE__SESSION__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__SESSION__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__SESSION__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./../mutations/session.js";

const CONNECTION__SESSION__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query_relationships: $structure.entities.session.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	query_relationships_to: $structure.entities.session.database.graphql.QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	query_relationships_from: $structure.entities.session.database.graphql.QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	mutation_relationships: $structure.entities.session.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	mutation_relationships_to: $structure.entities.session.database.graphql.MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	mutation_relationships_from: $structure.entities.session.database.graphql.MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	query_query: $structure.entities.session.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
	mutation_mutation: $structure.entities.session.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
};

const METHODS__SESSION__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query: {
		read_session: READ__SESSION__QUERY__GRAPHQL__INTERFACE__DATABASE,
		count_session: COUNT__SESSION__QUERY__GRAPHQL__INTERFACE__DATABASE,
	},
	mutation: {
		create_session: CREATE__SESSION__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		update_session: UPDATE__SESSION__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		delete_session: DELETE__SESSION__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	},
};

export { CONNECTION__SESSION__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__SESSION__ENTITY__GRAPHQL__INTERFACE__DATABASE };
