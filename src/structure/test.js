import * as structure from './index.js'

console.log(structure)
console.log('entity1.database', structure.entity1.database)
console.log('entity1.system', structure.entity1.system)
console.log('relationship.database', structure.relationship.database)
console.log('relationship.system', structure.relationship.system)

import * as relationships from './relationships.js'
import * as resolvers from './resolvers.js'

console.log('relationships', relationships)
console.log('resolvers', resolvers)