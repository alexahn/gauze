import * as $structure from "./../../../../structure/index.js";

import { READ__AGENT_ACCOUNT__QUERY__GRAPHQL__INTERFACE__SYSTEM, COUNT__AGENT_ACCOUNT__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/agent_account.js";
import {
	CREATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/agent_account.js";

const CONNECTION__AGENT_ACCOUNT__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.entities.agent_account.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	query_relationships_to: $structure.entities.agent_account.system.graphql.QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	query_relationships_from: $structure.entities.agent_account.system.graphql.QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	mutation_relationships: $structure.entities.agent_account.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	mutation_relationships_to: $structure.entities.agent_account.system.graphql.MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	mutation_relationships_from: $structure.entities.agent_account.system.graphql.MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	query_query: $structure.entities.agent_account.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
	mutation_mutation: $structure.entities.agent_account.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_ACCOUNT__STRUCTURE,
};

const METHODS__AGENT_ACCOUNT__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_agent_account: READ__AGENT_ACCOUNT__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		count_agent_account: COUNT__AGENT_ACCOUNT__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_agent_account: CREATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_agent_account: UPDATE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_agent_account: DELETE__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
};

export { CONNECTION__AGENT_ACCOUNT__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__AGENT_ACCOUNT__ENTITY__GRAPHQL__INTERFACE__SYSTEM };
