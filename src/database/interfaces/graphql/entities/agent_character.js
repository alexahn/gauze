import * as $structure from "./../../../../structure/index.js";

import { READ__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./../queries/agent_character.js";
import {
	CREATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./../mutations/agent_character.js";

const CONNECTION__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query_relationships: $structure.entities.agent_character.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	query_relationships_to: $structure.entities.agent_character.database.graphql.QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	query_relationships_from: $structure.entities.agent_character.database.graphql.QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	mutation_relationships: $structure.entities.agent_character.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	mutation_relationships_to: $structure.entities.agent_character.database.graphql.MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	mutation_relationships_from: $structure.entities.agent_character.database.graphql.MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	query_query: $structure.entities.agent_character.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	mutation_mutation: $structure.entities.agent_character.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
};

const METHODS__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query: {
		read_agent_character: READ__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__DATABASE,
		count_agent_character: COUNT__AGENT_CHARACTER__QUERY__GRAPHQL__INTERFACE__DATABASE,
	},
	mutation: {
		create_agent_character: CREATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		update_agent_character: UPDATE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		delete_agent_character: DELETE__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	},
};

export { CONNECTION__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__AGENT_CHARACTER__ENTITY__GRAPHQL__INTERFACE__DATABASE };
