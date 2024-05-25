import fs from "fs";
import path from "path";

const CREATE_NAME__AGENT_PERSON__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT = "CreateAgent_Person";
const CREATE__AGENT_PERSON__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT = fs.readFileSync(path.resolve(import.meta.dirname, "./create.graphql"), {
	encoding: "utf8",
});

export { CREATE_NAME__AGENT_PERSON__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT, CREATE__AGENT_PERSON__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT };
