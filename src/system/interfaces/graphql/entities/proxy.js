import * as $structure from "./../../../../structure/index.js";

import { READ__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./../queries/proxy.js";
import {
	CREATE__PROXY__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__PROXY__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__PROXY__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./../mutations/proxy.js";

const CONNECTION__PROXY__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query_relationships: $structure.entities.proxy.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__PROXY__STRUCTURE,
	mutation_relationships: $structure.entities.proxy.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__PROXY__STRUCTURE,
	query_query: $structure.entities.proxy.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__PROXY__STRUCTURE,
	mutation_mutation: $structure.entities.proxy.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__PROXY__STRUCTURE,
};

const METHODS__PROXY__ENTITY__GRAPHQL__INTERFACE__SYSTEM = {
	query: {
		read_proxy: READ__PROXY__QUERY__GRAPHQL__INTERFACE__SYSTEM,
	},
	mutation: {
		create_proxy: CREATE__PROXY__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		update_proxy: UPDATE__PROXY__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		delete_proxy: DELETE__PROXY__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	},
};

export { CONNECTION__PROXY__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__PROXY__ENTITY__GRAPHQL__INTERFACE__SYSTEM };
