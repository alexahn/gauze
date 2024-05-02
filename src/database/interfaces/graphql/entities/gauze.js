import * as $structure from "./../../../../structure/index.js";

import { READ__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./../queries/gauze.js";
import {
	CREATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__GAUZE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./../mutations/gauze.js";

const CONNECTION__GAUZE__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query_relationships: $structure.entities.gauze.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	mutation_relationships: $structure.entities.gauze.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	query_query: $structure.entities.gauze.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
	mutation_mutation: $structure.entities.gauze.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__GAUZE__STRUCTURE,
};

const METHODS__GAUZE__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query: {
		read_gauze: READ__GAUZE__QUERY__GRAPHQL__INTERFACE__DATABASE,
	},
	mutation: {
		create_gauze: CREATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		update_gauze: UPDATE__GAUZE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		delete_gauze: DELETE__GAUZE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	},
};

export { CONNECTION__GAUZE__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__GAUZE__ENTITY__GRAPHQL__INTERFACE__DATABASE };
