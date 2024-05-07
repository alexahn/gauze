import * as $structure from "./../../../../structure/index.js";

import { READ__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/agent_character.js";
import {
	CREATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/agent_character.js";

const CONNECTION__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.entities.agent_character.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
	mutation_relationships: $structure.entities.agent_character.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
	query_query: $structure.entities.agent_character.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
	mutation_mutation: $structure.entities.agent_character.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_CHARACTER__STRUCTURE,
};

const METHODS__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_agent_character: READ__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_agent_character: CREATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_agent_character: UPDATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_agent_character: DELETE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
};

export { CONNECTION__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__SYSTEM };
