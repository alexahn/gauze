import fs from "fs";
import path from "path";

const CREATE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE = "CreateEzuag";
const CREATE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, "./create.graphql"), {
	encoding: "utf8",
});
const READ_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE = "ReadEzuag";
const READ__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, "./read.graphql"), {
	encoding: "utf8",
});
const UPDATE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE = "UpdateEzuag";
const UPDATE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, "./update.graphql"), {
	encoding: "utf8",
});
const DELETE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE = "DeleteEzuag";
const DELETE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, "./delete.graphql"), {
	encoding: "utf8",
});
const COUNT_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE = "CountEzuag";
const COUNT__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE = fs.readFileSync(path.resolve(import.meta.dirname, "./count.graphql"), {
	encoding: "utf8",
});

export {
	CREATE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	CREATE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	READ_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	READ__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	COUNT_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
	COUNT__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
};
