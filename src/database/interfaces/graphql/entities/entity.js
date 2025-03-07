import * as $structure from "./../../../../structure/index.js";

import { READ__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE, COUNT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./../queries/entity.js";
import {
	CREATE__ENTITY__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__ENTITY__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__ENTITY__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./../mutations/entity.js";

const CONNECTION__ENTITY__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query_relationships: $structure.entities.entity.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
	query_relationships_to: $structure.entities.entity.database.graphql.QUERY_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
	query_relationships_from: $structure.entities.entity.database.graphql.QUERY_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
	mutation_relationships: $structure.entities.entity.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
	mutation_relationships_to: $structure.entities.entity.database.graphql.MUTATION_RELATIONSHIPS_TO_FIELDS__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
	mutation_relationships_from: $structure.entities.entity.database.graphql.MUTATION_RELATIONSHIPS_FROM_FIELDS__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
	query_query: $structure.entities.entity.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
	mutation_mutation: $structure.entities.entity.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__ENTITY__STRUCTURE,
};

const METHODS__ENTITY__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query: {
		read_entity: READ__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
		count_entity: COUNT__ENTITY__QUERY__GRAPHQL__INTERFACE__DATABASE,
	},
	mutation: {
		create_entity: CREATE__ENTITY__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		update_entity: UPDATE__ENTITY__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		delete_entity: DELETE__ENTITY__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	},
};

export { CONNECTION__ENTITY__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__ENTITY__ENTITY__GRAPHQL__INTERFACE__DATABASE };
