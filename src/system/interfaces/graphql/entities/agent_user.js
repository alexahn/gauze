import * as $structure from "./../../../../structure/index.js";

import { READ__AGENT_USER__QUERY__GRAPHQL__INTERFACE__SYSTEM, COUNT__AGENT_USER__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/agent_user.js";
import {
	CREATE__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/agent_user.js";

const CONNECTION__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.entities.agent_user.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	query_relationships_to: $structure.entities.agent_user.system.graphql.QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	query_relationships_from: $structure.entities.agent_user.system.graphql.QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	mutation_relationships: $structure.entities.agent_user.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	mutation_relationships_to: $structure.entities.agent_user.system.graphql.MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	mutation_relationships_from: $structure.entities.agent_user.system.graphql.MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	query_query: $structure.entities.agent_user.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
	mutation_mutation: $structure.entities.agent_user.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_USER__STRUCTURE,
};

const METHODS__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_agent_user: READ__AGENT_USER__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		count_agent_user: COUNT__AGENT_USER__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_agent_user: CREATE__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_agent_user: UPDATE__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_agent_user: DELETE__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
};

export { CONNECTION__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__AGENT_USER__ENTITY__GRAPHQL__INTERFACE__SYSTEM };
