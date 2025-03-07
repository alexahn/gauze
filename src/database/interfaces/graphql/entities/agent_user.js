import * as $structure from "./../../../../structure/index.js";

import { READ__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./../queries/agent_user.js";
import {
	CREATE__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./../mutations/agent_user.js";

const CONNECTION__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query_relationships: $structure.entities.agent_user.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
	query_relationships_to: $structure.entities.agent_user.database.graphql.QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
	query_relationships_from: $structure.entities.agent_user.database.graphql.QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
	mutation_relationships: $structure.entities.agent_user.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
	mutation_relationships_to: $structure.entities.agent_user.database.graphql.MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
	mutation_relationships_from: $structure.entities.agent_user.database.graphql.MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
	query_query: $structure.entities.agent_user.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
	mutation_mutation: $structure.entities.agent_user.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
};

const METHODS__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query: {
		read_agent_user: READ__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		count_agent_user: COUNT__AGENT_USER__QUERY__GRAPHQL__INTERFACE__DATABASE,
	},
	mutation: {
		create_agent_user: CREATE__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		update_agent_user: UPDATE__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		delete_agent_user: DELETE__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	},
};

export { CONNECTION__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__DATABASE };
