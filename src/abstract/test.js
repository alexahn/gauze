import * as abstract from "./index.js";
console.log(abstract);

import entity1 from "./entities/entity1.js";

const ENTITY1 = entity1(abstract);
console.log(ENTITY1);

import relationship from "./entities/relationship.js";
const RELATIONSHIP = relationship(abstract);
console.log(RELATIONSHIP);

console.log(ENTITY1.fields.created_at);

console.log("abstract", abstract);
