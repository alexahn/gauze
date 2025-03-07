import * as $structure from "./../../../../structure/index.js";

import { READ__YTITNE__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__YTITNE__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./../queries/ytitne.js";
import {
	CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./../mutations/ytitne.js";

const CONNECTION__YTITNE__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query_relationships: $structure.entities.ytitne.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	query_relationships_to: $structure.entities.ytitne.database.graphql.QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	query_relationships_from: $structure.entities.ytitne.database.graphql.QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	mutation_relationships: $structure.entities.ytitne.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	mutation_relationships_to: $structure.entities.ytitne.database.graphql.MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	mutation_relationships_from: $structure.entities.ytitne.database.graphql.MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	query_query: $structure.entities.ytitne.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
	mutation_mutation: $structure.entities.ytitne.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__YTITNE__STRUCTURE,
};

const METHODS__YTITNE__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query: {
		read_ytitne: READ__YTITNE__QUERY__GRAPHQL__INTERFACE__DATABASE,
		count_ytitne: COUNT__YTITNE__QUERY__GRAPHQL__INTERFACE__DATABASE,
	},
	mutation: {
		create_ytitne: CREATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		update_ytitne: UPDATE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		delete_ytitne: DELETE__YTITNE__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	},
};

export { CONNECTION__YTITNE__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__YTITNE__ENTITY__GRAPHQL__INTERFACE__DATABASE };
