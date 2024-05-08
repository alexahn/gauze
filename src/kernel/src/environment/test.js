import * as environment from "./index.js";

console.log("environment", environment);

import { graphql } from "graphql";

function execute(query) {
	const schema = environment.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__ENVIRONMENT;
	return graphql({
		schema: schema,
		source: query,
		contextValue: {},
	});
}

const query = `
mutation {
	environment {
		signin {
			gauze__session__agent_type
			gauze__session__agent_id
			gauze__session__realm
		}
	}
}
`;

const query2 = `
mutation {
	agent {
		root {
			verify {
				verify
			}
		}
	}
}
`;

execute(query)
	.then(function (data) {
		console.log("data", JSON.stringify(data, null, 4));
	})
	.catch(function (error) {
		console.log("error", error);
		console.log(errors[0].locations);
	});
