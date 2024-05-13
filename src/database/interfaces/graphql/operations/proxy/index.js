import fs from "fs";
import path from "path";

const CREATE_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE = "CreateProxy";
const CREATE__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, "./create.graphql"), {
	encoding: "utf8",
});
const READ_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE = "ReadProxy";
const READ__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, "./read.graphql"), {
	encoding: "utf8",
});
const UPDATE_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE = "UpdateProxy";
const UPDATE__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, "./update.graphql"), {
	encoding: "utf8",
});
const DELETE_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE = "DeleteProxy";
const DELETE__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, "./delete.graphql"), {
	encoding: "utf8",
});
const COUNT_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE = "CountProxy";
const COUNT__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, "./count.graphql"), {
	encoding: "utf8",
});

export {
	CREATE_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	CREATE__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	READ_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	READ__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	COUNT_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	COUNT__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
};
