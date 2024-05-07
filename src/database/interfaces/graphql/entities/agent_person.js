import * as $structure from "./../../../../structure/index.js";

import { READ__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./../queries/agent_person.js";
import {
	CREATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./../mutations/agent_person.js";

const CONNECTION__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query_relationships: $structure.entities.agent_person.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	mutation_relationships: $structure.entities.agent_person.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	query_query: $structure.entities.agent_person.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
	mutation_mutation: $structure.entities.agent_person.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
};

const METHODS__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query: {
		read_agent_person: READ__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__DATABASE,
	},
	mutation: {
		create_agent_person: CREATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		update_agent_person: UPDATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		delete_agent_person: DELETE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	},
};

export { CONNECTION__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__DATABASE };
