import * as $structure from "./../../../../structure/index.js";

import { READ__AGENT_ROOT__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__AGENT_ROOT__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./../queries/agent_root.js";
import {
	CREATE__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./../mutations/agent_root.js";

const CONNECTION__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query_relationships: $structure.entities.agent_root.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__AGENT_ROOT__STRUCTURE,
	query_relationships_to: $structure.entities.agent_root.database.graphql.QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__AGENT_ROOT__STRUCTURE,
	query_relationships_from: $structure.entities.agent_root.database.graphql.QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__AGENT_ROOT__STRUCTURE,
	mutation_relationships: $structure.entities.agent_root.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__AGENT_ROOT__STRUCTURE,
	mutation_relationships_to: $structure.entities.agent_root.database.graphql.MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__AGENT_ROOT__STRUCTURE,
	mutation_relationships_from: $structure.entities.agent_root.database.graphql.MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__AGENT_ROOT__STRUCTURE,
	query_query: $structure.entities.agent_root.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__AGENT_ROOT__STRUCTURE,
	mutation_mutation: $structure.entities.agent_root.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__AGENT_ROOT__STRUCTURE,
};

const METHODS__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query: {
		read_agent_root: READ__AGENT_ROOT__QUERY__GRAPHQL__INTERFACE__DATABASE,
		count_agent_root: COUNT__AGENT_ROOT__QUERY__GRAPHQL__INTERFACE__DATABASE,
	},
	mutation: {
		create_agent_root: CREATE__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		update_agent_root: UPDATE__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		delete_agent_root: DELETE__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	},
};

export { CONNECTION__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__DATABASE };
