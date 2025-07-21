import { DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT } from "./date.js";

console.log(DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT);

console.log("serialize", DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT.serialize(new Date()));
console.log("match_value", DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT.match_value("hello"));
