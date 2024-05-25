import fs from "fs";
import path from "path";

const CREATE_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT = "CreateProxy";
const CREATE__PROXY__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT = fs.readFileSync(path.resolve(import.meta.dirname, "./create.graphql"), {
	encoding: "utf8",
});

export { CREATE_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT, CREATE__PROXY__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT };
