import * as $structure from "./../../../../structure/index.js";

import { READ__AGENT_ROOT__QUERY__GRAPHQL__INTERFACE__SYSTEM, COUNT__AGENT_ROOT__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/agent_root.js";
import {
	CREATE__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/agent_root.js";

const CONNECTION__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.entities.agent_root.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	query_relationships_to: $structure.entities.agent_root.system.graphql.QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	query_relationships_from: $structure.entities.agent_root.system.graphql.QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	mutation_relationships: $structure.entities.agent_root.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	mutation_relationships_to: $structure.entities.agent_root.system.graphql.MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	mutation_relationships_from: $structure.entities.agent_root.system.graphql.MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	query_query: $structure.entities.agent_root.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
	mutation_mutation: $structure.entities.agent_root.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_ROOT__STRUCTURE,
};

const METHODS__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_agent_root: READ__AGENT_ROOT__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		count_agent_root: COUNT__AGENT_ROOT__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_agent_root: CREATE__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_agent_root: UPDATE__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_agent_root: DELETE__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
};

export { CONNECTION__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__AGENT_ROOT__ENTITY__GRAPHQL__INTERFACE__SYSTEM };
