import * as $structure from "./../../../../structure/index.js";

import { READ__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM, COUNT__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/agent_person.js";
import {
	CREATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/agent_person.js";

const CONNECTION__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.entities.agent_person.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
	query_relationships_to: $structure.entities.agent_person.system.graphql.QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
	query_relationships_from: $structure.entities.agent_person.system.graphql.QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
	mutation_relationships: $structure.entities.agent_person.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
	mutation_relationships_to: $structure.entities.agent_person.system.graphql.MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
	mutation_relationships_from: $structure.entities.agent_person.system.graphql.MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
	query_query: $structure.entities.agent_person.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
	mutation_mutation: $structure.entities.agent_person.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__AGENT_PERSON__STRUCTURE,
};

const METHODS__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_agent_person: READ__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		count_agent_person: COUNT__AGENT_PERSON__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_agent_person: CREATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_agent_person: UPDATE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_agent_person: DELETE__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
};

export { CONNECTION__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__AGENT_PERSON__ENTITY__GRAPHQL__INTERFACE__SYSTEM };
