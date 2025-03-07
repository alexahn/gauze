import * as $structure from "./../../../../structure/index.js";

import { READ__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./../queries/proxy.js";
import {
	CREATE__PROXY__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__PROXY__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__PROXY__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./../mutations/proxy.js";

const CONNECTION__PROXY__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query_relationships: $structure.entities.proxy.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__PROXY__STRUCTURE,
	query_relationships_to: $structure.entities.proxy.database.graphql.QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__PROXY__STRUCTURE,
	query_relationships_from: $structure.entities.proxy.database.graphql.QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__PROXY__STRUCTURE,
	mutation_relationships: $structure.entities.proxy.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__PROXY__STRUCTURE,
	mutation_relationships_to: $structure.entities.proxy.database.graphql.MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__PROXY__STRUCTURE,
	mutation_relationships_from: $structure.entities.proxy.database.graphql.MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__PROXY__STRUCTURE,
	query_query: $structure.entities.proxy.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__PROXY__STRUCTURE,
	mutation_mutation: $structure.entities.proxy.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__PROXY__STRUCTURE,
};

const METHODS__PROXY__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query: {
		read_proxy: READ__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		count_proxy: COUNT__PROXY__QUERY__GRAPHQL__INTERFACE__DATABASE,
	},
	mutation: {
		create_proxy: CREATE__PROXY__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		update_proxy: UPDATE__PROXY__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		delete_proxy: DELETE__PROXY__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	},
};

export { CONNECTION__PROXY__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__PROXY__ENTITY__GRAPHQL__INTERFACE__DATABASE };
