import * as $structure from "./../../../../structure/index.js";

import { READ__SECRET__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./../queries/secret.js";
import {
	CREATE__SECRET__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__SECRET__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__SECRET__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./../mutations/secret.js";

const CONNECTION__SECRET__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query_relationships: $structure.entities.secret.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	mutation_relationships: $structure.entities.secret.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	query_query: $structure.entities.secret.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
	mutation_mutation: $structure.entities.secret.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__SECRET__STRUCTURE,
};

const METHODS__SECRET__ENTITY__GRAPHQL__INTERFACE__DATABASE = {
	query: {
		read_secret: READ__SECRET__QUERY__GRAPHQL__INTERFACE__DATABASE,
	},
	mutation: {
		create_secret: CREATE__SECRET__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		update_secret: UPDATE__SECRET__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		delete_secret: DELETE__SECRET__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	},
};

export { CONNECTION__SECRET__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__SECRET__ENTITY__GRAPHQL__INTERFACE__DATABASE };
