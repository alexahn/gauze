import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";

import { Model } from "./class.js";

import { LOGGER__IO__LOGGER__KERNEL } from "./../logger/io.js";

import { EXECUTE__GRAPHQL__SHELL__KERNEL } from "./../shell/graphql.js";

// semantics:
// who is changing
// 	- all actions must ensure that the role hierarchy is honored
//		- all actions cannot affect access units that have a higher role than the initiator
//			- someone cannot read, update, or delete a record that has a role set higher than the initiator
//		- all modifications cannot effectively elevate the initiator's role
//			- create and update cannot set agent role to a higher role than the one who is initiating the change
// 		- by induction, terminal roles can only effectively read or delete their own record
// what is changing
//	- the units of change should be agent id, agent type, and agent role
//  - realm, entity id, entity type, and method (rename to entity method?) are locked
class AccessSystemModel extends Model {
	constructor() {
        super(root_config);
        const self = this;
        const { schema, schema_name } = relationship_config;
        self.schema = schema;
        self.schema_name = schema_name;
	}
	// get the access records for the initiator
	_initiator_records(context, entity, agent) {
		
	}
	// initiator is the highest level role record for the initiator
	// logic for leaf is annoying, so maybe we need to include method here
	_validate_hierarchy(initiator_record, record, method) {
		const initiator_role = initiator_record[`${this.table_name}__agent_role`]
		const record_role = record_role[`${this.table_name}__agent_role`]
		if (initiator_role === 'root') {
			// root can create trunk or leaf
			if (record_role === 'root') {
				throw new Error('Agent role cannot be root')
			} else if (record_role === 'trunk') {
				return true
			} else if (record_role === 'leaf') {
				return true
			} else {
				throw new Error('Agent role must be either trunk, or leaf')
			}
		} else if (initiator_role === 'trunk') {
			// trunk can create trunk or leaf
			if (record_role === 'root') {
				throw new Error("Agent role cannot be higher than initiator's role')
			} else if (record_role === 'trunk') {
				return true
			} else if (record_role === 'leaf') {
				return true
			} else {
				throw new Error('Agent role must be either trunk, or leaf')
			}
		} else if (initiator_role === 'leaf') {
			// leaf cannot create anything
			if (record_role === 'root') {
				throw new Error("Agent role cannot be higher than initiator's role')
			} else if (record_role === 'trunk') {
				throw new Error("Agent role cannot be higher than initiator's role')
			} else if (record_role === 'leaf') {
				// we need to return true here to proceed with read and delete
				// but this also means that a leaf can update other leaf records, which shouldn't be allowed
				// use method argument here to differentiate?
			} else {
				throw new Error('Agent role must be either trunk, or leaf')
			}
		} else {

		}
	}
	// grab all records for the current agent
	// sort by role
	// use highest role to commit to action
	_create(context, input, agent, operation) {
		const self = this
		const record = this.attributes
		return self._initiator_records(context, record, agent).then(function (access_records) {
			if (access_records && access_records.length) {
				// get record for the highest role
				const highest_record = self._highest_record(access_records)
				const valid_hierarchy = self._validate_hierarchy(highest_record, record)
				if (valid_hierarchy) {

				} else {

				}
			} else {

			}
		})
	}
	// requires where.id or where.agent_id or where.entity_id
	_read() {
		const self = this
	}
	// requires where.id
	_update() {
		
	}
	// requires where.id
	_delete() {

	}
}

