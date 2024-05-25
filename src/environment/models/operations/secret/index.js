import fs from "fs";
import path from "path";

const CREATE_NAME__SECRET__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT = "CreateSecret";
const CREATE__SECRET__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT = fs.readFileSync(path.resolve(import.meta.dirname, "./create.graphql"), {
	encoding: "utf8",
});

export { CREATE_NAME__SECRET__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT, CREATE__SECRET__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT };
